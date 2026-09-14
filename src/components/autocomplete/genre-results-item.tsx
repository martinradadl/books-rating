import { useNavigate } from "react-router-dom";
import type { GenreI } from "../../data-structures";
import { twMerge } from "tailwind-merge";

interface GenreAutocompleteItemProps {
    item: GenreI;
    isOnBookLists?: boolean;
    className?: string;
}

export const GenreAutocompleteItem = ({ item, isOnBookLists, className }: GenreAutocompleteItemProps) => {
    const { name, slug } = item;
    const navigate = useNavigate();

    const handleOnClick = () => {
        navigate(isOnBookLists ? `/list/genre/${slug}` : `/genres/${slug}`)
    }

    return (
        <p className={twMerge(
            "flex items-center h-[40px] px-4 font-bold text-sm cursor-pointer border-b border-[#D8D8D8] bg-white hover:bg-[#f2f2f2] z-10",
            !className && "w-screen lg:w-[508px]",
            className)}
            onClick={handleOnClick}>
            {name}
        </p>
    )
}