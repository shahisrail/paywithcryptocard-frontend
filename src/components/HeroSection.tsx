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
    <section id="home" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white">
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
                <div className="flex-shrink-0 w-12 h-12 bg-black rounded-xl flex items-center justify-center shadow-lg">
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
                <div className="flex-shrink-0 w-12 h-12 bg-black rounded-xl flex items-center justify-center shadow-lg">
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
                className="inline-flex items-center justify-center px-10 py-5 bg-black text-white font-semibold text-lg rounded-xl hover:bg-gray-900 transition-all duration-200 shadow-lg hover:shadow-xl w-full sm:w-auto"
              >
                Create Free Account
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Content - Premium Card */}
       {/* Right Content - Premium Card */}
<div className="relative flex justify-center items-center">

<div className="relative w-[420px] h-[250px] rounded-3xl bg-gradient-to-br from-black via-[#0a0a0a] to-black shadow-[0_25px_80px_rgba(0,0,0,0.6)] border border-[#1f1f1f] overflow-hidden">

  {/* Gold Glow */}
  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-transparent"></div>

  {/* Shine */}
  <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent"></div>

  <div className="relative z-10 p-8 h-full flex flex-col justify-between">

    {/* Top */}
    <div className="flex justify-between items-start">

      <div className="px-4 py-1 bg-yellow-200 text-black text-xs font-bold rounded-full">
        VIRTUAL
      </div>

      <div className="text-yellow-200 text-3xl font-bold tracking-widest">
        VISA
      </div>

    </div>

    {/* Card Number */}
    <div className="flex items-center gap-4 text-[] text-xl font-mono tracking-[6px] text-white font-bold">

      <span>••••</span>
      <span>••••</span>
      <span>••••</span>
      <span>7890</span>

    </div>

    {/* Bottom */}
    <div className="flex justify-between">

      <div>
        <p className="text-xs text-gray-400">CARD HOLDER</p>
        <p className="text-yellow-100 font-semibold">YOUR NAME</p>
      </div>

      <div className="text-right">
        <p className="text-xs text-gray-400">EXPIRES</p>
        <p className="text-yellow-100 font-semibold">12/28</p>
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
