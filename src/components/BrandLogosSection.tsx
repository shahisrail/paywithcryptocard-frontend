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
    { name: "netflix", logo: "/logos/images1.png", alt: "netflix" },
    { name: "Spotify", logo: "/logos/BDA-desktop.jpg", alt: "Spotify" },
    { name: "ebay", logo: "/logos/images2.png", alt: "ebay" },
    { name: "Apple", logo: "/logos/apple.png", alt: "Apple" },
    { name: "Google", logo: "/logos/google.png", alt: "Google" },
    { name: "PayPal", logo: "/logos/paypal.png", alt: "PayPal" },
    { name: "nike", logo: "/logos/Nike-Logo.png", alt: "Nike" },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
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
        <div className="mt-12 flex flex-wrap justify-center items-center gap-3 sm:gap-4 text-sm text-gray-600 font-medium">
          <span>Instant Activation</span>
          <span>186+ Countries</span>
          <span>Secure Payments</span>
        </div>
      </div>
    </section>
  );
};

export default BrandLogosSection;
