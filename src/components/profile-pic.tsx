type ProfilePicProps = {
    image?: string;
};

export const ProfilePic = ({ image }: ProfilePicProps) => {
    return (
        <div
            className="w-16 h-16 rounded-full bg-gray-600 focus:ring-3 focus:ring-offset-2"
            style={{
                backgroundImage: image ? `url(${image})` : undefined,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
            tabIndex={0}
        />
    );
};
