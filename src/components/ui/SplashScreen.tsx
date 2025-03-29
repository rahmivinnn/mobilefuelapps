
import * as React from 'react';
import { motion } from 'framer-motion';

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  React.useEffect(() => {
    // Handle splash screen timing - 3 seconds
    const timer = setTimeout(() => {
      onFinish();
    }, 3000);
    
    return () => {
      clearTimeout(timer);
    };
  }, [onFinish]);
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-green-500 overflow-hidden">
      {/* Top hexagon pattern */}
      <div className="absolute top-0 left-0 w-full h-2/5">
        <motion.div
          className="w-full h-full relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1 }}
        >
          <img 
            src="/lovable-uploads/b9b9af0d-f75b-4949-89ca-178f3f449be9.png" 
            alt="Hexagon Pattern" 
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
      
      {/* Bottom hexagon pattern */}
      <div className="absolute bottom-0 left-0 w-full h-2/5">
        <motion.div
          className="w-full h-full relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1 }}
        >
          <img 
            src="/lovable-uploads/0c368b73-df56-4e77-94c3-14691cdc22b7.png" 
            alt="Hexagon Pattern" 
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
      
      {/* Centered logo with animation */}
      <motion.div 
        className="z-10 flex flex-col items-center justify-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Circle with logo */}
        <motion.div 
          className="w-24 h-24 rounded-full border-2 border-white flex items-center justify-center mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5, type: "spring" }}
        >
          <img 
            src="/lovable-uploads/169374be-fcb3-48c3-96f6-c5bcd5b645b8.png" 
            alt="FuelFriendly Logo" 
            className="w-16 h-16"
          />
        </motion.div>
        
        {/* FUELFRIENDLY text */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <img 
            src="/lovable-uploads/2b80eff8-6efd-4f15-9213-ed9fe4e0cba9.png" 
            alt="FUELFRIENDLY" 
            className="h-6"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SplashScreen;
