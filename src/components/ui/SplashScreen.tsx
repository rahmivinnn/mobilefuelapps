
import * as React from 'react';
import { motion } from 'framer-motion';

interface SplashScreenProps {
  onFinish: () => void;
}

// Enhanced Logo component with better animations
const Logo = () => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Circle with logo */}
      <motion.div 
        className="w-24 h-24 rounded-full border-2 border-white flex items-center justify-center"
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.3, duration: 0.6, type: "spring", stiffness: 100 }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.5, ease: "easeOut" }}
        >
          {/* Logo image */}
          <img 
            src="/lovable-uploads/19fdfff8-09d0-4398-bcb2-6f4830ab5e38.png" 
            alt="FuelFriendly Logo" 
            className="w-16 h-16"
          />
        </motion.div>
      </motion.div>
      
      {/* Much smaller FUELFRIENDLY text */}
      <motion.div 
        className="text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5, type: "spring" }}
      >
        <img 
          src="/lovable-uploads/2b80eff8-6efd-4f15-9213-ed9fe4e0cba9.png" 
          alt="FUELFRIENDLY" 
          className="h-1.5" /* Further reduced height */
        />
      </motion.div>
    </motion.div>
  );
};

// Updated Hexagon Grid components with half size
const TopHexagonGrid = () => {
  return (
    <motion.div
      className="absolute top-0 left-0 w-full h-1/5" /* Reduced from h-2/5 to h-1/5 */
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <img 
        src="/lovable-uploads/b9b9af0d-f75b-4949-89ca-178f3f449be9.png" 
        alt="Hexagon Pattern" 
        className="w-full h-full object-cover opacity-60" /* Less transparent (changed from 0.3 to 0.6) */
      />
    </motion.div>
  );
};

const BottomHexagonGrid = () => {
  return (
    <motion.div
      className="absolute bottom-0 left-0 w-full h-1/5" /* Reduced from h-2/5 to h-1/5 */
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <img 
        src="/lovable-uploads/0c368b73-df56-4e77-94c3-14691cdc22b7.png" 
        alt="Hexagon Pattern" 
        className="w-full h-full object-cover opacity-60" /* Less transparent (changed from 0.3 to 0.6) */
      />
    </motion.div>
  );
};

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  // Enhanced animated background effect
  const [animate, setAnimate] = React.useState(false);
  
  React.useEffect(() => {
    // Start animation immediately
    setAnimate(true);
    
    // Handle splash screen timing
    const timer = setTimeout(() => {
      onFinish();
    }, 3000); // Reduced from 4s to 3s for faster transition
    
    return () => {
      clearTimeout(timer);
    };
  }, [onFinish]);
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-green-500 overflow-hidden z-50">
      {/* Enhanced background pulse animation */}
      <motion.div
        className="absolute inset-0 bg-green-600"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: animate ? [0, 0.2, 0] : 0 
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          repeatType: "loop",
          times: [0, 0.5, 1]
        }}
      />
      
      {/* Animated hexagon background */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ 
          scale: animate ? [1, 1.05, 1] : 1,
          rotate: animate ? [0, 2, 0] : 0
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          repeatType: "reverse"
        }}
      >
        <div className="w-full h-full absolute opacity-20">
          <div className="w-full h-full absolute" 
               style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0) 70%)' }} />
        </div>
      </motion.div>
      
      {/* Hexagon patterns with improved transitions */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0"
      >
        <TopHexagonGrid />
        <BottomHexagonGrid />
      </motion.div>
      
      {/* Centered logo with updated styling and animations */}
      <motion.div 
        className="z-10 flex items-center justify-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <Logo />
      </motion.div>
    </div>
  );
};

export default SplashScreen;
