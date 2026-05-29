import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import type { ReactNode } from "react";


export interface NavBarDropdownProps {
    items: { name: string; urlPath: string | undefined }[];
    extraContent?: (handleOnclick: (urlPath: string) => void) => ReactNode;
    setActiveDropdown: (label: string | null) => void;
}

export const NavBarDropdown = ({ items, extraContent, setActiveDropdown }: NavBarDropdownProps) => {
    const navigate = useNavigate();

    const handleOnClick = (urlPath: string) => {
        navigate(urlPath || "")
        setActiveDropdown(null)
    }


    return <div className={classNames("w-full shadow-md bg-white",
        extraContent
            ? "lg:w-[547px]"
            : "lg:w-[160px]"
    )}>
        <div className="flex">
            <ul className={classNames("py-2",
                extraContent ? "lg:w-[160px]" : "w-full"
            )}>
                {items.map((item) => (
                    <li key={item.name}
                        className="text-sm leading-8 px-4 cursor-pointer hover:underline"
                        onClick={() => { handleOnClick(item.urlPath || "") }}>
                        {item.name}
                    </li>
                ))}
            </ul>

            {extraContent && extraContent(handleOnClick)}
        </div>
    </div>
}