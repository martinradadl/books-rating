import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import debounce from "lodash.debounce";
import type { AsyncThunk, AsyncThunkConfig } from "@reduxjs/toolkit";

type SearchThunk = AsyncThunk<
    unknown,
    {
        query: string;
        limit?: number;
    },
    AsyncThunkConfig
>;

export const useAutocomplete = (searchAction: SearchThunk) => {
    const dispatch = useAppDispatch();
    const autocompleteRef = useRef<HTMLDivElement>(null);
    const [isAutocompleteOpen, setIsAutocompleteOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");


    const handleOnChangeSearch = async (value: string) => {
        setSearchValue(value);
        if (value) {
            await dispatch(searchAction({ query: value }));
        }

        if (!isAutocompleteOpen && value) {
            setIsAutocompleteOpen(true)
        } else if (isAutocompleteOpen && !value) {
            setIsAutocompleteOpen(false)
        }
    }

    const debouncedHandleOnChangeSearch = debounce(handleOnChangeSearch, 500);

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

    return { autocompleteRef, searchValue, debouncedHandleOnChangeSearch, isAutocompleteOpen }
}