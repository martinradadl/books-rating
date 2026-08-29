import classNames from "classnames";
import { Fragment } from "react/jsx-runtime";

interface PagesShownParams {
  basePagesCount?: number;
  middlePagesCountBySide?: number;
  totalPages: number;
}

interface PageSelectorProps {
  currentPage: number;
  totalPages: number;
  handleChangePage: (page: number) => void;
  handleNextPage: (totalPages: number) => void;
  handlePreviousPage: () => void;
  pagesShown: (params: PagesShownParams) => number[];
}

export const PageSelector = ({
  currentPage,
  totalPages,
  handleChangePage,
  handleNextPage,
  handlePreviousPage,
  pagesShown,
}: PageSelectorProps) => {
  return (
    <div className="flex text-xs gap-1">
      <p
        className={classNames({
          "text-[#00635d] cursor-pointer hover:underline": currentPage > 1,
        })}
        onClick={handlePreviousPage}
      >
        ← Previous
      </p>

      {pagesShown({ totalPages }).map((page, index, arr) => (
        <Fragment key={page}>
          {index > 0 && page - arr[index - 1] > 1 && <p>...</p>}

          <p
            className={classNames({
              "text-[#00635d] cursor-pointer hover:underline":
                currentPage !== page,
            })}
            onClick={() => handleChangePage(page)}
          >
            {page}
          </p>
        </Fragment>
      ))}

      <p
        className={classNames({
          "text-[#00635d] cursor-pointer hover:underline":
            currentPage < totalPages,
        })}
        onClick={() => {
          handleNextPage(totalPages);
        }}
      >
        Next →
      </p>
    </div>
  );
};
