import axios from "axios";
import { Filter } from "models/filter";
import { Product } from "models/product";
import { StrapiGetResponse } from "models/strapi-get-response";
import { API_PRODUCTS_COLLECTION } from "./constants";

const qs = require("qs");

const vppAxios = axios.create({
    headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_VPP_API_KEY}`
    },
});

export const getProducts = (
    page = 1,
    {
        search = "",
        filters = {}
    }: {
        search?: string;
        filters?: Filter;
    } = {}) => {

    const query = {
        sort: "createdAt:desc",
        pagination: {
            page,
            withCount: true,
        },
        ...((search && search !== "") && {
            filters: {
                title: {
                    $containsi: search
                },
            }
        }),
        ...((filters && Object.keys(filters).length > 0) && {
            filters
        })
    };

    return vppAxios.get<StrapiGetResponse<Product>>(API_PRODUCTS_COLLECTION + "?" + qs.stringify(query, { encoreValuesOnly: true }));
};