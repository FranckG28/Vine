import Layout from "@/components/layout";
import Balancer from "react-wrap-balancer";
import { motion } from "framer-motion";
import { API_PRODUCTS_COLLECTION, FADE_DOWN_ANIMATION_VARIANTS } from "@/lib/constants";
import axios from "axios";
import { Product } from "models/product";
import ProductsGrid from "@/components/home/products-grid";

axios.defaults.headers.common["Authorization"] = `Bearer ${process.env.VPP_API_KEY}`;

export default function Home({ products, error }: { products: Product[], error: string }) {
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
            Héhé
          </Balancer>
        </motion.p>
      </motion.div>
      <ProductsGrid products={products} error={error} />
    </Layout >
  );
}

export async function getServerSideProps() {
  try {
    const res = await axios.get(API_PRODUCTS_COLLECTION);
    return {
      props: {
        products: res.data.data
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