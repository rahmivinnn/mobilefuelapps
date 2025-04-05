
import React, { useState, useEffect } from 'react';
import { Star, X, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from "@/hooks/use-toast";

interface RatingModalProps {
  driverName: string;
  stationName: string;
  onClose: () => void;
  onSubmit: (driverRating: number, stationRating: number, feedback: string) => void;
}

const RatingModal: React.FC<RatingModalProps> = ({ 
  driverName, 
  stationName, 
  onClose, 
  onSubmit 
}) => {
  const [driverRating, setDriverRating] = useState(5);
  const [stationRating, setStationRating] = useState(5);
  const [feedback, setFeedback] = useState('');
  const [activeRating, setActiveRating] = useState<'driver' | 'station'>('driver');
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    // Animate between driver and station rating
    const timer = setTimeout(() => {
      if (activeRating === 'driver' && !submitted) {
        toast({
          title: "Don't forget!",
          description: "Please also rate the gas station experience",
          duration: 3000,
        });
      }
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [activeRating, submitted, toast]);

  const handleSubmit = () => {
    setSubmitted(true);
    
    // Show confirmation animation before closing
    setTimeout(() => {
      onSubmit(driverRating, stationRating, feedback);
    }, 1500);
  };

  const RatingStars = ({ 
    rating, 
    setRating, 
    title,
    image
  }: { 
    rating: number; 
    setRating: (rating: number) => void; 
    title: string;
    image?: string;
  }) => {
    return (
      <div className="mb-6">
        <h3 className="font-medium text-lg mb-2">{title}</h3>
        
        {image && (
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-green-500">
              <img src={image} alt={title} className="w-full h-full object-cover" />
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <motion.button 
              key={star} 
              onClick={() => setRating(star)}
              className="focus:outline-none transition-transform duration-200 hover:scale-110 mx-1"
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
            >
              <Star 
                size={32} 
                className={`${
                  star <= rating 
                    ? 'fill-yellow-400 text-yellow-400' 
                    : 'text-gray-500'
                } transition-colors duration-200`}
              />
            </motion.button>
          ))}
        </div>
        <p className="text-center mt-2 text-sm">
          {rating === 1 && 'Poor'}
          {rating === 2 && 'Fair'}
          {rating === 3 && 'Good'}
          {rating === 4 && 'Great'}
          {rating === 5 && 'Excellent'}
        </p>
      </div>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gray-900 rounded-xl p-6 w-full max-w-md relative"
      >
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex flex-col items-center justify-center text-center py-10"
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-4"
              >
                <CheckCircle className="h-10 w-10 text-green-500" />
              </motion.div>
              <h2 className="text-xl font-bold mb-2">Thank You!</h2>
              <p className="text-gray-400">Your ratings help improve our service</p>
            </motion.div>
          ) : (
            <motion.div 
              key="form"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <button 
                onClick={onClose}
                className="absolute right-4 top-4 text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
              
              <h2 className="text-xl font-bold text-center mb-6">Rate Your Experience</h2>
              
              <div className="flex justify-center space-x-2 mb-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`py-2 px-4 rounded-full text-sm font-medium transition-colors ${
                    activeRating === 'driver' 
                      ? 'bg-green-500 text-black' 
                      : 'bg-gray-800 text-gray-300'
                  }`}
                  onClick={() => setActiveRating('driver')}
                >
                  Fuel Friend
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`py-2 px-4 rounded-full text-sm font-medium transition-colors ${
                    activeRating === 'station' 
                      ? 'bg-green-500 text-black' 
                      : 'bg-gray-800 text-gray-300'
                  }`}
                  onClick={() => setActiveRating('station')}
                >
                  Gas Station
                </motion.button>
              </div>
              
              <AnimatePresence mode="wait">
                {activeRating === 'driver' ? (
                  <motion.div
                    key="driver"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <RatingStars 
                      rating={driverRating} 
                      setRating={setDriverRating} 
                      title={`Rate ${driverName}`}
                      image="/lovable-uploads/a3df03b1-a154-407f-b8fe-e5dd6f0bade3.png"
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="station"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <RatingStars 
                      rating={stationRating} 
                      setRating={setStationRating} 
                      title={`Rate ${stationName}`} 
                      image="/lovable-uploads/57aff490-f08a-4205-9ae9-496a32e810e6.png" 
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              
              <div className="mb-6">
                <h3 className="font-medium text-lg mb-2">Additional Feedback</h3>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white"
                  placeholder="Share your experience..."
                  rows={3}
                />
              </div>
              
              <motion.button
                onClick={handleSubmit}
                className="w-full py-3 rounded-xl bg-green-500 text-black font-semibold hover:bg-green-600 active:scale-[0.98] transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Submit Rating
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default RatingModal;
