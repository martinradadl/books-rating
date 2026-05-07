import { GenreBookListItemsMobile } from "../../../components/genres/list-items-mobile"
import { MoreGenresSelect } from "../../../components/genres/more-genres-select";
import { GenresSearchBarMobile } from "../../../components/genres/search-bar-mobile"
import { Loading } from "../../../components/loading";
import { useAppSelector } from "../../../redux/hooks";
import type { RootState } from "../../../redux/store";

export const MoreGenresMobile = () => {
    const { genresList, discoverList, status: genresStatus } = useAppSelector((state: RootState) => state.genres);


    if (genresStatus === "loading") {
        return <Loading />
    }

    return (
        <div className="p-3">
            <GenresSearchBarMobile />

            <p className="font-bold text-2xl mb-2.5">Genres</p>

            <p className="my-3 pt-2 border-t border-[#D8D8D8] text-sm font-bold uppercase">
                Popular releases from other genres
            </p>

            {discoverList.map((list, index) => (
                <GenreBookListItemsMobile
                    key={index}
                    title={list.genre.name}
                    editions={list.editions}
                    buttonLabel={`See more ${list.genre.name}`}
                    isPreview
                    isRandomGenre
                />
            ))}

            <MoreGenresSelect genresList={genresList} />
        </div>
    )
}