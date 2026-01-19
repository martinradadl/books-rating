import { FaLinkedin } from "react-icons/fa"
import { FaSquareFacebook, FaSquareInstagram, FaSquareTwitter } from "react-icons/fa6"
import { GooglePlayButton } from "./buttons/google-play-button"
import { AppStoreButton } from "./buttons/app-store-button"

export const Footer = () => {
    return (
        <div className="flex justify-between px-3 py-8 xl:max-w-[1260px] xl:mx-[35px] 2xl:px-0 2xl:w-[87.5%] 2xl:mx-auto">
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
                    <AppStoreButton />
                    <GooglePlayButton />
                </div>

                <p className="text-sm mt-2.5">© 2025 Books Rating</p>
            </div>
        </div>
    )
}