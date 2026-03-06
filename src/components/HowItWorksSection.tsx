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
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4 tracking-tight">
            How It Works
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Get your virtual Visa card in four simple steps
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-black rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md z-10">
                  {index + 1}
                </div>

                <div className="bg-gray-50 rounded-xl p-5 pt-6 h-full border border-gray-200 hover:border-black hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-3">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-base font-semibold text-black mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
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
          className="mt-10 bg-gray-50 rounded-xl p-6 border border-gray-200"
        >
          <h3 className="text-center text-sm font-semibold text-black mb-4">
            Supported Cryptocurrencies
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 hover:border-black transition-colors">
              <img src="/logos/btc.svg" alt="Bitcoin" className="w-5 h-5" onError={(e) => { e.currentTarget.src = 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22%23f7931a%22><circle cx=%2212%22 cy=%2212%22 r=%2210%22/></svg>'; }} />
              <span className="text-sm font-medium text-gray-700">Bitcoin</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 hover:border-black transition-colors">
              <img src="/logos/eth.svg" alt="Ethereum" className="w-5 h-5" onError={(e) => { e.currentTarget.src = 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22%23627eea%22><circle cx=%2212%22 cy=%2212%22 r=%2210%22/></svg>'; }} />
              <span className="text-sm font-medium text-gray-700">Ethereum</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 hover:border-black transition-colors">
              <img src="/logos/usdt.svg" alt="Tether" className="w-5 h-5" onError={(e) => { e.currentTarget.src = 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%2226a17b%22><circle cx=%2212%22 cy=%2212%22 r=%2210%22/></svg>'; }} />
              <span className="text-sm font-medium text-gray-700">Tether</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 hover:border-black transition-colors">
              <img src="/logos/usd-coin-usdc-logo.png" alt="USD Coin" className="w-5 h-5" onError={(e) => { e.currentTarget.src = 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%222777ca%22><circle cx=%2212%22 cy=%2212%22 r=%2210%22/></svg>'; }} />
              <span className="text-sm font-medium text-gray-700">USD Coin</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
