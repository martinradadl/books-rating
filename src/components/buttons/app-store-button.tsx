import { FaApple } from "react-icons/fa"

export const AppStoreButton = () => {
    return (
        <div className="w-[135px] h-10 flex items-center bg-black text-white px-3 rounded-lg cursor-pointer">
            <FaApple size={24} className="text-white mr-2" />
            <div className="leading-tight text-left text-xs">
                <p className="text-[10px]">Download on the</p>
                <p className="text-[16px] font-semibold leading-[1.1]">App Store</p>
            </div>
        </div>
    )
}