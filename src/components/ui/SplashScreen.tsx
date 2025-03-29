
import * as React from 'react';
import { motion } from 'framer-motion';

interface SplashScreenProps {
  onFinish: () => void;
}

// Logo component with smaller text
const Logo = () => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center gap-4"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
    >
      {/* Circle with logo */}
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
          {/* Logo image */}
          <img 
            src="/lovable-uploads/19fdfff8-09d0-4398-bcb2-6f4830ab5e38.png" 
            alt="FuelFriendly Logo" 
            className="w-16 h-16"
          />
        </motion.div>
      </motion.div>
      
      {/* Smaller FUELFRIENDLY text */}
      <motion.div 
        className="text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <img 
          src="/lovable-uploads/2b80eff8-6efd-4f15-9213-ed9fe4e0cba9.png" 
          alt="FUELFRIENDLY" 
          className="h-6" // Reduced from h-8 to h-6
        />
      </motion.div>
    </motion.div>
  );
};

// Updated Hexagon Grid components that extend to the edges
const TopHexagonGrid = () => {
  return (
    <motion.div
      className="absolute top-0 right-0 w-full h-2/5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.3 }}
    >
      <img 
        src="/lovable-uploads/1bc06a60-0463-4f47-abde-502bc408852e.png" 
        alt="Hexagon Pattern" 
        className="w-full h-full object-contain opacity-20"
      />
    </motion.div>
  );
};

const BottomHexagonGrid = () => {
  return (
    <motion.div
      className="absolute bottom-0 left-0 w-full h-2/5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.3 }}
    >
      <img 
        src="/lovable-uploads/8baf7fa9-2b5c-4335-b69b-eefef9610e3a.png" 
        alt="Hexagon Pattern" 
        className="w-full h-full object-contain opacity-20"
      />
    </motion.div>
  );
};

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  // Simple animated background effect
  const [animate, setAnimate] = React.useState(false);
  
  React.useEffect(() => {
    // Start animation immediately
    setAnimate(true);
    
    // Handle splash screen timing
    const timer = setTimeout(() => {
      onFinish();
    }, 4000);
    
    return () => {
      clearTimeout(timer);
    };
  }, [onFinish]);
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-green-500 overflow-hidden">
      {/* Subtle background pulse animation */}
      <motion.div
        className="absolute inset-0 bg-green-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: animate ? 0.3 : 0 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      />
      
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
