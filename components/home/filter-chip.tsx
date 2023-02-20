import { FastFilter } from "models/fast-filter"
import { Eye, EyeOff } from "lucide-react"

const inactiveStyle = "bg-indigo-50 text-indigo-700 border-indigo-200";
const activeStyle = "bg-indigo-500 text-white border-indigo-600 shadow-lg";

export default function FilterChip({
    fastFilter, active, onClick
}: {
    fastFilter: FastFilter,
    active: boolean,
    onClick: () => void
}) {
    return <button onClick={onClick} className={`rounded-full flex items-center gap-2 text-lg transition duration-75 px-3 py-1 border ${active ? activeStyle : inactiveStyle}`}>
        <div className={`${active ? "" : "opacity-50"}`}>
            {active ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
        </div>
        {fastFilter.name}
    </button >
}