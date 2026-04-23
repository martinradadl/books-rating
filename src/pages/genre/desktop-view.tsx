import { useState } from "react";
import { GenreListPreviewDesktop } from "../../components/genres/list-preview-desktop";
import { ProfilePic } from "../../components/profile-pic";
import { useAppSelector } from "../../redux/hooks";
import type { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { GENRE_DATA } from "../../data/genre";
import { Loading } from "../../components/loading";


const { NEWS_IMG_URL, NEWS_PREVIEW, NEWS_TITLE, SAMPLE_QUOTE, SAMPLE_QUOTE_AUTHOR } = GENRE_DATA

const descriptionLimit = 480;

export const GenreDesktop = () => {
    const navigate = useNavigate();
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
    const { selectedGenre, relatedGenres, status: genresStatus } = useAppSelector((state: RootState) => state.genres);
    const { latestReleases, mostRatedBooks, bestRatedBooks, status: editionsStatus } = useAppSelector((state: RootState) => state.editions);

    const { name, description } = selectedGenre || {};

    const displayedDescription = isDescriptionExpanded
        ? description
        : description?.slice(0, descriptionLimit)


    const handleClickOnRelatedGenre = (slug: string) => {
        navigate(`/genres/${slug}`)
    }

    if (genresStatus === "loading" || editionsStatus === "loading") {
        return <Loading />
    }

    return <div className="w-[970px] mx-auto px-[5px] pt-[15px] flex">
        <div className="w-[643px] pl-2 pr-2.5">
            <p className="text-xs">
                <span className="text-[#00635d] cursor-pointer hover:underline">Genres</span>
                <span>{" > "}</span>
                <span className="text-[#00635d] cursor-pointer hover:underline">{name}</span>
            </p>

            <p className="mt-2.5 mb-[25px] text-2xl font-bold">{name}</p>

            <p className="text-sm mb-3">
                {displayedDescription}
                {description && description.length > descriptionLimit && (
                    <span
                        className="text-[#00635d] underline cursor-pointer ml-1"
                        onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                    >
                        {isDescriptionExpanded ? "(less)" : "...more"}
                    </span>
                )}
            </p>

            <GenreListPreviewDesktop title="Latest Releases" editions={latestReleases} />

            <GenreListPreviewDesktop title="Most Rated" editions={mostRatedBooks.list} />

            <GenreListPreviewDesktop title="Best Rated" editions={bestRatedBooks.list} />
        </div>

        <div className="w-[300px] ml-2">
            <div className="text-xs font-bold mt-3 pb-2.5">
                <p className="h-6 flex items-center py-0.5 uppercase border-b border-[#D8D8D8]">Related Genres</p>
            </div>

            <div className="text-xs pb-5 grid grid-cols-2">
                {relatedGenres.map((genre) => (
                    <p
                        key={genre.name}
                        className="w-fit leading-[18px] cursor-pointer hover:underline text-[#00635d]"
                        onClick={() => { handleClickOnRelatedGenre(genre.slug || "") }}
                    >
                        {genre.name}
                    </p>
                ))}
            </div>

            <div className="text-xs mt-3 pb-2.5">
                <div className="pb-2.5">
                    <p className="h-6 flex items-center py-0.5 font-bold uppercase border-b border-[#D8D8D8]">Related News</p>
                </div>

                <img src={NEWS_IMG_URL} alt="News" className="cursor-pointer" />

                <p className="text-base text-[#00635d] font-bold my-3 cursor-pointer hover:underline">{NEWS_TITLE}</p>

                <p className="text-sm pb-4">{NEWS_PREVIEW}</p>

                <p className="w-fit text-sm font-bold text-[#00635d] pb-4 cursor-pointer hover:underline">Read more...</p>
            </div>

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
}