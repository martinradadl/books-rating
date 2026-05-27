import { useNavigate } from "react-router-dom";

interface AllResultsItem {
    inputValue: string;
}

export const AllResultsItem = ({ inputValue }: AllResultsItem) => {
    const navigate = useNavigate();

    const handleOnClick = () => {
        navigate("/search")
    }

    return (
        <p className="w-auto h-[40px] p-2 align-middle text-center cursor-pointer border-b border-[#D8D8D8]
         bg-white hover:underline z-10 text-[#00635D] text-sm leading-normal"
            onClick={handleOnClick}>
            See all results for <span>"{inputValue}"</span>
        </p>
    )
}
