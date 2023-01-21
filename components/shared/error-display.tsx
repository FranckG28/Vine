import { FADE_DOWN_ANIMATION_VARIANTS } from "@/lib/constants";
import { motion } from "framer-motion";
import Balancer from "react-wrap-balancer";

export default function ErrorDisplay({ error }: { error: string }) {
    return <motion.p
        className="mt-6 text-center text-gray-500 md:text-xl"
        variants={FADE_DOWN_ANIMATION_VARIANTS}
    >
        <Balancer>
            {error}
        </Balancer>
    </motion.p>
}