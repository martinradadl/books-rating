import classNames from "classnames";
import { MdArrowForwardIos, MdSearch } from "react-icons/md"
import { useLocation, useNavigate } from "react-router-dom";
import { NavBar } from "./nav-bar";
import { useEffect, useState } from "react";
import { AutocompleteInput } from "../autocomplete";
import { HeaderSearchBarMobile } from "./search-bar-mobile";
import { useAutocomplete } from "../../hooks/autocomplete";
import editionsActions from "../../redux/actions/editions";
import { BookAutocompleteItem } from "../autocomplete/book-results-item";
import { useAppSelector } from "../../redux/hooks";
import type { RootState } from "../../redux/store";



export const Header = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const isHomePage = pathname === '/';

    const [isMd, setIsMd] = useState(window.innerWidth >= 768);
    const [isMobileSearchBarOpen, setIsMobileSearchBarOpen] = useState(false);
    const { autocompleteRef, debouncedHandleOnChangeSearch, searchValue, isAutocompleteOpen, setIsAutocompleteOpen, handleClickOnAllResultsBooks } = useAutocomplete(editionsActions.searchByTitleOrAuthor);
    const { autocompleteResults } = useAppSelector((state: RootState) => state.editions);

    const handleCancelSearch = () => {
        setIsAutocompleteOpen(false)
        setIsMobileSearchBarOpen(false)
    }


    useEffect(() => {
        const onResize = () => {
            setIsMd(window.innerWidth >= 768);
        };

        window.addEventListener("resize", onResize);

        return () => {
            window.removeEventListener("resize", onResize);
        };
    }, []);

    useEffect(() => {
        setIsMobileSearchBarOpen(false)
        setIsAutocompleteOpen(false)
    }, [isMd, setIsAutocompleteOpen])

    return (
        <div className={classNames("flex flex-col bg-[#faf8f6] top-0 z-50 sticky",
            { 'lg:static': isHomePage }
        )}>
            <div className={classNames("flex gap-3 items-center justify-center h-10 bg-[#617054] text-white cursor-pointer",
                { 'lg:hidden': isHomePage }
            )}>
                <p className="text-lg font-semibold">Season Article</p>
                <p className="text-sm hidden md:block">Check this special article here</p>
                <MdArrowForwardIos size={16} />
            </div>

            <div className={classNames("w-full border-b border-gray-300",
                { "lg:w-[970px] lg:mx-auto lg:text-left xl:px-0": isHomePage },
                { "xl:px-[35px]": !isHomePage }
            )}>
                <div className={classNames("flex w-full 2xl:w-[87.5%] mx-auto h-[50px] items-center justify-between relative 2xl:max-w-[1280px]",
                    { "lg:h-fit lg:mx-0": isHomePage }
                )}>
                    <div className="relative">
                        <MdSearch size={28}
                            className="md:hidden mx-2.5 cursor-pointer"
                            onClick={() => { setIsMobileSearchBarOpen(true) }} />

                        {isMobileSearchBarOpen &&
                            <div className="absolute w-screen mt-3">
                                <div ref={autocompleteRef}>
                                    <AutocompleteInput
                                        inputComponent={
                                            <HeaderSearchBarMobile
                                                onChange={debouncedHandleOnChangeSearch}
                                                handleCancel={handleCancelSearch} />
                                        }
                                        ItemListComponent={BookAutocompleteItem}
                                        items={autocompleteResults}
                                        inputValue={searchValue}
                                        isOpen={isAutocompleteOpen}
                                        setIsOpen={setIsAutocompleteOpen}
                                        setIsMobileHeaderSearchBarOpen={setIsMobileSearchBarOpen}
                                        handleClickOnAllResults={() => { handleClickOnAllResultsBooks(setIsMobileSearchBarOpen) }}
                                    />
                                </div>
                            </div>
                        }
                    </div>

                    <p className={classNames("text-3xl font-bold focus:ring-3 focus:ring-black focus:ring-offset-2 rounded cursor-pointer absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 md:mx-3.5",
                        { "lg:text-4xl lg:leading-20": isHomePage }
                    )}
                        onClick={() => { navigate('/') }}
                        tabIndex={0}
                    >
                        Books Rating
                    </p>

                    <NavBar isHomePage={isHomePage} isXl />

                    <div className={classNames("hidden md:flex flex-1 h-[32px] items-center",
                        { "lg:hidden": isHomePage }
                    )}>
                        <AutocompleteInput
                            inputComponent={
                                <div className="relative w-[392px] pl-4" ref={autocompleteRef}>
                                    <input
                                        type="text"
                                        placeholder="Search books"
                                        className="w-full h-8 pl-3 border border-gray-300 rounded-md"
                                        onChange={(e) => debouncedHandleOnChangeSearch(e.target.value)}
                                    />
                                    <div className="absolute inset-y-0 right-0 px-2 flex items-center text-gray-700 cursor-pointer">
                                        <MdSearch size={20} />
                                    </div>
                                </div>
                            }
                            ItemListComponent={BookAutocompleteItem}
                            items={autocompleteResults}
                            inputValue={searchValue}
                            isOpen={isAutocompleteOpen}
                            setIsOpen={setIsAutocompleteOpen}
                            handleClickOnAllResults={() => { handleClickOnAllResultsBooks(setIsMobileSearchBarOpen) }} />


                    </div>

                    <button className={classNames('md:hidden bg-black text-white text-sm items-center rounded py-2 px-3 mr-2 cursor-pointer hover:bg-gray-600',
                        { "lg:hidden": isHomePage }
                    )}>
                        Sign Up
                    </button>

                    <div className={classNames("hidden md:flex h-full",
                        { "lg:hidden": isHomePage }
                    )}>
                        <p className="text-gray-800 px-3 h-full flex items-center hover:bg-black hover:text-white cursor-pointer">Sign in</p>
                        <p className="text-gray-800 px-3 h-full flex items-center xl:hidden hover:bg-black hover:text-white cursor-pointer">Join</p>
                    </div>
                </div>
            </div>

            <NavBar isHomePage={isHomePage} />
        </div>
    )
}