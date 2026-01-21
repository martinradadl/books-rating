import { FaAmazon, FaApple } from "react-icons/fa"
import { Link } from "react-router-dom"

export const HomeAuthContainerMobile = () => {
    return (

        <div className="flex flex-col items-center text-center mt-[48px] px-[12px]">
            <p className="text-[22px] font-bold mb-2.5">
                Meet your next favorite book.
            </p>

            <p className="text-sm">
                Find and read more books you'll love. Be part of Goodreads, the world's largest community for readers like you.
            </p>

            <div className="my-6">
                <Link to="https://www.amazon.com" className="w-full flex justify-center items-center mb-4 bg-[#f5d47a] hover:bg-[#F2B84B] border border-[#B38B22] text-sm leading-[2] py-2 px-3 rounded-[3px]">
                    <FaAmazon className="mr-2" size={24} /> Continue with Amazon
                </Link>

                <Link to="https://www.apple.com" className="w-full flex justify-center items-center mb-4 bg-white border border-black text-sm leading-[2] py-2 px-3 rounded-[3px]">
                    <FaApple className="mr-2" size={22} /> Continue with Apple
                </Link>

                <Link to="/sign-up" className="w-full flex justify-center items-center ga mb-4 bg-[#F4F1EA] hover:bg-[#F2EADB] border border-[#D6D0C4] text-sm leading-[2] py-2 px-3 rounded-[3px]">
                    Sign up with email
                </Link>

                <p className="text-sm mb-4">
                    By creating an account, you agree to the Goodreads{" "}
                    <span className="text-[#00635D] cursor-pointer hover:underline">Terms of Service</span> and{" "}
                    <span className="text-[#00635D] cursor-pointer hover:underline">Privacy Policy</span>.
                </p>

                <p className="text-sm">
                    Already a member?{" "}
                    <span className="text-[#00635D] cursor-pointer hover:underline">Sign In</span>
                </p>
            </div>
        </div>
    )
}