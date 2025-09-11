import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendPasswordResetEmail } from '@/lib/email';
import crypto from 'crypto';
import { z } from 'zod';

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_ATTEMPTS = 3; // 3 attempts per window
const RATE_LIMIT_MAX_EMAILS = 5; // 5 emails per hour per email

// Validation schema
const forgotPasswordSchema = z.object({
    email: z.string().email('Invalid email address'),
});

// Security headers
const securityHeaders = {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
};

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
                    message: 'Too many requests. Please try again later.',
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
        const { email } = forgotPasswordSchema.parse(body);
        
        // Check email-based rate limiting
        if (!checkRateLimit(`email:${email}`, RATE_LIMIT_MAX_EMAILS)) {
            return NextResponse.json(
                { 
                    message: 'Too many reset attempts for this email. Please try again later.',
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
        
        // Find user by email
        const user = await prisma.user.findUnique({
            where: { email: email.toLowerCase() },
        });
        
        // For testing: Send email even if user doesn't exist (remove in production)
        const isTestMode = process.env.NODE_ENV === 'development' && email === 'test@example.com';
        
        console.log('🔍 Forgot Password Debug:');
        console.log('Email:', email);
        console.log('User found:', !!user);
        console.log('User verified:', user?.isVerified);
        console.log('Is test mode:', isTestMode);
        console.log('Will send email:', (user && user.isVerified) || isTestMode);
        
        // Always return success to prevent email enumeration
        // But only process if user exists and is verified
        if ((user && user.isVerified) || isTestMode) {
            // Check if user has recent reset attempts
            const now = new Date();
            const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
            
            if (user && user.lastResetAttempt && user.lastResetAttempt > oneHourAgo) {
                return NextResponse.json(
                    { 
                        message: 'Password reset email sent! Check your inbox.',
                        retryAfter: 3600 // 1 hour
                    },
                    { 
                        status: 200,
                        headers: securityHeaders
                    }
                );
            }
            
            // Generate secure reset token
            const resetToken = crypto.randomBytes(32).toString('hex');
            const resetExpires = new Date(now.getTime() + 15 * 60 * 1000); // 15 minutes
            
            // Update user with reset token (only if user exists)
            if (user) {
                await prisma.user.update({
                    where: { id: user.id },
                    data: {
                        resetToken,
                        resetExpires,
                        lastResetAttempt: now,
                        resetAttempts: {
                            increment: 1
                        }
                    },
                });
            }
            
            // Send password reset email
            const resetLink = `${process.env.NEXTAUTH_URL || 'http://localhost:3001'}/reset-password?token=${resetToken}`;
            await sendPasswordResetEmail(email, resetLink);
            
            // In development, also return the reset link in the response
            if (process.env.NODE_ENV === 'development') {
                return NextResponse.json(
                    { 
                        message: 'Password reset email sent! Check your inbox.',
                        resetLink: resetLink, // Include reset link in development
                        retryAfter: 0
                    },
                    { 
                        status: 200,
                        headers: securityHeaders
                    }
                );
            }
        }
        
        // Always return success to prevent email enumeration
        return NextResponse.json(
            { 
                message: 'Password reset email sent! Check your inbox.',
                retryAfter: 0
            },
            { 
                status: 200,
                headers: securityHeaders
            }
        );
        
    } catch (error) {
        console.error('Forgot password error:', error);
        
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { 
                    message: 'Invalid email address.',
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
