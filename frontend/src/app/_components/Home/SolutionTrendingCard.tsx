import Image from 'next/image'
import React from 'react'
import image from '@/assets/Rectangle 25.png'

const TrendingCard = () => {
  return (
    <div className='flex flex-col w-[280px] h-[300px] [@media(min-width:1750px)]:w-[380px] [@media(min-width:1750px)]:h-[400px] gap-4 p-8 bg-gradient-to-b from-[#00A5CF]/30 via-[#FFFFFF]/30 to-[#00A5CF]/5 text-[#003F5C] rounded-2xl'>
        <Image src={image} alt='image' sizes='(max-width: 1280px) 200px, (max-width: 1750px) 300px'/>
        <p className='font-poppins text-[18px] font-medium'>Video Title Name 1</p>
        <p className='font-lato font-normal md:font-semibold text-[16px] bg-[#00A897] rounded-2xl py-1 px-3 text-center w-fit text-[#FFFFFF]'>Date: 01-Feb-2025</p>
    </div>
  )
}

export default TrendingCard