'use client';

import React, { useEffect, useState, useRef, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ReCAPTCHA from "react-google-recaptcha";

import SignUpImg from '@/assets/pay-per-code.png'; // Adjust path if needed
import { FaEye, FaEyeSlash, FaLock, FaEnvelope, FaUser, FaCalendar, FaIndustry, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { Button } from '@/components/ui/button'; // Adjust path if needed
import { useAuthStore } from '@/store/authStore'; // Adjust path if needed
import { RegisterPayload as BaseRegisterPayload } from '@/store/authTypes'; // Adjust path if needed

type RegisterPayload = BaseRegisterPayload & { captcha?: string | null };

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

    const { register, isLoading, error: storeError, isAuthInitialized, isAuthenticated, clearError, requiresVerification } = useAuthStore();
    const router = useRouter();
    const recaptchaRef = useRef<ReCAPTCHA>(null);
    const [captchaToken, setCaptchaToken] = useState<string | null>(null); // State for v2 token

    useEffect(() => {
        if (isAuthInitialized && isAuthenticated) {
            router.push('/customer-dashboard'); // Adjust redirect path if needed
        }
    }, [isAuthenticated, isAuthInitialized, router]);

    // Clear errors when component unmounts (optional cleanup)
    useEffect(() => {
        return () => {
            clearError();
        };
    }, [clearError]);

    const [showPassword, setShowPassword] = useState(false);
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const industries = ['Hospitals & Health Systems ', 'Pharmaceutical Companies', 'Health Insurance / Payers', 'Software Development', 'EdTech', 'HealthTech', 'Others'];

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        clearError(); // Clear backend error on input change
        // Clear the specific frontend validation error for this field
        setFormErrors(prev => {
            const { [name]: _, ...rest } = prev; // Remove error for current field
            return { ...rest, captcha: prev.captcha }; // Keep captcha error if it exists
        });


        if (name.includes('.')) {
            const [parent, child] = name.split('.') as ['address', string];
            if (parent === 'address') {
                setFormData(prev => ({ ...prev, address: { ...(prev.address ?? { state: '', country: '' }), [child]: value } }));
            }
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
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
        console.log("v2 Captcha Token received:", token); // Log received token (string or null)

        setCaptchaToken(token); // Update the state with the token or null

        if (token) {
            // If we get a valid token, clear any previous CAPTCHA validation error
            setFormErrors(prev => ({ ...prev, captcha: '' }));
        } else {
            // If token is null, it means the CAPTCHA was either expired or reset by the user
            console.log("v2 Captcha expired or challenge reset by user/widget.");
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        clearError(); // Clear previous backend errors
        setFormErrors({}); // Clear previous frontend validation errors

        // --- Frontend Validation ---
        const newErrors: Record<string, string> = {};
        if (!formData.first_name.trim()) newErrors.first_name = 'First name is required';
        if (!formData.last_name.trim()) newErrors.last_name = 'Last name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
        if (!formData.industry) newErrors.industry = 'Industry is required';
        if (formData.address?.country && formData.address.country.trim().length > 0 && formData.address.country.trim().length !== 2) {
            newErrors['address.country'] = 'Country must be a 2-letter code (e.g., US)';
        }

        if (!captchaToken) {
            newErrors.captcha = 'Please complete the CAPTCHA verification.';
        }


        if (Object.keys(newErrors).length > 0) {
            setFormErrors(newErrors);

            if (!newErrors.captcha && captchaToken && recaptchaRef.current) {
                console.log("Resetting CAPTCHA due to other form errors.");
                recaptchaRef.current.reset();
                setCaptchaToken(null); // Clear the stale token state
            }
            return; // Stop submission
        }
        // --- End Frontend Validation ---

        // Prepare payload - At this point, captchaToken is guaranteed to be a non-null string
        const payload: RegisterPayload = {
            first_name: formData.first_name.trim(),
            last_name: formData.last_name.trim(),
            DoB: formData.DoB || null,
            industry: formData.industry && industries.includes(formData.industry) ? formData.industry : undefined,
            email: formData.email.trim(),
            password: formData.password,
            phone_number: formData.phone_number?.trim() || null,
            address: {
                state: formData.address?.state?.trim() || null,
                country: formData.address?.country?.trim().toUpperCase() || null,
            },
            preferences: {
                notification_opt_in: formData.preferences.notification_opt_in
            },
            captcha: captchaToken as string // Pass the validated v2 token
        };

        try {
            await register(payload); // Call store action

            const state = useAuthStore.getState(); // Get latest state after async call
            if (state.requiresVerification && state.userIdForVerification) {
                console.log('Registration successful, redirecting to verification...');
                router.push('/auth/verify-email');
            } else if (!state.error) {
                console.warn("Registration succeeded but verification flag not set or userId missing. Redirecting to login.");
                router.push('/auth/login'); // Fallback
            }
            // If state.error exists, the catch block below will handle it

        } catch (err: any) {
            console.error("Registration failed in component:", err);
            // Reset ReCAPTCHA v2 on ANY backend submission failure.
            if (recaptchaRef.current) {
                recaptchaRef.current.reset();
                setCaptchaToken(null); // Clear the token state
            }
            // The error message should be set in the store by the `register` action's catch block.
            // We can optionally add a specific form error if the backend error is CAPTCHA-related.
            if (err.message && (err.message.toLowerCase().includes('captcha') || err.message.toLowerCase().includes('recaptcha'))) {
                setFormErrors(prev => ({ ...prev, captcha: `CAPTCHA Error: ${err.message}` }));
            }
            // The general error display section below will show the storeError
        }
    };

    // --- Get V2 Site Key ---
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_V2_SITE_KEY;
    if (!siteKey) {
        console.error("ReCAPTCHA v2 Site Key not found in env variables (NEXT_PUBLIC_RECAPTCHA_V2_SITE_KEY)");
        return <div className='p-4 text-red-600 text-center min-h-screen flex items-center justify-center'>ReCAPTCHA configuration error. Cannot display form.</div>;
    }

    // --- Render Form ---
    return (
        <div className="flex min-h-screen w-full flex-col lg:flex-row text-[#003F5C]">
            {/* Left side Image */}
            <div className="hidden lg:block lg:w-[40%] flex-shrink-0">
                <div className="h-full w-full relative">
                    <Image src={SignUpImg} alt="Sign Up" layout="fill" objectFit="cover" priority />
                </div>
            </div>

            {/* Right side Form */}
            <div className="w-full lg:w-[60%] flex items-center justify-center p-4 md:p-6 mt-[72px] lg:mt-0">
                <div className="w-full max-w-[600px] bg-white rounded-xl shadow-lg p-6 md:p-8">
                    <div className="mb-6 md:mb-8">
                        <h1 className="text-3xl md:text-[40px] font-bold text-center font-poppins">Create an Account 🚀</h1>
                    </div>

                    {/* Display Combined Errors Area */}
                    {(storeError || Object.keys(formErrors).length > 0) && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-400 rounded text-sm space-y-1">
                            {/* Display backend error from store (if not handled by specific form error) */}
                            {storeError && !formErrors.captcha && <p>{storeError}</p>}
                            {/* Display frontend validation errors */}
                            {Object.entries(formErrors).map(([key, error]) => (
                                error && <p key={key}>{error}</p> // Display specific field errors
                            ))}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                        {/* --- Form Fields (No changes here) --- */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* First Name */}
                            <div>
                                <label htmlFor="first_name" className="block text-sm md:text-[16px] text-gray-700 font-lato font-bold mb-1">First Name*</label>
                                <div className="relative">
                                    <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    <input type="text" id="first_name" name="first_name" placeholder="John" className={`w-full text-sm md:text-base pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A5CF] ${formErrors.first_name ? 'border-red-500' : 'border-gray-300'}`} value={formData.first_name} onChange={handleChange} required />
                                </div>
                            </div>
                            {/* Last Name */}
                            <div>
                                <label htmlFor="last_name" className="block text-sm md:text-[16px] text-gray-700 font-lato font-bold mb-1">Last Name*</label>
                                <div className="relative">
                                    <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    <input type="text" id="last_name" name="last_name" placeholder="Doe" className={`w-full text-sm md:text-base pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A5CF] ${formErrors.last_name ? 'border-red-500' : 'border-gray-300'}`} value={formData.last_name} onChange={handleChange} required />
                                </div>
                            </div>
                        </div>
                        {/* DoB */}
                        <div>
                            <label htmlFor="DoB" className="block text-sm md:text-[16px] text-gray-700 font-lato font-bold mb-1">Date of Birth</label>
                            <div className="relative">
                                <FaCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                                <input type="date" id="DoB" name="DoB" className={`w-full text-sm md:text-base pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A5CF] text-gray-500 ${formErrors.DoB ? 'border-red-500' : 'border-gray-300'}`} value={formData.DoB ?? ''} onChange={handleChange} />
                            </div>
                        </div>
                        {/* Industry */}
                        <div>
                            <label htmlFor="industry" className="block text-sm md:text-[16px] text-gray-700 font-lato font-bold mb-1">Industry*</label>
                            <div className="relative">
                                <FaIndustry className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                                <select id="industry" name="industry" className={`w-full text-sm md:text-base pl-10 pr-8 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A5CF] bg-white appearance-none ${formErrors.industry ? 'border-red-500' : 'border-gray-300'} ${!formData.industry ? 'text-gray-500' : ''}`} value={formData.industry} onChange={handleChange} required>
                                    <option value="" disabled>Select your industry</option>
                                    {industries.map((industry) => (<option key={industry} value={industry}>{industry}</option>))}
                                </select>
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        {/* Address Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="address.state" className="block text-sm md:text-[16px] text-gray-700 font-lato font-bold mb-1">State</label>
                                <div className="relative">
                                    <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    <input type="text" id="address.state" name="address.state" placeholder="California" className={`w-full text-sm md:text-base pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A5CF] ${formErrors['address.state'] ? 'border-red-500' : 'border-gray-300'}`} value={formData.address?.state ?? ''} onChange={handleChange} />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="address.country" className="block text-sm md:text-[16px] text-gray-700 font-lato font-bold mb-1">Country (2-letter code)</label>
                                <div className="relative">
                                    <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    <input type="text" id="address.country" name="address.country" placeholder="US" maxLength={2} className={`w-full text-sm md:text-base pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A5CF] uppercase ${formErrors['address.country'] ? 'border-red-500' : 'border-gray-300'}`} value={formData.address?.country ?? ''} onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm md:text-[16px] text-gray-700 font-lato font-bold mb-1">Email Address*</label>
                            <div className="relative">
                                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                                <input type="email" id="email" name="email" placeholder="your@email.com" className={`w-full text-sm md:text-base pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A5CF] ${formErrors.email ? 'border-red-500' : 'border-gray-300'}`} value={formData.email} onChange={handleChange} required />
                            </div>
                        </div>
                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm md:text-[16px] text-gray-700 font-lato font-bold mb-1">Password*</label>
                            <div className="relative">
                                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                                <input type={showPassword ? "text" : "password"} id="password" name="password" placeholder="••••••••" className={`w-full text-sm md:text-base pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A5CF] ${formErrors.password ? 'border-red-500' : 'border-gray-300'}`} value={formData.password} onChange={handleChange} required />
                                <button type="button" aria-label={showPassword ? "Hide password" : "Show password"} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>
                        {/* Phone */}
                        <div>
                            <label htmlFor="phone_number" className="block text-sm md:text-[16px] text-gray-700 font-lato font-bold mb-1">Phone Number</label>
                            <div className="relative">
                                <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                                <input type="tel" id="phone_number" name="phone_number" placeholder="+12095178912" className={`w-full text-sm md:text-base pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A5CF] ${formErrors.phone_number ? 'border-red-500' : 'border-gray-300'}`} value={formData.phone_number ?? ''} onChange={handleChange} />
                            </div>
                        </div>
                        {/* Preferences */}
                        {/* <div className="flex items-center pt-2">
                            <input type="checkbox" id="notification_opt_in" name="notification_opt_in" className="h-4 w-4 md:h-5 md:w-5 text-[#00A5CF] rounded focus:ring-[#00A5CF] border-gray-300" checked={formData.preferences.notification_opt_in} onChange={handleCheckboxChange} />
                            <label htmlFor="notification_opt_in" className="ml-2 block text-sm md:text-[16px] text-gray-700 font-lato">I agree to the Terms and Conditions </label>
                        </div> */}
                        <div className="flex items-center pt-2">
                            <input
                                type="checkbox"
                                id="notification_opt_in"
                                name="notification_opt_in"
                                className="h-4 w-4 md:h-5 md:w-5 text-[#00A5CF] rounded focus:ring-[#00A5CF] border-gray-300"
                                checked={formData.preferences.notification_opt_in}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor="notification_opt_in" className="ml-2 block text-sm md:text-[16px] text-gray-700 font-lato">
                                I agree to the{" "}
                                <a
                                    href="/terms-and-conditions" // Replace with your actual terms page URL
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#00A5CF] underline hover:text-[#007ba1]"
                                >
                                    Terms and Conditions
                                </a>
                            </label>
                        </div>

                        {/* --- End Form Fields --- */}

                        {/* --- ReCAPTCHA v2 Component --- */}
                        <div className="flex justify-center pt-2">
                            <ReCAPTCHA
                                ref={recaptchaRef}
                                sitekey={siteKey} // Your V2 Site Key
                                onChange={handleCaptchaChange} // Calls handler with token or null
                            />
                        </div>
                        {/* The error message for captcha ('Please complete...') will appear in the main error area above if validation fails */}
                        {/* --- End ReCAPTCHA v2 --- */}

                        {/* Submit Button */}
                        <Button
                            type='submit'
                            className='w-full font-poppins py-3 md:py-4 mt-4 font-semibold text-base md:text-[18px] cursor-pointer bg-[#00A5CF] hover:bg-[#008CBA] text-[#FFFFFF] disabled:opacity-50 disabled:cursor-not-allowed'
                            disabled={isLoading}
                        >
                            {isLoading ? 'Signing Up...' : 'Sign Up'}
                        </Button>
                    </form>

                    {/* Login Link */}
                    <div className="text-center mt-6">
                        <p className="text-base md:text-[18px] font-lato font-normal">
                            Already have an account?{' '}
                            <Link href="/auth/login" className="text-[#00A5CF] font-medium hover:underline">Login Here</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Wrapper Component (Checks for Site Key) ---
const SignUpPage = () => {
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
    return <SignUp />; // Render the main component
};

export default SignUpPage;