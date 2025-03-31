'use client';

import Link from 'next/link';

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', path: '/customer-dashboard' },
    { name: 'MY Profile', path: '/customer-dashboard/my-videos' },
    { name: 'My Orders', path: '/customer-dashboard/order-history' },
    { name: 'Settings', path: '/customer-dashboard/settings' },
  ];

  return (
    <div className="w-64 bg-blue-900 text-white p-5 hidden md:block h-screen fixed top-26 left-0">
      <ul>
        {menuItems.map((item, index) => (
          <li key={index} className={`p-3 ${index === 0 ? 'bg-white text-blue-900 rounded-lg' : ''}`}>
            <Link href={item.path}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
