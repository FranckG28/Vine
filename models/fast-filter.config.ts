import { FastFilter } from "./fast-filter";

const notContainsiList = (key: string, list: string[]) => ({
    '$and': list.map((item) => ({
        [key]: {
            $notContainsi: item
        }
    }))
})

export const removeUselessProductsFilter: FastFilter = {
    id: 1,
    name: "Cacher les produits répétitifs",
    description: "Masquer les coques et cartouches d'encres.",
    filters: notContainsiList("title", ["coque", "cartouche", "cartouches", "étui"])
}

export const defaultFilters: FastFilter[] = [
    removeUselessProductsFilter,
];