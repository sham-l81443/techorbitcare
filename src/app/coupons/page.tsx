'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/hooks/useAuthStore';
import { useAvailableCoupons, useUsedCoupons, useExpiredCoupons, useClaimCoupon } from '@/hooks/useCoupons';
import { CouponCard } from '@/components/coupons/CouponCard';
import { Coupon } from '@/types/coupon';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Gift, 
  Search, 
  CheckCircle, 
  XCircle
} from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

const commonClass = "bg-gradient-to-r from-blue-500 to-blue-500/40 absolute -z-10 rounded-4xl";
const mobileClass = "h-[500px] w-[400px] -top-[100px] -right-[150px] rotate-[-150deg] rounded-4xl";
const desktopClass = "lg:h-[1000px] lg:w-[1000px] lg:-top-[400px] lg:-right-[300px] lg:rotate-[-150deg]";

// Background component
const CouponsBackground = () => {
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

export default function CouponsPage() {
    const router = useRouter();
    const { isAuthenticated, user } = useAuthStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('available');

    const { data: availableData, isLoading: availableLoading } = useAvailableCoupons();
    const { data: usedData, isLoading: usedLoading } = useUsedCoupons();
    const { data: expiredData, isLoading: expiredLoading } = useExpiredCoupons();
    const claimCouponMutation = useClaimCoupon();

    // Redirect to login if not authenticated
    React.useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, router]);

    const handleClaimCoupon = (couponCode: string) => {
        claimCouponMutation.mutate(couponCode);
    };

    const filterCoupons = (coupons: Coupon[], searchTerm: string) => {
        if (!searchTerm) return coupons;
        return coupons.filter((coupon) => 
            coupon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            coupon.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
            coupon.description?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    const getCouponStats = () => {
        const available = availableData?.coupons?.length || 0;
        const used = usedData?.coupons?.length || 0;
        const expired = expiredData?.coupons?.length || 0;
        return { available, used, expired, total: available + used + expired };
    };

    if (!isAuthenticated || !user) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <LoadingSpinner size="lg" className="mx-auto" />
                    <p className="mt-4 text-gray-600">Loading coupons...</p>
                </div>
            </div>
        );
    }

    const stats = getCouponStats();

    return (
        <div className="min-h-screen bg-white relative overflow-hidden">
            <CouponsBackground />
            
            <div className="relative z-10 min-h-screen px-6 py-12">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl lg:text-5xl font-light text-gray-900 mb-4">
                            My Coupons
                        </h1>
                        <p className="text-lg text-gray-600">
                            Manage your discount coupons and special offers
                        </p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <Card className="bg-white/50 backdrop-blur-sm border-white/20">
                            <CardContent className="p-4 text-center">
                                <div className="text-2xl font-bold text-blue-600">{stats.available}</div>
                                <div className="text-sm text-gray-600">Available</div>
                            </CardContent>
                        </Card>
                        <Card className="bg-white/50 backdrop-blur-sm border-white/20">
                            <CardContent className="p-4 text-center">
                                <div className="text-2xl font-bold text-green-600">{stats.used}</div>
                                <div className="text-sm text-gray-600">Used</div>
                            </CardContent>
                        </Card>
                        <Card className="bg-white/50 backdrop-blur-sm border-white/20">
                            <CardContent className="p-4 text-center">
                                <div className="text-2xl font-bold text-red-600">{stats.expired}</div>
                                <div className="text-sm text-gray-600">Expired</div>
                            </CardContent>
                        </Card>
                        <Card className="bg-white/50 backdrop-blur-sm border-white/20">
                            <CardContent className="p-4 text-center">
                                <div className="text-2xl font-bold text-gray-600">{stats.total}</div>
                                <div className="text-sm text-gray-600">Total</div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Search and Filter */}
                    <div className="mb-8">
                        <div className="relative max-w-md mx-auto">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                                type="text"
                                placeholder="Search coupons..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>

                    {/* Coupons Tabs */}
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid w-full grid-cols-3 mb-8">
                            <TabsTrigger value="available" className="flex items-center gap-2">
                                <Gift className="h-4 w-4" />
                                Available ({stats.available})
                            </TabsTrigger>
                            <TabsTrigger value="used" className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4" />
                                Used ({stats.used})
                            </TabsTrigger>
                            <TabsTrigger value="expired" className="flex items-center gap-2">
                                <XCircle className="h-4 w-4" />
                                Expired ({stats.expired})
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="available" className="space-y-6">
                            {availableLoading ? (
                                <div className="flex justify-center py-12">
                                    <LoadingSpinner size="lg" />
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filterCoupons(availableData?.coupons || [], searchTerm).map((coupon) => (
                                        <CouponCard
                                            key={coupon.id}
                                            coupon={coupon}
                                            onClaim={handleClaimCoupon}
                                            showClaimButton={true}
                                            isClaiming={claimCouponMutation.isPending}
                                        />
                                    ))}
                                </div>
                            )}
                            {availableData?.coupons?.length === 0 && (
                                <Card className="bg-white/50 backdrop-blur-sm border-white/20">
                                    <CardContent className="text-center py-12">
                                        <Gift className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Available Coupons</h3>
                                        <p className="text-gray-600">Check back later for new offers!</p>
                                    </CardContent>
                                </Card>
                            )}
                        </TabsContent>

                        <TabsContent value="used" className="space-y-6">
                            {usedLoading ? (
                                <div className="flex justify-center py-12">
                                    <LoadingSpinner size="lg" />
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filterCoupons(usedData?.coupons || [], searchTerm).map((coupon) => (
                                        <CouponCard
                                            key={coupon.id}
                                            coupon={coupon}
                                        />
                                    ))}
                                </div>
                            )}
                            {usedData?.coupons?.length === 0 && (
                                <Card className="bg-white/50 backdrop-blur-sm border-white/20">
                                    <CardContent className="text-center py-12">
                                        <CheckCircle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Used Coupons</h3>
                                        <p className="text-gray-600">Your used coupons will appear here.</p>
                                    </CardContent>
                                </Card>
                            )}
                        </TabsContent>

                        <TabsContent value="expired" className="space-y-6">
                            {expiredLoading ? (
                                <div className="flex justify-center py-12">
                                    <LoadingSpinner size="lg" />
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filterCoupons(expiredData?.coupons || [], searchTerm).map((coupon) => (
                                        <CouponCard
                                            key={coupon.id}
                                            coupon={coupon}
                                        />
                                    ))}
                                </div>
                            )}
                            {expiredData?.coupons?.length === 0 && (
                                <Card className="bg-white/50 backdrop-blur-sm border-white/20">
                                    <CardContent className="text-center py-12">
                                        <XCircle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Expired Coupons</h3>
                                        <p className="text-gray-600">Expired coupons will appear here.</p>
                                    </CardContent>
                                </Card>
                            )}
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}
