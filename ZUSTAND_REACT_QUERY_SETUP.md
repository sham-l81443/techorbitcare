# Zustand + React Query Setup

This document describes the new state management and data fetching setup using Zustand and React Query.

## Overview

- **Zustand**: Used for global state management (authentication state)
- **React Query**: Used for server state management and data fetching
- **AuthContext**: Updated to use Zustand store for backward compatibility

## File Structure

```
src/
├── stores/
│   └── authStore.ts          # Zustand store for authentication
├── hooks/
│   ├── useAuth.ts            # React Query hooks for auth operations
│   └── useAuthStore.ts       # Direct access to Zustand store
├── components/
│   └── providers/
│       └── QueryProvider.tsx # React Query provider
├── lib/
│   └── queryClient.ts        # React Query client configuration
└── contexts/
    └── AuthContext.tsx       # Updated to use Zustand
```

## Usage

### Using Zustand Store Directly

```tsx
import { useAuthStore } from '@/hooks/useAuthStore';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuthStore();
  
  // Use the store directly
}
```

### Using React Query Hooks

```tsx
import { useLogin, useSignup, useVerifyOtp } from '@/hooks/useAuth';

function LoginForm() {
  const loginMutation = useLogin();
  
  const handleLogin = (data) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        // Handle success
      },
    });
  };
  
  return (
    <form onSubmit={handleLogin}>
      {/* Form fields */}
      <button disabled={loginMutation.isPending}>
        {loginMutation.isPending ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
```

### Using AuthContext (Backward Compatibility)

```tsx
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  // Same API as before, but now powered by Zustand
}
```

## Features

### Zustand Store Features
- Persistent storage (localStorage)
- Type-safe state management
- Simple API for state updates
- Automatic re-renders on state changes

### React Query Features
- Automatic caching and background updates
- Optimistic updates
- Error handling and retry logic
- Loading states
- Automatic refetching on window focus

### Authentication Flow
1. **Signup**: Creates user account and sends OTP
2. **Verify OTP**: Verifies email with OTP code
3. **Login**: Authenticates user and stores session
4. **Logout**: Clears session and redirects

## Migration Notes

- All existing `useAuth()` calls continue to work
- New components can use either Zustand directly or React Query hooks
- State is automatically synchronized between Zustand and React Query
- Error handling is improved with React Query's built-in retry logic

## Benefits

1. **Better Performance**: React Query handles caching and background updates
2. **Simplified State Management**: Zustand provides a cleaner API than Context
3. **Better Developer Experience**: TypeScript support and DevTools
4. **Automatic Error Handling**: React Query handles retries and error states
5. **Optimistic Updates**: Better UX with immediate feedback
