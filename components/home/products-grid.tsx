import { Product } from "models/product";
import ErrorDisplay from "../shared/error-display";
import Card from "./card";

export default function ProductsGrid({ products, error }: { products: Product[], error: string }) {

    if (error) {
        return <ErrorDisplay error={error} />
    }

    if (!products) {
        return <ErrorDisplay error="No products found" />
    }

    console.log(products);

    return (
        < div className="my-10 grid w-full max-w-screen-xl animate-[slide-down-fade_0.5s_ease-in-out] grid-cols-1 gap-5 px-5 md:grid-cols-3 xl:px-0">
            {products.map(({ attributes: { title, link, image } }, index) => (
                <a href={link} key={index} target="_blank" rel="noreferrer">
                    <Card
                        title={title}
                        description=""
                        demo={<img src={image}></img>}
                    />
                </a>
            ))}
        </div>
    );
}