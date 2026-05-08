import { MdSearch } from "react-icons/md"

export const GenresSearchBarMobile = () => {
    return (
        <div className="relative w-full mb-2.5">
            <div className="absolute inset-y-0 left-0.5 px-1 flex items-center text-gray-700 cursor-pointer">
                <MdSearch size={24} />
            </div>
            <input
                type="text"
                placeholder="Find a genre by name"
                className="w-full text-sm py-2 px-8 border border-[#ccc] rounded leading-[1.2]"
            />
        </div>
    )
}