
import * as React from 'react';
import { motion } from 'framer-motion';

interface SplashScreenProps {
  onFinish: () => void;
}

// Logo component
const Logo = () => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center gap-6"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
    >
      {/* Circle with new flame icon */}
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
          {/* New flame logo SVG from the reference image */}
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M24 4C13.5 4 5 12.5 5 23C5 33.5 13.5 42 24 42C34.5 42 43 33.5 43 23C43 12.5 34.5 4 24 4ZM24 38C15.7 38 9 31.3 9 23C9 14.7 15.7 8 24 8C32.3 8 39 14.7 39 23C39 31.3 32.3 38 24 38Z" 
              fill="white" 
            />
            <path 
              d="M24 12C21.5 12 19.2 12.8 17.3 14.1C17.1 14.3 17 14.6 17 14.9C17 15.2 17.1 15.5 17.3 15.7C17.5 15.9 17.8 16 18.1 16C18.4 16 18.7 15.9 18.9 15.7C20.4 14.6 22.1 14 24 14C29.5 14 34 18.5 34 24C34 25.9 33.4 27.6 32.3 29.1C32.1 29.3 32 29.6 32 29.9C32 30.2 32.1 30.5 32.3 30.7C32.5 30.9 32.8 31 33.1 31C33.4 31 33.7 30.9 33.9 30.7C35.2 28.8 36 26.5 36 24C36 17.4 30.6 12 24 12Z"
              fill="white" 
            />
            <path 
              d="M23.5 16C21.6 16 20 17.6 20 19.5C20 19.7 20 19.9 20.1 20.1C20.3 21.6 21.2 23.1 22.2 24.3C22.5 24.7 22.8 25 23 25.2C23.1 25.3 23.2 25.4 23.4 25.5C23.4 25.5 23.4 25.5 23.4 25.5C23.4 25.5 23.5 25.6 23.5 25.6C23.5 25.6 23.5 25.6 23.5 25.6C23.5 25.6 23.6 25.6 23.6 25.6C23.6 25.6 23.6 25.6 23.6 25.6C23.7 25.6 23.7 25.6 23.8 25.5C23.9 25.5 23.9 25.4 24 25.4C24.1 25.3 24.2 25.2 24.3 25.1C24.5 24.9 24.8 24.6 25.1 24.2C26 23.1 27 21.5 27 20C27 17.8 25.4 16 23.5 16Z"
              fill="white" 
            />
          </svg>
        </motion.div>
      </motion.div>
      
      {/* Updated FUELFRIENDLY text with correct styling */}
      <motion.div 
        className="text-white text-4xl font-bold tracking-wider"
        style={{ fontStyle: 'italic', fontWeight: 'bold', letterSpacing: '0.05em' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        FUELFRIENDLY
      </motion.div>
    </motion.div>
  );
};

// Hexagon Grid components to match the reference image exactly
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
