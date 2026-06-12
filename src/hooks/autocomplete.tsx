import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import debounce from "lodash.debounce";
import type { AsyncThunk, AsyncThunkConfig } from "@reduxjs/toolkit";
import { textToUrlSlug } from "../helpers/utils";
import { useNavigate } from "react-router-dom";

type SearchThunk<T> = AsyncThunk<
    T,
    {
        query: string;
        limit?: number;
        page?: number;
        isAutocomplete?: boolean;
    },
    AsyncThunkConfig
>;

export const useAutocomplete = <T,>(
    searchAction: SearchThunk<T>
) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const autocompleteRef = useRef<HTMLDivElement>(null);
    const [isAutocompleteOpen, setIsAutocompleteOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    const handleOnChangeSearch = async (value: string) => {
        setSearchValue(value);
        if (value) {
            await dispatch(searchAction({ query: value, isAutocomplete: true }));
        }

        if (!isAutocompleteOpen && value) {
            setIsAutocompleteOpen(true)
        } else if (isAutocompleteOpen && !value) {
            setIsAutocompleteOpen(false)
        }
    }

    const debouncedHandleOnChangeSearch = debounce(handleOnChangeSearch, 500);


    const handleClickOnAllResultsGenres = () => {
        const inputValueSlug = textToUrlSlug(searchValue)
        navigate(`/genres/search?name=${inputValueSlug}`)
        setIsAutocompleteOpen(false)
    }

    const handleClickOnAllResultsBooks = (setIsMobileSearchBarOpen?: (value: boolean) => void) => {
        const inputValueSlug = textToUrlSlug(searchValue)
        navigate(`/editions/search?query=${inputValueSlug}`)
        setIsAutocompleteOpen(false)
        if (setIsMobileSearchBarOpen) {
            setIsMobileSearchBarOpen(false)
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

    return {
        autocompleteRef,
        searchValue,
        debouncedHandleOnChangeSearch,
        isAutocompleteOpen,
        setIsAutocompleteOpen,
        handleClickOnAllResultsGenres,
        handleClickOnAllResultsBooks
    }
}