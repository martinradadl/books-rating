import classNames from "classnames";

type BookCoverProps = {
    className?: string;
}

export const BookCover = ({ className }: BookCoverProps) => {
    return (
        <div className={classNames("aspect-2/3 bg-gray-600", className)} tabIndex={0} />
    );
}
