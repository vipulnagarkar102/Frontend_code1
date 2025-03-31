'use client';

import Link from 'next/link';

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', path: '/' },
    { name: 'MY Profile', path: '/my-profile' },
    { name: 'Enrolled Courses', path: '/myvideos' },
    { name: 'My Orders', path: '/order-history' },
    { name: 'Settings', path: '/settings' },
  ];

  return (
    <div className="w-64 bg-blue-900 text-white p-5 hidden md:block h-screen fixed top-0 left-0">
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
