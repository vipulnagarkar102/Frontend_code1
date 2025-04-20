// import Image from "next/image";
import React from "react";

interface BlogCardProps {
  heading: string;
  subtext: string;
  imageSrc: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ heading, subtext, imageSrc }) => {
  return (
    <div className="flex flex-col justify-between pb-8 w-[250px] md:w-[300px] h-[450px] gap-4 border-2 shadow-lg bg-[#FFFFFF] text-[#003F5C] rounded-2xl">
      
      <div className="h-[300px] w-full overflow-hidden">
        <img 
          src={imageSrc} 
          alt={heading} 
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
      <p
        className="font-poppins px-4 text-[22px] md:text-[24px] font-medium line-clamp-1"
        dangerouslySetInnerHTML={{ __html: heading }}
      />

      <p
        className="font-lato px-4 text-[16px] md:text-[18px] font-normal line-clamp-3"
        dangerouslySetInnerHTML={{ __html: subtext }}
      />
      <p className="font-lato px-4 text-[14px] md:text-[16px] underline font-semibold">Read more</p>
      

    </div>
  );
};

export default BlogCard;


