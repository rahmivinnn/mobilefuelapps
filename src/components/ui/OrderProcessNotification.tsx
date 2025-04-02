
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Clock, MapPin, ShoppingBag, Fuel, ChevronRight } from 'lucide-react';

interface OrderProcessStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  completed: boolean;
  current: boolean;
}

interface OrderProcessNotificationProps {
  isOpen: boolean;
  steps: OrderProcessStep[];
  onClose: () => void;
}

const OrderProcessNotification: React.FC<OrderProcessNotificationProps> = ({
  isOpen,
  steps,
  onClose
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div 
            className="w-[90%] max-w-md p-5 bg-black border border-gray-800 rounded-xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-white mb-4">Your Order Status</h2>
            
            <div className="space-y-4">
              {steps.map((step, index) => (
                <div key={step.id} className="relative">
                  <div className="flex items-start">
                    <div className={`h-10 w-10 flex-shrink-0 rounded-full ${step.completed ? 'bg-green-500' : step.current ? 'bg-blue-500' : 'bg-gray-700'} flex items-center justify-center`}>
                      {step.completed ? (
                        <CheckCircle className="h-5 w-5 text-white" />
                      ) : (
                        step.icon
                      )}
                    </div>
                    
                    <div className="ml-4 flex-1">
                      <div className="flex items-center">
                        <h3 className={`font-medium ${step.completed ? 'text-green-500' : step.current ? 'text-white' : 'text-gray-400'}`}>
                          {step.title}
                        </h3>
                        {step.current && (
                          <span className="ml-2 text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full animate-pulse">
                            In Progress
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-400 mt-1">{step.description}</p>
                    </div>
                  </div>
                  
                  {index < steps.length - 1 && (
                    <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-gray-700 h-full transform translate-x-0">
                      <div 
                        className="bg-green-500 w-0.5 transition-all duration-1000"
                        style={{ height: step.completed ? '100%' : '0%' }}
                      ></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-6 flex justify-end">
              <button 
                onClick={onClose}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OrderProcessNotification;
