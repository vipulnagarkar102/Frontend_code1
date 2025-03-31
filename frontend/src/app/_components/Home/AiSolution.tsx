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
    
        {/* Highest rated AI Solutions:  */}
        <AiSolutionCard 
                highlightedText='Highest Rated '
                mainText='AI Solutions'
                subText='That Deliver Results'
        />
        <div className='max-w-screen mx-auto flex items-center justify-center max-h-screen mt-5'>
        
                <Carousel
                    className="mt-10 w-[280px] md:w-[600px] lg:w-[900px] xl:w-[1200px] xl:[@media(min-width:1400px)]:w-[1300px] ml-4 md:ml-0"
                    plugins={[
                    Autoplay({
                        delay: 2000, // Auto-scroll every 2 sec
                    }),
                    ]}
                >
                <CarouselContent className=''>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 flex justify-center"><HighRatedCard/></CarouselItem>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 flex justify-center"><HighRatedCard/></CarouselItem>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 flex justify-center"><HighRatedCard/></CarouselItem>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 flex justify-center"><HighRatedCard/></CarouselItem>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 flex justify-center"><HighRatedCard/></CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>

        </div>
        

        {/* Trending AI Solutions:  */}

        <AiSolutionCard 
                highlightedText='Trending '
                mainText='AI Solutions'
                subText='What’s Changing the Game'
        />

        <div className='max-w-screen mx-auto flex items-center justify-center max-h-screen mt-5'>
        
                <Carousel
                    className="mt-10 w-[280px] md:w-[600px] lg:w-[900px] xl:w-[1200px] xl:[@media(min-width:1400px)]:w-[1300px] ml-4 md:ml-0"
                    plugins={[
                    Autoplay({
                        delay: 2000, // Auto-scroll every 2 sec
                    }),
                    ]}
                >
                <CarouselContent className=''>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 flex justify-center"><TrendingCard/></CarouselItem>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 flex justify-center"><TrendingCard/></CarouselItem>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 flex justify-center"><TrendingCard/></CarouselItem>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 flex justify-center"><TrendingCard/></CarouselItem>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 flex justify-center"><TrendingCard/></CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>

        </div>

        {/* AI That Works: */}

        <AiSolutionCard 
                    highlightedText='AI '
                    mainText='That Works'
                    subText='Top Reviewed Solutions You Should Know'
        />

        <div className='max-w-screen mx-auto flex items-center justify-center max-h-screen mt-5'>
        
                <Carousel
                    className="mt-10 w-[280px] md:w-[600px] lg:w-[900px] xl:w-[1200px] xl:[@media(min-width:1400px)]:w-[1300px] ml-4 md:ml-0"
                    plugins={[
                    Autoplay({
                        delay: 2000, // Auto-scroll every 2 sec
                    }),
                    ]}
                >
                <CarouselContent className=''>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 flex justify-center"><WorksCard/></CarouselItem>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 flex justify-center"><WorksCard/></CarouselItem>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 flex justify-center"><WorksCard/></CarouselItem>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 flex justify-center"><WorksCard/></CarouselItem>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 flex justify-center"><WorksCard/></CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>

        </div>

        
    </div>
  )
}

export default AiSolution