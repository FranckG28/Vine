export interface Filter {
    [key: string | '$and' | '$or']: {
        [key: string]: any;
    };
}