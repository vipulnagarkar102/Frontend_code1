import { Button } from '@/components/ui/button';
import { ChevronDown, MenuIcon, X } from 'lucide-react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const Sidebar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showHelpSupportItems, setShowHelpSupportItems] = useState(false);

  // Lock scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setShowHelpSupportItems(false); // Reset when menu closes
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleHelpSupportItems = () => {
    setShowHelpSupportItems(!showHelpSupportItems);
  };

  return (
    <div className='font-poppins'>
      <div className='lg:hidden flex items-center'>
        <button
          onClick={toggleMenu}
          className='text-white cursor-pointer hover:text-teal-300 transition focus:outline-none'
          aria-label='Toggle menu'
        >
          {isMenuOpen ? <X size={30} /> : <MenuIcon size={30} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className='lg:hidden absolute top-[73px] h-[90vh] left-0 right-0 bg-[#04293a] z-50 flex flex-col justify-between py-10 gap-4 text-[20px] overflow-y-auto transition-all duration-300 ease-in-out'>
          
          <Link href='/' onClick={toggleMenu}>
            <div className={`cursor-pointer pl-6 ${
                pathname === '/' ? "text-teal-400 font-bold" : "text-[#FFFFFF]"
              } hover:text-teal-300 transition`}>
              Home
            </div>
          </Link>
          
          <div className='w-full border border-[#FFFFFF80]'></div>
          
          <Link href='/pricings' onClick={toggleMenu}>
            <div className={`cursor-pointer py-1 pl-6 ${
              pathname === '/pricings' ? "text-teal-400 font-bold" : "text-[#FFFFFF]"
            } hover:text-teal-300 transition`}>
              Our offerings
            </div>
          </Link>

          <div className='w-full border border-[#FFFFFF80]'></div>

          <Link href='/about-us' onClick={toggleMenu}>
            <div className={`cursor-pointer py-1 pl-6 ${
              pathname === '/about-us' ? "text-teal-400 font-bold" : "text-[#FFFFFF]"
            } hover:text-teal-300 transition`}>
              About Us
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
          
          {/* <div className='flex flex-col pl-6'>
            <div 
              onClick={toggleHelpSupportItems}
              className={`cursor-pointer py-1 flex items-center ${
                pathname.startsWith('/form') ? "text-teal-400 font-bold" : "text-[#FFFFFF]"
              } transition`}
            >
              Contact Us
              <span className={`ml-2 transition-transform ${showHelpSupportItems ? 'rotate-180' : ''}`}>
                <ChevronDown size={20} />
              </span>
            </div>
            
            {showHelpSupportItems && (
              <div className='flex flex-col pl-6 mt-2 gap-1'>
                <Link href='/form/pay-per-code-form' onClick={toggleMenu} className={`cursor-pointer py-1 ${
                  pathname === '/form/pay-per-code-form' ? "text-teal-400 font-bold" : "text-[#bab4b4e6]"
                } hover:text-teal-300 transition`}>
                  Pay per code
                </Link>

                <Link href='/form/support-form' onClick={toggleMenu} className={`cursor-pointer py-1 ${
                  pathname === '/form/support-form' ? "text-teal-400 font-bold" : "text-[#bab4b4e6]"
                } hover:text-teal-300 transition`}>
                  Support
                </Link>
                <Link href='/form/consult-form' onClick={toggleMenu} className={`cursor-pointer py-1 ${
                  pathname === '/form/consult-form' ? "text-teal-400 font-bold" : "text-[#bab4b4e6]"
                } hover:text-teal-300 transition`}>
                  Consult
                </Link>
                <Link href='/form/license-form' onClick={toggleMenu} className={`cursor-pointer py-1 ${
                  pathname === '/form/license-form' ? "text-teal-400 font-bold" : "text-[#bab4b4e6]"
                } hover:text-teal-300 transition`}>
                  License
                </Link>
                <Link href='/form/enterprise-form' onClick={toggleMenu} className={`cursor-pointer py-1 ${
                  pathname === '/form/enterprise-form' ? "text-teal-400 font-bold" : "text-[#bab4b4e6]"
                } hover:text-teal-300 transition`}>
                  Enterprise
                </Link>
              </div>
            )}
          </div>
          
          <div className='w-full border border-[#FFFFFF80]'></div> */}
          
          {/* <Link href='/all-videos' onClick={toggleMenu}>
            <div className={`cursor-pointer py-1 pl-6 ${
              pathname === '/all-videos' ? "text-teal-400 font-bold" : "text-[#FFFFFF]"
            } hover:text-teal-300 transition`}>
              All Videos
            </div>
          </Link> */}

          {/* <div className='w-full border border-[#FFFFFF80]'></div> */}

          {/* <Link href='/customer-dashboard' onClick={toggleMenu}>
            <div className={`cursor-pointer py-1 pl-6 ${
              pathname === '/customer-dashboard' ? "text-teal-400 font-bold" : "text-[#FFFFFF]"
            } hover:text-teal-300 transition`}>
              Dashboard
            </div>
          </Link> */}

          {/* <div className='w-full border border-[#FFFFFF80]'></div> */}
          
          <div className='pl-6 py-1'>
            <Button variant="custom" className='font-medium cursor-pointer w-fit text-[20px] p-5 mb-12'>LOGIN</Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Sidebar