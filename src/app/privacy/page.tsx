"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, Lock, Eye, User, Database, AlertCircle } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="responsive-container py-16 lg:py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Link href="/" className="inline-flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <span className="text-2xl font-bold text-black">PayWithCryptoCard</span>
          </Link>
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-black" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black">
              Privacy Policy
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 lg:p-12">
            <div className="prose prose-lg max-w-none">
              {/* Introduction */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-3">
                  <User className="w-6 h-6 text-black" />
                  Introduction
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  PayWithCryptoCard ("we," "our," or "us") is committed to protecting your privacy.
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information
                  when you use our virtual Visa card services. By using PayWithCryptoCard, you agree to the
                  collection and use of information in accordance with this policy.
                </p>
              </section>

              {/* Information We Collect */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-3">
                  <Database className="w-6 h-6 text-black" />
                  Information We Collect
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Information You Provide</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-2 ml-6">
                      <li>Account information (email address, name when creating an account)</li>
                      <li>Cryptocurrency wallet addresses for funding purposes</li>
                      <li>Card customization preferences</li>
                      <li>Support communications and inquiries</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Automatically Collected Information</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-2 ml-6">
                      <li>Usage data and analytics</li>
                      <li>Device and browser information</li>
                      <li>IP address and location data</li>
                      <li>Transaction records and card usage patterns</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* How We Use Your Information */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-3">
                  <Eye className="w-6 h-6 text-black" />
                  How We Use Your Information
                </h2>

                <div className="bg-gray-100 rounded-xl p-6 mb-6">
                  <p className="text-gray-600 mb-4">We use your information to:</p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2 ml-6">
                    <li>Provide and maintain our virtual card services</li>
                    <li>Process cryptocurrency transactions and card operations</li>
                    <li>Prevent fraud and ensure platform security</li>
                    <li>Provide customer support and resolve issues</li>
                    <li>Improve our services and develop new features</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </div>
              </section>

              {/* Data Security */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-3">
                  <Lock className="w-6 h-6 text-black" />
                  Data Security
                </h2>

                <p className="text-gray-600 leading-relaxed mb-4">
                  We implement robust security measures to protect your information:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-100 border border-gray-300 rounded-xl p-4">
                    <h4 className="font-semibold text-black mb-2">Encryption</h4>
                    <p className="text-gray-700 text-sm">All data is encrypted using industry-standard protocols</p>
                  </div>
                  <div className="bg-gray-100 border border-gray-300 rounded-xl p-4">
                    <h4 className="font-semibold text-black mb-2">Access Controls</h4>
                    <p className="text-gray-700 text-sm">Strict access controls and authentication systems</p>
                  </div>
                  <div className="bg-gray-100 border border-gray-300 rounded-xl p-4">
                    <h4 className="font-semibold text-black mb-2">Regular Audits</h4>
                    <p className="text-gray-700 text-sm">Regular security assessments and penetration testing</p>
                  </div>
                  <div className="bg-gray-100 border border-gray-300 rounded-xl p-4">
                    <h4 className="font-semibold text-black mb-2">No-KYC Focus</h4>
                    <p className="text-gray-700 text-sm">Minimal data collection to protect your privacy</p>
                  </div>
                </div>
              </section>

              {/* No-KYC Policy */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-3">
                  <Shield className="w-6 h-6 text-black" />
                  Our No-KYC Commitment
                </h2>

                <div className="bg-gray-100 border border-gray-300 rounded-xl p-6">
                  <p className="text-black font-semibold mb-3">Privacy-First Approach</p>
                  <p className="text-gray-700 leading-relaxed">
                    Unlike traditional financial institutions, PayWithCryptoCard does not require KYC (Know Your Customer)
                    verification. This means we don't collect personal identification documents, government-issued IDs,
                    or other sensitive personal information. Your privacy and anonymity are paramount to our service.
                  </p>
                </div>
              </section>

              {/* Your Rights */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>

                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-6">
                  <li>Access to your personal information</li>
                  <li>Correction of inaccurate information</li>
                  <li>Deletion of your account and associated data</li>
                  <li>Opt-out of communications</li>
                  <li>Data portability</li>
                </ul>
              </section>

              {/* Contact Information */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>

                <p className="text-gray-600 mb-4">
                  If you have questions about this Privacy Policy or our data practices, please contact us:
                </p>

                <div className="bg-gray-100 rounded-xl p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-semibold text-black">Email:</p>
                      <p className="text-black">privacy@paywithcryptocard.net</p>
                    </div>
                    <div>
                      <p className="font-semibold text-black">Support:</p>
                      <p className="text-black">support@paywithcryptocard.net</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Changes to Policy */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>

                <p className="text-gray-600 leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by
                  posting the new Privacy Policy on this page and updating the "Last updated" date at the top.
                </p>
              </section>

              {/* Alert Box */}
              <div className="bg-gray-100 border border-gray-300 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-black mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-black mb-2">Important Notice</h3>
                    <p className="text-gray-700 text-sm">
                      This Privacy Policy is part of our Terms of Service. By using PayWithCryptoCard,
                      you acknowledge that you have read, understood, and agree to be bound by these terms.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}