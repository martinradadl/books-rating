import { TotalRatingBar } from "./total-rating-bar";

type RatingDistributionBarProps = {
  stars: number;
  ratingsCount: number;
  totalRatingsCount: number;
};

const RatingDistributionBar = ({
  stars,
  ratingsCount,
  totalRatingsCount,
}: RatingDistributionBarProps) => {
  const percentage = (ratingsCount / totalRatingsCount) * 100;

  return (
    <div className="flex items-center gap-4">
      <p className="text-base font-bold underline">{`${stars} star${
        stars > 1 ? "s" : ""
      }`}</p>

      <div className="flex-1 h-3 rounded-full bg-gray-200 overflow-hidden">
        <div
          className="h-full bg-orange-500 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="text-sm text-gray-600 min-w-[100px] text-right">
        {ratingsCount.toLocaleString()} ({percentage.toFixed(0)}%)
      </p>
    </div>
  );
};

export const CommunityReviews = () => {
  const rating = 4.2;
  const reviewsCount = 123456;
  const ratingsCount = 5234567;
  const fiveStarsCount = 2507614;
  const fourStarsCount = 1743277;
  const threeStarsCount = 744418;
  const twoStarsCount = 196629;
  const oneStarCount = 104629;

  return (
    <div className="flex flex-col gap-4">
      <p className="text-2xl font-semibold">Community Reviews</p>

      <TotalRatingBar
        {...{
          rating,
          ratingsCount,
          reviewsCount,
        }}
      />

      <RatingDistributionBar
        stars={5}
        ratingsCount={fiveStarsCount}
        totalRatingsCount={ratingsCount}
      />
      <RatingDistributionBar
        stars={4}
        ratingsCount={fourStarsCount}
        totalRatingsCount={ratingsCount}
      />
      <RatingDistributionBar
        stars={3}
        ratingsCount={threeStarsCount}
        totalRatingsCount={ratingsCount}
      />
      <RatingDistributionBar
        stars={2}
        ratingsCount={twoStarsCount}
        totalRatingsCount={ratingsCount}
      />
      <RatingDistributionBar
        stars={1}
        ratingsCount={oneStarCount}
        totalRatingsCount={ratingsCount}
      />
    </div>
  );
};
