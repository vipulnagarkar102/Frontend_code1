'use client';
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import TestimonialCard from './TestimonialCard1';

import image1 from '@/assets/t1.png';
import image4 from '@/assets/t4.png';
import image5 from '@/assets/t5.png';
import image6 from '@/assets/t6.png';
import image7 from '@/assets/t7.png';

// Testimonial data
const testimonialsData = [
  {
    image: image1,
    description:
      'Officially recognized under the Government of India’s Startup India initiative by DPIIT, this platform reflects a commitment to innovation, emerging technologies, and scalable solutions.',
  },
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
      'Vtex.ai empowers the health and life sciences sector with AI-driven insights and solutions, tackling critical challenges through intelligent, data-powered innovation.',
  },
  {
    image: image7,
    description:
      'By sharing impactful health videos, you\'re driving awareness, empowering healthier choices, and making a meaningful difference in your community. Keep up the great work!',
  },

];

const Testimonials = () => (
  <div className="my-10 py-10 bg-gradient-to-b from-white to-blue-50">
    <p className="font-poppins font-semibold text-3xl md:text-[40px] text-center text-[#003F5C] mb-10 px-4">
      Accreditations & Expert Testimonials
    </p>

    <div className="w-full flex items-center justify-center px-4">
      <Carousel
        className="w-full max-w-[280px] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[1000px] xl:max-w-[1260px] [@media(min-width:1600px)]:max-w-[1450px] [@media(min-width:1750px)]:max-w-[1600px] [@media(min-width:2000px)]:max-w-[1900px]"
        plugins={[Autoplay({ delay: 2500, stopOnInteraction: true })]}
        opts={{ align: "start", loop: true }}
      >
        <CarouselContent className="-ml-4">
          {testimonialsData.map((item, idx) => {
            const isLastTwo = idx >= testimonialsData.length - 2;
            const descContent = isLastTwo ? (
              <div className="relative p-6 italic text-[#003F5C]">
              <img
                  src="q1.png"
                  alt="Quote"
                  className="absolute top-0 left-0 w-12 h-12 md:w-16 md:h-16"
                />
                <div className="text-[16px] md:text-[18px] [@media(min-width:1800px)]:text-[24px] ">
                  {item.description}
                </div>
                {/* <span className="absolute bottom-0 right-0 text-4xl  font-bold text-[#00A897]">”</span> */}
                <img
                  src="q2.png"
                  alt="Quote"
                  className="absolute bottom-0 right-0 w-12 h-12 md:w-16 md:h-16"
                />


              </div>

            ) : (
              item.description
            );

            return (
              <CarouselItem
                key={idx}
                className="pl-4 basis-full md:basis-1/2 lg:basis-1/3 xl:basis-2/7 [@media(min-width:1600px)]:basis-1/4"
              >
                <div className="p-1 h-full">
                  <TestimonialCard
                    imageSrc={item.image}
                    description={descContent}
                  />
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="flex" />
        <CarouselNext className="flex" />
      </Carousel>
    </div>
  </div>
);

export default Testimonials;
