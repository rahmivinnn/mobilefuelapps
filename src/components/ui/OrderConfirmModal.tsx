
import React from 'react';
import { motion } from 'framer-motion';
import { Check, Fuel } from 'lucide-react';

interface OrderConfirmModalProps {
  onConfirm: () => void;
  orderTotal: number;
  serviceFee: number;
  driverName: string;
}

const OrderConfirmModal: React.FC<OrderConfirmModalProps> = ({
  onConfirm,
  orderTotal,
  serviceFee,
  driverName
}) => {
  const totalAmount = orderTotal + serviceFee;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gray-900 rounded-xl p-6 w-full max-w-md"
      >
        <div className="text-center mb-6">
          <div className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Fuel size={32} className="text-black" />
          </div>
          <h2 className="text-xl font-bold">Order Complete</h2>
          <p className="text-gray-400">Your order has been delivered by {driverName}</p>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-4 mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-gray-400">Order Total</span>
            <span>${orderTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-400">Service Fee</span>
            <span>${serviceFee.toFixed(2)}</span>
          </div>
          <div className="border-t border-gray-700 pt-2 mt-2 flex justify-between">
            <span className="font-medium">Total Amount</span>
            <span className="font-bold">${totalAmount.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="flex flex-col space-y-2">
          <p className="text-sm text-gray-400 text-center mb-2">
            By confirming, you agree to pay the total amount for the service provided.
          </p>
          <button
            onClick={onConfirm}
            className="w-full py-3 rounded-xl bg-green-500 text-black font-semibold hover:bg-green-600 active:scale-[0.98] transition-all duration-200 flex items-center justify-center"
          >
            <Check size={20} className="mr-2" />
            Confirm Payment
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default OrderConfirmModal;
