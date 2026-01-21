import { FaGooglePlay } from "react-icons/fa"

export const GooglePlayButton = () => {
    return (
        <div className="w-[135px] h-10 flex items-center bg-black text-white px-3 rounded-lg cursor-pointer">
            <FaGooglePlay size={24} className="text-white mr-2" />
            <div className="leading-tight text-left text-xs">
                <p className="text-[10px]">GET IT ON</p>
                <p className="text-[14px] font-semibold leading-[1.1]">Google Play</p>
            </div>
        </div>)
}