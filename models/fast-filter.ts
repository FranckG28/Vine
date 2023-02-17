import { Filter } from "./filter";

export interface FastFilter {
    name: string;
    description: string;
    filters: Filter[];
}