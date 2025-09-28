import { MdArrowForwardIos } from "react-icons/md";
import { BookCover } from "./book-cover";

type BooksCarouselProps = {
    showAllLabel: string;
};

export const BooksCarousel = ({ showAllLabel }: BooksCarouselProps) => {
    return (
        <div>
            <div className="flex gap-4 my-6 p-2 overflow-x-auto">
                {Array(5)
                    .fill(null)
                    .map((_, i) => (
                        <BookCover
                            key={i}
                            className="rounded focus:ring-3 focus:ring-offset-3 min-w-[25%] md:min-w-[30%] lg:min-w-[23.5%]"
                        />
                    ))}
            </div>

            <div className="flex gap-2 items-center cursor-pointer group focus:ring-3 focus:ring-offset-3 rounded w-fit" tabIndex={0}>
                <p className="font-semibold group-hover:underline">
                    {showAllLabel}
                </p>
                <MdArrowForwardIos size={16} />
            </div>
        </div>
    );
};
