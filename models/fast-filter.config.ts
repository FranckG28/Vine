import { FastFilter } from "./fast-filter";

export const removeUselessProductsFilter: FastFilter = {
    id: 1,
    name: "Cacher les produits répétitifs",
    description: "Masquer les coques et cartouches d'encres.",
    filter: {
        title: {
            $notContainsi: ["coque", "cartouche"],
        }
    }
}

export const defaultFilters: FastFilter[] = [
    removeUselessProductsFilter,
];