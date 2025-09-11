'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Home,
    Database,
    Users,
    Gift,
    TrendingUp,
    Settings,
    Plus
} from 'lucide-react';
import { HeroBackground } from '@/app/_home/hero-background';
import Navbar from '../layout/navbar';

// Admin Overview Tab Content
const AdminOverviewTabContent = () => {
    return (
        <div className="space-y-6">

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-white border border-gray-200">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Repairs</p>
                                <p className="text-2xl font-bold text-gray-900">1,234</p>
                            </div>
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <Database className="h-6 w-6 text-blue-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white border border-gray-200">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Active Users</p>
                                <p className="text-2xl font-bold text-gray-900">456</p>
                            </div>
                            <div className="p-2 bg-green-100 rounded-lg">
                                <Users className="h-6 w-6 text-green-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white border border-gray-200">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Coupons Issued</p>
                                <p className="text-2xl font-bold text-gray-900">89</p>
                            </div>
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <Gift className="h-6 w-6 text-purple-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white border border-gray-200">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Revenue</p>
                                <p className="text-2xl font-bold text-gray-900">₹2.4L</p>
                            </div>
                            <div className="p-2 bg-orange-100 rounded-lg">
                                <TrendingUp className="h-6 w-6 text-orange-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

// Admin Coupons Tab Content
const AdminCouponsTabContent = () => {
    return (
        <div className="space-y-6">
            <Card className="bg-white border border-gray-200">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Gift className="h-5 w-5 text-green-500" />
                        Coupon Management
                    </CardTitle>
                    <CardDescription>
                        Create and manage discount coupons for your customers
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-4 mb-6">
                        <Button className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Create New Coupon
                        </Button>
                        <Button variant="outline">
                            View All Coupons
                        </Button>
                    </div>
                    <div className="text-center py-8">
                        <Gift className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">No coupons created yet</p>
                        <p className="text-sm text-gray-400 mt-2">Create your first coupon to get started</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

// Admin Analytics Tab Content
const AdminAnalyticsTabContent = () => {
    return (
        <div className="space-y-6">
            <Card className="bg-white border border-gray-200">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-blue-500" />
                        Business Analytics
                    </CardTitle>
                    <CardDescription>
                        Track your business performance and growth metrics
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-8">
                        <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">Analytics dashboard coming soon</p>
                        <p className="text-sm text-gray-400 mt-2">Detailed reports and insights will be available here</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

// Admin Settings Tab Content
const AdminSettingsTabContent = () => {
    return (
        <div className="space-y-6">
            <Card className="bg-white border border-gray-200">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Settings className="h-5 w-5 text-gray-500" />
                        System Settings
                    </CardTitle>
                    <CardDescription>
                        Configure your business settings and preferences
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-8">
                        <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">Settings panel coming soon</p>
                        <p className="text-sm text-gray-400 mt-2">Manage your business configuration here</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

// Main Admin Dashboard Component
export const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');

    return (
        <div className="h-screen relative flex flex-col overflow-hidden">
            {/* Hero Background */}
            <Navbar />
            <HeroBackground className='from-blue-800 to-blue-800/40' />
            <div className="container mx-auto px-4 py-8 relative z-10 h-full overflow-hidden flex-1 flex flex-col">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex-1 flex h-full flex-col overflow-hidden">
                    <TabsList className="w-full mb-8 h-12 overflow-x-auto scrollbar-hide lg:grid lg:grid-cols-4 justify-start flex gap-x-4">
                            <TabsTrigger value="overview" className="whitespace-nowrap flex items-center gap-2 text-sm font-medium py-2 px-4 min-w-max hover:bg-gray-200 hover:scale-105 cursor-pointer transition-all duration-200 rounded-md">
                                <Home className="h-4 w-4" />
                                Overview
                            </TabsTrigger>
                            <TabsTrigger value="coupons" className="flex items-center gap-2 text-sm font-medium py-2 px-4 hover:bg-gray-200 hover:scale-105 cursor-pointer transition-all duration-200 rounded-md min-w-max">
                                <Gift className="h-4 w-4" />
                                Coupons
                            </TabsTrigger>
                            <TabsTrigger value="analytics" className="flex items-center gap-2 text-sm font-medium py-2 px-4 hover:bg-gray-200 hover:scale-105 cursor-pointer transition-all duration-200 rounded-md min-w-max">
                                <TrendingUp className="h-4 w-4" />
                                Analytics
                            </TabsTrigger>
                            <TabsTrigger value="settings" className="flex items-center gap-2 text-sm font-medium py-2 px-4 hover:bg-gray-200 hover:scale-105 cursor-pointer transition-all duration-200 rounded-md min-w-max">
                                <Settings className="h-4 w-4" />
                                Settings
                            </TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="flex-1 overflow-y-auto">
                        <AdminOverviewTabContent />
                    </TabsContent>

                    <TabsContent value="coupons" className="flex-1 overflow-y-auto">
                        <AdminCouponsTabContent />
                    </TabsContent>

                    <TabsContent value="analytics" className="flex-1 overflow-y-auto">
                        <AdminAnalyticsTabContent />
                    </TabsContent>

                    <TabsContent value="settings" className="flex-1 overflow-y-auto">
                        <AdminSettingsTabContent />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};
