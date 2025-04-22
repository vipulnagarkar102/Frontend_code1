'use client';

import React, { useState, useEffect, useRef, FormEvent, ChangeEvent } from 'react'; // Added useRef
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ReCAPTCHA from "react-google-recaptcha"; // Import ReCAPTCHA v2 component

import LoginImg from '@/assets/pay-per-code.png'; 
import { FaEye, FaEyeSlash, FaLock, FaEnvelope } from 'react-icons/fa';
import { Button } from '@/components/ui/button'; 
import { useAuthStore } from '@/store/authStore'; 
import { LoginPayload as BaseLoginPayload } from '@/store/authTypes'; 

type LoginPayload = BaseLoginPayload; // Keep simple for now

const Login = () => {
  const [formData, setFormData] = useState<Omit<LoginPayload, 'captchaToken'>>({ // Exclude captchaToken from initial form state
    email: '',
    password: '',
  });

  const { login, isLoading, error: storeError, isAuthenticated, isAuthInitialized, clearError } = useAuthStore();
  const router = useRouter();

  const recaptchaRef = useRef<ReCAPTCHA>(null); // Ref for v2 component
  const [captchaToken, setCaptchaToken] = useState<string | null>(null); // State for v2 token
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthInitialized && isAuthenticated) {
      router.push('/customer-dashboard'); 
    }
  }, [isAuthenticated, isAuthInitialized, router]);

   useEffect(() => {
        return () => {
            clearError();
        };
    }, [clearError]);


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    clearError(); // Clear backend error
    // Clear frontend validation error for this field
    setFormErrors(prev => {
         const { [name]: _, ...rest } = prev;
         return { ...rest, captcha: prev.captcha }; // Keep captcha error
    });
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // --- ReCAPTCHA v2 onChange Handler ---
  const handleCaptchaChange = (token: string | null) => {
    console.log("v2 Login Captcha Token:", token);
    setCaptchaToken(token); // Store the token (or null if expired/reset)
    if (token) {
      setFormErrors(prev => ({ ...prev, captcha: '' })); // Clear captcha validation error if solved
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    clearError();
    setFormErrors({});

    // --- Frontend Validation ---
    const newErrors: Record<string, string> = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    // Add CAPTCHA v2 validation
    if (!captchaToken) {
      newErrors.captcha = 'Please complete the CAPTCHA verification.';
    }
    // --- End CAPTCHA Validation ---

    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors);
       // Reset CAPTCHA if other errors occurred and a token was present
       if (!newErrors.captcha && captchaToken && recaptchaRef.current) {
           recaptchaRef.current.reset();
           setCaptchaToken(null);
       }
      return; 
    }

    // Prepare payload including the captcha token
    const payload: LoginPayload = {
      email: formData.email.trim(),
      password: formData.password,
      captchaToken: captchaToken as string // We know it's not null here due to validation check
    };

    try {
      await login(payload); // Call store action with captchaToken
      // Check state *after* await
      const state = useAuthStore.getState();
      if (state.isAuthenticated) {
         router.push('/customer-dashboard'); // Redirect on successful login
      }
      // Error case is handled by the catch block

    } catch (err: any) {
      console.error("Login failed in component:", err);
       // Reset ReCAPTCHA on any login failure (backend or frontend induced)
       if (recaptchaRef.current) {
           recaptchaRef.current.reset();
           setCaptchaToken(null); // Clear token state
       }
       // Check if the error is specifically about CAPTCHA
       if (err.message && (err.message.toLowerCase().includes('captcha') || err.message.toLowerCase().includes('recaptcha'))) {
           setFormErrors(prev => ({ ...prev, captcha: `CAPTCHA Error: ${err.message}` }));
       }
    }
  };

  // --- Get V2 Site Key ---
   const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_V2_SITE_KEY; // Use the same V2 key as SignUp
   if (!siteKey) {
        console.error("ReCAPTCHA v2 Site Key not found (NEXT_PUBLIC_RECAPTCHA_V2_SITE_KEY)");
        // Optional: Render an error message to the user
        return <div className='p-4 text-red-600 text-center min-h-screen flex items-center justify-center'>CAPTCHA configuration error. Login unavailable.</div>;
   }


  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row text-[#003F5C]">
      {/* Left side - Image */}
      <div className="hidden lg:block lg:w-[40%] flex-shrink-0">
        <div className="h-full w-full relative">
          <Image
            src={LoginImg}
            alt="Login"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
      </div>

      {/* Right side - Login form */}
       <div className="w-full lg:w-[60%] flex items-center justify-center p-4 md:p-6 mt-[72px] lg:mt-0">
        <div className="w-full max-w-[600px] bg-white rounded-xl shadow-lg p-6 md:p-8">
          <div className="mb-6 md:mb-8">
            <h1 className="text-3xl md:text-[40px] font-bold text-center font-poppins">Hi, Welcome Back!</h1>
          </div>

          {/* Display Combined Errors Area */}
          {(storeError || Object.keys(formErrors).length > 0) && (
             <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-400 rounded text-sm space-y-1">
                {storeError && !formErrors.captcha && <p>{storeError}</p>}
                {Object.entries(formErrors).map(([key, error]) => (
                    error && <p key={key}>{error}</p>
                ))}
             </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm md:text-[16px] text-gray-700 font-lato font-bold mb-1">Email Address*</label>
              <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="your@email.com"
                      className={`w-full text-sm md:text-base pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A5CF] ${formErrors.email ? 'border-red-500' : 'border-gray-300'}`}
                      value={formData.email}
                      onChange={handleChange}
                      required
                  />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm md:text-[16px] text-gray-700 font-lato font-bold mb-1">Password*</label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                   className={`w-full text-sm md:text-base pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A5CF] ${formErrors.password ? 'border-red-500' : 'border-gray-300'}`}
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                </button>
              </div>
            </div>

             {/* --- ReCAPTCHA v2 Component --- */}
             <div className="flex justify-center pt-2">
                <ReCAPTCHA
                     ref={recaptchaRef}
                     sitekey={siteKey} // Your V2 Site Key
                     onChange={handleCaptchaChange} // Sets captchaToken state
                 />
             </div>


            {/* Submit Button */}
            <Button
              type='submit'
              className='w-full font-poppins py-3 md:py-4 mt-4 font-semibold text-base md:text-[18px] cursor-pointer bg-[#00A5CF] hover:bg-[#008CBA] text-[#FFFFFF] disabled:opacity-50 disabled:cursor-not-allowed'
              disabled={isLoading} // Disable button when loading
            >
              {isLoading ? 'Logging In...' : 'Login'}
            </Button>

          </form>

          <div className="text-center mt-6">
             <p className="text-base md:text-[18px] font-lato font-normal">
              Don't have an account?{' '}
              <Link href="/auth/sign-up" className="text-[#00A5CF] font-medium hover:underline">
                Register Now
              </Link>
            </p>
            {/* Optional: Add Forgot Password Link */}
            {/* <p className="text-sm mt-2">
                <Link href="/auth/forgot-password" className="text-blue-600 hover:underline">
                    Forgot Password?
                </Link>
             </p> */}
          </div>
        </div>
      </div>
    </div>
  );
};


// --- Wrapper Component (Checks for Site Key) ---
// No Provider needed for v2, just check the key.
const LoginPage = () => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_V2_SITE_KEY;

    if (!siteKey) {
        console.error("ReCAPTCHA V2 Site Key is not defined (NEXT_PUBLIC_RECAPTCHA_V2_SITE_KEY)");
        return (
            <div className="flex items-center justify-center min-h-screen p-4">
                 <div className="p-4 md:p-6 bg-red-100 text-red-700 rounded border border-red-400 text-center">
                     <h3 className="font-bold mb-2">Configuration Error</h3>
                     <p>The application is missing the required ReCAPTCHA configuration.</p>
                     <p>Please contact the site administrator.</p>
                 </div>
            </div>
        );
    }
    return <Login />;
};


export default LoginPage; // Export the wrapper