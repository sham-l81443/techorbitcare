import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Validation schema for OTP verification
const verifyOtpSchema = z.object({
    email: z.email(),
    otp: z.string().length(6).regex(/^\d{6}$/, 'OTP must be 6 digits'),
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        
        // Validate input
        const validatedData = verifyOtpSchema.parse(body);
        const { email, otp } = validatedData;

        // Find user by email
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        // Check if user is already verified
        if (user.isVerified) {
            return NextResponse.json(
                { error: 'Email is already verified' },
                { status: 400 }
            );
        }

        // Check if OTP exists and is not expired
        if (!user.otpCode || !user.otpExpires) {
            return NextResponse.json(
                { error: 'No valid OTP found. Please request a new one.' },
                { status: 400 }
            );
        }

        // Check if OTP is expired
        if (new Date() > user.otpExpires) {
            return NextResponse.json(
                { error: 'OTP has expired. Please request a new one.' },
                { status: 400 }
            );
        }

        // Verify OTP
        if (user.otpCode !== otp) {
            return NextResponse.json(
                { error: 'Invalid OTP. Please check and try again.' },
                { status: 400 }
            );
        }

        // Update user as verified and clear OTP
        await prisma.user.update({
            where: { id: user.id },
            data: {
                isVerified: true,
                otpCode: null,
                otpExpires: null,
            },
        });

        return NextResponse.json({
            message: 'Email verified successfully!',
            verified: true,
        });

    } catch (error) {
        console.error('OTP verification error:', error);
        
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Invalid input data', details: error.issues },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}
