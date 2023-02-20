import { FastFilter } from "models/fast-filter"

const inactiveStyle = "bg-red-50 text-red-700 border-red-200";
const activeStyle = "bg-red-500 text-white border-red-600 shadow-lg";

export default function FilterChip({
    fastFilter, active, onClick
}: {
    fastFilter: FastFilter,
    active: boolean,
    onClick: () => void
}) {
    return <button onClick={onClick} className={`rounded-full text-lg transition duration-75 px-3 py-1 border ${active ? activeStyle : inactiveStyle}`}>
        {fastFilter.name}
    </button>
}