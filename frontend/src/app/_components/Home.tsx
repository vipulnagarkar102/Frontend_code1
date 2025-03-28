import Image from 'next/image'
import React from 'react'
import HeroImage from '@/assets/Hero.png'
import Offers from './Home/Offers'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import WatchFree from './Home/WatchFree'
import AiSolution from './Home/AiSolution'
import image from '@/assets/Tools.png'
import Testimonials from './Home/Testimonials'

const Home = () => {
  return(
    <div>
      <div className='relative top-[104px] inset-0 z-0 overflow-hidden h-[240px] md:h-[450px]'>
        <Image
          src={HeroImage}
          alt='Hero Image'
          width={1800}
          style={{ objectFit: 'cover' }} // Important for responsiveness
        />

        <div className="absolute top-[-100px] md:top-[-200px] lg:top-0 inset-0 flex items-center left-[8px] md:left-[32px] lg:left-[50px]">
          <div className="text-[#FFFFFF] font-lato font-extrabold text-[15px] leading-[25px] md:leading-[60px] md:text-[36px] lg:text-[50px] tracking-[2%]">
          Empowering Enterprises <br/> and Healthcare with <br/>Transformative AI Learning
          </div>
        </div>
      </div>

      {/* What We Offers */}
      <Offers/>
      
      {/* Watch Free Videos */}
      <WatchFree/>

      {/* Ai Solution */}
      <AiSolution/>

      <div className='bg-[#E0F7FA] mt-16 my-4 flex flex-col md:flex-row justify-between md:items-center px-4 md:px-8 py-6'>
        <div className='flex flex-col gap-4 text-[#003F5C] md:w-1/2'>
        <p className='font-poppins font-semibold text-[24px] md:text-[40px]'>Supported Platforms, Tools and Technologies</p>
        <p className='font-lato text-[14px] md:text-[18px]'>At Vtex.ai, our solutions are designed for seamless integration and operational efficiency, leveraging the latest technologies in AI, software development, and API-driven architectures. Each solution is built for real-world application, ensuring users can easily deploy, customize, and scale their implementations with modern development frameworks and tools.</p>
        </div>
        <Image className='h-[480px]' src={image} alt='Tools pictures'/>
      </div>

      {/* Testimonials */}
      <Testimonials/>

    </div>

  )
}

export default Home