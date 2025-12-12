import classNames from "classnames";

type BookCoverProps = {
    image: string;
    className?: string;
};

export const BookCover = ({ className, image }: BookCoverProps) => {
    return (
        <img
            src={image}
            className={classNames("aspect-2/3 bg-gray-600 rounded-r-lg shadow-md drop-shadow-[0_2px_8px_rgba(0,0,0,0.2)]", className)}
        />
    );
};
