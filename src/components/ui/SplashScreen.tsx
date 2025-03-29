
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
  
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setShowLogo(true);
    }, 500);
    
    const timer2 = setTimeout(() => {
      onFinish();
    }, 3000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onFinish]);
  
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-green-500">
      {/* Hexagons at the top */}
      <div className="absolute top-0 right-0 opacity-50">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 0.3, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex flex-wrap max-w-[200px]"
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div 
              key={i}
              initial={{ rotate: 0, scale: 0.8 }}
              animate={{ rotate: i % 2 === 0 ? 10 : -10, scale: 1 }}
              transition={{ duration: 1.5, delay: 0.1 * i, repeat: Infinity, repeatType: "reverse" }}
              className="m-1"
            >
              <Hexagon 
                size={40} 
                className={`${theme === 'dark' ? 'text-black/20' : 'text-white/40'}`} 
                fill={theme === 'dark' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.2)'}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Hexagons at the bottom */}
      <div className="absolute bottom-0 left-0 opacity-50">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.3, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex flex-wrap max-w-[200px]"
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div 
              key={i}
              initial={{ rotate: 0, scale: 0.8 }}
              animate={{ rotate: i % 2 === 0 ? -10 : 10, scale: 1 }}
              transition={{ duration: 1.5, delay: 0.1 * i, repeat: Infinity, repeatType: "reverse" }}
              className="m-1"
            >
              <Hexagon 
                size={40} 
                className={`${theme === 'dark' ? 'text-black/20' : 'text-white/40'}`} 
                fill={theme === 'dark' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.2)'}
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
            src="/lovable-uploads/c3b29f6b-a689-4ac3-a338-4194cbee5e0c.png" 
            alt="FuelFriendly Logo" 
            className={`w-full h-full ${theme === 'dark' ? '' : 'filter brightness-0 invert'}`}
          />
        </motion.div>
        
        <motion.div
          className="text-4xl font-bold tracking-wider"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h1 className={`font-bold text-center ${theme === 'dark' ? 'text-black' : 'text-white'}`}>
            FUELFRIENDLY
          </h1>
        </motion.div>
      </motion.div>

      {/* Status bar */}
      <div className="absolute top-0 left-0 right-0 bg-black h-8 flex items-center justify-between px-4 text-white text-xs">
        <div>8:45</div>
        <div className="flex items-center space-x-1">
          <span>●●●</span>
          <span>📶</span>
          <span>🔋</span>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
