import type { GenreI } from "../../data-structures";
import { useNavigateToGenres } from "../../hooks/navigateToGenres";

interface MoreGenresListDesktopProps {
  list: GenreI[];
}

export const MoreGenresListDesktop = ({ list }: MoreGenresListDesktopProps) => {
  const { handleNavigateToGenres } = useNavigateToGenres();

  return (
    <div className="text-xs pb-5 grid grid-cols-2">
      {list.map((genre) => (
        <p
          key={genre.name}
          className="w-fit leading-[18px] cursor-pointer hover:underline text-[#00635d]"
          onClick={() => {
            handleNavigateToGenres(genre.slug || "");
          }}
        >
          {genre.name}
        </p>
      ))}
    </div>
  );
};
