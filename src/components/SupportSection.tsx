"use client";

import { motion } from "framer-motion";
import { Mail, MessageCircle, Phone, Send, CheckCircle } from "lucide-react";
import { useState } from "react";

const SupportSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const supportChannels = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our support team in real-time",
      action: "Start Chat",
      available: "24/7"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us an email anytime",
      action: "Send Email",
      available: "Response within 24h"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Call us for urgent issues",
      action: "Call Now",
      available: "Mon-Fri 9am-6pm"
    }
  ];

  const commonTopics = [
    "Card not working",
    "Deposit not showing",
    "Transaction failed",
    "Can't create card",
    "Balance inquiry",
    "Refund request",
    "Account access",
    "Other issues"
  ];

  return (
    <section id="support" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-black mb-4 tracking-tight">
            Need Help?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our support team is here to assist you with any questions or issues
          </p>
        </motion.div>

        {/* Support Channels */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {supportChannels.map((channel, index) => {
            const Icon = channel.icon;
            return (
              <motion.div
                key={channel.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl border border-gray-200 p-8 hover:border-gray-300 transition-colors"
              >
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-black mb-2">{channel.title}</h3>
                <p className="text-gray-600 mb-4">{channel.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{channel.available}</span>
                  <button className="px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-900 transition-colors">
                    {channel.action}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl border border-gray-200 p-8"
          >
            <h3 className="text-2xl font-bold text-black mb-6">Send us a Message</h3>

            {submitted ? (
              <div className="py-12 text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-black mb-2">Message Sent!</h4>
                <p className="text-gray-600">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Topic</label>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {commonTopics.slice(0, 6).map((topic) => (
                      <button
                        key={topic}
                        type="button"
                        onClick={() => setFormData({ ...formData, subject: topic })}
                        className={`px-3 py-2 text-sm rounded-lg border transition-all ${
                          formData.subject === topic
                            ? "bg-black text-white border-black"
                            : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Or describe your issue..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                    placeholder="Describe your issue in detail..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-black text-white font-semibold rounded-lg hover:bg-gray-900 transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            )}
          </motion.div>

          {/* Quick Help */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* FAQ Link */}
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <h3 className="text-xl font-semibold text-black mb-4">Frequently Asked Questions</h3>
              <p className="text-gray-600 mb-6">
                Find quick answers to common questions about our service
              </p>
              <a
                href="#faq"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-black font-medium rounded-lg hover:bg-gray-200 transition-colors"
              >
                View FAQs
              </a>
            </div>

            {/* Help Topics */}
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <h3 className="text-xl font-semibold text-black mb-4">Common Help Topics</h3>
              <div className="space-y-3">
                {commonTopics.map((topic) => (
                  <button
                    key={topic}
                    onClick={() => setFormData({ ...formData, subject: topic })}
                    className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-gray-700 hover:text-black transition-all text-sm font-medium"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-8 text-white">
              <h3 className="text-xl font-semibold mb-4">Still Need Help?</h3>
              <p className="text-gray-300 mb-6">
                Our support team is available 24/7 to assist you
              </p>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5" />
                  <span>support@paywithcryptocard.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5" />
                  <span>+1 (888) 123-4567</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SupportSection;
