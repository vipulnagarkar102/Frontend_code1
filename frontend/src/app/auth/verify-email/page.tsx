'use client';

import React, { useState, useEffect, useRef, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';
import { FaKey } from 'react-icons/fa';
import Link from 'next/link';
import img from '@/assets/pay-per-code.png';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast'; // Import toast and Toaster

const RESEND_COOLDOWN_SECONDS = 60;

// --- Toast Style Options ---
const toastErrorStyle = {
    style: {
        border: '1px solid #EF4444', // Red-500
        padding: '12px',
        color: '#B91C1C', // Red-700
        background: '#FEF2F2', // Red-50
        fontSize: '14px',
    },
    iconTheme: {
        primary: '#EF4444',
        secondary: '#FEF2F2',
    },
};

const toastSuccessStyle = {
    style: {
        border: '1px solid #10B981', // Emerald-500
        padding: '12px',
        color: '#047857', // Emerald-700
        background: '#ECFDF5', // Emerald-50
        fontSize: '14px',
    },
    iconTheme: {
        primary: '#10B981',
        secondary: '#ECFDF5',
    },
};
// --- End Toast Style Options ---


const VerifyEmail = () => {
  const [otp, setOtp] = useState('');
  const router = useRouter();
  const {
    verifyEmail,
    resendOtp,
    isLoading,
    isResendingOtp,
    error: storeError,
    clearError,
    userIdForVerification
  } = useAuthStore();

  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
  // Removed resendMessage state, will use toasts
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

   // Effect to handle initial state and redirect if needed
   useEffect(() => {
     // Clear any lingering errors when the component mounts
     clearError();

     // Redirect immediately if no userId is found (and not loading)
     if (!userIdForVerification && !isLoading && !isResendingOtp) {
       console.warn('No user ID found for verification. Redirecting to sign-up page...');
       toast.error("Verification session not found. Please sign up again.", toastErrorStyle);
       router.push('/auth/sign-up');
     }
   }, [userIdForVerification, isLoading, isResendingOtp, router, clearError]); // Dependencies


   // Effect to show store errors as toasts when they appear
   useEffect(() => {
     if (storeError) {
       toast.error(storeError, toastErrorStyle);
       // Optionally clear the error from the store after showing it
       // clearError(); // Decide if you want this behavior
     }
   }, [storeError]); // Dependency on storeError


  const { isAuthenticated, isAuthInitialized } = useAuthStore();

  useEffect(() => {
    if (isAuthInitialized && isAuthenticated) {
      console.log(`User authenticated on ${window.location.pathname}, redirecting to dashboard...`);
      router.push('/customer-dashboard');
    }
  }, [isAuthenticated, isAuthInitialized, router]);


  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
     if (value.length <= 6) {
        setOtp(value);
        clearError(); // Clear store error on input change
     }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (!otp || otp.length !== 6) {
        toast.error("Please enter a valid 6-digit OTP.", toastErrorStyle);
        return;
    }

    if (!userIdForVerification) {
         toast.error("Verification session expired or invalid. Please try registering again.", toastErrorStyle);
         // Optional: Redirect after showing toast
         // router.push('/auth/sign-up');
         return;
    }

    try {
      const success = await verifyEmail(otp);
      if (success) {
        console.log('Email verified successfully, redirecting to login...');
        toast.success('Email verified successfully! Redirecting to login.', toastSuccessStyle);
        router.push('/auth/login');
      }
      // If verifyEmail fails, the catch block in the store action should set storeError,
      // which will be displayed by the useEffect hook watching storeError.
    } catch (err) {
      // The error should be caught and set in the store action,
      // so the useEffect hook above will display it.
      console.error("Verification failed in component:", err);
    }
  };

  const handleResendOtp = async () => {
    clearError();

     if (!userIdForVerification) {
         toast.error("Cannot resend OTP without a valid session. Please try registering again.", toastErrorStyle);
         return;
    }

    const result = await resendOtp(); // Call the store action

    // Display result message using toast
    if (result.success) {
        toast.success(result.message, toastSuccessStyle);
        setResendDisabled(true);
        setCountdown(RESEND_COOLDOWN_SECONDS);

        if (timerRef.current) {
            clearInterval(timerRef.current);
        }

        timerRef.current = setInterval(() => {
            setCountdown((prevCount) => {
            if (prevCount <= 1) {
                clearInterval(timerRef.current!);
                setResendDisabled(false);
                return 0;
            }
            return prevCount - 1;
            });
        }, 1000);
    } else {
        // Show error message from the resend action using toast
        toast.error(result.message, toastErrorStyle);
        // The general storeError might also be set if the action re-throws
    }
  };


  return (
        <>
        {/* Add Toaster here for this component */}
        <Toaster position="top-right" reverseOrder={false} />

        <div className="flex w-full justify-between mt-26 flex-row text-[#003F5C]">
        <div className="hidden lg:block w-[40%]">
            <div className="h-full relative">
            <Image
                src={img}
                alt="Sign Up"
                fill
                className="object-cover"
                priority
            />
            </div>
        </div>

        <div className="flex max-w-[600px] lg:w-[60%] mx-auto mt-6 justify-center text-[#003F5C] p-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-center font-poppins mb-6">Verify Your Email</h1>
            <p className="text-center font-normal text-[18px] lg:text-[20px] font-lato mb-6">
            An OTP has been sent to your registered email address. Please enter it below to activate your account.
            </p>

            {/* Removed Store Error display div, handled by useEffect toast */}

            <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="otp" className="block text-lg text-gray-700 font-lato font-bold mb-2">
                Enter OTP*
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FaKey className="text-gray-500" />
                    </div>
                    <input
                        type="text"
                        id="otp"
                        name="otp"
                        placeholder="Enter 6-digit code"
                        value={otp}
                        onChange={handleOtpChange}
                        maxLength={6}
                        className="w-full text-xl tracking-[0.2em] text-center pl-12 text-[16px] sm:text-[20px] py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A5CF]"
                        required
                        inputMode="numeric"
                        pattern="\d{6}"
                        autoComplete="one-time-code"
                    />
                </div>
            </div>

            <Button
                type="submit"
                className="w-full font-poppins py-3 font-semibold text-lg cursor-pointer bg-[#00A5CF] hover:bg-[#008CBA] text-[#FFFFFF] disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading || isResendingOtp || otp.length !== 6}
            >
                {isLoading ? 'Verifying...' : 'Verify Account'}
            </Button>
            </form>

            <div className="text-center mt-4 pt-4 border-t border-gray-200">
            {/* Removed Resend Message display paragraph, handled by toast */}
            <Button
                type="button"
                variant="link"
                className="text-[#00A5CF] hover:underline disabled:text-gray-400 disabled:no-underline"
                onClick={handleResendOtp}
                disabled={isLoading || isResendingOtp || resendDisabled}
            >
                {isResendingOtp
                ? 'Sending...'
                : resendDisabled
                ? `Resend OTP in ${countdown}s`
                : 'Resend OTP'}
            </Button>
            </div>


            <div className="text-center mt-6">
                <p className="text-md font-lato font-normal">
                Entered wrong email?{' '}
                <Link href="/auth/sign-up" className="text-[#00A5CF] font-medium text-[20px] hover:underline">
                    Go back to Sign Up
                </Link>
                </p>
            </div>
        </div>
        </div>
    </div>
    </>

  );
};

export default VerifyEmail;