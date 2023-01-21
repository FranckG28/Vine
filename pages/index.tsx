import Layout from "@/components/layout";
import Balancer from "react-wrap-balancer";
import { motion } from "framer-motion";
import { FADE_DOWN_ANIMATION_VARIANTS } from "@/lib/constants";
import { Product } from "models/product";
import ProductsGrid from "@/components/home/products-grid";
import { getProducts } from "@/lib/vpp-api";
import { useEffect, useState } from "react";

export default function Home(props: { products: Product[], error: string, pageCount: number, count: number }) {

  const [error, setError] = useState(props.error);
  const [products, setProductList] = useState(props.products);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  const loadMore = () => {
    setIsLoading(true);
    getProducts(page + 1).then((res) => {
      setProductList([...products, ...res.data.data]);
      setPage(page + 1);
    }).catch((error) => {
      setError(error);
    }).finally(() => {
      setIsLoading(false);
    });
  };

  return (
    <Layout>
      <motion.div
        className="max-w-xl px-5 xl:px-0"
        initial="hidden"
        whileInView="show"
        animate="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        <motion.h1
          className="bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent drop-shadow-sm md:text-7xl md:leading-[5rem]"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <Balancer>Vine Dashboard</Balancer>
        </motion.h1>
        <motion.p
          className="mt-6 text-center text-gray-500 md:text-xl"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <Balancer>
            {props.count + " produits, " + props.pageCount + " pages"}
          </Balancer>
        </motion.p>
      </motion.div>

      <ProductsGrid products={products} error={error} />

      <motion.button variants={FADE_DOWN_ANIMATION_VARIANTS}
        className="px-5 py-3 bg-white bg-opacity-60 border-t-slate-300 shadow rounded-lg hover:bg-opacity-100 hover:shadow-md transition-all duration-100 ease-in-out z-10"
        disabled={props.pageCount <= page || isLoading}
        onClick={loadMore}>
        {isLoading ? "Chargement en cours ..." :
          page >= props.pageCount ? "C'est fini 😿" : "Charger la suite"}
      </motion.button>
    </Layout >
  );
}

export async function getServerSideProps() {
  try {
    const res = await getProducts();
    return {
      props: {
        products: res.data.data,
        pageCount: res.data.meta?.pagination?.pageCount,
        count: res.data.meta?.pagination?.total
      }
    };
  } catch (error) {
    return {
      props: {
        error
      }
    }
  }
}