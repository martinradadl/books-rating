import classNames from "classnames";
import { LabelText } from "./label-text";
import { StarRating } from "./star-rating";

type TotalRatingBarProps = {
  rating: number;
  ratingsCount: number;
  reviewsCount: number;
  className?: string;
};


export const TotalRatingBar = ({
  rating,
  ratingsCount,
  reviewsCount,
  className
}: TotalRatingBarProps) => {
  return (
    <div className={classNames('w-fit flex gap-6 px-1 py-3 items-center rounded hover:bg-gray-200', className)}>
      <StarRating rating={rating} />

      <LabelText text={`${ratingsCount.toLocaleString("en-US")} ratings`} />
      <LabelText text={`${reviewsCount.toLocaleString("en-US")} reviews`} />
    </div>
  );
};
