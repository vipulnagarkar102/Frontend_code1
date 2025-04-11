import { Button } from '@/components/ui/button'
import { ArrowDown } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const WatchFree = () => {
  return (
    <div className='relative'>
      {/* for small screen */}
        <div className='bg-[#00A5CF] xl:hidden'>
          <p className='font-poppins text-[32px] text-center font-semibold text-white'>START FOR FREE</p>
        </div>

      
        {/* for large screen */}
        <p className="hidden absolute xl:block -ml-44 mt-[138px] font-poppins text-[32px] text-center font-semibold text-white pt-12 pb-6 bg-[#00A5CF] transform -rotate-90 w-[400px]">
          START FOR FREE
        </p>

      <div className='xl:h-[400px] bg-[#E0F7FA] max-w-screen flex flex-row'>

        
        <div className='md:pl-12 max-w-screen flex gap-6 my-6 xl:my-0 flex-wrap mx-auto items-center justify-center text-[#003F5C]'>

          <div className='flex flex-col justify-between gap-4 mx-4 bg-white px-6 py-12 border-2 rounded-[10px] border-dashed lg:w-[540] lg:h-[334px]'>
            <p className='font-lato text-[24px]'>Predicting Fibrosis Stages in NAFLD <br/> Using Advanced AI Models</p>
            <p className='font-poppins text-[40px]'>HealthTech AI Plan</p>
            <Link href='/'>
            <Button variant='secondary' className='bg-[#00A5CF] text-white hover:scale-105 duration-150 hover:bg-[#00A5CF] font-lato font-semibold text-[16px] cursor-pointer'>WATCH NOW<span className='rotate-225'><ArrowDown size={30}/></span></Button>
            </Link>
          </div>

          <div className='flex flex-col justify-between gap-4 mx-4 bg-white px-6 py-12 border-2 border-dashed lg:w-[540px] lg:h-[334px] rounded-[10px]'>
            <p className='font-lato text-[24px]'>Revolutionizing DevSecOps: AI and <br/> Generative AI in Action</p>
            <p className='font-poppins text-[40px]'>Emerging Tech Plan</p>
            <Link href='/'>
            <Button variant='secondary' className='bg-[#00A5CF] text-white hover:scale-105 duration-105 hover:bg-[#00A5CF] font-lato font-semibold text-[16px] cursor-pointer'>WATCH NOW<span className='rotate-225'><ArrowDown size={30}/></span></Button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}

export default WatchFree