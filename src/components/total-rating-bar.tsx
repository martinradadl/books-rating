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
    <div className={classNames('w-fit flex flex-col lg:flex-row gap-2 lg:gap-6 px-1 py-3 items-center rounded hover:bg-gray-200 focus:ring-2', className)}
      tabIndex={0}>
      <div className="flex gap-4">
        <StarRating rating={rating} />
        <p className="text-3xl font-bold">{rating}</p>
      </div>

      <div className="flex gap-2">
        <LabelText text={`${ratingsCount.toLocaleString("en-US")} ratings`} />
        <LabelText text={"·"} />
        <LabelText text={`${reviewsCount.toLocaleString("en-US")} reviews`} />
      </div>
    </div>
  );
};
