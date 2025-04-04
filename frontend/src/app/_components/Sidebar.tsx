import { Button } from '@/components/ui/button';
import { ChevronDown, MenuIcon, X } from 'lucide-react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const Sidebar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showOfferingItems, setShowOfferingItems] = useState(false);

  // Lock scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setShowOfferingItems(false); // Reset offering items when menu closes
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleOfferingItems = () => {
    setShowOfferingItems(!showOfferingItems);
  };

  return (
    <div className='font-poppins'>
      <div className='md:hidden flex items-center'>
        <button
          onClick={toggleMenu}
          className='text-white cursor-pointer hover:text-teal-300 transition  focus:outline-none'
          aria-label='Toggle menu'
        >
          {isMenuOpen ? <X size={30} /> : <MenuIcon size={30} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className='md:hidden absolute top-[73px] h-[90vh] left-0 right-0 bg-[#04293a] z-50 flex flex-col justify-between py-10 gap-4 text-[20px] overflow-y-auto transition-all 
        duration-300 
        ease-out'>
          
          <Link href='/' onClick={toggleMenu}>
            <div className={`cursor-pointer pl-6 ${
                pathname === '/' ? "text-teal-400 font-bold" : "text-[#FFFFFF]"
              } hover:text-teal-300 transition`}>
              Home
            </div>
          </Link>
          
          <div className='w-full border border-[#FFFFFF80]'></div>
            
          <div className='flex flex-col pl-6'>
            <div 
              onClick={toggleOfferingItems}
              className={`cursor-pointer py-1 flex items-center ${
                pathname.startsWith('/offering') ? "text-teal-400 font-bold" : "text-[#FFFFFF]"
              } transition`}
            >
              Our Offering
              <span className={`ml-2 transition-transform ${showOfferingItems ? 'rotate-180' : ''}`}>
                <ChevronDown size={20} />
              </span>
            </div>
            
            {showOfferingItems && (
              <div className='flex flex-col pl-6 mt-2 gap-1'>
                <Link href='/form/form-1' onClick={toggleMenu} className={`cursor-pointer py-1 ${
                  pathname === '/form-1' ? "text-teal-400 font-bold" : "text-[#bab4b4e6]"
                } hover:text-teal-300 transition`}>
                  Form-1
                </Link>

                <Link href='/form/form-2' onClick={toggleMenu} className={`cursor-pointer py-1 ${
                  pathname === '/form-2' ? "text-teal-400 font-bold" : "text-[#bab4b4e6]"
                } hover:text-teal-300 transition`}>
                  Form-2
                </Link>
                <Link href='/form/form-3' onClick={toggleMenu} className={`cursor-pointer py-1 ${
                  pathname === '/form-3' ? "text-teal-400 font-bold" : "text-[#bab4b4e6]"
                } hover:text-teal-300 transition`}>
                  Form-3
                </Link>
                <Link href='/form/form-4' onClick={toggleMenu} className={`cursor-pointer py-1 ${
                  pathname === '/form-4' ? "text-teal-400 font-bold" : "text-[#bab4b4e6]"
                } hover:text-teal-300 transition`}>
                  Form-4
                </Link>
                <Link href='/form/form-5' onClick={toggleMenu} className={`cursor-pointer py-1 ${
                  pathname === '/form-5' ? "text-teal-400 font-bold" : "text-[#bab4b4e6]"
                } hover:text-teal-300 transition`}>
                  Form-5
                </Link>
              </div>
            )}
          </div>
          
          <div className='w-full border border-[#FFFFFF80]'></div>

          <Link href='/about-us' onClick={toggleMenu}>
            <div className={`cursor-pointer py-1 pl-6 ${
              pathname === '/about-us' ? "text-teal-400 font-bold" : "text-[#FFFFFF]"
            } hover:text-teal-300 transition`}>
              About Us
            </div>
          </Link>

          <div className='w-full border border-[#FFFFFF80]'></div>

          <Link href='/pricings' onClick={toggleMenu}>
            <div className={`cursor-pointer py-1 pl-6 ${
              pathname === '/pricings' ? "text-teal-400 font-bold" : "text-[#FFFFFF]"
            } hover:text-teal-300 transition`}>
              Pricings
            </div>
          </Link>

          <div className='w-full border border-[#FFFFFF80]'></div>

          <Link href='/partners' onClick={toggleMenu}>
            <div className={`cursor-pointer py-1 pl-6 ${
              pathname === '/partners' ? "text-teal-400 font-bold" : "text-[#FFFFFF]"
            } hover:text-teal-300 transition`}>
              Partners
            </div>
          </Link>

          <div className='w-full border border-[#FFFFFF80]'></div>
          
          <Link href='/blogs' onClick={toggleMenu}>
            <div className={`cursor-pointer py-1 pl-6 ${
              pathname === '/blogs' ? "text-teal-400 font-bold" : "text-[#FFFFFF]"
            } hover:text-teal-300 transition`}>
              Blogs
            </div>
          </Link>

          <div className='w-full border border-[#FFFFFF80]'></div>

          <Link href='/customer-dashboard' onClick={toggleMenu}>
            <div className={`cursor-pointer py-1 pl-6 ${
              pathname === '/blogs' ? "text-teal-400 font-bold" : "text-[#FFFFFF]"
            } hover:text-teal-300 transition`}>
              Dashboard
            </div>
          </Link>

          <div className='w-full border border-[#FFFFFF80]'></div>
          
          <div className='pl-6 py-1'>
            <Button variant="custom" className='font-medium cursor-pointer w-fit text-[20px] p-5 mb-12'>LOGIN</Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Sidebar