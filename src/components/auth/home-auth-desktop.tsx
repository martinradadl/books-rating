import { FaAmazon, FaApple } from "react-icons/fa"
import { Link } from "react-router-dom"
import { Separator } from "../separator"

export const HomeAuthContainerDesktop = () => {
    return (
        <div className="flex flex-col items-center text-center absolute z-60 right-5 mt-[-380px] p-6 border border-[#D8D8D8] bg-white rounded-[10px]">
            <div className="w-[250px]">
                <p className="text-[18px] font-semibold pt-1 pb-3.5">
                    Discover & read more
                </p>

                <div className="text-[14px]">
                    <Link to="https://www.amazon.com" className="w-full flex justify-center items-center mb-3.5 p-[8px_12px] bg-[#f5d47a] hover:bg-[#F2B84B] border border-[#B38B22] text-sm leading-[2] py-2 px-3 rounded-[3px]">
                        <FaAmazon className="mr-2" size={18} /> Continue with Amazon
                    </Link>

                    <Link to="https://www.apple.com" className="w-full flex justify-center items-center mb-3.5 p-[8px_12px] bg-white border border-black text-sm leading-[2] py-2 px-3 rounded-[3px]">
                        <FaApple className="mr-2" size={16} /> Continue with Apple
                    </Link>

                    <Link to="/sign-up" className="w-full flex justify-center items-center ga mb-3.5 p-[8px_12px] bg-[#382110] hover:bg-[#4A2E1A] text-white border border-[#D6D0C4] text-sm leading-[2] py-2 px-3 rounded-[3px]">
                        Sign up with email
                    </Link>

                    <p className="text-xs mb-4">
                        By creating an account, you agree to the Goodreads{" "}
                        <span className="text-[#00635D] cursor-pointer hover:underline">Terms of Service</span> and{" "}
                        <span className="text-[#00635D] cursor-pointer hover:underline">Privacy Policy</span>.
                    </p>

                    <Separator className="my-6" />

                    <p className="text-base">
                        Already a member?{" "}
                        <span className="text-[#00635D] cursor-pointer hover:underline">Sign In</span>
                    </p>
                </div>
            </div>
        </div>
    )
}