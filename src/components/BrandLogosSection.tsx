"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const BrandLogosSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const brands = [
    { name: "Visa", color: "#1A1F71" },
    { name: "Amazon", color: "#FF9900" },
    { name: "Netflix", color: "#E50914" },
    { name: "Spotify", color: "#1DB954" },
    { name: "Uber", color: "#000000" },
    { name: "Apple", color: "#000000" },
    { name: "Google", color: "#4285F4" },
    { name: "PayPal", color: "#003087" }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-8">
            Accepted at millions of online stores worldwide
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="flex items-center"
            >
              <div
                className="text-2xl md:text-3xl font-bold"
                style={{ color: brand.color }}
              >
                {brand.name}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandLogosSection;
