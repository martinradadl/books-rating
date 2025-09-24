import { LabelText } from "./label-text";
import { StarRating } from "./star-rating";

type TotalRatingBarProps = {
  rating: number;
  ratingsCount: number;
  reviewsCount: number;
  cursorPointer?: boolean;
};


export const TotalRatingBar = ({
  rating,
  ratingsCount,
  reviewsCount,
  cursorPointer
}: TotalRatingBarProps) => {
  return (
    <div className={`w-fit flex gap-6 px-1 py-3 items-center rounded ${cursorPointer ? 'cursor-pointer' : ''} hover:bg-gray-200`}>
      <StarRating rating={rating} />

      <LabelText text={`${ratingsCount.toLocaleString("en-US")} ratings`} />
      <LabelText text={`${reviewsCount.toLocaleString("en-US")} reviews`} />
    </div>
  );
};
