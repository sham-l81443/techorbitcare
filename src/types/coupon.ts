export interface Coupon {
  id: string;
  code: string;
  name: string;
  description?: string;
  discountType: 'PERCENTAGE' | 'FIXED_AMOUNT';
  discountValue: number;
  minOrderAmount?: number;
  maxDiscountAmount?: number;
  usageLimit?: number;
  usedCount: number;
  isActive: boolean;
  validFrom: string;
  validUntil: string;
  createdAt: string;
  updatedAt: string;
  userCoupon?: {
    isUsed: boolean;
    usedAt?: string;
    createdAt: string;
  } | null;
  isAvailable?: boolean;
  isUsed?: boolean;
  usedAt?: string | null;
  isExpired?: boolean;
}

export interface UserCoupon {
  id: string;
  userId: string;
  couponId: string;
  isUsed: boolean;
  usedAt?: string;
  createdAt: string;
  updatedAt: string;
  coupon: Coupon;
}
