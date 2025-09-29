import classNames from "classnames";

type LabelTextProps = {
    text: string;
    className?: string;
}

export const LabelText = ({ text, className }: LabelTextProps) => {
    return (
        <p className={classNames('text-gray-600 text-sm', className)} tabIndex={0}>
            {text}
        </p>
    );
}
