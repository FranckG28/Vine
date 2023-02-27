import { notContainsiList } from "@/lib/filter-utils";
import { FastFilter } from "./fast-filter";


export const defaultFilters: FastFilter[] = [
    {
        id: 1,
        name: "Cartouches",
        filters: notContainsiList("title", ["cartouche", "toner", "deskjet", "officejet"])
    },
    {
        id: 2,
        name: "Coques",
        filters: notContainsiList("title", ["coque", "étui", "toner"])
    },
    {
        id: 3,
        name: "Compléments alimentaires",
        filters: notContainsiList("title", ["complément", "alimentaire", "gélule", "vitamine", "comprimé"])
    },
    {
        id: 4,
        name: "Bracelets",
        filters: notContainsiList("title", ["bracelet"])
    }
];