interface AuthorBooksHeaderProps {
  authorName?: string;
  averageRating?: number;
  ratingCount?: number;
  totalReviews: number;
}

export const AuthorBooksHeader = ({
  authorName,
  averageRating,
  ratingCount,
  totalReviews,
}: AuthorBooksHeaderProps) => {
  return (
    <>
      <p className="lg:hidden border-t border-[#CCCCCC] px-2.5 pt-2.5 text-lg">
        {authorName}'s Books
      </p>

      <p className="text-[#999999] px-2.5 pb-2.5 lg:hidden">
        Avg rating: {averageRating} · {ratingCount} ratings · {totalReviews}{" "}
        reviews
      </p>

      <p className="hidden lg:block uppercase mb-2.5 mt-5 text-sm font-semibold py-1 border-b border-[#CCCCCC]">
        {authorName}'s books
      </p>

      <p className="hidden lg:block pl-1.25 pb-2.5 text-xs">
        Avg rating: {averageRating} · {ratingCount} ratings · {totalReviews}{" "}
        reviews
      </p>
    </>
  );
};
