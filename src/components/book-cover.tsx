import classNames from "classnames";

type BookCoverProps = {
    className?: string;
    image?: string;
};

export const BookCover = ({ className, image }: BookCoverProps) => {
    return (
        <div
            className={classNames("aspect-2/3 bg-gray-600 rounded-r-lg", className)}
            style={{
                backgroundImage: image ? `url(${image})` : undefined,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
            tabIndex={0}
        />
    );
};
