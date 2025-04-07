"use client";
import Image from "next/image";
import React, { useState } from "react";
import HeroImage from "@/assets/pay-per-code.png";

export default function PayPerCodeForm({ onSubmit }: { onSubmit?: (data: any) => void }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    solution: "",
    instructions: "",
    captcha: "",
    githubId: "",
    method: "github",
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
          alt="Pay Per Code Image"
          className="object-cover h-full w-full"
        />
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-3/5 flex items-center justify-center p-6 bg-white">
        <div className="bg-white p-8 rounded-lg w-full">
          <h2 className="text-2xl font-semibold mb-5">Pay Per Code Request</h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
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

            {/* Plan */}
            <div>
              <label className="font-bold text-base">
                Solution you wish to purchase*
              </label>
              <select
                title="solution"
                value={formData.solution}
                onChange={handleChange}
                required
                className="border p-2 rounded w-full font-normal text-base"
              >
                <option value="">Select Plan</option>
                <option value="basic">Basic Plan</option>
                <option value="pro">Pro Plan</option>
              </select>
            </div>

            {/* Instructions */}
            <div className="col-span-1">
              <label className="font-bold text-base">Special Instructions</label>
              <input
                title="instructions"
                value={formData.instructions}
                onChange={handleChange}
                className="border p-2 rounded w-full font-normal text-base"
              />
            </div>

            {/* Preferred method */}
            <div>
              <label className="font-bold text-base">
                Preferred method to obtain code*
              </label>
              <div className="flex gap-6 mt-2">
                {/* GitHub Radio */}
                <label className="flex items-center gap-2 font-normal text-base cursor-pointer">
                  <input
                    type="radio"
                    name="method"
                    value="github"
                    checked={formData.method === "github"}
                    onChange={handleChange}
                  />
                  GitHub
                </label>

                {/* Email Radio */}
                <label className="flex items-center gap-2 font-normal text-base cursor-pointer">
                  <input
                    type="radio"
                    name="method"
                    value="email"
                    checked={formData.method === "email"}
                    onChange={handleChange}
                  />
                  Email
                </label>
              </div>
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

            {/* GitHub ID */}
            <div>
              <label className="font-bold text-base">
                Enter your GitHub Account ID*
              </label>
              <input
                title="githubId"
                value={formData.githubId}
                onChange={handleChange}
                required={formData.method === "github"}
                className="border p-2 rounded w-full font-normal text-base"
              />
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
