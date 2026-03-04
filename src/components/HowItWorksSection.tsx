"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Wallet, ArrowRight, CreditCard, ShoppingBag } from "lucide-react";

const HowItWorksSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const steps = [
    {
      icon: Wallet,
      title: "Fund Your Account",
      description: "Send BTC, ETH, USDT, or USDC to your unique wallet address"
    },
    {
      icon: ArrowRight,
      title: "Instant Conversion",
      description: "Crypto is automatically converted to USD at market rates"
    },
    {
      icon: CreditCard,
      title: "Create Your Card",
      description: "Generate your virtual Visa card with card number, expiry, and CVV"
    },
    {
      icon: ShoppingBag,
      title: "Start Spending",
      description: "Use your card anywhere Visa is accepted online"
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-black mb-4 tracking-tight">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get your virtual Visa card in four simple steps
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                {/* Number Circle */}
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg z-10">
                  {index + 1}
                </div>

                <div className="bg-white rounded-2xl p-8 pt-12 h-full border border-gray-200 hover:border-indigo-200 transition-all duration-200 shadow-sm">
                  <div className="w-14 h-14 bg-indigo-50 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-bold text-black mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Supported Crypto */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 bg-white rounded-2xl p-8 border border-gray-200 shadow-sm"
        >
          <h3 className="text-center text-lg font-semibold text-black mb-6">
            Supported Cryptocurrencies
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {["Bitcoin", "Ethereum", "Tether", "USD Coin"].map((crypto) => (
              <div
                key={crypto}
                className="px-6 py-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-700 font-medium"
              >
                {crypto}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
