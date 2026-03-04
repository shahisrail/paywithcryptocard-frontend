"use client";

import { motion } from "framer-motion";
import { ArrowRight, Shield, CreditCard } from "lucide-react";
import { useInView } from "react-intersection-observer";
import Link from "next/link";

const HeroSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="home" className="relative pt-20 pb-24 lg:pt-28 lg:pb-32 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight text-black"
            >
              Turn Crypto Into a Virtual Visa Card
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-10 leading-relaxed"
            >
              Get your virtual Visa card in seconds. Top up with crypto and pay online anywhere Visa is accepted.
            </motion.p>

            {/* Value Props */}
            <div className="grid grid-cols-2 gap-6 mb-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex items-start gap-4"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-black mb-1">No KYC Required</h3>
                  <p className="text-base text-gray-600">Start using instantly</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex items-start gap-4"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-black mb-1">Create Card</h3>
                  <p className="text-base text-gray-600">Instant virtual card</p>
                </div>
              </motion.div>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/register"
                className="inline-flex items-center justify-center px-10 py-5 bg-indigo-600 text-white font-semibold text-lg rounded-xl hover:bg-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl w-full sm:w-auto"
              >
                Create Free Account
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Content - Premium Card */}
          <div className="relative flex justify-center">
            <div className="relative w-full max-w-md mx-auto">
              {/* Premium Virtual Visa Card */}
              <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-black rounded-3xl p-8 shadow-2xl relative overflow-hidden border border-slate-700">
                {/* Subtle animated shine effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-20"></div>

                <div className="relative z-10">
                  {/* Card Header */}
                  <div className="flex justify-between items-start mb-10">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-12 h-8 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
                          <span className="text-white font-extrabold text-xl">VISA</span>
                        </div>
                      </div>
                      <div className="px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                        <span className="text-white/90 text-xs font-semibold tracking-wider">VIRTUAL</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Number */}
                  <div className="text-white text-2xl font-mono tracking-widest mb-10">
                    ••••• •••• •••• 4589
                  </div>

                  {/* Card Footer */}
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-white/70 text-xs mb-1 uppercase tracking-wider font-medium">Card Holder</div>
                      <div className="text-white font-semibold text-base">YOUR NAME</div>
                    </div>
                    <div className="text-right">
                      <div className="text-white/70 text-xs mb-1 uppercase tracking-wider font-medium">Expires</div>
                      <div className="text-white font-semibold text-base">12/28</div>
                    </div>
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
