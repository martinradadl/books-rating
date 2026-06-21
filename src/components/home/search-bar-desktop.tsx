import { MdSearch } from "react-icons/md"

interface HomeSearchBarDesktopProps {
    onChange: (value: string) => void
}

export const HomeSearchBarDesktop = ({ onChange }: HomeSearchBarDesktopProps) => {
    return (
        <div className="relative w-[312px] text-sm">
            <div className="absolute inset-y-0 right-1 flex items-center text-[#999] cursor-pointer">
                <MdSearch size={20} />
            </div>
            <input
                type="text"
                placeholder="Title / Author / ISBN"
                className="w-full p-[5px] border border-[#999] rounded leading-[1.2]"
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    )
}