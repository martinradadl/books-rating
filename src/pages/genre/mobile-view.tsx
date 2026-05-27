import { useNavigate } from "react-router-dom";
import { GenreBookListItemsMobile } from "../../components/genres/list-items-mobile";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import type { RootState } from "../../redux/store";
import { useEffect, useRef, useState } from "react";
import genresActions from "../../redux/actions/genres";
import { Loading } from "../../components/loading";
import { MoreGenresSelect } from "../../components/genres/more-genres-select";
import { useNavigateToGenres } from "../../hooks/navigateToGenres";
import { GenresSearchBarMobile } from "../../components/genres/search-bar-mobile";
import { AutocompleteInput } from "../../components/autocomplete";
import { GenreAutocompleteItem } from "../../components/autocomplete/genre-results-item";


export const GenreMobile = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { selectedGenre, relatedGenres, genresList, searchResults, status: genresStatus } = useAppSelector((state: RootState) => state.genres);
    const { latestReleases, mostRatedBooks, bestRatedBooks, status: editionsStatus } = useAppSelector((state: RootState) => state.editions);
    const { handleNavigateToGenres } = useNavigateToGenres();
    const { name } = selectedGenre || {};
    const [searchValue, setSearchValue] = useState("");
    const [isAutocompleteOpen, setIsAutocompleteOpen] = useState(false);
    const autocompleteRef = useRef<HTMLDivElement>(null);


    const handleOnChangeSearch = async (value: string) => {
        setSearchValue(value);
        await dispatch(genresActions.searchByName({ query: value }));

        if (!isAutocompleteOpen && value) {
            setIsAutocompleteOpen(true)
        } else if (isAutocompleteOpen && !value) {
            setIsAutocompleteOpen(false)
        }
    }

    useEffect(() => {
        dispatch(genresActions.getAll({ limit: 20, sortBy: "occurrence" }));
    }, [dispatch])

    const handleClickOnRelatedGenre = (slug: string) => {
        navigate(`/genres/${slug}`)
    }

    if (genresStatus === "loading" || editionsStatus === "loading") {
        return <Loading />
    }

    return <div className="p-3">
        <div ref={autocompleteRef}>
            <AutocompleteInput
                inputComponent={<GenresSearchBarMobile onChange={handleOnChangeSearch} />}
                ItemListComponent={GenreAutocompleteItem}
                items={searchResults}
                inputValue={searchValue}
                isOpen={isAutocompleteOpen}
            />
        </div>

        <p className="mb-2 text-sm">
            <span className="text-[#00635d] cursor-pointer hover:underline"
                onClick={() => handleNavigateToGenres()}>Genres</span>
            <span>{" > "}</span>
            <span>{name}</span>
        </p>

        <p className="font-bold text-2xl mb-2.5">{name}</p>

        <button className="w-[180px] text-sm leading-3.5 px-3 py-2 rounded-[3px] bg-[#F4F1EA] border border-[#D6D0C4] cursor-pointer hover:bg-[#E8E0D0]">
            Add to Favorite Genres
        </button>

        <GenreBookListItemsMobile
            title="Latest Releases"
            editions={latestReleases}
            buttonLabel="View all"
            isPreview
        />

        <p className="my-3 pt-2 border-t border-[#D8D8D8] text-sm font-bold uppercase">Related Genres</p>

        <div className="text-sm">
            <ul className="flex flex-wrap">
                {relatedGenres.map((genre) => (
                    <li key={genre.name}
                        className="bg-[#eee] rounded-[5px] mr-2.5 mb-2.5 py-[5px] px-2.5 text-[#00635D] cursor-pointer hover:underline"
                        onClick={() => handleClickOnRelatedGenre(genre.slug || "")}
                    >
                        {genre.name}
                    </li>
                ))}
            </ul>
        </div>

        <GenreBookListItemsMobile
            title="Most Rated"
            editions={mostRatedBooks.list}
            buttonLabel="View all"
            isPreview
        />

        <GenreBookListItemsMobile
            title="Best Rated"
            editions={bestRatedBooks.list}
            buttonLabel="View all"
            isPreview
        />

        <p className="my-3 pt-2 border-t border-[#D8D8D8] text-sm font-bold uppercase">Quotes</p>

        <div className="max-w-[495px] mx-auto text-sm">
            <p>“The story so far: In the beginning the Universe was created. This has made a lot of people very angry
                and been widely regarded as a bad move.” –
                <span className="font-bold text-[#00635D] cursor-pointer hover:underline"> Douglas Adams</span>
            </p>
            <p className="text-[#00635D] cursor-pointer hover:underline">23,477 people liked this</p>
        </div>

        <div className="flex">
            <button className="w-full max-w-[495px] text-sm leading-3.5 my-3 mx-auto px-3 py-2 rounded-[3px] bg-[#F4F1EA] border border-[#D6D0C4] cursor-pointer hover:bg-[#E8E0D0]">
                View all
            </button>
        </div>

        <MoreGenresSelect genresList={genresList} />
    </div>
}