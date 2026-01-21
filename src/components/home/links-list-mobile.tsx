
type LinksListMobileProps = {
    list: string[];
    className?: string;
}

export const LinksListMobile = ({ list, className }: LinksListMobileProps) => {
    return (
        <div className={`text-left ${className}`}>
            <ul style={{ columnCount: 2 }}>
                {list.map((item) => (
                    <li key={item} className="text-[#00635D] text-sm cursor-pointer hover:underline mb-[1.2em] w-fit">
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    )
}