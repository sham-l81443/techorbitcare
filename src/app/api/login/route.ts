import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

// Validation schema for login
const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, 'Password is required'),
    remember: z.boolean().optional(),
});

// Generate JWT token
function generateToken(userId: string, email: string, remember: boolean = false): string {
    const expiresIn = remember ? '30d' : '1d'; // 30 days if remember me, 1 day otherwise
    return jwt.sign(
        { userId, email },
        process.env.JWT_SECRET!,
        { expiresIn }
    );
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        
        // Validate input
        const validatedData = loginSchema.parse(body);
        const { email, password, remember } = validatedData;

        // Find user by email
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json(
                { error: 'Invalid email or password' },
                { status: 401 }
            );
        }

        // Check if user is verified
        if (!user.isVerified) {
            return NextResponse.json(
                { error: 'Please verify your email before logging in. Check your inbox for verification instructions.' },
                { status: 401 }
            );
        }

        // Check if user has a password (not a Google OAuth user)
        if (!user.password) {
            return NextResponse.json(
                { error: 'Please use Google sign-in for this account' },
                { status: 401 }
            );
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            return NextResponse.json(
                { error: 'Invalid email or password' },
                { status: 401 }
            );
        }

        // Generate JWT token
        const token = generateToken(user.id, user.email, remember);

        // Return success response with user data (excluding password)
        const { password: _, ...userWithoutPassword } = user;

        return NextResponse.json({
            message: 'Login successful',
            user: userWithoutPassword,
            token,
        });

    } catch (error) {
        console.error('Login error:', error);
        
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
