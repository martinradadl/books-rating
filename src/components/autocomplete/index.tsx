import { AllResultsItem } from "./all-results-item";

interface AutocompleteInputProps<T extends { _id: string }> {
    inputComponent: React.ReactNode;
    ItemListComponent: React.ComponentType<{
        item: T;
        setIsOpen: (isOpen: boolean) => void
        setIsMobileHeaderSearchBarOpen?: (isOpen: boolean) => void;
    }>;
    items: T[];
    inputValue: string;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    handleClickOnAllResults: () => void;
    setIsMobileHeaderSearchBarOpen?: (isOpen: boolean) => void;
    allResultsItemClassName?: string;
}

export const AutocompleteInput = <T extends { _id: string }>
    ({ inputComponent, ItemListComponent, items, inputValue, isOpen, setIsOpen, setIsMobileHeaderSearchBarOpen, handleClickOnAllResults, allResultsItemClassName }: AutocompleteInputProps<T>) => {


    return (
        <div>
            {inputComponent}
            {isOpen &&
                <div className="absolute ml-[-12px] lg:ml-0 flex flex-col justify-center lg:shadow-md">
                    {items?.map((item) => (
                        <ItemListComponent key={item._id} item={item} setIsOpen={setIsOpen}
                            setIsMobileHeaderSearchBarOpen={setIsMobileHeaderSearchBarOpen} />
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