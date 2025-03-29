
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [showText, setShowText] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    // Sequence of animations
    const showLogoTimer = setTimeout(() => {
      setShowLogo(true);
    }, 300);
    
    const showTextTimer = setTimeout(() => {
      setShowText(true);
    }, 800);
    
    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            onFinish();
          }, 500);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
    
    return () => {
      clearTimeout(showLogoTimer);
      clearTimeout(showTextTimer);
      clearInterval(progressInterval);
    };
  }, [onFinish]);
  
  return (
    <div className="fixed inset-0 z-50 bg-green-950 flex flex-col items-center justify-center">
      <div className="max-w-sm w-full mx-auto p-6 relative">
        <AnimatePresence>
          {showLogo && (
            <motion.div 
              className="mb-8 flex justify-center"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, y: [0, -20, 0], rotate: [0, -5, 5, 0] }}
              transition={{ 
                duration: 0.8, 
                type: "spring",
                stiffness: 100,
                bounce: 0.5
              }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-green-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
                <img 
                  src="/lovable-uploads/8a188651-80ec-4a90-8d5c-de0df713b6c7.png" 
                  alt="Fuel Drop" 
                  className="h-24 w-24 object-contain z-10 relative"
                />
                
                <motion.div 
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-green-500 rounded-full"
                  animate={{
                    scaleX: [1, 1.5, 1],
                    opacity: [0.3, 0.8, 0.3]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <AnimatePresence>
          {showText && (
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.img
                src="/lovable-uploads/57aff490-f08a-4205-9ae9-496a32e810e6.png"
                alt="FUELFRIENDLY"
                className="h-0.5 mx-auto" // Further reduced to h-0.5 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  y: [0, -5, 0],
                }}
                transition={{ 
                  duration: 0.8,
                  y: {
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              />
              
              <motion.p 
                className="text-green-400 text-sm mt-2 opacity-80"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.8, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                Fuel delivery made simple
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="mt-12 relative">
          <div className="h-1 bg-green-900 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-green-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.2 }}
            />
          </div>
          
          <motion.div 
            className="absolute -top-6 left-0 text-xs text-green-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: progress > 0 ? 1 : 0 }}
            style={{ left: `${progress}%`, transform: 'translateX(-50%)' }}
          >
            {progress}%
          </motion.div>
          
          <motion.div 
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: progress > 70 ? 1 : 0,
              y: [5, 0, 5]
            }}
            transition={{ 
              opacity: { duration: 0.3 },
              y: { 
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            <p className="text-green-500 text-xs">Loading resources...</p>
          </motion.div>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-green-500/20"
              style={{
                width: Math.random() * 20 + 5,
                height: Math.random() * 20 + 5,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 50 - 25, 0],
                opacity: [0, 0.7, 0]
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                repeatType: "loop",
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
