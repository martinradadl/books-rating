import { LabelText } from "./label-text";
import { StarRating } from "./star-rating";

type TotalRatingBarProps = {
  rating: number;
  ratingsCount: number;
  reviewsCount: number;
};


export const TotalRatingBar = ({
  rating,
  ratingsCount,
  reviewsCount,
}: TotalRatingBarProps) => {
  return (
    <div className="w-fit flex gap-6 p-3 items-center rounded hover:bg-gray-300">
      <StarRating rating={rating} />

      <LabelText text={`${ratingsCount.toLocaleString("en-US")} ratings`} />

      <p className="text-gray-600 text-sm">
        {ratingsCount.toLocaleString("en-US")} ratings
      </p>

      <p className="text-gray-600 text-sm">
        {reviewsCount.toLocaleString("en-US")} reviews
      </p>
    </div>
  );
};
