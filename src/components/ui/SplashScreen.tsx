
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [showLogo, setShowLogo] = useState(false);
  
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setShowLogo(true);
    }, 500);
    
    const timer2 = setTimeout(() => {
      onFinish();
    }, 3500);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onFinish]);
  
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-green-500 overflow-hidden">
      {/* Hexagonal pattern at the top */}
      <div className="absolute top-0 right-0 w-full">
        <motion.svg 
          width="100%" 
          height="300" 
          viewBox="0 0 400 300" 
          initial={{ opacity: 0.3, y: -20 }}
          animate={{ opacity: 0.5, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <defs>
            <pattern id="hexagonPattern" patternUnits="userSpaceOnUse" width="50" height="43.4" patternTransform="scale(2) rotate(0)">
              <path d="M25,0 L50,14.4 L50,38.6 L25,53 L0,38.6 L0,14.4 Z" fill="rgba(255,255,255,0.1)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagonPattern)" />
        </motion.svg>
      </div>
      
      {/* Hexagonal pattern at the bottom */}
      <div className="absolute bottom-0 left-0 w-full">
        <motion.svg 
          width="100%" 
          height="300" 
          viewBox="0 0 400 300" 
          initial={{ opacity: 0.3, y: 20 }}
          animate={{ opacity: 0.5, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <rect width="100%" height="100%" fill="url(#hexagonPattern)" />
        </motion.svg>
      </div>
      
      {/* Logo and Text */}
      <motion.div 
        className="flex flex-col items-center justify-center z-10"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: showLogo ? 0 : -50, opacity: showLogo ? 1 : 0 }}
        transition={{ type: "spring", damping: 12, stiffness: 100 }}
      >
        <motion.div 
          className="relative w-32 h-32 mb-6"
          animate={{ 
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
        >
          <img 
            src="/lovable-uploads/ba008608-8960-40b9-8a96-e5b173a48e08.png" 
            alt="FuelFriendly Logo" 
            className="w-full h-full object-contain"
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center"
        >
          <h1 className="font-bold text-white text-4xl tracking-widest" style={{ fontFamily: 'Impact, Haettenschweiler, Arial Narrow Bold, sans-serif', letterSpacing: '2px', fontStyle: 'italic' }}>
            FUELFRIENDLY
          </h1>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SplashScreen;
