"use client";

import { motion } from "framer-motion";
import {
  Shield,
  CreditCard,
  Globe,
  Zap,
  Lock,
  TrendingUp
} from "lucide-react";
import { useInView } from "react-intersection-observer";

const BenefitsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const benefits = [
    {
      icon: Shield,
      title: "No-KYC Privacy",
      description: "Use your card without ID checks or paperwork. We don't collect personal data.",
    },
    {
      icon: CreditCard,
      title: "Multiple Virtual Cards",
      description: "Create separate cards for subscriptions, shopping and one-time payments.",
    },
    {
      icon: Globe,
      title: "Worldwide Online Use",
      description: "Pay on global websites wherever Visa is accepted online.",
    },
    {
      icon: Zap,
      title: "Instant Crypto-to-USD",
      description: "Top up with crypto and get spendable USD balance in seconds.",
    },
    {
      icon: Lock,
      title: "Secure by Design",
      description: "Bank-grade encryption and strict security controls protect your funds.",
    },
    {
      icon: TrendingUp,
      title: "High Card Limits",
      description: "Fund each virtual card with up to $1,000 for larger purchases.",
    },
  ];

  return (
    <section id="features" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="responsive-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black mb-4 sm:mb-6">
            Why Choose <span className="gradient-text">PayWithCryptoCard</span>
          </h2>
          <p className="text-lg sm:text-xl text-secondary-clear max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            Experience the freedom of spending your crypto anywhere Visa is accepted
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
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
              className="group h-full"
            >
              <div className="card-luxury h-full p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/10 hover:border-cyan-500/30 transition-all duration-300">
                {/* Icon */}
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-xl sm:rounded-2xl flex items-center justify-center mb-6 sm:mb-8 group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400" />
                </div>

                {/* Content */}
                <h3 className="text-xl sm:text-2xl font-bold text-clear mb-3 sm:mb-4 leading-tight">
                  {benefit.title}
                </h3>
                <p className="text-secondary-clear leading-relaxed text-base sm:text-lg mb-4 sm:mb-6">
                  {benefit.description}
                </p>

                {/* Hover Effect Line */}
                <div className="h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;