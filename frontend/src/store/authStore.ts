import { create } from 'zustand';
import { AuthState, RegisterPayload, LoginPayload, User, RegisterResponse, VerifyEmailResponse, LoginResponse, LogoutResponse, ResendOtpResponse } from './authTypes'; // Import ResendOtpResponse
import apiClient from '../services/apiClient';

const getErrorMessage = (error: any): string => {
  // ... (getErrorMessage function remains the same)
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


export const useAuthStore = create<AuthState>((set, get) => ({
  // Initial State
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  isResendingOtp: false, // Added initial state
  error: null,
  userIdForVerification: null,
  requiresVerification: false,
  isAuthInitialized: false,

  // --- Actions ---

  register: async (payload: RegisterPayload) => {
    // Reset all loading states
    set({ isLoading: true, isResendingOtp: false, error: null, requiresVerification: false, userIdForVerification: null });
    try {
      const response = await apiClient.post<RegisterResponse>('/users/createUser', payload);
      const userId = response.data.user.id;
      set({
        isLoading: false,
        userIdForVerification: userId,
        requiresVerification: true,
      });
    } catch (error: any) {
      const errorMessage = getErrorMessage(error);
      set({ isLoading: false, error: errorMessage });
      throw new Error(errorMessage);
    }
  },

  verifyEmail: async (otpCode: string): Promise<boolean> => {
    const userId = get().userIdForVerification;
    if (!userId) {
      const errorMsg = "User ID for verification not found. Please register again.";
      set({ isLoading: false, isResendingOtp: false, error: errorMsg, requiresVerification: false });
      return false;
    }

    set({ isLoading: true, isResendingOtp: false, error: null }); // Ensure isResendingOtp is false
    try {
      await apiClient.post<VerifyEmailResponse>('/users/verify-email', { userId, otpCode });
      set({
        isLoading: false,
        userIdForVerification: null,
        requiresVerification: false,
      });
      return true;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error);
      set({ isLoading: false, error: errorMessage });
      return false;
    }
  },

  // --- NEW Resend OTP Action ---
  resendOtp: async (): Promise<{ success: boolean; message: string; remaining?: number }> => {
    const userId = get().userIdForVerification;
    if (!userId) {
      const errorMsg = "User ID not found. Cannot resend OTP.";
       // Set error state directly, but don't change loading state here
       set({ error: errorMsg });
       return { success: false, message: errorMsg };
    }

    // Set specific loading state for resend
    set({ isResendingOtp: true, error: null });
    try {
        const response = await apiClient.post<ResendOtpResponse>('/users/resend-otp', { userId });
        set({ isResendingOtp: false });
        return {
            success: true,
            message: response.data.message || 'Verification code sent successfully',
            remaining: response.data.data?.remainingAttempts
        };
    } catch (error: any) {
        const errorMessage = getErrorMessage(error);
        set({ isResendingOtp: false, error: errorMessage }); // Set general error state
        return { success: false, message: errorMessage }; // Return specific message from error
    }
  },
  // --- End of Resend OTP Action ---


  login: async (payload: LoginPayload) => {
    // Reset relevant states
    set({ isLoading: true, isResendingOtp: false, error: null, requiresVerification: false, userIdForVerification: null });
    try {
      const response = await apiClient.post<LoginResponse>('/auth/login', payload);
      const { data: user, token } = response.data;
      localStorage.setItem('authToken', token);
      set({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error);
      localStorage.removeItem('authToken');
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: errorMessage,
      });
       throw new Error(errorMessage);
    }
  },

  logout: async () => {
    const currentToken = get().token;
    // Reset relevant states
    set({ isLoading: true, isResendingOtp: false, error: null });
    try {
        if (currentToken) {
            await apiClient.post<LogoutResponse>('/auth/logout');
        }
    } catch (error: any) {
        const errorMessage = getErrorMessage(error);
        console.error("Backend logout failed (frontend will still log out):", errorMessage);
    } finally {
        localStorage.removeItem('authToken');
        delete apiClient.defaults.headers.common['Authorization'];
        set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
            userIdForVerification: null,
            requiresVerification: false,
            isResendingOtp: false, // Ensure reset here too
        });
    }
  },

  initializeAuth: () => {
     set({ isResendingOtp: false }); // Ensure reset on init
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        set({ token, isAuthenticated: true, isAuthInitialized: true });
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } catch (error) {
        localStorage.removeItem('authToken');
        set({ token: null, isAuthenticated: false, isAuthInitialized: true, user: null });
      }
    } else {
      set({ isAuthInitialized: true });
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));