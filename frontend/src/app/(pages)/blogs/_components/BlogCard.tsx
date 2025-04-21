// import Image from "next/image";
import React from "react";

interface BlogCardProps {
  heading: string;
  subtext: string;
  imageSrc: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ heading, subtext, imageSrc }) => {
  return (
    <div className="flex flex-col justify-between pb-6 w-[260px] md:w-[300px] [@media(min-width:2000px)]:w-[380px] [@media(min-width:2000px)]:h-[480px] h-[400px] gap-2 border-2 shadow-lg bg-[#FFFFFF] text-[#003F5C] rounded-2xl">
      <div className="h-[200px] w-full overflow-hidden">
        <img 
          src={imageSrc} 
          alt="Blog Image"
          className="object-cover rounded-2xl"
        />
      </div>
      <p
        className="font-poppins px-4 text-[22px] md:text-[24px] [@media(min-width:2000px)]:text-[30px] font-medium line-clamp-1"
        dangerouslySetInnerHTML={{ __html: heading }}
      />

      <p
        className="font-lato px-4 text-[16px] md:text-[18px] [@media(min-width:2000px)]:text-[24px] font-normal line-clamp-3"
        dangerouslySetInnerHTML={{ __html: subtext }}
      />
      <p className="font-lato px-4 text-[14px] md:text-[16px] [@media(min-width:2000px)]:text-[20px] underline font-semibold">Read more</p>

    </div>
  );
};

export default BlogCard;

