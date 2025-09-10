import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Coupon } from '@/types/coupon';

// API functions
const fetchAdminCoupons = async (params: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}): Promise<{ coupons: Coupon[]; pagination: Record<string, unknown> }> => {
  const queryParams = new URLSearchParams();
  if (params.page) queryParams.append('page', params.page.toString());
  if (params.limit) queryParams.append('limit', params.limit.toString());
  if (params.search) queryParams.append('search', params.search);
  if (params.status) queryParams.append('status', params.status);

  const response = await fetch(`/api/admin/coupons?${queryParams.toString()}`, {
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

const createCoupon = async (data: Record<string, unknown>): Promise<{ message: string; coupon: Coupon }> => {
  const response = await fetch('/api/admin/coupons', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create coupon');
  }

  return response.json();
};

const updateCoupon = async ({ id, data }: { id: string; data: Record<string, unknown> }): Promise<{ message: string; coupon: Coupon }> => {
  const response = await fetch(`/api/admin/coupons/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to update coupon');
  }

  return response.json();
};

const deleteCoupon = async (id: string): Promise<{ message: string }> => {
  const response = await fetch(`/api/admin/coupons/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to delete coupon');
  }

  return response.json();
};

// Custom hooks
export const useAdminCoupons = (params: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}) => {
  return useQuery({
    queryKey: ['admin-coupons', params],
    queryFn: () => fetchAdminCoupons(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useCreateCoupon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCoupon,
    onSuccess: (data) => {
      toast.success(data.message || 'Coupon created successfully!');
      queryClient.invalidateQueries({ queryKey: ['admin-coupons'] });
      queryClient.invalidateQueries({ queryKey: ['coupons'] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

export const useUpdateCoupon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCoupon,
    onSuccess: (data) => {
      toast.success(data.message || 'Coupon updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['admin-coupons'] });
      queryClient.invalidateQueries({ queryKey: ['coupons'] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteCoupon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCoupon,
    onSuccess: (data) => {
      toast.success(data.message || 'Coupon deleted successfully!');
      queryClient.invalidateQueries({ queryKey: ['admin-coupons'] });
      queryClient.invalidateQueries({ queryKey: ['coupons'] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
