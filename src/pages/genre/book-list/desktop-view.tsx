import { useParams } from "react-router-dom";
import { urlSlugToCapitalizedText } from "../../../helpers/utils"
import type { GenreBookListRouteParams } from ".";
import { GENRE_DATA } from "../../../data/genre";
import { ProfilePic } from "../../../components/profile-pic";
import { Loading } from "../../../components/loading";
import { BookListItem } from "../../../components/book-lists/item";
import type { EditionI } from "../../../data-structures";
import { useAppSelector } from "../../../redux/hooks";
import type { RootState } from "../../../redux/store";
import { useMemo } from "react";
import { useNavigateTo } from "../../../hooks/navigateTo";

const { SAMPLE_QUOTE, SAMPLE_QUOTE_AUTHOR } = GENRE_DATA

export const GenreBookListDesktop = () => {
    const params = useParams<GenreBookListRouteParams>();
    const { latestReleases, mostRatedBooks, bestRatedBooks, status: editionsStatus } = useAppSelector((state: RootState) => state.editions);
    const { handleClickOnGenresPage, handleClickOnSelectedGenre } = useNavigateTo(params);

    const bookListsMap = {
        "latest-releases": latestReleases,
        "most-rated": mostRatedBooks.list,
        "best-rated": bestRatedBooks.list,
    };
    const selectedList = (params.list && bookListsMap[params.list]) || []

    const genreName = useMemo(() => urlSlugToCapitalizedText(params.genre || ""), [params.genre]);
    const listName = useMemo(() => urlSlugToCapitalizedText(params.list || ""), [params.list]);

    if (editionsStatus === "loading") {
        return <Loading />
    }

    return (
        <div className="w-[970px] mx-auto px-[5px] pt-[15px] flex">
            <div className="w-[643px] pl-2 pr-2.5">
                <p className="text-xs">
                    <span className="text-[#00635d] cursor-pointer hover:underline"
                        onClick={handleClickOnGenresPage}>Genres</span>
                    <span>{" > "}</span>
                    <span className="text-[#00635d] cursor-pointer hover:underline"
                        onClick={handleClickOnSelectedGenre}>{genreName}</span>
                    <span>{" > "}</span>
                    <span>{listName}</span>
                </p>

                <p className="mt-2.5 mb-[25px] text-2xl font-bold">
                    {listName !== "Latest Releases" ?
                        `${listName} ${genreName} Books` : `${genreName} ${listName}`}
                </p>

                {selectedList.map((item: EditionI, index: number) => (
                    <BookListItem key={index} index={index} item={item} isListByGenre />
                ))}
            </div>
            <div className="w-[300px] ml-2">
                <div className="pb-2.5">
                    <p className="text-xs h-6 flex items-center py-0.5 font-bold uppercase border-b border-[#D8D8D8]">Related Quotes</p>
                </div>

                <div className="py-2.5">
                    <div className="float-left w-[56px] mr-5 mb-2">
                        <ProfilePic />
                    </div>

                    <div className="text-sm leading-6">
                        <p>{SAMPLE_QUOTE}</p>

                        <p className="mt-2 font-bold">{SAMPLE_QUOTE_AUTHOR}</p>
                    </div>

                    <div className="flex justify-end mt-2.5">
                        <p className="text-[11px] text-[#00635d] cursor-pointer hover:underline">
                            620 likes
                        </p>
                    </div>

                    <div className="flex justify-end mt-[22px]">
                        <p className="text-[13px] font-bold text-[#00635d] cursor-pointer hover:underline">
                            {`More quotes...`}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}