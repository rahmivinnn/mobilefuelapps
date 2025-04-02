
import React, { useState } from 'react';
import { Star, X, CheckCircle, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
  serviceImage?: string;
  serviceType: 'fuelFriend' | 'gasStation';
  onSubmitRating: (rating: number, comment: string) => void;
}

const RatingModal: React.FC<RatingModalProps> = ({
  isOpen,
  onClose,
  serviceName,
  serviceImage,
  serviceType,
  onSubmitRating
}) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleRatingClick = (value: number) => {
    setRating(value);
  };

  const handleMouseEnter = (value: number) => {
    setHoverRating(value);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleSubmit = () => {
    if (rating === 0) {
      toast({
        title: "Rating Required",
        description: "Please select a star rating before submitting",
        variant: "destructive"
      });
      return;
    }

    onSubmitRating(rating, comment);
    setSubmitted(true);
    
    toast({
      title: "Rating Submitted",
      description: `Thank you for rating the ${serviceType === 'fuelFriend' ? 'Fuel Friend' : 'Gas Station'}!`,
      className: "bg-green-500 border-green-600 text-white"
    });
    
    // Reset form after 1.5 seconds then close
    setTimeout(() => {
      setRating(0);
      setComment('');
      setSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div 
            className="w-[90%] max-w-md p-6 bg-black border border-gray-800 rounded-xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">
                Rate {serviceType === 'fuelFriend' ? 'Fuel Friend' : 'Gas Station'}
              </h2>
              <button 
                onClick={onClose}
                className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:bg-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {submitted ? (
              <div className="flex flex-col items-center py-8">
                <div className="h-20 w-20 rounded-full bg-green-500 flex items-center justify-center mb-4">
                  <CheckCircle className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Thank You!</h3>
                <p className="text-gray-400 text-center">
                  Your feedback helps improve our service!
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-center mb-6">
                  {serviceImage ? (
                    <div className="h-20 w-20 rounded-full overflow-hidden mb-3">
                      <img src={serviceImage} alt={serviceName} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="h-20 w-20 rounded-full bg-green-500 flex items-center justify-center text-black text-2xl font-bold mb-3">
                      {serviceName.charAt(0)}
                    </div>
                  )}
                </div>
                
                <p className="text-center text-white mb-2">{serviceName}</p>
                <p className="text-center text-gray-400 mb-6">
                  {serviceType === 'fuelFriend' 
                    ? 'How was your experience with this Fuel Friend?' 
                    : 'How was your experience at this gas station?'}
                </p>
                
                <div className="flex justify-center space-x-2 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      className="h-12 w-12 flex items-center justify-center transition-transform"
                      onClick={() => handleRatingClick(star)}
                      onMouseEnter={() => handleMouseEnter(star)}
                      onMouseLeave={handleMouseLeave}
                      style={{
                        transform: (rating === star || hoverRating === star) ? 'scale(1.2)' : 'scale(1)'
                      }}
                    >
                      <Star
                        className={`h-8 w-8 ${
                          (rating >= star || hoverRating >= star) 
                            ? 'text-yellow-400 fill-yellow-400' 
                            : 'text-gray-500'
                        } transition-colors`}
                      />
                    </button>
                  ))}
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center mb-2">
                    <MessageSquare className="h-4 w-4 text-green-500 mr-2" />
                    <label className="text-sm text-gray-300">Add a comment (optional)</label>
                  </div>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-3 h-24 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                    placeholder="Share your experience..."
                  />
                </div>
                
                <Button 
                  onClick={handleSubmit}
                  className="w-full py-5 bg-green-500 hover:bg-green-600 text-black rounded-xl font-medium"
                >
                  Submit Rating
                </Button>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RatingModal;
