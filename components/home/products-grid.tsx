import { dateToString } from "@/lib/utils";
import { Product } from "models/product";
import Image from "next/image";
import Link from "next/link";
import ErrorDisplay from "../shared/error-display";
import Card from "./card";

export default function ProductsGrid({ error, products }: { products: Product[], error: string }) {

    if (error) {
        return <ErrorDisplay error={error} />
    }

    if (!products) {
        return <ErrorDisplay error="No products found" />
    }

    return (
        <div className="my-10 grid w-full max-w-screen-xl animate-[slide-down-fade_0.5s_ease-in-out] grid-cols-1 gap-5 px-5 md:grid-cols-3 xl:px-0">
            {products.map(({ attributes: { title, link, image, page, updatedAt } }, index) => (
                <Link href={link} key={index} target="_blank" rel="noreferrer">
                    <Card
                        title={title}
                        description={dateToString(new Date(Date.parse(updatedAt))) + ((!page) ? " " : " - *page " + page + "*")}
                        demo={<Image alt="Product thumbnail" src={image} width={250} height={250}></Image>}
                    />
                </Link>
            ))}
        </div>

    );
}