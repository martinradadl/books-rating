import classNames from "classnames"
import { BookCover } from "../editions/book-cover"
import type { EditionI } from "../../data-structures";
import { useNavigate } from "react-router-dom";

interface GenreListPreviewMobileProps {
    title: string;
    editions: EditionI[];
}

export const GenreListPreviewMobile = ({ title, editions }: GenreListPreviewMobileProps) => {
    const navigate = useNavigate();

    const handleClickOnEdition = (editionId: string) => {
        navigate(`/edition/${editionId}`)
    }

    return <div>
        <p className="my-3 pt-2 border-t border-[#D8D8D8] text-sm font-bold uppercase">{title}</p>

        <div className="flex justify-center">
            {editions.map((edition, index) => (
                <div key={index} className={classNames("w-[30%] max-w-[125px] flex flex-col items-center",
                    { "mr-[3%]": index < 2 })}
                >
                    <div onClick={() => { handleClickOnEdition(edition._id) }}>
                        <BookCover image={edition.cover} className="h-[200px] cursor-pointer" withoutRoundedCorners />
                    </div>
                    <button className="mt-4 mb-2 mx-auto w-[87px] text-[13px] py-2 bg-[#38883d] text-white rounded-sm cursor-pointer">
                        Want to Read
                    </button>
                </div>
            ))}
        </div>

        <div className="flex">
            <button className="w-full max-w-[495px] text-sm leading-3.5 my-3 mx-auto px-3 py-2 rounded-[3px] bg-[#F4F1EA] border border-[#D6D0C4] cursor-pointer hover:bg-[#E8E0D0]">
                View all
            </button>
        </div>
    </div>
}