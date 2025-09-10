import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const useAdmin = () => {
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();

  const isAdmin = user?.role === 'ADMIN';
  const isLoading = !isAuthenticated && user === null;

  useEffect(() => {
    if (isAuthenticated && !isAdmin) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, isAdmin, router]);

  return {
    isAdmin,
    isLoading,
    user,
  };
};
