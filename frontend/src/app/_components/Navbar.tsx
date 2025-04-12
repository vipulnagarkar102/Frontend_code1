"use client";
import React from 'react'
import { Button } from '@/components/ui/button'
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from 'lucide-react';
import Sidebar from './Sidebar';
import vtexlogo from '@/assets/vtexlogo .png'
import Image from 'next/image';

const Navbar = () => {

  const pathname = usePathname(); // Current route path

  return (
    <div className=' border-b-1 border-[#0C5070] w-screen fixed top-8 z-50 px-8 h-[72px] bg-[#003F5C] text-white flex flex-row justify-between items-center'>
      <div>
        <div className='ml-2 md:ml-4'> 
        <Image
              src={vtexlogo}
              alt='Vtex.AI'
              height={20}
              width={65}
              className=''
            />
        </div>
      </div>

      <div className='hidden lg:flex flex-row justify-center gap-6 text-lg font-poppins'>

        <Link href='/'>
          <div className={`cursor-pointer py-1 ${pathname === '/' ? "text-teal-400 font-bold" : "text-[#FFFFFF]"
            } hover:text-teal-300 transition`}>
            Home
          </div>
        </Link>
        <Link href='/pricings'>
          <div className={`cursor-pointer py-1 ${pathname === '/pricings' ? "text-teal-400 font-bold" : "text-[#FFFFFF]"
            } hover:text-teal-300 transition`}>
            Our offerings
          </div>
        </Link>



        <Link href='/about-us'>
          <div className={`cursor-pointer py-1 ${pathname === '/about-us' ? "text-teal-400 font-bold" : "text-[#FFFFFF]"
            } hover:text-teal-300 transition`}>
            About Us
          </div>
        </Link>



        <Link href='/partners'>
          <div className={`cursor-pointer py-1 ${pathname === '/partners' ? "text-teal-400 font-bold" : "text-[#FFFFFF]"
            } hover:text-teal-300 transition`}>
            Partners
          </div>

        </Link>
        <Link href='/blogs'>
          <div className={`cursor-pointer py-1 ${pathname === '/blogs' ? "text-teal-400 font-bold" : "text-[#FFFFFF]"
            } hover:text-teal-300 transition`}>
            Blogs
          </div>
        </Link>

        {/* <Link href='/all-videos'>
          <div className={`cursor-pointer py-1 ${pathname === '/all-videos' ? "text-teal-400 font-bold" : "text-[#FFFFFF]"
            } hover:text-teal-300 transition`}>
            All Videos
          </div>
        </Link>

        <Link href='/customer-dashboard'>
          <div className={`cursor-pointer py-1 ${pathname === '/CustomerDashboard' ? "text-teal-400 font-bold" : "text-[#FFFFFF]"
            } hover:text-teal-300 transition`}>
            Dashboard
          </div>
        </Link> */}
        
        <Link href='/auth/login'>
            <div>
               <Button variant="custom" className='font-medium p-5 cursor-pointer'>LOGIN</Button>
            </div>
        </Link>
      </div>

      <div className='lg:hidden'>
        <Sidebar />
      </div>

    </div>
  )
}

export default Navbar