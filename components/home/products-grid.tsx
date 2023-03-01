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
            {products.map((product, index) => {

                const isHighlighted = hightlighter(product);
                return <span className="relative inline-flex mt-1 mb-0 hover:mt-0 hover:mb-1 transition-all" key={index}>
                    {isHighlighted && <span className="flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1 z-10 rounded-full bg-indigo-500"></span>}
                    <Link href={product.attributes.link} target="_blank" rel="noreferrer" className="w-full h-full">
                        <Card
                            className={isHighlighted ? "border border-indigo-400/30" : ""}
                            title={product.attributes.title}
                            description={dateToString(new Date(Date.parse(product.attributes.updatedAt))) + ((!product.attributes.page) ? " " : " - *page " + product.attributes.page + "*")}
                            // eslint-disable-next-line @next/next/no-img-element
                            demo={<img alt="Product thumbnail" src={product.attributes.image} width={250} height={250}></img>}
                        />
                    </Link>
                </span>

            }
            )}
        </div>

    );
}