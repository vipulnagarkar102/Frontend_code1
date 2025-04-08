"use client";

import React, { useState, ChangeEvent } from "react";
import Image from "next/image";
import Sidebar from "../sidebar";

interface User {
  firstName: string;
  lastName: string;
  username: string;
  phone: string;
  skill: string;
  timezone: string;
  bio: string;
  displayName: string;
  profilePic: string;
  coverPhoto: string;
}

interface FormData extends Omit<User, 'skill' | 'timezone' | 'displayName' | 'coverPhoto'> {}

interface Passwords {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const Settings = ({ user }: { user: User }) => {
  const [activeTab, setActiveTab] = useState<"profile" | "password">("profile");
  const [formData, setFormData] = useState<FormData>({
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    phone: user.phone,
    bio: user.bio,
    profilePic: user.profilePic,
  });

  const [passwords, setPasswords] = useState<Passwords>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleProfileChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-gray-100 mt-26">
      <Sidebar />
      <div className="p-4 md:p-6 w-full ml-16 md:ml-64">
        <h2 className="text-2xl font-semibold mb-5">Settings</h2>
        <div className="flex gap-6 mt-4 border-b font-poppins text-[18px] font-medium text-[#003F5C] cursor-pointer overflow-x-auto">
          <button
            className={`pb-2 px-1 whitespace-nowrap ${
              activeTab === "profile" ? "border-b-2 border-[#00A5CF] text-[#00A5CF]" : ""
            }`}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </button>
          <button
            className={`pb-2 px-1 whitespace-nowrap ${
              activeTab === "password" ? "border-b-2 border-[#00A5CF] text-[#00A5CF]" : ""
            }`}
            onClick={() => setActiveTab("password")}
          >
            Password
          </button>
        </div>
        {activeTab === "profile" ? (
          <div className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="font-bold text-base">
                First Name
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleProfileChange}
                  className="border p-2 rounded w-full font-normal text-base mt-1"
                />
              </label>
              <label className="font-bold text-base">
                Last Name
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleProfileChange}
                  className="border p-2 rounded w-full font-normal text-base mt-1"
                />
              </label>
              <label className="font-bold text-base">
                Username
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  disabled
                  className="border p-2 rounded w-full bg-gray-100 font-normal text-base mt-1"
                />
              </label>
              <label className="font-bold text-base">
                Phone Number
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleProfileChange}
                  className="border p-2 rounded w-full font-normal text-base mt-1"
                />
              </label>
              <label className="md:col-span-2 font-bold text-base">
                Bio
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleProfileChange}
                  className="border p-2 rounded w-full font-normal text-base mt-1"
                  rows={4}
                />
              </label>
            </div>
            <button className="border p-2 rounded bg-[#00A5CF] text-white transition duration-200 font-normal text-base mt-5 px-6">
              Update Profile
            </button>
          </div>
        ) : (
          <div className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="font-bold text-base md:col-span-2">
                Current Password
                <input
                  type="password"
                  name="currentPassword"
                  value={passwords.currentPassword}
                  onChange={handlePasswordChange}
                  className="border p-2 rounded w-full font-normal text-base mt-1"
                />
              </label>
              <label className="font-bold text-base">
                New Password
                <input
                  type="password"
                  name="newPassword"
                  value={passwords.newPassword}
                  onChange={handlePasswordChange}
                  className="border p-2 rounded w-full font-normal text-base mt-1"
                />
              </label>
              <label className="font-bold text-base">
                Retype New Password
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwords.confirmPassword}
                  onChange={handlePasswordChange}
                  className="border p-2 rounded w-full font-normal text-base mt-1"
                />
              </label>
            </div>
            <button className="border p-2 rounded bg-red-600 text-white transition duration-200 font-normal text-base mt-5 px-6">
              Reset Password
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default function SettingsPage() {
  const dummyUser: User = {
    firstName: "Sajid",
    lastName: "Ali",
    username: "student",
    phone: "9876543210",
    skill: "Developer",
    timezone: "Dubai",
    bio: "I'm a student",
    displayName: "Sajid Ali",
    profilePic: "/profile-placeholder.png",
    coverPhoto: "/cover-placeholder.jpg",
  };
  return <Settings user={dummyUser} />;
}