'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { useAuthStore } from '@/stores/authStore';
import { useEffect } from 'react';

export function useNextAuth() {
  const { data: session, status } = useSession();
  const { user, token, isAuthenticated, login, logout } = useAuthStore();

  // Sync NextAuth session with Zustand store
  useEffect(() => {
    if (session?.user && status === 'authenticated') {
      const nextAuthUser = {
        id: (session.user as any).id || session.user.email || '',
        name: session.user.name || '',
        email: session.user.email || '',
        phone: '', // NextAuth doesn't provide phone by default
        role: (session.user as any).role || 'USER',
        isVerified: true, // NextAuth users are considered verified
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      // Only update if the user is different
      if (!user || user.id !== nextAuthUser.id) {
        login(nextAuthUser, 'nextauth-token');
      }
    } else if (status === 'unauthenticated' && isAuthenticated) {
      logout();
    }
  }, [session, status, user, isAuthenticated, login, logout]);

  return {
    user: session?.user || user,
    token: token,
    isAuthenticated: status === 'authenticated' || isAuthenticated,
    isLoading: status === 'loading',
    signIn: signIn,
    signOut: signOut,
  };
}
