type LabelTextProps = {
    text: string;
    cursorPointer?: boolean;
    hoverUnderline?: boolean;
}

export const LabelText = ({ text, cursorPointer, hoverUnderline }: LabelTextProps) => {
    return (
        <p className={`text-gray-600 text-sm ${cursorPointer ? 'cursor-pointer' : ''} ${hoverUnderline ? 'hover:underline' : ''}`}>
            {text}
        </p>
    );
}
