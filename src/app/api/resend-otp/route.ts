import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();

// Validation schema for resend OTP
const resendOtpSchema = z.object({
    email: z.string().email(),
});

// Generate OTP
function generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send OTP email
async function sendOTPEmail(email: string, otp: string, name: string) {
    // Create transporter (using Gmail as example - you should use your own SMTP settings)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SMTP_USER || 'your-email@gmail.com',
            pass: process.env.SMTP_PASS || 'your-app-password',
        },
    });

    const mailOptions = {
        from: process.env.SMTP_USER || 'your-email@gmail.com',
        to: email,
        subject: 'TechOrbitCare - New Verification Code',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
                    <h1 style="color: white; margin: 0; font-size: 28px;">TechOrbitCare</h1>
                    <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Your Trusted Mobile Repair Partner</p>
                </div>
                
                <div style="padding: 30px; background: #f9f9f9;">
                    <h2 style="color: #333; margin: 0 0 20px 0;">New Verification Code</h2>
                    <p style="color: #666; line-height: 1.6; margin: 0 0 20px 0;">
                        Hi ${name},<br><br>
                        You requested a new verification code. Here's your new OTP:
                    </p>
                    
                    <div style="background: white; border: 2px solid #667eea; border-radius: 10px; padding: 20px; text-align: center; margin: 20px 0;">
                        <p style="margin: 0 0 10px 0; color: #666; font-size: 14px;">Your new verification code is:</p>
                        <h1 style="margin: 0; color: #667eea; font-size: 32px; letter-spacing: 5px; font-weight: bold;">${otp}</h1>
                    </div>
                    
                    <p style="color: #666; line-height: 1.6; margin: 20px 0 0 0; font-size: 14px;">
                        This code will expire in 10 minutes. If you didn't request this code, 
                        please ignore this email.
                    </p>
                </div>
                
                <div style="background: #333; padding: 20px; text-align: center;">
                    <p style="color: #999; margin: 0; font-size: 12px;">
                        © 2024 TechOrbitCare. All rights reserved.
                    </p>
                </div>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Resend OTP email sent successfully to:', email);
    } catch (error) {
        console.error('Error sending resend OTP email:', error);
        throw new Error('Failed to send verification email');
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        
        // Validate input
        const validatedData = resendOtpSchema.parse(body);
        const { email } = validatedData;

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

        // Generate new OTP
        const otp = generateOTP();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

        // Update user with new OTP
        await prisma.user.update({
            where: { id: user.id },
            data: {
                otpCode: otp,
                otpExpires,
            },
        });

        // Send new OTP email
        try {
            await sendOTPEmail(email, otp, user.name);
        } catch {
            return NextResponse.json(
                { error: 'Failed to send verification email. Please try again.' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            message: 'New verification code sent to your email.',
        });

    } catch (error) {
        console.error('Resend OTP error:', error);
        
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
