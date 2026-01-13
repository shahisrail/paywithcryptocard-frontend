"use client";

import { motion } from "framer-motion";
import { UserPlus, Wallet, CreditCard } from "lucide-react";
import { useInView } from "react-intersection-observer";

const HowItWorksSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const steps = [
    {
      icon: UserPlus,
      title: "Sign up",
      description: "Create your account with just an email and password. No KYC",
      number: "1"
    },
    {
      icon: Wallet,
      title: "Top up with crypto",
      description: "Choose how much you want in USD, select BTC, ETH, USDT (ERC20 / TRC20), and send the exact amount of crypto shown.",
      number: "2"
    },
    {
      icon: CreditCard,
      title: "Pay online with your virtual card",
      description: "Once the top up is confirmed, your USD balance is updated and you can use your crypto-funded virtual card to pay online in USD.",
      number: "3"
    }
  ];

  return (
    <section id="how-it-works" className="py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="responsive-container">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            How it works
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Get started in minutes with our simple 3-step process
          </p>
        </motion.div>

        {/* Horizontal Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: "easeOut"
              }}
              className="text-center"
            >
              <div className="flex flex-col items-center">
                {/* Step Number */}
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg mb-4">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="w-14 h-14 bg-indigo-50 rounded-xl flex items-center justify-center mb-4">
                  <step.icon className="w-7 h-7 text-indigo-600" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Payment/Top-up View */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-md mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
              <h3 className="text-white font-semibold text-lg">Add Balance</h3>
              <p className="text-white/80 text-sm">Choose amount and cryptocurrency</p>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Amount Selection */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-3">Amount (USD)</label>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {['100', '500', '1000'].map((amount) => (
                    <button
                      key={amount}
                      className={`py-2.5 px-3 rounded-lg font-medium text-sm transition-all ${
                        amount === '500'
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">$</span>
                  <input
                    type="text"
                    value="500"
                    readOnly
                    className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg text-base font-semibold text-gray-900 bg-gray-50"
                  />
                </div>
              </div>

              {/* Cryptocurrency Selection */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-3">Select Cryptocurrency</label>
                <div className="grid grid-cols-3 gap-2">
                  <button className="p-2.5 bg-indigo-50 border-2 border-indigo-600 rounded-lg">
                    <div className="text-orange-500 font-bold text-xs mb-1">BTC</div>
                    <div className="text-gray-600 text-xs">Bitcoin</div>
                  </button>
                  <button className="p-2.5 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="text-blue-600 font-bold text-xs mb-1">ETH</div>
                    <div className="text-gray-600 text-xs">Ethereum</div>
                  </button>
                  <button className="p-2.5 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="text-green-600 font-bold text-xs mb-1">USDT</div>
                    <div className="text-gray-600 text-xs">Tether</div>
                  </button>
                </div>
              </div>

              {/* Payment Details */}
              <div className="bg-gray-50 rounded-lg p-4 mb-5">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">You'll send:</span>
                  <span className="text-sm font-semibold text-gray-900">0.0125 BTC</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Network:</span>
                  <span className="text-sm font-semibold text-gray-900">Bitcoin</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Fee:</span>
                  <span className="text-sm font-semibold text-indigo-600">3%</span>
                </div>
              </div>

              {/* QR Code */}
              <div className="mb-5">
                <div className="bg-gray-100 rounded-lg p-4 border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-3 flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2L5 6v2z" />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">Scan QR Code</p>
                    <code className="text-xs font-mono text-gray-600">bc1q...7k2p</code>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg">
                Add Balance
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
