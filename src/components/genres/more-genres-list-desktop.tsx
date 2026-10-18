import type { GenreI } from "../../data-structures";
import { GenreListItemDesktop } from "./list-item-desktop";

interface MoreGenresListDesktopProps {
  list: GenreI[];
}

export const MoreGenresListDesktop = ({ list }: MoreGenresListDesktopProps) => {
  return (
    <div className="text-xs pb-5 grid grid-cols-2">
      {list.map((genre) => (
        <GenreListItemDesktop
          key={genre.name}
          name={genre.name}
          slug={genre.slug}
          className="w-fit leading-[18px]"
        />
      ))}
    </div>
  );
};
