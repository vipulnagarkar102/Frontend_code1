'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiBookOpen, FiSmartphone, FiThumbsUp, FiGrid } from 'react-icons/fi';
import Sidebar from './sidebar'

const Dashboard = () => {
  const menuItems = [
    { name: 'Dashboard', path: '/customer-dashboard' },
    { name: 'MY Profile', path: '/customer-dashboard/my-videos' },
    { name: 'My Orders', path: '/customer-dashboard/order-history' },
    { name: 'Settings', path: '/customer-dashboard/settings' },
  ];

  const stats = [
    { icon: <FiBookOpen size={24} />, count: 14, label: 'Enrolled Videos' },
    { icon: <FiSmartphone size={24} />, count: 8, label: 'Active Videos' },
    { icon: <FiThumbsUp size={24} />, count: 7, label: 'Completed Videos' },
    { icon: <FiGrid size={24} />, count: 10, label: 'Quiz Attempts' },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 mt-26 p-6 overflow-auto h-screen w-full md:ml-64">
        <h2 className="text-2xl font-bold">Welcome Back, User</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow flex items-center gap-4">
              <div className="bg-blue-500 text-white p-3 rounded-full">
                {stat.icon}
              </div>
              <div>
                <h3 className="text-2xl font-semibold">{stat.count}</h3>
                <p className="text-gray-600 ">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;



