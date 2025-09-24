import classNames from "classnames";
import { MdArrowForwardIos } from "react-icons/md"

type BooksCarouselProps = {
    bookWidth: number;
    showAllLabel: string;
}

const widthMap: Record<number, string> = {
    36: "w-36",
    40: "w-40",
};

export const BooksCarousel = ({ bookWidth, showAllLabel }: BooksCarouselProps) => {
    const dynamicStyles = widthMap[bookWidth];

    return (<>
        <div className="flex gap-6 overflow-auto my-6">
            {Array(4).fill(null).map((_, i) => (
                <div key={i} className={classNames('aspect-2/3 bg-gray-600', dynamicStyles)} />
            ))}
        </div>

        <div className="flex gap-2 items-center cursor-pointer group">
            <p className="font-semibold group-hover:underline">{showAllLabel}</p>
            <MdArrowForwardIos size={16} />
        </div>
    </>
    )
}