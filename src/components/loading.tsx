import { FaSpinner } from "react-icons/fa"
import { twMerge } from 'tailwind-merge'

interface LoadingProps {
    className?: string;
}

export const Loading = ({ className }: LoadingProps) => {
    return (
        <div className={twMerge("flex flex-col flex-1 gap-2 justify-center items-center", className
        )}>
            <FaSpinner size={36} className="animate-spin" />
            <p className="text-4xl font-semibold">Loading...</p>
        </div>
    )
}