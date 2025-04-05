import { Star } from "lucide-react";

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

export default StarRating