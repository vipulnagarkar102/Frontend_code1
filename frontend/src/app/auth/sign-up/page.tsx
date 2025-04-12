'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import SignUpImg from '@/assets/pay-per-code.png'; // Make sure path is correct
import { FaEye, FaEyeSlash, FaLock, FaEnvelope, FaUser, FaCalendar, FaIndustry, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { Button } from '@/components/ui/button'; // Make sure path is correct
import { useAuthStore } from '@/store/authStore'; // Adjusted path
import { RegisterPayload } from '@/store/authTypes'; // Adjusted path

// Define a type for the component's state that allows empty string for industry select
type SignUpFormData = Omit<RegisterPayload, 'industry' | 'preferences'> & {
    industry: RegisterPayload['industry'] | ''; // Allow empty string for select initial state
    preferences: { notification_opt_in: boolean };
};

const SignUp = () => {
  const [formData, setFormData] = useState<SignUpFormData>({
    first_name: '',
    last_name: '',
    DoB: '', // Initialize as empty string for input
    industry: '', // Initialize as empty string for select default option
    email: '',
    password: '',
    phone_number: '', // Initialize as empty string for input
    address: { // Initialize address object
      state: '',
      country: ''
    },
    preferences: {
      notification_opt_in: false
    }
  });

  // Get store actions and state
  const { register, isLoading, error: storeError, clearError } = useAuthStore();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({}); // Local form validation errors

  const industries = ['Healthcare', 'Digital Engineering', 'Life science', 'Pharmacy'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    clearError(); // Clear store error on input change
    setFormErrors({}); // Clear local errors on input change

    if (name.includes('.')) {
      const [parent, child] = name.split('.') as ['address', string]; // Only address is nested text input

      if (parent === 'address') {
          setFormData(prev => ({
            ...prev,
            address: {
              // Ensure address exists, though it always should based on initial state
              ...(prev.address ?? { state: '', country: ''}),
              [child]: value
            }
          }));
      }
    } else {
        // Handle industry specifically if value is empty string
        if (name === 'industry' && value === '') {
             setFormData(prev => ({
                ...prev,
                industry: '' // Keep empty string in state for select
             }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    if (name === 'notification_opt_in') {
        setFormData(prev => ({
          ...prev,
          preferences: {
            ...prev.preferences,
            notification_opt_in: checked
          }
        }));
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setFormErrors({});

    // Basic Frontend Validation
    const newErrors: Record<string, string> = {};
    if (!formData.first_name) newErrors.first_name = 'First name is required';
    if (!formData.last_name) newErrors.last_name = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!formData.industry) newErrors.industry = 'Industry is required'; // Check if it's still ''
    // Optional: Add validation for country code format (2 letters)
    if (formData.address?.country && formData.address.country.length !== 2) {
        newErrors['address.country'] = 'Country must be a 2-letter code (e.g., US)';
    }

    if (Object.keys(newErrors).length > 0) {
        setFormErrors(newErrors);
        return;
    }

    // Prepare payload for the store action
    const payload: RegisterPayload = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        // Ensure optional fields are null if empty, or keep the value
        DoB: formData.DoB || null,
        industry: formData.industry || undefined, // Send undefined if empty string (or null depending on API expectation)
        email: formData.email,
        password: formData.password,
        phone_number: formData.phone_number || null,
        address: {
            state: formData.address?.state || null, // Use optional chaining and null default
            country: formData.address?.country || null,
        },
        preferences: { // Preferences object always exists in state
            notification_opt_in: formData.preferences.notification_opt_in
        }
    };

    try {
      await register(payload);
      const state = useAuthStore.getState();
      if (state.requiresVerification) {
        console.log('Registration successful, redirecting to verification...');
        router.push('/auth/verify-email');
      } else {
         console.warn("Registration succeeded but verification flag not set.");
      }
    } catch (err) {
      console.error("Registration failed in component:", err);
      // Error displayed via storeError
    }
  };

  return (
    <div className="flex min-h-screen w-full mt-26 flex-row text-[#003F5C]">
      {/* Left side */}
      <div className="hidden lg:block w-[40%]">
        <div className="h-full relative">
          <Image
            src={SignUpImg}
            alt="Sign Up"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Right side */}
      <div className="w-full lg:w-3/5 flex items-center justify-center p-6">
        <div className="w-full max-w-[600px] bg-white rounded-xl shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-[40px] font-bold text-center font-poppins">Create an Account 🚀</h1>
          </div>

           {storeError && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-400 rounded">
                {storeError}
              </div>
            )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* First Name */}
              <div>
                <label htmlFor="first_name" className="block text-[16px] text-gray-700 font-lato font-bold mb-2">First Name*</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><FaUser className="text-gray-700" /></div>
                  <input
                    type="text" id="first_name" name="first_name" placeholder="John"
                    className={`w-full text-[14px] sm:text-[18px] pl-12 font-lato font-normal pr-4 py-2 border ${formErrors.first_name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A5CF]`}
                    value={formData.first_name} onChange={handleChange}
                  />
                </div>
                {formErrors.first_name && <p className="text-red-500 font-normal font-lato text-sm mt-1">{formErrors.first_name}</p>}
              </div>
              {/* Last Name */}
              <div>
                <label htmlFor="last_name" className="block text-[16px] text-gray-700 font-lato font-bold mb-2">Last Name*</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><FaUser className="text-gray-700" /></div>
                  <input
                    type="text" id="last_name" name="last_name" placeholder="Doe"
                    className={`w-full text-[14px] sm:text-[18px] pl-12 font-lato font-normal pr-4 py-2 border ${formErrors.last_name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A5CF]`}
                    value={formData.last_name} onChange={handleChange}
                  />
                </div>
                {formErrors.last_name && <p className="text-red-500 font-normal font-lato text-sm mt-1">{formErrors.last_name}</p>}
              </div>
            </div>

            {/* Date of Birth */}
            <div>
              <label htmlFor="DoB" className="block text-[16px] text-gray-700 font-lato font-bold mb-2">Date of Birth</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><FaCalendar className="text-gray-700" /></div>
                <input
                  type="date" id="DoB" name="DoB"
                  className={`w-full text-[14px] sm:text-[18px] pl-12 font-lato font-normal pr-4 py-2 border ${formErrors.DoB ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A5CF]`}
                  value={formData.DoB ?? ''} onChange={handleChange} // Use ?? ''
                />
              </div>
              {formErrors.DoB && <p className="text-red-500 font-normal font-lato text-sm mt-1">{formErrors.DoB}</p>}
            </div>

            {/* Industry */}
            <div>
              <label htmlFor="industry" className="block text-[16px] text-gray-700 font-lato font-bold mb-2">Industry*</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><FaIndustry className="text-gray-700" /></div>
                <select
                  id="industry" name="industry"
                  className={`w-full text-[14px] sm:text-[18px] pl-12 font-lato font-normal pr-4 py-2 border ${formErrors.industry ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A5CF]`}
                  value={formData.industry} onChange={handleChange}
                >
                  <option value="">Select your industry</option>
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
              </div>
              {formErrors.industry && <p className="text-red-500 font-normal font-lato text-sm mt-1">{formErrors.industry}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-[16px] text-gray-700 font-lato font-bold mb-2">Email Address*</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><FaEnvelope className="text-gray-700" /></div>
                <input
                  type="email" id="email" name="email" placeholder="your@email.com"
                  className={`w-full text-[14px] sm:text-[18px] pl-12 font-lato font-normal pr-4 py-2 border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A5CF]`}
                  value={formData.email} onChange={handleChange}
                />
              </div>
              {formErrors.email && <p className="text-red-500 font-normal font-lato text-sm mt-1">{formErrors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-[16px] text-gray-700 font-lato font-bold mb-2">Password*</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><FaLock className="text-gray-600" /></div>
                <input
                  type={showPassword ? "text" : "password"} id="password" name="password" placeholder="Enter your password"
                  className={`w-full text-[14px] sm:text-[18px] pl-12 font-lato font-normal py-2 border ${formErrors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A5CF]`}
                  value={formData.password} onChange={handleChange}
                />
                <button type="button" className="absolute cursor-pointer inset-y-0 right-0 pr-3 flex items-center" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash className="text-gray-400" /> : <FaEye className="text-gray-400" />}
                </button>
              </div>
              {formErrors.password && <p className="text-red-500 font-normal font-lato text-sm mt-1">{formErrors.password}</p>}
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone_number" className="block text-[16px] text-gray-700 font-lato font-bold mb-2">Phone Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><FaPhone className="text-gray-700" /></div>
                <input
                  type="tel" id="phone_number" name="phone_number" placeholder="+12095178912"
                  className={`w-full text-[14px] sm:text-[18px] pl-12 font-lato font-normal pr-4 py-2 border ${formErrors.phone_number ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A5CF]`}
                  value={formData.phone_number ?? ''} onChange={handleChange} // Use ?? ''
                />
              </div>
              {formErrors.phone_number && <p className="text-red-500 font-normal font-lato text-sm mt-1">{formErrors.phone_number}</p>}
            </div>

            {/* Address Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* State */}
                <div>
                    <label htmlFor="address.state" className="block text-[16px] text-gray-700 font-lato font-bold mb-2">State</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><FaMapMarkerAlt className="text-gray-700" /></div>
                        <input
                            type="text" id="address.state" name="address.state" placeholder="California"
                            className={`w-full text-[14px] sm:text-[18px] pl-12 font-lato font-normal pr-4 py-2 border ${formErrors['address.state'] ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A5CF]`}
                            value={formData.address?.state ?? ''} onChange={handleChange} // Use ?. and ?? ''
                        />
                    </div>
                    {formErrors['address.state'] && <p className="text-red-500 font-normal font-lato text-sm mt-1">{formErrors['address.state']}</p>}
                </div>
                {/* Country */}
                <div>
                    <label htmlFor="address.country" className="block text-[16px] text-gray-700 font-lato font-bold mb-2">Country (2-letter code)</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><FaMapMarkerAlt className="text-gray-700" /></div>
                        <input
                            type="text" id="address.country" name="address.country" placeholder="US" maxLength={2}
                            className={`w-full text-[14px] sm:text-[18px] pl-12 font-lato font-normal pr-4 py-2 border ${formErrors['address.country'] ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A5CF]`}
                            value={formData.address?.country ?? ''} onChange={handleChange} // Use ?. and ?? ''
                        />
                    </div>
                    {formErrors['address.country'] && <p className="text-red-500 font-normal font-lato text-sm mt-1">{formErrors['address.country']}</p>}
                </div>
            </div>

            {/* Notification Preferences */}
            <div className="flex items-center">
              <input
                type="checkbox" id="notification_opt_in" name="notification_opt_in"
                className="h-5 w-5 text-[#00A5CF] rounded focus:ring-[#00A5CF]"
                checked={formData.preferences.notification_opt_in} onChange={handleCheckboxChange}
              />
              <label htmlFor="notification_opt_in" className="ml-2 block text-[16px] text-gray-700 font-lato">
                I agree to receive notifications and updates
              </label>
            </div>

            {/* Submit Button */}
            <Button
                type='submit'
                className='w-full font-poppins py-5 font-semibold text-[18px] cursor-pointer bg-[#00A5CF] hover:bg-[#008CBA] text-[#FFFFFF] disabled:opacity-50 disabled:cursor-not-allowed'
                disabled={isLoading}
            >
                 {isLoading ? 'Signing Up...' : 'Sign Up'}
            </Button>
          </form>

          <div className="text-center mt-6">
            <p className="text-[20px] font-lato font-normal">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-[#00A5CF] font-medium hover:underline">
                Login Here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;