import { useDebouncedCallback } from "use-debounce";

export default function SearchInput({ onSearch, className }: {
    onSearch: (search: string) => void;
    className?: string;
}) {

    const debounceSearch = useDebouncedCallback((value) => onSearch(value), 500);

    return <div className={"relative text-slate-500 " + className}>
        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </button>
        </span>
        <input type="search"
            className="py-3 bg-slate-50 transition border-slate-200 rounded-xl pl-12 focus:outline-none focus:bg-white focus:text-gray-900 hover:bg-white focus:shadow-lg hover:shadow-lg w-full"
            placeholder="Rechercher un produit ..."
            onChange={(e) => {
                debounceSearch(e.target.value);
            }}></input>
    </div>
}