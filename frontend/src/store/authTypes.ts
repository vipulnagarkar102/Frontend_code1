
export interface User {
  id: string;
  status: 'active' | 'inactive' | 'banned';
  first_name?: string;
}

// UPDATED: Added captcha field
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
  captcha?: string; // <-- ADDED CAPTCHA FIELD
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
  captchaToken?: string; // <-- ADDED CAPTCHA FIELD
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
  data?: {
      remainingAttempts: number;
      maxAttempts: number;
  };
}

export interface AuthState {
  user: User | null;
  token: string | null;
  setToken: (token: string) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  isResendingOtp: boolean;
  error: string | null;
  userIdForVerification: string | null;
  requiresVerification: boolean;
  isAuthInitialized: boolean;

  // UPDATED: Adjusted payload types for actions
  register: (payload: RegisterPayload) => Promise<void>; // Includes captcha
  verifyEmail: (otpCode: string) => Promise<boolean>;
  resendOtp: () => Promise<{ success: boolean; message: string; remaining?: number }>;
  login: (payload: LoginPayload) => Promise<void>; // Includes captchaToken
  logout: () => Promise<void>;
  initializeAuth: () => Promise<void>;
  clearError: () => void;
}
