import Image, { StaticImageData } from "next/image";
import React from "react";

interface TestimonialCardProps {
  imageSrc: string | StaticImageData;
  description: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ imageSrc, description }) => {
  return (
    <div className="flex flex-col items-center w-full h-full p-6 bg-white text-[#003F5C] rounded-2xl shadow-md">
      {/* Image at the top */}
      <div className="w-[160px] h-[160px] md:w-[180px] md:h-[180px] [@media(min-width:1800px)]:w-[220px] [@media(min-width:1800px)]:h-[220px] mb-6">
        <Image
          src={imageSrc}
          alt="testimonial"
          width={220}
          height={220}
          className="object-contain w-full h-full"
        />
      </div>

      {/* Description below */}
      <p className="font-lato font-normal text-[16px] md:text-[18px] text-center [@media(min-width:1800px)]:text-[24px]">
        {description}
      </p>
    </div>
  );
};

export default TestimonialCard;
