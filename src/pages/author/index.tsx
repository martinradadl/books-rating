import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import type { RootState } from "../../redux/store";
import { usePaginationManager } from "../../hooks/pagination-manager";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import authorsActions from "../../redux/actions/authors";
import genresActions from "../../redux/actions/genres";
import editionsActions from "../../redux/actions/editions";
import { BookListItemSkeleton } from "../../components/book-lists/item-skeleton";
import { BookListItem } from "../../components/book-lists/item";
import { PageSelector } from "../../components/pagination/page-selector";
import { LoadMoreButton } from "../../components/pagination/load-more-button";
import { AuthorProfileMobile } from "../../components/author/profile-mobile";
import { AuthorDetailsDesktop } from "../../components/author/details-desktop";
import { AuthorBooksHeader } from "../../components/author/books-header";
import { AuthorDetailsMobile } from "../../components/author/details-mobile";

const pageLimit = 4;
const DESCRIPTION_MAX_LENGTH_MOBILE = 280;
const DESCRIPTION_MAX_LENGTH_DESKTOP = 400;

const authorTotalReviews = 567;
const authorFollowersCount = 1234;

export const Author = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
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

  const toggleFullDescription = () =>
    setShowFullDescription(!showFullDescription);

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
          className="w-auto h-[208px]"
        />
      </div>

      <div className="lg:w-[625px] lg:ml-3">
        <AuthorProfileMobile
          profilePic={selectedAuthor?.profilePic ?? ""}
          name={selectedAuthor?.name ?? ""}
          followersCount={authorFollowersCount}
        />

        {selectedAuthor && (
          <AuthorDetailsDesktop author={selectedAuthor} genres={authorGenres} />
        )}

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

        <AuthorBooksHeader
          authorName={selectedAuthor?.name}
          averageRating={selectedAuthor?.averageRating}
          ratingCount={selectedAuthor?.ratingCount}
          totalReviews={authorTotalReviews}
        />

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

        {selectedAuthor && (
          <AuthorDetailsMobile author={selectedAuthor} genres={authorGenres} />
        )}
      </div>
    </div>
  );
};
