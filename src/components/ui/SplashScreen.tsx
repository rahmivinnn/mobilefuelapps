import * as React from 'react';
import { motion } from 'framer-motion';
import { Hexagon, Flame } from 'lucide-react';

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
    <div className="fixed inset-0 flex items-center justify-center bg-green-500 overflow-hidden">
      {/* Top hexagonal ornament */}
      <div className="absolute top-0 right-0 transform -translate-y-1/2 translate-x-1/2">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 0.15, y: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-wrap justify-center w-72 h-72"
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <Hexagon 
              key={`top-${i}`}
              size={48} 
              className="text-white m-1"
            />
          ))}
        </motion.div>
      </div>

      {/* Bottom hexagonal ornament */}
      <div className="absolute bottom-0 left-0 transform translate-y-1/2 -translate-x-1/2">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 0.15, y: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-wrap justify-center w-72 h-72"
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <Hexagon 
              key={`bottom-${i}`}
              size={48} 
              className="text-white m-1"
            />
          ))}
        </motion.div>
      </div>

      {/* Animated gradient overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-green-400/50 to-green-600/50"
        style={{
          maskImage: 'radial-gradient(circle at center, transparent 0%, black 100%)',
          WebkitMaskImage: 'radial-gradient(circle at center, transparent 0%, black 100%)',
        }}
      />

      {/* Content */}
      <div className="z-10 flex flex-col items-center justify-center">
        {/* Container for both circle and flame */}
        <div className="relative mb-6">
          {/* Animated circle */}
          <motion.div 
            className="w-24 h-24 rounded-full border-2 border-white flex items-center justify-center relative"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: 0.8,
              type: "spring",
              stiffness: 200,
              damping: 20
            }}
          />
          
          {/* Animated flame */}
          <motion.div
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: 0.5,
              delay: 0.3,
              type: "spring",
              stiffness: 200,
              damping: 20
            }}
          >
            <Flame className="h-12 w-12 text-white" />
          </motion.div>
        </div>
        
        {/* FUELFRIENDLY text */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
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
