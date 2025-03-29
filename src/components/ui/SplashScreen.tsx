
import * as React from 'react';
import { motion } from 'framer-motion';

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [showLogo, setShowLogo] = React.useState(false);
  
  React.useEffect(() => {
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
        >
          <img 
            src="/lovable-uploads/c123a960-63f7-48ab-b0a0-6f29584106f7.png" 
            alt="FUELFRIENDLY" 
            className="h-8 object-contain"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SplashScreen;
