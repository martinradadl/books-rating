import { FaApple, FaGooglePlay, FaLinkedin } from "react-icons/fa"
import { FaSquareFacebook, FaSquareInstagram, FaSquareTwitter } from "react-icons/fa6"

export const Footer = () => {
    return (
        <div className="flex justify-between px-3 py-8 xl:mx-[35px] 2xl:w-[87.5%] 2xl:mx-auto">
            <div className="flex flex-col w-[200px] md:w-fit md:flex-row">
                <div className="flex flex-col mb-6 md:w-[200px]">
                    <p className="text-base font-bold">COMPANY</p>
                    <p className="text-sm cursor-pointer hover:underline">About us</p>
                    <p className="text-sm cursor-pointer hover:underline">Careers</p>
                    <p className="text-sm cursor-pointer hover:underline">Terms</p>
                    <p className="text-sm cursor-pointer hover:underline">Privacy</p>
                    <p className="text-sm cursor-pointer hover:underline">Interest Based Ads</p>
                    <p className="text-sm cursor-pointer hover:underline">Ads Preferences</p>
                    <p className="text-sm cursor-pointer hover:underline">Help</p>
                </div>


                <div className="flex flex-col mb-6 md:w-[200px]">
                    <p className="text-base font-bold">WORK WITH US</p>
                    <p className="text-sm cursor-pointer hover:underline">Authors</p>
                    <p className="text-sm cursor-pointer hover:underline">Advertise</p>
                    <p className="text-sm cursor-pointer hover:underline">Authors & ads blog</p>
                </div>

                <div className="flex flex-col mb-6 md:w-[200px]">
                    <p className="text-base font-bold">CONNECT</p>
                    <div className="flex gap-2">
                        <FaSquareFacebook size={26} className="text-gray-500 cursor-pointer" />
                        <FaSquareTwitter size={26} className="text-gray-500 cursor-pointer" />
                        <FaSquareInstagram size={26} className="text-gray-500 cursor-pointer" />
                        <FaLinkedin size={26} className="text-gray-500 cursor-pointer" />
                    </div>
                </div>
            </div>

            <div className="flex flex-col mb-6 gap-1">
                <div className="flex flex-col lg:flex-row gap-1 lg:gap-2">
                    <div className="w-[135px] h-10 flex items-center bg-black text-white px-3 rounded-lg cursor-pointer">
                        <FaApple size={24} className="text-white mr-2" />
                        <div className="leading-tight text-left text-xs">
                            <p className="text-[10px]">Download on the</p>
                            <p className="text-[16px] font-semibold leading-[1.1]">App Store</p>
                        </div>
                    </div>

                    <div className="w-[135px] h-10 flex items-center bg-black text-white px-3 rounded-lg cursor-pointer">
                        <FaGooglePlay size={24} className="text-white mr-2" />
                        <div className="leading-tight text-left text-xs">
                            <p className="text-[10px]">GET IT ON</p>
                            <p className="text-[14px] font-semibold leading-[1.1]">Google Play</p>
                        </div>
                    </div>
                </div>

                <p className="text-sm mt-2.5">© 2025 Books Rating</p>
            </div>
        </div>
    )
}