"use client";

import React, { useEffect, useState } from "react";

interface Blog {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  featured_media_url?: string;
}

export const BlogsDetails = ({ blogId }: { blogId: string }) => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      setError(false);
      
      try {
        const res = await fetch(
          `https://h2p.c25.myftpupload.com/wp-json/wp/v2/posts?slug=${blogId}&_embed`
        );
        const data = await res.json();

        if (data.length === 0) {
          setError(true);
          throw new Error("Post not found");
        }

        const post = data[0];
        const featuredMedia =
          post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;

        setBlog({
          ...post,
          featured_media_url: featuredMedia,
        });
      } catch (error) {
        console.error("Error fetching blog:", error);
        setError(true);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogId]);

  if (loading) {
    return (
      <div className="flex flex-col w-full items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-t-[#003F5C] border-r-transparent border-b-[#003F5C] border-l-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-[20px] font-lato font-semibold text-[#003F5C]">Loading blog post...</p>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="mt-30 flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-2xl font-bold text-red-500">Blog Post Not Found</h1>
        <p className="mt-4">The blog post you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <div className="mt-26 [@media(min-width:1750px)]:mt-30 font-lato text-[#003F5C]">
      {blog.featured_media_url && (
        <img
          src={blog.featured_media_url}
          alt="Blog Featured"
          className="w-full h-auto object-cover max-h-[500px] mb-10"
        />
      )}
      <div className="px-6 md:px-10 py-10">
        <div className="flex flex-col gap-8">
          <h1
            className="text-4xl md:text-5xl [@media(min-width:1750px)]:text-[56px] font-poppins font-semibold"
            dangerouslySetInnerHTML={{ __html: blog.title.rendered }}
          />
          <div
            className="text-[18px] [@media(min-width:1750px)]:text-[22px] font-lato font-normal leading-relaxed"
            dangerouslySetInnerHTML={{ __html: blog.content.rendered }}
          />
        </div>
      </div>
    </div>
  );
};