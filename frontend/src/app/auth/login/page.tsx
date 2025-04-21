'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import LoginImg from '@/assets/pay-per-code.png';
import { FaEye, FaEyeSlash, FaLock, FaEnvelope } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';
import { LoginPayload } from '@/store/authTypes';

const Login = () => {
  const [formData, setFormData] = useState<LoginPayload>({
    email: '',
    password: '',
  });

  // Get store state and actions
  const { login, isLoading, error: storeError, isAuthenticated, isAuthInitialized, clearError } = useAuthStore();
  const router = useRouter();

  const [formErrors, setFormErrors] = useState<Record<string, string>>({}); // Local form validation errors
  const [showPassword, setShowPassword] = useState(false);


  useEffect(() => {
    // Only redirect if auth check is complete AND user is authenticated
    if (isAuthInitialized && isAuthenticated) {
      console.log(`User authenticated on ${window.location.pathname}, redirecting to dashboard...`);
      router.push('/customer-dashboard');
    }
  }, [isAuthenticated, isAuthInitialized, router]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    clearError(); // Clear store error on input change
    setFormErrors({}); // Clear local errors on input change
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError(); // Clear previous store errors
    setFormErrors({}); // Clear previous local errors

    // Basic Frontend Validation
    const newErrors: Record<string, string> = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors);
      return; // Stop submission if basic frontend errors exist
    }

    try {
      await login(formData);
      // Check isAuthenticated state AFTER the login attempt
      const state = useAuthStore.getState();
      if (state.isAuthenticated) {
        console.log('Login successful, redirecting to dashboard...');
        router.push('/customer-dashboard'); // Redirect on successful login
      }
      // If login fails, the catch block in the store action handles the error state.
    } catch (err) {
      // Error is already set in the store by the login action's catch block
      console.error("Login failed in component:", err);
      // The UI will display the error from `storeError`
    }
  };

  return (
    <div className="flex min-h-screen w-full mt-26 flex-row text-[#003F5C]">
      {/* Left side - Image */}
      <div className="hidden lg:block w-[40%]">
        <div className="h-full relative">
          <Image
            src={LoginImg}
            alt="Login"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="w-full lg:w-3/5 flex items-center justify-center p-6">
        <div className="w-full max-w-[600px] bg-white rounded-xl shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-[40px] font-bold text-center font-poppins">Hi, Welcome to Vtex.Ai</h1>
          </div>

          {/* Display Store Error */}
          {storeError && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-400 rounded">
              {storeError}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="mb-5">
              <label htmlFor="email" className="block text-[16px] text-gray-700 font-lato font-bold mb-2">Enter your Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-700" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your@email.com"
                  className={`w-full text-[14px] sm:text-[18px] pl-12 font-lato font-normal pr-4 py-2 border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A5CF]`}
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              {formErrors.email && <p className="text-red-500 font-normal font-lato text-sm mt-1">{formErrors.email}</p>}
            </div>

            {/* Password Field */}
            <div className="mb-5">
              <label htmlFor="password" className="block text-[16px] text-gray-700 font-lato font-bold mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-600" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  className={`w-full text-[14px] sm:text-[18px] pl-12 font-lato font-normal py-2 border ${formErrors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A5CF]`}
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute cursor-pointer inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash className="text-gray-400" /> : <FaEye className="text-gray-400" />}
                </button>
              </div>
              {formErrors.password && <p className="text-red-500 font-normal font-lato text-sm mt-1">{formErrors.password}</p>}
            </div>
            


        {/* Submit Button */}
        <Button
          type='submit'
          className='w-full font-poppins py-5 font-semibold text-[18px] cursor-pointer bg-[#00A5CF] hover:bg-[#008CBA] text-[#FFFFFF] disabled:opacity-50 disabled:cursor-not-allowed'
          disabled={isLoading} // Disable button when loading
        >
          {isLoading ? 'Logging In...' : 'Login'}
        </Button>

      </form>

      <div className="text-center mt-6">
        <p className="text-[20px] font-lato font-normal">
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
      </div >
    </div >
  );
};

export default Login;