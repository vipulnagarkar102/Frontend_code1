'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { 
  Home, 
  User, 
  Video, 
  ShoppingCart, 
  Star, 
  Code, 
  Briefcase, 
  MessageSquare, 
  Settings 
} from 'lucide-react';

const Sidebar = () => {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);

  const menuItems = [
    { id: 1, name: 'Dashboard', path: '/customer-dashboard', icon: <Home size={20} /> },
    { id: 2, name: 'Profile', path: '/customer-dashboard/my-profile', icon: <User size={20} /> },
    { id: 3, name: 'Enrolled Courses', path: '/customer-dashboard/my-videos', icon: <Video size={20} /> },
    { id: 4, name: 'Orders', path: '/customer-dashboard/my-orders', icon: <ShoppingCart size={20} /> },
    { id: 5, name: 'Reviews', path: '/customer-dashboard/my-reviews', icon: <Star size={20} /> },
    { id: 6, name: 'Pay Per Code', path: '/customer-dashboard/pay-per-code', icon: <Code size={20} /> },
    { id: 7, name: 'Buy Commercial License', path: '/customer-dashboard/commercial-license', icon: <Briefcase size={20} /> },
    { id: 8, name: 'Consult Us', path: '/customer-dashboard/consult-us', icon: <MessageSquare size={20} /> },
    { id: 9, name: 'Settings', path: '/customer-dashboard/settings', icon: <Settings size={20} /> },
  ];

  // Desktop sidebar with icons added
  const DesktopSidebar = (
    <div className="text-lg font-normal w-64 bg-[#003F5C] text-white p-4 hidden md:block h-screen fixed top-26 left-0">
      <ul>
        {menuItems.map((item) => (
          <li
            key={item.id}
            id={`menu-item-${item.id}`}
            className={`cursor-pointer my-2 hover:bg-[#064867] hover:text-[#ffffff] hover:rounded-lg p-3 ${
              pathname === item.path ? 'bg-white font-semibold text-lg text-[#003F5C] rounded-lg' : ''
            }`}
          >
            <Link href={item.path} className="flex items-center">
              <span className="mr-3">{item.icon}</span>
              <span className={item.id === 7 ? "leading-tight" : ""}>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  // Mobile sidebar with smaller icons and more compact design
  const MobileSidebar = (
    <div 
      className={`fixed top-26 left-0 h-screen bg-[#003F5C] text-white transition-all duration-300 ease-in-out z-10 block md:hidden ${
        isExpanded ? 'w-64' : 'w-16'
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <ul className="p-1">
        {menuItems.map((item) => (
          <li
            key={item.id}
            id={`menu-item-${item.id}`}
            className={`cursor-pointer my-4 hover:bg-[#064867] hover:text-[#ffffff] hover:rounded-lg p-2 mb-1 flex items-center ${
              pathname === item.path ? 'bg-white font-semibold text-[#003F5C] rounded-lg' : ''
            }`}
          >
            <Link href={item.path} className="flex items-center w-full ml-3">
              <span className="flex-shrink-0">{item.icon}</span>
              {isExpanded && (
                <span className={`pl-2 whitespace-normal ${item.id === 7 ? "text-sm leading-tight" : "text-base"}`}>
                  {item.name}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      {DesktopSidebar}
      {MobileSidebar}
    </>
  );
};

export default Sidebar;