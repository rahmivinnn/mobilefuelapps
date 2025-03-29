
import * as React from 'react';
import { motion } from 'framer-motion';

interface SplashScreenProps {
  onFinish: () => void;
}

// Hexagon component for creating the hexagonal pattern
const Hexagon = ({ 
  size, 
  x, 
  y,
  opacity = 0.2,
  delay = 0
}) => {
  return (
    <motion.div
      style={{
        position: 'absolute',
        top: `${y}%`,
        left: `${x}%`,
        width: `${size}px`,
        height: `${size * 0.866}px`, // Hexagon height ratio
        background: `rgba(255, 255, 255, ${opacity})`,
        clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
        zIndex: 1,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: opacity, scale: 1 }}
      transition={{ 
        duration: 1.2,
        delay: delay,
        ease: "easeOut"
      }}
    />
  );
};

// Logo component
const Logo = () => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
    >
      {/* Circle with new flame icon */}
      <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
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
            {/* Updated Fuel logo SVG */}
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M30 1.25V5H25V7.5H30V13.75C30 15.125 31.125 16.25 32.5 16.25C33.875 16.25 35 15.125 35 13.75V5C35 2.925 33.325 1.25 31.25 1.25H30ZM10 11.25C7.925 11.25 6.25 12.925 6.25 15V36.25C6.25 38.325 7.925 40 10 40H25C27.075 40 28.75 38.325 28.75 36.25V15C28.75 12.925 27.075 11.25 25 11.25H23.75V5C23.75 2.925 22.075 1.25 20 1.25H15C12.925 1.25 11.25 2.925 11.25 5V11.25H10ZM15 5H20V11.25H15V5ZM17.5 18.75H21.25C22.625 18.75 23.75 19.875 23.75 21.25V28.75C23.75 30.125 22.625 31.25 21.25 31.25H17.5V18.75Z" 
                fill="white" 
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
      
      {/* FUELFRIENDLY text with italic and bold styling */}
      <motion.div 
        className="text-white text-3xl font-bold tracking-wider italic"
        style={{ fontStyle: 'italic', fontWeight: 'bold' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        FUELFRIENDLY
      </motion.div>
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

  // Define hexagon patterns for top and bottom with portrait animation
  const topHexagons = React.useMemo(() => {
    return [
      // Top hexagon pattern
      { id: 1, size: 80, x: 70, y: 5, opacity: 0.15, delay: 0.2 },
      { id: 2, size: 80, x: 60, y: 8, opacity: 0.15, delay: 0.3 },
      { id: 3, size: 80, x: 50, y: 5, opacity: 0.15, delay: 0.4 },
      { id: 4, size: 80, x: 40, y: 8, opacity: 0.15, delay: 0.5 },
      { id: 5, size: 80, x: 30, y: 5, opacity: 0.15, delay: 0.6 },
      { id: 6, size: 80, x: 20, y: 8, opacity: 0.15, delay: 0.7 },
      { id: 7, size: 80, x: 10, y: 5, opacity: 0.15, delay: 0.8 },
      
      { id: 8, size: 80, x: 65, y: 12, opacity: 0.15, delay: 0.3 },
      { id: 9, size: 80, x: 55, y: 15, opacity: 0.15, delay: 0.4 },
      { id: 10, size: 80, x: 45, y: 12, opacity: 0.15, delay: 0.5 },
      { id: 11, size: 80, x: 35, y: 15, opacity: 0.15, delay: 0.6 },
      { id: 12, size: 80, x: 25, y: 12, opacity: 0.15, delay: 0.7 },
      { id: 13, size: 80, x: 15, y: 15, opacity: 0.15, delay: 0.8 },
      
      { id: 14, size: 80, x: 60, y: 19, opacity: 0.15, delay: 0.4 },
      { id: 15, size: 80, x: 50, y: 22, opacity: 0.15, delay: 0.5 },
      { id: 16, size: 80, x: 40, y: 19, opacity: 0.15, delay: 0.6 },
      { id: 17, size: 80, x: 30, y: 22, opacity: 0.15, delay: 0.7 },
      { id: 18, size: 80, x: 20, y: 19, opacity: 0.15, delay: 0.8 },
    ];
  }, []);
  
  const bottomHexagons = React.useMemo(() => {
    return [
      // Bottom hexagon pattern
      { id: 1, size: 80, x: 10, y: 75, opacity: 0.15, delay: 0.2 },
      { id: 2, size: 80, x: 20, y: 78, opacity: 0.15, delay: 0.3 },
      { id: 3, size: 80, x: 30, y: 75, opacity: 0.15, delay: 0.4 },
      { id: 4, size: 80, x: 40, y: 78, opacity: 0.15, delay: 0.5 },
      { id: 5, size: 80, x: 50, y: 75, opacity: 0.15, delay: 0.6 },
      { id: 6, size: 80, x: 60, y: 78, opacity: 0.15, delay: 0.7 },
      { id: 7, size: 80, x: 70, y: 75, opacity: 0.15, delay: 0.8 },
      
      { id: 8, size: 80, x: 15, y: 82, opacity: 0.15, delay: 0.3 },
      { id: 9, size: 80, x: 25, y: 85, opacity: 0.15, delay: 0.4 },
      { id: 10, size: 80, x: 35, y: 82, opacity: 0.15, delay: 0.5 },
      { id: 11, size: 80, x: 45, y: 85, opacity: 0.15, delay: 0.6 },
      { id: 12, size: 80, x: 55, y: 82, opacity: 0.15, delay: 0.7 },
      { id: 13, size: 80, x: 65, y: 85, opacity: 0.15, delay: 0.8 },
      
      { id: 14, size: 80, x: 20, y: 89, opacity: 0.15, delay: 0.4 },
      { id: 15, size: 80, x: 30, y: 92, opacity: 0.15, delay: 0.5 },
      { id: 16, size: 80, x: 40, y: 89, opacity: 0.15, delay: 0.6 },
      { id: 17, size: 80, x: 50, y: 92, opacity: 0.15, delay: 0.7 },
      { id: 18, size: 80, x: 60, y: 89, opacity: 0.15, delay: 0.8 },
    ];
  }, []);
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-green-500 overflow-hidden">
      {/* Add simple portrait animation to the hexagons */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Top hexagon pattern */}
        {topHexagons.map((hex) => (
          <Hexagon
            key={`top-${hex.id}`}
            size={hex.size}
            x={hex.x}
            y={hex.y}
            opacity={hex.opacity}
            delay={hex.delay}
          />
        ))}
        
        {/* Bottom hexagon pattern */}
        {bottomHexagons.map((hex) => (
          <Hexagon
            key={`bottom-${hex.id}`}
            size={hex.size}
            x={hex.x}
            y={hex.y}
            opacity={hex.opacity}
            delay={hex.delay}
          />
        ))}
      </motion.div>
      
      {/* Centered logo with updated styling */}
      <div className="z-10 flex items-center justify-center">
        <Logo />
      </div>
    </div>
  );
};

export default SplashScreen;
