import Image from 'next/image'
import React from 'react'
import image from '@/assets/Rectangle 25.png'

const WorksCard = () => {
  return (
    <div className='flex flex-col w-[280px] h-[300px] gap-4 p-8 bg-gradient-to-b from-[#00A5CF]/30 via-[#FFFFFF]/30 to-[#00A5CF]/5 text-[#003F5C] rounded-2xl'>
        <Image src={image} alt='image' height={200} width={200}/>
        <p className='font-poppins text-[18px] font-medium'>Video Title Name 1</p>
        <p className='font-lato font-normal md:font-semibold text-[16px] bg-[#00A897] rounded-2xl py-1 px-3 text-center w-fit text-[#FFFFFF]'>Emerging Tech Insights</p>
        
    </div>
  )
}

export default WorksCard