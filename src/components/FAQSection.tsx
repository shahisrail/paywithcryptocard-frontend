"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useInView } from "react-intersection-observer";

const FAQSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is the PayWithCryptoCard Virtual Visa® Card?",
      answer: "The PayWithCryptoCard Virtual Visa® Card is a fully digital payment card you use online like a normal credit card, but funded with cryptocurrency. You top up with crypto, it's converted into USD balance, and you can spend it right away anywhere online that accepts Visa, worldwide."
    },
    {
      question: "Do I need to complete KYC?",
      answer: "No. PayWithCryptoCard does not ask for personal data or identity documents in order to use the platform."
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
      question: "Do I have to apply for a PayWithCryptoCard Virtual Visa® Card?",
      answer: "No. There's no formal application process. You don't fill out forms, and we don't require personal information to create or use a card."
    },
    {
      question: "Can I withdraw my PayWithCryptoCard credit balance outside the platform?",
      answer: "No. Your credit balance is only usable inside the PayWithCryptoCard platform. You can: create and load PayWithCryptoCard Virtual Visa® Cards. You cannot withdraw this credit directly outside the platform."
    },
    {
      question: "How do I create and fund a PayWithCryptoCard Virtual Visa® Card?",
      answer: "First, add funds to your PayWithCryptoCard credit balance using cryptocurrency. Then, create a new virtual card and choose how much to load on it (up to $1,000 USD). Once that card is funded, it cannot be reloaded."
    },
    {
      question: "How much money can I load onto one PayWithCryptoCard Virtual Visa® Card?",
      answer: "Each virtual card can be loaded only once, with a maximum of $1,000 USD. After that initial load, you cannot add more funds to the same card."
    },
    {
      question: "Where can I shop or pay with the PayWithCryptoCard Virtual Visa® Card?",
      answer: "You can use your card on any online merchant that accepts Visa®. Typical examples include platforms like: Uber, Google Play, Amazon, Apple Music, Asos, Udemy, Coursera, AliExpress, Namecheap, Facebook, PayPal and many more. The card cannot be used for: ATM withdrawals or over-the-counter cash, money orders, wire transfers or similar cash-like products."
    },
    {
      question: "What billing name and address should I use?",
      answer: "Use the same name you have set on your PayWithCryptoCard account as the cardholder name. For billing address, you can use any address you choose; the virtual card is not tied to a physical statement address."
    },
    {
      question: "How long is a PayWithCryptoCard Virtual Visa® Card valid?",
      answer: "Each PayWithCryptoCard Virtual Visa® Card must be used within 90 days from the moment it is created. After that period, the card will no longer be valid."
    },
    {
      question: "Are there any fees when using the PayWithCryptoCard Virtual Visa® Card?",
      answer: "PayWithCryptoCard does not add extra usage fees for paying online with the virtual card. Merchants, payment processors or networks may still apply their own standard fees depending on the transaction. Whenever you top up your account with crypto, we convert it into USD and apply a flat 3% conversion fee. There are no monthly subscription charges and no hidden extras, just one clear fee every time you add funds."
    },
    {
      question: "Are there any limits on purchases with the PayWithCryptoCard Virtual Visa® Card?",
      answer: "Yes. A single card can never hold more than $1,000 USD at any time. You also cannot reload a card after it has been funded."
    },
    {
      question: "Can I reload a PayWithCryptoCard Virtual Visa® Card?",
      answer: "No. Cards are single-load only. To have more balance available, you would need to create a new card and fund that one."
    },
    {
      question: "Can I use multiple cryptocurrencies to fund one card?",
      answer: "Not right now. Each card load uses a single crypto funding flow for that transaction."
    },
    {
      question: "What happens if I return something I paid for with the card?",
      answer: "If a merchant approves your return, the refund is processed back to the same virtual card you used for the original payment."
    },
    {
      question: "I made a mistake when creating a card. Can I get a refund?",
      answer: "The issuing and loading fees for the card are non-refundable, as they are paid to the issuing bank. However, any remaining balance on the card can be moved back to your PayWithCryptoCard credit balance, which you can then use to create another card."
    },
    {
      question: "What happens if I don't spend the full balance on a card?",
      answer: "You can: keep using the card until the balance is zero, or delete the card and move the unspent amount back to your PayWithCryptoCard credit balance. That credit can then be reused to fund another card or to send to other users on the platform."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="responsive-container max-w-4xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 text-center">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 text-center max-w-2xl mx-auto">
            Got any questions? We've got answers.
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: "easeOut"
              }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full bg-white rounded-xl p-6 text-left border border-gray-200 hover:border-indigo-300 transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
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
      </div>
    </section>
  );
};

export default FAQSection;