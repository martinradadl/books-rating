import { useState } from "react";
import { StarRating } from "../components/star-rating";
import { MdMenuBook } from "react-icons/md";
import { TotalRatingBar } from "../components/total-rating-bar";
import { formatNumberShort } from "../helpers/utils";
import { LabelText } from "../components/label-text";
import { ExpandableContent } from "../components/expandable-content";
import { BooksCarousel } from "../components/books-carousel";
import { RatingDistribution } from "../components/star-rating-histogram";
import { Review } from "../components/review";
import { Separator } from "../components/separator";
import { PillButton } from "../components/pill-button";
import { SectionTitle } from "../components/section-title";
import { AvatarGroup } from "../components/avatar-group";
import { BookActions } from "../components/book-actions";
import classNames from "classnames";
import { ProfilePic } from "../components/profile-pic";
import { BookCover } from "../components/book-cover";
import { SearchReviewBar } from "../components/searchReviewBar";
import { DiscussionOptions } from "../components/discussion-options";

export const Book = () => {
  const Title = "1984";
  const authorName = "George Orwell";

  const rating = 4.2;
  const ratingsCount = 5234567;
  const reviewsCount = 123456;

  const bookDescription = `A masterpiece of rebellion and imprisonment where war is peace freedom is slavery and Big Brother is watching. Thought Police, Big Brother, Orwellian - these words have entered our vocabulary because of George Orwell's classic dystopian novel 1984. The story of one man's Nightmare Odyssey as he pursues a forbidden love affair through a world ruled by warring states and a power structure that controls not only information but also individual thought and memory 1984 is a prophetic haunting tale More relevant than ever before 1984 exposes the worst crimes imaginable the destruction of truth freedom and individuality. With a foreword by Thomas Pynchon. This beautiful paperback edition features deckled edges and french flaps a perfect gift for any occasion`;

  const relatedGenres = ["Classics", "Fiction", "Science Fiction", "Dystopia"];

  const firstPublished = "June 8, 1949";
  const pagesCount = 368;
  const format = "Paperback";
  const published = "July 1, 2022";
  const ISBN = 9780452284234;
  const ASIN = "B00A2MTYAI";
  const language = "English";

  const editionDetails = [
    { label: "Format", value: `${pagesCount} pages, ${format}` },
    { label: "Published", value: published },
    {
      label: "ISBN",
      value: ISBN,
    },
    { label: "ASIN", value: ASIN },
    { label: "Language", value: language },
  ];

  const currentlyReadingCount = 227534;
  const wantToReadCount = 2859419;

  const authorBooksCount = 1657;
  const authorFollowersCount = 49622;
  const authorDescription = `Eric Arthur Blair was an English novelist, poet, essayist, journalist and critic who wrote under the pen name of George Orwell. His work is characterised by lucid prose, social criticism, opposition to all totalitarianism (both authoritarian communism and fascism), and support of democratic socialism.
Orwell is best known for his allegorical novella Animal Farm (1945) and the dystopian novel Nineteen Eighty-Four (1949), although his works also encompass literary criticism, poetry, fiction and polemical journalism. His non-fiction works, including The Road to Wigan Pier (1937), documenting his experience of working-class life in the industrial north of England, and Homage to Catalonia (1938), an account of his experiences soldiering for the Republican faction of the Spanish Civil War (1936–1939), are as critically respected as his essays on politics, literature, language and culture.
Orwell's work remains influential in popular culture and in political culture, and the adjective "Orwellian"—describing totalitarian and authoritarian social practices—is part of the English language, like many of his neologisms, such as "Big Brother", "Thought Police", "Room 101", "Newspeak", "memory hole", "doublethink", and "thoughtcrime". In 2008, The Times named Orwell the second-greatest British writer since 1945.`;

  const ratings = [
    { stars: 5, count: 2508803 },
    { stars: 4, count: 1744045 },
    { stars: 3, count: 744695 },
    { stars: 2, count: 196673 },
    { stars: 1, count: 104662 }
  ];


  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showFullAuthorDescription, setShowFullAuthorDescription] = useState(false);

  return (
    <div className="flex flex-col w-[91%] xl:max-w-[1260px] 2xl:w-[87.5%] m-auto pb-6">
      <div className="flex flex-col md:flex-row pt-4 md:gap-[3%] lg:gap-[2%] xl:gap-[1.7%]">
        <div className="w-full md:flex-1 md:sticky md:top-26 self-start flex flex-col gap-4 items-center">
          <BookCover className="w-48 xl:w-7/10" />

          <BookActions />
        </div>

        <div className="flex flex-col md:flex-2 lg:flex-3 flex-1 overflow-y-auto lg:pl-8">
          <div className="flex flex-col items-center md:items-start">
            <p className="text-5xl font-semibold">{Title}</p>

            <p className="text-4xl cursor-pointer hover:underline focus:ring-3 focus:ring-offset-2 rounded" tabIndex={0}>
              {authorName}
            </p>

            <TotalRatingBar
              {...{
                rating,
                ratingsCount,
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
                {bookDescription}
              </p>
            }
          />

          <div className="flex flex-col gap-4 pt-6 pb-10">
            <div className="flex flex-wrap py-2 gap-2 items-center">
              <LabelText text="Genres" />

              {relatedGenres.map((genre, index) => (
                <label
                  key={index}
                  className="cursor-pointer underline underline-offset-4 decoration-3 decoration-green-700 focus:ring-3 focus:ring-offset-2 rounded"
                  tabIndex={0}
                >
                  {genre}
                </label>
              ))}
            </div>

            <LabelText text={`${pagesCount} pages, ${format}`} />

            <LabelText text={`First published ${firstPublished}`} />
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
                    {editionDetails.map((detail) => (
                      <div key={detail.label} className="flex">
                        <div className="w-32">
                          <LabelText text={detail.label} />
                        </div>
                        <div className="text-base text-gray-600">{detail.value}</div>
                      </div>
                    ))}
                  </div>

                  <div className={!showDetails ? 'my-4' : 'hidden'} />

                  <p className="text-base font-bold mt-2">More editions</p>

                  <BooksCarousel showAllLabel="Show all editions" isMoreEditions />
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
            <ProfilePic />

            <div className="flex flex-col flex-1 min-w-0">
              <p className="w-fit font-semibold text-lg cursor-pointer hover:underline truncate focus:ring-3 rounded" tabIndex={0}>
                {authorName}
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
                {authorDescription}
              </p>
            }
          />

          <Separator className={'my-8'} />

          <SectionTitle name="Readers also enjoyed" />

          <BooksCarousel showAllLabel="All similar books" />

          <Separator className={'my-8'} />

          <SectionTitle name="Ratings & Reviews" />

          <div className="flex flex-col justify-center items-center gap-4 py-2">
            <MdMenuBook size={48} />

            <p className="text-3xl font-bold">What do you think?</p>

            <div className="flex gap-6 items-center">
              <div className="flex flex-col items-center gap-2">
                <StarRating interactive />
                <LabelText text="Rate this book" className="cursor-pointer" />
              </div>

              <PillButton label="Write a Review" className="px-6 whitespace-nowrap" />
            </div>
          </div>

          <Separator className={'my-8'} />

          <SectionTitle name="Community Reviews" />

          <TotalRatingBar
            {...{
              rating,
              ratingsCount,
              reviewsCount,
            }}
          />

          <RatingDistribution ratings={ratings} />

          <SearchReviewBar />

          <LabelText text={`Displaying 1 - 20 of ${reviewsCount.toLocaleString()} reviews`} />

          <Review />

          <Review />
        </div>
      </div>

      <SectionTitle name="Join the discussion" />

      <DiscussionOptions />

      <SectionTitle>
        Other books by <span className="italic">George Orwell</span>
      </SectionTitle>

      <BooksCarousel showAllLabel="All books by this author" isBooksBySameAuthor />
    </div>

  );
};
