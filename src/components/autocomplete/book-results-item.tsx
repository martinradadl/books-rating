import { BookCover } from "../editions/book-cover";
import type { EditionPreviewI } from "../../data-structures";
import { useNavigate } from "react-router-dom";


interface BookAutocompleteItemProps {
    item: EditionPreviewI;
    setIsOpen: (isOpen: boolean) => void;
    setIsMobileHeaderSearchBarOpen?: (isOpen: boolean) => void;
}

export const BookAutocompleteItem = ({ item, setIsOpen, setIsMobileHeaderSearchBarOpen }: BookAutocompleteItemProps) => {
    const navigate = useNavigate();
    const { _id, book, cover, title } = item;
    const { author } = book;

    const handleOnClick = () => {
        navigate(`/edition/${_id}`)
        setIsOpen(false);
        if (setIsMobileHeaderSearchBarOpen) {
            setIsMobileHeaderSearchBarOpen(false);
        }
    }

    return (
        <div className="w-screen md:w-[376px] md:ml-5 h-[55px] py-2 pl-5 pr-4 overflow-hidden border-b border-[#D8D8D8] bg-white z-50"
            onClick={handleOnClick}
        >
            <div className={"flex cursor-pointer"}>
                <BookCover image={cover} className="w-[50px] mr-2" withoutRoundedCorners />

                <div className="flex flex-1 flex-col">
                    <p className="font-bold text-sm leading-[18px]">
                        {title}
                    </p>
                    <p className="mt-1 text-xs leading-[19px]">{author.name}</p>
                </div>
            </div>
        </div>
    )
}