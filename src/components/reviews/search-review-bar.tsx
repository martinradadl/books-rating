import { MdOutlineTune, MdSearch } from "react-icons/md"

export const SearchReviewBar = () => {
    return (
        <div className="flex items-center lg:w-3/4 mb-4">
            <div
                className="flex items-center flex-1 mr-3 px-3 h-11 rounded-full bg-gray-50 border border-gray-600 focus-within:ring-3 focus-within:ring-black focus-within:ring-offset-3"
            >
                <button
                    type="button"
                    className="text-gray-500 mr-2 rounded-full focus:ring-3 focus:ring-black focus:ring-offset-8"
                >
                    <MdSearch size={18} />
                </button>
                <input
                    type="text"
                    placeholder="Search review text"
                    className="flex-1 text-sm text-gray-800 placeholder:text-gray-500"
                />
            </div>
            <button className="flex items-center gap-1 h-11 px-4 border border-gray-600 rounded-full bg-white text-sm font-semibold hover:bg-gray-100 focus:ring-3 focus:ring-black focus:ring-offset-3">
                <MdOutlineTune size={18} />
                Filters
            </button>
        </div>
    )
}