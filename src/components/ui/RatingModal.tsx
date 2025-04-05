
import React, { useState } from 'react';
import { Star, X } from 'lucide-react';
import { motion } from 'framer-motion';

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

  const handleSubmit = () => {
    onSubmit(driverRating, stationRating, feedback);
  };

  const RatingStars = ({ 
    rating, 
    setRating, 
    title 
  }: { 
    rating: number; 
    setRating: (rating: number) => void; 
    title: string;
  }) => {
    return (
      <div className="mb-6">
        <h3 className="font-medium text-lg mb-2">{title}</h3>
        <div className="flex items-center justify-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <button 
              key={star} 
              onClick={() => setRating(star)}
              className="focus:outline-none transition-transform duration-200 hover:scale-110 mx-1"
            >
              <Star 
                size={32} 
                className={`${
                  star <= rating 
                    ? 'fill-yellow-400 text-yellow-400' 
                    : 'text-gray-500'
                } transition-colors duration-200`}
              />
            </button>
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
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>
        
        <h2 className="text-xl font-bold text-center mb-6">Rate Your Experience</h2>
        
        <div className="flex justify-center space-x-2 mb-6">
          <button
            className={`py-2 px-4 rounded-full text-sm font-medium transition-colors ${
              activeRating === 'driver' 
                ? 'bg-green-500 text-black' 
                : 'bg-gray-800 text-gray-300'
            }`}
            onClick={() => setActiveRating('driver')}
          >
            Fuel Friend
          </button>
          <button
            className={`py-2 px-4 rounded-full text-sm font-medium transition-colors ${
              activeRating === 'station' 
                ? 'bg-green-500 text-black' 
                : 'bg-gray-800 text-gray-300'
            }`}
            onClick={() => setActiveRating('station')}
          >
            Gas Station
          </button>
        </div>
        
        <div className="transition-all duration-300">
          {activeRating === 'driver' ? (
            <RatingStars 
              rating={driverRating} 
              setRating={setDriverRating} 
              title={`Rate ${driverName}`} 
            />
          ) : (
            <RatingStars 
              rating={stationRating} 
              setRating={setStationRating} 
              title={`Rate ${stationName}`} 
            />
          )}
        </div>
        
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
        
        <button
          onClick={handleSubmit}
          className="w-full py-3 rounded-xl bg-green-500 text-black font-semibold hover:bg-green-600 active:scale-[0.98] transition-all duration-200"
        >
          Submit Rating
        </button>
      </motion.div>
    </motion.div>
  );
};

export default RatingModal;
