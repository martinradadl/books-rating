import classNames from "classnames";

interface LinksListDesktopProps {
    list: string[];
    columns?: number;
    className?: string;
}

export const LinksListDesktop = ({ list, columns, className }: LinksListDesktopProps) => {
    const columnsSize = Math.ceil(list.length / (columns || 1));
    const divideList = () => {
        const result = [];

        for (let i = 0; i < list.length; i += columnsSize) {
            result.push(list.slice(i, i + columnsSize));
        }

        return result;
    }
    const dividedList = divideList();

    return (
        <div className="flex text-[#00635d] text-sm">
            {dividedList.map((column, i) => {
                return (
                    <div className="flex flex-col flex-1" key={i}>
                        {column.map((item) => {
                            return (
                                <p className={classNames("hover:underline cursor-pointer w-fit", className)}>{item}</p>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}