import classNames from "classnames";
import { LabelText } from "./label-text"
import { StarRating } from "./star-rating"
import { MdOutlineExpandMore } from "react-icons/md";

type BookActionsProps = {
    showOnMobileView?: boolean;
}

export const BookActions = ({ showOnMobileView }: BookActionsProps) => {
    const dynamicStyles = showOnMobileView ? 'md:hidden flex' : 'hidden md:flex ';

    return <div className={classNames("flex-col gap-4 items-center pb-4 w-full max-w-[260px] m-auto", dynamicStyles)}>
        <div className="flex bg-emerald-700 rounded-full w-full h-11 text-white font-bold">
            <button className="flex flex-1 items-center justify-center border-r border-gray-700 hover:bg-emerald-600 rounded-s-full focus:ring-3 focus:ring-black focus:ring-offset-3">
                Want to Read
            </button>
            <button className="w-10 flex justify-center items-center focus:ring-3 focus:ring-black focus:ring-offset-3 hover:bg-emerald-600 rounded-e-full">
                <MdOutlineExpandMore size={20} />
            </button>
        </div>

        <StarRating interactive />
        <LabelText text="Rate this book" className="cursor-pointer" />
    </div>
}