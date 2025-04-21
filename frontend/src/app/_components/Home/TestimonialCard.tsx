import Image, { StaticImageData } from "next/image";
import React from "react";

interface TestimonialCardProps {
  imageSrc: string | StaticImageData;
  description: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ imageSrc, description }) => {
  return (
<<<<<<< HEAD
    <div className="flex gap-1">
      {[...Array(totalStars)].map((_, index) => {
        const fillColor = index + 1 <= rating ? "#008080" : "gray"; // Teal for filled, gray for empty
        return <Star key={index} size={24} fill={fillColor} color={fillColor} />;
      })}
    </div>
  );
};

const TestimonialCard: React.FC<TestimonialCardProps> = ({imageSrc,description }) => {
  return (
    <div className="flex flex-col w-[270px] h-[440px] md:w-[300px] md:h-[460px] [@media(min-width:1800px)]:h-[640px]  [@media(min-width:1600px)]:w-[320px] [@media(min-width:1750px)]:w-[360px] [@media(min-width:2000px)]:w-[420px] gap-4 border-2 bg-[#FFFFFF] text-[#003F5C] rounded-2xl">
      <div className=" bg-gray-100 p-2 rounded-2xl">
        <Image width={500} height={200} src={imageSrc} alt="testimonial image" className="object-content"/>
      </div>
      <p className="p-4 font-lato font-normal text-[16px] md:text-[18px]  [@media(min-width:1800px)]:text-[26px] line-clamp-7">{description}</p>
=======
    <div className="flex flex-col justify-between w-full h-full p-6 bg-white text-[#003F5C] rounded-2xl shadow-md">
>>>>>>> a5151143ca17756b02252ec55e283766f73102c8
      
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
