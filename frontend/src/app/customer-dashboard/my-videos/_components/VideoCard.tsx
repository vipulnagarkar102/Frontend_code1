import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PlaceholderImage from '@/assets/Rectangle 25.png'; // Keep placeholder for now

interface VideoCardProps {
  id: number; // WordPress IDs are typically numbers
  title: string;
  imageUrl?: string; // Make image URL optional
  // Removed progress and rating
}

// Removed StarRating component

const VideoCard: React.FC<VideoCardProps> = ({ id, title, imageUrl }) => {

  // Simplified button logic - always links to the course page
  const actionText = "VIEW COURSE";

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg text-[#003F5C] flex flex-col gap-2">
      <div className="relative w-full h-48">
        <Image
          // Use fetched imageUrl, fallback to placeholder if not available
          src={imageUrl || PlaceholderImage}
          alt={title}
          fill
          className="rounded-lg object-cover"
          // Handle potential errors loading external images
          onError={(e) => { (e.target as HTMLImageElement).src = PlaceholderImage.src; }}
        />
      </div>
      <h3 className="text-[18px] font-poppins font-semibold mt-2 min-h-[56px]">{title}</h3> {/* Added min-height for alignment */}

      {/* Removed progress bar and rating */}

      {/* Link directly to a potential course detail page (adjust URL structure as needed) */}
      <Link href={`/customer-dashboard/my-courses/${id}`}>
        <Button variant="outline" className="w-full cursor-pointer mt-4 py-2 rounded-lg bg-[#00A5CF] text-white hover:bg-[#008CBA]">
          {actionText}
        </Button>
      </Link>
    </div>
  );
};

export default VideoCard;