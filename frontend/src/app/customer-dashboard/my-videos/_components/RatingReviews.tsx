'use client';

import React from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button'; 

const StarRatingDisplay = ({ rating, size = 20 }: { rating: number; size?: number }) => {
  const totalStars = 5;
  const fullStars = Math.floor(rating);

  const displayRating = Math.round(rating * 2) / 2; 

  return (
    <div className="flex items-center gap-1">
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        let fillColor = "none"; 
        let strokeColor = "#cbd5e1"; 

        if (starValue <= fullStars) {
          fillColor = "#0d9488";
          strokeColor = "#0d9488"; 
        }

        return (
            <Star
              key={index}
              size={size}
              fill={fillColor}
              stroke={strokeColor}
              strokeWidth={1.5}
            />
        );
      })}
    </div>
  );
};


interface RatingsReviewsProps {
  averageRating: number;
  totalReviews: number;

  ratingCounts: number[];
  reviews: {
    id: string | number;
    userName?: string; // Optional
    rating: number;
    text: string;
    timestamp: string; // e.g., "1 min ago"
  }[];
}

const RatingsReviews: React.FC<RatingsReviewsProps> = ({
  averageRating,
  totalReviews,
  ratingCounts,
  reviews,
}) => {

  const safeRatingCounts = [...ratingCounts, ...Array(5).fill(0)].slice(0, 5);
  const safeTotalReviews = totalReviews > 0 ? totalReviews : 1; // Avoid division by zero

  return (
    <div className="w-full font-lato font-normal text-[#003F5C]">
      <h2 className="text-[24px] font-poppins font-semibold mb-4">Ratings & Reviews</h2>

      {/* Ratings Summary Section */}
      <div className="bg-[#F8F7F2] p-4 sm:p-6 rounded-lg mb-8 border border-gray-200">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Left Side: Average Rating */}
          <div className="flex flex-col items-center text-center sm:items-start sm:text-left mb-4 sm:mb-0">
            <p className="text-4xl sm:text-5xl font-bold text-[#003F5C] mb-1">
              {averageRating.toFixed(1)} {/* Format to one decimal place */}
            </p>
            <StarRatingDisplay rating={averageRating} size={24} />
          </div>

          {/* Right Side: Rating Breakdown */}
          <div className="w-full flex-1 space-y-3">
            {/* Iterate 5 down to 1 */}
            {[...Array(5)].map((_, i) => {
              const starLevel = 5 - i; 
              const countIndex = starLevel - 1; 
              const count = safeRatingCounts[countIndex] || 0;
              const percentage = totalReviews > 0 ? (count / safeTotalReviews) * 100 : 0;

              return (
                <div key={starLevel} className="flex items-center gap-2 sm:gap-3 text-sm">
                  {/* Star Level */}
                  <div className="flex items-center gap-1 w-8 flex-shrink-0">
                    <span className="font-medium text-gray-600">{starLevel}</span>
                    <Star size={16} fill="#0d9488" stroke="#0d9488" />
                  </div>
                  {/* Progress Bar */}
                  <div className="flex-grow bg-gray-200 rounded-full h-1.5 sm:h-2 overflow-hidden">
                    <div
                      className="bg-teal-600 h-full rounded-full" // Use teal color
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  {/* Rating Count */}
                  <span className=" w-16 sm:w-20 text-right text-[12px] md:text-[16px] flex-shrink-0">
                    {count} Rating{count !== 1 ? 's' : ''}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Individual Reviews Section */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="flex gap-4">
            {/* Review Content */}
            <div className="flex-grow">
              <div className="flex justify-between items-center mb-1">
                <StarRatingDisplay rating={review.rating} size={18} />
                <span className="text-xs">{review.timestamp}</span>
              </div>
              <p className="text-[18px] py-3 leading-relaxed">
                {review.text}
              </p>
            </div>  
          </div>
        ))}
      </div>

      {/* Edit Review Button */}
      <div className="mt-8">
        <Button className="bg-[#00A5CF] hover:bg-[#008dbf] cursor-pointer text-white font-semibold py-5 px-4   rounded-lg text-sm sm:text-base">
          EDIT REVIEW
        </Button>
      </div>
    </div>
  );
};

export default RatingsReviews;