import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/authStore';
import { toast } from 'sonner';

// Types
export interface SignupData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
  remember?: boolean;
}

export interface VerifyOtpData {
  email: string;
  otp: string;
}

export interface ResendOtpData {
  email: string;
}

// API functions
const signupUser = async (data: SignupData) => {
  const response = await fetch('/api/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create account');
  }

  return response.json();
};

const loginUser = async (data: LoginData) => {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Login failed');
  }

  return response.json();
};

const verifyOtp = async (data: VerifyOtpData) => {
  const response = await fetch('/api/verify-otp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Invalid OTP');
  }

  return response.json();
};

const resendOtp = async (data: ResendOtpData) => {
  const response = await fetch('/api/resend-otp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to resend OTP');
  }

  return response.json();
};

// Custom hooks
export const useSignup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signupUser,
    onSuccess: () => {
      toast.success('Account created successfully! Please check your email for OTP verification.');
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

export const useLogin = () => {
  const { login } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      login(data.user, data.token);
      toast.success('Login successful! Welcome back.');
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

export const useVerifyOtp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: verifyOtp,
    onSuccess: () => {
      toast.success('Email verified successfully! You can now sign in.');
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

export const useResendOtp = () => {
  return useMutation({
    mutationFn: resendOtp,
    onSuccess: () => {
      toast.success('New OTP sent to your email!');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
