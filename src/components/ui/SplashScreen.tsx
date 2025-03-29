
import * as React from 'react';
import { motion } from 'framer-motion';

interface SplashScreenProps {
  onFinish: () => void;
}

// Interactive Hexagon component with hover effects
const Hexagon = ({ 
  size, 
  x, 
  y, 
  delay, 
  color = "rgba(0, 230, 118, 0.1)",
  hoverColor = "rgba(0, 230, 118, 0.4)",
  duration = 3,
  rotation = 0
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
        rotate: `${rotation}deg`,
      }}
      initial={{ opacity: 0, scale: 0.2, rotate: -20 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        rotate: rotation,
        y: [0, -5, 0, 5, 0]
      }}
      whileHover={{ 
        scale: 1.2, 
        background: hoverColor,
        rotate: rotation + 10, 
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

// Fuel icon component
const FuelIcon = ({ x, y, delay, size = 40, icon }) => {
  return (
    <motion.div
      style={{
        position: 'absolute',
        top: `${y}%`,
        left: `${x}%`,
        zIndex: 2,
      }}
      initial={{ opacity: 0, scale: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        y: 0,
        rotate: [0, -5, 0, 5, 0]
      }}
      whileHover={{ 
        scale: 1.3,
        rotate: 15,
        transition: { duration: 0.3 } 
      }}
      transition={{ 
        delay: delay + 0.5, 
        duration: 0.5,
        rotate: {
          repeat: Infinity,
          duration: 6,
          ease: "easeInOut"
        }
      }}
    >
      <div 
        className="bg-white/20 backdrop-blur-sm p-2 rounded-full"
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        <img 
          src={icon} 
          alt="Fuel icon" 
          className="w-full h-full object-contain"
        />
      </div>
    </motion.div>
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
    }, 4500);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onFinish]);

  // Generate hexagons for top and bottom patterns
  const topHexagons = React.useMemo(() => {
    const result = [];
    // Generate hexagons for top section
    for (let i = 0; i < 15; i++) {
      const size = Math.random() * 50 + 30;
      result.push({
        id: `hex-top-${i}`,
        size,
        x: Math.random() * 100,
        y: Math.random() * 40, // Only in top 40% of screen
        delay: Math.random() * 0.5,
        color: "rgba(0, 230, 118, 0.1)",
        hoverColor: "rgba(0, 230, 118, 0.4)",
        duration: Math.random() * 2 + 2,
        rotation: Math.random() * 60 - 30
      });
    }
    return result;
  }, []);
  
  const bottomHexagons = React.useMemo(() => {
    const result = [];
    // Generate hexagons for bottom section
    for (let i = 0; i < 15; i++) {
      const size = Math.random() * 50 + 30;
      result.push({
        id: `hex-bottom-${i}`,
        size,
        x: Math.random() * 100,
        y: 60 + Math.random() * 40, // Only in bottom 40% of screen
        delay: Math.random() * 0.5,
        color: "rgba(0, 230, 118, 0.1)",
        hoverColor: "rgba(0, 230, 118, 0.4)",
        duration: Math.random() * 2 + 2,
        rotation: Math.random() * 60 - 30
      });
    }
    return result;
  }, []);
  
  // Icons for the fuel app
  const fuelIcons = React.useMemo(() => {
    return [
      {
        id: 'icon-1',
        x: 20,
        y: 20,
        delay: 0.2,
        icon: '/lovable-uploads/4b652733-7a86-4ae9-9dd6-5de3955387cb.png'
      },
      {
        id: 'icon-2',
        x: 70,
        y: 15,
        delay: 0.4,
        icon: '/lovable-uploads/adc046bc-ee7b-4717-9b91-a691a4dff4d3.png'
      },
      {
        id: 'icon-3',
        x: 25,
        y: 75,
        delay: 0.6,
        icon: '/lovable-uploads/499bda01-017d-4d29-aa1b-81c15573b1b3.png'
      },
      {
        id: 'icon-4',
        x: 75,
        y: 80,
        delay: 0.8,
        icon: '/lovable-uploads/44255d9c-f0ec-4c0a-b4f4-bcb56907f835.png'
      },
      {
        id: 'icon-5',
        x: 50,
        y: 30,
        delay: 1,
        icon: '/lovable-uploads/eae60343-1690-40a7-b50c-306bad0bfeae.png'
      }
    ];
  }, []);
  
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-green-500 overflow-hidden">
      {/* Top hexagons */}
      {topHexagons.map((hex) => (
        <Hexagon
          key={hex.id}
          size={hex.size}
          x={hex.x}
          y={hex.y}
          delay={hex.delay}
          color={hex.color}
          hoverColor={hex.hoverColor}
          duration={hex.duration}
          rotation={hex.rotation}
        />
      ))}
      
      {/* Bottom hexagons */}
      {bottomHexagons.map((hex) => (
        <Hexagon
          key={hex.id}
          size={hex.size}
          x={hex.x}
          y={hex.y}
          delay={hex.delay}
          color={hex.color}
          hoverColor={hex.hoverColor}
          duration={hex.duration}
          rotation={hex.rotation}
        />
      ))}
      
      {/* Floating fuel icons */}
      {fuelIcons.map((icon) => (
        <FuelIcon
          key={icon.id}
          x={icon.x}
          y={icon.y}
          delay={icon.delay}
          icon={icon.icon}
        />
      ))}
      
      {/* Logo and Text */}
      <motion.div 
        className="flex flex-col items-center justify-center z-20 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: showLogo ? 1 : 0 }}
        transition={{ duration: 0.5 }}
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
