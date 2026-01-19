import { BookCover } from "../editions/book-cover";

interface BooksListPreviewProps {
    title: string;
    booksCount: number;
    votersCount: number;
}

export const BooksListPreview = ({ title, booksCount, votersCount }: BooksListPreviewProps) => {
    return (
        <div className="py-[2px] flex justify-between">
            <div className="w-fit">
                <p className="text-[#00635d] text-sm cursor-pointer hover:underline">{title}</p>

                <p className="text-[#999999] text-[11px]">
                    {booksCount} books | {votersCount} voters
                </p>
            </div>

            <div className="w-[116px] h-[40px] flex justify-between">
                <BookCover image="" className="w-[27px] cursor-pointer" withoutRoundedCorners />
                <BookCover image="" className="w-[27px] cursor-pointer" withoutRoundedCorners />
                <BookCover image="" className="w-[27px] cursor-pointer" withoutRoundedCorners />
                <BookCover image="" className="w-[27px] cursor-pointer" withoutRoundedCorners />
            </div>
        </div>
    )
}