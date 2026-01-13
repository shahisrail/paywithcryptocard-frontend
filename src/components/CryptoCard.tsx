"use client";

import { motion } from "framer-motion";
import { CreditCard, Chip, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface CryptoCardProps {
  cardNumber?: string;
  cardHolder?: string;
  expiryDate?: string;
  cvv?: string;
  cardType?: "credit" | "debit";
  variant?: "purple" | "cyan" | "pink" | "gradient";
  showBalance?: boolean;
  balance?: string;
}

const CryptoCard = ({
  cardNumber = "4822",
  cardHolder = "YOUR NAME",
  expiryDate = "12/28",
  cvv = "***",
  cardType = "credit",
  variant = "purple",
  showBalance = false,
  balance = "$1,000.00",
}: CryptoCardProps) => {
  const [showNumber, setShowNumber] = useState(false);

  const gradients = {
    purple: "linear-gradient(135deg, #7c3aed 0%, #ec4899 50%, #f43f5e 100%)",
    cyan: "linear-gradient(135deg, #06b6d4 0%, #10b981 50%, #22d3ee 100%)",
    pink: "linear-gradient(135deg, #ec4899 0%, #f43f5e 50%, #f97316 100%)",
    gradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%)",
  };

  const maskedNumber = showNumber
    ? `•••• •••• •••• ${cardNumber.slice(-4)}`
    : `•••• •••• •••• ${cardNumber.slice(-4)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotateX: 10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
      whileHover={{
        y: -10,
        rotateX: 5,
        scale: 1.02,
        transition: { duration: 0.3 },
      }}
      className="relative w-full max-w-md mx-auto"
      style={{ perspective: "1000px" }}
    >
      {/* Card Container */}
      <div
        className="relative w-full aspect-[1.586/1] rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden"
        style={{
          background: gradients[variant],
        }}
      >
        {/* Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none" />

        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </div>

        {/* Card Type Label */}
        <div className="relative z-10 flex justify-between items-start mb-8 sm:mb-12">
          <div className="bg-white/20 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-white/30">
            <span className="text-white text-xs sm:text-sm font-bold tracking-wider uppercase">
              {cardType}
            </span>
          </div>
          <button
            onClick={() => setShowNumber(!showNumber)}
            className="bg-white/20 backdrop-blur-sm p-2 rounded-lg border border-white/30 hover:bg-white/30 transition-all"
          >
            {showNumber ? (
              <EyeOff className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            ) : (
              <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            )}
          </button>
        </div>

        {/* Chip */}
        <div className="relative z-10 mb-6 sm:mb-8">
          <div className="bg-gradient-to-br from-yellow-300/90 to-yellow-500/90 w-12 h-10 sm:w-16 sm:h-12 rounded-lg flex items-center justify-center shadow-lg border border-yellow-200/50">
            <Chip className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-700/60" />
          </div>
        </div>

        {/* Card Number */}
        <div className="relative z-10 mb-6 sm:mb-8">
          <p className="text-white text-xl sm:text-2xl lg:text-3xl font-bold tracking-widest font-mono">
            {maskedNumber}
          </p>
        </div>

        {/* Card Details */}
        <div className="relative z-10 flex justify-between items-end">
          <div className="flex-1">
            <p className="text-white/70 text-[10px] sm:text-xs uppercase tracking-wider mb-1">
              Card Holder
            </p>
            <p className="text-white text-sm sm:text-base font-semibold tracking-wide">
              {cardHolder}
            </p>
          </div>
          <div className="text-right">
            <p className="text-white/70 text-[10px] sm:text-xs uppercase tracking-wider mb-1">
              Expires
            </p>
            <p className="text-white text-sm sm:text-base font-semibold tracking-wide">
              {expiryDate}
            </p>
          </div>
        </div>

        {/* Balance (Optional) */}
        {showBalance && (
          <div className="absolute bottom-4 left-6 right-6 bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
            <p className="text-white/70 text-xs uppercase tracking-wider mb-1">
              Available Balance
            </p>
            <p className="text-white text-xl font-bold">{balance}</p>
          </div>
        )}

        {/* Logo */}
        <div className="absolute bottom-6 right-6 opacity-80">
          <CreditCard className="w-10 h-10 sm:w-12 sm:h-12 text-white/90" />
        </div>
      </div>

      {/* Card Shadow/Glow */}
      <div
        className="absolute -bottom-4 left-4 right-4 h-4 rounded-full blur-xl opacity-50"
        style={{
          background: gradients[variant],
        }}
      />
    </motion.div>
  );
};

export default CryptoCard;
