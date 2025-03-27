import Image from 'next/image'
import React from 'react'
import image from '@/assets/Rectangle 25.png'

const TrendingCard = () => {
  return (
    <div className='flex flex-col w-[300px] h-[300px] gap-4 p-8 bg-[#efe3d1] text-[#003F5C] rounded-2xl'>
        <Image src={image} alt='image' height={200} width={200}/>
        <p className='font-poppins text-[18px] font-medium'>Video Title Name 1</p>
        <p className='font-lato font-semibold text-[16px] bg-[#00A897] rounded-2xl py-1 px-3 text-center w-fit text-[#FFFFFF]'>Date: 01-Feb-2025</p>
    </div>
  )
}

export default TrendingCard