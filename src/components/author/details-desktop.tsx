import type { AuthorI, GenreI } from "../../data-structures";
import { formattedDate } from "../../helpers/utils";
import { GenreListItemDesktop } from "../genres/list-item-desktop";

interface AuthorDetailsDesktopProps {
  author: AuthorI;
  genres: GenreI[];
}

export const AuthorDetailsDesktop = ({
  author,
  genres,
}: AuthorDetailsDesktopProps) => {
  return (
    <>
      <p className="hidden lg:block text-xl font-bold mb-2 py-1 border-b border-[#d8d8d8]">
        {author?.name}
      </p>

      <div className="hidden lg:block text-xs">
        <div className="flex gap-2 my-1">
          <p className="w-1/5 font-bold">Born</p>

          <div className="w-3/4">
            <p>in {author?.birthplace}</p>
            <p>{formattedDate(author?.birthdate || new Date())}</p>
          </div>
        </div>

        {author?.deathdate && (
          <div className="flex gap-2 my-1">
            <p className="w-1/5 font-bold">Died</p>

            <p className="w-3/4">{formattedDate(author.deathdate)}</p>
          </div>
        )}

        <div className="flex gap-2 my-1">
          <p className="w-1/5 font-bold">Genres</p>

          <div className="w-3/4">
            {genres.map((genre, index) => (
              <span key={genre.name}>
                <GenreListItemDesktop name={genre.name} slug={genre.slug} />

                {index < genres.length - 1 && ", "}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
