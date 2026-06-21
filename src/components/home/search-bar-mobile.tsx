import { MdSearch } from "react-icons/md"

interface HomeSearchBarMobileProps {
    onChange: (value: string) => void
}

export const HomeSearchBarMobile = ({ onChange }: HomeSearchBarMobileProps) => {
    return (
        <div className="relative w-full px-2.5">
            <div className="absolute inset-y-0 left-2 px-2 flex items-center text-gray-700 cursor-pointer">
                <MdSearch size={20} />
            </div>
            <input
                type="text"
                placeholder="Search books and authors"
                className="w-full text-base py-2 px-8 border border-[#ccc] rounded leading-[1.2]"
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    )
}