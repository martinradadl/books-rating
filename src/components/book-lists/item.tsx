import { useNavigate } from "react-router-dom";
import { BookCover } from "../editions/book-cover";
import { StarRating } from "../ratings/star-rating";
import { numberToLocaleString } from "../../helpers/utils";
import { FaBook } from "react-icons/fa";
import { MdArrowDropDown } from "react-icons/md";
import type { EditionI } from "../../data-structures";

interface BookListItemProps {
    index: number;
    item: EditionI;
}

const reviewsCount = 678;


export const BookListItem = ({ item, index }: BookListItemProps) => {
    const navigate = useNavigate();
    const { _id, cover, title, averageRating, ratingCount = 123, book } = item;
    const authorName = book.author.name;

    const handleClickOnEdition = () => {
        navigate(`/edition/${_id}`)
    }

    return <div className="border-t border-[#CCCCCC] lg:flex">
        <p className="text-[#999999] lg:text-[#181818] m-2.5 lg:m-0 lg:p-[5px] lg:w-10 text-sm font-bold lg:text-base">
            {index} <span className="lg:hidden">.</span>
        </p>

        <div className="mb-[15px] lg:mb-0 flex lg:flex-1 lg:mt-[5px]">
            <div onClick={handleClickOnEdition}>
                <BookCover image={cover} className="w-[75px] lg:w-[50px] ml-2.5 mb-[15px] lg:mx-[5px] cursor-pointer" />
            </div>

            <div className="mx-2.5 lg:mx-0 lg:flex lg:flex-1">
                <div className="lg:p-[5px] lg:flex-1">
                    <p className="text-base lg:text-[17px] lg:font-bold leading-[19px] flex-wrap cursor-pointer hover:underline"
                        onClick={handleClickOnEdition}>
                        {title}
                    </p>

                    <p className="text-[13px] leading-[19px]">
                        by <span className="text-[#00635D] lg:text-[#181818] cursor-pointer hover:underline">
                            {authorName}
                        </span>
                    </p>

                    <div className="text-[11px] flex items-center gap-1 mb-2.5 text-[#999999] leading-none lg:leading-[19px]">
                        <StarRating rating={averageRating} starsSize={15} isSmall />

                        <p className="whitespace-nowrap">
                            {averageRating?.toFixed(2)}{" "}
                            <span className="hidden lg:inline">avg rating</span>
                        </p>

                        <p className="lg:hidden whitespace-nowrap">·</p>
                        <p className="hidden lg:inline whitespace-nowrap">—</p>

                        <p className="whitespace-nowrap">
                            {`${numberToLocaleString(ratingCount, "en-US")} ratings`}
                        </p>

                        <p className="lg:hidden whitespace-nowrap">·</p>

                        <p className="lg:hidden whitespace-nowrap">
                            {`${numberToLocaleString(reviewsCount, "en-US")} reviews`}
                        </p>
                    </div>
                </div>

                <div className="w-[145px] lg:w-[140px] lg:p-[5px] lg:flex lg:flex-col lg:items-center lg:justify-center">
                    <div className="flex items-center rounded bg-[#409D69]">
                        <button className="flex w-[105px] lg:w-[110px] items-center justify-center border-r border-[#38883d] text-white text-sm py-2 lg:py-1 cursor-pointer">
                            Want to Read
                        </button>

                        <button className="w-10 lg:w-[28px] text-gray-300 lg:text-white flex justify-center items-center cursor-pointer">
                            <FaBook size={16} className="lg:hidden" />
                            <MdArrowDropDown size={20} className="hidden lg:inline" />
                        </button>
                    </div>

                    <div className="hidden lg:block text-[11px] text-[#999999] mt-[3px]">
                        <p>Rate this book</p>
                        <StarRating interactive isSmall starsSize={14} />
                    </div>
                </div>
            </div>
        </div>
    </div>
}