interface SearchBarDesktopProps {
    onChange: (value: string) => void
}

export const GenresSearchBarDesktop = ({ onChange }: SearchBarDesktopProps) => {
    return <div className="bg-[#eeeeee] p-2.5 mb-3 rounded-[3px] text-sm flex">
        <input
            type="text"
            placeholder="Find a genre by name"
            onChange={(e) => onChange(e.target.value)}
            className="w-[508px] py-2 px-8 border border-[#DCD6CC] rounded-[3px] leading-[1.2] bg-white"
        />
    </div>
}