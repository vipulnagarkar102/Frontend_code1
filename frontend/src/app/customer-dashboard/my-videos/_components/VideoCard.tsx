import Image from "next/image";
import React from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import HeroImage from '@/assets/Rectangle 25.png'

interface VideoCardProps {
  id: string;
  title: string;
  progress: number;
  rating: number;
}

const StarRating = ({ rating }: { rating: number }) => {
  const totalStars = 5;

  return (
    <div className="flex gap-1">
      {[...Array(totalStars)].map((_, index) => {
        const fillColor = index + 1 <= rating ? "#008080" : "gray";
        return <Star key={index} size={20} fill={fillColor} color={fillColor} />;
      })}
    </div>
  );
};

const VideoCard: React.FC<VideoCardProps> = ({ id, title, progress, rating }) => {
  const getButtonStyles = () => {
    if (progress === 0) return "bg-white text-[#00A5CF] border border-[#00A5CF]";
    if (progress === 100) return "bg-[#00A5CF] text-white";
    return "bg-[#00A897] text-white";
  };

  const getActionText = () => {
    if (progress === 0) return "START LEARNING";
    if (progress === 100) return "DOWNLOAD CERTIFICATE";
    return "CONTINUE LEARNING";
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg text-[#003F5C] flex flex-col gap-2">
      <div className="relative w-full h-48">
        <Image 
          src={HeroImage} 
          alt={title} 
          fill
          className="rounded-lg object-cover"
        />
      </div>
      <h3 className="text-[18px] font-poppins font-semibold mt-2">{title}</h3>
      <div className="flex flex-row flex-wrap justify-between items-center">
        <StarRating rating={rating} />
        <p className="text-gray-600 text-sm mt-1">{progress}% Complete</p>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
        <div className="bg-teal-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
      </div>
      <Link href={`/customer-dashboard/my-videos/${id}`}>
        <Button variant="outline" className={`w-full cursor-pointer mt-4 py-2 rounded-lg ${getButtonStyles()}`}>
          {getActionText()}
        </Button>
      </Link>
    </div>
  );
};

export default VideoCard;