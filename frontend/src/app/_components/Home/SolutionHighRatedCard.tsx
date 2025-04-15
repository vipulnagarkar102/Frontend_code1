import Image from 'next/image'
import React from 'react'
import image from '@/assets/Rectangle 25.png'
import { Star } from 'lucide-react';

const StarRating = ({ rating }: { rating: number }) => {
  const totalStars = 5;

  return (
    <div className="flex gap-1">
      {[...Array(totalStars)].map((_, index) => {
        const fillColor = index + 1 <= rating ? "#008080" : "gray"; // Teal for filled, Light gray for empty
        return <Star key={index} size={24} fill={fillColor} color={fillColor} />;
      })}
    </div>
  );
};

const HighRatedCard = () => {
  return (
    <div className='flex flex-col w-[280px] h-[300px] [@media(min-width:1750px)]:w-[380px] [@media(min-width:1750px)]:h-[400px] gap-4 p-8 bg-gradient-to-b from-[#00A5CF]/30 via-[#FFFFFF]/30 to-[#00A5CF]/5 text-[#003F5C] rounded-2xl'>
        <Image src={image} alt='image' sizes='(max-width: 1280px) 200px, (max-width: 1750px) 300px'/>
        <p className='font-poppins text-[18px] font-medium'>Video Title Name 1</p>
        {/* ⭐ Star Rating Component */}
        <StarRating rating={3} />
    </div>
  )
}

export default HighRatedCard