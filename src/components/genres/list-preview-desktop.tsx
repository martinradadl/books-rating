import { useNavigate, useParams } from "react-router-dom";
import type { EditionI } from "../../data-structures";
import { BookCover } from "../editions/book-cover";
import { textToUrlSlug } from "../../helpers/utils";
import { useMemo } from "react";
import { useNavigateToGenres } from "../../hooks/navigateToGenres";

interface GenreBookListPreviewDesktopProps {
    title: string;
    editions: EditionI[];
    isRandomGenre?: boolean;
}

export const GenreBookListPreviewDesktop = ({ title, editions, isRandomGenre }: GenreBookListPreviewDesktopProps) => {
    const navigate = useNavigate();
    const params = useParams();
    const titleSlug = useMemo(() => textToUrlSlug(title || ""), [title]);
    const { handleViewFullContent } = useNavigateToGenres();


    const handleClickOnEdition = (editionId: string) => {
        navigate(`/edition/${editionId}`)
    }


    return <div>
        <div className="h-7 flex items-center mb-2.5 border-b border-[#D8D8D8]">
            <p className="text-xs font-bold uppercase cursor-pointer hover:underline">{title}</p>
        </div>

        <div className="grid grid-cols-5">
            {editions.map((edition, i) => (
                <div key={i} onClick={() => { handleClickOnEdition(edition._id) }}>
                    <BookCover
                        key={i}
                        image={edition.cover}
                        className="w-[115px] h-[180px] mx-[5px] mt-[10px] mb-[15px] cursor-pointer"
                        withoutRoundedCorners
                    />
                </div>
            ))}
        </div>

        <div className="flex justify-end">
            <p className="text-[13px] font-bold text-[#00635d] cursor-pointer hover:underline"
                onClick={() => { handleViewFullContent(titleSlug, params.name, isRandomGenre) }}>
                {`More ${title.toLocaleLowerCase()}...`}
            </p>
        </div>
    </div>
}