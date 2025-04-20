import Image from 'next/image'
import React from 'react'
import image from '@/assets/Rectangle 25.png'
import StarRating from '../../_components/StarRating';


const PopularVideoCard = () => {
  return (
    <div className='flex flex-col justify-between w-[280px] h-[380px] gap-4 p-8 bg-gradient-to-b from-[#00A5CF]/30 via-[#FFFFFF]/30 to-[#00A5CF]/5 text-[#003F5C] rounded-2xl'>
        <Image src={image} alt='image' height={200} width={200}/>
        <p className='font-poppins text-[18px] font-medium'>Video Title Name 1</p>
        {/* ⭐ Star Rating Component */}
        <StarRating rating={3} />
        <div className='flex justify-between items-center'>
        <p className='font-poppins text-[28px] font-bold'>$128</p>
        <p className='text-[18px] font-normal font-lato underline '><a href='#'>More Detail</a></p>
        </div>
    </div>
  )
}

export default PopularVideoCard