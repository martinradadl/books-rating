import { useEffect, useRef, useState } from "react";
import { GenreBookListPreviewDesktop } from "../../../components/genres/list-preview-desktop";
import { Loading } from "../../../components/loading";
import { useNavigateToGenres } from "../../../hooks/navigateToGenres";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import type { RootState } from "../../../redux/store";
import { AutocompleteInput } from "../../../components/autocomplete";
import { GenreAutocompleteItem } from "../../../components/autocomplete/genre-results-item";
import genresActions from "../../../redux/actions/genres";
import debounce from "lodash.debounce";


export const MoreGenresDesktop = () => {
    const dispatch = useAppDispatch();
    const { genresList, discoverList, searchResults, status: genresStatus } = useAppSelector((state: RootState) => state.genres);
    const { handleNavigateToGenres } = useNavigateToGenres();
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

    const debouncedHandleOnChangeSearch = debounce(handleOnChangeSearch, 100);


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
        <div className="w-[970px] mx-auto px-[5px] pt-[15px] flex">
            <div className="w-[643px] pl-2 pr-2.5">
                <p className="mt-2.5 mb-[25px] text-2xl font-bold">Genres</p>

                <div className="bg-[#eeeeee] p-2.5 mb-3 rounded-[3px] text-sm flex">
                    <div ref={autocompleteRef}>
                        <AutocompleteInput
                            inputComponent={
                                <input
                                    type="text"
                                    placeholder="Find a genre by name"
                                    onChange={(e) => debouncedHandleOnChangeSearch(e.target.value)}
                                    className="w-[508px] py-2 px-8 border border-[#DCD6CC] rounded-[3px] leading-[1.2] bg-white"
                                />
                            }
                            ItemListComponent={GenreAutocompleteItem}
                            items={searchResults}
                            inputValue={searchValue}
                            isOpen={isAutocompleteOpen}
                        />
                    </div>
                </div>

                {discoverList.map((list, index) => (
                    <GenreBookListPreviewDesktop
                        key={index}
                        title={list.genre.name}
                        editions={list.editions}
                        isRandomGenre />
                ))}
            </div>

            <div className="w-[300px] ml-2">
                <div className="text-xs font-bold mt-3 pb-2.5">
                    <p className="h-6 flex items-center py-0.5 uppercase border-b border-[#D8D8D8]">Browse</p>
                </div>
                <div className="text-xs pb-5 grid grid-cols-2">
                    {genresList.map((genre) => (
                        <p
                            key={genre.name}
                            className="w-fit leading-[18px] cursor-pointer hover:underline text-[#00635d]"
                            onClick={() => { handleNavigateToGenres(genre.slug || "") }}
                        >
                            {genre.name}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    )
}