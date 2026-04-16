"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleScrollToSupport = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('support');
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

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What is the PayWithCryptoCard Virtual Visa® Card?",
      answer: "The PayWithCryptoCard Virtual Visa® Card is a fully digital payment card you use online like a normal credit card, but funded with cryptocurrency. You top up with crypto, it's converted into USD balance, and you can spend it right away anywhere online that accepts Visa, worldwide."
    },
    {
      question: "Do I need to complete KYC?",
      answer: "No. PayWithCryptoCard does not ask for personal data or identity documents in order to use the platform. You maintain complete privacy and anonymity."
    },
    {
      question: "How do virtual cards work?",
      answer: "A virtual card works just like a standard card, only without physical plastic. You receive card details (number, expiry date and CVV) and you enter them on checkout pages where you would normally use your regular credit or debit card. This lets you pay online without exposing your own bank card details."
    },
    {
      question: "Where can I use the PayWithCryptoCard Virtual Visa® Card?",
      answer: "You can spend your balance on almost any website that accepts Visa cards, in most countries around the world. This includes popular platforms like Uber, Google Play, Amazon, Apple Music, Asos, Udemy, Coursera, AliExpress, Namecheap, Facebook, PayPal and many more."
    },
    {
      question: "How much money can I load onto one virtual card?",
      answer: "Each virtual card can be loaded only once, with a maximum of $1,000 USD. After that initial load, you cannot add more funds to the same card, but you can always create new cards."
    },
    {
      question: "Are there any fees when using the PayWithCryptoCard Virtual Visa® Card?",
      answer: "Whenever you top up your account with crypto, we convert it into USD and apply a flat 2.5% conversion fee. There are no monthly subscription charges and no hidden extras, just one clear fee every time you add funds. PayWithCryptoCard does not add extra usage fees for paying online with the virtual card."
    },
    {
      question: "Can I reload a PayWithCryptoCard Virtual Visa® Card?",
      answer: "No. Cards are single-load only. To have more balance available, you would need to create a new card and fund that one. Each card can be funded up to $1,000 USD."
    },
    {
      question: "What happens if I return something I paid for with the card?",
      answer: "If a merchant approves your return, the refund is processed back to the same virtual card you used for the original payment. The refunded amount will be available to spend again on that card."
    },
    {
      question: "What cryptocurrencies do you accept?",
      answer: "We accept Bitcoin (BTC), Ethereum (ETH), Tether (USDT), USD Coin (USDC), and Monero (XMR). Simply send any of these cryptocurrencies to your unique wallet address, and the funds will be automatically converted to USD."
    },
    {
      question: "How long does it take for my crypto to be converted?",
      answer: "Crypto conversions are typically processed within a few minutes after your transaction is confirmed on the blockchain. Network congestion can sometimes cause slight delays, but your USD balance will be available as soon as the conversion is complete."
    },
    {
      question: "Is my money safe on PayWithCryptoCard?",
      answer: "Yes. We use industry-standard security measures including bank-level encryption and secure payment processing. Your funds are held securely and your transactions are protected. Additionally, using virtual cards helps protect your real banking information from being exposed online."
    },
    {
      question: "How long is a virtual card valid for?",
      answer: "Each virtual card is valid for 90 days from the date of creation. You can see the exact expiration date on your card details. Make sure to use your balance before the card expires."
    },
    {
      question: "Can I create multiple virtual cards?",
      answer: "Yes, you can create multiple virtual cards. This is useful for separating expenses - for example, one card for subscriptions, another for one-time purchases, and so on. Each card operates independently with its own balance."
    },
    {
      question: "What happens if my payment is declined?",
      answer: "Payments can be declined for several reasons: insufficient balance, card expired, merchant restrictions, or security flags. Check that you have enough USD balance on the card and that the card hasn't expired. If the issue persists, try creating a new card."
    },
    {
      question: "Can I withdraw my USD back to crypto?",
      answer: "No, once your crypto is converted to USD, it must be spent using the virtual card. We do not support converting USD back to cryptocurrency. This ensures funds are used for their intended purpose - making online payments."
    },
    {
      question: "Are there any country restrictions?",
      answer: "PayWithCryptoCard is available in most countries worldwide. However, some regions may have restrictions due to local regulations or sanctions. The virtual cards themselves can typically be used on any website that accepts Visa internationally."
    },
    {
      question: "How do I contact customer support?",
      answer: "You can reach our support team through the contact form on our website or via email. For urgent issues, please include your account details and a clear description of the problem."
    }
  ];

  return (
    <section id="faq" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Quick answers to common questions
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-5 py-4 text-left hover:bg-gray-50 "
                aria-expanded={openIndex === index}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-black pr-4">
                    {faq.question}
                  </h3>
                  <div className={`shrink-0`}>
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </button>

              <div
                className={`${
                  openIndex === index ? "" : "hidden"
                }`}
                aria-hidden={openIndex !== index}
              >
                <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-gray-600 mb-2">Still have questions?</p>
          <a
            href="#support"
            onClick={handleScrollToSupport}
            className="inline-flex items-center gap-2 text-black font-semibold hover:text-gray-700  cursor-pointer"
          >
            Contact our support
            <ChevronDown className="w-4 h-4 [-90deg]" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;