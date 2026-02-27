import { useEffect, useMemo, useState } from "react";
import { StarRating } from "../components/ratings/star-rating";
import { MdMenuBook } from "react-icons/md";
import { formatNumberShort } from "../helpers/utils";
import { LabelText } from "../components/label-text";
import { ExpandableContent } from "../components/expandable-content";
import { BooksCarousel } from "../components/books-carousel";
import { RatingDistribution } from "../components/ratings/star-rating-histogram";
import { Review } from "../components/reviews/review";
import { Separator } from "../components/separator";
import { PillButton } from "../components/buttons/pill-button";
import { SectionTitle } from "../components/section-title";
import { AvatarGroup } from "../components/editions/avatar-group";
import classNames from "classnames";
import { ProfilePic } from "../components/profile-pic";
import { BookCover } from "../components/editions/book-cover";
import { SearchReviewBar } from "../components/reviews/search-review-bar";
import { DiscussionOptions } from "../components/editions/discussion-options";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import type { RootState } from "../redux/store";
import editionsActions from "../redux/actions/editions";
import { useParams } from "react-router-dom";
import { format } from 'date-fns';
import { BookActions } from "../components/editions/book-actions";
import { TotalRatingBar } from "../components/ratings/total-rating-bar";

const reviewsCount = 123456;

const currentlyReadingCount = 227534;
const wantToReadCount = 2859419;

const authorBooksCount = 1657;
const authorFollowersCount = 49622;

