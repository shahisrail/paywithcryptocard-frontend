"use client";

import { Zap, CreditCard, ShoppingBag, Settings, Shield, Globe, Clock } from "lucide-react";

const VirtualCardSection = () => {
  const features = [
    {
      icon: Zap,
      title: "Instant issuance",
      description: "Your virtual Visa card is created within seconds after your crypto is received."
    },
    {
      icon: CreditCard,
      title: "Standard card details",
      description: "Full card number, expiry date and CVV, ready to use on most websites."
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
    },
    {
      icon: Globe,
      title: "Worldwide acceptance",
      description: "Shop at millions of online stores across 186+ countries that accept Visa."
    },
    {
      icon: Clock,
      title: "90-day validity",
      description: "Each card remains active for 90 days from creation for security purposes."
    },
  ];

  return (
    <section className="py-32 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center max-w-3xl mb-16">
          <h2 className="text-5xl font-bold mb-4 text-black tracking-tight">
            Your Virtual Visa Card
          </h2>
          <p className="text-lg text-gray-600">
            A fully functional virtual card for all your online payments
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-200 p-8 hover:border-gray-300 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <Icon className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-black">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default VirtualCardSection;
