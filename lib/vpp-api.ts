import axios from "axios";
import { Product } from "models/product";
import { StrapiGetResponse } from "models/strapi-get-response";
import { API_PRODUCTS_COLLECTION } from "./constants";

const qs = require("qs");

const vppAxios = axios.create({
    headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_VPP_API_KEY}`
    },
});

export const getProducts = (page = 1, search = "") => vppAxios.get<StrapiGetResponse<Product>>(API_PRODUCTS_COLLECTION + "?" + qs.stringify({
    pagination: {
        page,
        withCount: true,
    },
    ...((search && search !== "") && {
        filters: {
            title: {
                $containsi: search
            }
        }
    })
}, { encoreValuesOnly: true }));