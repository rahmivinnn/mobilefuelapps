
import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { Hexagon } from 'lucide-react';

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const { theme } = useTheme();
  const [showLogo, setShowLogo] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setShowLogo(true);
    }, 500);
    
    const timer2 = setTimeout(() => {
      onFinish();
    }, 3500);
    
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearInterval(timeInterval);
    };
  }, [onFinish]);
  
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-green-500">
      {/* Status bar */}
      <div className="absolute top-0 left-0 right-0 bg-transparent h-10 flex items-center justify-between px-4 text-white text-sm">
        <div>{currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
        <div className="flex items-center space-x-2">
          <span className="font-semibold">●●●</span>
          <span className="h-4 w-4 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 12H7M7 12C7 13.6569 8.34315 15 10 15H14C15.6569 15 17 13.6569 17 12M7 12C7 10.3431 8.34315 9 10 9H14C15.6569 9 17 10.3431 17 12M17 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <span className="h-4 w-5 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-5" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 10V8C21 6.89543 20.1046 6 19 6H5C3.89543 6 3 6.89543 3 8V16C3 17.1046 3.89543 18 5 18H19C20.1046 18 21 17.1046 21 16V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M7 10V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M11 10V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M15 10V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M19 10V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </span>
          <span className="font-bold">100</span>
        </div>
      </div>
      
      {/* Hexagons at the top */}
      <div className="absolute top-12 right-0 opacity-50">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 0.3, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex flex-wrap max-w-[300px]"
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div 
              key={i}
              initial={{ rotate: 0, scale: 0.8 }}
              animate={{ rotate: i % 2 === 0 ? 10 : -10, scale: 1 }}
              transition={{ duration: 1.5, delay: 0.1 * i, repeat: Infinity, repeatType: "reverse" }}
              className="m-1"
            >
              <Hexagon 
                size={40} 
                className="text-white/30"
                fill="rgba(255,255,255,0.1)"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Hexagons at the bottom */}
      <div className="absolute bottom-12 left-0 opacity-50">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.3, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex flex-wrap max-w-[300px]"
        >
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div 
              key={i}
              initial={{ rotate: 0, scale: 0.8 }}
              animate={{ rotate: i % 2 === 0 ? -10 : 10, scale: 1 }}
              transition={{ duration: 1.5, delay: 0.1 * i, repeat: Infinity, repeatType: "reverse" }}
              className="m-1"
            >
              <Hexagon 
                size={40} 
                className="text-white/30"
                fill="rgba(255,255,255,0.1)"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Logo and Text */}
      <motion.div 
        className="flex flex-col items-center justify-center z-10"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: showLogo ? 0 : -100, opacity: showLogo ? 1 : 0 }}
        transition={{ type: "spring", damping: 12, stiffness: 100 }}
      >
        <motion.div 
          className="relative w-24 h-24 mb-6"
          animate={{ 
            scale: [1, 1.05, 1],
            rotate: [0, 2, -2, 0]
          }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
        >
          <img 
            src="/lovable-uploads/f01d03f8-3174-4828-bdcd-196b636f0b6f.png" 
            alt="FuelFriendly Logo" 
            className="w-full h-full object-contain"
          />
        </motion.div>
        
        <motion.div
          className="text-4xl font-bold tracking-wider"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h1 className="font-bold text-center text-white tracking-wide" style={{ fontFamily: 'Arial, sans-serif', letterSpacing: '1px' }}>
            FUELFRIENDLY
          </h1>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SplashScreen;
