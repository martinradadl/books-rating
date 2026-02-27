import classNames from "classnames";
import { createPortal } from "react-dom";

interface ConfirmModalProps {
    isOpen: boolean;
    title?: string;
    message?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function ConfirmModal({
    isOpen,
    title = "Confirm",
    message = "Are you sure?",
    onConfirm,
    onCancel,
}: ConfirmModalProps) {
    return createPortal(
        <div
            className={classNames(
                "fixed inset-0 z-50 flex items-center justify-center",
                "bg-black/10 transition-opacity duration-200",
                {
                    "opacity-100 pointer-events-auto": isOpen,
                    "opacity-0 pointer-events-none": !isOpen,
                }
            )}
            onClick={(e) => { onCancel(); e.stopPropagation() }}
        >
            <div
                className={classNames(
                    "bg-white rounded shadow-lg w-full max-w-sm p-6",
                    "flex flex-col items-center",
                    "transform transition-all duration-200",
                    {
                        "scale-100 opacity-100": isOpen,
                        "scale-95 opacity-0": !isOpen,
                    }
                )}
            >
                <p className="text-xl text-[#382110] font-semibold mb-[15px]">
                    {title}
                </p>

                <p className="text-base text-[#382110] mb-[25px]">
                    {message}
                </p>

                <button
                    onClick={onConfirm}
                    className="w-[80%] bg-[#382110] hover:bg-[#4A2E1A] text-white border border-[#D6D0C4] text-sm py-2 px-3 rounded-[3px] mb-4 cursor-pointer"
                >
                    Confirm
                </button>

                <button
                    onClick={onCancel}
                    className="w-[80%] bg-white border border-black text-sm py-2 px-3 rounded-[3px] cursor-pointer"
                >
                    Cancel
                </button>
            </div>
        </div>,
        document.body
    );
}