import classNames from "classnames";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import ConfirmModal from "../modals/confirm-modal";
import ratingsActions from "../../redux/actions/ratings";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import type { RootState } from "../../redux/store";


type StarRatingProps = {
  rating?: number;
  interactive?: boolean;
  userRating?: number;
  setUserRating?: React.Dispatch<React.SetStateAction<number>>;
  starsSize?: number;
};

export const StarRating: React.FC<StarRatingProps> = ({
  rating = 0,
  interactive = false,
  userRating,
  setUserRating,
  starsSize,
}) => {
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [newUserRating, setNewUserRating] = useState(0);
  const { selectedEdition } = useAppSelector((state: RootState) => state.editions);
  const dispatch = useAppDispatch();


  const handleClick = (index: number) => {
    if (!interactive) return;
    setNewUserRating(index + 1);
    setHoverRating(newUserRating);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmNewUserRating = () => {
    dispatch(ratingsActions.add({ book: selectedEdition?.book._id || "", score: newUserRating }))
    setUserRating?.(newUserRating);
    setIsConfirmModalOpen(false);
  }

  const handleCancelNewUserRating = () => {
    setIsConfirmModalOpen(false);
    setHoverRating(0)
  }

  useEffect(() => {
  }, [isConfirmModalOpen])

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
        const starScore = index + 1;
        const currentRating = interactive ? (hoverRating > 0 ? hoverRating : userRating || 0) : Math.ceil(rating);
        const isFilled = starScore <= currentRating;

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
                  ratingDecimalPart > 0 && (starScore === ratingIntegerPart + 1)
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
            <ConfirmModal isOpen={isConfirmModalOpen} title="Confirm new rating" onConfirm={handleConfirmNewUserRating} onCancel={handleCancelNewUserRating} />
          </div>
        );
      })}
    </div>
  );
};
