"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  CreditCard,
  Plus,
  ArrowRight,
  Shield,
  Zap,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Settings,
  DollarSign,
  Clock,
  Globe
} from "lucide-react";
import DashboardSidebar from "@/components/DashboardSidebar";
import { useRouter } from "next/navigation";

interface CardTemplate {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
  features: string[];
  limit: number;
  fee: number;
  processingTime: string;
  popular?: boolean;
}

export default function CreateCardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<CardTemplate | null>(null);
  const [cardName, setCardName] = useState("");
  const [step, setStep] = useState(1);
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();

  const cardTemplates: CardTemplate[] = [
    {
      id: "standard",
      name: "Standard Virtual",
      description: "Perfect for everyday online shopping",
      icon: CreditCard,
      color: "from-blue-600 to-cyan-600",
      features: ["Online purchases", "Subscription management", "Instant top-up"],
      limit: 1000,
      fee: 0,
      processingTime: "Instant"
    },
    {
      id: "premium",
      name: "Premium Virtual",
      description: "Higher limits for power users",
      icon: Sparkles,
      color: "from-purple-600 to-pink-600",
      features: ["Higher spending limits", "Priority support", "Advanced analytics", "Multi-currency"],
      limit: 5000,
      fee: 5,
      processingTime: "Instant",
      popular: true
    },
    {
      id: "subscription",
      name: "Subscription Manager",
      description: "Optimized for recurring payments",
      icon: Clock,
      color: "from-green-600 to-emerald-600",
      features: ["Subscription tracking", "Auto-renewal management", "Spending alerts"],
      limit: 2000,
      fee: 0,
      processingTime: "Instant"
    },
    {
      id: "travel",
      name: "Travel Card",
      description: "Perfect for travel and bookings",
      icon: Globe,
      color: "from-orange-600 to-red-600",
      features: ["No foreign transaction fees", "Travel insurance", "Emergency assistance"],
      limit: 3000,
      fee: 10,
      processingTime: "Instant"
    },
    {
      id: "business",
      name: "Business Pro",
      description: "Professional expense management",
      icon: DollarSign,
      color: "from-indigo-600 to-purple-600",
      features: ["Expense tracking", "Team management", "Accounting integration", "Custom limits"],
      limit: 10000,
      fee: 25,
      processingTime: "1-2 business days"
    }
  ];

  const handleCreateCard = async () => {
    if (!selectedTemplate || !cardName.trim()) return;

    setIsCreating(true);

    // Simulate card creation
    setTimeout(() => {
      setIsCreating(false);
      setStep(3);
    }, 2000);
  };

  const handleNext = () => {
    if (step === 1 && selectedTemplate) {
      setStep(2);
    } else if (step === 2 && cardName.trim()) {
      handleCreateCard();
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">

      {/* Sidebar */}
      <DashboardSidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0 relative">
        {/* Header */}
        <header className="bg-white/70 backdrop-blur sticky top-0 z-40 border-b border-slate-100">
          <div className="responsive-container">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="lg:hidden p-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors duration-200"
                >
                  <svg className="w-5 h-5 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <CreditCard className="w-6 h-6 text-purple-400" />
                  Create Virtual Card
                </h1>
              </div>

              {/* Progress Steps */}
              <div className="hidden md:flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 ${
                  step >= 1 ? "bg-purple-600 text-white" : "bg-slate-100 text-slate-500"
                }`}>
                  1
                </div>
                <div className={`w-16 h-1 transition-all duration-200 ${
                  step >= 2 ? "bg-purple-600" : "bg-slate-100"
                }`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 ${
                  step >= 2 ? "bg-purple-600 text-white" : "bg-slate-100 text-slate-500"
                }`}>
                  2
                </div>
                <div className={`w-16 h-1 transition-all duration-200 ${
                  step >= 3 ? "bg-purple-600" : "bg-slate-100"
                }`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 ${
                  step >= 3 ? "bg-purple-600 text-white" : "bg-slate-100 text-slate-500"
                }`}>
                  3
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            {/* Step 1: Select Template */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">Choose Your Card Type</h2>
                  <p className="text-slate-500">Select the perfect virtual card for your needs</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cardTemplates.map((template, index) => (
                    <motion.div
                      key={template.id}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.1 * index, type: "spring", stiffness: 100 }}
                      whileHover={{ y: -5, scale: 1.02 }}
                      onClick={() => setSelectedTemplate(template)}
                      className={`relative group cursor-pointer`}
                    >
                      {template.popular && (
                        <div className="absolute -top-2 -right-2 z-10 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full">
                          POPULAR
                        </div>
                      )}

                      <div className={`bg-white border border-slate-100 shadow-sm rounded-2xl p-6 h-full transition-all duration-300 hover:shadow-md ${
                        selectedTemplate?.id === template.id
                          ? "border-purple-500 ring-2 ring-purple-100"
                          : "hover:border-slate-200"
                      }`}>
                        {/* Card Preview */}
                        <div className={`mb-4 h-32 bg-gradient-to-br ${template.color} rounded-xl flex items-center justify-center relative overflow-hidden`}>
                          <div className="absolute inset-0 opacity-20">
                            <div className="absolute top-2 right-2 w-12 h-12 border-2 border-white rounded-full"></div>
                            <div className="absolute bottom-2 left-2 w-8 h-8 border-2 border-white rounded-full"></div>
                          </div>
                          <template.icon className="w-12 h-12 text-white" />
                        </div>

                        <h3 className="text-xl font-bold text-slate-900 mb-2">{template.name}</h3>
                        <p className="text-slate-500 text-sm mb-4">{template.description}</p>

                        <div className="space-y-3 mb-4">
                          {template.features.slice(0, 3).map((feature, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-slate-600 text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                          <div>
                            <p className="text-slate-500 text-xs">Limit</p>
                            <p className="text-slate-900 font-bold">{formatCurrency(template.limit)}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-slate-500 text-xs">Setup Fee</p>
                            <p className="text-slate-900 font-bold">{template.fee === 0 ? "Free" : formatCurrency(template.fee)}</p>
                          </div>
                        </div>

                        {selectedTemplate?.id === template.id && (
                          <div className="absolute top-2 right-2 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="flex justify-end mt-8">
                  <button
                    onClick={handleNext}
                    disabled={!selectedTemplate}
                    className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
                  >
                    Continue
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Card Details */}
            {step === 2 && selectedTemplate && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">Card Details</h2>
                  <p className="text-slate-500">Customize your virtual card</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Card Preview */}
                  <motion.div
                    initial={{ opacity: 0, rotateY: 90 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative"
                    style={{ perspective: "1000px" }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${selectedTemplate.color} rounded-3xl blur-2xl`}></div>
                    <div className={`relative bg-gradient-to-br ${selectedTemplate.color} rounded-3xl p-8 h-56 overflow-hidden border border-white/30`}>
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-4 right-4 w-16 h-16 border-2 border-white rounded-full"></div>
                        <div className="absolute bottom-4 left-4 w-12 h-12 border-2 border-white rounded-full"></div>
                      </div>
                      <div className="relative h-full flex flex-col justify-between">
                        <div>
                          <h3 className="text-white font-bold text-lg">
                            {cardName || "Your Card Name"}
                          </h3>
                          <p className="text-white/70 text-xs">Virtual Card</p>
                        </div>
                        <div>
                          <p className="text-white/90 font-mono text-lg tracking-wider">4532 **** **** ****</p>
                          <div className="flex items-center justify-between mt-2">
                            <p className="text-white/60 text-xs">Valid Thru</p>
                            <p className="text-white font-medium">12/26</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Form */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Card Name</label>
                      <input
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="e.g., Shopping Card, Business Expenses"
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>

                    <div className="bg-white border border-slate-100 shadow-sm rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                        <Settings className="w-5 h-5 text-purple-500" />
                        Card Settings
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-slate-900 font-medium">Auto-lock after inactivity</p>
                            <p className="text-slate-500 text-sm">Automatically lock card after 30 days</p>
                          </div>
                          <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-purple-600">
                            <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6"></span>
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-slate-900 font-medium">Spending alerts</p>
                            <p className="text-slate-500 text-sm">Get notified for large transactions</p>
                          </div>
                          <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-purple-600">
                            <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6"></span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Summary */}
                    <div className="bg-white border border-slate-100 shadow-sm rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">Order Summary</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500">Card Type</span>
                          <span className="text-slate-900 font-medium">{selectedTemplate.name}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500">Spending Limit</span>
                          <span className="text-slate-900 font-medium">{formatCurrency(selectedTemplate.limit)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500">Setup Fee</span>
                          <span className="text-slate-900 font-medium">{selectedTemplate.fee === 0 ? "Free" : formatCurrency(selectedTemplate.fee)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500">Processing Time</span>
                          <span className="text-slate-900 font-medium">{selectedTemplate.processingTime}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-4 bg-blue-50 border border-blue-100 rounded-xl">
                      <Shield className="w-5 h-5 text-blue-500" />
                      <p className="text-blue-700 text-sm">
                        Your virtual card is protected with industry-standard encryption and fraud detection.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <button
                    onClick={handlePrevious}
                    className="px-8 py-3 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-100 transition-all duration-200"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={!cardName.trim() || isCreating}
                    className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
                  >
                    {isCreating ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Creating...
                      </>
                    ) : (
                      <>
                        Create Card
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Success */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <div className="max-w-md mx-auto">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle className="w-10 h-10 text-white" />
                  </motion.div>

                  <h2 className="text-3xl font-bold text-slate-900 mb-4">Card Created Successfully!</h2>
                  <p className="text-slate-500 mb-8">
                    Your virtual card "{cardName}" is now ready to use. You can start making online purchases immediately.
                  </p>

                  <div className="bg-white border border-slate-100 shadow-sm rounded-xl p-6 mb-8">
                    <div className="flex items-center justify-center mb-4">
                      <div className={`w-16 h-16 bg-gradient-to-br ${selectedTemplate?.color || "from-gray-500 to-gray-700"} rounded-xl flex items-center justify-center`}>
                        <CreditCard className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{cardName}</h3>
                    <p className="text-slate-600 mb-4">4532 **** **** **** 1234</p>
                    <div className="flex items-center justify-center gap-2">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                        Active
                      </span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        {selectedTemplate?.name}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => router.push("/dashboard/cards")}
                      className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-all duration-200"
                    >
                      View My Cards
                    </button>
                    <button
                      onClick={() => router.push("/dashboard")}
                      className="px-8 py-3 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-100 transition-all duration-200"
                    >
                      Back to Dashboard
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}