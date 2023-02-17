import Layout from "@/components/layout";
import Balancer from "react-wrap-balancer";
import { motion } from "framer-motion";
import { FADE_DOWN_ANIMATION_VARIANTS } from "@/lib/constants";
import { Product } from "models/product";
import ProductsGrid from "@/components/home/products-grid";
import { getProducts } from "@/lib/vpp-api";
import { useCallback, useEffect, useState } from "react";
import { timeAgo } from "@/lib/utils";
import { LoadingCircle } from "@/components/shared/icons";
import SearchInput from "@/components/home/search-input";
import { useFiltersModal } from "@/components/home/filters-modal";
import CountingNumbers from "@/components/shared/counting-numbers";

const activeFilterStyle = "bg-indigo-500 text-white hover:bg-indigo-600 border-t border-indigo-400 hover:shadow-lg";
const inactiveFilterStyle = "border border-indigo-200 text-indigo-500 hover:bg-indigo-500 hover:text-white hover:shadow-lg";

export default function Home(props: { products: Product[], error: string, pageCount: number, count: number }) {

  const [latestUpdate, setLatestUpdate] = useState<number>(0);
  const [error, setError] = useState(props.error);
  const [products, setProductList] = useState(props.products);
  const [pageCount, setPageCount] = useState(props.pageCount);
  const [resultCount, setResultCount] = useState(props.count);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const { FiltersModal, setShowFiltersModal } = useFiltersModal(() => {
    setShowFiltersModal(false);
  });

  const load = useCallback((reset: boolean, requestedPage?: number) => {
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
  }, [searchInput, products]);


  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (!latestUpdate) {
      setLatestUpdate(Math.max(...products.map((product) => Date.parse(product.attributes.updatedAt))));
    }
  }, [latestUpdate, products]);

  useEffect(() => {
    setProductList([]);
    load(true);
  }, [searchInput]);

  const loadMore = () => {
    load(false, page + 1);
    setPage(page + 1);
  };

  return (
    <Layout>
      <FiltersModal />
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

        <motion.div variants={FADE_DOWN_ANIMATION_VARIANTS} className="flex max-md:flex-col gap-3 items-center">
          <SearchInput className="flex-1" onSearch={setSearchInput}></SearchInput>

          <button
            onClick={() => setShowFiltersModal(true)}
            className={"flex items-center justify-center rounded-xl px-8 py-3 transition focus:outline-none " + inactiveFilterStyle}
          >
            Filtrer
          </button>
        </motion.div>

        <motion.p
          className="text-center text-gray-500 md:text-xl"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <Balancer>
            <CountingNumbers className="inline" value={resultCount} /> produits
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