export const BookEdition = () => {
  const { selectedEdition, status, moreEditionsFromBook, relatedBooks, booksBySameAuthor } = useAppSelector((state: RootState) => state.editions)
  const { title, book, description, pagesCount, format: editionFormat, published, ISBN, ASIN, language, cover, averageRating = 0, ratingCount = 0 } = selectedEdition || {};
  const { author, firstPublished, relatedGenres } = book || {};

  const formattedDate = (date: Date) => format(date, 'MMMM dd, yyyy')

  const editionDetails = useMemo(() => (
    [
      { label: "Format", value: `${pagesCount} pages, ${editionFormat}` },
      { label: "Published", value: formattedDate(published || new Date()) },
      {
        label: "ISBN",
        value: ISBN,
      },
      { label: "ASIN", value: ASIN },
      { label: "Language", value: language },
    ]
  ), [ASIN, ISBN, editionFormat, language, pagesCount, published]);

  const params = useParams();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showFullAuthorDescription, setShowFullAuthorDescription] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(editionsActions.cleanUp());
    }
  }, [dispatch])

  useEffect(() => {
    if (params.id) {
      dispatch(editionsActions.getById(params.id));
    }
  }, [dispatch, params.id]);

  useEffect(() => {
    if (params.id && selectedEdition?.book._id) {
      dispatch(editionsActions.getMoreEditionsFromBook({ id: params.id, bookId: selectedEdition?.book._id }));
    }
  }, [dispatch, params.id, selectedEdition?.book._id])

  useEffect(() => {
    if (selectedEdition?.book.author._id && selectedEdition?.book._id) {
      dispatch(editionsActions.getRelatedBooks({ authorId: selectedEdition?.book.author._id, bookId: selectedEdition?.book._id }));
      dispatch(editionsActions.getBooksBySameAuthor({ authorId: selectedEdition?.book.author._id, bookId: selectedEdition?.book._id }));
    }
  }, [dispatch, selectedEdition?.book._id, selectedEdition?.book.author._id]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-96">
        <p className="text-4xl font-semibold">Loading edition...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col w-[91%] xl:max-w-[1260px] 2xl:w-[87.5%] m-auto pb-6">
      <div className="flex flex-col md:flex-row pt-4 md:gap-[3%] lg:gap-[2%] xl:gap-[1.7%]">
        <div className="w-full md:flex-1 md:sticky md:top-26 self-start flex flex-col gap-4 items-center">
          <BookCover className="w-48 xl:w-7/10" image={cover || ""} />

          <BookActions userRating={userRating} setUserRating={setUserRating} />
        </div>

        <div className="flex flex-col md:flex-2 lg:flex-3 flex-1 overflow-y-auto lg:pl-8">
          <div className="flex flex-col items-center md:items-start">
            <p className="text-5xl font-semibold text-center md:text-left">{title}</p>

            <p className="text-4xl cursor-pointer hover:underline focus:ring-3 focus:ring-offset-2 rounded" tabIndex={0}>
              {author?.name}
            </p>

            <TotalRatingBar
              {...{
                ratingCount,
                averageRating,
                reviewsCount,
                className: 'cursor-pointer'
              }}
            />
          </div>

          <BookActions showOnMobileView />

          <ExpandableContent
            label="Show more"
            isExpanded={showFullDescription}
            setIsExpanded={setShowFullDescription}
            content={
              <p className={classNames("text-base lg:w-8/9 xl:w-7/9", { 'max-h-32 overflow-hidden mb-6': !showFullDescription })}>
                {description}
              </p>
            }
          />

          <div className="flex flex-col gap-4 pt-6 pb-10">
            <div className="flex flex-wrap py-2 gap-2 items-center">
              <LabelText text="Genres" />

              {relatedGenres?.map((genre, index) => (
                <label
                  key={index}
                  className="cursor-pointer underline underline-offset-4 decoration-3 decoration-green-700 focus:ring-3 focus:ring-offset-2 rounded"
                  tabIndex={0}
                >
                  {genre.name}
                </label>
              ))}
            </div>

            <LabelText text={`${pagesCount} pages, ${editionFormat}`} />

            <LabelText text={`First published ${formattedDate(firstPublished || new Date())}`} />
          </div>

          <ExpandableContent
            label="Book details & editions"
            expandedLabel="Fewer details"
            isExpanded={showDetails}
            setIsExpanded={setShowDetails}
            content={
              !showDetails ?
                <div className="h-4" />
                :
                <div className="mb-10">
                  <p className="text-base font-bold py-2">This edition</p>

                  <div className="grid gap-y-2 my-6">
                    {editionDetails.filter((detail) => detail.value).map((detail) => (
                      <div key={detail.label} className="flex">
                        <div className="w-32">
                          <LabelText text={detail.label} />
                        </div>
                        <div className="text-base text-gray-600">
                          {detail.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className={!showDetails ? 'my-4' : 'hidden'} />

                  {moreEditionsFromBook.length > 0 && <BooksCarousel
                    title={<p className="text-base font-bold mt-2">More editions</p>}
                    editionsList={moreEditionsFromBook}
                    showAllLabel="Show all editions"
                    isMoreEditions
                  />}
                </div>
            }
          />

          <Separator className={'my-8'} />

          <div className="w-full sm:hidden">
            <div className="mx-auto max-w-md grid gap-y-4">
              <div className="flex items-center justify-center gap-2">
                <AvatarGroup />
                <div className="w-50">
                  <LabelText text={`${currentlyReadingCount} people are currently reading`} />
                </div>
              </div>

              <div className="flex items-center justify-center gap-2">
                <AvatarGroup />
                <div className="w-50">
                  <LabelText text={`${wantToReadCount} people want to read`} />
                </div>
              </div>
            </div>
          </div>

          <div className="hidden sm:flex">
            <div className="flex items-center gap-2 justify-center flex-1">
              <AvatarGroup />
              <LabelText text={`${currentlyReadingCount} people are currently reading`} />
            </div>

            <div className="flex items-center gap-2 justify-center flex-1">
              <AvatarGroup />
              <LabelText text={`${wantToReadCount} people want to read`} />
            </div>
          </div>

          <Separator className={'my-8'} />

          <SectionTitle name="About the author" />

          <div className="flex py-2 gap-4 items-center">
            <ProfilePic image={author?.profilePic} />

            <div className="flex flex-col flex-1 min-w-0">
              <p className="w-fit font-semibold text-lg cursor-pointer hover:underline truncate focus:ring-3 rounded" tabIndex={0}>
                {author?.name}
              </p>

              <LabelText text={`${authorBooksCount} books · ${formatNumberShort(
                authorFollowersCount
              )} followers`} className="truncate" />
            </div>

            <PillButton label="Follow" className="px-8" />
          </div>

          <ExpandableContent
            label="Show more"
            isExpanded={showFullAuthorDescription}
            setIsExpanded={setShowFullAuthorDescription}
            content={
              <p className={classNames("text-base my-6 lg:w-8/9 xl:w-7/9", { 'max-h-20 mb-6 overflow-hidden': !showFullAuthorDescription })}>
                {author?.description}
              </p>
            }
          />

          <Separator className={'my-8'} />

          {relatedBooks.length > 0 && <BooksCarousel
            editionsList={relatedBooks}
            showAllLabel="All similar books"
            title={<SectionTitle name="Readers also enjoyed" />}
          />}

          <Separator className={'my-8'} />

          <SectionTitle name="Ratings & Reviews" />

          <div className="flex flex-col justify-center items-center gap-4 py-2">
            <MdMenuBook size={48} />

            <p className="text-3xl font-bold">What do you think?</p>

            <div className="flex gap-6 items-center">
              <div className="flex flex-col items-center gap-2">
                <StarRating interactive userRating={userRating} setUserRating={setUserRating} />
                <LabelText text="Rate this book" className="cursor-pointer" />
              </div>

              <PillButton label="Write a Review" className="px-6 whitespace-nowrap" />
            </div>
          </div>

          <Separator className={'my-8'} />

          <SectionTitle name="Community Reviews" />

          <TotalRatingBar
            {...{
              ratingCount,
              averageRating,
              reviewsCount,
            }}
          />

          <RatingDistribution bookId={book?._id || ""} />

          <SearchReviewBar />

          <LabelText text={`Displaying 1 - 20 of ${reviewsCount.toLocaleString()} reviews`} />

          <Review />

          <Review />
        </div>
      </div>

      <SectionTitle name="Join the discussion" />

      <DiscussionOptions />

      {booksBySameAuthor.length > 0 && <BooksCarousel
        title={<SectionTitle>
          Other books by <span className="italic">{author?.name}</span>
        </SectionTitle>}
        editionsList={booksBySameAuthor}
        showAllLabel="All books by this author"
        isBooksBySameAuthor
      />}
    </div>

  );
};
