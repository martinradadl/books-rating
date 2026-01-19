import { useNavigate } from "react-router-dom";
import { BookCover } from "../editions/book-cover";

export interface DiscoverBooksItemProps {
    img: string;
    id: string;
    genre?: string;
}

interface DiscoverBooksListProps {
    title: string;
    list: DiscoverBooksItemProps[];
    mainSuggestion: DiscoverBooksItemProps;
}

export const DiscoverBooksList = ({ title, list, mainSuggestion }: DiscoverBooksListProps) => {
    const navigate = useNavigate();

    const handleOnClick = (id: string) => {
        navigate(`/edition/${id}`)
    }

    return (
        <div className="relative w-full pb-[16px] pl-[15px]">
            <div className="absolute bottom-0 left-0 h-[42px] w-full bg-gradient-to-b from-[#B8B59A] to-[#EEECD9]" />
            <div className="absolute bottom-0 left-0 h-[2px] w-full bg-[#B8B59A]" />

            <p className="text-xs mt-[15px] mb-[18px]">{title}</p>

            <div className="flex">
                {list.map((item) => {
                    return (
                        <div key={item.id} onClick={() => { handleOnClick(item.id) }}>
                            <BookCover
                                image={item.img}
                                className="cursor-pointer w-[80px] mr-[12px]"
                                withoutRoundedCorners
                            />
                        </div>
                    )
                })}

                <div className="mt-[48px] mr-[10px]">
                    <img src="https://s.gr-assets.com/assets/home/discovery_arrow-f1e8677f2c8b68500ed82ef0d5b7c59b.png" alt="right-arrow" />
                </div>

                <div onClick={() => { handleOnClick(mainSuggestion.id) }}>
                    <BookCover
                        image={mainSuggestion.img}
                        className="cursor-pointer w-[80px] mr-[12px]"
                        withoutRoundedCorners
                    />
                </div>

                <p className="text-xs font-semibold">{mainSuggestion.genre || ""}</p>
            </div>
        </div>
    )
}