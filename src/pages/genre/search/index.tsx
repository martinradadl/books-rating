import { MdSearch } from "react-icons/md";
import { AutocompleteInput } from "../../../components/autocomplete";
import { GenreAutocompleteItem } from "../../../components/autocomplete/genre-results-item";
import { GenresSearchBarMobile } from "../../../components/genres/search-bar-mobile";
import { useAutocomplete } from "../../../hooks/autocomplete";
import genresActions from "../../../redux/actions/genres";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import type { RootState } from "../../../redux/store";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loading } from "../../../components/loading";
import { Fragment, useEffect, useMemo, useState } from "react";
import { LinksListMobileItem } from "../../../components/home/links-list-mobile-item";
import { sequentialRange } from "../../../helpers/utils";
import classNames from "classnames";
import { useIsDesktop } from "../../../hooks/is-desktop";
import { GenresSearchBarDesktop } from "../../../components/genres/search-bar-desktop";


export const GenresSearch = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch();

    const [searchParams] = useSearchParams();
    const inputValue = searchParams.get("name") || "";

    const { autocompleteResults, searchResults, status } = useAppSelector((state: RootState) => state.genres);
    const { autocompleteRef, debouncedHandleOnChangeSearch, searchValue, isAutocompleteOpen, setIsAutocompleteOpen, handleClickOnAllResultsGenres } = useAutocomplete(genresActions.searchByName);
    const [currentPage, setCurrentPage] = useState(1);
    const isDesktop = useIsDesktop();



    const totalPages = useMemo(
        () => Math.ceil(searchResults.totalCount / 10),
        [searchResults.totalCount]
    );
    const pagesShown = useMemo(() => sequentialRange(1, totalPages), [totalPages])

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1)
        }
    }

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1)
        }
    }

    const handleChangePage = (page: number) => {
        setCurrentPage(page);
    }


    useEffect(() => {
        dispatch(genresActions.searchByName({ query: inputValue, limit: 10 }))
    }, [dispatch, inputValue])

    useEffect(() => {
        dispatch(genresActions.searchByName({ query: inputValue, limit: 10, page: currentPage }))
    }, [dispatch, currentPage, inputValue])


    return (
        <div className="pt-3">
            <div ref={autocompleteRef}>
                {isDesktop ?
                    <div className="pl-3 w-140">
                        <AutocompleteInput
                            inputComponent={
                                <GenresSearchBarDesktop onChange={debouncedHandleOnChangeSearch} />
                            }
                            ItemListComponent={GenreAutocompleteItem}
                            items={autocompleteResults}
                            inputValue={searchValue}
                            isOpen={isAutocompleteOpen}
                            setIsOpen={setIsAutocompleteOpen}
                            handleClickOnAllResults={handleClickOnAllResultsGenres}
                        />
                    </div>
                    :
                    <AutocompleteInput
                        inputComponent={<GenresSearchBarMobile onChange={debouncedHandleOnChangeSearch} />}
                        ItemListComponent={GenreAutocompleteItem}
                        items={autocompleteResults}
                        inputValue={searchValue}
                        isOpen={isAutocompleteOpen}
                        setIsOpen={setIsAutocompleteOpen}
                        handleClickOnAllResults={handleClickOnAllResultsGenres}
                    />
                }
            </div>

            <div className="p-3">
                <p className="text-2xl mb-2.5">Genres</p>

                {status === "loading" ?
                    <Loading className="h-36" />
                    :
                    searchResults.totalCount === 0 ?
                        <div>
                            <MdSearch size={120} className="mx-auto my-4 bg-[#EDEAE5] text-[#D2CDC5] rounded-full p-4" />
                            <p className="text-center text-lg font-semibold">Sorry, we couldn't find any matches.</p>
                            <p className="text-center text-lg text-[#00635D] cursor-pointer hover:underline"
                                onClick={() => { navigate("/genres") }}
                            >Return to Genres page</p>
                        </div>
                        :
                        <div className="pl-2">
                            {searchResults.results.map((item) => {
                                return <div key={item._id}>
                                    <LinksListMobileItem title={item.name} url={`/genres/${item.slug}`} />
                                </div>
                            })}

                            {totalPages > 1 && <div className="flex text-xs gap-1 mt-3">
                                <p className={classNames({ "text-[#00635d] cursor-pointer hover:underline": currentPage > 1 })}
                                    onClick={handlePreviousPage}>
                                    ← Previous
                                </p>

                                {pagesShown.map((page) => (
                                    <Fragment key={page}>
                                        <p
                                            className={classNames({
                                                "text-[#00635d] cursor-pointer hover:underline": currentPage !== page,
                                            })}
                                            onClick={() => handleChangePage(page)}
                                        >
                                            {page}
                                        </p>
                                    </Fragment>
                                ))}

                                <p className={classNames({ "text-[#00635d] cursor-pointer hover:underline": currentPage < totalPages }
                                )}
                                    onClick={handleNextPage}>
                                    Next →
                                </p>
                            </div>}
                        </div>
                }

            </div>
        </div>
    )
}