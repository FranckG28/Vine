import Layout from "@/components/layout";
import Balancer from "react-wrap-balancer";
import { motion } from "framer-motion";
import { FADE_DOWN_ANIMATION_VARIANTS } from "@/lib/constants";
import { Product } from "models/product";
import ProductsGrid from "@/components/home/products-grid";
import { getProducts } from "@/lib/vpp-api";
import { useCallback, useEffect, useState } from "react";
import { timeAgo } from "@/lib/utils";
import SearchInput from "@/components/home/search-input";
import CountingNumbers from "@/components/shared/counting-numbers";
import { Filter } from "models/filter";
import FiltersButton from "@/components/home/filters-button";
import { defaultFilters } from "models/fast-filter.config";
import Button from "@/components/home/button";

export default function Home(props: { products: Product[], error: string, pageCount: number, count: number }) {

  const [latestUpdate, setLatestUpdate] = useState<number>(0);
  const [error, setError] = useState(props.error);
  const [products, setProductList] = useState(props.products);
  const [pageCount, setPageCount] = useState(props.pageCount);
  const [resultCount, setResultCount] = useState(props.count);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [filters, setFilters] = useState<Filter[]>([]);

  const load = useCallback((reset: boolean, requestedPage?: number) => {
    setIsLoading(true);
    getProducts(requestedPage || 1, {
      search: searchInput,
      filters
    }).then((res) => {
      setProductList(reset ? res.data.data : [...products, ...res.data.data]);
      setPageCount(res.data.meta?.pagination?.pageCount || 0);
      setResultCount(res.data.meta?.pagination?.total || 0);
    }).catch((error) => {
      setError(error);
    }).finally(() => {
      setIsLoading(false);
    });
  }, [searchInput, products, filters]);


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
  }, [searchInput, filters]);

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

        <motion.div variants={FADE_DOWN_ANIMATION_VARIANTS} className="flex max-md:flex-col gap-3 items-center">
          <SearchInput className="flex-1" onSearch={setSearchInput}></SearchInput>
          <FiltersButton fastFilters={defaultFilters} onFiltersChange={setFilters} />
        </motion.div>

        <motion.p
          className="text-center text-gray-500 md:text-xl"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <CountingNumbers className="inline" value={resultCount} /> produits
        </motion.p>

      </motion.div>

      <ProductsGrid products={products} error={error} />

      <motion.div variants={FADE_DOWN_ANIMATION_VARIANTS}>
        <Button onClick={loadMore} disabled={pageCount <= page} isLoading={isLoading}>
          {page >= pageCount ? "C'est fini 😿" : "Voir plus"}
        </Button>
      </motion.div>

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