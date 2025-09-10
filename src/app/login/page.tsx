'use client';

import React from 'react';
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

const commonClass = "bg-gradient-to-r from-blue-500 to-blue-500/40 absolute -z-10 rounded-4xl";
const mobileClass = "h-[500px] w-[400px] -top-[100px] -right-[150px] rotate-[-150deg] rounded-4xl";
const desktopClass = "lg:h-[1000px] lg:w-[1000px] lg:-top-[400px] lg:-right-[300px] lg:rotate-[-150deg]";

// Zod validation schema
const loginSchema = z.object({
    email: z
        .string()
        .min(1, 'Email is required'),
    password: z
        .string()
        .min(1, 'Password is required'),
    remember: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

// Background component for the login page
const LoginBackground = () => {
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

export default function LoginPage() {
    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
            remember: false,
        },
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            // Handle login logic here
            console.log('Login attempt:', data);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            // Redirect or show success message
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <div className="min-h-screen bg-white relative overflow-hidden">
            <LoginBackground />
            
            <div className="relative z-10 min-h-screen px-6 py-12">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
                        {/* Left Column - Login Form */}
                        <div className="flex items-center justify-center lg:justify-start">
                            <div className="w-full max-w-md relative z-20">
                                <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                                    <div className="text-center lg:text-left space-y-2 mb-8">
                                        <h1 className="text-4xl lg:text-5xl font-light text-gray-900">
                                            Welcome Back
                                        </h1>
                                        <p className="text-lg text-gray-600">
                                            Sign in to your TechOrbitCare account
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
                                        
                                        <FormField
                                            control={form.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-sm font-medium text-gray-700">
                                                        Password
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="password"
                                                            placeholder="Enter your password"
                                                            className="h-12 text-base"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        
                                        <div className="flex items-center justify-between">
                                            <FormField
                                                control={form.control}
                                                name="remember"
                                                render={({ field }) => (
                                                    <FormItem className="flex items-center space-x-2">
                                                        <FormControl>
                                                            <input
                                                                type="checkbox"
                                                                checked={field.value}
                                                                onChange={field.onChange}
                                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                            />
                                                        </FormControl>
                                                        <FormLabel className="text-sm text-gray-600 cursor-pointer">
                                                            Remember me
                                                        </FormLabel>
                                                    </FormItem>
                                                )}
                                            />
                                            <Link 
                                                href="/forgot-password" 
                                                className="text-sm text-blue-600 hover:text-blue-500 font-medium"
                                            >
                                                Forgot password?
                                            </Link>
                                        </div>
                                        
                                        <Button 
                                            type="submit" 
                                            disabled={form.formState.isSubmitting}
                                            className="w-full h-12 text-base font-medium bg-black hover:bg-gray-800 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {form.formState.isSubmitting ? 'Signing In...' : 'Sign In'}
                                        </Button>
                                        
                                        <div className="text-center">
                                            <p className="text-sm text-gray-600">
                                                Don&apos;t have an account?{' '}
                                                <Link 
                                                    href="/register" 
                                                    className="text-blue-600 hover:text-blue-500 font-medium"
                                                >
                                                    Sign up
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
                                        &quot;Your Trusted Mobile Repair Partner&quot;
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
