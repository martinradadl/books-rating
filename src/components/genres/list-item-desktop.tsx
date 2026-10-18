import { useNavigateToGenres } from "../../hooks/navigateToGenres";

interface GenreListItemDesktopProps {
  name: string;
  slug?: string;
  className?: string;
}

export const GenreListItemDesktop = ({
  name,
  slug,
  className = "",
}: GenreListItemDesktopProps) => {
  const { handleNavigateToGenres } = useNavigateToGenres();

  return (
    <span
      className={`cursor-pointer hover:underline text-[#00635d] ${className}`}
      onClick={() => handleNavigateToGenres(slug || "")}
    >
      {name}
    </span>
  );
};
