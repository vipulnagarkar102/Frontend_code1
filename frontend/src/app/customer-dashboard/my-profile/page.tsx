'use client';

import React from 'react';
import Sidebar from '../sidebar'

const Profile = () => {
  // Dummy user data
  const user = {
    registrationDate: 'February 22, 2022 9:53 am',
    firstName: 'Vipul',
    lastName: 'Nagarkar',
    username: 'VipulN',
    email: 'vipulnagarkar@gmail.com',
    phoneNumber: '+91 8565478569',
    occupation: 'Frontend Dev',
    company: 'Company',
    country: 'USA',
    github: 'URL here'
  };

  return (
    <div className="flex min-h-screen w-full bg-gray-100 ">
      <Sidebar />
      <div className="flex-1 mt-26 p-6 overflow-auto h-screen w-full ml-16 md:ml-64 ">
      <h2 className="text-2xl font-semibold mb-5">My Profile</h2>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="font-medium cursor-pointer text-lg text-[#003F5C]">Registration Date:</div>
          <div className="font-medium cursor-pointer text-lg text-[#003F5C]/70">{user.registrationDate}</div>
          
          <div className="font-medium cursor-pointer text-lg text-[#003F5C]">First Name:</div>
          <div className="font-medium cursor-pointer text-lg text-[#003F5C]/70">{user.firstName}</div>
          
          <div className="font-medium cursor-pointer text-lg text-[#003F5C]">Last Name:</div>
          <div className="font-medium cursor-pointer text-lg text-[#003F5C]/70">{user.lastName}</div>
          
          <div className="font-medium cursor-pointer text-lg text-[#003F5C]">Username:</div>
          <div className="font-medium cursor-pointer text-lg text-[#003F5C]/70">{user.username}</div>
          
          <div className="font-medium cursor-pointer text-lg text-[#003F5C]">Email:</div>
          <div className="font-medium cursor-pointer text-lg text-[#003F5C]/70">{user.email}</div>
          
          <div className="font-medium cursor-pointer text-lg text-[#003F5C]">Phone Number:</div>
          <div className="font-medium cursor-pointer text-lg text-[#003F5C]/70">{user.phoneNumber}</div>

          <div className="font-medium cursor-pointer text-lg text-[#003F5C]">Country:</div>
          <div className="font-medium cursor-pointer text-lg text-[#003F5C]/70">{user.country}</div>
          
          <div className="font-medium cursor-pointer text-lg text-[#003F5C]">Skill/Occupation:</div>
          <div className="font-medium cursor-pointer text-lg text-[#003F5C]/70">{user.occupation}</div>
          
          <div className="font-medium cursor-pointer text-lg text-[#003F5C]">Company:</div>
          <div className="font-medium cursor-pointer text-lg text-[#003F5C]/70">{user.company}</div>

          <div className="font-medium cursor-pointer text-lg text-[#003F5C]">Github:</div>
          <div className="font-medium cursor-pointer text-lg text-[#003F5C]/70">{user.github}</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
