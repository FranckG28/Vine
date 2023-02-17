import { Filter } from "./filter";

export interface FastFilter {
    id: number;
    name: string;
    description: string;
    filters: Filter;
}