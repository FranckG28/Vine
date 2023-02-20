import { LoadingCircle } from "../shared/icons";

const enabledStyle = "bg-indigo-500 text-white hover:bg-indigo-600 border-t border-indigo-200 shadow-xl";
const disabledStyle = "text-indigo-600";

export default function Button({
    children,
    onClick,
    disabled,
    isLoading
}: {
    children: React.ReactNode,
    onClick: () => void,
    disabled?: boolean
    isLoading?: boolean
}) {
    return <button
        className={`rounded-xl flex items-center gap-2 px-6 py-2 transition duration-75 hover:scale-105 active:scale-95 font-medium ${disabled ? disabledStyle : enabledStyle}`}
        disabled={disabled || isLoading}
        onClick={onClick}>
        {isLoading && <LoadingCircle />}
        {children}
    </button>
}