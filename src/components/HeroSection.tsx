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
    <section id="home" className="relative min-h-[70vh] py-20 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 bg-gray-100 flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">

          {/* Left Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto lg:mx-0"
          >
            
            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight tracking-tight text-black"
            >
              Turn Crypto Into a Virtual Visa Card
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed"
            >
              Get your virtual Visa card in seconds. Top up with crypto and pay online anywhere Visa is accepted.
            </motion.p>

            {/* Value + CTA Row */}
            <div className="flex flex-col sm:flex-row sm:items-center  gap-4 md:justify-between sm:gap-6">

              {/* No KYC */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex items-center gap-4"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-black rounded-xl flex items-center justify-center shadow-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-black">
                    No KYC Required
                  </h3>
                  <p className="text-sm text-gray-600">
                    Start using instantly
                  </p>
                </div>
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="w-full sm:w-auto"
              >
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 bg-black text-white font-semibold text-sm sm:text-base rounded-xl hover:bg-gray-900 transition-all duration-200 shadow-lg hover:shadow-xl w-full sm:w-fit"
                >
                  <span className=" ">Create Free Account</span>
               
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
              </motion.div>

            </div>

          </motion.div>

          {/* Right Content - Card */}
          <div className="relative flex justify-center items-center mt-8 sm:mt-10 lg:mt-0">

            <div className="relative w-full max-w-[320px] sm:max-w-[360px] md:max-w-[380px] aspect-[420/250] rounded-2xl sm:rounded-3xl bg-gradient-to-br from-black via-[#0a0a0a] to-black shadow-[0_25px_80px_rgba(0,0,0,0.6)] border border-[#1f1f1f] overflow-hidden">

              {/* Gold Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-transparent"></div>

              {/* Shine */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent"></div>

              <div className="relative z-10 p-4 sm:p-5 md:p-6 h-full flex flex-col justify-between">

                {/* Top */}
                <div className="flex justify-between items-start">

                  <div className="px-2.5 sm:px-3 md:px-4 py-1 bg-yellow-200 text-black text-[10px] sm:text-xs font-bold rounded-full">
                    VIRTUAL
                  </div>

                  <div className="text-yellow-200 text-2xl sm:text-3xl font-bold tracking-wider sm:tracking-widest">
                    VISA
                  </div>

                </div>

                {/* Card Number */}
                <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 text-base sm:text-lg md:text-xl font-mono tracking-[2px] sm:tracking-[4px] md:tracking-[6px] text-white font-bold">
                  <span>••••</span>
                  <span>••••</span>
                  <span>••••</span>
                  <span>7890</span>
                </div>

                {/* Bottom */}
                <div className="flex justify-between gap-2">

                  <div className="min-w-0">
                    <p className="text-[10px] sm:text-xs text-gray-400">CARD HOLDER</p>
                    <p className="text-yellow-100 text-sm sm:text-base font-semibold truncate">
                      YOUR NAME
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-[10px] sm:text-xs text-gray-400">EXPIRES</p>
                    <p className="text-yellow-100 text-sm sm:text-base font-semibold">
                      12/28
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;