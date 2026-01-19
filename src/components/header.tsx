import classNames from "classnames";
import { useEffect, useState } from "react";
import { MdArrowForwardIos, MdSearch } from "react-icons/md"
import { useLocation, useNavigate } from "react-router-dom";

const tabs = [
    'Home',
    'My Books',
    'Browse ▼',
    'Community ▼'
]

export const Header = () => {
    const [showTabs, setShowTabs] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const isHomePage = pathname === '/';

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
        <div className={classNames("flex flex-col bg-[#faf8f6] top-0 z-50 sticky",
            { 'lg:static': isHomePage }
        )}>
            <div className={classNames("flex gap-3 items-center justify-center h-10 bg-[#617054] text-white cursor-pointer",
                { 'lg:hidden': isHomePage }
            )}>
                <p className="text-lg font-semibold">Season Article</p>
                <p className="text-sm hidden md:block">Check this special article here</p>
                <MdArrowForwardIos size={16} />
            </div>

            <div className={classNames("w-full border-b border-gray-300 xl:px-[35px]",
                { "lg:w-[970px] lg:mx-auto lg:text-left": isHomePage }
            )}>
                <div className={classNames("flex w-full 2xl:w-[87.5%] mx-auto h-[50px] items-center justify-between relative 2xl:max-w-[1280px]",
                    { "lg:h-fit": isHomePage }
                )}>
                    <MdSearch size={28} className="md:hidden mx-2.5 cursor-pointer" />

                    <p className={classNames("text-3xl font-bold focus:ring-3 focus:ring-black focus:ring-offset-2 rounded cursor-pointer absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 md:mx-3.5",
                        { "lg:text-4xl lg:leading-20": isHomePage }
                    )}
                        onClick={() => { navigate('/') }}
                        tabIndex={0}
                    >
                        Books Rating
                    </p>

                    <div className={classNames("hidden xl:flex items-center h-full",
                        { "xl:hidden": isHomePage }
                    )}>
                        {tabs.map((label, i) => (
                            <button key={i} className="px-4 h-full flex items-center cursor-pointer hover:bg-black hover:text-white">{label}</button>
                        ))}
                    </div>

                    <div className={classNames("hidden md:flex flex-1 h-[32px] items-center",
                        { "md:hidden": isHomePage }
                    )}>
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

                    <button className={classNames('md:hidden bg-black text-white text-sm items-center rounded py-2 px-3 mr-2 cursor-pointer hover:bg-gray-600',
                        { "md:hidden": isHomePage }
                    )}>
                        Sign Up
                    </button>

                    <div className={classNames("hidden md:flex h-full",
                        { "md:hidden": isHomePage }
                    )}>
                        <p className="text-gray-800 px-3 h-full flex items-center hover:bg-black hover:text-white cursor-pointer">Sign in</p>
                        <p className="text-gray-800 px-3 h-full flex items-center xl:hidden hover:bg-black hover:text-white cursor-pointer">Join</p>
                    </div>
                </div>
            </div>

            <div className={classNames("xl:hidden flex md:justify-center border-b-1 border-gray-300 whitespace-nowrap transition-[50px] duration-300",
                { 'h-[50px] opacity-100 pointer-events-auto': showTabs },
                { 'h-0 opacity-0 pointer-events-none': !showTabs },
                { "lg:hidden": isHomePage })
            }>
                {tabs.map((label, i) => (
                    (!isHomePage || label !== 'Home') && (
                        <button key={i} className='flex flex-1 md:flex-none px-8 cursor-pointer hover:bg-black hover:text-white items-center justify-center'>
                            {label}
                        </button>
                    )
                ))}
            </div>
        </div>
    )
}