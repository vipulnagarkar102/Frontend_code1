'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { id: 1, name: 'Dashboard', path: '/customer-dashboard' },
    { id: 2, name: 'Profile', path: '/customer-dashboard/my-profile' },
    { id: 3, name: 'Enrolled Courses', path: '/customer-dashboard/my-videos' },
    { id: 4, name: 'Orders', path: '/customer-dashboard/my-orders' },
    { id: 5, name: 'Reviews', path: '/customer-dashboard/my-reviews' },
    { id: 6, name: 'Pay Per Code', path: '/customer-dashboard/pay-per-code' },
    { id: 7, name: 'Buy Commercial License', path: '/customer-dashboard/commercial-license' },
    { id: 8, name: 'Consult Us', path: '/customer-dashboard/consult-us' },
    { id: 9, name: 'Settings', path: '/customer-dashboard/settings' },
  ];

  return (
    <div className="text-lg font-normal w-64 bg-[#003F5C] text-white p-5 hidden md:block h-screen fixed top-26 left-0">
      <ul>
        {menuItems.map((item) => (
          <li
            key={item.id}
            id={`menu-item-${item.id}`}
            className={`cursor-pointer hover:bg-[#064867] hover:text-[#ffffff] hover:rounded-lg p-3 ${
              pathname === item.path ? 'bg-white font-semibold text-lg text-[#003F5C] rounded-lg' : ''
            }`}
          >
            <Link href={item.path}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
