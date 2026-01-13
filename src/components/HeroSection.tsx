"use client";

import { motion } from "framer-motion";
import { ArrowRight, CreditCard, Shield, TrendingUp, Zap } from "lucide-react";
import { useInView } from "react-intersection-observer";
import Link from "next/link";

const HeroSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="home" className="relative pt-32 pb-12 lg:pb-16 px-4 sm:px-6 lg:px-8 bg-white">

      <div className="relative responsive-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left max-w-2xl mx-auto lg:mx-0"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full mb-8"
            >
              <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></div>
              <span className="text-emerald-700 text-sm font-medium">No KYC Required</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight"
            >
              <span className="text-gray-900 block mb-2">Turn crypto into a</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 block">virtual Visa® card</span>
              <span className="text-gray-900 block">in minutes</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-gray-600 mb-10 leading-relaxed"
            >
              Top up with crypto and pay online like a normal card.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
            >
              <Link
                href="/register"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-base rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl group w-full sm:w-auto"
              >
                Create account
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-700 font-medium text-base rounded-xl border border-gray-300 hover:bg-gray-50 transition-all duration-200 w-full sm:w-auto"
              >
                Learn more
              </a>
            </motion.div>
          </motion.div>

          {/* Right Content - Card Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative max-w-sm mx-auto">
              {/* Card Container with Glass Effect */}
                <div className="relative bg-white rounded-3xl p-6 shadow-xl border border-gray-100">

                  {/* Virtual Visa Card */}
                  <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-6 mb-6 relative overflow-hidden shadow-lg">

                    <div className="relative z-10">
                      {/* Card Header */}
                      <div className="flex justify-between items-start mb-8">
                        <div className="w-16 h-10 bg-white/20 rounded-lg backdrop-blur-sm flex items-center justify-center">
                          <span className="text-white font-bold text-xl">VISA</span>
                        </div>
                        <div className="text-white/80 text-xs font-medium bg-white/10 px-3 py-1 rounded-full">
                          VIRTUAL
                        </div>
                      </div>

                      {/* Card Number */}
                      <div className="text-white text-xl font-mono tracking-widest mb-6">
                        •••• •••• •••• 4532
                      </div>

                      {/* Card Footer */}
                      <div className="flex justify-between items-end">
                        <div>
                          <div className="text-white/70 text-xs mb-1 uppercase tracking-wider">Card Holder</div>
                          <div className="text-white font-semibold">YOUR NAME</div>
                        </div>
                        <div className="text-right">
                          <div className="text-white/70 text-xs mb-1 uppercase tracking-wider">Expires</div>
                          <div className="text-white font-semibold">12/26</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Balance Display */}
                  <div className="text-center px-4">
                    <div className="text-gray-500 text-sm font-medium mb-2">Loaded</div>
                    <div className="text-5xl font-bold text-gray-900 mb-4">$1,000.00</div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-500 text-xs">Available Balance</div>
                        <div className="font-semibold text-gray-900">$1,000.00</div>
                      </div>
                      <div>
                        <div className="text-gray-500 text-xs">Spent</div>
                        <div className="font-semibold text-gray-900">$0.00</div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;