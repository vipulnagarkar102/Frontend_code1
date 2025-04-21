import Image from 'next/image'
import React from 'react'
import BlogImage from '@/assets/blog.png'
import Blogs from './_components/Blogs'
import Footer from '@/app/_components/Footer'

const page = () => {
  return (
    <div className='mt-30 [@media(min-width:1750px)]:mt-36 mx-auto text-[#003F5C]'>
        <div className='max-w-8xl flex flex-col-reverse md:flex-row-reverse gap-10 mt-16 mb-20 px-10 items-center justify-center'>

          <div className='md:w-[40%]'>
              <Image
              src={BlogImage}
              alt='Hero Image'
              objectFit='cover'
              height={436}
              width={693}
              />
          </div>

          <div className='md:w-[60%]'>
            <p className='font-poppins text-[40px] font-semibold leading-[55px] [@media(min-width:1750px)]:text-[56px] mb-6'>Insights & Updates</p>
            <p className='font-lato font-medium leading-[120%] text-[20px] md:text-[22px] [@media(min-width:1750px)]:text-[28px]'>Stay up-to-date on hot industry topics, clinical best practices, regulatory news, and the latest in digital healthcare innovation.</p>
          </div> 

        </div>

        <p className='font-semibold px-4 font-poppins text-[40px] [@media(min-width:1750px)]:text-[56px] mt-10 md:mt-16 text-center'>Latest News & Articles</p>

        <Blogs/>
    </div>
  )
}

export default page