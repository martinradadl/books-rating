import { useNavigate } from "react-router-dom";
import type { GenreI } from "../../data-structures";

interface GenreAutocompleteItemProps {
    item: GenreI;
}

export const GenreAutocompleteItem = ({ item }: GenreAutocompleteItemProps) => {
    const { name, slug } = item;
    const navigate = useNavigate();

    const handleOnClick = () => {
        navigate(`/genres/${slug}`)
    }
        
    
    return (
        <p className="flex items-center h-[40px] px-4 font-bold text-sm cursor-pointer border-b border-[#D8D8D8] bg-white hover:bg-[#f2f2f2] z-10"
        onClick={handleOnClick}>
            {name}
        </p>
    )
}