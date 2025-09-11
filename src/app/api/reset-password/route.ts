import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

// Security headers
const securityHeaders = {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
};

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_ATTEMPTS = 5; // 5 attempts per window

// Password validation schema
const resetPasswordSchema = z.object({
    token: z.string().min(1, 'Token is required'),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
});

// Rate limiting function
function checkRateLimit(identifier: string, maxAttempts: number): boolean {
    const now = Date.now();
    const userLimit = rateLimitStore.get(identifier);
    
    if (!userLimit) {
        rateLimitStore.set(identifier, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
        return true;
    }
    
    if (now > userLimit.resetTime) {
        rateLimitStore.set(identifier, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
        return true;
    }
    
    if (userLimit.count >= maxAttempts) {
        return false;
    }
    
    userLimit.count++;
    return true;
}

// Clean up expired rate limit entries
function cleanupRateLimit() {
    const now = Date.now();
    for (const [key, value] of rateLimitStore.entries()) {
        if (now > value.resetTime) {
            rateLimitStore.delete(key);
        }
    }
}

export async function POST(request: NextRequest) {
    try {
        // Clean up expired rate limit entries
        cleanupRateLimit();
        
        // Get client IP for rate limiting
        const clientIP = request.headers.get('x-forwarded-for') || 
                        request.headers.get('x-real-ip') || 
                        'unknown';
        
        // Check IP-based rate limiting
        if (!checkRateLimit(`ip:${clientIP}`, RATE_LIMIT_MAX_ATTEMPTS)) {
            return NextResponse.json(
                { 
                    message: 'Too many password reset attempts. Please try again later.',
                    retryAfter: RATE_LIMIT_WINDOW / 1000 
                },
                { 
                    status: 429,
                    headers: {
                        ...securityHeaders,
                        'Retry-After': (RATE_LIMIT_WINDOW / 1000).toString(),
                    }
                }
            );
        }
        
        const body = await request.json();
        const { token, password } = resetPasswordSchema.parse(body);
        
        // Validate token format
        if (!/^[a-f0-9]{64}$/.test(token)) {
            return NextResponse.json(
                { message: 'Invalid token format' },
                { 
                    status: 400,
                    headers: securityHeaders
                }
            );
        }
        
        // Find user with this reset token
        const user = await prisma.user.findFirst({
            where: {
                resetToken: token,
                resetExpires: {
                    gt: new Date(), // Token must not be expired
                },
            },
        });
        
        if (!user) {
            return NextResponse.json(
                { message: 'Invalid or expired reset token' },
                { 
                    status: 400,
                    headers: securityHeaders
                }
            );
        }
        
        // Check if user has exceeded reset attempts
        if (user.resetAttempts >= 5) {
            return NextResponse.json(
                { message: 'Too many reset attempts. Please request a new reset link.' },
                { 
                    status: 429,
                    headers: securityHeaders
                }
            );
        }
        
        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 12);
        
        // Update user password and clear reset fields
        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                resetToken: null,
                resetExpires: null,
                resetAttempts: 0,
                lastResetAttempt: null,
                updatedAt: new Date(),
            },
        });
        
        // Invalidate all existing sessions for this user
        // This would typically involve invalidating JWT tokens or session records
        // For now, we'll just log it
        console.log(`Password reset completed for user ${user.email}. All sessions should be invalidated.`);
        
        return NextResponse.json(
            { 
                message: 'Password reset successfully' 
            },
            { 
                status: 200,
                headers: securityHeaders
            }
        );
        
    } catch (error) {
        console.error('Reset password error:', error);
        
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { 
                    message: 'Invalid input data.',
                    errors: error.issues 
                },
                { 
                    status: 400,
                    headers: securityHeaders
                }
            );
        }
        
        return NextResponse.json(
            { 
                message: 'An error occurred. Please try again later.' 
            },
            { 
                status: 500,
                headers: securityHeaders
            }
        );
    }
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
    return new NextResponse(null, {
        status: 200,
        headers: {
            ...securityHeaders,
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });
}
