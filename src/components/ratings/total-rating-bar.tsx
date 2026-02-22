import classNames from "classnames";
import { StarRating } from "./star-rating";
import { LabelText } from "../label-text";

type TotalRatingBarProps = {
  averageRating: number;
  ratingCount: number;
  reviewsCount: number;
  className?: string;
};


export const TotalRatingBar = ({
  averageRating,
  ratingCount,
  reviewsCount,
  className
}: TotalRatingBarProps) => {
  return (
    <div className={classNames('w-fit flex flex-col lg:flex-row gap-2 lg:gap-6 px-1 py-3 items-center rounded hover:bg-gray-200 focus:ring-2', className)}
      tabIndex={0}>
      <div className="flex gap-4">
        <StarRating rating={averageRating} />
        <p className="text-3xl font-bold">{averageRating.toFixed(2)}</p>
      </div>

      <div className="flex gap-2">
        <LabelText text={`${ratingCount.toLocaleString("en-US")} ratings`} />
        <LabelText text={"·"} />
        <LabelText text={`${reviewsCount.toLocaleString("en-US")} reviews`} />
      </div>
    </div>
  );
};
