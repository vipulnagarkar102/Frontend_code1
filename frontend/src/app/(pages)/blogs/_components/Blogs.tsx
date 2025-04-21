'use client';
import React, { useEffect, useState } from 'react';
import BlogCard from './BlogCard';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Link from 'next/link';

interface WPPost {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  slug: string;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
    }>;
  };
}

const Blogs = () => {
  const [blogs, setBlogs] = useState<WPPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          'https://h2p.c25.myftpupload.com/wp-json/wp/v2/posts?_embed&per_page=10'
        );
        const data = await res.json();
        setBlogs(data);
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className='my-10 mb-20'>
      <div className='xl:w-[1400px] [@media(min-width:1750px)]:w-[1800px] [@media(min-width:2000px)]:w-[2100px] lg:w-[1000px] md:w-[800px] w-[320px] mx-auto flex items-center justify-center max-h-screen mt-10'>

        {loading ? (
          <div className="flex flex-col items-center justify-center w-full py-12">
            <div className="w-12 h-12 border-4 border-t-[#003F5C] border-r-transparent border-b-[#003F5C] border-l-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-[20px] font-lato font-semibold text-[#003F5C]">Loading...</p>
          </div>
        ) : (
          <Carousel
            className="mt-10 w-[80%]"
            plugins={[
              Autoplay({ delay: 2000 }),
            ]}
          >
            <CarouselContent>
              {blogs.map((blog) => {
                const imageSrc =
                  blog._embedded?.['wp:featuredmedia']?.[0]?.source_url ?? '/default-thumb.jpg';
                return (
                  <CarouselItem
                    key={blog.id}
                    className="md:basis-1/2 xl:basis-1/3 [@media(min-width:1750px)]:basis-1/4 flex items-center justify-center"
                  >
                    <Link href={`/blogs/${blog.slug}`}>
                      <BlogCard
                        heading={blog.title.rendered}
                        subtext={blog.excerpt.rendered}
                        imageSrc={imageSrc}
                      />
                    </Link>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )}

      </div>
    </div>
  );
};

export default Blogs;