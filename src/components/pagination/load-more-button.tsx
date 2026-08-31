import classNames from "classnames";
import { FaSpinner } from "react-icons/fa";

interface LoadMoreButtonProps {
  currentPage: number;
  totalPages: number;
  status: string;
  isRequestingNextPage: boolean;
  handleNextPage: (totalPages: number) => void;
  className?: string;
}

export const LoadMoreButton = ({
  currentPage,
  totalPages,
  status,
  isRequestingNextPage,
  handleNextPage,
  className,
}: LoadMoreButtonProps) => {
  return (
    <button
      className={classNames(
        "w-full text-sm flex justify-center items-center bg-[#F4F1EA] border border-[#D6D0C4] rounded py-2 px-3 cursor-pointer hover:underline",
        {
          hidden:
            currentPage >= totalPages &&
            status !== "loading" &&
            !isRequestingNextPage,
        },
        className
      )}
      onClick={() => {
        handleNextPage(totalPages);
      }}
    >
      {status === "loading" ? (
        <FaSpinner size={20} className="animate-spin" />
      ) : (
        "Load More"
      )}
    </button>
  );
};
