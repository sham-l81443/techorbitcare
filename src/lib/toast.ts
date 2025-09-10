import { toast } from 'sonner';

// Toast notification utilities for consistent messaging
export const toastNotifications = {
  // Success messages
  success: {
    login: 'Login successful! Welcome back.',
    signup: 'Account created successfully! Please check your email for OTP verification.',
    verifyOtp: 'Email verified successfully! You can now sign in.',
    resendOtp: 'New OTP sent to your email!',
    logout: 'Logged out successfully!',
    couponClaimed: 'Coupon claimed successfully!',
    couponCreated: 'Coupon created successfully!',
    couponUpdated: 'Coupon updated successfully!',
    couponDeleted: 'Coupon deleted successfully!',
    copied: 'Copied to clipboard!',
    saved: 'Changes saved successfully!',
    profileUpdated: 'Profile updated successfully!',
  },
  
  // Error messages
  error: {
    login: 'Login failed. Please check your credentials.',
    signup: 'Failed to create account. Please try again.',
    verifyOtp: 'Invalid OTP. Please try again.',
    resendOtp: 'Failed to resend OTP. Please try again.',
    logout: 'Failed to logout. Please try again.',
    couponClaimed: 'Failed to claim coupon. Please try again.',
    couponCreated: 'Failed to create coupon. Please try again.',
    couponUpdated: 'Failed to update coupon. Please try again.',
    couponDeleted: 'Failed to delete coupon. Please try again.',
    networkError: 'Network error. Please check your connection.',
    unauthorized: 'You are not authorized to perform this action.',
    notFound: 'The requested resource was not found.',
    validationError: 'Please check your input and try again.',
    serverError: 'Server error. Please try again later.',
  },
  
  // Info messages
  info: {
    loading: 'Loading...',
    processing: 'Processing...',
    saving: 'Saving...',
    deleting: 'Deleting...',
  },
  
  // Warning messages
  warning: {
    unsavedChanges: 'You have unsaved changes. Are you sure you want to leave?',
    deleteConfirm: 'Are you sure you want to delete this item?',
    sessionExpired: 'Your session has expired. Please login again.',
  }
};

// Helper functions for common toast patterns
export const showToast = {
  success: (message: string) => toast.success(message),
  error: (message: string) => toast.error(message),
  info: (message: string) => toast.info(message),
  warning: (message: string) => toast.warning(message),
  loading: (message: string) => toast.loading(message),
};

// API error handler
export const handleApiError = (error: unknown, fallbackMessage?: string) => {
  let message = fallbackMessage || toastNotifications.error.serverError;
  
  if (error && typeof error === 'object' && 'response' in error) {
    const response = (error as any).response;
    if (response?.data?.error) {
      message = response.data.error;
    }
  } else if (error && typeof error === 'object' && 'message' in error) {
    message = (error as any).message;
  } else if (typeof error === 'string') {
    message = error;
  }
  
  toast.error(message);
  return message;
};

// Success handler
export const handleApiSuccess = (message: string) => {
  toast.success(message);
};

// Copy to clipboard with toast
export const copyToClipboard = async (text: string, successMessage?: string) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success(successMessage || toastNotifications.success.copied);
  } catch {
    toast.error('Failed to copy to clipboard');
  }
};

// Confirmation dialog with toast
export const confirmAction = (message: string, onConfirm: () => void) => {
  if (window.confirm(message)) {
    onConfirm();
  }
};
