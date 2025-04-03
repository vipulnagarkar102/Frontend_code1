'use client'
import React from 'react'
import BlogCard from './BlogCard'
import vtexLogo from '@/assets/vtex.png'
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import blogsData from '@/app/data/blogs.json'
import Link from 'next/link';

const Blogs = () => {
  return (
    <div className='my-10 mb-20'>
        <div className='max-w-screen mx-auto flex items-center justify-center max-h-screen mt-10'>

        <Carousel
            className="mt-10 w-[80%]"
            plugins={[
            Autoplay({
                delay: 2000, // Auto-scroll every 2 sec
            }),
            ]}
        >
            <CarouselContent>
                {blogsData.map((blog) => (
                    <CarouselItem 
                    key={blog.id} 
                    className="md:basis-1/2 lg:basis-1/3 flex items-center justify-center"
                    >
                    <Link
                        href={`/blogs/${blog.id}`}
                        key={blog.id}>
                        <BlogCard 
                            heading={blog.heading} 
                            subtext={blog.subtext} 
                            imageSrc={vtexLogo} 
                        />
                    </Link>
                    </CarouselItem>
                ))}   
            
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>

            
        </div>
    </div>
  )
}

export default Blogs