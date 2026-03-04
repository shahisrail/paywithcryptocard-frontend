"use client";

import { motion } from "framer-motion";
import { CreditCard, ShoppingBag, Settings, Shield } from "lucide-react";
import { useInView } from "react-intersection-observer";

const VirtualCardSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: CreditCard,
      title: "Instant issuance",
      description: "Your virtual Visa card is created within seconds after your crypto is received."
    },
    {
      icon: ShoppingBag,
      title: "Online purchases",
      description: "Use your virtual Visa card for online payments wherever Visa is accepted."
    },
    {
      icon: Settings,
      title: "Easy management",
      description: "View your transactions and freeze or reactivate any virtual card whenever you want."
    },
    {
      icon: Shield,
      title: "Secure transactions",
      description: "All transactions are protected with bank-level encryption and security protocols."
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-black mb-4 tracking-tight">
            Your Virtual Visa Card
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A fully functional virtual card for all your online payments
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="bg-white rounded-2xl p-8 h-full border border-gray-200 hover:border-indigo-200 transition-all duration-200">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 bg-indigo-50 rounded-xl flex items-center justify-center">
                        <Icon className="w-7 h-7 text-indigo-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-black">{feature.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default VirtualCardSection;
