"use client";

import React, { useState } from "react";
import Image from "next/image";
import Sidebar from "../sidebar";

const Settings = ({ user }) => {
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    phone: user.phone,
    skill: user.skill,
    timezone: user.timezone,
    bio: user.bio,
    displayName: user.displayName,
    profilePic: user.profilePic,
    coverPhoto: user.coverPhoto,
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-gray-100 pt-26 ">
      <Sidebar />
      <div className="p-6 w-full md:ml-64">
      <h2 className="text-2xl font-semibold mb-5">Settings</h2>
        <div className="flex gap-6 mt-4 border-b font-poppins text-[18px] font-medium text-[#003F5C] cursor-pointer">
          <button
            className={`pb-2 ${
              activeTab === "profile" ? "border-b-2 border-[#00A5CF] text-[#00A5CF]" : ""
            }`}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </button>
          <button
            className={`pb-2 ${
              activeTab === "password" ? "border-b-2 border-[#00A5CF] text-[#00A5CF]" : ""
            }`}
            onClick={() => setActiveTab("password")}
          >
            Password
          </button>
        </div>
        {activeTab === "profile" ? (
          <div className="mt-6">
            {/* Profile Picture */}
            {/* <div className="relative w-32 h-32 mx-auto mb-4">
              <Image
                src={formData.profilePic}
                alt="Profile Picture"
                width={128}
                height={128}
                className="rounded-full object-cover"
              />
            </div> */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4  ">
              <label className="font-bold text-base ">
                First Name
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleProfileChange}
                  className="border p-2 rounded w-full font-normal text-base "
                />
              </label>
              <label className="font-bold text-base ">
                Last Name
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleProfileChange}
                  className="border p-2 rounded w-full font-normal text-base"
                />
              </label >
              <label className="font-bold text-base ">
                Username
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  disabled
                  className="border p-2 rounded w-full bg-gray-100 font-normal text-base"
                />
              </label>
              <label className="font-bold text-base ">
                Phone Number
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleProfileChange}
                  className="border p-2 rounded w-full font-normal text-base"
                />
              </label>
              <label className="col-span-2 font-bold text-base">
                Bio
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleProfileChange}
                  className="border p-2 rounded w-full font-normal text-base"
                />
              </label>
            </div>
            <button className="border p-2 rounded bg-[#00A5CF] text-white transition duration-200 font-normal text-base mt-5">
              Update Profile
            </button>
          </div>
        ) : (
          <div className="mt-6">
            <label>
              Current Password
              <input
                type="password"
                name="currentPassword"
                value={passwords.currentPassword}
                onChange={handlePasswordChange}
                className="border p-2 rounded w-full mb-3"
              />
            </label>
            <label>
              New Password
              <input
                type="password"
                name="newPassword"
                value={passwords.newPassword}
                onChange={handlePasswordChange}
                className="border p-2 rounded w-full mb-3"
              />
            </label>
            <label>
              Retype New Password
              <input
                type="password"
                name="confirmPassword"
                value={passwords.confirmPassword}
                onChange={handlePasswordChange}
                className="border p-2 rounded w-full mb-3"
              />
            </label>
            <button className="bg-red-600 text-white px-4 py-2 rounded">
              Reset Password
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default function SettingsPage() {
  const dummyUser = {
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