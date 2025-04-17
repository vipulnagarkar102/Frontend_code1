'use client';
import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import TestimonialCard from './TestimonialCard';
import image1 from '@/assets/t1.png'
import image2 from '@/assets/t2.png'
import image3 from '@/assets/t3.png'
import image4 from '@/assets/t4.png'
import image5 from '@/assets/t5.png'
import image6 from '@/assets/t6.png'
import image7 from '@/assets/t7.png'

// Your data array
const testimonialsData = [
  {
    image: image1,
    description:
      'Officially recognized under the Government of India’s Startup India initiative by DPIIT, this platform reflects a commitment to innovation, emerging technologies, and scalable solutions.',
  },
  { image: image2, description: 'Proudly recognized under by Department for Promotion of Industry and Internal Trade (DPIIT), affirming our innovation-driven approach and enabling access to tax benefits, government grants, and exclusive startup ecosystem opportunities.' },
  { image: image3, description: 'Recognized as an innovation-driven and scalable venture, gains access to government incentives, regulatory advantages, funding opportunities, and integration into India’s national startup ecosystem' },
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
  {
    image: image6,
    description:
      'Essentient delivers innovative tech solutions, driving digital transformation with 20+ years of expertise.',
  },
  {
    image: image7,
    description:
      'MTIS delivers custom digital experiences and AI-driven transformation with innovation and agility',
  },
  // Add more items if needed
];


const Testimonials = () => {
  return (
    <div className='my-10 py-10 bg-gradient-to-b from-white to-blue-50'>
      <p className='font-poppins font-semibold text-3xl md:text-[40px] text-center text-[#003F5C] mb-10 px-4'>
      Certifications, Accreditations & Expert Testimonials {/* Changed heading */}
      </p>
      <div className='w-full flex items-center justify-center px-4'> 

        <Carousel
          className="w-full max-w-[280px] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[1000px] xl:max-w-[1260px] [@media(min-width:1600px)]:max-w-[1450px] [@media(min-width:1750px)]:max-w-[1600px] [@media(min-width:2000px)]:max-w-[1900px]"
          plugins={[
            Autoplay({
              delay: 2500, // Slightly slower autoplay
              stopOnInteraction: true, // Stop autoplay when user interacts
            }),
          ]}
          opts={{
            align: "start",
            loop: true,     
          }}
        >
          <CarouselContent className="-ml-4">
            {/* Map over the data array */}
            {testimonialsData.map((item, index) => (
              <CarouselItem
                key={index}
                className="pl-4 basis-full md:basis-1/2 lg:basis-1/3 xl:basis-2/7 [@media(min-width:1600px)]:basis-1/4"
              >
                <div className="p-1 h-full">
                  <TestimonialCard
                    imageSrc={item.image}
                    description={item.description}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="flex" /> {/* Hide controls on smallest screens */}
          <CarouselNext className="flex" />
        </Carousel>

      </div>
    </div>
  )
}

export default Testimonials;