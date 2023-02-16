export interface Product {
    id: number;
    attributes: {
        title: string;
        link: string;
        image: string;
        page: number;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
    }
}