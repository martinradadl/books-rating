import classNames from "classnames";

type ProfilePicProps = {
    image?: string;
    isHome?: boolean;
};

export const ProfilePic = ({ image, isHome }: ProfilePicProps) => {
    return (
        <div
            className={classNames("w-16 h-16 bg-gray-600 focus:ring-3 focus:ring-offset-2 cursor-pointer transition duration-300 hover:brightness-75",
                { "w-[30px] h-[30px] rounded": isHome },
                { "rounded-full": !isHome }
            )}
            style={{
                backgroundImage: image ? `url(${image})` : undefined,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
            tabIndex={0}
        />
    );
};
