
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Fuel, Car, ShoppingBag, AlertTriangle } from 'lucide-react';

interface OrderConfirmModalProps {
  onConfirm: () => void;
  orderTotal: number;
  serviceFee: number;
  driverName: string;
  licensePlate?: string;
  items?: Array<{ name: string; quantity: string; price: number }>;
}

const OrderConfirmModal: React.FC<OrderConfirmModalProps> = ({
  onConfirm,
  orderTotal,
  serviceFee,
  driverName,
  licensePlate = "TN-XXXXX",
  items = []
}) => {
  const totalAmount = orderTotal + serviceFee;
  const [step, setStep] = useState<'arrival' | 'service' | 'complete'>('arrival');
  
  const handleConfirmArrival = () => {
    setStep('service');
  };
  
  const handleConfirmService = () => {
    setStep('complete');
  };
  
  const handleConfirmPayment = () => {
    onConfirm();
  };
  
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
        {step === 'arrival' && (
          <>
            <div className="text-center mb-6">
              <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car size={32} className="text-black" />
              </div>
              <h2 className="text-xl font-bold">Confirm Fuel Friend Arrival</h2>
              <p className="text-gray-400">Your Fuel Friend has arrived at your location</p>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-4 mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Fuel Friend</span>
                <span>{driverName}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">License Plate</span>
                <span className="font-mono">{licensePlate}</span>
              </div>
              
              <div className="mt-4 p-3 bg-yellow-900/30 border border-yellow-700/50 rounded-lg">
                <div className="flex">
                  <AlertTriangle size={18} className="text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-yellow-300">
                    Please verify the license plate matches before confirming arrival
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col space-y-2">
              <button
                onClick={handleConfirmArrival}
                className="w-full py-3 rounded-xl bg-blue-500 text-black font-semibold hover:bg-blue-600 active:scale-[0.98] transition-all duration-200 flex items-center justify-center"
              >
                <Check size={20} className="mr-2" />
                Confirm Arrival
              </button>
            </div>
          </>
        )}

        {step === 'service' && (
          <>
            <div className="text-center mb-6">
              <div className="bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Fuel size={32} className="text-black" />
              </div>
              <h2 className="text-xl font-bold">Service in Progress</h2>
              <p className="text-gray-400">{driverName} is completing your order</p>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-4 mb-6">
              <h3 className="font-medium mb-2">Order Items</h3>
              {items.length > 0 ? (
                items.map((item, i) => (
                  <div key={i} className="flex justify-between mb-2">
                    <span className="text-gray-300">{item.name}</span>
                    <span>${item.price.toFixed(2)}</span>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center text-gray-500 py-2">
                  <ShoppingBag size={16} className="mr-2" />
                  <span>Fuel service only</span>
                </div>
              )}
              
              <div className="mt-4 p-3 bg-blue-900/30 border border-blue-700/50 rounded-lg">
                <p className="text-sm text-blue-300 text-center">
                  Please wait while your Fuel Friend completes the service...
                </p>
              </div>
            </div>
            
            <div className="flex flex-col space-y-2">
              <button
                onClick={handleConfirmService}
                className="w-full py-3 rounded-xl bg-orange-500 text-black font-semibold hover:bg-orange-600 active:scale-[0.98] transition-all duration-200 flex items-center justify-center"
              >
                <Check size={20} className="mr-2" />
                Service Complete
              </button>
            </div>
          </>
        )}

        {step === 'complete' && (
          <>
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
                onClick={handleConfirmPayment}
                className="w-full py-3 rounded-xl bg-green-500 text-black font-semibold hover:bg-green-600 active:scale-[0.98] transition-all duration-200 flex items-center justify-center"
              >
                <Check size={20} className="mr-2" />
                Confirm Payment
              </button>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default OrderConfirmModal;
