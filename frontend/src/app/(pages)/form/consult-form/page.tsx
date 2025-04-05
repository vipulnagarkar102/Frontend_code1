"use client";
import Image from 'next/image'
import React, { useState } from "react";
import HeroImage from '@/assets/consult.png'

export default function PayPerCodeForm({ onSubmit }) {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full h-auto mt-26">
      {/* Left Side - Image */}
      <div className="hidden md:block w-full md:w-2/5 bg-cover bg-center">
        <Image
          src={HeroImage}
          alt='Hero Image'
        // Important for responsiveness
        />

      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-5/5 flex items-center justify-center p-6 bg-[#ffffff] ">
        <div className="bg-[#ffffff]  p-8 rounded-lg w-full">
          <h2 className="text-2xl font-semibold mb-5">Consult Form</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="font-bold text-base">Name*</label>
              <input name="name" value={formData.name} onChange={handleChange} required className="border p-2 rounded w-full font-normal text-base" />
            </div>
            <div>
              <label className="font-bold text-base">Email*</label>
              <input name="email" type="email" value={formData.email} onChange={handleChange} required className="border p-2 rounded w-full font-normal text-base" />
            </div>
            <div>
              <label className="font-bold text-base">Country*</label>
              <select name="country" value={formData.country} onChange={handleChange} required className="border p-2 rounded w-full font-normal text-base">
                <option value="">Select Country</option>
                <option value="usa">USA</option>
                <option value="uk">UK</option>
                <option value="india">India</option>
              </select>
            </div>
            <div>
              <label className="font-bold text-base">Phone Number*</label>
              <input name="email" type="email" value={formData.email} onChange={handleChange} required className="border p-2 rounded w-full font-normal text-base" />
            </div>
            <div className="col-span-1">
              <label className="font-bold text-base">Comment</label>
              <input name="instructions" value={formData.instructions} onChange={handleChange} className="border p-2 rounded w-full font-normal text-base" />
            </div>
            <div>
              <label className="font-bold text-base">Urgency Level*</label>
              <select name="country" value={formData.country} onChange={handleChange} required className="border p-2 rounded w-full font-normal text-base">
                <option value="">Select Option</option>
                <option value="days">Within next 2-3 days</option>
              </select>
            </div>
            <div  >
              <label className="font-bold text-base">Enter Captcha*</label>
              <input name="captcha" value={formData.captcha} onChange={handleChange} required className="mb-2 border p-2 rounded w-full font-normal text-base" />
              <div className="bg-gray-200 text-center px-1 py-1 rounded-md font-normal text-base">AB12CD</div>
            </div>
            <div className="col-span-2 text-right">
              <button className="border p-2 rounded bg-[#00A5CF] text-white transition duration-200 font-normal text-base">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
