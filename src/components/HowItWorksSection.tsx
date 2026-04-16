"use client";

import { Wallet, ArrowRight, CreditCard, ShoppingBag } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      icon: Wallet,
      title: "Fund Your Account",
      description: "Send BTC, ETH, USDT, USDC or XMR to your account balance"
    },
    {
      icon: ArrowRight,
      title: "Instant Conversion",
      description: "Crypto is automatically converted to USD at market rates"
    },
    {
      icon: CreditCard,
      title: "Create Your Card",
      description: "Generate your virtual Visa card with card number, expiry, and CVV"
    },
    {
      icon: ShoppingBag,
      title: "Start Spending",
      description: "Use your card anywhere Visa is accepted online"
    }
  ];

  return (
    <section id="how-it-works" className="py-12 sm:py-16 lg:py-20 bg-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4 tracking-tight">
            How It Works
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Get your virtual Visa card in four simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                <div className="bg-white rounded-xl p-5 pt-6 h-full border border-gray-200 hover:border-black hover:shadow-lg  ">
                  <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-3">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-base font-semibold text-black mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Supported Crypto */}
        <div className="mt-10 bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-center text-sm font-semibold text-black mb-4">
            Supported Cryptocurrencies
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 hover:border-black ">
              <img src="/logos/btc.svg" alt="Bitcoin" className="w-5 h-5" loading="lazy" onError={(e) => { e.currentTarget.src = 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22%23f7931a%22><circle cx=%2212%22 cy=%2212%22 r=%2210%22/></svg>'; }} />
              <span className="text-sm font-medium text-gray-700">Bitcoin</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 hover:border-black ">
              <img src="/logos/eth.svg" alt="Ethereum" className="w-5 h-5" loading="lazy" onError={(e) => { e.currentTarget.src = 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22%23627eea%22><circle cx=%2212%22 cy=%2212%22 r=%2210%22/></svg>'; }} />
              <span className="text-sm font-medium text-gray-700">Ethereum</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 hover:border-black ">
              <img src="/deposit/images (2).webp" alt="Tether" className="w-5 h-5" loading="lazy" onError={(e) => { e.currentTarget.src = 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%2226a17b%22><circle cx=%2212%22 cy=%2212%22 r=%2210%22/></svg>'; }} />
              <span className="text-sm font-medium text-gray-700">Tether</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 hover:border-black ">
              <img src="/logos/usd-coin-usdc-logo.webp" alt="USD Coin" className="w-5 h-5" loading="lazy" onError={(e) => { e.currentTarget.src = 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%222777ca%22><circle cx=%2212%22 cy=%2212%22 r=%2210%22/></svg>'; }} />
              <span className="text-sm font-medium text-gray-700">USD Coin</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 hover:border-black ">
              <img src="/deposit/XMR.webp" alt="Monero" className="w-5 h-5" loading="lazy" onError={(e) => { e.currentTarget.src = 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%222777ca%22><circle cx=%2212%22 cy=%2212%22 r=%2210%22/></svg>'; }} />
              <span className="text-sm font-medium text-gray-700">Monero </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
