import { Filter } from "models/filter"

export const notContainsiList = (key: string, list: string[]): Filter[] => list.map((item) => ({
    [key]: {
        $notContainsi: item
    }
}))