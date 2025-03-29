
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Download, Share2 } from 'lucide-react';
import Header from '@/components/layout/Header';
import { motion } from 'framer-motion';

const Confirmation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { fuelType, quantity, totalPrice, paymentMethod } = location.state || {
    fuelType: { id: 'regular', name: 'Regular Unleaded', price: 3.29 },
    quantity: 2,
    totalPrice: 6.58,
    paymentMethod: { id: 'e-wallet', name: 'E-Wallet' }
  };
  
  // Generate a random transaction ID
  const transactionId = 'TRX' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  
  // Get current date and time for the transaction
  const transactionDate = new Date().toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  const handleBackToHome = () => {
    navigate('/');
  };
  
  const handleTrackOrder = () => {
    navigate('/track');
  };
  
  // Confetti effect on successful payment
  useEffect(() => {
    const createConfetti = () => {
      for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'absolute w-2 h-2 rounded-full';
        confetti.style.backgroundColor = ['#4ade80', '#facc15', '#ef4444', '#3b82f6'][Math.floor(Math.random() * 4)];
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.top = `${Math.random() * 50}%`;
        confetti.style.transform = `scale(${Math.random() * 0.5 + 0.5})`;
        confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
        document.getElementById('confetti-container')?.appendChild(confetti);
        
        setTimeout(() => {
          confetti.remove();
        }, 5000);
      }
    };
    
    createConfetti();
    
    // Add keyframe animation for falling confetti
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes fall {
        0% {
          transform: translateY(-10px) rotate(0deg);
          opacity: 1;
        }
        100% {
          transform: translateY(100vh) rotate(360deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  return (
    <>
      <Header showBack={false} title="Payment Successful" />
      
      <div id="confetti-container" className="fixed inset-0 pointer-events-none z-50"></div>
      
      <main className="page-container">
        <motion.div 
          className="flex flex-col items-center justify-center my-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="h-20 w-20 rounded-full bg-green-500/20 flex items-center justify-center mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 200,
              damping: 15
            }}
          >
            <CheckCircle className="h-10 w-10 text-green-500" />
          </motion.div>
          <motion.h2 
            className="text-2xl font-bold text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Payment Successful!
          </motion.h2>
          <motion.p 
            className="text-muted-foreground text-center mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Your transaction has been completed
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="glass card-shadow rounded-xl p-5 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <h3 className="text-lg font-medium mb-4">Receipt Details</h3>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Transaction ID</p>
              <p className="font-medium">{transactionId}</p>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">Date & Time</p>
              <p className="font-medium">{transactionDate}</p>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">Fuel Type</p>
              <p className="font-medium">{fuelType.name}</p>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">Quantity</p>
              <p className="font-medium">{quantity} gallons</p>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">Payment Method</p>
              <p className="font-medium">{paymentMethod.name}</p>
            </div>
            
            <div className="border-t border-border pt-4">
              <p className="text-sm text-muted-foreground">Total Amount</p>
              <p className="text-xl font-bold">
                {totalPrice.toLocaleString('en-US', { 
                  style: 'currency', 
                  currency: 'USD'
                })}
              </p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-2 gap-3 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <button className="glass card-shadow rounded-xl p-4 flex flex-col items-center justify-center">
            <Download className="h-5 w-5 mb-2 text-green-500" />
            <span>Download</span>
          </button>
          <button className="glass card-shadow rounded-xl p-4 flex flex-col items-center justify-center">
            <Share2 className="h-5 w-5 mb-2 text-green-500" />
            <span>Share</span>
          </button>
        </motion.div>
        
        <motion.div 
          className="glass card-shadow rounded-xl p-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <p className="text-center text-sm text-muted-foreground">
            Your fuel is on the way! Please keep your phone handy.
          </p>
        </motion.div>
        
        <motion.div
          className="grid grid-cols-1 gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <button 
            onClick={handleTrackOrder}
            className="w-full py-4 rounded-xl bg-green-500 text-black font-semibold hover:bg-green-600 active:scale-[0.99] transition-all duration-200"
          >
            Track Your Order
          </button>
          
          <button 
            onClick={handleBackToHome}
            className="w-full py-4 rounded-xl bg-transparent border border-green-500 text-green-500 font-semibold hover:bg-green-500/10 active:scale-[0.99] transition-all duration-200"
          >
            Back to Home
          </button>
        </motion.div>
      </main>
    </>
  );
};

export default Confirmation;
