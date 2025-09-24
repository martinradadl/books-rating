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
    return (
        <div>
            {expandedLabel || !isExpanded ? (
                <div
                    className={`flex items-center gap-1 w-fit cursor-pointer group ${isExpanded ? 'pt-4' : ''}`}
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