import { useNavigate } from "react-router-dom";
import classNames from "classnames";


export interface NavBarDropdownProps {
    items: { name: string; urlPath: string | undefined }[];
    extraContent?: React.ReactNode;
}

export const NavBarDropdown = ({ items, extraContent }: NavBarDropdownProps) => {
    const navigate = useNavigate();


    const handleClickOnItem = (urlPath: string) => {
        navigate(urlPath)
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
                        onClick={() => { handleClickOnItem(item.urlPath || "") }}>
                        {item.name}
                    </li>
                ))}
            </ul>

            {extraContent}
        </div>
    </div>
}