// Define the detailed structure of the user profile data
// Adjust this based on what '/users/getUserProfile' actually returns
export interface UserProfile {
    id: string; // Usually same as _id
    first_name: string;
    last_name: string;
    email: string; // Note: Backend might send encrypted email. Clarify API response.
    phone_number?: string | null; // Optional and potentially encrypted
    DoB?: string | null; // Date might be string or Date object
    industry?: 'Healthcare' | 'Digital Engineering' | 'Life science' | 'Pharmacy' | null;
    address?: {
        state?: string | null;
        country?: string | null;
    };
    status: 'active' | 'inactive' | 'banned';
    email_verified: boolean;
    preferences?: {
        notification_opt_in?: boolean;
    };
    created_at: string; // Or Date object
    // Add any other fields returned by the API
}

// Payload for updating the user profile
// Use Partial<> to make all fields optional for update
export type UpdateProfilePayload = Partial<Omit<UserProfile, 'id' | 'status' | 'email_verified' | 'created_at' | 'email'>>; // Exclude fields not typically updatable by user this way

// Payload for changing password
export interface ChangePasswordPayload {
    currentPassword: string;
    newPassword: string;
}

// API Response Types (can be simple status/message or include data)
export interface GetUserProfileResponse {
    status: string;
    data: UserProfile;
}

export interface UpdateProfileResponse {
    status: string;
    message: string;
    // Optionally include updated data if API returns it
    // data?: UserProfile;
}

export interface ChangePasswordResponse {
    status: string;
    message: string;
}

// Define the state structure for the user store
export interface UserState {
    profile: UserProfile | null;
    isLoadingProfile: boolean;
    isUpdatingProfile: boolean;
    isChangingPassword: boolean;
    error: string | null; // Errors specific to user actions

    // Actions
    getUserProfile: () => Promise<void>;
    updateUserProfile: (payload: UpdateProfilePayload) => Promise<boolean>; // Return true on success
    changePassword: (payload: ChangePasswordPayload) => Promise<boolean>; // Return true on success
    clearUserProfile: () => void; // Action to clear profile (e.g., on logout)
    clearUserError: () => void;
}