export interface User {
    id: string;
    status: 'active' | 'inactive' | 'banned';
  }
  
  export interface RegisterPayload {
    first_name: string;
    last_name: string;
    DoB?: string | null;
    industry?: 'Healthcare' | 'Digital Engineering' | 'Life science' | 'Pharmacy';
    email: string;
    password: string;
    phone_number?: string | null;
    address?: {
      state?: string | null;
      country?: string | null;
    };
    preferences?: {
      notification_opt_in?: boolean;
    };
  }
  
  export interface RegisterResponse {
    status: string;
    message: string;
    user: {
      id: string;
      status: 'inactive';
    };
  }
  
  export interface VerifyEmailPayload {
    userId: string;
    otpCode: string;
  }
  
  export interface VerifyEmailResponse {
      status: string;
      message: string;
  }
  
  
  export interface LoginPayload {
    email: string;
    password: string;
  }
  
  export interface LoginResponse {
    status: string;
    message: string;
    data: User;
    token: string;
  }
  
  export interface LogoutResponse {
      status: string;
      message: string;
  }

  export interface ResendOtpResponse {
    status: string;
    message: string;
    data?: { // Data might be optional depending on API response structure
        remainingAttempts: number;
        maxAttempts: number;
    };
}
  
  export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    isResendingOtp: boolean;
    error: string | null;
    userIdForVerification: string | null;
    requiresVerification: boolean;
    isAuthInitialized: boolean;
  
    register: (payload: RegisterPayload) => Promise<void>;
    verifyEmail: (otpCode: string) => Promise<boolean>;
    resendOtp: () => Promise<{ success: boolean; message: string; remaining?: number }>;
    login: (payload: LoginPayload) => Promise<void>;
    logout: () => Promise<void>;
    initializeAuth: () => void;
    clearError: () => void;
  }