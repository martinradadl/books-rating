import classNames from "classnames";
import { useMemo } from "react";

interface LinksListDesktopProps {
    list: string[];
    columns?: number;
    className?: string;
}

export const LinksListDesktop = ({ list, columns, className }: LinksListDesktopProps) => {
    const dividedList = useMemo(() => {
        const columnsSize = Math.ceil(list.length / (columns || 1));
        const result: typeof list[] = [];

        for (let i = 0; i < list.length; i += columnsSize) {
            result.push(list.slice(i, i + columnsSize));
        }

        return result;
    }, [JSON.stringify(list), columns]); // eslint-disable-line

    return (
        <div className="flex text-[#00635d] text-sm">
            {dividedList.map((column, i) => {
                return (
                    <div className="flex flex-col flex-1" key={i}>
                        {column.map((item) => {
                            return (
                                <p className={classNames("hover:underline cursor-pointer w-fit", className)} key={item}>{item}</p>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}