
import * as React from 'react';
import { motion } from 'framer-motion';

interface SplashScreenProps {
  onFinish: () => void;
}

// Hexagon component
const Hexagon = ({ 
  size, 
  x, 
  y, 
  delay, 
  color = "rgba(0, 230, 118, 0.1)",
  hoverColor = "rgba(0, 230, 118, 0.4)",
  duration = 3
}) => {
  return (
    <motion.div
      style={{
        position: 'absolute',
        top: `${y}%`,
        left: `${x}%`,
        width: `${size}px`,
        height: `${size * 0.866}px`, // Hexagon height ratio
        zIndex: 1,
        background: color,
        clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
      }}
      initial={{ opacity: 0, scale: 0.2, rotate: -20 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        rotate: 0,
        y: [0, -5, 0, 5, 0]
      }}
      whileHover={{ 
        scale: 1.2, 
        background: hoverColor,
        rotate: 10, 
        zIndex: 5,
        transition: { duration: 0.3 }
      }}
      transition={{ 
        delay: delay, 
        duration: duration,
        y: {
          repeat: Infinity,
          duration: Math.random() * 3 + 3,
          ease: "easeInOut"
        }
      }}
    />
  );
};

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [showLogo, setShowLogo] = React.useState(false);
  
  React.useEffect(() => {
    const timer1 = setTimeout(() => {
      setShowLogo(true);
    }, 500);
    
    const timer2 = setTimeout(() => {
      onFinish();
    }, 4500); // Extended slightly for animation to be noticed
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onFinish]);

  // Generate random hexagons
  const hexagons = React.useMemo(() => {
    const result = [];
    // Generate large background hexagons
    for (let i = 0; i < 20; i++) {
      const size = Math.random() * 60 + 40;
      result.push({
        id: `hex-bg-${i}`,
        size,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 0.5,
        color: "rgba(0, 230, 118, 0.07)",
        hoverColor: "rgba(0, 230, 118, 0.2)",
        duration: Math.random() * 2 + 2
      });
    }
    
    // Generate smaller interactive hexagons
    for (let i = 0; i < 15; i++) {
      const size = Math.random() * 40 + 20;
      result.push({
        id: `hex-fg-${i}`,
        size,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 0.8 + 0.2,
        color: "rgba(0, 230, 118, 0.15)",
        hoverColor: "rgba(0, 230, 118, 0.5)",
        duration: Math.random() * 1 + 1.5
      });
    }
    return result;
  }, []);
  
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-green-500 overflow-hidden">
      {/* Hexagon pattern background */}
      {hexagons.map((hex) => (
        <Hexagon
          key={hex.id}
          size={hex.size}
          x={hex.x}
          y={hex.y}
          delay={hex.delay}
          color={hex.color}
          hoverColor={hex.hoverColor}
          duration={hex.duration}
        />
      ))}
      
      {/* Fuel icons */}
      <motion.div
        className="absolute z-10"
        style={{ top: '15%', left: '25%' }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.7, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <img 
          src="/lovable-uploads/8a188651-80ec-4a90-8d5c-de0df713b6c7.png" 
          alt="Fuel Icon" 
          className="w-12 h-12 opacity-80"
        />
      </motion.div>
      
      <motion.div
        className="absolute z-10"
        style={{ top: '65%', left: '70%' }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.8, scale: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <img 
          src="/lovable-uploads/5143c2f2-409d-4968-8813-f389803502f0.png" 
          alt="Fuel Icon" 
          className="w-14 h-14 opacity-80"
        />
      </motion.div>
      
      <motion.div
        className="absolute z-10"
        style={{ top: '40%', left: '75%' }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.7, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <img 
          src="/lovable-uploads/6abeb06f-cf36-464b-8ffd-aaa9ece48e3f.png" 
          alt="Fuel Icon" 
          className="w-12 h-12 opacity-70"
        />
      </motion.div>
      
      <motion.div
        className="absolute z-10"
        style={{ top: '70%', left: '15%' }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <img 
          src="/lovable-uploads/aafa9060-dd0c-4f89-9725-afe221ab74ba.png" 
          alt="Fuel Icon" 
          className="w-10 h-10 opacity-80"
        />
      </motion.div>
      
      {/* Logo and Text */}
      <motion.div 
        className="flex flex-col items-center justify-center z-20 relative"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: showLogo ? 0 : -50, opacity: showLogo ? 1 : 0 }}
        transition={{ type: "spring", damping: 12, stiffness: 100 }}
      >
        <motion.div 
          className="relative w-32 h-32 mb-6"
          animate={{ 
            scale: [1, 1.05, 1],
            rotate: [0, 2, 0, -2, 0]
          }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
        >
          <img 
            src="/lovable-uploads/ba008608-8960-40b9-8a96-e5b173a48e08.png" 
            alt="FuelFriendly Logo" 
            className="w-full h-full object-contain drop-shadow-lg"
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
            className="h-8 object-contain drop-shadow-md"
          />
        </motion.div>
      </motion.div>
      
      {/* Pulsating Circle */}
      <motion.div
        className="absolute z-5"
        style={{
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,230,118,0.3) 0%, rgba(0,230,118,0) 70%)",
        }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.7, 0.2, 0.7],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    </div>
  );
};

export default SplashScreen;
