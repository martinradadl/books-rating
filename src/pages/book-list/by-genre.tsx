import { useNavigate, useParams } from "react-router-dom";
import { textToUrlSlug, urlSlugToCapitalizedText } from "../../helpers/utils";
import { BooksCarousel } from "../../components/books-carousel";
import { MdArrowForwardIos } from "react-icons/md";
import { BookCover } from "../../components/editions/book-cover";
import { usePaginationManager } from "../../hooks/pagination-manager";
import { LoadMoreButton } from "../../components/pagination/load-more-button";
import { PageSelector } from "../../components/pagination/page-selector";
import type { RootState } from "../../redux/store";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Loading } from "../../components/loading";
import { useEffect } from "react";
import bookListsActions from "../../redux/actions/book-lists";
import genresActions from "../../redux/actions/genres";

const pageLimit = 4;

export const BookListsByGenre = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const genreName = urlSlugToCapitalizedText(params.genre as string);
  const { bookListsByGenre, bookListsCount, status } = useAppSelector(
    (state: RootState) => state.bookLists
  );
  const { mostCommonRelatedGenresOnBookLists, status: genresStatus } =
    useAppSelector((state: RootState) => state.genres);
  const totalPages = Math.ceil(bookListsCount / pageLimit);

  const {
    currentPage,
    isRequestingNextPage,
    setIsRequestingNextPage,
    setIsViewportSwitching,
    pagesShown,
    handlePreviousPage,
    handleChangePage,
    handleNextPage,
    isDesktop,
  } = usePaginationManager();

  useEffect(() => {
    if (params.genre) {
      dispatch(
        bookListsActions.getByRelatedGenre({
          genreUrl: params.genre,
          limit: pageLimit,
          page: currentPage,
          isMobile: !isDesktop,
          itemLimit: 5,
        })
      );
    }
  }, [dispatch, params.genre, currentPage, isDesktop]);

  useEffect(() => {
    dispatch(genresActions.getMostCommonRelatedGenresOnBookLists(10));
  }, [dispatch]);

  useEffect(() => {
    if (status !== "loading") {
      setIsRequestingNextPage(false);
      setIsViewportSwitching(false);
    }
  }, [status, setIsRequestingNextPage, setIsViewportSwitching]);

  if (
    (status === "loading" || genresStatus === "loading") &&
    !bookListsByGenre
  ) {
    return <Loading />;
  }

  return (
    <div>
      <div className="lg:hidden">
        <p className="mx-2.5 my-5 text-2xl">{genreName} Book Lists</p>

        <div className="mx-2.5 mb-[15px] max-w-[838px]">
          {bookListsByGenre.map((bookList, index) => (
            <div key={index}>
              <BooksCarousel
                title={<></>}
                editionsList={bookList.books || []}
                isBookListPreview
              />

              <div
                className="flex place-content-between w-full cursor-pointer mb-6"
                onClick={() =>
                  navigate(`/list/${textToUrlSlug(bookList.title)}`)
                }
              >
                <div className="flex flex-col">
                  <p className="text-base">{bookList.title}</p>
                  <p className="text-sm text-gray-400">
                    {bookList.booksCount} books
                  </p>
                </div>
                <div className="font-extrabold">
                  <MdArrowForwardIos className="scale-120" size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-2.5">
          <LoadMoreButton
            {...{
              currentPage,
              totalPages,
              handleNextPage: handleChangePage,
              isRequestingNextPage,
              status,
              className: "max-w-[838px]",
            }}
          />
        </div>
      </div>

      <div className="hidden lg:flex w-[970px] mx-auto mt-[15px]">
        <div className="h-20 w-[643px] pl-2 pr-2.5">
          <p className="text-xl font-bold mb-[15px]">
            <span
              className="text-[#00635d] cursor-pointer hover:underline"
              onClick={() => {
                navigate(`/list`);
              }}
            >
              Lists
            </span>{" "}
            {">"} {genreName} Book Lists
          </p>

          <div className="grid grid-cols-2 gap-2">
            {bookListsByGenre.map((bookList, index) => (
              <div key={index} className="pb-2.5 px-[9px] text-xs">
                <div className="mb-[5px] flex">
                  {bookList.books?.map((edition, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        navigate(`/edition/${edition._id}`);
                      }}
                    >
                      <BookCover
                        image={edition.cover}
                        className="w-[55px] h-[80px] mr-0.5 cursor-pointer"
                        withoutRoundedCorners
                      />
                    </div>
                  ))}
                </div>

                <p
                  className="w-fit font-bold text-[#00635d] cursor-pointer hover:underline"
                  onClick={() => {
                    navigate(`/list/${textToUrlSlug(bookList.title)}`);
                  }}
                >
                  {bookList.title}
                </p>

                <p className="text-[#999]">{bookList.booksCount} books</p>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="py-2.5">
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
          )}
        </div>

        <div className="h-20 w-[300px] ml-2">
          <div className="py-2.5 text-xs">
            <p className="uppercase font-semibold mb-2.5 h-6 border-b border-[#D8D8D8]">
              Browse by genre
            </p>

            <div className="flex mb-5 h-[21px]">
              <input
                type="text"
                placeholder="Search for a Genre"
                className="border border-[#DCD6CC] p-0.5 w-3/4 rounded"
              />

              <button className="ml-1 border border-[#D6D0C4] bg-[#F4F1EA] px-3 rounded cursor-pointer hover:bg-[#EDE6D6]">
                Search
              </button>
            </div>

            <div className="grid grid-cols-2 gap-y-0.5 mb-8">
              {mostCommonRelatedGenresOnBookLists.map((genre) => (
                <p
                  key={genre.name}
                  className="text-[#00635d] w-fit hover:underline cursor-pointer"
                  onClick={() => {
                    navigate(`/list/genre/${genre.slug}`);
                  }}
                >
                  {genre.name}{" "}
                  <span className="text-black">{`(${genre.bookListsCount})`}</span>
                </p>
              ))}
            </div>

            <div className="bg-gray-400 h-[250px]">
              <p className="text-gray-100 ml-2 mr-2">ad</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
