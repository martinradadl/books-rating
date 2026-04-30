import { useNavigate, useParams } from "react-router-dom";
import type { EditionI } from "../../data-structures";
import { BookCover } from "../editions/book-cover";
import { textToUrlSlug } from "../../helpers/utils";
import { useMemo } from "react";
interface GenreBookListItemsMobileProps {
    title?: string;
    editions: EditionI[];
    isPreview?: boolean
}

export const GenreBookListItemsMobile = ({ title, editions, isPreview }: GenreBookListItemsMobileProps) => {
    const navigate = useNavigate();
    const params = useParams();
    const listSlug = useMemo(() => textToUrlSlug(title || ""), [title]);

    const handleClickOnEdition = (editionId: string) => {
        navigate(`/edition/${editionId}`)
    }

    const handleClickOnViewAll = () => {
        navigate(`/genres/${listSlug}/${params.name}`)
    }

    return <div>
        {isPreview && <p className="my-3 pt-2 border-t border-[#D8D8D8] text-sm font-bold uppercase">{title}</p>}

        <div className="flex justify-center">
            <div className="grid w-fit grid-cols-3 gap-x-[20%] gap-y-10">
                {editions.map((edition) => (
                    <div
                        key={edition._id}
                        className="w-[125px] flex flex-col items-center"
                    >
                        <div onClick={() => handleClickOnEdition(edition._id)}>
                            <BookCover
                                image={edition.cover}
                                className="h-[200px] cursor-pointer"
                                withoutRoundedCorners
                            />
                        </div>

                        <button className="mt-4 mb-2 w-[87px] text-[13px] py-2 bg-[#38883d] text-white rounded-sm">
                            Want to Read
                        </button>
                    </div>
                ))}
            </div>
        </div>

        {isPreview &&
            <div className="flex">
                <button className="w-full max-w-[495px] text-sm leading-3.5 my-3 mx-auto px-3 py-2 rounded-[3px] bg-[#F4F1EA] border border-[#D6D0C4] cursor-pointer hover:bg-[#E8E0D0]"
                    onClick={handleClickOnViewAll}>
                    View all
                </button>
            </div>
        }
    </div>
}