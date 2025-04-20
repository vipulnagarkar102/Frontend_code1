'use client'
import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import Autoplay from "embla-carousel-autoplay"
import PopularVideoCard from '../_components/PopularVideoCard'

const MostPurchase = () => {
  return (
    <div className="container mx-auto py-8 mt-30 text-[#003F5C]">
        <h2 className="text-[40px] md:text-[50px] font-poppins font-semibold text-center">Most Purchased With This</h2>

            <div className='max-w-screen mx-auto flex items-center justify-center max-h-screen mt-5'>
        
                <Carousel
                    className="mt-10 w-[250px] md:w-[600px] lg:w-[900px] xl:w-[1200px] xl:[@media(min-width:1400px)]:w-[1300px] ml-4 md:ml-0"
                    plugins={[
                    Autoplay({
                        delay: 2000, // Auto-scroll every 2 sec
                    }),
                    ]}
                >
                <CarouselContent className=''>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 flex justify-center"><PopularVideoCard/></CarouselItem>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 flex justify-center"><PopularVideoCard/></CarouselItem>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 flex justify-center"><PopularVideoCard/></CarouselItem>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 flex justify-center"><PopularVideoCard/></CarouselItem>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 flex justify-center"><PopularVideoCard/></CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>

        </div>
    </div>
  )
}

export default MostPurchase