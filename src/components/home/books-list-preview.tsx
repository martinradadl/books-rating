import { useNavigate } from "react-router-dom";
import type { BookListI } from "../../data-structures";
import { BookCover } from "../editions/book-cover";

interface BookListPreviewProps {
    list: BookListI;
    votersCount: number;
}

export const BookListPreview = ({ list, votersCount }: BookListPreviewProps) => {
    const booksCount = list.books?.length;
    const navigate = useNavigate();

    const handleClickOnTitle = () => {
        navigate(`list/${list.urlPath}`)
    }

    const handleClickOnBookEdition = (editionId: string) => {
        navigate(`edition/${editionId}`)
    }

    return (
        <div className="py-[2px] flex justify-between">
            <div className="w-fit">
                <p className="text-[#00635d] text-sm cursor-pointer hover:underline"
                    onClick={handleClickOnTitle}>
                    {list.title}
                </p>

                <p className="text-[#999999] text-[11px]">
                    {booksCount} books | {votersCount} voters
                </p>
            </div>

            <div className="w-[116px] h-[40px] flex justify-between">
                {
                    list.books?.slice(0, 4).map((bookEdition) => (
                        <div onClick={() => { handleClickOnBookEdition(bookEdition._id) }}
                            key={bookEdition._id}
                        >
                            <BookCover
                                image={bookEdition.cover}
                                className="w-[27px] cursor-pointer" withoutRoundedCorners
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}