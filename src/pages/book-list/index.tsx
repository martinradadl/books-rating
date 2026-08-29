import { useEffect, useMemo } from "react";
import { BookListItem } from "../../components/book-lists/item";
import { HOME_DATA } from "../../data/home";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import type { RootState } from "../../redux/store";
import { useParams } from "react-router-dom";
import bookListsActions from "../../redux/actions/book-lists";
import debounce from "lodash.debounce";
import { FaSpinner } from "react-icons/fa";
import { BookListItemSkeleton } from "../../components/book-lists/item-skeleton";
import { usePaginationManager } from "../../hooks/pagination-manager";
import { LoadMoreButton } from "../../components/pagination/load-more-button";
import { PageSelector } from "../../components/pagination/page-selector";

const { NEWS_IMG_URL } = HOME_DATA;

const showFilters = true;
const decades = [1960, 1970, 1980, 1990, 2000, 2010, 2020];
const pageLimit = 4;

export const BookList = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const { selectedBookList, status } = useAppSelector(
    (state: RootState) => state.bookLists
  );

  const {
    currentPage,
    isRequestingNextPage,
    setIsRequestingNextPage,
    loadSkeleton,
    setLoadSkeleton,
    isViewportSwitching,
    setIsViewportSwitching,
    pagesShown,
    handlePreviousPage,
    handleChangePage,
    handleNextPage,
    isDesktop,
  } = usePaginationManager();

  const booksCount = selectedBookList?.booksCount || 0;
  const totalPages = Math.ceil(booksCount / pageLimit);

  const debouncedGetByTitle = useMemo(
    () =>
      debounce((args) => {
        dispatch(bookListsActions.getByTitle(args));
      }, 500),
    [dispatch]
  );

  useEffect(() => {
    if (params.title) {
      debouncedGetByTitle({
        titleUrl: params.title,
        limit: pageLimit,
        page: currentPage,
        isMobile: !isDesktop,
      });
    }
  }, [dispatch, params.title, currentPage, isDesktop, debouncedGetByTitle]);

  useEffect(() => {
    if (status !== "loading") {
      setIsRequestingNextPage(false);
      setIsViewportSwitching(false);
      setLoadSkeleton(false);
    }
  }, [
    status,
    setIsRequestingNextPage,
    setIsViewportSwitching,
    setLoadSkeleton,
  ]);

  if (status === "loading" && !selectedBookList) {
    return (
      <div className="flex justify-center items-center min-h-[500px]">
        <FaSpinner size={20} className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex justify-center mt-5">
      <div className="w-full lg:max-w-[625px] lg:px-2.5">
        <div className="mx-2.5">
          <p className="mb-2.5 font-bold text-2xl">{selectedBookList?.title}</p>

          <p className="text-[#999999] text-sm">
            {`${selectedBookList?.booksCount} books — This list was created and voted on by Book Ratings members.`}
          </p>

          <div className="my-3.5">
            {selectedBookList?.description && (
              <p className="mb-3.5">{selectedBookList?.description}</p>
            )}

            {showFilters && (
              <div className="text-sm">
                <p>Best By Decade</p>

                <p>
                  {decades.map((year, index) => (
                    <span key={year}>
                      <span className="text-[#00635D] cursor-pointer hover:underline">
                        {year}
                      </span>
                      {index < decades.length - 1 && ", "}
                    </span>
                  ))}
                </p>
              </div>
            )}
          </div>
        </div>

        {isViewportSwitching ? (
          <div className="flex justify-center items-center min-h-[500px]">
            <FaSpinner size={20} className="animate-spin" />
          </div>
        ) : (
          selectedBookList?.books?.map((item, index) =>
            loadSkeleton ? (
              <BookListItemSkeleton />
            ) : (
              <BookListItem
                key={index}
                index={
                  (!isDesktop ? 0 : (currentPage - 1) * pageLimit) + index + 1
                }
                item={item}
              />
            )
          )
        )}

        <div className="hidden lg:block py-2.5 border-t border-[#CCCCCC]">
          <PageSelector
            {...{
              currentPage,
              handleChangePage,
              handleNextPage,
              handlePreviousPage,
              pagesShown,
              totalPages,
            }}
          />
        </div>

        <div className="p-2.5 lg:hidden">
          <LoadMoreButton
            {...{
              currentPage,
              totalPages,
              handleNextPage: handleChangePage,
              isRequestingNextPage,
              status,
            }}
          />
        </div>
      </div>

      <div className="hidden lg:block w-[300px] ml-2">
        <div className="w-[300px] pb-4 text-[11px]">
          <input
            type="text"
            placeholder="Search lists"
            className="h-[21px] w-3/4 p-0.5 border border-[#DCD6CC] rounded-sm"
          />

          <button className="h-[21px] ml-1 rounded-sm border border-[#D6D0C4] bg-[#F4F1EA] px-3 cursor-pointer hover:bg-[#DED8C9]">
            Search
          </button>
        </div>

        <div className="mb-2.5 h-7">
          <p className="py-0.5 font-semibold text-xs text-[#382110] h-6 border-b border-[#D8D8D8]">
            RELATED NEWS
          </p>

          <div className="mt-2.5 mr-5 mb-3 w-full">
            <img src={NEWS_IMG_URL} alt="News Img" className="cursor-pointer" />
          </div>

          <p className="text-base text-[#00635d] font-semibold mb-3 cursor-pointer hover:underline">
            Hot & Fresh: The New Hit Books, According to Fellow Readers
          </p>

          <p className="text-sm mb-4">
            If you're looking for a new book with lots of positive early
            buzz—and you're kind of in a hurry—then today's collection is for...
          </p>

          <p className="text-sm text-[#00635d] font-semibold cursor-pointer hover:underline">
            Read more...
          </p>
        </div>
      </div>
    </div>
  );
};
