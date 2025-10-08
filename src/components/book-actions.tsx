import classNames from "classnames";
import { LabelText } from "./label-text"
import { PillButton } from "./pill-button"
import { StarRating } from "./star-rating"

type BookActionsProps = {
    showOnMobileView?: boolean;
}

export const BookActions = ({ showOnMobileView }: BookActionsProps) => {
    const dynamicStyles = showOnMobileView ? 'md:hidden flex' : 'hidden md:flex ';

    return <div className={classNames("flex-col gap-4 items-center pb-4 w-full max-w-[260px] m-auto", dynamicStyles)}>
        <PillButton label="Want to Read" className="w-full h-11 bg-green-800 hover:bg-green-700 focus:ring-green-800" />

        <StarRating interactive />

        <LabelText text="Rate this book" className="cursor-pointer" />
    </div>
}