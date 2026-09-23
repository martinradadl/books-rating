import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import type { RootState } from "../../redux/store";
import { usePaginationManager } from "../../hooks/pagination-manager";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import authorsActions from "../../redux/actions/authors";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { formattedDate } from "../../helpers/utils";
import genresActions from "../../redux/actions/genres";
import editionsActions from "../../redux/actions/editions";
import { BookListItemSkeleton } from "../../components/book-lists/item-skeleton";
import { BookListItem } from "../../components/book-lists/item";
import { PageSelector } from "../../components/pagination/page-selector";
import { LoadMoreButton } from "../../components/pagination/load-more-button";

const pageLimit = 4;
const DESCRIPTION_MAX_LENGTH_MOBILE = 280;
const DESCRIPTION_MAX_LENGTH_DESKTOP = 400;

const authorTotalReviews = 567;
const authorFollowersCount = 1234;

export const Author = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const { editionsList, editionsListTotalCount, status } = useAppSelector(
    (state: RootState) => state.editions
  );
  const { selectedAuthor, status: authorStatus } = useAppSelector(
    (state: RootState) => state.authors
  );
  const { authorGenres, status: genreStatus } = useAppSelector(
    (state: RootState) => state.genres
  );

  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showDropdownMenu, setShowDropdownMenu] = useState(false);
  const [showAuthorDetails, setShowAuthorDetails] = useState(false);

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

  const description = selectedAuthor?.description || "";
  const descriptionMaxLength = isDesktop
    ? DESCRIPTION_MAX_LENGTH_DESKTOP
    : DESCRIPTION_MAX_LENGTH_MOBILE;
  const shouldTruncate = description.length > descriptionMaxLength;

  const booksCount = editionsListTotalCount || 0;
  const totalPages = Math.ceil(booksCount / pageLimit);

  const toggleDropdownMenu = () => setShowDropdownMenu(!showDropdownMenu);
  const toggleFullDescription = () =>
    setShowFullDescription(!showFullDescription);
  const toggleAuthorDetails = () => setShowAuthorDetails(!showAuthorDetails);
  const navigateToGenrePage = (slug: string) => navigate(`/genres/${slug}`);

  useEffect(() => {
    if (params.name) {
      dispatch(authorsActions.getByUrlSlug(params.name));
      dispatch(genresActions.getGenresByAuthor({ slug: params.name }));
    }
  }, [params.name, dispatch]);

  useEffect(() => {
    if (params.name) {
      dispatch(
        editionsActions.getByAuthor({
          authorUrl: params.name,
          limit: pageLimit,
          page: currentPage,
          isMobile: !isDesktop,
        })
      );
    }
  }, [dispatch, params.name, currentPage, isDesktop]);

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

  if (
    (authorStatus === "loading" ||
      genreStatus === "loading" ||
      status === "loading") &&
    !selectedAuthor
  ) {
    return (
      <div className="flex justify-center items-center min-h-[500px]">
        <FaSpinner size={20} className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="mt-5 lg:w-[970px] lg:mx-auto lg:flex">
      <div className="hidden lg:flex justify-center w-[300px] mr-3 mt-2">
        <img
          src={selectedAuthor?.profilePic}
          alt="Author Pic"
          className="w-[200px] h-[208px]"
        />
      </div>

      <div className="lg:w-[625px] lg:ml-3">
        <div className="flex p-2.5 pb-[5px] lg:hidden">
          <img
            src={selectedAuthor?.profilePic}
            alt="Author Pic"
            className="w-[90px] h-[90px] mr-2.5"
          />

          <div>
            <p className="text-2xl leading-[26px] mb-2.5">
              {selectedAuthor?.name}
            </p>

            <div className="flex">
              <button className="w-[140px] mr-2.5 bg-[#F4F1EA] border border-[#D6D0C4] rounded-[3px] text-sm leading-3.5 px-3 py-2 cursor-pointer hover:bg-[#ede6d6]">
                Follow Author
              </button>

              <div className="relative">
                <button
                  onClick={toggleDropdownMenu}
                  className="w-[36px] h-[32px] bg-[#F4F1EA] border border-[#D6D0C4] rounded-[3px] flex items-center justify-center cursor-pointer hover:bg-[#ede6d6]"
                >
                  <MdExpandMore className="text-xl text-[#9E9E9E]" />
                </button>

                {showDropdownMenu && (
                  <div className="absolute top-[34px] left-0 w-fit bg-white border border-[#D6D0C4] shadow-sm z-50">
                    <button className="w-full whitespace-nowrap text-left text-sm p-3 hover:bg-[#ede6d6] hover:underline cursor-pointer">
                      Report this account
                    </button>
                  </div>
                )}
              </div>
            </div>

            <p className="text-sm">{authorFollowersCount} followers</p>
          </div>
        </div>

        <p className="hidden lg:block text-xl font-bold mb-2 py-1 border-b border-[#d8d8d8]">
          {selectedAuthor?.name}
        </p>

        <div className="hidden lg:block text-xs">
          <div className="flex gap-2 my-1">
            <p className="w-1/5 font-bold">Born</p>

            <div className="w-3/4">
              <p>in {selectedAuthor?.birthplace}</p>
              <p>{formattedDate(selectedAuthor?.birthdate || new Date())}</p>
            </div>
          </div>

          {selectedAuthor?.deathdate && (
            <div className="flex gap-2 my-1">
              <p className="w-1/5 font-bold">Died</p>

              <p className="w-3/4">{formattedDate(selectedAuthor.deathdate)}</p>
            </div>
          )}

          <div className="flex gap-2 my-1">
            <p className="w-1/5 font-bold">Genres</p>

            <div className="w-3/4">
              {authorGenres.map((genre, index) => (
                <span key={genre.name}>
                  <span
                    className="text-[#00635D] cursor-pointer hover:underline"
                    onClick={() => navigateToGenrePage(genre.slug || "")}
                  >
                    {genre.name}
                  </span>
                  {index < authorGenres.length - 1 && ", "}
                </span>
              ))}
            </div>
          </div>
        </div>

        <p className="px-2.5 mb-2.5 lg:px-0 lg:mt-6">
          {showFullDescription || !shouldTruncate
            ? description
            : `${description.slice(0, descriptionMaxLength)}...`}

          {shouldTruncate && (
            <span
              onClick={toggleFullDescription}
              className="ml-1 text-[#00635D] cursor-pointer hover:underline"
            >
              {showFullDescription ? "Less" : "More"}
            </span>
          )}
        </p>

        <p className="lg:hidden border-t border-[#CCCCCC] px-2.5 pt-2.5 text-lg">
          {selectedAuthor?.name}'s Books
        </p>

        <p className="text-[#999999] px-2.5 pb-2.5 lg:hidden">
          Avg rating: {selectedAuthor?.averageRating} ·{" "}
          {selectedAuthor?.ratingCount} ratings · {authorTotalReviews} reviews
        </p>

        <p className="hidden lg:block uppercase mb-2.5 mt-5 text-sm font-semibold py-1 border-b border-[#CCCCCC]">
          {selectedAuthor?.name}'s books
        </p>

        <p className="hidden lg:block pl-1.25 pb-2.5 text-xs">
          Avg rating: {selectedAuthor?.averageRating} ·{" "}
          {selectedAuthor?.ratingCount} ratings · {authorTotalReviews} reviews
        </p>

        {isViewportSwitching ? (
          <div className="flex justify-center items-center min-h-[500px]">
            <FaSpinner size={20} className="animate-spin" />
          </div>
        ) : (
          editionsList.map((item, index) =>
            loadSkeleton ? (
              <BookListItemSkeleton />
            ) : (
              <BookListItem
                isListByAuthor
                key={index}
                index={
                  (!isDesktop ? 0 : (currentPage - 1) * pageLimit) + index + 1
                }
                item={item}
              />
            )
          )
        )}

        {totalPages > 1 && (
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
        )}

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

        <div className="border-y border-[#CCCCCC] lg:hidden">
          <div
            className="flex items-center justify-between"
            onClick={toggleAuthorDetails}
          >
            <p className="text-lg mx-2.5 py-[15px]">Author Details</p>
            {showAuthorDetails ? (
              <MdExpandLess className="text-4xl" />
            ) : (
              <MdExpandMore className="text-4xl text-[#9E9E9E]" />
            )}
          </div>

          {showAuthorDetails && (
            <div className="px-2.5">
              <div className="text-[#999999]">
                <p>Born in {selectedAuthor?.birthplace}</p>
                <p>
                  Born on{" "}
                  {formattedDate(selectedAuthor?.birthdate || new Date())}
                </p>
                {selectedAuthor?.deathdate && (
                  <p>
                    Died on{" "}
                    {formattedDate(selectedAuthor?.deathdate || new Date())}
                  </p>
                )}

                <div className="flex my-3.5">
                  <p className="font-bold text-black mr-1">Genres:</p>

                  <div>
                    {authorGenres.map((genre, index) => (
                      <span
                        key={genre.name}
                        className="text-[#00635D] cursor-pointer hover:underline"
                        onClick={() => navigateToGenrePage(genre.slug || "")}
                      >
                        {genre.name}
                        {index < authorGenres.length - 1 && ", "}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
