import { MdArrowForwardIos } from "react-icons/md"

type BooksCarouselProps = {
    showAllLabel: string;
    items?: number;
}


export const BooksCarousel = ({ showAllLabel, items = 5 }: BooksCarouselProps) => {
    return (<>
        <div className="flex gap-4 my-6">
            {Array(items)
                .fill(null)
                .map((_, i) => (
                    <div
                        key={i}
                        className="bg-gray-600 rounded aspect-[2/3] flex-1"
                    />
                ))}
        </div>

        <div className="flex gap-2 items-center cursor-pointer group">
            <p className="font-semibold group-hover:underline">{showAllLabel}</p>
            <MdArrowForwardIos size={16} />
        </div>
    </>)
}