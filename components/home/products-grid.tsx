import { dateToString } from "@/lib/utils";
import { Product } from "models/product";
import Link from "next/link";
import ErrorDisplay from "../shared/error-display";
import Card from "./card";

export default function ProductsGrid({ error, products, hightlighter }: {
    products: Product[],
    error: string,
    hightlighter: (product: Product) => boolean
}) {

    if (error) {
        return <ErrorDisplay error={error} />
    }

    if (!products) {
        return <ErrorDisplay error="No products found" />
    }

    return (
        <div className="my-10 grid w-full max-w-screen-xl animate-[slide-down-fade_0.5s_ease-in-out] grid-cols-1 gap-5 px-5 md:grid-cols-3 xl:px-0">
            {products.map((product, index) => (
                <Link href={product.attributes.link} key={index} target="_blank" rel="noreferrer">
                    <Card
                        className={hightlighter(product) ? "border-2 border-indigo-400/30 shadow-xl shadow-indigo-400/30" : ""}
                        title={product.attributes.title}
                        description={dateToString(new Date(Date.parse(product.attributes.updatedAt))) + ((!product.attributes.page) ? " " : " - *page " + product.attributes.page + "*")}
                        // eslint-disable-next-line @next/next/no-img-element
                        demo={<img alt="Product thumbnail" src={product.attributes.image} width={250} height={250}></img>}
                    />
                </Link>
            ))}
        </div>

    );
}