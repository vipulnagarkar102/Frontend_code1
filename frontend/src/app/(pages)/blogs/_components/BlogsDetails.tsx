"use client";

import React from 'react';
import blogsData from '@/app/data/blogs.json';

interface Blog {
  id: string;
  heading: string;
  subtext: string;
  imageSrc?: string;
}

export const BlogsDetails = ({ blogId }: { blogId: string }) => {

  const blog = blogsData.find((b: Blog) => b.id === blogId);

  if (!blog) {
    return (
      <div className="mt-30 flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-2xl font-bold text-red-500">Blog Post Not Found</h1>
        <p className="mt-4">The blog post you're looking for doesn't exist or may have been removed.</p>
      </div>
    );
  }

  return (
    <div className="mt-30 max-w-8xl px-6 md:px-10 py-10 font-lato text-[#003F5C]">
      <div className="flex flex-col gap-8">
        <h1 className="text-4xl md:text-5xl font-poppins font-semibold">
          {blog.heading}
        </h1>
        
        {/* <div className="w-full h-64 md:h-96 rounded-lg overflow-hidden">
          <img 
            src={blog.imageSrc} 
            alt={blog.heading}
            className="w-full h-full object-cover"
          />
        </div> */}
        
        <p className="text-[18px] font-lato leading-relaxed">
          {blog.subtext}
        </p>
      </div>
    </div>
  );
};