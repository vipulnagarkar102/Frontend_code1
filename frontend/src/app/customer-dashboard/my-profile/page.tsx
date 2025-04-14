'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../sidebar';
import { useAuthStore } from '@/store/authStore';
import { useUserStore } from '@/store/userStore';

const formatDateSimple = (dateString: string | Date | null | undefined): string => {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        return 'Invalid Date';
    }
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  } catch (e) {
    return 'Invalid Date';
  }
};

const Profile = () => {
  const { isAuthenticated, isAuthInitialized, initializeAuth } = useAuthStore();
  const { profile, isLoadingProfile, getUserProfile, error: userProfileError, clearUserProfile } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    if (!isAuthInitialized) {
      return;
    }

    if (!isAuthenticated) {
      clearUserProfile();
      router.replace('/auth/login');
      return;
    }

    if (isAuthenticated && !profile && !isLoadingProfile && !userProfileError) {
      getUserProfile();
    }
  }, [
    isAuthenticated,
    isAuthInitialized,
    profile,
    isLoadingProfile,
    userProfileError,
    getUserProfile,
    clearUserProfile,
    router,
  ]);

  if (!isAuthInitialized || isLoadingProfile) {
    return (
      <div className="flex min-h-screen w-full bg-gray-100">
        <Sidebar/>
        <div className="flex ml-16 md:ml-64 flex-col w-full items-center justify-center min-h-screen">
          <div className="w-12 h-12 border-4 border-t-[#003F5C] border-r-transparent border-b-[#003F5C] border-l-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-[20px] font-lato font-semibold text-[#003F5C]">Loading...</p>
          </div>
      </div>
    );
  }

  if (userProfileError) {
     return (
      <div className="flex min-h-screen w-full bg-gray-100">
        <Sidebar/>
        <main className="flex-1 mt-[72px] p-4 md:p-6 ml-16 md:ml-64 overflow-y-auto">
           <h2 className="text-2xl font-semibold mb-5 text-red-600">Error Loading Profile</h2>
           <p className="text-red-500">Could not load your profile data.</p>
           <p className="text-sm text-gray-500 mt-2">Details: {userProfileError}</p>
        </main>
      </div>
    );
  }

  if (!profile) {
      return (
        <div className="flex min-h-screen w-full bg-gray-100">
          <Sidebar/>
          <div className="flex-1 flex items-center justify-center ml-16 md:ml-64 p-4">
            <p>Profile data not available.</p>
          </div>
        </div>
      );
  }

  return (
    <div className="flex min-h-screen w-full bg-gray-100 text-[#003F5C] font-lato">
      <Sidebar/>
      <main className="flex-1 mt-[80px] pt-12  p-6 ml-16 md:ml-64 overflow-y-auto">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 font-poppins">My Profile</h2>

        <div className="bg-white p-4 md:p-8 rounded-lg shadow-md w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-8 gap-y-4 text-[16px] md:text-[18px]">

              <div className="font-medium text-gray-600 break-words">First Name:</div>
              <div className="text-[#003F5C] break-words">{profile.first_name ?? 'N/A'}</div>

              <div className="font-medium text-gray-600 break-words">Last Name:</div>
              <div className="text-[#003F5C] break-words">{profile.last_name ?? 'N/A'}</div>

              <div className="font-medium text-gray-600 break-words">Email:</div>
              <div className="text-gray-500 italic break-words">Protected</div>

               <div className="font-medium text-gray-600 break-words">Email Verified:</div>
              <div className={`font-semibold ${profile.email_verified ? 'text-green-600' : 'text-red-600'}`}>{profile.email_verified ? 'Yes' : 'No'}</div>

              <div className="font-medium text-gray-600 break-words">Phone Number:</div>
              <div className="text-gray-500 italic break-words">{profile.phone_number ? 'Protected' : 'Not Provided'}</div>

              <div className="font-medium text-gray-600 break-words">Date of Birth:</div>
              <div className="text-[#003F5C] break-words">{formatDateSimple(profile.DoB)}</div>

              <div className="font-medium text-gray-600 break-words">Industry:</div>
              <div className="text-[#003F5C] break-words">{profile.industry ?? 'Not Specified'}</div>

              <div className="font-medium text-gray-600 break-words">State:</div>
              <div className="text-[#003F5C] break-words">{profile.address?.state ?? 'Not Provided'}</div>

              <div className="font-medium text-gray-600 break-words">Country:</div>
              <div className="text-[#003F5C] break-words">{profile.address?.country ?? 'Not Provided'}</div>

               <div className="font-medium text-gray-600 break-words">Account Status:</div>
              <div className="text-[#003F5C] capitalize break-words">{profile.status ?? 'N/A'}</div>

              <div className="font-medium text-gray-600 break-words">Registration Date:</div>
              <div className="text-[#003F5C] break-words">{formatDateSimple(profile.created_at)}</div>

               <div className="font-medium text-gray-600 break-words">Notifications Opt-In:</div>
              <div className="text-[#003F5C] break-words">{profile.preferences?.notification_opt_in ? 'Yes' : 'No'}</div>

            </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;