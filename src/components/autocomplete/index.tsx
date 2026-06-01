import { AllResultsItem } from "./all-results-item";

interface AutocompleteInputProps<T extends { _id: string }> {
    inputComponent: React.ReactNode;
    ItemListComponent: React.ComponentType<{ item: T }>;
    items: T[];
    inputValue: string;
    isOpen?: boolean;
}

export const AutocompleteInput = <T extends { _id: string }>
    ({ inputComponent, ItemListComponent, items, inputValue, isOpen }: AutocompleteInputProps<T>) => {
    return (
        <div>
            {inputComponent}
            {isOpen &&
                <div className="absolute ml-[-12px] lg:ml-0 w-screen lg:w-[508px] flex flex-col justify-center lg:shadow-md">
                    {items?.map((item) => (
                        <ItemListComponent key={item._id} item={item} />
                    ))}
                    <AllResultsItem inputValue={inputValue} />
                </div>}

        </div>
    )
}