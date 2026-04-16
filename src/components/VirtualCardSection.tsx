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
      description: "Your virtual Visa card is created within minutes after your crypto is received."
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
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={false}
          animate={inView ? { y: 0 } : { y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4 tracking-tight">
            Your Virtual Visa Card
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            A fully functional virtual card for all your online payments
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={false}
                animate={inView ? { y: 0 } : { y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="bg-white rounded-xl p-5 h-full border border-gray-200 hover:border-black hover:shadow-lg  ">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0">
                      <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2 text-black">{feature.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
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
