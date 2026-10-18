import { useState } from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import type { AuthorI, GenreI } from "../../data-structures";
import { formattedDate } from "../../helpers/utils";
import { useNavigateToGenres } from "../../hooks/navigateToGenres";

interface AuthorDetailsMobileProps {
  author: AuthorI;
  genres: GenreI[];
}

export const AuthorDetailsMobile = ({
  author,
  genres,
}: AuthorDetailsMobileProps) => {
  const { handleNavigateToGenres } = useNavigateToGenres();
  const [showAuthorDetails, setShowAuthorDetails] = useState(false);

  const toggleAuthorDetails = () => setShowAuthorDetails(!showAuthorDetails);

  return (
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
            <p>Born in {author?.birthplace}</p>
            <p>Born on {formattedDate(author?.birthdate || new Date())}</p>
            {author?.deathdate && (
              <p>Died on {formattedDate(author?.deathdate || new Date())}</p>
            )}

            <div className="flex my-3.5">
              <p className="font-bold text-black mr-1">Genres:</p>

              <div>
                {genres.map((genre, index) => (
                  <span
                    key={genre.name}
                    className="text-[#00635D] cursor-pointer hover:underline"
                    onClick={() => handleNavigateToGenres(genre.slug || "")}
                  >
                    {genre.name}
                    {index < genres.length - 1 && ", "}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
