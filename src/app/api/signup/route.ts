import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();

// Validation schema for signup
const signupSchema = z.object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
    phone: z.string().min(10).max(15),
    password: z.string().min(8).max(100),
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
        subject: 'TechOrbitCare - Email Verification',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
                    <h1 style="color: white; margin: 0; font-size: 28px;">TechOrbitCare</h1>
                    <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Your Trusted Mobile Repair Partner</p>
                </div>
                
                <div style="padding: 30px; background: #f9f9f9;">
                    <h2 style="color: #333; margin: 0 0 20px 0;">Welcome ${name}!</h2>
                    <p style="color: #666; line-height: 1.6; margin: 0 0 20px 0;">
                        Thank you for creating an account with TechOrbitCare. To complete your registration, 
                        please verify your email address using the OTP below:
                    </p>
                    
                    <div style="background: white; border: 2px solid #667eea; border-radius: 10px; padding: 20px; text-align: center; margin: 20px 0;">
                        <p style="margin: 0 0 10px 0; color: #666; font-size: 14px;">Your verification code is:</p>
                        <h1 style="margin: 0; color: #667eea; font-size: 32px; letter-spacing: 5px; font-weight: bold;">${otp}</h1>
                    </div>
                    
                    <p style="color: #666; line-height: 1.6; margin: 20px 0 0 0; font-size: 14px;">
                        This code will expire in 10 minutes. If you didn't create an account with us, 
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
        console.log('OTP email sent successfully to:', email);
    } catch (error) {
        console.error('Error sending OTP email:', error);
        throw new Error('Failed to send verification email');
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        
        // Validate input
        const validatedData = signupSchema.parse(body);
        const { name, email, phone, password } = validatedData;

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: 'User with this email already exists' },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Generate OTP
        const otp = generateOTP();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

        // Create user with OTP
        const user = await prisma.user.create({
            data: {
                name,
                email,
                phone,
                password: hashedPassword,
                otpCode: otp,
                otpExpires,
                isVerified: false,
            },
        });

        // Send OTP email
        try {
            await sendOTPEmail(email, otp, name);
        } catch {
            // If email fails, delete the user and return error
            await prisma.user.delete({
                where: { id: user.id },
            });
            
            return NextResponse.json(
                { error: 'Failed to send verification email. Please try again.' },
                { status: 500 }
            );
        }

        // Return success response (don't include sensitive data)
        return NextResponse.json({
            message: 'Account created successfully. Please check your email for verification.',
            userId: user.id,
        });

    } catch (error) {
        console.error('Signup error:', error);
        
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
