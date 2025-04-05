import Image from 'next/image'
import React from 'react'
import { Star } from 'lucide-react';
import DummyImage from '@/assets/Emerging Tech/Generative AI for architects.png'
import StarRating from '../../_components/StarRating';

interface VideoCardProps {
  title: string;
  thumbnail: string;
  tags: string[];
  description: string;
  rating?: number;
}


const VideoCard = ({ title, thumbnail, tags, rating = 3 }: VideoCardProps) => {
  return (
    <div className='flex flex-col w-[280px] min-h-[420px] justify-between gap-3 p-6 bg-gradient-to-b from-[#00A5CF]/30 via-[#FFFFFF]/30 to-[#00A5CF]/5 text-[#003F5C] rounded-2xl'>
      <div className="relative h-36 w-full">
        <Image 
          src={DummyImage} 
          alt={title} 
          fill
          className="object-cover rounded-lg"
        />
      </div>
      <p className='font-poppins text-[16px] font-medium line-clamp-2'>{title}</p>
      <StarRating rating={rating} />
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
            <span 
                key={index} 
                className="px-2 py-1 text-xs font-medium bg-[#00A897] text-white rounded-md"
            >
                {tag}
            </span>
        ))}
      </div>
    </div>
  )
}

export default VideoCard