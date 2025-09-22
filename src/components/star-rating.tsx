import { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

type StarRatingProps = {
  rating?: number;
  interactive?: boolean;
  onChange?: (rating: number) => void;
};

export const StarRating: React.FC<StarRatingProps> = ({
  rating = 0,
  interactive = false,
  onChange,
}) => {
  const [selectedRating, setSelectedRating] = useState<number>(rating);
  const [hoverRating, setHoverRating] = useState<number>(0);

  const handleClick = (index: number) => {
    if (!interactive) return;
    const newRating = index + 1;
    setSelectedRating(newRating);
    onChange?.(newRating);
  };

  const handleMouseEnter = (index: number) => {
    if (!interactive) return;
    setHoverRating(index + 1);
  };

  const handleMouseLeave = () => {
    if (!interactive) return;
    setHoverRating(0);
  };

  const displayedRating = interactive ? hoverRating || selectedRating : rating;

  return (
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, index) => {
        const isFilled = index < displayedRating;

        return (
          <div
            key={index}
            onClick={() => handleClick(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {isFilled ? (
              <FaStar
                className={`${
                  interactive ? "cursor-pointer" : ""
                } text-yellow-500`}
                size={30}
              />
            ) : (
              <FaRegStar
                className={`${
                  interactive ? "cursor-pointer" : ""
                } text-gray-400`}
                size={30}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
