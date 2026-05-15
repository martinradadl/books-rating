import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { NAV_BAR_DATA } from "../../data/nav-bar";
import { useNavigate } from "react-router-dom";
import { NavBarDropdown } from "./nav-bar-dropdown";

interface NavBarProps {
    isHomePage: boolean;
    isXl?: boolean
}
const IS_XL_VIEWPORT = window.innerWidth >= 1280;

export const NavBar = ({ isHomePage, isXl }: NavBarProps) => {
    const navigate = useNavigate();
    const [lastScrollY, setLastScrollY] = useState(0);
    const [showTabs, setShowTabs] = useState(true);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const { tabs, dropdownMenus, tabsUrlPaths } = NAV_BAR_DATA;
    const dropdownRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        const handleScroll = () => {
            if (IS_XL_VIEWPORT) {
                setShowTabs(false);
                return;
            }

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

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setActiveDropdown(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleClickOnTab = (label: string, hasDropdown: boolean) => {
        if (!hasDropdown) {
            navigate(tabsUrlPaths[label])
        }

        setActiveDropdown(prev =>
            prev === label ? null : label
        );
    }

    return (
        <div className={classNames("flex justify-center xl:items-center xl:h-full border-b border-gray-300 xl:border-0 whitespace-nowrap duration-300",
            {
                "h-[50px] opacity-100 pointer-events-auto": showTabs,
                "h-0 opacity-0 pointer-events-none": !showTabs && !IS_XL_VIEWPORT
            },
            {
                "hidden xl:flex": isXl,
                "xl:hidden": !isXl,
                "lg:hidden": isHomePage,
            })
        }>
            {tabs.map((label, i) => {
                const hasDropdown = label in dropdownMenus;
                const isActive = activeDropdown === label;

                return (
                    (!isHomePage || label !== 'Home') && (
                        <div key={i} className={classNames(
                            "flex md:justify-center xl:h-full xl:relative",
                            { "lg:relative": !dropdownMenus[label]?.extraContent }
                        )}>
                            <button
                                className='flex flex-1 md:flex-none px-8 xl:px-4 xl:h-full cursor-pointer hover:bg-black hover:text-white items-center justify-center'
                                onClick={() => {
                                    handleClickOnTab(label, hasDropdown)
                                }}
                            >
                                {label}
                                {hasDropdown && " ▼"}
                            </button>

                            {isActive && dropdownMenus[label] && (
                                <div
                                    ref={dropdownRef}
                                    className={classNames(
                                        "absolute top-full left-0 right-0 z-100",
                                        "left-0 w-screen",
                                        {
                                            "lg:left-1/2 lg:-translate-x-1/2 lg:w-fit xl:left-0 xl:translate-x-0":
                                                dropdownMenus[label]?.extraContent,

                                            "lg:left-0 lg:translate-x-0 lg:w-fit lg:mt-[1px]":
                                                !dropdownMenus[label]?.extraContent,
                                        }
                                    )}
                                >
                                    <NavBarDropdown
                                        items={dropdownMenus[label]?.items}
                                        extraContent={
                                            dropdownMenus[label]?.extraContent
                                        }
                                    />
                                </div>
                            )}
                        </div>
                    )
                )
            })}
        </div>
    )

}