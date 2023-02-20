import Modal from "@/components/shared/modal";
import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
} from "react";
import { FastFilter } from "models/fast-filter";
import FilterChip from "./filter-chip";

interface FiltersHookInterface {
  fastFilters: FastFilter[];
  initialActiveIds: number[];
  applyFilters: (activeFiltersIds: number[]) => void;
}

interface FilterModalInterface extends FiltersHookInterface {
  showFiltersModal: boolean;
  setShowFilterModal: Dispatch<SetStateAction<boolean>>;
}

const FiltersModal = ({
  showFiltersModal,
  setShowFilterModal,
  fastFilters,
  initialActiveIds,
  applyFilters,
}: FilterModalInterface) => {

  const [activeFilters, setActiveFilters] = useState<number[]>(initialActiveIds);

  const onFilterClick = (id: number) => {
    if (activeFilters.includes(id)) {
      setActiveFilters(activeFilters.filter((activeId) => activeId !== id));
    } else {
      setActiveFilters([...activeFilters, id]);
    }
  };

  const toggleAllFilters = useCallback(() => {
    if (activeFilters.length === fastFilters.length) {
      setActiveFilters([]);
    } else {
      setActiveFilters(fastFilters.map((fastFilter) => fastFilter.id));
    }
  }, [activeFilters, fastFilters]);

  return (
    <Modal showModal={showFiltersModal} setShowModal={setShowFilterModal}>
      <div className="w-full overflow-hidden shadow-xl md:max-w-xl md:rounded-2xl md:border md:border-gray-200">
        <div className="flex flex-col items-left justify-center border-b border-gray-200 bg-white px-8 py-6 pt-8 gap-5">

          <div>
            <h3 className="font-display text-2xl font-bold">Masquer des produits</h3>
            <p className="text-slate-600">Sélectionnez les produits que vous ne souhaitez pas voir.</p>
          </div>

          <div>
            <button onClick={toggleAllFilters} className="font-medium text-indigo-500 hover:text-indigo-600 active:text-indigo-700">
              {activeFilters.length === fastFilters.length ? "Tout déselectionner" : "Tout sélectionner"}
            </button>
          </div>

          <div className="flex flex-wrap gap-3">
            {fastFilters.map((fastFilter) =>
              <FilterChip key={fastFilter.id} fastFilter={fastFilter} onClick={() => onFilterClick(fastFilter.id)} active={activeFilters.includes(fastFilter.id)} />
            )}
          </div>

        </div>

        <div className="flex flex-col space-y-4 bg-gray-50 px-2 py-6 md:px-12">
          <button
            className="border-t transition border-indigo-400 bg-indigo-500 text-white hover:bg-indigo-600 flex h-10 w-full items-center justify-center space-x-3 rounded-lg shadow hover:shadow-lg focus:outline-none font-semibold"
            onClick={() => applyFilters(activeFilters)}>
            Appliquer {activeFilters.length > 0 && `(${activeFilters.length} ${activeFilters.length > 1 ? "filtres" : "filtre"})`}
          </button>
        </div>
      </div>
    </Modal >
  );
};

export function useFiltersModal({
  fastFilters,
  initialActiveIds,
  applyFilters
}: FiltersHookInterface) {
  const [showFiltersModal, setShowFiltersModal] = useState(false);

  const FiltersModalCallback = useCallback(() => {
    return (
      <FiltersModal
        showFiltersModal={showFiltersModal}
        setShowFilterModal={setShowFiltersModal}
        applyFilters={applyFilters}
        fastFilters={fastFilters}
        initialActiveIds={initialActiveIds}
      />
    );
  }, [showFiltersModal, setShowFiltersModal, applyFilters, fastFilters, initialActiveIds]);

  return useMemo(
    () => ({ setShowFiltersModal, FiltersModal: FiltersModalCallback }),
    [setShowFiltersModal, FiltersModalCallback],
  );
}
