interface HeaderSearchBarMobileProps {
    onChange: (value: string) => void
    handleCancel: () => void;
}

export const HeaderSearchBarMobile = ({ onChange, handleCancel }: HeaderSearchBarMobileProps) => {

    return (
        <div className="w-full h-[50px] px-2 flex bg-[#faf8f6]">
            <input
                type="text"
                placeholder="Search Books"
                className="h-9 flex flex-1 text-sm py-2 px-1 mt-2 mb-2.5 mr-2 border border-[#ccc] rounded leading-[1.2]"
                onChange={(e) => onChange(e.target.value)}
            />
            <button className="text-[#00635D] cursor-pointer" onClick={handleCancel}>
                Cancel
            </button>
        </div>
    )
}