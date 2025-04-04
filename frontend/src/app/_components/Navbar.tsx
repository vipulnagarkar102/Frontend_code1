"use client";
import React from 'react'
import { Button } from '@/components/ui/button'
import Link from "next/link";
import Image from '../../assets/vtexlogo.png';
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown} from 'lucide-react';
import Sidebar from './Sidebar';

const Navbar = () => {

  const pathname = usePathname(); // Current route path

  return (
      <div className=' border-b-1 border-[#0C5070] w-screen fixed top-8 z-50 px-8 h-[72px] bg-[#003F5C] text-[#FFFFFF] flex flex-row justify-between items-center'>
        <div>
          <h1 className='ml-4 text-[28px] font-extrabold font-lato'>
            <span className='text-[#00A897]'>V</span>text.ai
          </h1>
        </div>

        <div className='hidden md:flex flex-row justify-center gap-6 text-lg font-poppins'> 
    
        <Link href='/'>
          <div className={`cursor-pointer py-1 ${
              pathname === '/' ? "text-teal-400 font-bold" : "text-[#FFFFFF]"
            } hover:text-teal-300 transition`}>
            Home
          </div>
        </Link>
          
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger className='flex flex-row justify-center items-center border-none outline-0 cursor-pointer py-1'>
                Our Offering <span className='pl-[1px] pt-[4px] hover:text-teal-300 transition'><ChevronDown/></span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
<<<<<<< HEAD
                  <Link href = '/pay-per-code-form'><DropdownMenuItem className='cursor-pointer'>Form-1</DropdownMenuItem></Link>
                  <Link href = '/support-form'><DropdownMenuItem className='cursor-pointer'>Form-2</DropdownMenuItem></Link>
                  <Link href = '/consult-form'><DropdownMenuItem className='cursor-pointer'>Form-3</DropdownMenuItem></Link>
                  <Link href = '/license-form'><DropdownMenuItem className='cursor-pointer'>Form-4</DropdownMenuItem></Link>
                  <Link href = '/enterprise-form'><DropdownMenuItem className='cursor-pointer'>Form-5</DropdownMenuItem></Link>
                  <Link href = '/enterprise-form'><DropdownMenuItem className='cursor-pointer'>Form-6</DropdownMenuItem></Link>
=======
                  <Link href = '/form/form-1'><DropdownMenuItem className='cursor-pointer'>Form-1</DropdownMenuItem></Link>
                  <Link href = '/form/form-2'><DropdownMenuItem className='cursor-pointer'>Form-2</DropdownMenuItem></Link>
                  <Link href = '/form/form-3'><DropdownMenuItem className='cursor-pointer'>Form-3</DropdownMenuItem></Link>
                  <Link href = '/form/form-4'><DropdownMenuItem className='cursor-pointer'>Form-4</DropdownMenuItem></Link>
                  <Link href = '/form/form-5'><DropdownMenuItem className='cursor-pointer'>Form-5</DropdownMenuItem></Link>
>>>>>>> 3b8ae8d06afc3814e84c5fa72b8930461095c4d2
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <Link href='/about-us'>
            <div className={`cursor-pointer py-1 ${
              pathname === '/about-us' ? "text-teal-400 font-bold" : "text-[#FFFFFF]"
            } hover:text-teal-300 transition`}>
              About Us
            </div>
          </Link>

          <Link href='/pricings'>
            <div className={`cursor-pointer py-1 ${
              pathname === '/pricings' ? "text-teal-400 font-bold" : "text-[#FFFFFF]"
            } hover:text-teal-300 transition`}>
              Pricings
            </div>
          </Link>

          <Link href='/partners'>
            <div className={`cursor-pointer py-1 ${
              pathname === '/partners' ? "text-teal-400 font-bold" : "text-[#FFFFFF]"
            } hover:text-teal-300 transition`}>
              Partners
            </div>

          </Link>
          <Link href='/blogs'>
            <div className={`cursor-pointer py-1 ${
              pathname === '/blogs' ? "text-teal-400 font-bold" : "text-[#FFFFFF]"
            } hover:text-teal-300 transition`}>
              Blogs
            </div>
          </Link>
          <Link href='/customer-dashboard'>
            <div className={`cursor-pointer py-1 ${
              pathname === '/CustomerDashboard' ? "text-teal-400 font-bold" : "text-[#FFFFFF]"
            } hover:text-teal-300 transition`}>
              Dashboard
            </div>
          </Link>
          
          <Button variant="custom" className='font-medium p-5 cursor-pointer'>LOGIN</Button>
        </div>

        <div className='md:hidden'>
            <Sidebar/>
        </div>
        
      </div>
  )
}

export default Navbar