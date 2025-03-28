'use client'
import React from 'react'
import AiSolutionCard from './AiSolutionCard'
import HighRatedCard from './SolutionHighRatedCard'
import TrendingCard from './SolutionTrendingCard'
import WorksCard from './SolutionWorksCard'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import Autoplay from "embla-carousel-autoplay"

const AiSolution = () => {
  return (
    <div className='my-10'>
        <p className='font-semibold font-poppins text-[40px] text-center text-[#003F5C]'>AI Solutions That Deliver Results</p>
    
        {/* Highest rated AI Solutions:  */}
        <div className='mt-10 flex flex-col lg:flex-row gap-6 lg:mr-64'>
            <div className='w-[30%]'>
            <AiSolutionCard 
                highlightedText='HIGHEST RATED'
                mainText='AI SOLUTIONS:'
                subText='That Deliver Results'
            />
            </div>
        
            <div className='lg:w-[60%] mx-auto'>
            <Carousel className='h-[300px] w-[280px] md:w-[600px] lg:w-[920px]'
             plugins={[
                Autoplay({
                  delay: 2000,
                }),
              ]}
            >
                <CarouselContent>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/3"><HighRatedCard/></CarouselItem>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/3"><HighRatedCard/></CarouselItem>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/3"><HighRatedCard/></CarouselItem>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/3"><HighRatedCard/></CarouselItem>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/3"><HighRatedCard/></CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>

            </div>
        </div>

        {/* Trending AI Solutions:  */}

        <div className='mt-10 flex flex-col lg:flex-row gap-6 lg:mr-64'>
            <div className='w-[30%]'>
                <AiSolutionCard 
                highlightedText='TRENDING'
                mainText='AI SOLUTIONS:'
                subText='What’s Changing the Game'
                />
            </div>
        
            <div className='lg:w-[60%] mx-auto'>
            <Carousel className='h-[300px] w-[280px] md:w-[600px] lg:w-[920px]'
             plugins={[
                Autoplay({
                  delay: 2000,
                }),
              ]}
            >
                <CarouselContent>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/3"><HighRatedCard/></CarouselItem>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/3"><HighRatedCard/></CarouselItem>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/3"><HighRatedCard/></CarouselItem>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/3"><HighRatedCard/></CarouselItem>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/3"><HighRatedCard/></CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>

            </div>
        </div>

        {/* AI That Works: */}

        <div className='mt-10 flex flex-col lg:flex-row gap-6 lg:mr-64'>
            <div className='w-[30%]'>
                <AiSolutionCard 
                    highlightedText='AI THAT'
                    mainText='WORKS: '
                    subText='Top Reviewed Solutions You Should Know'
                />
            </div>
        
            <div className='lg:w-[60%] mx-auto'>
            <Carousel className='h-[300px] w-[280px] md:w-[600px] lg:w-[920px]'
             plugins={[
                Autoplay({
                  delay: 2000,
                }),
              ]}
            >
                <CarouselContent>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/3"><HighRatedCard/></CarouselItem>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/3"><HighRatedCard/></CarouselItem>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/3"><HighRatedCard/></CarouselItem>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/3"><HighRatedCard/></CarouselItem>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/3"><HighRatedCard/></CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>

            </div>
        </div>

        
    </div>
  )
}

export default AiSolution