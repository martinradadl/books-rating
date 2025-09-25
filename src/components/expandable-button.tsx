import classNames from "classnames";
import { MdOutlineExpandLess, MdOutlineExpandMore } from "react-icons/md";

type ExpandableButtonProps = {
    label: string;
    isExpanded: boolean;
    setIsExpanded: ((isExpanded: boolean) => void)
    expandedLabel?: string;
}

export const ExpandableButton = ({
    label, expandedLabel, isExpanded, setIsExpanded
}: ExpandableButtonProps) => {
    const dynamicStyles = isExpanded ? 'pt-4' : ''

    return (
        <div>
            {expandedLabel || !isExpanded ? (
                <div
                    className={classNames('flex items-center gap-1 w-fit cursor-pointer group', dynamicStyles)}
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
            ) : null}

        </div>
    )
}