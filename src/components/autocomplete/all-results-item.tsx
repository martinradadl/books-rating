import classNames from "classnames";

interface AllResultsItem {
    inputValue: string;
    handleOnClick: () => void;
    className?: string;
}

export const AllResultsItem = ({ inputValue, handleOnClick, className }: AllResultsItem) => {

    return (
        <p className={classNames(
            "w-auto h-[40px] p-2 align-middle text-center cursor-pointer border-b border-[#D8D8D8] bg-white hover:underline z-50 text-[#00635D] text-sm leading-normal",
            className
        )}
            onClick={handleOnClick}>
            See all results for <span>"{inputValue}"</span>
        </p>
    )
}
