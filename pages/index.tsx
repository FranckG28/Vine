import Layout from "@/components/layout";
import Balancer from "react-wrap-balancer";
import { motion } from "framer-motion";
import { FADE_DOWN_ANIMATION_VARIANTS } from "@/lib/constants";
import { Product } from "models/product";
import ProductsGrid from "@/components/home/products-grid";
import { getProducts } from "@/lib/vpp-api";
import { useCallback, useEffect, useState } from "react";
import { getLatestDate, isSameDay, timeAgo } from "@/lib/utils";
import SearchInput from "@/components/home/search-input";
import { Filter } from "models/filter";
import FiltersButton from "@/components/home/filters-button";
import { defaultFilters } from "models/fast-filter.config";
import Button from "@/components/home/button";

export default function Home() {

  const [latestUpdate, setLatestUpdate] = useState<Date>(new Date());
  const [error, setError] = useState("");
  const [products, setProductList] = useState([] as Product[]);
  const [pageCount, setPageCount] = useState(0);
  const [resultCount, setResultCount] = useState(0);

  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [filters, setFilters] = useState<Filter[]>([]);

  const load = useCallback((reset: boolean, requestedPage?: number) => {
    if (!isLoading) {
      console.log("Loading products ...");
      setIsLoading(true);
      getProducts(requestedPage || 1, {
        search: searchInput,
        filters
      }).then((res) => {
        const newProducts = reset ? res.data.data : [...products, ...res.data.data];
        setProductList(newProducts);
        setPageCount(res.data.meta?.pagination?.pageCount || 0);
        setResultCount(res.data.meta?.pagination?.total || 0);
        setLatestUpdate(
          getLatestDate(newProducts
            .map((product) => new Date(Date.parse(product.attributes.updatedAt)))
          )
        );
      }).catch((error: Error) => {
        setError(error.message);
      }).finally(() => {
        setIsLoading(false);
      });
    }
  }, [filters, isLoading, products, searchInput]);

  const hightlighter = useCallback((product: Product): boolean => {
    return isSameDay(new Date(Date.parse(product.attributes.updatedAt)), new Date(latestUpdate));
  }, [latestUpdate]);

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

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
            {"Dernière mise à jour " + timeAgo(latestUpdate)}
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
          {resultCount} produits
        </motion.p>

      </motion.div>

      <ProductsGrid products={products} error={error} hightlighter={hightlighter} />

      {!error && <motion.div variants={FADE_DOWN_ANIMATION_VARIANTS}>
        <Button onClick={loadMore} disabled={pageCount <= page} isLoading={isLoading}>
          {isLoading ? "Chargement ..." :
            page >= pageCount ? "C'est fini 😿" : "Voir plus"}
        </Button>
      </motion.div>}

    </Layout >
  );
}