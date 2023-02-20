import { FastFilter } from "models/fast-filter";
import { Filter } from "models/filter";
import { useState } from "react";
import { useFiltersModal } from "./filters-modal";

const activeFilterStyle = "bg-indigo-500 text-white hover:bg-indigo-600 border-t border-indigo-200 shadow-xl";
const inactiveFilterStyle = "border border-indigo-200 text-indigo-500 hover:bg-indigo-500 hover:text-white hover:shadow-lg";

export default function FiltersButton({
    fastFilters,
    onFiltersChange
}: {
    fastFilters: FastFilter[],
    onFiltersChange: (filters: Filter[]) => void
}) {

    const [activeIds, setActiveIds] = useState<number[]>([]);

    const { FiltersModal, setShowFiltersModal } = useFiltersModal({
        fastFilters,
        initialActiveIds: activeIds,
        applyFilters: (ids: number[]) => {
            setActiveIds(ids);
            onFiltersChange(
                fastFilters
                    .filter((filter) => ids.includes(filter.id))
                    .map((filter) => filter.filters).flat()
            );
            setShowFiltersModal(false);
        }
    });

    return <>
        <FiltersModal />
        <button
            onClick={() => setShowFiltersModal(true)}
            className={`flex items-center justify-center rounded-xl px-8 py-3 transition focus:outline-none ${activeIds.length > 0 ? activeFilterStyle : inactiveFilterStyle}`}
        >
            {activeFilterStyle.length > 0 ? `Filtres (${activeIds.length})` : "Filtrer"}
        </button>
    </>

}