import { Button } from '@/components/ui/button'
import { ArrowDown } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import RotateText from './RotateText'

const WatchFree = () => {
  return (
    <div className='relative'>
      {/* for small screen */}
        <div className='bg-[#00A5CF] lg:hidden'>
          <p className='font-poppins text-[32px] text-center font-semibold text-white'>START FOR FREE</p>
        </div>

      
        {/* for large screen */}
        <p className="hidden absolute lg:block -ml-44 mt-[138px] font-poppins text-[32px] text-center font-semibold text-white pt-12 pb-6 bg-[#00A5CF] transform -rotate-90 w-[400px]">
          START FOR FREE
        </p>

      <div className='lg:h-[400px] bg-[#E0F7FA] w-screen flex flex-row'>

        
        <div className='w-screen md:mx-30 flex flex-col gap-6 my-6 lg:my-0 md:flex-row items-center justify-between text-[#003F5C]'>

          <div className='flex flex-col justify-between gap-4 mx-4 bg-white px-6 py-12 border-2 rounded-[10px] border-dashed lg:w-[583px] lg:h-[334px]'>
            <p className='font-lato text-[24px]'>Predicting Fibrosis Stages in NAFLD <br/> Using Advanced AI Models</p>
            <p className='font-poppins text-[40px]'>Health Tech AI Insight</p>
            <Link href='/'>
            <Button variant='secondary' className='bg-[#00A5CF] text-white hover:text-black font-lato font-semibold text-[16px] cursor-pointer'>WATCH NOW<span className='rotate-225'><ArrowDown size={30}/></span></Button>
            </Link>
          </div>

          <div className='flex flex-col justify-between gap-4 mx-4 bg-white px-6 py-12 border-2 border-dashed lg:w-[583px] lg:h-[334px] rounded-[10px]'>
            <p className='font-lato text-[24px]'>Revolutionizing DevSecOps: AI and <br/> Generative AI in Action</p>
            <p className='font-poppins text-[40px]'>Emerging Tech Insights</p>
            <Link href='/'>
            <Button variant='secondary' className='bg-[#00A5CF] text-white hover:text-black font-lato font-semibold text-[16px] cursor-pointer'>WATCH NOW<span className='rotate-225'><ArrowDown size={30}/></span></Button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}

export default WatchFree