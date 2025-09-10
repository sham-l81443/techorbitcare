'use client';

import React from 'react';
import { useAuthStore } from '@/hooks/useAuthStore';
import { useLogin, useSignup } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';

// Example component showing how to use the new Zustand + React Query setup
export function AuthExample() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const loginMutation = useLogin();
  const signupMutation = useSignup();

  const handleLogin = () => {
    loginMutation.mutate({
      email: 'test@example.com',
      password: 'password123',
    });
  };

  const handleSignup = () => {
    signupMutation.mutate({
      name: 'Test User',
      email: 'test@example.com',
      phone: '1234567890',
      password: 'password123',
    });
  };

  if (isAuthenticated && user) {
    return (
      <div className="p-4 border rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Welcome, {user.name}!</h3>
        <p className="text-sm text-gray-600 mb-4">Email: {user.email}</p>
        <Button onClick={logout} variant="outline">
          Logout
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Authentication Example</h3>
      <div className="space-x-2">
        <Button 
          onClick={handleLogin} 
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? 'Logging in...' : 'Login'}
        </Button>
        <Button 
          onClick={handleSignup} 
          disabled={signupMutation.isPending}
          variant="outline"
        >
          {signupMutation.isPending ? 'Signing up...' : 'Signup'}
        </Button>
      </div>
    </div>
  );
}
