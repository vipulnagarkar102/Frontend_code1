import { create } from 'zustand';
import { UserState, UserProfile, UpdateProfilePayload, ChangePasswordPayload, GetUserProfileResponse, UpdateProfileResponse, ChangePasswordResponse } from './userTypes';
import apiClient from '../services/apiClient'; // Use the same configured client

// Re-use or define error message helper
const getErrorMessage = (error: any): string => {
  if (error.response && error.response.data) {
    if (error.response.data.message) {
      return error.response.data.message;
    }
    if (error.response.data.error && error.response.data.error.message) {
        return error.response.data.error.message;
    }
     if (error.response.data.errors && Array.isArray(error.response.data.errors)) {
        return error.response.data.errors.map((err: { message: string }) => err.message).join(', ');
    }
  }
  return error.message || 'An unknown error occurred';
};


export const useUserStore = create<UserState>((set, get) => ({
    // Initial State
    profile: null,
    isLoadingProfile: false,
    isUpdatingProfile: false,
    isChangingPassword: false,
    error: null,

    // --- Actions ---

    getUserProfile: async () => {
        set({ isLoadingProfile: true, error: null });
        try {
            const response = await apiClient.get<GetUserProfileResponse>('/users/getUserProfile');
            set({ profile: response.data.data, isLoadingProfile: false });
             console.log("User profile fetched:", response.data.data);
        } catch (error: any) {
            const errorMessage = getErrorMessage(error);
            console.error("Failed to fetch user profile:", errorMessage);
            set({ isLoadingProfile: false, error: errorMessage, profile: null }); // Clear profile on error
        }
    },

    updateUserProfile: async (payload: UpdateProfilePayload): Promise<boolean> => {
        set({ isUpdatingProfile: true, error: null });
        try {
            const response = await apiClient.put<UpdateProfileResponse>('/users/user/update', payload);
            // Optimistically update the profile state with the changes
            const currentProfile = get().profile;
            if (currentProfile) {
                set({
                    profile: { ...currentProfile, ...payload }, 
                    isUpdatingProfile: false
                });
            } else {
                 set({ isUpdatingProfile: false }); // Stop loading even if no current profile
            }
            console.log("User profile update response:", response.data.message);
            return true; // Indicate success
        } catch (error: any) {
            const errorMessage = getErrorMessage(error);
            console.error("Failed to update user profile:", errorMessage);
            set({ isUpdatingProfile: false, error: errorMessage });
            return false; // Indicate failure
        }
    },

    changePassword: async (payload: ChangePasswordPayload): Promise<boolean> => {
        set({ isChangingPassword: true, error: null });
        try {
            const response = await apiClient.put<ChangePasswordResponse>('/users/change-password', payload);
            set({ isChangingPassword: false });
            console.log("Change password response:", response.data.message);
            return true; // Indicate success
        } catch (error: any) {
            const errorMessage = getErrorMessage(error);
            console.error("Failed to change password:", errorMessage);
            set({ isChangingPassword: false, error: errorMessage });
            return false; // Indicate failure
        }
    },

    clearUserProfile: () => {
        console.log("Clearing user profile data.");
        set({
            profile: null,
            isLoadingProfile: false,
            isUpdatingProfile: false,
            isChangingPassword: false,
            error: null,
        });
    },

    clearUserError: () => {
        set({ error: null });
    },

}));
