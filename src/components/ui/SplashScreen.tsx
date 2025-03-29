
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
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.3, duration: 0.6, type: "spring", stiffness: 100 }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.5, ease: "easeOut" }}
        >
          {/* Logo image - kept exactly the same */}
          <img 
            src="/lovable-uploads/19fdfff8-09d0-4398-bcb2-6f4830ab5e38.png" 
            alt="FuelFriendly Logo" 
            className="w-16 h-16"
          />
        </motion.div>
      </motion.div>
      
      {/* FUELFRIENDLY text - kept exactly the same */}
      <motion.div 
        className="text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5, type: "spring" }}
      >
        <img 
          src="/lovable-uploads/2b80eff8-6efd-4f15-9213-ed9fe4e0cba9.png" 
          alt="FUELFRIENDLY" 
          className="h-0.25"
        />
      </motion.div>
    </motion.div>
  );
};

// Updated Hexagon Grid components with more interactive animations
const TopHexagonGrid = () => {
  return (
    <motion.div
      className="absolute top-0 left-0 w-full h-2/5"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: 0.2 }}
    >
      <motion.div
        className="w-full h-full relative overflow-hidden"
        animate={{
          rotate: [0, 3, -3, 0],
          scale: [1, 1.05, 0.98, 1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <motion.img 
          src="/lovable-uploads/b9b9af0d-f75b-4949-89ca-178f3f449be9.png" 
          alt="Hexagon Pattern" 
          className="w-full h-full object-cover opacity-30"
          animate={{
            x: [0, 15, -15, 0],
            y: [0, -10, 5, 0]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </motion.div>
    </motion.div>
  );
};

const BottomHexagonGrid = () => {
  return (
    <motion.div
      className="absolute bottom-0 left-0 w-full h-2/5"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: 0.2 }}
    >
      <motion.div
        className="w-full h-full relative overflow-hidden"
        animate={{
          rotate: [0, -3, 3, 0],
          scale: [1, 0.98, 1.05, 1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse", 
          delay: 0.5
        }}
      >
        <motion.img 
          src="/lovable-uploads/0c368b73-df56-4e77-94c3-14691cdc22b7.png" 
          alt="Hexagon Pattern" 
          className="w-full h-full object-cover opacity-30"
          animate={{
            x: [0, -15, 15, 0],
            y: [0, 10, -5, 0]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 0.5
          }}
        />
      </motion.div>
    </motion.div>
  );
};

// Floating hexagons that appear randomly
const FloatingHexagons = () => {
  const hexagons = Array.from({ length: 6 }).map((_, i) => ({
    id: i,
    size: Math.random() * 20 + 10,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2,
    duration: Math.random() * 5 + 5
  }));

  return (
    <>
      {hexagons.map((hex) => (
        <motion.div
          key={hex.id}
          className="absolute w-8 h-8 opacity-10"
          style={{
            left: `${hex.x}%`,
            top: `${hex.y}%`,
          }}
          initial={{ scale: 0, rotate: 0, opacity: 0 }}
          animate={{ 
            scale: [0, 1, 1.2, 0], 
            rotate: [0, 180, 360], 
            opacity: [0, 0.2, 0.3, 0] 
          }}
          transition={{
            duration: hex.duration,
            delay: hex.delay,
            repeat: Infinity,
            repeatDelay: hex.duration / 2,
          }}
        >
          <svg viewBox="0 0 100 100">
            <polygon 
              points="50 0, 93.3 25, 93.3 75, 50 100, 6.7 75, 6.7 25" 
              fill="white"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="1"
            />
          </svg>
        </motion.div>
      ))}
    </>
  );
};

// Energy particles that flow upward
const EnergyParticles = () => {
  const particles = Array.from({ length: 10 }).map((_, i) => ({
    id: i,
    size: Math.random() * 6 + 2,
    x: Math.random() * 100,
    delay: Math.random() * 3,
    duration: Math.random() * 4 + 4
  }));

  return (
    <>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute bottom-0 rounded-full bg-green-400"
          style={{
            left: `${particle.x}%`,
            width: particle.size,
            height: particle.size,
          }}
          initial={{ y: 0, opacity: 0 }}
          animate={{ 
            y: [0, -300, -600], 
            opacity: [0, 0.7, 0],
            x: [0, Math.random() * 30 - 15, Math.random() * 40 - 20]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            repeatDelay: 1,
          }}
        />
      ))}
    </>
  );
};

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  // Enhanced animated background effect
  const [animate, setAnimate] = React.useState(false);
  
  React.useEffect(() => {
    // Start animation immediately
    setAnimate(true);
    
    // Handle splash screen timing - increased to 5000ms (5 seconds)
    const timer = setTimeout(() => {
      onFinish();
    }, 5000);
    
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
          opacity: animate ? [0, 0.2, 0] : 0 
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity, 
          repeatType: "loop",
          times: [0, 0.5, 1]
        }}
      />
      
      {/* Radial gradient for depth */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, rgba(16,185,129,0.6) 0%, rgba(0,0,0,0) 70%)'
        }}
        animate={{
          scale: animate ? [1, 1.1, 1] : 1
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
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
      
      {/* Add floating hexagons for more visual interest */}
      <FloatingHexagons />
      
      {/* Add energy particles flowing upward */}
      <EnergyParticles />
      
      {/* Centered logo with updated styling and animations - kept the same */}
      <motion.div 
        className="z-10 flex items-center justify-center"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Logo />
      </motion.div>
    </div>
  );
};

export default SplashScreen;
