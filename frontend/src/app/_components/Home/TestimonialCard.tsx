import Image, { StaticImageData } from "next/image";
import React from "react";

interface TestimonialCardProps {
  imageSrc: string | StaticImageData;
  description: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ imageSrc, description }) => {
  return (
    <div className="flex flex-col justify-between w-full h-full p-6 bg-white text-[#003F5C] rounded-2xl shadow-md">
      
      {/* Description */}
      <p className="font-lato font-normal text-[16px] md:text-[18px] [@media(min-width:1800px)]:text-[24px] mb-6">
        {description}
      </p>

      {/* Image bottom-right */}
      <div className="flex justify-end mt-auto">
        <div className="w-200 h-200 md:w-20 md:h-20 [@media(min-width:1800px)]:w-24 [@media(min-width:1800px)]:h-24 rounded-full overflow-hidden bg-transparent">
          <Image
            src={imageSrc}
            alt="testimonial"
            width={100}
            height={100}
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
