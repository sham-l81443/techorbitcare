'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { ArrowLeft, Eye, EyeOff, Shield, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';

const commonClass = "bg-gradient-to-r from-blue-500 to-blue-500/40 absolute -z-10 rounded-4xl";
const mobileClass = "h-[500px] w-[400px] -top-[100px] -right-[150px] rotate-[-150deg] rounded-4xl";
const desktopClass = "lg:h-[1000px] lg:w-[1000px] lg:-top-[400px] lg:-right-[300px] lg:rotate-[-150deg]";

// Password validation schema
const resetPasswordSchema = z.object({
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

// Background component
const ResetPasswordBackground = () => {
    return (
        <>
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23F9FAFB' strokeWidth='0.4'%3E%3Cpath d='M0 0h12v12H0z'/%3E%3C/g%3E%3C/svg%3E")`,
                }}
            />
            <div className={`${commonClass} ${mobileClass} ${desktopClass} z-0`}></div>
        </>
    );
};

// Password strength indicator component
const PasswordStrengthIndicator = ({ password }: { password: string }) => {
    const getStrength = (password: string) => {
        let score = 0;
        if (password.length >= 8) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/\d/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;
        return score;
    };

    const strength = getStrength(password);
    const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];

    if (!password) return null;

    return (
        <div className="space-y-2">
            <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((level) => (
                    <div
                        key={level}
                        className={`h-1 flex-1 rounded-full ${
                            level <= strength ? strengthColors[strength - 1] : 'bg-gray-200'
                        }`}
                    />
                ))}
            </div>
            <p className={`text-xs ${
                strength <= 2 ? 'text-red-600' : 
                strength <= 3 ? 'text-yellow-600' : 
                'text-green-600'
            }`}>
                Password strength: {strengthLabels[strength - 1] || 'Very Weak'}
            </p>
        </div>
    );
};

