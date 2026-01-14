import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
}

export const StarRating = ({ rating, maxRating = 5, size = "md" }: StarRatingProps) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const stars = [];
  
  for (let i = 1; i <= maxRating; i++) {
    const isFilled = i <= Math.floor(rating);
    const isHalf = !isFilled && i === Math.ceil(rating) && rating % 1 !== 0;
    
    stars.push(
      <Star
        key={i}
        className={`${sizeClasses[size]} ${
          isFilled || isHalf ? "text-accent fill-accent" : "text-muted-foreground/30"
        }`}
      />
    );
  }

  return (
    <div className="inline-flex items-center gap-0.5">
      {stars}
      <span className="ml-2 text-accent font-semibold">
        {rating} {rating === 1 ? "Star" : "Stars"}
      </span>
    </div>
  );
};
