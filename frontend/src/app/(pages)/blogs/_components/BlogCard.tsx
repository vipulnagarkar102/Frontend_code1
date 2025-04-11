// import Image from "next/image";
import React from "react";

interface BlogCardProps {
  heading: string;
  subtext: string;
  imageSrc: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ heading, subtext, imageSrc }) => {
  return (
    <div className="flex flex-col py-8 w-[250px] h-[320px] md:w-[300px] md:h-[360px] gap-4 p-4 border-2 shadow-lg bg-[#FFFFFF] text-[#003F5C] rounded-2xl">
      
      <p
        className="font-poppins text-[24px] font-medium line-clamp-2"
        dangerouslySetInnerHTML={{ __html: heading }}
      />

      <p
        className="font-lato text-[16px] md:text-[18px] font-normal line-clamp-6"
        dangerouslySetInnerHTML={{ __html: subtext }}
      />

      {/* {imageSrc && (
        <div className="h-[60px] w-[60px] ml-auto rounded-full bg-white p-2">
          <Image
            src={imageSrc}
            alt="blog image"
            height={56}
            width={56}
            className="rounded-full object-cover"
          />
        </div>
      )} */}
    </div>
  );
};

export default BlogCard;
