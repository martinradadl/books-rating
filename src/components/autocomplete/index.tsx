import { AllResultsItem } from "./all-results-item";
import { twMerge } from "tailwind-merge";

interface AutocompleteInputProps<T extends { _id: string }> {
    inputComponent: React.ReactNode;
    ItemListComponent: React.ComponentType<{
        item: T;
        setIsOpen: (isOpen: boolean) => void
        setIsMobileHeaderSearchBarOpen?: (isOpen: boolean) => void;
        className?: string;
    }>;
    items: T[];
    inputValue: string;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    handleClickOnAllResults: () => void;
    setIsMobileHeaderSearchBarOpen?: (isOpen: boolean) => void;
    allResultsItemClassName?: string;
    resultsListClassName?: string;
    itemClassName?: string;
}

export const AutocompleteInput = <T extends { _id: string }>
    ({ inputComponent, ItemListComponent, items, inputValue, isOpen, setIsOpen, setIsMobileHeaderSearchBarOpen, handleClickOnAllResults, allResultsItemClassName, resultsListClassName, itemClassName }: AutocompleteInputProps<T>) => {


    return (
        <div>
            {inputComponent}
            {isOpen &&
                <div className={twMerge("absolute ml-[-12px] lg:ml-0 flex flex-col justify-center lg:shadow-md", resultsListClassName)}>
                    {items?.map((item) => (
                        <ItemListComponent
                            key={item._id}
                            item={item}
                            setIsOpen={setIsOpen}
                            setIsMobileHeaderSearchBarOpen={setIsMobileHeaderSearchBarOpen}
                            className={itemClassName}
                        />
                    ))}
                    <AllResultsItem
                        inputValue={inputValue}
                        handleOnClick={handleClickOnAllResults}
                        className={allResultsItemClassName}
                    />
                </div>}

        </div>
    )
}