
import * as React from 'react';
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  React.useEffect(() => {
    // Handle splash screen timing - 5 seconds (increased from 3)
    const timer = setTimeout(() => {
      onFinish();
    }, 5000);
    
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
      
      {/* Centered animations with elements moving from top and bottom */}
      <div className="z-10 flex flex-col items-center justify-center">
        {/* Container for both circle and flame to coordinate animations */}
        <div className="relative mb-6">
          {/* Circle coming from the top */}
          <motion.div 
            className="w-24 h-24 rounded-full border-2 border-white flex items-center justify-center"
            initial={{ y: -300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 120, damping: 20 }}
          >
            <img 
              src="/lovable-uploads/44c35d38-14ee-46b9-8302-0944a264f34e.png" 
              alt="FuelFriendly Logo" 
              className="w-16 h-16"
            />
            
            {/* Flame placed inside the circle */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ y: 300, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 120, damping: 20 }}
            >
              <Flame className="h-12 w-12 text-white" />
            </motion.div>
          </motion.div>
        </div>
        
        {/* FUELFRIENDLY text that appears after animation */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <img 
            src="/lovable-uploads/2b80eff8-6efd-4f15-9213-ed9fe4e0cba9.png" 
            alt="FUELFRIENDLY" 
            className="h-6"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default SplashScreen;
