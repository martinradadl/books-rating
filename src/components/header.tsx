import { useEffect, useState } from "react";
import { MdArrowForwardIos, MdSearch } from "react-icons/md"

const tabs = [
    'Home',
    'My Books',
    'Browse ▼',
    'Community ▼'
]

export const Header = () => {
    const [showTabs, setShowTabs] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > 300 && currentScrollY > lastScrollY) {
                setShowTabs(false);
            } else if (lastScrollY - currentScrollY > 30) {
                setShowTabs(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <div className="flex flex-col bg-[#faf8f6] sticky top-0 z-50">
            <div className="flex gap-3 items-center justify-center h-10 bg-[#617054] text-white cursor-pointer">
                <p className="text-lg font-semibold">Season Article</p>
                <p className="text-sm hidden md:block">Check this special article here</p>
                <MdArrowForwardIos size={16} />
            </div>

            <div className="flex w-full h-[50px] items-center justify-between border-b-1 border-gray-300 relative">
                <MdSearch size={28} className="md:hidden mx-2.5 cursor-pointer" />

                <p className="text-3xl focus:ring-3 focus:ring-black focus:ring-offset-2 rounded cursor-pointer 
                absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 md:mx-3.5"
                    tabIndex={0}
                >
                    Books Rating
                </p>

                <div className="hidden xl:flex items-center h-full">
                    {tabs.map((label, i) => (
                        <button key={i} className="px-4 h-full flex items-center cursor-pointer hover:bg-black hover:text-white">{label}</button>
                    ))}
                </div>

                <div className="hidden md:flex flex-1 h-[32px] items-center">
                    <div className="relative w-[392px] pl-4">
                        <input
                            type="text"
                            placeholder="Search books"
                            className="w-full h-8 pl-3 border border-gray-300 rounded-md"
                        />
                        <div className="absolute inset-y-0 right-0 px-2 flex items-center text-gray-700 cursor-pointer">
                            <MdSearch size={20} />
                        </div>
                    </div>
                </div>

                <button className='md:hidden bg-black text-white text-sm items-center rounded py-2 px-3 mr-2 cursor-pointer hover:bg-gray-600'>
                    Sign Up
                </button>

                <div className="hidden md:flex h-full">
                    <p className="text-gray-800 px-3 h-full flex items-center hover:bg-black hover:text-white cursor-pointer">Sign in</p>
                    <p className="text-gray-800 px-3 h-full flex items-center xl:hidden hover:bg-black hover:text-white cursor-pointer">Join</p>
                </div>
            </div>

            <div className={`xl:hidden flex md:justify-center border-b-1 border-gray-300 whitespace-nowrap transition-[50px] duration-300 
                ${showTabs ? 'h-[50px] opacity-100 pointer-events-auto' : 'h-0 opacity-0 pointer-events-none'}`}>
                {tabs.map((label, i) => (
                    <button key={i} className='flex flex-1 md:flex-none px-8 cursor-pointer hover:bg-black hover:text-white items-center justify-center'>
                        {label}
                    </button>
                ))}
            </div>
        </div>
    )
}