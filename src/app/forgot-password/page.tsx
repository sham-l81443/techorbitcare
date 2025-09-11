'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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
import { ArrowLeft, Mail, Shield } from 'lucide-react';
import { toast } from 'sonner';

const commonClass = "bg-gradient-to-r from-blue-500 to-blue-500/40 absolute -z-10 rounded-4xl";
const mobileClass = "h-[500px] w-[400px] -top-[100px] -right-[150px] rotate-[-150deg] rounded-4xl";
const desktopClass = "lg:h-[1000px] lg:w-[1000px] lg:-top-[400px] lg:-right-[300px] lg:rotate-[-150deg]";

// Zod validation schema
const forgotPasswordSchema = z.object({
    email: z
        .string()
        .min(1, 'Email is required')
        .email('Please enter a valid email address'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

// Background component for the forgot password page
const ForgotPasswordBackground = () => {
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

export default function ForgotPasswordPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [resetLink, setResetLink] = useState<string | null>(null);

    const form = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: '',
        },
    });

    const onSubmit = async (data: ForgotPasswordFormData) => {
        setIsLoading(true);
        
        try {
            const response = await fetch('/api/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                setIsEmailSent(true);
                if (result.resetLink) {
                    setResetLink(result.resetLink);
                }
                toast.success('Password reset link sent to your email!');
            } else {
                toast.error(result.message || 'Failed to send reset email');
            }
        } catch (error) {
            console.error('Forgot password error:', error);
            toast.error('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (isEmailSent) {
        return (
            <div className="min-h-screen bg-white relative overflow-hidden">
                <ForgotPasswordBackground />
                
                <div className="relative z-10 min-h-screen px-6 py-12">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center justify-center min-h-[80vh]">
                            <div className="w-full max-w-md relative z-20">
                                <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Mail className="w-8 h-8 text-green-600" />
                                    </div>
                                    
                                    <h1 className="text-3xl font-light text-gray-900 mb-4">
                                        Check Your Email
                                    </h1>
                                    
                                    <p className="text-gray-600 mb-6">
                                        We&apos;ve sent a password reset link to <strong>{form.getValues('email')}</strong>
                                    </p>
                                    
                                    {resetLink && process.env.NODE_ENV === 'development' && (
                                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                                            <p className="text-sm font-medium text-blue-800 mb-2">
                                                🔧 Development Mode - Reset Link:
                                            </p>
                                            <div className="bg-white border border-blue-200 rounded p-3">
                                                <p className="text-xs text-blue-600 break-all font-mono">
                                                    {resetLink}
                                                </p>
                                            </div>
                                            <a 
                                                href={resetLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-block mt-2 text-sm text-blue-600 hover:text-blue-500 font-medium"
                                            >
                                                Click here to reset password →
                                            </a>
                                        </div>
                                    )}
                                    
                                    <p className="text-sm text-gray-500 mb-8">
                                        Didn&apos;t receive the email? Check your spam folder or try again.
                                    </p>
                                    
                                    <div className="space-y-4">
                                        <Button 
                                            onClick={() => setIsEmailSent(false)}
                                            variant="outline"
                                            className="w-full h-12 text-base"
                                        >
                                            Try Different Email
                                        </Button>
                                        
                                        <Link href="/login">
                                            <Button 
                                                variant="ghost"
                                                className="w-full h-12 text-base"
                                            >
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

    return (
        <div className="min-h-screen bg-white relative overflow-hidden">
            <ForgotPasswordBackground />
            
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
                                        Forgot Password?
                                    </h1>
                                    <p className="text-lg text-gray-600">
                                        No worries! Enter your email and we&apos;ll send you a reset link.
                                    </p>
                                </div>
                            
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-sm font-medium text-gray-700">
                                                        Email Address
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="email"
                                                            placeholder="Enter your email"
                                                            className="h-12 text-base"
                                                            {...field}
                                                        />
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
                                            {isLoading ? 'Sending Reset Link...' : 'Send Reset Link'}
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
