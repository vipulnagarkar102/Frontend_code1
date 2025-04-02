"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import blogsData from "../../data/blogs.json";
import HeroImage from '../../../assets/blogpage.png'

type Blog = {
  id: number;
  title: string;
  uploadDate: string;
  thumbnail: string;
  description: string;
};

const BlogPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    setBlogs(blogsData);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 mt-26">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold">Insights & Updates</h2>
          <p className="font-lato font-medium text-[22px] leading-[120%] tracking-[0%] mt-5">
            Stay up-to-date on hot industry topics, clinical best practices, regulatory news, and the latest in digital healthcare innovation.
          </p>
        </div>
        <div className="md:w-1/2 flex justify-end">
          <Image src={HeroImage}
          alt='Hero Image' width={600} height={200} className="rounded-lg" />
        </div>
      </div>

      {/* Blog Section */}
      <h3 className="font-poppins font-bold text-[40px] leading-[100%] tracking-[0%] text-center mt-25 mb-15">Latest News & Articles</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {blogs.map((blog) => (
          <div key={blog.id} className="border rounded-lg p-4 shadow-md bg-white">
            <Image src={blog.thumbnail} width={300} height={200} alt={blog.title} className="rounded-md" />
            <h4 className="text-xl font-semibold mt-4">{blog.title}</h4>
            <p className="text-gray-500 text-sm">{blog.uploadDate}</p>
            <p className="text-gray-700 mt-2">{blog.description}</p>
            <Link href={`/blog/${blog.id}`} legacyBehavior>
              <a target="_blank" className="text-blue-600 mt-4 inline-block">Read More →</a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
