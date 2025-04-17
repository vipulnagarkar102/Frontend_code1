import Image from 'next/image';
import Link from 'next/link';
import { RiTwitterXFill } from "react-icons/ri";
import { RiLinkedinLine  } from "react-icons/ri";
import { RiYoutubeLine } from "react-icons/ri";
import vtexlogo from '@/assets/vtexlogo .png'

const Footer = () => {

  return (
    <footer className="bottom-0 bg-[#003F5C] text-[#FFFFFF] py-4 [@media(min-width:1750px)]:p-10 sm:px-6">

      <div className="flex flex-wrap gap-10 px-4 py-2 md:px-6 justify-between">

        <div className='flex flex-col gap-8'>
            <Image
              src={vtexlogo}
              alt='Vtex.AI'
              height={80}
              width={120}
              className=''
            />
          {/* Social Media Icons */}
          <div className="flex mt-4 space-x-2 font-lato text-[18px] [@media(min-width:1750px)]:text-[24px]">
            <a title='social-links' href="https://x.com/vtex_ai" className="bg-white text-gray-800 rounded-md p-1 w-6 h-6 [@media(min-width:1750px)]:w-10 [@media(min-width:1750px)]:h-10 flex items-center justify-center hover:bg-gray-100"><RiTwitterXFill size={24} color='black' /></a>
            <a title='social-links' href="https://www.linkedin.com/company/vtex-ai/" className="bg-white text-gray-800 rounded-md p-1 w-6 h-6 [@media(min-width:1750px)]:w-10 [@media(min-width:1750px)]:h-10 flex items-center justify-center hover:bg-gray-100"><RiLinkedinLine  size={24} color='black' /></a>
            <a title='social-links' href="https://www.youtube.com/@vtex_ai"  className="bg-white text-gray-800 rounded-md p-1 w-6 h-6 [@media(min-width:1750px)]:w-10 [@media(min-width:1750px)]:h-10 flex items-center justify-center hover:bg-gray-100">
            <RiYoutubeLine  size={24} color='black' />
            </a>
          </div>
        </div>

        <div> 
          <div className="flex flex-col md:flex-row gap-6 sm:gap-4 text-[17px] sm:text-[18px] [@media(min-width:1750px)]:text-[26px] font-poppins font-semibold leading-[100%] tracking-[1%] my-4">
            <Link href='/contact-us'>
              <div className='cursor-pointer'>Contact Us</div>
            </Link>

            <Link href='/terms-and-conditions'>
              <div className='cursor-pointer'>Terms & Conditions</div>
            </Link>
          </div>
        </div>

        <div className='flex flex-col gap-6'>
          <div className="text-[20px] sm:text-[24px] [@media(min-width:1750px)]:text-[30px] font-poppins font-medium leading-[100%]">Subscribe for updates</div>

          <div>
            <div className="flex bg-[#FFFFFF] rounded-md">
              <input
                type="email"
                placeholder="Enter Email Address"
                className="text-gray-800 font-lato text-[18px] font-medium px-4 py-2 w-64 [@media(min-width:1750px)]:w-72 focus:outline-none"
              />
              <button className="bg-teal-400 cursor-pointer hover:bg-teal-500 text-white rounded-md px-4 py-2">
                →
              </button>
            </div>
          </div>
        </div>
      </div>
      

      {/* Copyright Notice */}
      <div className="border-t border-teal-700 mt-3 pt-4 text-center px-8 font-poppins font-medium text-[15px] [@media(min-width:1750px)]:text-[22px] text-[#FFFFFF]">
        © {new Date().getFullYear()} Curiouspods Learning Pvt. Ltd. All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;