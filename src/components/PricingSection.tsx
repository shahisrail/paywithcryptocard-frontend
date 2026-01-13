"use client";

import { motion } from "framer-motion";
import { Check, CreditCard, Shield, Zap } from "lucide-react";
import { useInView } from "react-intersection-observer";

const PricingSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="pricing" className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="responsive-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Simple, clear pricing with no hidden fees
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-2xl"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Simple Fee Structure</h3>
              <div className="text-5xl font-bold mb-2">3%</div>
              <p className="text-lg opacity-90">conversion fee on crypto top-ups</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6">
              <h4 className="text-xl font-semibold mb-4">What's Included:</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>Unlimited virtual Visa® cards</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>$1,000 limit per card</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>No monthly subscription</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>No hidden charges</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>Instant crypto to USD conversion</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>Bank-level security</span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm opacity-80 mb-4">
                Only one clear fee when you add funds. No other charges.
              </p>
              <a
                href="/register"
                className="inline-flex items-center px-8 py-4 bg-white text-indigo-600 font-semibold text-lg rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Get Started Now
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 text-center"
          >
            <p className="text-gray-600">
              Need clarification?{" "}
              <a href="#faq" className="text-indigo-600 hover:text-indigo-700 font-medium">
                Check our FAQ
              </a>{" "}
              or{" "}
              <a href="#support" className="text-indigo-600 hover:text-indigo-700 font-medium">
                contact support
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;