
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
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          delay: 0.3, 
          duration: 0.8, 
          type: "spring", 
          stiffness: 100,
          bounce: 0.5 
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            delay: 0.7, 
            duration: 0.6, 
            ease: "easeOut",
            type: "spring",
            stiffness: 200 
          }}
        >
          {/* Logo image with spinning animation */}
          <motion.img 
            src="/lovable-uploads/19fdfff8-09d0-4398-bcb2-6f4830ab5e38.png" 
            alt="FuelFriendly Logo" 
            className="w-16 h-16"
            animate={{ 
              rotateY: [0, 360],
            }}
            transition={{ 
              repeat: 1,
              repeatType: "reverse",
              duration: 1.2,
              delay: 0.9,
              ease: "easeInOut" 
            }}
          />
        </motion.div>
      </motion.div>
      
      {/* FUELFRIENDLY text - reduced even further to 1/8 original size */}
      <motion.div 
        className="text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          delay: 1, 
          duration: 0.5,
          type: "spring",
          stiffness: 100
        }}
      >
        <img 
          src="/lovable-uploads/2b80eff8-6efd-4f15-9213-ed9fe4e0cba9.png" 
          alt="FUELFRIENDLY" 
          className="h-0.42" // Reduced from h-0.84375 to h-0.42 (half of previous size)
        />
      </motion.div>
    </motion.div>
  );
};

// Updated Hexagon Grid components with better animations
const TopHexagonGrid = () => {
  return (
    <motion.div
      className="absolute top-0 left-0 w-full h-2/5"
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <motion.img 
        src="/lovable-uploads/b9b9af0d-f75b-4949-89ca-178f3f449be9.png" 
        alt="Hexagon Pattern" 
        className="w-full h-full object-cover opacity-30"
        animate={{ 
          scale: [1, 1.05, 1],
          rotate: [0, 1, 0]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
    </motion.div>
  );
};

const BottomHexagonGrid = () => {
  return (
    <motion.div
      className="absolute bottom-0 left-0 w-full h-2/5"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <motion.img 
        src="/lovable-uploads/0c368b73-df56-4e77-94c3-14691cdc22b7.png" 
        alt="Hexagon Pattern" 
        className="w-full h-full object-cover opacity-30"
        animate={{ 
          scale: [1, 1.05, 1],
          rotate: [0, -1, 0]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse"
        }}
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
    }, 2500); // 2500ms to go to home screen
    
    return () => {
      clearTimeout(timer);
    };
  }, [onFinish]);
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-green-500 overflow-hidden">
      {/* Enhanced background pulse animation */}
      <motion.div
        className="absolute inset-0 bg-green-600"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: animate ? [0, 0.3, 0] : 0 
        }}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity, 
          repeatType: "loop",
          times: [0, 0.5, 1]
        }}
      />
      
      {/* Animated particles in background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/20"
            style={{
              width: Math.random() * 10 + 5,
              height: Math.random() * 10 + 5,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100],
              x: [0, Math.random() * 40 - 20],
              opacity: [0, 0.7, 0]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>
      
      {/* Subtle background hexagons that float */}
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
        <div className="w-full h-full absolute opacity-10">
          <div className="w-full h-full absolute" 
               style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0) 70%)' }} />
        </div>
      </motion.div>
      
      {/* Top hexagon pattern with improved animations */}
      <TopHexagonGrid />
      
      {/* Bottom hexagon pattern with improved animations */}
      <BottomHexagonGrid />
      
      {/* Centered logo with updated styling and animations */}
      <motion.div 
        className="z-10 flex items-center justify-center"
        initial={{ scale: 0.9 }}
        animate={{ 
          scale: [0.9, 1.1, 1],
          y: [10, -10, 0]
        }}
        transition={{ 
          duration: 1.2,
          times: [0, 0.6, 1]
        }}
      >
        <Logo />
      </motion.div>
    </div>
  );
};

export default SplashScreen;
