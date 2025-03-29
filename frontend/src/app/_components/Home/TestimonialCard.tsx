import Image, { StaticImageData } from "next/image";
import React from "react";
import { Star } from "lucide-react";

interface TestimonialCardProps {
    rating: number;
    heading: string;
    subtext: string;
    imageSrc: string | StaticImageData; // ✅ Allow both string & StaticImageData
  }

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  const totalStars = 5;

  return (
    <div className="flex gap-1">
      {[...Array(totalStars)].map((_, index) => {
        const fillColor = index + 1 <= rating ? "#008080" : "gray"; // Teal for filled, gray for empty
        return <Star key={index} size={24} fill={fillColor} color={fillColor} />;
      })}
    </div>
  );
};

const TestimonialCard: React.FC<TestimonialCardProps> = ({ rating, heading, subtext, imageSrc }) => {
  return (
    <div className="flex flex-col justify-between w-[270px] h-[400px] md:w-[300px] md:h-[420px] gap-4 p-4 border-2 shadow-lg bg-[#FFFFFF] text-[#003F5C] rounded-2xl">
      {/* ⭐ Star Rating Component */}
      <StarRating rating={rating} />
      <p className="font-poppins text-[24px] font-medium">{heading}</p>
      <p className="font-lato text-[16px] md:text-[18px]">{subtext}</p>
      <div className="h-[60px] w-[60px] rounded-full bg-white p-2">
        <Image src={imageSrc} alt="testimonial image" height={56} width={56} className="rounded-full"/>
      </div>
    </div>
  );
};

export default TestimonialCard;
