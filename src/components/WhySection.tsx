"use client";

import { motion } from "framer-motion";
import { Shield, Zap, Globe, CreditCard, TrendingUp } from "lucide-react";
import { useInView } from "react-intersection-observer";

const WhySection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const reasons = [
    {
      icon: Shield,
      title: "Complete Privacy",
      description: "No KYC, no ID uploads, no personal profile. You stay in control of your identity and your funds.",
      features: ["Zero documentation required", "Anonymous transactions", "Data never stored"]
    },
    {
      icon: CreditCard,
      title: "Multiple Virtual Cards",
      description: "Create new virtual cards in seconds for different merchants, subscriptions or one-time purchases.",
      features: ["Unlimited cards", "$1,000 limit per card", "Instant generation"]
    },
    {
      icon: Globe,
      title: "Global Online Payments",
      description: "Pay online anywhere Visa is accepted worldwide.",
      features: ["Worldwide acceptance", "Multi-currency support", "Global merchant network"]
    },
    {
      icon: Zap,
      title: "Instant Crypto-to-USD",
      description: "Convert your crypto to spendable USD balance instantly.",
      features: ["Real-time conversion", "No waiting periods", "Instant availability"]
    },
    {
      icon: Shield,
      title: "Bank-Level Security",
      description: "Advanced security measures to protect your funds and transactions.",
      features: ["Bank-grade encryption", "Secure storage", "Fraud protection"]
    },
    {
      icon: TrendingUp,
      title: "High Card Limits",
      description: "Fund each virtual card with up to $1,000 for larger purchases.",
      features: ["$1,000 limit per card", "Multiple cards allowed", "Flexible funding"]
    }
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="responsive-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
            Why PayWithCryptoCard
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: "easeOut"
              }}
              whileHover={{
                y: -8,
                transition: { duration: 0.3 }
              }}
              className="group"
            >
              <div className="h-full bg-white rounded-3xl p-8 border border-gray-200 hover:border-indigo-200 hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <reason.icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {reason.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {reason.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-2">
                    {reason.features.map((feature, featureIndex) => (
                      <div key={feature} className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-indigo-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySection;