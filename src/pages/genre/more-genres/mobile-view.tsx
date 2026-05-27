import { useEffect, useRef, useState } from "react";
import { GenreBookListItemsMobile } from "../../../components/genres/list-items-mobile"
import { MoreGenresSelect } from "../../../components/genres/more-genres-select";
import { GenresSearchBarMobile } from "../../../components/genres/search-bar-mobile"
import { Loading } from "../../../components/loading";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import type { RootState } from "../../../redux/store";
import { AutocompleteInput } from "../../../components/autocomplete";
import { GenreAutocompleteItem } from "../../../components/autocomplete/genre-results-item";
import genresActions from "../../../redux/actions/genres";


export const MoreGenresMobile = () => {
    const dispatch = useAppDispatch();
    const { genresList, discoverList, searchResults, status: genresStatus } = useAppSelector((state: RootState) => state.genres);
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
        const handleClickOutside = (event: MouseEvent) => {
            if (
                autocompleteRef.current &&
                !autocompleteRef.current.contains(event.target as Node)
            ) {
                setIsAutocompleteOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [])

    if (genresStatus === "loading") {
        return <Loading />
    }

    return (
        <div className="p-3">
            <div ref={autocompleteRef}>
                <AutocompleteInput
                    inputComponent={<GenresSearchBarMobile onChange={handleOnChangeSearch} />}
                    ItemListComponent={GenreAutocompleteItem}
                    items={searchResults}
                    inputValue={searchValue}
                    isOpen={isAutocompleteOpen}
                />
            </div>

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