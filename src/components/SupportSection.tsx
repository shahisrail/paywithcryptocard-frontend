"use client";

import { motion } from "framer-motion";
import { Mail, MessageCircle, ChevronRight } from "lucide-react";
import { useState } from "react";

const SupportSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleScrollToFAQ = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('faq');
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const contactOptions = [
    {
      icon: MessageCircle,
      title: "Live chat",
      description: "Bottom right corner",
      action: "Chat Now",
      available: "Available 24/7"
    },
    {
      icon: Mail,
      title: "Mail",
      description: "support@paywithcryptocard.net",
      action: "Send Email",
      available: "Response within 24h"
    }
  ];

  return (
    <section id="support" className="py-12 sm:py-16 lg:py-20 bg-gray-200">
      <div className="max-w-4xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl font-bold text-black mb-4 tracking-tight">
            Need to contact us?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We are ready to help!
          </p>
        </motion.div>

        {/* Contact Options */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {contactOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl border border-gray-200 p-8 hover:border-gray-300 transition-colors"
              >
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-black mb-2">{option.title}</h3>
                <p className="text-gray-600 mb-4">{option.description}</p>
                <p className="text-sm text-gray-500 mb-4">{option.available}</p>
                <button className="w-full px-4 py-3 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-900 transition-colors">
                  {option.action}
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* FAQ Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl border border-gray-200 p-8 text-center"
        >
          <h3 className="text-xl font-semibold text-black mb-3">
            Visit our Frequently Asked Questions
          </h3>
          <p className="text-gray-600 mb-6">
            Find quick answers to common questions about our service
          </p>
          <a
            href="#faq"
            onClick={handleScrollToFAQ}
            className="inline-flex items-center gap-2 px-8 py-3 bg-gray-100 text-black font-medium rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
          >
            View FAQs
            <ChevronRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default SupportSection;
