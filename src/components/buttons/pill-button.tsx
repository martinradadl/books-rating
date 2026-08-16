import classNames from "classnames";

interface Props {
  label: string;
  className?: string;
  handleOnClick?: () => void;
}

export const PillButton = ({ label, className, handleOnClick }: Props) => {
  return (
    <button
      className={classNames(
        "bg-black text-white font-bold items-center rounded-full py-2 cursor-pointer hover:bg-gray-600 focus:ring-3 focus:ring-black focus:ring-offset-3",
        className
      )}
      onClick={handleOnClick}
    >
      {label}
    </button>
  );
};
