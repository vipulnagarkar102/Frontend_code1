'use client'
import React from 'react'
import Image from 'next/image'
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

// Import five different images
import image1 from '@/assets/t1.png'
import image2 from '@/assets/t2.png'
import image3 from '@/assets/t3.png'
import image4 from '@/assets/t4.png'
import image5 from '@/assets/t5.png'

const Testimonials = () => {
  const images = [image1, image2, image3, image4, image5]

  return (
    <div className='my-10'>
      <p className='font-poppins font-semibold text-[40px] text-center text-[#003F5C]'>Trusted by Global Leaders</p>
      <div className='max-w-screen mx-auto flex items-center justify-center max-h-screen mt-10'>

        <Carousel
          className="mt-10 w-[280px] md:w-[670px] lg:w-[1000px] xl:w-[1260px] ml-4 md:ml-0"
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
        >
          <CarouselContent>
            {images.map((img, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <div className="w-full h-[300px] flex items-center justify-center px-2">
                  <Image
                    src={img}
                    alt={`Testimonial ${index + 1}`}
                    className="rounded-lg object-cover"
                    width={400}
                    height={300}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext className='mr-3 md:mr-0' />
        </Carousel>

      </div>
    </div>
  )
}

export default Testimonials
