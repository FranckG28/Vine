import Layout from "@/components/layout";
import Balancer from "react-wrap-balancer";
import { motion } from "framer-motion";
import { FADE_DOWN_ANIMATION_VARIANTS } from "@/lib/constants";
import { Product } from "models/product";
import ProductsGrid from "@/components/home/products-grid";
import { getProducts } from "@/lib/vpp-api";
import { useEffect, useState } from "react";
import { dateToString, timeAgo } from "@/lib/utils";
import { useDebouncedCallback } from "use-debounce";
import { LoadingCircle } from "@/components/shared/icons";

export default function Home(props: { products: Product[], error: string, pageCount: number, count: number }) {

  const [latestUpdate, setLatestUpdate] = useState<number>(0);
  const [error, setError] = useState(props.error);
  const [products, setProductList] = useState(props.products);
  const [pageCount, setPageCount] = useState(props.pageCount);
  const [resultCount, setResultCount] = useState(props.count);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const debounceSearch = useDebouncedCallback((value) => setSearchInput(value), 500);

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (!latestUpdate) {
      setLatestUpdate(Math.max(...products.map((product) => Date.parse(product.attributes.updatedAt))));
    }
  }, [latestUpdate]);

  useEffect(() => {
    setProductList([]);
    load(true);
  }, [searchInput]);

  const load = (reset: boolean, requestedPage?: number) => {
    setIsLoading(true);
    getProducts(requestedPage || 1, {
      search: searchInput,
    }).then((res) => {
      setProductList(reset ? res.data.data : [...products, ...res.data.data]);
      setPageCount(res.data.meta?.pagination?.pageCount || 0);
      setResultCount(res.data.meta?.pagination?.total || 0);
    }).catch((error) => {
      setError(error);
    }).finally(() => {
      setIsLoading(false);
    });
  }

  const loadMore = () => {
    load(false, page + 1);
    setPage(page + 1);
  };

  return (
    <Layout>
      <motion.div
        className="max-w-xl px-5 xl:px-0 flex flex-col gap-8"
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
          className="text-center text-gray-500 md:text-xl"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <Balancer>
            {"Dernière mise à jour " + timeAgo(new Date(latestUpdate))}
          </Balancer>
        </motion.p>

        <motion.input
          className="sm:flex items-center w-72 text-left space-x-3 px-4 h-12 border-slate-500 bg-white ring-1 ring-slate-900/10 hover:ring-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:shadow-sm rounded-lg text-slate-800 placeholder:text-slate-400 dark:bg-slate-800 dark:ring-0 dark:text-slate-300 dark:highlight-white/5 dark:hover:bg-slate-700 mx-auto"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
          type="text"
          placeholder="Rechercher un produit ..."
          onChange={(e) => {
            debounceSearch(e.target.value);
          }}
        >
        </motion.input>

        <motion.p
          className="text-center text-gray-500 md:text-xl"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <Balancer>
            {resultCount + " produits"}
          </Balancer>
        </motion.p>

      </motion.div>

      <ProductsGrid products={products} error={error} />

      <motion.button variants={FADE_DOWN_ANIMATION_VARIANTS}
        className="px-5 py-3 bg-white bg-opacity-60 border-t-slate-300 shadow rounded-lg hover:bg-opacity-100 hover:shadow-md transition-all duration-100 ease-in-out z-10 flex gap-2 items-center justify-center mx-auto"
        disabled={pageCount <= page || isLoading}
        onClick={loadMore}>
        {isLoading ? "" :
          page >= pageCount ? "C'est fini 😿" : "Charger la suite"}
        {isLoading && <LoadingCircle />}
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