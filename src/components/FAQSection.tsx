"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useInView } from "react-intersection-observer";

const FAQSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is the PayWithCryptoCard Virtual Visa Card?",
      answer: "A fully digital payment card funded with cryptocurrency. Top up with crypto, it converts to USD, and you can spend anywhere Visa is accepted online."
    },
    {
      question: "Do I need to complete KYC?",
      answer: "No. PayWithCryptoCard does not require personal data or identity documents to use the platform."
    },
    {
      question: "Where can I use my virtual card?",
      answer: "On almost any website that accepts Visa cards worldwide, including Amazon, Google Play, Uber, Facebook, PayPal, and millions more."
    },
    {
      question: "What are the fees?",
      answer: "A flat 3% conversion fee when you top up with crypto. No monthly fees, no hidden charges, and no usage fees for payments."
    },
    {
      question: "What are the card limits?",
      answer: "Each virtual card can be loaded once with up to $1,000 USD. Cards are valid for 90 days from creation."
    },
    {
      question: "How do I fund my account?",
      answer: "Send Bitcoin, Ethereum, Tether, USD Coin, or Litecoin to your unique wallet address. Funds are automatically converted to USD."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-black mb-4 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Quick answers to common questions
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: index * 0.1
              }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full bg-white rounded-xl p-6 text-left border border-gray-200 hover:border-indigo-300 transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-black pr-4">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{
                      rotate: openIndex === index ? 180 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </motion.div>
                </div>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 text-gray-600 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-700 transition-colors"
          >
            Chat with our team
            <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;