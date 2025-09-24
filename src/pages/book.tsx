import { useState } from "react";
import { StarRating } from "../components/star-rating";
import { MdMenuBook } from "react-icons/md";
import { TotalRatingBar } from "../components/total-rating-bar";
import { formatNumberShort } from "../helpers/utils";
import { LabelText } from "../components/label-text";
import { ExpandableButton } from "../components/expandable-button";
import { BooksCarousel } from "../components/books-carousel";
import { RatingDistribution } from "../components/star-rating-histogram";
import { Review } from "../components/review";
import { Separator } from "../components/separator";
import { PillButton } from "../components/pill-button";

const AvatarGroup = () => {
  return (
    <div className="flex -space-x-3">
      <div className="w-8 h-8 rounded-full border-2 border-gray" />
      <div className="w-8 h-8 rounded-full border-2 border-gray" />
      <div className="w-8 h-8 rounded-full border-2 border-gray" />
    </div>
  );
};

const SectionTitle = ({ name }: { name: string }) => {
  return (<p className="text-2xl font-bold">{name}</p>)
}

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
    <div className="flex max-w-6xl w-full m-auto md:w-auto">

      {/* Book Cover Container */}


      <div className="w-72 p-4 sticky top-0 self-start flex flex-col gap-4 items-center">
        <div className="w-48 aspect-2/3 bg-gray-600" /> {/* Book Cover */}

        <PillButton label="Want to Read" className="w-60 bg-green-800 hover:bg-green-700 focus:ring-green-800" />

        <StarRating interactive />

        <LabelText text="Rate this book" className="cursor-pointer" />
      </div>


      {/* Main Content */}


      <div className="flex flex-col flex-1 overflow-y-auto p-6">
        <p className="text-5xl font-semibold">{Title}</p>

        <p className="text-4xl cursor-pointer hover:underline">
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

        <p className="text-base mb-4">
          {showFullDescription
            ? bookDescription
            : `${bookDescription.slice(0, 440)}...`}
        </p>

        <ExpandableButton
          label="Show more"
          isExpanded={showFullDescription}
          setIsExpanded={setShowFullDescription}
        />

        <div className="flex flex-col gap-4 py-6">
          <div className="flex py-2 gap-2 items-center">
            <LabelText text="Genres" />

            {relatedGenres.map((genre, index) => (
              <label
                key={index}
                className="cursor-pointer underline underline-offset-4 decoration-3 decoration-green-700"
              >
                {genre}
              </label>
            ))}
          </div>

          <LabelText text={`${pagesCount} pages, ${format}`} />

          <LabelText text={`First published ${firstPublished}`} />
        </div>

        {showDetails && (
          <>
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

            <p className="text-base font-bold mt-2">More editions</p>

            <BooksCarousel bookWidth={36} showAllLabel="Show all editions" />
          </>
        )}

        <ExpandableButton
          label="Book details & editions"
          expandedLabel="Fewer details"
          isExpanded={showDetails}
          setIsExpanded={setShowDetails}
        />

        <Separator className={'my-8'} />

        <div className="flex">
          <div className="flex flex-1 justify-center items-center gap-2">
            <AvatarGroup />
            <LabelText text={`${currentlyReadingCount} people are currently reading`} />
          </div>

          <div className="flex flex-1 justify-center items-center gap-2">
            <AvatarGroup />
            <LabelText text={`${wantToReadCount} people want to read`} />
          </div>
        </div>

        <Separator className={'my-8'} />

        <SectionTitle name="About the author" />

        <div className="flex py-2 gap-4 items-center">
          <div className="w-16 h-16 rounded-full bg-gray-600" /> {/* Author's profile pic*/}

          <div className="flex flex-col flex-1">
            <p className="font-semibold text-lg cursor-pointer hover:underline">{authorName}</p>

            <LabelText text={`${authorBooksCount} books - ${formatNumberShort(
              authorFollowersCount
            )} followers`} />
          </div>

          <PillButton label="Follow" className="px-8" />
        </div>

        <p className="text-base my-6">
          {showFullAuthorDescription
            ? authorDescription
            : `${authorDescription.slice(0, 300)}...`}
        </p>

        <ExpandableButton
          label="Show more"
          isExpanded={showFullAuthorDescription}
          setIsExpanded={setShowFullAuthorDescription}
        />

        <Separator className={'my-8'} />

        <SectionTitle name="Readers also enjoyed" />

        <BooksCarousel bookWidth={40} showAllLabel="All similar books" />

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

            <PillButton label="Write a Review" className="px-6" />
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

        <LabelText text={`Displaying 1 - 20 of ${reviewsCount.toLocaleString()} reviews`} />

        <Review />

        <Review />
      </div>
    </div>
  );
};
