import { MdArrowForwardIos } from "react-icons/md"

type BooksCarouselProps = {
    bookWidth: number;
    showAllLabel: string;
}

export const BooksCarousel = ({ bookWidth, showAllLabel }: BooksCarouselProps) => {
    return (<>
        <div className="flex gap-6 overflow-auto my-6">
            {Array(4).fill(null).map((_, i) => (
                <div key={i} className={`w-${bookWidth} aspect-2/3 bg-gray-600`} />
            ))}
        </div>

        <div className="flex gap-2 items-center cursor-pointer group">
            <p className="font-semibold group-hover:underline">{showAllLabel}</p>
            <MdArrowForwardIos size={16} />
        </div>
    </>
    )
}