"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FileText,
  Shield,
  AlertTriangle,
  CreditCard,
  Users,
  DollarSign,
  Gavel,
  CheckCircle,
  XCircle
} from "lucide-react";

export default function TermsAndConditions() {
  const lastUpdated = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="responsive-container py-16 lg:py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Link href="/" className="inline-flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">PayWithCrypto</span>
          </Link>
          <div className="flex items-center justify-center gap-3 mb-4">
            <Gavel className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              Terms & Conditions
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Please read these terms and conditions carefully before using PayWithCryptoCard services.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Last updated: {lastUpdated}
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
              {/* Agreement */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <FileText className="w-6 h-6 text-indigo-600" />
                  Agreement to Terms
                </h2>

                <p className="text-gray-600 leading-relaxed mb-4">
                  By accessing and using PayWithCryptoCard ("the Service"), you agree to be bound by these
                  Terms and Conditions ("Terms"). If you do not agree to these Terms, please do not use our Service.
                </p>

                <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
                  <p className="text-indigo-900 font-semibold">
                    By creating an account or using our Service, you:
                  </p>
                  <ul className="list-disc list-inside text-indigo-700 space-y-2 ml-6 mt-3">
                    <li>Confirm you are at least 18 years of age</li>
                    <li>Agree to provide accurate information</li>
                    <li>Accept responsibility for your account activities</li>
                    <li>Understand that cryptocurrency transactions are irreversible</li>
                  </ul>
                </div>
              </section>

              {/* Services Description */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <CreditCard className="w-6 h-6 text-indigo-600" />
                  Service Description
                </h2>

                <p className="text-gray-600 leading-relaxed mb-4">
                  PayWithCryptoCard provides virtual Visa card services that allow users to:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <h4 className="font-semibold text-green-900 mb-2">Create Virtual Cards</h4>
                    <p className="text-green-700 text-sm">Generate virtual Visa cards for online purchases</p>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">Top-up with Crypto</h4>
                    <p className="text-blue-700 text-sm">Fund cards using various cryptocurrencies</p>
                  </div>
                  <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                    <h4 className="font-semibold text-purple-900 mb-2">Global Acceptance</h4>
                    <p className="text-purple-700 text-sm">Use cards anywhere Visa is accepted worldwide</p>
                  </div>
                  <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                    <h4 className="font-semibold text-orange-900 mb-2">No KYC Required</h4>
                    <p className="text-orange-700 text-sm">Access services without identity verification</p>
                  </div>
                </div>
              </section>

              {/* User Responsibilities */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <Users className="w-6 h-6 text-indigo-600" />
                  User Responsibilities
                </h2>

                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="font-semibold text-gray-900 mb-3">As a user, you must:</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-2 ml-6">
                      <li>Provide accurate and complete information when creating an account</li>
                      <li>Maintain the confidentiality of your account credentials</li>
                      <li>Use the Service for legal purposes only</li>
                      <li>Comply with all applicable laws and regulations</li>
                      <li>Not attempt to defraud or exploit the Service</li>
                      <li>Report any suspicious activity immediately</li>
                    </ul>
                  </div>

                  <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                    <h3 className="font-semibold text-red-900 mb-3">Prohibited Activities</h3>
                    <p className="text-red-700 text-sm mb-3">You are strictly prohibited from:</p>
                    <ul className="list-disc list-inside text-red-700 space-y-2 ml-6">
                      <li>Using the Service for illegal transactions</li>
                      <li>Money laundering or terrorist financing</li>
                      <li>Unauthorized access to others' accounts</li>
                      <li>Interfering with or disrupting the Service</li>
                      <li>Using automated bots or scrapers</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Cryptocurrency Risks */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <DollarSign className="w-6 h-6 text-indigo-600" />
                  Cryptocurrency Risks
                </h2>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-6 h-6 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-amber-900 mb-3">Important Risk Disclosure</h3>
                      <p className="text-amber-800 leading-relaxed">
                        Cryptocurrency transactions are irreversible. Once sent, funds cannot be recovered.
                        You acknowledge that cryptocurrency values can be volatile and that PayWithCryptoCard
                        is not responsible for any losses resulting from cryptocurrency price fluctuations.
                      </p>
                      <ul className="list-disc list-inside text-amber-700 space-y-1 mt-3 ml-6">
                        <li>Market volatility risk</li>
                        <li>Regulatory changes</li>
                        <li>Technical failures</li>
                        <li>Loss of private keys</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Fees and Limits */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Fees and Limits</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Service Fees</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>Card creation: Free</li>
                      <li>Crypto conversion: 3% fee</li>
                      <li>Transaction processing: Included</li>
                      <li>No monthly or hidden fees</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Card Limits</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>Maximum per card: $1,000 USD</li>
                      <li>Cards per user: No limit</li>
                      <li>Single-use cards only</li>
                      <li>Global acceptance</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Privacy and Data */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <Shield className="w-6 h-6 text-indigo-600" />
                  Privacy and Data Protection
                </h2>

                <p className="text-gray-600 leading-relaxed mb-4">
                  We respect your privacy and implement strong data protection measures. Our Privacy Policy
                  explains how we collect, use, and protect your information. Key points:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">No KYC required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Data encryption</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Anonymous usage</span>
                  </div>
                </div>
              </section>

              {/* Limitation of Liability */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>

                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                  <p className="text-red-900 font-semibold mb-3">Limitation of Liability</p>
                  <p className="text-red-800 leading-relaxed">
                    PayWithCryptoCard shall not be liable for any direct, indirect, incidental, special,
                    consequential, or punitive damages arising from your use of the Service. This includes
                    but is not limited to loss of funds, data, or business opportunities.
                  </p>
                  <p className="text-red-800 text-sm mt-4">
                    Our total liability shall not exceed the amount you paid for our services in the
                    preceding three months.
                  </p>
                </div>
              </section>

              {/* Termination */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Account Termination</h2>

                <p className="text-gray-600 leading-relaxed mb-4">
                  We reserve the right to suspend or terminate your account at any time for violations
                  of these Terms or for any other reason at our sole discretion.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Termination by You</h3>
                    <p className="text-gray-600 text-sm">
                      You may close your account at any time by contacting our support team.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Termination by Us</h3>
                    <p className="text-gray-600 text-sm">
                      We may terminate for violations, fraud, or security concerns.
                    </p>
                  </div>
                </div>
              </section>

              {/* Governing Law */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law</h2>

                <p className="text-gray-600 leading-relaxed">
                  These Terms shall be governed by and construed in accordance with the laws of
                  [Jurisdiction], without regard to its conflict of law provisions. Any disputes
                  arising from these Terms shall be resolved through binding arbitration.
                </p>
              </section>

              {/* Contact */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>

                <p className="text-gray-600 mb-4">
                  If you have any questions about these Terms and Conditions, please contact us:
                </p>

                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-semibold text-gray-900">Email:</p>
                      <p className="text-indigo-600">legal@paywithcryptocard.net</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Support:</p>
                      <p className="text-indigo-600">support@paywithcryptocard.net</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}