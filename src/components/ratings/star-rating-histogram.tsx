import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import type { RootState } from "../../redux/store";
import { LabelText } from "../label-text";
import ratingsActions from "../../redux/actions/ratings";
import { numberToLocaleString } from "../../helpers/utils";

interface RatingDistributionProps {
  bookId: string;
}

export const RatingDistribution = ({ bookId }: RatingDistributionProps) => {
  const { distribution } = useAppSelector((state: RootState) => state.ratings)
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (bookId) {
      dispatch(ratingsActions.getRatingDistributionByScore(bookId))
    }
  }, [dispatch, bookId])

  return (
    <div className="w-full max-w-xl space-y-4">
      {[5, 4, 3, 2, 1].map((score) => {
        const ratingCount = distribution[score];
        const percent = ((ratingCount / distribution.total) * 100);

        return (
          <div key={score} className="flex items-center cursor-pointer my-4 group focus:ring-3 focus:ring-offset-3 rounded-full" tabIndex={0}>
            <div className="w-16 underline text-base font-bold">
              {score} {score === 1 ? "star" : "stars"}
            </div>

            <div className="flex-1 px-1 py-3 rounded-full group-hover:bg-gray-300">
              <div className="flex-1 mx-2 h-3 bg-gray-200 rounded-full relative">
                <div
                  className={`h-full bg-yellow-500 rounded-full`}
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>

            <div className="w-32 text-left text-gray-700 group-hover:underline">
              <LabelText text={`${numberToLocaleString(distribution[score])} (${Math.round(percent)}%)`} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

