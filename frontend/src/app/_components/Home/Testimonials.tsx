'use client'
import React from 'react'
import TestimonialCard from './TestimonialCard'
import image from '@/assets/Rectangle 25.png'
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const Testimonials = () => {
  return (
    <div className='my-10'>
        <p className='font-poppins font-semibold text-[40px] text-center text-[#003F5C]'>Trusted by Global Leaders</p>
        <div className='max-w-screen mx-auto flex items-center justify-center max-h-screen mt-10'>

        <Carousel
            className="mt-10 w-[280px] md:w-[670px] lg:w-[1000px] xl:w-[1260px] ml-4 md:ml-0"
            plugins={[
            Autoplay({
                delay: 2000, // Auto-scroll every 2 sec
            }),
            ]}
        >
            <CarouselContent>
            <CarouselItem className="md:basis-1/2 lg:basis-1/3 xl:basis-2/7">
                <TestimonialCard 
                rating={4.5} 
                heading="Vital Healthcare Solutions" 
                subtext="Vtex.ai delivers AI-driven solutions for health and life sciences, providing innovative insights and advanced services to meet critical industry needs." 
                imageSrc={image} 
            />
            </CarouselItem>

            <CarouselItem className="md:basis-1/2 lg:basis-1/3 xl:basis-2/7">
                <TestimonialCard 
                rating={5} 
                heading="Building Healthier Communities" 
                subtext="Vtex delivers high-quality educational content, empowering healthcare professionals with knowledge for better clinical decisions and improved outcomes." 
                imageSrc={image} 
            />
            </CarouselItem>

            <CarouselItem className="md:basis-1/2 lg:basis-1/3 xl:basis-2/7">
                <TestimonialCard 
                rating={5} 
                heading="Best program" 
                subtext="Vtex.ai equips organizations with cutting-edge resources to drive innovation and efficiency. From Python demo code and best tutorials." 
                imageSrc={image} 
            />
            </CarouselItem>

            <CarouselItem className="md:basis-1/2 lg:basis-1/3 xl:basis-2/7">
                <TestimonialCard 
                rating={4.5} 
                heading="Easy to Customize" 
                subtext="Vtex.ai equips organizations with cutting-edge resources to drive innovation and efficiency. From Python demo code and best tutorials." 
                imageSrc={image} 
            />
            </CarouselItem>

            <CarouselItem className="md:basis-1/2 lg:basis-1/3 xl:basis-2/7">
                <TestimonialCard 
                rating={4.5} 
                heading="Easy to Customize" 
                subtext="Vtex.ai equips organizations with cutting-edge resources to drive innovation and efficiency. From Python demo code and best tutorials." 
                imageSrc={image} 
            />
            </CarouselItem>

            <CarouselItem className="md:basis-1/2 lg:basis-1/3 xl:basis-2/7">
                <TestimonialCard 
                rating={4.5} 
                heading="Easy to Customize" 
                subtext="Vtex.ai equips organizations with cutting-edge resources to drive innovation and efficiency. From Python demo code and best tutorials." 
                imageSrc={image} 
            />
            </CarouselItem>
            
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext className='mr-3 md:mr-0' />
        </Carousel>

            
        </div>
    </div>
  )
}

export default Testimonials