function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const [isValidToken, setIsValidToken] = useState<boolean | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const token = searchParams.get('token');

    const form = useForm<ResetPasswordFormData>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: '',
            confirmPassword: '',
        },
    });

    // const watchedPassword = form.watch('password');

    // Validate token on component mount
    useEffect(() => {
        if (!token) {
            setIsValidToken(false);
            return;
        }

        const validateToken = async () => {
            try {
                const response = await fetch(`/api/validate-reset-token?token=${token}`);
                const result = await response.json();
                setIsValidToken(response.ok);
                
                if (!response.ok) {
                    toast.error(result.message || 'Invalid or expired reset token');
                }
            } catch (error) {
                console.error('Token validation error:', error);
                setIsValidToken(false);
                toast.error('Failed to validate reset token');
            }
        };

        validateToken();
    }, [token]);

    const onSubmit = async (data: ResetPasswordFormData) => {
        if (!token) return;
        
        setIsLoading(true);
        
        try {
            const response = await fetch('/api/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token,
                    password: data.password,
                }),
            });

            const result = await response.json();

            if (response.ok) {
                setIsSuccess(true);
                toast.success('Password reset successfully!');
            } else {
                toast.error(result.message || 'Failed to reset password');
            }
        } catch (error) {
            console.error('Reset password error:', error);
            toast.error('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Loading state
    if (isValidToken === null) {
        return (
            <div className="min-h-screen bg-white relative overflow-hidden">
                <ResetPasswordBackground />
                <div className="relative z-10 min-h-screen px-6 py-12">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center justify-center min-h-[80vh]">
                            <div className="w-full max-w-md relative z-20">
                                <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center">
                                    <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                                    <p className="text-gray-600">Validating reset token...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Invalid token state
    if (isValidToken === false) {
        return (
            <div className="min-h-screen bg-white relative overflow-hidden">
                <ResetPasswordBackground />
                <div className="relative z-10 min-h-screen px-6 py-12">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center justify-center min-h-[80vh]">
                            <div className="w-full max-w-md relative z-20">
                                <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center">
                                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <XCircle className="w-8 h-8 text-red-600" />
                                    </div>
                                    
                                    <h1 className="text-3xl font-light text-gray-900 mb-4">
                                        Invalid Reset Link
                                    </h1>
                                    
                                    <p className="text-gray-600 mb-8">
                                        This password reset link is invalid or has expired. Please request a new one.
                                    </p>
                                    
                                    <div className="space-y-4">
                                        <Link href="/forgot-password">
                                            <Button className="w-full h-12 text-base">
                                                Request New Reset Link
                                            </Button>
                                        </Link>
                                        
                                        <Link href="/login">
                                            <Button variant="outline" className="w-full h-12 text-base">
                                                <ArrowLeft className="w-4 h-4 mr-2" />
                                                Back to Login
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Success state
    if (isSuccess) {
        return (
            <div className="min-h-screen bg-white relative overflow-hidden">
                <ResetPasswordBackground />
                <div className="relative z-10 min-h-screen px-6 py-12">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center justify-center min-h-[80vh]">
                            <div className="w-full max-w-md relative z-20">
                                <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle className="w-8 h-8 text-green-600" />
                                    </div>
                                    
                                    <h1 className="text-3xl font-light text-gray-900 mb-4">
                                        Password Reset Successfully!
                                    </h1>
                                    
                                    <p className="text-gray-600 mb-8">
                                        Your password has been updated. You can now log in with your new password.
                                    </p>
                                    
                                    <Link href="/login">
                                        <Button className="w-full h-12 text-base">
                                            Continue to Login
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Reset password form
    return (
        <div className="min-h-screen bg-white relative overflow-hidden">
            <ResetPasswordBackground />
            
            <div className="relative z-10 min-h-screen px-6 py-12">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-center min-h-[80vh]">
                        <div className="w-full max-w-md relative z-20">
                            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                                <div className="text-center space-y-2 mb-8">
                                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Shield className="w-8 h-8 text-blue-600" />
                                    </div>
                                    <h1 className="text-4xl font-light text-gray-900">
                                        Reset Password
                                    </h1>
                                    <p className="text-lg text-gray-600">
                                        Enter your new password below.
                                    </p>
                                </div>
                            
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                        <FormField
                                            control={form.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-sm font-medium text-gray-700">
                                                        New Password
                                                    </FormLabel>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <Input
                                                                type={showPassword ? "text" : "password"}
                                                                placeholder="Enter new password"
                                                                className="h-12 text-base pr-10"
                                                                {...field}
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => setShowPassword(!showPassword)}
                                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600"
                                                                aria-label={showPassword ? "Hide password" : "Show password"}
                                                            >
                                                                {showPassword ? (
                                                                    <EyeOff className="h-5 w-5" />
                                                                ) : (
                                                                    <Eye className="h-5 w-5" />
                                                                )}
                                                            </button>
                                                        </div>
                                                    </FormControl>
                                                    <PasswordStrengthIndicator password={field.value} />
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        
                                        <FormField
                                            control={form.control}
                                            name="confirmPassword"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-sm font-medium text-gray-700">
                                                        Confirm Password
                                                    </FormLabel>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <Input
                                                                type={showConfirmPassword ? "text" : "password"}
                                                                placeholder="Confirm new password"
                                                                className="h-12 text-base pr-10"
                                                                {...field}
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600"
                                                                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                                                            >
                                                                {showConfirmPassword ? (
                                                                    <EyeOff className="h-5 w-5" />
                                                                ) : (
                                                                    <Eye className="h-5 w-5" />
                                                                )}
                                                            </button>
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        
                                        <Button 
                                            type="submit" 
                                            disabled={isLoading}
                                            className="w-full h-12 text-base font-medium bg-black hover:bg-gray-800 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isLoading ? 'Resetting Password...' : 'Reset Password'}
                                        </Button>
                                        
                                        <div className="text-center">
                                            <Link 
                                                href="/login" 
                                                className="text-blue-600 hover:text-blue-500 font-medium text-sm flex items-center justify-center"
                                            >
                                                <ArrowLeft className="w-4 h-4 mr-1" />
                                                Back to Login
                                            </Link>
                                        </div>
                                    </form>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-white relative overflow-hidden">
                <ResetPasswordBackground />
                <div className="relative z-10 min-h-screen px-6 py-12">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center justify-center min-h-[80vh]">
                            <div className="w-full max-w-md relative z-20">
                                <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center">
                                    <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                                    <p className="text-gray-600">Loading...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }>
            <ResetPasswordForm />
        </Suspense>
    );
}
