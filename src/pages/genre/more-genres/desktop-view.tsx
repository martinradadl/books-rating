import { GenreBookListPreviewDesktop } from "../../../components/genres/list-preview-desktop";
import { Loading } from "../../../components/loading";
import { useNavigateToGenres } from "../../../hooks/navigateToGenres";
import { useAppSelector } from "../../../redux/hooks";
import type { RootState } from "../../../redux/store";
import { AutocompleteInput } from "../../../components/autocomplete";
import { GenreAutocompleteItem } from "../../../components/autocomplete/genre-results-item";
import genresActions from "../../../redux/actions/genres";
import { useAutocomplete } from "../../../hooks/autocomplete";
import { GenresSearchBarDesktop } from "../../../components/genres/search-bar-desktop";


export const MoreGenresDesktop = () => {
    const { genresList, discoverList, autocompleteResults, status: genresStatus } = useAppSelector((state: RootState) => state.genres);
    const { handleNavigateToGenres } = useNavigateToGenres();
    const { autocompleteRef, debouncedHandleOnChangeSearch, searchValue, isAutocompleteOpen, setIsAutocompleteOpen } = useAutocomplete(genresActions.searchByName);


    if (genresStatus === "loading") {
        return <Loading />
    }

    return (
        <div className="w-[970px] mx-auto px-[5px] pt-[15px] flex">
            <div className="w-[643px] pl-2 pr-2.5">
                <p className="mt-2.5 mb-[25px] text-2xl font-bold">Genres</p>


                <div ref={autocompleteRef}>
                    <AutocompleteInput
                        inputComponent={<GenresSearchBarDesktop onChange={debouncedHandleOnChangeSearch} />}
                        ItemListComponent={GenreAutocompleteItem}
                        items={autocompleteResults}
                        inputValue={searchValue}
                        isOpen={isAutocompleteOpen}
                        setIsOpen={setIsAutocompleteOpen}
                    />
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