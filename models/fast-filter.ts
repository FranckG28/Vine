import { Filter } from "./filter";

export interface FastFilter {
    id: number;
    name: string;
    filters: Filter[];
}