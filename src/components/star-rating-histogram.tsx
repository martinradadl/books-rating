import React from "react";
import { LabelText } from "./label-text";

interface Rating {
  stars: number;
  count: number;
}

interface Props {
  ratings: Rating[];
}

export const RatingDistribution: React.FC<Props> = ({ ratings }) => {
  const total = ratings.reduce((sum, rating) => sum + rating.count, 0);

  return (
    <div className="w-full max-w-xl space-y-4">
      {ratings.map((rating) => {
        const percent = ((rating.count / total) * 100);

        return (
          <div key={rating.stars} className="flex items-center cursor-pointer my-4 group">
            <div className="w-16 underline text-base font-bold">
              {rating.stars} {rating.stars === 1 ? "star" : "stars"}
            </div>

            <div className="flex-1 px-1 py-3 rounded-full group-hover:bg-gray-300">
              <div className="flex-1 mx-2 h-3 bg-gray-200 rounded-full relative">
                <div
                  className={`h-full bg-yellow-500 rounded-full`}
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>

            <div className="w-32 text-right text-gray-700 group-hover:underline">
              <LabelText text={`${rating.count.toLocaleString()} (${Math.round(percent)}%)`} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

