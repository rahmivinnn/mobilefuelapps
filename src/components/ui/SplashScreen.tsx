import * as React from 'react';
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  React.useEffect(() => {
    // Reduced splash screen time to 2.5 seconds
    const timer = setTimeout(() => {
      onFinish();
    }, 2500);
    
    return () => {
      clearTimeout(timer);
    };
  }, [onFinish]);
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-green-500">
      {/* Simplified animations and removed heavy patterns */}
      <div className="z-10 flex flex-col items-center justify-center">
        {/* Container for both circle and flame with optimized animations */}
        <div className="relative mb-6">
          {/* Circle with simplified animation */}
          <motion.div 
            className="w-24 h-24 rounded-full border-2 border-white flex items-center justify-center relative"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
          
          {/* Flame with simplified animation */}
          <motion.div
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          >
            <Flame className="h-12 w-12 text-white" />
          </motion.div>
        </div>
        
        {/* FUELFRIENDLY text with simplified animation */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <img 
            src="/lovable-uploads/2b80eff8-6efd-4f15-9213-ed9fe4e0cba9.png" 
            alt="FUELFRIENDLY" 
            className="h-6"
            loading="eager"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default SplashScreen;
