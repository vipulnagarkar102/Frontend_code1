import Link from 'next/link';
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bottom-0 min-w-screen bg-[#003F5C] text-[#FFFFFF] py-8 px-6">

      <div className="flex flex-wrap gap-10 p-4 px-6 justify-between">

        <div className='flex flex-col gap-8'>
          <h1 className='text-[35px] font-lato font-extrabold'>
            <span className='text-[#00A897]'>V</span>text.ai
          </h1>
          <p className="font-lato text-[18px] leading-[30px]">Empowering Professionals with<br/> AI-Driven HealthTech Solutions</p>

          {/* Social Media Icons */}
          <div className="flex mt-4 space-x-2 font-lato text-[18px]">
            <a href="https://x.com/vtex_ai" className="bg-white text-gray-800 rounded-md p-1 w-6 h-6 flex items-center justify-center hover:bg-gray-100">X</a>
            <a href="https://www.linkedin.com/company/vtex-ai/" className="bg-white text-gray-800 rounded-md p-1 w-6 h-6 flex items-center justify-center hover:bg-gray-100">in</a>
            <a href="https://www.youtube.com/@vtex_ai"  className="bg-white text-gray-800 rounded-md p-1 w-6 h-6 flex items-center justify-center hover:bg-gray-100">
              yt
            </a>
          </div>
        </div>

        <div> 
          <div className="flex flex-col md:flex-row gap-4 text-[15px] font-poppins font-semibold leading-[100%] tracking-[1%] my-4">
            <Link href='/contact-us'>
              <div className='cursor-pointer'>Contact Us</div>
            </Link>
            
            <Link href='/help-and-support'>
              <div className='cursor-pointer'>Help and Support</div>
            </Link>

            <Link href='/terms-and-conditions'>
              <div className='cursor-pointer'>Terms & Conditions</div>
            </Link>
          </div>
        </div>

        <div className='flex flex-col gap-6'>
          <div className="text-[24px] font-poppins font-medium leading-[100%]">Subscribe for updates</div>

          <div className='text-[#FFFFFF80] font-lato text-[18px] font-medium'>Subscribe to get new updates</div>

          <div>
            <div className="flex bg-[#FFFFFF] rounded-md">
              <input
                type="email"
                placeholder="Enter Email Address"
                className="text-gray-800 font-lato text-[18px] font-medium px-4 py-2 w-64 focus:outline-none"
              />
              <button className="bg-teal-400 cursor-pointer hover:bg-teal-500 text-white rounded-md px-4 py-2">
                →
              </button>
            </div>
          </div>
        </div>
      </div>
      

      {/* Copyright Notice */}
      <div className="border-t border-teal-700 mt-8 pt-4 text-right px-8 font-poppins font-medium text-[15px] text-[#FFFFFF]">
        © {currentYear} Curiouspods Learning Pvt. Ltd. All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;