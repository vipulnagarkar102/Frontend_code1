"use client";

import Image from 'next/image';
import React, { useState } from "react";
import HeroImage from '@/assets/consult.png';

type ConsultFormProps = {
  onSubmit: (formData: any) => void;
};

export default function ConsultForm({ onSubmit }: ConsultFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    urgency: "",
    instructions: "",
    captcha: "",
    githubId: "",
    method: "github",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-auto mt-26">
      {/* Left Side - Image */}
      <div className="hidden md:block w-full md:w-2/5 bg-cover bg-center">
        <Image
          src={HeroImage}
          alt="Consultation"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-3/5 flex items-center justify-center p-6 bg-[#ffffff]">
        <div className="bg-[#ffffff] p-8 rounded-lg w-full">
          <h2 className="text-2xl font-semibold mb-5">Consult Form</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="font-bold text-base">Name*</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
                className="border p-2 rounded w-full font-normal text-base"
              />
            </div>
            <div>
              <label className="font-bold text-base">Email*</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="border p-2 rounded w-full font-normal text-base"
              />
            </div>
            <div>
              <label className="font-bold text-base">Country*</label>
              <select
                title='country'
                value={formData.country}
                onChange={handleChange}
                required
                className="border p-2 rounded w-full font-normal text-base"
              >
                <option value="">Select Country</option>
                <option value="usa">USA</option>
                <option value="uk">UK</option>
                <option value="india">India</option>
              </select>
            </div>
            <div>
              <label className="font-bold text-base">Phone Number*</label>
              <input
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="Enter your phone number"
                className="border p-2 rounded w-full font-normal text-base"
              />
            </div>
            <div className="col-span-1">
              <label className="font-bold text-base">Comment</label>
              <input
                name="instructions"
                value={formData.instructions}
                onChange={handleChange}
                placeholder="Additional instructions (optional)"
                className="border p-2 rounded w-full font-normal text-base"
              />
            </div>
            <div>
              <label className="font-bold text-base">Urgency Level*</label>
              <select
                title='urgency'
                value={formData.urgency}
                onChange={handleChange}
                required
                className="border p-2 rounded w-full font-normal text-base"
              >
                <option value="">Select Option</option>
                <option value="days">Within next 2-3 days</option>
                <option value="urgent">Urgent (within 24 hours)</option>
                <option value="week">Within a week</option>
              </select>
            </div>
            <div>
              <label className="font-bold text-base">Enter Captcha*</label>
              <input
                name="captcha"
                value={formData.captcha}
                onChange={handleChange}
                required
                placeholder="Enter shown captcha"
                className="mb-2 border p-2 rounded w-full font-normal text-base"
              />
              <div className="bg-gray-200 text-center px-1 py-1 rounded-md font-normal text-base">AB12CD</div>
            </div>
            <div className="col-span-2 text-right">
              <button
                type="submit"
                className="border p-2 rounded bg-[#00A5CF] text-white transition duration-200 font-normal text-base"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
