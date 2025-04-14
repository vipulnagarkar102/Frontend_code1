"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter } from 'next/navigation';
import Sidebar from "../sidebar";
import { useAuthStore } from '@/store/authStore';
import { useUserStore } from '@/store/userStore';
import { UpdateProfilePayload, ChangePasswordPayload } from '@/store/userTypes'; 
import { Button } from "@/components/ui/button"; 

// Define the structure for the profile form data in the component's state
interface ProfileFormData {
  first_name: string;
  last_name: string;
  industry: UpdateProfilePayload['industry'] | '';
  address: {
    state: string;
    country: string;
  };
  preferences: {
    notification_opt_in: boolean;
  };
}

// Define the structure for the password form data
interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const Settings = () => {
  const router = useRouter();

  // --- Get state and actions from stores ---
  const { isAuthenticated, isAuthInitialized, initializeAuth } = useAuthStore();
  const {
    profile,
    isLoadingProfile,
    isUpdatingProfile,
    isChangingPassword,
    getUserProfile,
    updateUserProfile,
    changePassword,
    error: userStoreError,
    clearUserError,
    clearUserProfile
  } = useUserStore();

  // --- Component State ---
  const [activeTab, setActiveTab] = useState<"profile" | "password">("profile");
  const [profileFormData, setProfileFormData] = useState<ProfileFormData | null>(null);
  const [passwordFormData, setPasswordFormData] = useState<PasswordFormData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [localError, setLocalError] = useState<string | null>(null); // For client-side validation (e.g., password mismatch)
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const industries = ['Healthcare', 'Digital Engineering', 'Life science', 'Pharmacy'];

  // --- Effects for Auth Check and Data Fetching ---
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    if (!isAuthInitialized) return;

    if (!isAuthenticated) {
      clearUserProfile(); // Clear profile data if exists
      router.replace('/auth/login');
      return;
    }

    // Fetch profile if authenticated and profile data is missing
    if (isAuthenticated && !profile && !isLoadingProfile && !userStoreError) {
      getUserProfile();
    }
  }, [
    isAuthenticated,
    isAuthInitialized,
    profile,
    isLoadingProfile,
    userStoreError,
    getUserProfile,
    clearUserProfile,
    router,
  ]);

  // --- Effect to Populate Form Data when Profile Loads ---
  useEffect(() => {
    if (profile) {
      setProfileFormData({
        first_name: profile.first_name ?? '',
        last_name: profile.last_name ?? '',
        industry: profile.industry ?? '',
        address: {
          state: profile.address?.state ?? '',
          country: profile.address?.country ?? '',
        },
        preferences: {
          notification_opt_in: profile.preferences?.notification_opt_in ?? false,
        },
      });
    } else {
      // Reset form if profile becomes null (e.g., after error or logout)
       setProfileFormData(null);
    }
  }, [profile]); // This effect runs whenever the profile data from the store changes

  // --- Event Handlers ---
  const handleProfileInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSuccessMessage(null); // Clear success message on change
    clearUserError(); // Clear store error
    setLocalError(null);

    setProfileFormData(prev => {
      if (!prev) return null; // Should not happen if profile is loaded

      if (name === 'state' || name === 'country') {
        return {
          ...prev,
          address: { ...prev.address, [name]: value }
        };
      } else {
        return { ...prev, [name]: value };
      }
    });
  };

    const handleProfileCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setSuccessMessage(null);
        clearUserError();
        setLocalError(null);

        if (name === 'notification_opt_in' && profileFormData) {
             setProfileFormData(prev => ({
                ...prev!, // We know prev is not null here because checkbox exists
                preferences: { ...prev!.preferences, [name]: checked }
            }));
        }
    };


  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSuccessMessage(null);
    clearUserError();
    setLocalError(null);
    setPasswordFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!profileFormData) return; 

    setSuccessMessage(null);
    clearUserError();
    setLocalError(null);
    const payload: UpdateProfilePayload = {
        first_name: profileFormData.first_name,
        last_name: profileFormData.last_name,
        industry: profileFormData.industry || null, 
        address: {
            state: profileFormData.address.state || null,
            country: profileFormData.address.country || null,
        },
        preferences: {
            notification_opt_in: profileFormData.preferences.notification_opt_in,
        }
    };

    const success = await updateUserProfile(payload);
    if (success) {
      setSuccessMessage("Profile updated successfully!");
    }
  };

  const handlePasswordSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);
    clearUserError();
    setLocalError(null);

    if (!passwordFormData.currentPassword || !passwordFormData.newPassword || !passwordFormData.confirmPassword) {
      setLocalError("All password fields are required.");
      return;
    }
    if (passwordFormData.newPassword !== passwordFormData.confirmPassword) {
      setLocalError("New passwords do not match.");
      return;
    }
    if (passwordFormData.newPassword.length < 6) { 
        setLocalError("New password must be at least 6 characters long.");
        return;
    }

    const payload: ChangePasswordPayload = {
      currentPassword: passwordFormData.currentPassword,
      newPassword: passwordFormData.newPassword,
    };

    const success = await changePassword(payload);
    if (success) {
      setSuccessMessage("Password changed successfully!");
      // Clear password fields after successful change
      setPasswordFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    }
  };

  // --- Loading and Initial State Handling ---
  if (!isAuthInitialized || (isAuthenticated && isLoadingProfile && !profile) ) {
     // Show loading if auth isn't checked OR if user is logged in but profile is still loading for the first time
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
   if (isAuthInitialized && isAuthenticated && !profile && !isLoadingProfile) {
     return (
        <div className="flex min-h-screen w-full bg-gray-100">
            <Sidebar />
            <div className="flex-1 flex items-center justify-center ml-16 md:ml-64 p-4">
                <p>Could not load profile data. Please refresh.</p>
            </div>
        </div>
     );
   }


  // --- Main Render ---
  return (
    <div className="flex min-h-screen w-full bg-gray-100">
      <Sidebar />
      <main className="flex-1 mt-[80px] p-8 pt-10 ml-16 md:ml-64 overflow-y-auto">
        <h2 className="text-2xl md:text-3xl font-semibold mb-5 text-gray-800">Settings</h2>

        {/* --- Tabs --- */}
        <div className="flex gap-6 mb-6 border-b font-poppins text-base md:text-[18px] font-medium text-[#003F5C] overflow-x-auto">
          <button
            className={`pb-2 cursor-pointer px-1 whitespace-nowrap ${ activeTab === "profile" ? "border-b-2 border-[#00A5CF] text-[#00A5CF]" : "text-gray-500 hover:text-gray-700" }`}
            onClick={() => {setActiveTab("profile"); setSuccessMessage(null); clearUserError(); setLocalError(null);}}
          >
            Profile
          </button>
          <button
            className={`pb-2 cursor-pointer px-1 whitespace-nowrap ${ activeTab === "password" ? "border-b-2 border-[#00A5CF] text-[#00A5CF]" : "text-gray-500 hover:text-gray-700" }`}
            onClick={() => {setActiveTab("password"); setSuccessMessage(null); clearUserError(); setLocalError(null);}}
          >
            Password
          </button>
        </div>

        {/* --- Display Messages --- */}
        {userStoreError && <p className="mb-4 text-red-600 bg-red-100 p-3 rounded">{userStoreError}</p>}
        {localError && <p className="mb-4 text-red-600 bg-red-100 p-3 rounded">{localError}</p>}
        {successMessage && <p className="mb-4 text-green-600 bg-green-100 p-3 rounded">{successMessage}</p>}


        {/* --- Profile Tab --- */}
        {activeTab === "profile" && profileFormData && (
          <form onSubmit={handleProfileSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 md:gap-x-6 gap-y-4">
              {/* First Name */}
              <div>
                <label htmlFor="first_name" className="block font-bold text-base mb-1">First Name</label>
                <input
                  id="first_name" type="text" name="first_name"
                  value={profileFormData.first_name} onChange={handleProfileInputChange}
                  className="border p-2 rounded w-full font-normal text-base"
                  disabled={isUpdatingProfile}
                />
              </div>
              {/* Last Name */}
              <div>
                <label htmlFor="last_name" className="block font-bold text-base mb-1">Last Name</label>
                <input
                  id="last_name" type="text" name="last_name"
                  value={profileFormData.last_name} onChange={handleProfileInputChange}
                  className="border p-2 rounded w-full font-normal text-base"
                  disabled={isUpdatingProfile}
                />
              </div>
              {/* Industry */}
              <div className="md:col-span-2">
                <label htmlFor="industry" className="block font-bold text-base mb-1">Industry</label>
                <select
                    id="industry" name="industry"
                    value={profileFormData.industry ?? ''} 
                    onChange={handleProfileInputChange}
                    className="border cursor-pointer p-2 rounded w-full font-normal text-base" // Added bg-white for consistency
                    disabled={isUpdatingProfile}
                >
                    <option value="">Select Industry (Optional)</option>
                    {industries.map((ind) => (
                        <option key={ind} value={ind}>{ind}</option>
                    ))}
                </select>
              </div>
               {/* Address - State */}
              <div>
                <label htmlFor="state" className="block font-bold text-base mb-1">State</label>
                <input
                  id="state" type="text" name="state"
                  value={profileFormData.address.state} onChange={handleProfileInputChange}
                  placeholder="e.g., California"
                  className="border p-2 rounded w-full font-normal text-base"
                  disabled={isUpdatingProfile}
                />
              </div>
              {/* Address - Country */}
              <div>
                <label htmlFor="country" className="block font-bold text-base mb-1">Country (2-letter code)</label>
                <input
                  id="country" type="text" name="country"
                  value={profileFormData.address.country} onChange={handleProfileInputChange}
                  placeholder="e.g., US" maxLength={2}
                  className="border p-2 rounded w-full font-normal text-base"
                  disabled={isUpdatingProfile}
                />
              </div>
               {/* Notification Opt-in */}
              <div className="md:col-span-2 flex items-center gap-2 mt-2">
                 <input
                    type="checkbox" id="notification_opt_in" name="notification_opt_in"
                    checked={profileFormData.preferences.notification_opt_in} onChange={handleProfileCheckboxChange}
                    className="h-4 w-4 cursor-pointer text-[#00A5CF] rounded focus:ring-[#00A5CF]"
                    disabled={isUpdatingProfile}
                 />
                 <label htmlFor="notification_opt_in" className="text-base">
                    Receive email notifications and updates
                 </label>
              </div>
            </div>
            {/* Submit Button */}
            <Button
                type="submit"
                className="border cursor-pointer p-2 rounded bg-[#00A5CF] text-white transition duration-200 font-normal text-base mt-5 px-6 hover:bg-[#008CBA] disabled:opacity-50"
                disabled={isUpdatingProfile || isLoadingProfile}
            >
              {isUpdatingProfile ? 'Saving...' : 'Update Profile'}
            </Button>
          </form>
        )}

        {/* --- Password Tab --- */}
        {activeTab === "password" && (
          <form onSubmit={handlePasswordSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 md:gap-x-6 gap-y-4">
              {/* Current Password */}
              <div className="md:col-span-2">
                <label className="block font-bold text-base mb-1">Current Password</label>
                <input
                  title="Current Password"
                  type="password" name="currentPassword"
                  value={passwordFormData.currentPassword} onChange={handlePasswordChange}
                  className="border p-2 rounded w-full font-normal text-base"
                  disabled={isChangingPassword}
                  autoComplete="current-password"
                />
              </div>
              {/* New Password */}
              <div>
                <label className="block font-bold text-base mb-1">New Password</label>
                <input
                  title="New Password"
                  type="password" name="newPassword"
                  value={passwordFormData.newPassword} onChange={handlePasswordChange}
                  className="border p-2 rounded w-full font-normal text-base"
                  disabled={isChangingPassword}
                   autoComplete="new-password"
                />
              </div>
              {/* Confirm New Password */}
              <div>
                <label className="block font-bold text-base mb-1">Retype New Password</label>
                <input
                  title="Retype New Password"
                  type="password" name="confirmPassword"
                  value={passwordFormData.confirmPassword} onChange={handlePasswordChange}
                  className="border p-2 rounded w-full font-normal text-base"
                  disabled={isChangingPassword}
                  autoComplete="new-password"
                />
              </div>
            </div>
             {/* Submit Button */}
            <Button
                type="submit"
                className="border cursor-pointer p-2 rounded bg-red-600 text-white transition duration-200 font-normal text-base mt-5 px-6 hover:bg-red-700 disabled:opacity-50"
                disabled={isChangingPassword}
            >
              {isChangingPassword ? 'Saving...' : 'Reset Password'}
            </Button>
          </form>
        )}
      </main>
    </div>
  );
};

export default Settings; 