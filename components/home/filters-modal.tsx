import Modal from "@/components/shared/modal";
import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
} from "react";
import { Filter } from "models/filter";

const FiltersModal = ({
  showFiltersModal,
  setShowFilterModal,
  onApply
}: {
  showFiltersModal: boolean;
  setShowFilterModal: Dispatch<SetStateAction<boolean>>;
  onApply: (filter: Filter) => void;
}) => {

  return (
    <Modal showModal={showFiltersModal} setShowModal={setShowFilterModal}>
      <div className="w-full overflow-hidden shadow-xl md:max-w-md md:rounded-2xl md:border md:border-gray-200">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center md:px-16">
          <h3 className="font-display text-2xl font-bold">Filtrer</h3>
        </div>

        <div className="flex flex-col space-y-4 bg-gray-50 px-2 py-6 md:px-12">
          <button
            className="border-t transition border-indigo-400 bg-indigo-500 text-white hover:bg-indigo-600 flex h-10 w-full items-center justify-center space-x-3 rounded-lg shadow hover:shadow-lg focus:outline-none"
            onClick={() => onApply({})}
          >
            Appliquer
          </button>
        </div>
      </div>
    </Modal>
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
