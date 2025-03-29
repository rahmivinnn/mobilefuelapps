
import * as React from 'react';
import { motion } from 'framer-motion';
import { Hexagon } from 'lucide-react';

interface SplashScreenProps {
  onFinish: () => void;
}

// Hexagon component for creating the hexagonal pattern
const HexagonPattern = ({ 
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
      {/* Circle with gas pump icon */}
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
            {/* Updated Fuel logo SVG that matches the provided image */}
            <svg width="40" height="40" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M60 2.5V15H43.75V22.5H60V32.5C60 35.25 62.25 37.5 65 37.5C67.75 37.5 70 35.25 70 32.5V15C70 8.1 64.4 2.5 57.5 2.5H45C41.55 2.5 38.75 5.3 38.75 8.75V22.5H30V8.75C30 5.3 27.2 2.5 23.75 2.5H20C13.1 2.5 7.5 8.1 7.5 15V72.5C7.5 79.4 13.1 85 20 85H60C66.9 85 72.5 79.4 72.5 72.5V45C72.5 42.25 70.25 40 67.5 40C64.75 40 62.5 42.25 62.5 45V72.5C62.5 75.95 59.7 78.75 56.25 78.75H23.75C20.3 78.75 17.5 75.95 17.5 72.5V15C17.5 11.55 20.3 8.75 23.75 8.75H45V15H30" 
                fill="white" 
                stroke="white"
                strokeWidth="1"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
      
      {/* FUELFRIENDLY text with italic and bold styling */}
      <motion.div 
        className="text-white text-3xl font-bold tracking-wider"
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
      { id: 1, size: 100, x: 80, y: 5, opacity: 0.15, delay: 0.2 },
      { id: 2, size: 100, x: 60, y: 8, opacity: 0.15, delay: 0.3 },
      { id: 3, size: 100, x: 40, y: 5, opacity: 0.15, delay: 0.4 },
      { id: 4, size: 100, x: 20, y: 8, opacity: 0.15, delay: 0.5 },
      { id: 5, size: 100, x: 0, y: 5, opacity: 0.15, delay: 0.6 },
      
      { id: 6, size: 100, x: 70, y: 12, opacity: 0.15, delay: 0.3 },
      { id: 7, size: 100, x: 50, y: 15, opacity: 0.15, delay: 0.4 },
      { id: 8, size: 100, x: 30, y: 12, opacity: 0.15, delay: 0.5 },
      { id: 9, size: 100, x: 10, y: 15, opacity: 0.15, delay: 0.6 },
      
      { id: 10, size: 100, x: 80, y: 19, opacity: 0.15, delay: 0.4 },
      { id: 11, size: 100, x: 60, y: 22, opacity: 0.15, delay: 0.5 },
      { id: 12, size: 100, x: 40, y: 19, opacity: 0.15, delay: 0.6 },
      { id: 13, size: 100, x: 20, y: 22, opacity: 0.15, delay: 0.7 },
      { id: 14, size: 100, x: 0, y: 19, opacity: 0.15, delay: 0.8 },
    ];
  }, []);
  
  const bottomHexagons = React.useMemo(() => {
    return [
      // Bottom hexagon pattern
      { id: 1, size: 100, x: 0, y: 70, opacity: 0.15, delay: 0.2 },
      { id: 2, size: 100, x: 20, y: 73, opacity: 0.15, delay: 0.3 },
      { id: 3, size: 100, x: 40, y: 70, opacity: 0.15, delay: 0.4 },
      { id: 4, size: 100, x: 60, y: 73, opacity: 0.15, delay: 0.5 },
      { id: 5, size: 100, x: 80, y: 70, opacity: 0.15, delay: 0.6 },
      
      { id: 6, size: 100, x: 10, y: 77, opacity: 0.15, delay: 0.3 },
      { id: 7, size: 100, x: 30, y: 80, opacity: 0.15, delay: 0.4 },
      { id: 8, size: 100, x: 50, y: 77, opacity: 0.15, delay: 0.5 },
      { id: 9, size: 100, x: 70, y: 80, opacity: 0.15, delay: 0.6 },
      
      { id: 10, size: 100, x: 0, y: 84, opacity: 0.15, delay: 0.4 },
      { id: 11, size: 100, x: 20, y: 87, opacity: 0.15, delay: 0.5 },
      { id: 12, size: 100, x: 40, y: 84, opacity: 0.15, delay: 0.6 },
      { id: 13, size: 100, x: 60, y: 87, opacity: 0.15, delay: 0.7 },
      { id: 14, size: 100, x: 80, y: 84, opacity: 0.15, delay: 0.8 },
    ];
  }, []);
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-green-500 overflow-hidden">
      {/* Add hexagonal patterns with portrait orientation animation */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Top hexagon pattern */}
        {topHexagons.map((hex) => (
          <HexagonPattern
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
          <HexagonPattern
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
