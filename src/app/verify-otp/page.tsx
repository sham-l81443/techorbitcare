'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
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
import { useVerifyOtp, useResendOtp } from '@/hooks/useAuth';

const commonClass = "bg-gradient-to-r from-blue-500 to-blue-500/40 absolute -z-10 rounded-4xl";
const mobileClass = "h-[500px] w-[400px] -top-[100px] -right-[150px] rotate-[-150deg] rounded-4xl";
const desktopClass = "lg:h-[1000px] lg:w-[1000px] lg:-top-[400px] lg:-right-[300px] lg:rotate-[-150deg]";

// Zod validation schema for OTP verification
const otpSchema = z.object({
    otp: z
        .string()
        .min(6, 'OTP must be 6 digits')
        .max(6, 'OTP must be 6 digits')
        .regex(/^\d{6}$/, 'OTP must contain only numbers'),
});

type OtpFormData = z.infer<typeof otpSchema>;

// Background component for the OTP verification page
const OtpBackground = () => {
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

function VerifyOtpContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [countdown, setCountdown] = useState(0);
    const [email, setEmail] = useState('');

    const verifyOtpMutation = useVerifyOtp();
    const resendOtpMutation = useResendOtp();

    const form = useForm<OtpFormData>({
        resolver: zodResolver(otpSchema),
        defaultValues: {
            otp: '',
        },
    });

    // Get email from URL params
    useEffect(() => {
        const emailParam = searchParams.get('email');
        if (emailParam) {
            setEmail(emailParam);
        } else {
            // Redirect to signup if no email provided
            router.push('/signup');
        }
    }, [searchParams, router]);

    // Countdown timer for resend button
    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    const onSubmit = (data: OtpFormData) => {
        verifyOtpMutation.mutate(
            {
                email,
                otp: data.otp,
            },
            {
                onSuccess: () => {
                    router.push('/login');
                },
            }
        );
    };

    const handleResendOtp = () => {
        resendOtpMutation.mutate(
            { email },
            {
                onSuccess: () => {
                    setCountdown(60); // 60 seconds countdown
                },
            }
        );
    };

    return (
        <div className="min-h-screen bg-white relative overflow-hidden">
            <OtpBackground />
            
            <div className="relative z-10 min-h-screen px-6 py-12">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
                        {/* Left Column - OTP Verification Form */}
                        <div className="flex items-center justify-center lg:justify-start">
                            <div className="w-full max-w-md relative z-20">
                                <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                                    <div className="text-center lg:text-left space-y-2 mb-8">
                                        <h1 className="text-4xl lg:text-5xl font-light text-gray-900">
                                            Verify Email
                                        </h1>
                                        <p className="text-lg text-gray-600">
                                            Enter the 6-digit code sent to your email
                                        </p>
                                        {email && (
                                            <p className="text-sm text-gray-500">
                                                Code sent to: <span className="font-medium">{email}</span>
                                            </p>
                                        )}
                                    </div>
                                
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                        <FormField
                                            control={form.control}
                                            name="otp"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-sm font-medium text-gray-700">
                                                        Verification Code
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="text"
                                                            placeholder="Enter 6-digit code"
                                                            className="h-12 text-center text-2xl tracking-widest"
                                                            maxLength={6}
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        
                                        <Button 
                                            type="submit" 
                                            disabled={verifyOtpMutation.isPending}
                                            className="w-full h-12 text-base font-medium bg-black hover:bg-gray-800 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {verifyOtpMutation.isPending ? 'Verifying...' : 'Verify Email'}
                                        </Button>
                                        
                                        <div className="text-center space-y-2">
                                            <p className="text-sm text-gray-600">
                                                Didn&apos;t receive the code?
                                            </p>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={handleResendOtp}
                                                disabled={resendOtpMutation.isPending || countdown > 0}
                                                className="w-full h-10 text-sm"
                                            >
                                                {resendOtpMutation.isPending 
                                                    ? 'Sending...' 
                                                    : countdown > 0 
                                                        ? `Resend in ${countdown}s` 
                                                        : 'Resend Code'
                                                }
                                            </Button>
                                        </div>
                                        
                                        <div className="text-center">
                                            <p className="text-sm text-gray-600">
                                                Wrong email?{' '}
                                                <Link 
                                                    href="/signup" 
                                                    className="text-blue-600 hover:text-blue-500 font-medium"
                                                >
                                                    Go back to signup
                                                </Link>
                                            </p>
                                        </div>
                                    </form>
                                </Form>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Simple Quote */}
                        <div className="hidden lg:flex items-center justify-end">
                            <div className="w-full max-w-lg">
                                <div className="text-right">
                                    <h2 className="text-6xl font-light text-gray-900/70 leading-tight">
                                        &quot;Secure & Reliable&quot;
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function VerifyOtpPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VerifyOtpContent />
        </Suspense>
    );
}
