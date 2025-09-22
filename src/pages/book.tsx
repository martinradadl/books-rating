import { useState } from "react";
import { StarRating } from "../components/star-rating";
import {
  MdArrowForwardIos,
  MdOutlineExpandMore,
  MdOutlineExpandLess,
  MdMenuBook,
} from "react-icons/md";
import { TotalRatingBar } from "../components/total-rating-bar";
import { formatNumberShort } from "../helpers/utils";

const AvatarGroup = () => {
  return (
    <div className="flex -space-x-3">
      <div className="w-8 h-8 rounded-full border-2 border-gray" />
      <div className="w-8 h-8 rounded-full border-2 border-gray" />
      <div className="w-8 h-8 rounded-full border-2 border-gray" />
    </div>
  );
};

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

  const [showDetails, setShowDetails] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showFullAuthorDescription, setShowFullAuthorDescription] =
    useState(false);

  return (
    <div className="flex max-w-6xl w-full m-auto md:w-auto">
      {/* Book Cover Container */}
      <div className="w-72 p-4 sticky top-0 self-start flex flex-col gap-2 items-center">
        <div className="w-48 aspect-2/3 bg-gray-600" /> {/* Book Cover */}

        <button className="inline-flex items-center justify-center !w-60 !font-bold text-white !bg-green-800 !rounded-full">
          Want to Read
        </button>

        <StarRating interactive />

        <p className="text-gray-600 text-sm cursor-pointer">Rate this book</p>
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
            className: "cursor-pointer",
          }}
        />

        <p className="text-base mb-4">
          {showFullDescription
            ? bookDescription
            : `${bookDescription.slice(0, 440)}...`}
        </p>

        {!showFullDescription && (
          <div
            className="flex items-center gap-1 cursor-pointer group"
            onClick={() => setShowFullDescription(true)}
          >
            <p className="font-semibold group-hover:underline">Show more</p>
            <MdOutlineExpandMore size={20} />
          </div>
        )}

        <div className="flex flex-col gap-4 py-6">
          <div className="flex py-2 gap-2 items-center">
            <p className="text-gray-600 text-sm">Genres</p>

            {relatedGenres.map((genre, index) => (
              <label
                key={index}
                className="cursor-pointer underline underline-offset-4 decoration-3 decoration-green-700"
              >
                {genre}
              </label>
            ))}
          </div>

          <p className="text-gray-600 text-sm">
            {`${pagesCount} pages, ${format}`}
          </p>

          <p className="text-gray-600 text-sm">
            First published {firstPublished}
          </p>
        </div>

        {showDetails && (
          <>
            <p className="text-base font-bold py-2">This edition</p>
            <div className="grid gap-y-2 my-6">
              {editionDetails.map((detail) => (
                <div key={detail.label} className="flex">
                  <div className="w-28 text-base text-gray-600">
                    {detail.label}
                  </div>
                  <div className="text-base text-gray-600">{detail.value}</div>
                </div>
              ))}
            </div>

            <p className="text-base font-bold mt-2">More editions</p>
            <div className="flex gap-6 overflow-auto my-6">
              <div className="w-36 aspect-2/3 bg-gray-600" /> {/* Book Cover */}
              <div className="w-36 aspect-2/3 bg-gray-600" /> {/* Book Cover */}
              <div className="w-36 aspect-2/3 bg-gray-600" /> {/* Book Cover */}
              <div className="w-36 aspect-2/3 bg-gray-600" /> {/* Book Cover */}
            </div>

            <div className="flex gap-2 items-center cursor-pointer group">
              <p className="font-semibold group-hover:underline">Show all editions</p>
              <MdArrowForwardIos size={16} />
            </div>
          </>
        )}

        <div
          className="flex items-center gap-1 mt-4 cursor-pointer group"
          onClick={() => setShowDetails(!showDetails)}
        >
          <p className="font-semibold group-hover:underline">
            {showDetails ? "Fewer details" : "Book details & editions"}
          </p>

          {showDetails ? (
            <MdOutlineExpandLess size={20} />
          ) : (
            <MdOutlineExpandMore size={20} />
          )}
        </div>

        <div className="h-0.5 bg-gray-400 my-8" /> {/* Separator */}

        <div className="flex">
          <div className="flex flex-1 justify-center items-center gap-2">
            <AvatarGroup />
            <p className="text-base">
              {currentlyReadingCount} people are currently reading
            </p>
          </div>

          <div className="flex flex-1 justify-center items-center gap-2">
            <AvatarGroup />
            <p className="text-base">{wantToReadCount} people want to read</p>
          </div>
        </div>

        <div className="h-0.5 bg-gray-400 my-8" /> {/* Separator */}

        <p className="text-2xl font-bold">About the author</p>

        <div className="flex py-2 gap-4 items-center">
          <div className="w-16 h-16 rounded-full bg-gray-600" /> {/* Author's profile pic*/}

          <div className="flex flex-col flex-1">
            <p className="font-semibold text-lg">{authorName}</p>
            <p className="text-gray-400">{`${authorBooksCount} books - ${formatNumberShort(
              authorFollowersCount
            )} followers`}</p>
          </div>

          <button className="!bg-black text-white !px-8 !rounded-full !font-bold">
            Follow
          </button>
        </div>

        <p className="text-base my-6">
          {showFullAuthorDescription
            ? authorDescription
            : `${authorDescription.slice(0, 300)}...`}
        </p>

        {!showFullAuthorDescription && (
          <div
            className="flex items-center gap-1 cursor-pointer group"
            onClick={() => setShowFullAuthorDescription(true)}
          >
            <p className="font-semibold group-hover:underline">Show more</p>
            <MdOutlineExpandMore size={20} />
          </div>
        )}

        <div className="h-0.5 bg-gray-400 my-8" /> {/* Separator */}

        <p className="text-2xl font-bold">Readers also enjoyed</p>

        <div className="flex gap-6 overflow-auto my-6">
          <div className="w-40 aspect-2/3 bg-gray-600" /> {/* Book Cover */}
          <div className="w-40 aspect-2/3 bg-gray-600" /> {/* Book Cover */}
          <div className="w-40 aspect-2/3 bg-gray-600" /> {/* Book Cover */}
          <div className="w-40 aspect-2/3 bg-gray-600" /> {/* Book Cover */}
        </div>

        <div className="flex items-center gap-1 cursor-pointer group">
          <p className="font-semibold group-hover:underline">All similar books</p>
          <MdArrowForwardIos size={16} />
        </div>

        <div className="h-0.5 bg-gray-400 my-8" /> {/* Separator */}

        <p className="text-3xl font-bold">Ratings & Reviews</p>

        <div className="flex flex-col justify-center items-center gap-4 py-2">
          <MdMenuBook size={48} />

          <p className="text-3xl font-bold">What do you think?</p>

          <div className="flex gap-6 items-center">
            <div className="flex flex-col items-center gap-2">
              <StarRating interactive />
              <p className="text-gray-600 text-sm cursor-pointer">
                Rate this book
              </p>
            </div>

            <button className="!bg-black text-white !px-6 !rounded-full !font-bold">
              Write a Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
