import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Security headers
const securityHeaders = {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
};

// Validation schema (unused but kept for future use)
// const validateTokenSchema = z.object({
//     token: z.string().min(1, 'Token is required'),
// });

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const token = searchParams.get('token');
        
        if (!token) {
            return NextResponse.json(
                { message: 'Token is required' },
                { 
                    status: 400,
                    headers: securityHeaders
                }
            );
        }
        
        // Validate token format (should be 64 character hex string)
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
            select: {
                id: true,
                email: true,
                resetExpires: true,
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
        
        // Check if token is close to expiration (within 5 minutes)
        const now = new Date();
        const fiveMinutesFromNow = new Date(now.getTime() + 5 * 60 * 1000);
        const isNearExpiration = user.resetExpires && user.resetExpires < fiveMinutesFromNow;
        
        return NextResponse.json(
            { 
                message: 'Token is valid',
                isNearExpiration,
                expiresAt: user.resetExpires?.toISOString(),
            },
            { 
                status: 200,
                headers: securityHeaders
            }
        );
        
    } catch (error) {
        console.error('Token validation error:', error);
        
        return NextResponse.json(
            { 
                message: 'An error occurred while validating the token' 
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
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });
}
