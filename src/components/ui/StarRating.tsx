import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  count?: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  count,
  size = 'md',
  showCount = true,
}) => {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const stars = Array.from({ length: 5 }, (_, index) => {
    const starValue = index + 1;
    const filled = rating >= starValue;
    const partial = rating > index && rating < starValue;
    
    return (
      <Star
        key={index}
        className={`${sizeClasses[size]} ${
          filled ? 'fill-yellow-400 text-yellow-400' : partial ? 'fill-yellow-200 text-yellow-400' : 'text-gray-300'
        }`}
      />
    );
  });

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">{stars}</div>
      {showCount && count !== undefined && (
        <span className="text-sm text-gray-600 ml-1">
          {rating.toFixed(1)} ({count})
        </span>
      )}
    </div>
  );
};
