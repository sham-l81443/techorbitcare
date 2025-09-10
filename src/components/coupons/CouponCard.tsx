'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Coupon } from '@/types/coupon';
import { 
  Calendar, 
  Percent, 
  DollarSign, 
  Clock, 
  CheckCircle, 
  XCircle,
  Copy,
  Gift
} from 'lucide-react';
import { toast } from 'sonner';

interface CouponCardProps {
  coupon: Coupon;
  onClaim?: (couponCode: string) => void;
  showClaimButton?: boolean;
  isClaiming?: boolean;
}

export function CouponCard({ 
  coupon, 
  onClaim, 
  showClaimButton = false, 
  isClaiming = false 
}: CouponCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatDiscount = () => {
    if (coupon.discountType === 'PERCENTAGE') {
      return `${coupon.discountValue}% OFF`;
    } else {
      return `₹${coupon.discountValue} OFF`;
    }
  };

  const getStatusBadge = () => {
    if (coupon.isUsed) {
      return <Badge variant="secondary" className="bg-green-100 text-green-800">Used</Badge>;
    }
    if (coupon.isExpired) {
      return <Badge variant="destructive">Expired</Badge>;
    }
    if (coupon.isAvailable) {
      return <Badge variant="default" className="bg-blue-100 text-blue-800">Available</Badge>;
    }
    return <Badge variant="outline">Inactive</Badge>;
  };

  const copyCouponCode = () => {
    navigator.clipboard.writeText(coupon.code);
    toast.success('Coupon code copied to clipboard!');
  };

  const isExpiringSoon = () => {
    const validUntil = new Date(coupon.validUntil);
    const now = new Date();
    const daysUntilExpiry = Math.ceil((validUntil.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 7 && daysUntilExpiry > 0;
  };

  return (
    <Card className={`relative overflow-hidden transition-all duration-200 hover:shadow-lg ${
      coupon.isUsed ? 'opacity-75' : ''
    } ${isExpiringSoon() ? 'border-orange-200 bg-orange-50' : ''}`}>
      {/* Expiring Soon Badge */}
      {isExpiringSoon() && !coupon.isUsed && (
        <div className="absolute top-2 right-2 z-10">
          <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-300">
            <Clock className="h-3 w-3 mr-1" />
            Expires Soon
          </Badge>
        </div>
      )}

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Gift className="h-5 w-5 text-blue-500" />
              {coupon.name}
            </CardTitle>
            <CardDescription className="mt-1">
              {coupon.description || 'Special discount offer'}
            </CardDescription>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">
              {formatDiscount()}
            </div>
            {getStatusBadge()}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Coupon Code */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div>
            <p className="text-sm text-gray-600">Coupon Code</p>
            <p className="font-mono text-lg font-semibold">{coupon.code}</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={copyCouponCode}
            className="flex items-center gap-1"
          >
            <Copy className="h-4 w-4" />
            Copy
          </Button>
        </div>

        {/* Discount Details */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            {coupon.discountType === 'PERCENTAGE' ? (
              <Percent className="h-4 w-4 text-gray-500" />
            ) : (
              <DollarSign className="h-4 w-4 text-gray-500" />
            )}
            <span className="text-gray-600">Discount:</span>
            <span className="font-medium">{formatDiscount()}</span>
          </div>
          
          {coupon.minOrderAmount && (
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600">Min Order:</span>
              <span className="font-medium">₹{coupon.minOrderAmount}</span>
            </div>
          )}
        </div>

        {/* Validity Period */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="h-4 w-4" />
          <span>Valid from {formatDate(coupon.validFrom)} to {formatDate(coupon.validUntil)}</span>
        </div>

        {/* Usage Information */}
        {coupon.usageLimit && (
          <div className="text-sm text-gray-600">
            <span>Usage: {coupon.usedCount}/{coupon.usageLimit} times</span>
          </div>
        )}

        {/* Used Information */}
        {coupon.isUsed && coupon.usedAt && (
          <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 p-2 rounded">
            <CheckCircle className="h-4 w-4" />
            <span>Used on {formatDate(coupon.usedAt)}</span>
          </div>
        )}

        {/* Claim Button */}
        {showClaimButton && !coupon.isUsed && !coupon.isExpired && coupon.isAvailable && (
          <Button
            onClick={() => onClaim?.(coupon.code)}
            disabled={isClaiming}
            className="w-full"
          >
            {isClaiming ? 'Claiming...' : 'Claim Coupon'}
          </Button>
        )}

        {/* Expired Message */}
        {coupon.isExpired && (
          <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-2 rounded">
            <XCircle className="h-4 w-4" />
            <span>This coupon has expired</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
