import { Link } from "react-router-dom";

type LinksListMobileItemProps = {
    title: string;
    url: string;
    count?: number;
    className?: string;
}

export const LinksListMobileItem = ({ title, url, count }: LinksListMobileItemProps) => {

    return (
        <Link to={url} className="text-[#00635D] text-sm cursor-pointer hover:underline mb-[0.8em]">
            {title} {count && `(${count})`}
        </Link>
    )
}