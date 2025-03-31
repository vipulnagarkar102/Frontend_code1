'use client';

import Link from 'next/link';

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', path: '/customer-dashboard' },
    { name: 'Profile', path: '/profile' },
    { name: 'Enrolled Courses', path: '/customer-dashboard/my-videos' },
    { name: 'Orders', path: '/customer-dashboard/order-history' },
    { name: 'Settings', path: '/customer-dashboard/settings' },
  ];

  return (
    <div className="text-lg font-normal w-64 bg-[#003F5C] text-white p-5 hidden md:block h-screen fixed top-26 left-0">
      <ul>
        {menuItems.map((item, index) => (
          <li key={index} className={`hover:bg-[#064867] hover:text-[#ffffff] hover:rounded-lg p-3 ${index === 0 ? 'bg-white font-semibold text-lg text-[#003F5C] rounded-lg' : ''}`}>
            <Link href={item.path}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
