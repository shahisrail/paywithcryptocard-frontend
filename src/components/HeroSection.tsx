"use client";

import { motion } from "framer-motion";
import { ArrowRight, Shield } from "lucide-react";
import { useInView } from "react-intersection-observer";
import Link from "next/link";

const HeroSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="home"
      className="relative min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-4.5rem)] px-4 sm:px-6 lg:px-8 bg-white flex items-center"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">

          {/* Left Content */}
          <motion.div
            ref={ref}
            initial={false}
            animate={inView ? { x: 0 } : { x: -50 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto lg:mx-0 flex flex-col justify-center"
          >

            {/* Headline */}
            <motion.h1
              initial={false}
              animate={inView ? { y: 0 } : { y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-5  leading-tight tracking-tight text-black"
            >
              Turn Crypto Into a Virtual Visa Card
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={false}
              animate={inView ? { y: 0 } : { y: 30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed"
            >
              Create a virtual crypto Visa card instantly. No KYC required. Fund with BTC, ETH, USDT, USDC or XMR and pay online worldwide.
            </motion.p>

            {/* Value + CTA Row */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6 mt-6 sm:mt-8 justify-between ">

              {/* No KYC */}
              <motion.div
                initial={false}
                animate={inView ? { y: 0 } : { y: 30 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex items-center gap-3 sm:gap-4"
              >
                <div className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 bg-black rounded-xl flex items-center justify-center shadow-lg">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-black">
                    No KYC Required
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Start using instantly
                  </p>
                </div>
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={false}
                animate={inView ? { y: 0 } : { y: 30 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="w-full sm:w-auto"
              >
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-black text-white font-semibold text-sm sm:text-base rounded-xl hover:bg-gray-900 transition-all duration-200 shadow-lg hover:shadow-xl w-full sm:w-fit"
                >
                  <span>Create Free Account</span>
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </motion.div>

            </div>

          </motion.div>

          {/* Right Content - Image */}
          <div className="relative flex justify-center items-center mt-6 sm:mt-8 lg:mt-0">
            <img
              src="/logos/hero3.png"
              alt="virtual crypto visa card"
              className="w-full max-w-md lg:max-w-lg"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;