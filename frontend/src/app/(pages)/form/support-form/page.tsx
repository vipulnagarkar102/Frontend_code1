"use client";
import Image from "next/image";
import React, { useState } from "react";
import HeroImage from "@/assets/support.png";

type FormData = {
  name: string;
  email: string;
  phone: string;
  country: string;
  instructions: string;
  captcha: string;
  githubId: string;
  method: string;
  urgency: string;
};

export default function PayPerCodeForm({ onSubmit }: { onSubmit?: (data: FormData) => void }) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    country: "",
    instructions: "",
    captcha: "",
    githubId: "",
    method: "github",
    urgency: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
  };

  return (
    <div className="flex flex-col md:flex-row w-full mt-26">
      {/* Left Side - Image */}
      <div className="hidden md:block md:w-2/5">
        <Image
          src={HeroImage}
          alt="Support Image"
          className="object-cover h-full w-full"
        />
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-3/5 flex items-center justify-center p-6 bg-white">
        <div className="bg-white p-8 rounded-lg w-full">
          <h2 className="text-2xl font-semibold mb-5">Support Request</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="font-bold text-base">Name*</label>
              <input
                title="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="border p-2 rounded w-full font-normal text-base"
              />
            </div>

            {/* Email */}
            <div>
              <label className="font-bold text-base">Email*</label>
              <input
                title="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="border p-2 rounded w-full font-normal text-base"
              />
            </div>

            {/* Country */}
            <div>
              <label className="font-bold text-base">Country*</label>
              <select
                title="country"
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

            {/* Phone Number */}
            <div>
              <label className="font-bold text-base">Phone Number*</label>
              <input
                title="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
                className="border p-2 rounded w-full font-normal text-base"
              />
            </div>

            {/* Comment */}
            <div className="col-span-1">
              <label className="font-bold text-base">Comment</label>
              <input
                title="instructions"
                value={formData.instructions}
                onChange={handleChange}
                className="border p-2 rounded w-full font-normal text-base"
              />
            </div>

            {/* Active User */}
            <div>
              <label className="font-bold text-base">Are you an active user?*</label>
              <div className="flex gap-6 mt-2">
                <label className="flex items-center gap-2 font-normal text-base cursor-pointer">
                  <input
                    type="radio"
                    name="method"
                    value="github"
                    checked={formData.method === "github"}
                    onChange={handleChange}
                  />
                  Yes
                </label>
                <label className="flex items-center gap-2 font-normal text-base cursor-pointer">
                  <input
                    type="radio"
                    name="method"
                    value="email"
                    checked={formData.method === "email"}
                    onChange={handleChange}
                  />
                  No
                </label>
              </div>
            </div>

            {/* Urgency */}
            <div>
              <label className="font-bold text-base">Urgency Level*</label>
              <select
                title="urgency"
                value={formData.urgency}
                onChange={handleChange}
                required
                className="border p-2 rounded w-full font-normal text-base"
              >
                <option value="">Select Option</option>
                <option value="days">Within next 2–3 days</option>
                <option value="urgent">ASAP (Urgent)</option>
              </select>
            </div>

            {/* Captcha */}
            <div>
              <label className="font-bold text-base">Enter Captcha*</label>
              <input
                title="captcha"
                value={formData.captcha}
                onChange={handleChange}
                required
                className="mb-2 border p-2 rounded w-full font-normal text-base"
              />
              <div className="bg-gray-200 text-center px-1 py-1 rounded-md font-normal text-base">
                AB12CD
              </div>
            </div>

            {/* Submit */}
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
