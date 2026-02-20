import classNames from "classnames";
import { useState } from "react";
import { FaStar } from "react-icons/fa";

type StarRatingProps = {
  rating?: number;
  interactive?: boolean;
  onChange?: (rating: number) => void;
  starsSize?: number;
};

export const StarRating: React.FC<StarRatingProps> = ({
  rating = 0,
  interactive = false,
  onChange,
  starsSize,
}) => {
  const [hoverRating, setHoverRating] = useState<number>(0);

  const handleClick = (index: number) => {
    if (!interactive) return;
    const newRating = index + 1;
    setHoverRating(newRating);
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

  const ratingIntegerPart = Math.floor(rating);
  const ratingDecimalPart = rating - ratingIntegerPart;

  return (
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, index) => {
        const isFilled = (ratingDecimalPart > 0 ? index : index + 1) <= (interactive ? hoverRating : ratingIntegerPart);

        return (
          <div
            key={index}
            onClick={() => handleClick(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            className={interactive ? "focus:ring-2 focus:ring-offset-3 rounded-full" : ""}
            tabIndex={0}
          >
            <div className="relative">
              <FaStar
                className={classNames(
                  "absolute left-0 top-0 text-yellow-500",
                  { "cursor-pointer": interactive },
                  { "hidden": !isFilled }
                )}
                size={starsSize || 30}
                style={
                  ratingDecimalPart > 0 && (index === ratingIntegerPart)
                    ? { clipPath: `inset(0% ${100 - (ratingDecimalPart * 100)}% 0% 0%)` }
                    : undefined
                }
              />
              <FaStar
                className={`${interactive ? "cursor-pointer" : ""
                  } text-gray-400`}
                size={starsSize || 30}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
