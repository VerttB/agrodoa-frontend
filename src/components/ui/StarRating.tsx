import { Star, StarHalf, StarOff } from "lucide-react";

interface StarRatingProps {
  nota: number; 
  className?: string;
}

export const StarRating = ({ nota, className }: StarRatingProps) => {
  const estrelas = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(nota)) {
      estrelas.push(
        <Star
          key={i}
          className={`h-4 w-4 text-yellow-400 fill-yellow-400 ${className}`}
        />
      );
    } else if (i - nota <= 0.5) {
      estrelas.push(
        <StarHalf
          key={i}
          className={`h-4 w-4 text-yellow-400 fill-yellow-400 ${className}`}
        />
      );
    } else {
      estrelas.push(
        <StarOff
          key={i}
          className={`h-4 w-4 text-gray-300 ${className}`}
        />
      );
    }
  }

  return <div className="flex items-center gap-0.5">{estrelas}</div>;
};
