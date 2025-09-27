import classNames from "classnames";
import type React from "react";
import { MdOutlineExpandLess, MdOutlineExpandMore } from "react-icons/md";

type ExpandableContentProps = {
    content: React.ReactNode;
    label: string;
    isExpanded: boolean;
    setIsExpanded: ((isExpanded: boolean) => void)
    expandedLabel?: string;
}

export const ExpandableContent = ({
    label, expandedLabel, isExpanded, setIsExpanded, content
}: ExpandableContentProps) => {

    return (
        <div className="relative">
            {content}
            <div className={classNames("absolute bottom-0 bg-gradient-to-b from-transparent to-blue-300 w-full", !isExpanded && '')}>
                {(expandedLabel || !isExpanded) && (
                    <div
                        className={classNames('flex items-center gap-1 w-fit cursor-pointer group', isExpanded ? 'pt-4' : '')}
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        <p className="font-semibold group-hover:underline">
                            {isExpanded ? expandedLabel : label}
                        </p>

                        {isExpanded ? (
                            <MdOutlineExpandLess size={20} />
                        ) : (
                            <MdOutlineExpandMore size={20} />
                        )}
                    </div>
                )}

            </div>
        </div>
    )
}