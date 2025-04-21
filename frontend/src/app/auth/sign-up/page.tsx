'use client';

import React, { useEffect, useState, useRef, FormEvent, ChangeEvent } from 'react'; // Added useRef
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ReCAPTCHA from "react-google-recaptcha"; // Import v2 component

import SignUpImg from '@/assets/pay-per-code.png';
import { FaEye, FaEyeSlash, FaLock, FaEnvelope, FaUser, FaCalendar, FaIndustry, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';
// Import base type and extend it
import { RegisterPayload as BaseRegisterPayload } from '@/store/authTypes';

// Extend the type for the component payload
type RegisterPayload = BaseRegisterPayload & { captcha?: string | null }; // Captcha token from v2

type SignUpFormData = Omit<RegisterPayload, 'industry' | 'preferences' | 'captcha'> & {
    industry: BaseRegisterPayload['industry'] | '';
    preferences: { notification_opt_in: boolean };
};

const SignUp = () => {
    const [formData, setFormData] = useState<SignUpFormData>({
        first_name: '', last_name: '', DoB: '', industry: '', email: '',
        password: '', phone_number: '',
        address: { state: '', country: '' },
        preferences: { notification_opt_in: false }
    });

    const { register, isLoading, error: storeError, isAuthInitialized, isAuthenticated, clearError } = useAuthStore();
    const router = useRouter();
    const recaptchaRef = useRef<ReCAPTCHA>(null); // Ref for ReCAPTCHA component
    const [captchaToken, setCaptchaToken] = useState<string | null>(null); // State to store the token

    useEffect(() => {
        if (isAuthInitialized && isAuthenticated) {
            router.push('/customer-dashboard');
        }
    }, [isAuthenticated, isAuthInitialized, router]);

    const [showPassword, setShowPassword] = useState(false);
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const industries = ['Healthcare', 'Digital Engineering', 'Life science', 'Pharmacy'];

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        clearError();
        setFormErrors(prev => ({ ...prev, [name]: '', captcha: prev.captcha })); // Clear specific field error, keep captcha error if any

        if (name.includes('.')) {
            const [parent, child] = name.split('.') as ['address', string];
            if (parent === 'address') {
                setFormData(prev => ({ ...prev, address: { ...(prev.address ?? { state: '', country: '' }), [child]: value } }));
            }
        } else {
            if (name === 'industry' && value === '') {
                setFormData(prev => ({ ...prev, industry: '' }));
            } else {
                setFormData(prev => ({ ...prev, [name]: value }));
            }
        }
    };

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        if (name === 'notification_opt_in') {
            setFormData(prev => ({ ...prev, preferences: { ...prev.preferences, notification_opt_in: checked } }));
        }
    };

    // --- ReCAPTCHA v2 onChange Handler ---
    const handleCaptchaChange = (token: string | null) => {
        console.log("Captcha Token:", token);
        setCaptchaToken(token);
        if (token) {
            setFormErrors(prev => ({ ...prev, captcha: '' })); // Clear captcha error if user solves it
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        clearError();
        setFormErrors({});

        // --- Frontend Validation ---
        const newErrors: Record<string, string> = {};
        if (!formData.first_name) newErrors.first_name = 'First name is required';
        if (!formData.last_name) newErrors.last_name = 'Last name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
        if (!formData.industry) newErrors.industry = 'Industry is required';
        if (formData.address?.country && formData.address.country.length !== 0 && formData.address.country.length !== 2) {
            newErrors['address.country'] = 'Country must be a 2-letter code (e.g., US)';
        }
        // --- Add CAPTCHA Validation ---
        if (!captchaToken) {
            newErrors.captcha = 'Please complete the CAPTCHA verification.';
        }
        // --- End CAPTCHA Validation ---

        if (Object.keys(newErrors).length > 0) {
            setFormErrors(newErrors);
            // Reset ReCAPTCHA if other errors occurred, forcing user to solve again
            if (!newErrors.captcha && recaptchaRef.current) {
                 recaptchaRef.current.reset();
                 setCaptchaToken(null);
            }
            return;
        }
        // --- End Frontend Validation ---

        // Prepare payload including captcha token
        const payload: RegisterPayload = {
            first_name: formData.first_name,
            last_name: formData.last_name,
            DoB: formData.DoB || null,
            industry: formData.industry || undefined,
            email: formData.email,
            password: formData.password,
            phone_number: formData.phone_number || null,
            address: {
                state: formData.address?.state || null,
                country: formData.address?.country || null,
            },
            preferences: {
                notification_opt_in: formData.preferences.notification_opt_in
            },
            captcha: captchaToken ?? undefined // Convert null to undefined
        };

        try {
            await register(payload); // Call store action
            const state = useAuthStore.getState();
            if (state.requiresVerification) {
                router.push('/auth/verify-email');
            } else {
                console.warn("Registration succeeded but verification flag not set.");
                // Maybe redirect to login or show a specific message
            }
        } catch (err: any) {
            console.error("Registration failed in component:", err);
             // Reset ReCAPTCHA on backend failure, forcing user to solve again
            if (recaptchaRef.current) {
                 recaptchaRef.current.reset();
                 setCaptchaToken(null);
            }
             // Display backend error (storeError will be set by the action)
             // Optionally check if the error is captcha-related and update formErrors.captcha
            if (err.message && (err.message.toLowerCase().includes('captcha') || err.message.toLowerCase().includes('recaptcha'))) {
                 setFormErrors(prev => ({ ...prev, captcha: `CAPTCHA Error: ${err.message}` }));
            }
        }
    };

    // --- Render Form ---
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_V2_SITE_KEY;
    if (!siteKey) {
        console.error("ReCAPTCHA v2 Site Key not found in env variables (NEXT_PUBLIC_RECAPTCHA_V2_SITE_KEY)");
        // Optionally return an error message for the user
        return <div className='p-4 text-red-600'>ReCAPTCHA configuration error. Cannot display form.</div>;
    }

    return (
        <div className="flex min-h-screen w-full flex-col lg:flex-row text-[#003F5C]"> {/* Use flex-col for mobile stacking */}
            {/* Left side Image */}
             <div className="hidden lg:block lg:w-[40%] flex-shrink-0">
                <div className="h-full w-full relative">
                    <Image src={SignUpImg} alt="Sign Up" layout="fill" objectFit="cover" priority />
                </div>
            </div>

            {/* Right side Form */}
            <div className="w-full lg:w-[60%] flex items-center justify-center p-4 md:p-6 mt-[72px] lg:mt-0"> {/* Adjust top margin for mobile if needed */}
                <div className="w-full max-w-[600px] bg-white rounded-xl shadow-lg p-6 md:p-8">
                    <div className="mb-8">
                        <h1 className="text-3xl md:text-[40px] font-bold text-center font-poppins">Create an Account 🚀</h1>
                    </div>

                    {/* Display Errors */}
                    {storeError && !formErrors.captcha && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-400 rounded text-sm">
                            {storeError}
                        </div>
                    )}
                    {/* Display specific form validation errors including captcha */}
                    {Object.values(formErrors).map((error, index) => (
                         error && <p key={index} className="text-red-500 text-xs md:text-sm mt-1 mb-2">{error}</p>
                    ))}


                    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                        {/* --- Form Fields --- */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* First Name */}
                            <div>
                                <label htmlFor="first_name" className="block text-sm md:text-[16px] text-gray-700 font-lato font-bold mb-1">First Name*</label>
                                <div className="relative">
                                    <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    <input type="text" id="first_name" name="first_name" placeholder="John" className={`w-full text-sm md:text-base pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A5CF] ${formErrors.first_name ? 'border-red-500' : 'border-gray-300'}`} value={formData.first_name} onChange={handleChange} />
                                </div>
                                {/* Error moved above form */}
                            </div>
                            {/* Last Name */}
                            <div>
                                <label htmlFor="last_name" className="block text-sm md:text-[16px] text-gray-700 font-lato font-bold mb-1">Last Name*</label>
                                <div className="relative">
                                     <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    <input type="text" id="last_name" name="last_name" placeholder="Doe" className={`w-full text-sm md:text-base pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A5CF] ${formErrors.last_name ? 'border-red-500' : 'border-gray-300'}`} value={formData.last_name} onChange={handleChange} />
                                </div>
                                {/* Error moved above form */}
                            </div>
                        </div>
                         {/* DoB */}
                         <div>
                            <label htmlFor="DoB" className="block text-sm md:text-[16px] text-gray-700 font-lato font-bold mb-1">Date of Birth</label>
                            <div className="relative">
                                <FaCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                                <input type="date" id="DoB" name="DoB" className={`w-full text-sm md:text-base pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A5CF] ${formErrors.DoB ? 'border-red-500' : 'border-gray-300'}`} value={formData.DoB ?? ''} onChange={handleChange} />
                            </div>
                            {/* Error moved above form */}
                        </div>
                         {/* Industry */}
                        <div>
                            <label htmlFor="industry" className="block text-sm md:text-[16px] text-gray-700 font-lato font-bold mb-1">Industry*</label>
                            <div className="relative">
                                <FaIndustry className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                                <select id="industry" name="industry" className={`w-full text-sm md:text-base pl-10 pr-8 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A5CF] bg-white appearance-none ${formErrors.industry ? 'border-red-500' : 'border-gray-300'}`} value={formData.industry} onChange={handleChange}>
                                    <option value="">Select your industry</option>
                                    {industries.map((industry) => (<option key={industry} value={industry}>{industry}</option>))}
                                </select>
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <FaMapMarkerAlt className="text-gray-400 h-4 w-4" />
                                 </div>
                            </div>
                             {/* Error moved above form */}
                        </div>
                        {/* Address Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="address.state" className="block text-sm md:text-[16px] text-gray-700 font-lato font-bold mb-1">State</label>
                                <div className="relative">
                                    <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    <input type="text" id="address.state" name="address.state" placeholder="California" className={`w-full text-sm md:text-base pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A5CF] ${formErrors['address.state'] ? 'border-red-500' : 'border-gray-300'}`} value={formData.address?.state ?? ''} onChange={handleChange} />
                                </div>
                                 {/* Error moved above form */}
                            </div>
                            <div>
                                <label htmlFor="address.country" className="block text-sm md:text-[16px] text-gray-700 font-lato font-bold mb-1">Country (2-letter code)</label>
                                <div className="relative">
                                    <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    <input type="text" id="address.country" name="address.country" placeholder="US" maxLength={2} className={`w-full text-sm md:text-base pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A5CF] ${formErrors['address.country'] ? 'border-red-500' : 'border-gray-300'}`} value={formData.address?.country ?? ''} onChange={handleChange} />
                                </div>
                                 {/* Error moved above form */}
                            </div>
                        </div>
                         {/* Email */}
                         <div>
                            <label htmlFor="email" className="block text-sm md:text-[16px] text-gray-700 font-lato font-bold mb-1">Email Address*</label>
                            <div className="relative">
                                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                                <input type="email" id="email" name="email" placeholder="your@email.com" className={`w-full text-sm md:text-base pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A5CF] ${formErrors.email ? 'border-red-500' : 'border-gray-300'}`} value={formData.email} onChange={handleChange} />
                            </div>
                             {/* Error moved above form */}
                        </div>
                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm md:text-[16px] text-gray-700 font-lato font-bold mb-1">Password*</label>
                            <div className="relative">
                                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                                <input type={showPassword ? "text" : "password"} id="password" name="password" placeholder="Enter your password" className={`w-full text-sm md:text-base pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A5CF] ${formErrors.password ? 'border-red-500' : 'border-gray-300'}`} value={formData.password} onChange={handleChange} />
                                <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                                </button>
                            </div>
                             {/* Error moved above form */}
                        </div>
                         {/* Phone */}
                         <div>
                            <label htmlFor="phone_number" className="block text-sm md:text-[16px] text-gray-700 font-lato font-bold mb-1">Phone Number</label>
                            <div className="relative">
                                <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                                <input type="tel" id="phone_number" name="phone_number" placeholder="+12095178912" className={`w-full text-sm md:text-base pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A5CF] ${formErrors.phone_number ? 'border-red-500' : 'border-gray-300'}`} value={formData.phone_number ?? ''} onChange={handleChange} />
                            </div>
                             {/* Error moved above form */}
                        </div>
                         {/* Preferences */}
                          <div className="flex items-center pt-2">
                            <input type="checkbox" id="notification_opt_in" name="notification_opt_in" className="h-4 w-4 md:h-5 md:w-5 text-[#00A5CF] rounded focus:ring-[#00A5CF] border-gray-300" checked={formData.preferences.notification_opt_in} onChange={handleCheckboxChange} />
                            <label htmlFor="notification_opt_in" className="ml-2 block text-sm md:text-[16px] text-gray-700 font-lato">I agree to receive notifications and updates</label>
                        </div>
                        {/* --- End Form Fields --- */}

                        {/* --- ReCAPTCHA v2 Component --- */}
                        <div className="flex justify-center pt-2"> {/* Center the captcha */}
                           <ReCAPTCHA
                                ref={recaptchaRef}
                                sitekey={siteKey} // Use the site key from env variable
                                onChange={handleCaptchaChange}
                                // Optional: Add theme, size props if needed
                                // theme="light"
                                // size="normal"
                            />
                        </div>
                        {/* --- End ReCAPTCHA --- */}

                        {/* Submit Button */}
                        <Button
                            type='submit'
                            className='w-full font-poppins py-3 md:py-4 font-semibold text-base md:text-[18px] cursor-pointer bg-[#00A5CF] hover:bg-[#008CBA] text-[#FFFFFF] disabled:opacity-50 disabled:cursor-not-allowed mt-4' // Adjusted padding/margin
                            disabled={isLoading}
                        >
                            {isLoading ? 'Signing Up...' : 'Sign Up'}
                        </Button>
                    </form>

                    {/* Login Link */}
                    <div className="text-center mt-6">
                        <p className="text-base md:text-[18px] font-lato font-normal"> {/* Adjusted size */}
                            Already have an account?{' '}
                            <Link href="/auth/login" className="text-[#00A5CF] font-medium hover:underline">Login Here</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Wrapper Component (No change needed from v3 wrapper) ---
const SignUpPage = () => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_V2_SITE_KEY; // Use the V2 Key variable name

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

    // NOTE: ReCAPTCHA v2 doesn't need the Provider wrapper component
    // Render the SignUpcomponent directly
    return <SignUp/>;
};

export default SignUpPage; // Export the wrapper