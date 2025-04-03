import Image, { StaticImageData } from "next/image";
import React from "react";

interface TestimonialCardProps {
    heading: string;
    subtext: string;
    imageSrc: string | StaticImageData;
  }



const TestimonialCard: React.FC<TestimonialCardProps> = ({heading, subtext, imageSrc }) => {
  return (
    <div className="flex flex-col justify-between py-8 w-[270px] h-[320px] md:w-[300px] md:h-[360px] gap-4 p-4 border-2 shadow-lg bg-[#FFFFFF] text-[#003F5C] rounded-2xl">
      <p className="font-poppins text-[24px] font-medium">{heading}</p>
      <p className="font-lato text-[16px] md:text-[18px] font-normal">{subtext}</p>
      <div className="h-[60px] w-[60px] ml-[150px] md:ml-[180px] rounded-full bg-white p-2">
        <Image src={imageSrc} alt="testimonial image" height={56} width={56} className="rounded-full"/>
      </div>
    </div>
  );
};

export default TestimonialCard;
