"use client";

import { motion } from "framer-motion";
import {
  Mail,
  MessageCircle,
  FileText,
  Shield,
  CreditCard,
  Twitter,
  Linkedin,
  Github,
  Zap,
  Globe,
  HelpCircle
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Product",
      links: [
        { name: "Virtual Cards", href: "/dashboard", icon: CreditCard },
        { name: "How It Works", href: "/#how-it-works", icon: HelpCircle },
        { name: "Pricing", href: "/#pricing", icon: FileText },
        { name: "Security", href: "/#security", icon: Shield },
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about", icon: Globe },
        { name: "Blog", href: "/blog", icon: FileText },
        { name: "Careers", href: "/careers", icon: Zap },
        { name: "Contact", href: "/contact", icon: MessageCircle },
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Terms of Service", href: "/terms", icon: FileText },
        { name: "Privacy Policy", href: "/privacy", icon: Shield },
        { name: "Cookie Policy", href: "/cookies", icon: Shield },
        { name: "Compliance", href: "/compliance", icon: Shield },
      ]
    }
  ];

  const socialLinks = [
    { name: "Twitter", href: "#", icon: Twitter },
    { name: "LinkedIn", href: "#", icon: Linkedin },
    { name: "Github", href: "#", icon: Github },
  ];

  const supportedCryptos = [
    { name: "Bitcoin", symbol: "BTC" },
    { name: "Ethereum", symbol: "ETH" },
    { name: "Tether", symbol: "USDT" },
    { name: "USDC", symbol: "USDC" },
    { name: "Monero", symbol: "XMR" },
    { name: "Litecoin", symbol: "LTC" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="responsive-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="text-2xl font-bold text-white">PayWithCrypto</span>
            </div>

            <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
              Turn your cryptocurrency into spendable virtual Visa cards in minutes.
              No KYC, no paperwork, just instant access to global online payments.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4 mb-8">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors duration-200"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* Supported Cryptos */}
            <div>
              <h5 className="text-sm font-semibold text-white mb-4">Supported Cryptocurrencies</h5>
              <div className="flex flex-wrap gap-2">
                {supportedCryptos.map((crypto) => (
                  <span
                    key={crypto.symbol}
                    className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-lg border border-gray-700 hover:border-indigo-600 transition-colors duration-200"
                  >
                    {crypto.symbol}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Links Sections */}
          {footerSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * sectionIndex }}
            >
              <h4 className="text-lg font-semibold text-white mb-6">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      <link.icon className="w-4 h-4" />
                      <span>{link.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="responsive-container py-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-gray-400 text-sm text-center lg:text-left"
            >
              © {currentYear} PayWithCryptoCard. All rights reserved.
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center gap-6 text-gray-400 text-sm"
            >
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                <span>Virtual Visa® Card</span>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Bank-Level Security</span>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span>Global Acceptance</span>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-500 text-xs text-center mt-6 lg:mt-0"
          >
            PayWithCryptoCard is a financial technology platform, not a bank. All cryptocurrency loaded through PayWithCryptoCard is converted into U.S. dollars before it is used for purchases. The PayWithCryptoCard Virtual Visa® Card is issued by partner financial institutions under license from Visa U.S.A. Inc. Visa is a registered trademark of Visa International Service Association.
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;