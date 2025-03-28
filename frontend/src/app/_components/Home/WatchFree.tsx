import { Button } from '@/components/ui/button'
import { ArrowDown } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const WatchFree = () => {
  return (
    <div>
        <div className='bg-[#00A5CF] w-screen'>
          <p className='font-poppins text-[32px] text-center font-semibold text-white'>START FOR FREE</p>
      </div>
      <div className='mb-6 bg-[#E0F7FA] w-screen flex flex-row'>

        <div className='w-screen md:mx-30 flex flex-col gap-6 md:flex-row items-center justify-between p-12 text-[#003F5C]'>

          <div className='flex flex-col justify-between gap-4 bg-white px-6 py-12 border-2 border-dashed'>
            <p className='font-lato text-[24px]'>Predicting Fibrosis Stages in NAFLD <br/> Using Advanced AI Models</p>
            <p className='font-poppins text-[40px]'>Health Tech AI Insight</p>
            <Link href='/'>
            <Button variant='secondary' className='bg-[#00A5CF] font-lato font-semibold text-[16px] cursor-pointer'>WATCH NOW<span className='rotate-225'><ArrowDown size={30}/></span></Button>
            </Link>
          </div>

          <div className='flex flex-col justify-between gap-4 bg-white px-6 py-12 border-2 border-dashed'>
            <p className='font-lato text-[24px]'>Revolutionizing DevSecOps: AI and <br/> Generative AI in Action</p>
            <p className='font-poppins text-[40px]'>Emerging Tech Insights</p>
            <Link href='/'>
            <Button variant='secondary' className='bg-[#00A5CF] font-lato font-semibold text-[16px] cursor-pointer'>WATCH NOW<span className='rotate-225'><ArrowDown size={30}/></span></Button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}

export default WatchFree