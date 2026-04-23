import { FaSpinner } from "react-icons/fa"

export const Loading = () => {
    return (
        <div className="flex flex-col gap-2 justify-center items-center h-96">
            <FaSpinner size={36} className="animate-spin" />
            <p className="text-4xl font-semibold">Loading...</p>
        </div>
    )
}