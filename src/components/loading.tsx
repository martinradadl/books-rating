import classNames from "classnames";
import { FaSpinner } from "react-icons/fa"

interface LoadingProps {
    className?: string;
}

export const Loading = ({ className }: LoadingProps) => {
    return (
        <div className={classNames("flex flex-col gap-2 justify-center items-center",
            !className?.includes("h-") && "h-96",
            className)}>
            <FaSpinner size={36} className="animate-spin" />
            <p className="text-4xl font-semibold">Loading...</p>
        </div>
    )
}