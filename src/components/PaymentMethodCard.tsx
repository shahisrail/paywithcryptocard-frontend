"use client";

import { motion } from "framer-motion";
import { CreditCard, ChevronRight, Edit2, Trash2 } from "lucide-react";
import { useState } from "react";

interface PaymentMethodCardProps {
  cardNumber: string;
  cardHolder?: string;
  expiryDate?: string;
  isSelected?: boolean;
  onSelect?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  variant?: "purple" | "cyan" | "pink" | "gradient";
}

const PaymentMethodCard = ({
  cardNumber,
  cardHolder = "YOUR NAME",
  expiryDate = "12/28",
  isSelected = false,
  onSelect,
  onEdit,
  onDelete,
  variant = "purple",
}: PaymentMethodCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const gradients = {
    purple: "linear-gradient(135deg, #7c3aed 0%, #ec4899 50%, #f43f5e 100%)",
    cyan: "linear-gradient(135deg, #06b6d4 0%, #10b981 50%, #22d3ee 100%)",
    pink: "linear-gradient(135deg, #ec4899 0%, #f43f5e 50%, #f97316 100%)",
    gradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%)",
  };

  const lastFourDigits = cardNumber.slice(-4);

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative"
    >
      {/* Payment Method Item */}
      <div
        className={`group relative bg-white/5 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 border   cursor-pointer ${
          isSelected
            ? "border-cyan-500/50 shadow-lg shadow-cyan-500/20"
            : "border-white/10 hover:border-white/20"
        }`}
        onClick={onSelect}
      >
        {/* Selected Indicator */}
        {isSelected && (
          <motion.div
            layoutId="selectedIndicator"
            className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 rounded-xl sm:rounded-2xl pointer-events-none"
          />
        )}

        {/* Content */}
        <div className="relative z-10 flex items-center justify-between gap-4">
          {/* Card Icon & Info */}
          <div className="flex items-center gap-3 sm:gap-4 flex-1">
            {/* Card Icon */}
            <div
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg"
              style={{ background: gradients[variant] }}
            >
              <CreditCard className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>

            {/* Card Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-white font-semibold text-sm sm:text-base truncate">
                  Credit Card
                </h3>
                {isSelected && (
                  <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-400 text-[10px] sm:text-xs font-semibold rounded-full uppercase tracking-wider">
                    Default
                  </span>
                )}
              </div>
              <p className="text-secondary-clear text-xs sm:text-sm">
                Ending in {lastFourDigits}
              </p>
              <p className="text-white/50 text-[10px] sm:text-xs mt-0.5">
                Expires {expiryDate}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.();
              }}
              className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg  "
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.();
              }}
              className="p-2 text-white/60 hover:text-red-400 hover:bg-red-500/10 rounded-lg  "
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <ChevronRight
              className={`w-5 h-5 text-white/40   ${
                isHovered ? "" : ""
              }`}
            />
          </div>
        </div>

        {/* Hover Effect Border */}
        <div
          className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-500 to-emerald-500   ${
            isSelected ? "w-full" : "w-0 group-hover:w-full"
          }`}
        />
      </div>
    </motion.div>
  );
};

export default PaymentMethodCard;
