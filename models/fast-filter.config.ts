import { FastFilter } from "./fast-filter";

export const removeUselessProductsFilter: FastFilter = {
    name: "Cacher les produits répétitifs",
    description: "Masquer les coques et cartouches d'encres.",
    filters: [
        {
            title: {
                $notContainsi: ["coque", "cartouche"],
            }
        }
    ]
}