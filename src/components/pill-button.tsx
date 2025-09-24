interface Props {
    label: string;
    bgColor: string;
    bgColorHover: string;
    width?: number;
    paddingX?: number;
    fitWidth?: boolean;
}

export const PillButton = ({ label, bgColor, bgColorHover, width, paddingX, fitWidth }: Props) => {
    return (
        <button className={`text-white font-bold items-center rounded-full py-2${fitWidth ? ' w-fit ' : ' '}${paddingX ? ` px-${paddingX} ` : ' '}${width ? ` w-${width} ` : ' '}bg-${bgColor} hover:bg-${bgColorHover} focus:outline-none focus:ring-3 focus:ring-${bgColor} focus:ring-offset-3`}>
            {label}
        </button>
    )
}