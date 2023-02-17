export interface Filter {
    [key: string]: {
        [key: string]: string | number | boolean | null | string[] | number[] | boolean[] | Object;
    };
}