
import * as React from 'react';
import { motion } from 'framer-motion';

interface SplashScreenProps {
  onFinish: () => void;
}

// Logo component with updated design
const Logo = () => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center gap-6"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
    >
      {/* Circle with new logo */}
      <motion.div 
        className="w-24 h-24 rounded-full border-2 border-white flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.7, duration: 0.5, ease: "easeOut" }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5, ease: "easeOut" }}
        >
          {/* New logo from uploaded image */}
          <img 
            src="/lovable-uploads/19fdfff8-09d0-4398-bcb2-6f4830ab5e38.png" 
            alt="FuelFriendly Logo" 
            className="w-16 h-16"
          />
        </motion.div>
      </motion.div>
      
      {/* Updated FUELFRIENDLY text with image */}
      <motion.div 
        className="text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <img 
          src="/lovable-uploads/2b80eff8-6efd-4f15-9213-ed9fe4e0cba9.png" 
          alt="FUELFRIENDLY" 
          className="h-8"
        />
      </motion.div>
    </motion.div>
  );
};

// Hexagon Grid components
const TopHexagonGrid = () => {
  return (
    <motion.div
      className="absolute top-0 right-0 w-3/4 h-1/4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.3 }}
    >
      <svg width="100%" height="100%" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.2">
          <path d="M10,60 L35,45 L60,60 L60,90 L35,105 L10,90 Z" fill="white" />
          <path d="M60,60 L85,45 L110,60 L110,90 L85,105 L60,90 Z" fill="white" />
          <path d="M110,60 L135,45 L160,60 L160,90 L135,105 L110,90 Z" fill="white" />
          <path d="M160,60 L185,45 L210,60 L210,90 L185,105 L160,90 Z" fill="white" />
          <path d="M210,60 L235,45 L260,60 L260,90 L235,105 L210,90 Z" fill="white" />
          
          <path d="M35,15 L60,0 L85,15 L85,45 L60,60 L35,45 Z" fill="white" />
          <path d="M85,15 L110,0 L135,15 L135,45 L110,60 L85,45 Z" fill="white" />
          <path d="M135,15 L160,0 L185,15 L185,45 L160,60 L135,45 Z" fill="white" />
          <path d="M185,15 L210,0 L235,15 L235,45 L210,60 L185,45 Z" fill="white" />
          
          <path d="M60,105 L85,90 L110,105 L110,135 L85,150 L60,135 Z" fill="white" />
          <path d="M110,105 L135,90 L160,105 L160,135 L135,150 L110,135 Z" fill="white" />
          <path d="M160,105 L185,90 L210,105 L210,135 L185,150 L160,135 Z" fill="white" />
        </g>
      </svg>
    </motion.div>
  );
};

const BottomHexagonGrid = () => {
  return (
    <motion.div
      className="absolute bottom-0 left-0 w-3/4 h-1/4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.3 }}
    >
      <svg width="100%" height="100%" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.2">
          <path d="M10,60 L35,45 L60,60 L60,90 L35,105 L10,90 Z" fill="white" />
          <path d="M60,60 L85,45 L110,60 L110,90 L85,105 L60,90 Z" fill="white" />
          <path d="M110,60 L135,45 L160,60 L160,90 L135,105 L110,90 Z" fill="white" />
          <path d="M160,60 L185,45 L210,60 L210,90 L185,105 L160,90 Z" fill="white" />
          <path d="M210,60 L235,45 L260,60 L260,90 L235,105 L210,90 Z" fill="white" />
          
          <path d="M35,15 L60,0 L85,15 L85,45 L60,60 L35,45 Z" fill="white" />
          <path d="M85,15 L110,0 L135,15 L135,45 L110,60 L85,45 Z" fill="white" />
          <path d="M135,15 L160,0 L185,15 L185,45 L160,60 L135,45 Z" fill="white" />
          <path d="M185,15 L210,0 L235,15 L235,45 L210,60 L185,45 Z" fill="white" />
          
          <path d="M60,105 L85,90 L110,105 L110,135 L85,150 L60,135 Z" fill="white" />
          <path d="M110,105 L135,90 L160,105 L160,135 L135,150 L110,135 Z" fill="white" />
          <path d="M160,105 L185,90 L210,105 L210,135 L185,150 L160,135 Z" fill="white" />
        </g>
      </svg>
    </motion.div>
  );
};

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  // Effect to handle the splash screen timing
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 4000);
    
    return () => {
      clearTimeout(timer);
    };
  }, [onFinish]);
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-green-500 overflow-hidden">
      {/* Top hexagon pattern */}
      <TopHexagonGrid />
      
      {/* Bottom hexagon pattern */}
      <BottomHexagonGrid />
      
      {/* Centered logo with updated styling */}
      <div className="z-10 flex items-center justify-center">
        <Logo />
      </div>
    </div>
  );
};

export default SplashScreen;
