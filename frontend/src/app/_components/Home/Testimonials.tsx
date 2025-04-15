'use client'
import React from 'react'
import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

import image1 from '@/assets/t1.png'
import image2 from '@/assets/t2.png'
import image3 from '@/assets/t3.png'
import image4 from '@/assets/t4.png'
import image5 from '@/assets/t5.png'

const Testimonials = () => {
  const testimonials = [
    {
      image: image1,
      description:
        'Officially recognized under the Government of India’s Startup India initiative by DPIIT, this platform reflects a commitment to innovation, emerging technologies, and scalable solutions.',
    },
    { image: image2, description: 'Certificate of Recognition' },
    { image: image3, description: 'Certificate of Eligible Business' },
    {
      image: image4,
      description:
        'Registered as a Micro, Small, and Medium Enterprise (MSME) under the Udyam portal, ensuring credibility, structured growth access, and participation in government-supported initiatives.',
    },
    {
      image: image5,
      description:
        'A registered trademark application has been submitted, securing brand identity and reinforcing authenticity, originality, and innovation in offerings.',
    },
  ]

  return (
    <div className='my-10'>
      <p className='font-poppins font-semibold text-[30px] md:text-[40px] text-center text-[#003F5C]'>
        Trusted by Global Leaders
      </p>

      <div className='max-w-screen-xl mx-auto flex items-center justify-center mt-10'>
        <Carousel
          className="w-full px-4 md:px-0"
          plugins={[
            Autoplay({
              delay: 3000,
            }),
          ]}
        >
          <CarouselContent>
            {testimonials.map((item, index) => (
              <CarouselItem
                key={index}
                className="basis-full md:basis-1/3 px-3 py-4"
              >
                <div className="flex flex-col justify-between items-center bg-white rounded-xl overflow-hidden w-full max-w-[500px] h-[380px] md:h-[400px] mx-auto">
                  {/* Image with border + shadow */}
                  <div className="w-full border border-gray-200 shadow-md">
                    <Image
                      src={item.image}
                      alt={`Testimonial ${index + 1}`}
                      className="w-full h-[200px] object-cover"
                      width={500}
                      height={200}
                    />
                  </div>

                  {/* Description without shadow */}
                  <div className="p-3 text-center text-[#003F5C] font-lato text-sm md:text-base font-medium flex-grow flex items-center">
                    {item.description}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="hidden" />
          <CarouselNext className="hidden" />
        </Carousel>
      </div>
    </div>
  )
}

export default Testimonials
