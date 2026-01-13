"use client";

import { CryptoCard } from "./CryptoCard";
import { PaymentMethodCard } from "./PaymentMethodCard";
import { motion } from "framer-motion";

const CardShowcase = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-12 sm:py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 gradient-text">
            Crypto Card Showcase
          </h1>
          <p className="text-secondary-clear text-lg">
            Beautiful payment cards for your crypto platform
          </p>
        </motion.div>

        {/* Crypto Cards Display */}
        <section className="mb-16 sm:mb-24">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">
            Virtual Cards
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <CryptoCard variant="purple" />
            <CryptoCard variant="cyan" />
            <CryptoCard variant="pink" />
            <CryptoCard variant="gradient" />
          </div>

          {/* Cards with Balance */}
          <div className="mt-12">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 text-center">
              With Balance Display
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <CryptoCard
                variant="purple"
                showBalance={true}
                balance="$2,450.00"
              />
              <CryptoCard
                variant="cyan"
                showBalance={true}
                balance="$5,000.00"
              />
            </div>
          </div>
        </section>

        {/* Payment Methods Display */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">
            Payment Methods
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            <PaymentMethodCard
              cardNumber="4242424242424242"
              isSelected={true}
              variant="purple"
            />
            <PaymentMethodCard
              cardNumber="5555555555554444"
              variant="cyan"
            />
            <PaymentMethodCard
              cardNumber="378282246310005"
              variant="pink"
            />
            <PaymentMethodCard
              cardNumber="6011111111111117"
              variant="gradient"
            />
          </div>
        </section>

        {/* Usage Example */}
        <section className="mt-16 sm:mt-24">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">
            Usage Example
          </h2>
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-white/10 max-w-4xl mx-auto">
            <pre className="text-sm sm:text-base text-secondary-clear overflow-x-auto">
              <code>{`import { CryptoCard } from './components/CryptoCard';

// Basic usage
<CryptoCard
  cardNumber="4822"
  cardHolder="YOUR NAME"
  expiryDate="12/28"
  variant="purple"
/>

// With balance
<CryptoCard
  variant="cyan"
  showBalance={true}
  balance="$1,000.00"
/>

import { PaymentMethodCard } from './components/PaymentMethodCard';

<PaymentMethodCard
  cardNumber="4242424242424242"
  isSelected={true}
  onSelect={() => console.log('Selected')}
  onEdit={() => console.log('Edit')}
  onDelete={() => console.log('Delete')}
  variant="purple"
/>`}</code>
            </pre>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CardShowcase;
