import { create } from 'zustand';
import { AuthState, RegisterPayload, LoginPayload, User, RegisterResponse, VerifyEmailResponse, LoginResponse, LogoutResponse, ResendOtpResponse } from './authTypes';
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

// Helper function to clear auth state (used in logout and init failure)
const clearAuthState = (set: (updater: (state: AuthState) => Partial<AuthState>) => void) => {
    localStorage.removeItem('authToken');
    delete apiClient.defaults.headers.common['Authorization'];
    set(state => ({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false, // Reset loading states as well
        isResendingOtp: false,
        error: null,
        userIdForVerification: null,
        requiresVerification: false,
        // Keep isAuthInitialized true after first attempt
        isAuthInitialized: true,
    }));
     console.log('Auth state cleared.');
};


export const useAuthStore = create<AuthState>((set, get) => ({
  // Initial State
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  isResendingOtp: false,
  error: null,
  userIdForVerification: null,
  requiresVerification: false,
  isAuthInitialized: false,


  register: async (payload: RegisterPayload) => {
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
      console.error("Registration API Error:", error.response?.status, errorMessage);
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
    set({ isLoading: true, isResendingOtp: false, error: null });
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
       console.error("Verify Email API Error:", error.response?.status, errorMessage);
      set({ isLoading: false, error: errorMessage });
      return false;
    }
  },

  resendOtp: async (): Promise<{ success: boolean; message: string; remaining?: number }> => {
    const userId = get().userIdForVerification;
    if (!userId) {
      const errorMsg = "User ID not found. Cannot resend OTP.";
       set({ error: errorMsg });
       return { success: false, message: errorMsg };
    }
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
        console.error("Resend OTP API Error:", error.response?.status, errorMessage);
        set({ isResendingOtp: false, error: errorMessage });
        return { success: false, message: errorMessage };
    }
  },

  login: async (payload: LoginPayload) => {
    set({ isLoading: true, isResendingOtp: false, error: null, requiresVerification: false, userIdForVerification: null });
    try {
      const response = await apiClient.post<LoginResponse>('/auth/login', payload);
      const { data: user, token } = response.data;
      localStorage.setItem('authToken', token);
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      set({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
        isAuthInitialized: true, // Mark as initialized on successful login
      });
    } catch (error: any) {
      const errorMessage = getErrorMessage(error);
      console.error("Login API Error:", error.response?.status, errorMessage);

      clearAuthState(set); // Clear state fully on login failure
      set({ error: errorMessage }); // Set the specific error message
      throw new Error(errorMessage);
    }
  },

  // Logout Action
  logout: async () => {
    const currentToken = get().token;
    console.log("Initiating logout...");
    try {
        if (currentToken) {
            // Call backend logout fire-and-forget (don't wait or depend on success)
             apiClient.post<LogoutResponse>('/auth/logout').catch(err => {
                 console.warn("Backend logout call failed:", err.message);
             });
        }
    } catch (error: any) {
        console.error("Error during logout request setup:", error);
    } finally {
        
        clearAuthState(set);
    }
  },

  initializeAuth: async () => {
     if (get().isAuthInitialized) {
       // console.log("Auth already initialized.");
       return;
     }
     console.log("Initializing authentication...");

     const token = localStorage.getItem('authToken');

     if (token) {
        console.log("Token found in storage. Verifying...");
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        try {
            // Attempt to fetch user profile to validate the token
            const response = await apiClient.get<{status: string; data: User}>('/users/getUserProfile'); // Adjust endpoint if needed
            const user = response.data.data;

            if (user && user.status === 'active') {
                console.log("Token verified, user profile fetched:", user);
                set({
                    user,
                    token,
                    isAuthenticated: true,
                    isAuthInitialized: true,
                    isLoading: false, // Ensure loading is false
                    error: null
                });
            } else {
                 // User found but not active, or unexpected response
                 console.warn("Token valid but user not active or profile data invalid. Logging out.");
                 clearAuthState(set); // Clear state
            }
        } catch (error: any) {
            // Token is invalid (expired, wrong signature, etc.) or API failed
            const errorMessage = getErrorMessage(error);
            console.warn("Token verification failed:", error.response?.status, errorMessage);
            clearAuthState(set); // Clear state
        }
     } else {
        console.log("No token found in storage.");
        // Ensure state is clear and mark as initialized
        clearAuthState(set);
     }
  },

  clearError: () => {
    set({ error: null });
  },
}));
