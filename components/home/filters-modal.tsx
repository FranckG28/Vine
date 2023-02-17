import Modal from "@/components/shared/modal";
import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
} from "react";
import { Filter } from "models/filter";
import { defaultFilters } from "models/fast-filter.config";
import FilterItem from "./filter-item";

const FiltersModal = ({
  showFiltersModal,
  setShowFilterModal,
  onApply
}: {
  showFiltersModal: boolean;
  setShowFilterModal: Dispatch<SetStateAction<boolean>>;
  onApply: (filter: Filter) => void;
}) => {

  const [filters, setFilters] = useState<{ [id: number]: Filter }>({});

  return (
    <Modal showModal={showFiltersModal} setShowModal={setShowFilterModal}>
      <div className="w-full overflow-hidden shadow-xl md:max-w-md md:rounded-2xl md:border md:border-gray-200">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-8 py-6 pt-8 text-center">
          <h3 className="font-display text-2xl font-bold">Filtrer</h3>

          {defaultFilters.map((fastFilter) => <FilterItem key={fastFilter.id} filter={fastFilter} onChange={(content) => {
            setFilters({ ...filters, [fastFilter.id]: content });
          }} />)}

        </div>

        <div className="flex flex-col space-y-4 bg-gray-50 px-2 py-6 md:px-12">
          <button
            className="border-t transition border-indigo-400 bg-indigo-500 text-white hover:bg-indigo-600 flex h-10 w-full items-center justify-center space-x-3 rounded-lg shadow hover:shadow-lg focus:outline-none"
            onClick={() => onApply(Object.values(filters).reduce((acc, filter) => ({ ...acc, ...filter }), {}))}>
            Appliquer
          </button>
        </div>
      </div>
    </Modal >
  );
};

export function useFiltersModal(onApply: (filter: Filter) => void) {
  const [showFiltersModal, setShowFiltersModal] = useState(false);

  const FiltersModalCallback = useCallback(() => {
    return (
      <FiltersModal
        showFiltersModal={showFiltersModal}
        setShowFilterModal={setShowFiltersModal}
        onApply={onApply}
      />
    );
  }, [showFiltersModal, setShowFiltersModal, onApply]);

  return useMemo(
    () => ({ setShowFiltersModal, FiltersModal: FiltersModalCallback }),
    [setShowFiltersModal, FiltersModalCallback],
  );
}
