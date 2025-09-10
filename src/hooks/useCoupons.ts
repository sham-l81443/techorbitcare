import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/authStore';
import { toast } from 'sonner';
import { Coupon, UserCoupon } from '@/types/coupon';

// API functions
const fetchCoupons = async (type?: string): Promise<{ coupons: Coupon[] }> => {
  const response = await fetch(`/api/coupons${type ? `?type=${type}` : ''}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch coupons');
  }

  return response.json();
};

const claimCoupon = async (couponCode: string): Promise<{ message: string; userCoupon: UserCoupon }> => {
  const response = await fetch('/api/coupons', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ couponCode }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to claim coupon');
  }

  return response.json();
};

// Custom hooks
export const useCoupons = (type?: string) => {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ['coupons', type, user?.id],
    queryFn: () => fetchCoupons(type),
    enabled: !!user,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useAvailableCoupons = () => {
  return useCoupons('available');
};

export const useUsedCoupons = () => {
  return useCoupons('used');
};

export const useExpiredCoupons = () => {
  return useCoupons('expired');
};

export const useClaimCoupon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: claimCoupon,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ['coupons'] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
