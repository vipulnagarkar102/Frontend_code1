'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function AuthSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { initializeAuth, isAuthenticated } = useAuthStore();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      localStorage.setItem('tempAuthToken', token);
      initializeAuth()
        .then(() => router.push('/customer-dashboard'))
        .catch(() => router.push('/login?error=auth_failed'));
    } else {
      router.push('/auth/login?error=missing_token');
    }
  }, [router, searchParams, initializeAuth]);

  if (isAuthenticated) {
    router.push('/customer-dashboard');
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Processing Authentication</h1>
        <p>Please wait while we verify your account...</p>
      </div>
    </div>
  );
}