"use client";

import { motion } from "framer-motion";
import { Shield, CreditCard, Globe, Zap } from "lucide-react";
import { useInView } from "react-intersection-observer";

const BenefitsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const benefits = [
    {
      icon: Shield,
      title: "No KYC Required",
      description: "Use your card without ID checks or paperwork. Start spending instantly."
    },
    {
      icon: CreditCard,
      title: "Multiple Virtual Cards",
      description: "Create separate cards for subscriptions, shopping and one-time payments."
    },
    {
      icon: Globe,
      title: "Worldwide Acceptance",
      description: "Pay on global websites wherever Visa is accepted in 186+ countries."
    },
    {
      icon: Zap,
      title: "Instant Conversion",
      description: "Crypto to USD in seconds at market rates with low fees."
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-black mb-4 tracking-tight">
            Why Choose PayWithCryptoCard
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to spend crypto anywhere
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: index * 0.1
              }}
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-black mb-3">{benefit.title}</h3>
                  <p className="text-lg text-gray-600 leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;