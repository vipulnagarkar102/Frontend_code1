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
        Certifications, Accreditations & Expert Testimonials
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
                <div className="flex flex-col bg-white rounded-xl overflow-hidden w-full max-w-[500px] h-[430px] shadow-lg mx-auto">
                  
                  {/* Image inside card */}
                  <div className="w-full p-4  border-gray-200 bg-gray-50 flex justify-center items-center">
                    <Image
                      src={item.image}
                      alt={`Testimonial ${index + 1}`}
                      className="w-auto h-auto max-w-full max-h-[200px] object-contain"
                      width={500}
                      height={200}
                    />
                  </div>

                  {/* Description inside card with reduced bottom padding */}
                  <div className="font-lato font-normal text-[18px] px-5 pt-10 text-center text-[#003F5C]">
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
