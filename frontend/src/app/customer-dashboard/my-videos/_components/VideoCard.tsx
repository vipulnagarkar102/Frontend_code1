import Image, { StaticImageData } from "next/image";
import React from "react";
import { Star } from "lucide-react";

interface VideoCardProps {
  title: string;
  progress: number;
  rating: number;
  image: StaticImageData | string;
}

const StarRating = ({ rating }: { rating: number }) => {
  const totalStars = 5;

  return (
    <div className="flex gap-1">
      {[...Array(totalStars)].map((_, index) => {
        const fillColor = index + 1 <= rating ? "#008080" : "#F4F4F4";
        return <Star key={index} size={18} fill={fillColor} color={fillColor} />;
      })}
    </div>
  );
};

const VideoCard: React.FC<VideoCardProps> = ({ title, progress, rating, image }) => {
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
    <div className="bg-white p-4 rounded-3xl  border ">
      <Image src={image} alt={title} width={300} height={200} className="rounded-3xl pb-1" />
      <h3 className="text-lg font-semibold mt-2 pb-2">{title}</h3>
      <StarRating rating={rating} />
      <p className="text-gray-500 text-sm pt-2 text-right">{progress}% Complete</p>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
        <div className="bg-[#00A5CF] h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
      </div>
      <button className={`w-full mt-3 py-2 rounded-lg text-base font-normal ${getButtonStyles()}`}>
        {getActionText()}
      </button>
    </div>
  );
};

export default VideoCard;
