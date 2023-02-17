import { FastFilter } from "models/fast-filter";
import { Filter } from "models/filter";
import { useState } from "react";

export default function FilterItem({ filter, onChange }: {
    filter: FastFilter;
    onChange: (filter: Filter) => void;
}) {

    const [checked, setChecked] = useState(false);

    return <button
        className="flex p-5 gap-5 border border-slate-200 rounded-xl w-full hover:bg-slate-50 transition"
        onClick={() => {
            onChange(!checked ? filter.filters : {});
            setChecked(!checked);
        }}>
        <input
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 mt-1 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 pointer-events-none" checked={checked} readOnly />
        <div className="flex flex-col gap-2 text-start">
            <p>{filter.name}</p>
            <p className="text-sm text-slate-500">{filter.description}</p>
        </div>
    </button>
}