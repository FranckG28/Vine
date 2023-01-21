export interface StrapiGetResponse<T> {
    data: T[];
    meta?: {
        pagination?: {
            pageCount?: number;
            page: number;
            pageSize: number;
            total: number;
        }
    };
}