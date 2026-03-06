"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const BrandLogosSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const brands = [
    { name: "Amazon", logo: "/logos/amazon.png", alt: "Amazon" },
    { name: "MIAN", logo: "/logos/Mian.png", alt: "MIAN" },
    { name: "Spotify", logo: "/logos/BDA-desktop.jpg", alt: "Spotify" },
    { name: "Uber", logo: "/logos/uber.png", alt: "Uber" },
    { name: "Apple", logo: "/logos/apple.png", alt: "Apple" },
    { name: "Google", logo: "/logos/google.png", alt: "Google" },
    { name: "PayPal", logo: "/logos/paypal.png", alt: "PayPal" },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Logos grid */}
        <div
          ref={ref}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
        >
          {brands.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: index * 0.06 }}
            >
              <div className="group bg-white rounded-2xl h-32 border border-gray-200 hover:border-black hover:shadow-xl transition-all duration-300 flex items-center justify-center p-6">

                <img
                  src={brand.logo}
                  alt={brand.alt}
                  className="h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />

              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="mt-12 flex flex-wrap justify-center items-center gap-4 text-sm text-gray-600 font-medium">
          <span>Instant Activation</span>
          <span className="text-gray-400">•</span>
          <span>186+ Countries</span>
          <span className="text-gray-400">•</span>
          <span>Secure Payments</span>
        </div>

      </div>
    </section>
  );
};

export default BrandLogosSection;
