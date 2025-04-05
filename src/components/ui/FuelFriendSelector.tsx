
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface FuelFriend {
  id: string;
  name: string;
  image: string;
  rating: number;
  location: string;
  distance: string;
  phone: string;
  vehicle?: string;
}

interface FuelFriendSelectorProps {
  onSelect: (fuelFriend: FuelFriend) => void;
  onClose: () => void;
  orderDetails: {
    stationId: string;
    stationName: string;
    items: Array<{ name: string; quantity: string; price: number }>;
    total: number;
  };
}

const FuelFriendSelector: React.FC<FuelFriendSelectorProps> = ({ 
  onSelect, 
  onClose,
  orderDetails
}) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Mock data for available Fuel Friends
  const fuelFriends: FuelFriend[] = [
    {
      id: "ff1",
      name: "Christopher Dastin",
      image: "/lovable-uploads/a3df03b1-a154-407f-b8fe-e5dd6f0bade3.png",
      rating: 4.8,
      location: "Memphis, TN",
      distance: "0.5 miles away",
      phone: "+1 (901) 555-3478",
      vehicle: "White Toyota Camry"
    },
    {
      id: "ff2",
      name: "Sarah Johnson",
      image: "/lovable-uploads/c3b29f6b-a689-4ac3-a338-4194cbee5e0c.png",
      rating: 4.7,
      location: "Memphis, TN",
      distance: "0.8 miles away",
      phone: "+1 (901) 555-9872",
      vehicle: "Blue Honda Civic"
    },
    {
      id: "ff3",
      name: "Michael Davis",
      image: "/lovable-uploads/8a188651-80ec-4a90-8d5c-de0df713b6c7.png",
      rating: 4.9,
      location: "Memphis, TN",
      distance: "1.2 miles away",
      phone: "+1 (901) 555-2341",
      vehicle: "Black Ford Focus"
    },
    {
      id: "ff4",
      name: "Emily Wilson",
      image: "/lovable-uploads/1bc06a60-0463-4f47-abde-502bc408852e.png",
      rating: 4.6,
      location: "Memphis, TN",
      distance: "1.5 miles away",
      phone: "+1 (901) 555-7653",
      vehicle: "Red Chevy Malibu"
    }
  ];

  const handleSelectFriend = (friend: FuelFriend) => {
    onSelect(friend);
    
    toast({
      title: "Fuel Friend Selected",
      description: `${friend.name} has been notified of your order.`,
      duration: 3000,
    });
    
    setTimeout(() => {
      toast({
        title: "Order Accepted!",
        description: `${friend.name} has accepted your request and is on the way.`,
        duration: 3000,
        className: "bg-green-500 border-green-600 text-white"
      });
    }, 2000);
    
    // Navigate to tracking page after selection
    setTimeout(() => {
      navigate(`/track?orderId=${orderDetails.stationId}`);
    }, 3500);
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
        className="bg-gray-900 rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
      >
        <h2 className="text-xl font-bold mb-2">Select a Fuel Friend</h2>
        <p className="text-gray-400 mb-4">Choose someone to deliver your order</p>
        
        {/* Order summary */}
        <div className="bg-gray-800 rounded-lg p-3 mb-6">
          <h3 className="font-medium mb-2">Order Summary</h3>
          <p className="text-sm text-gray-400 mb-1">{orderDetails.stationName}</p>
          {orderDetails.items.slice(0, 2).map((item, i) => (
            <div key={i} className="flex justify-between text-sm">
              <span>{item.name}</span>
              <span>${item.price.toFixed(2)}</span>
            </div>
          ))}
          {orderDetails.items.length > 2 && (
            <p className="text-xs text-gray-500 mt-1">
              + {orderDetails.items.length - 2} more items
            </p>
          )}
          <div className="border-t border-gray-700 mt-2 pt-2 flex justify-between">
            <span>Total</span>
            <span className="font-bold">${orderDetails.total.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="space-y-3">
          {fuelFriends.map((friend) => (
            <motion.div
              key={friend.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gray-800 rounded-xl p-4 cursor-pointer"
              onClick={() => handleSelectFriend(friend)}
            >
              <div className="flex items-center">
                <div className="h-16 w-16 rounded-full overflow-hidden mr-4 border-2 border-green-500">
                  <img 
                    src={friend.image} 
                    alt={friend.name} 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{friend.name}</h3>
                    <div className="flex items-center bg-gray-700 px-2 py-0.5 rounded">
                      <Star size={14} className="text-yellow-400 mr-1" />
                      <span className="text-sm">{friend.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-400 text-sm mt-1">
                    <MapPin size={14} className="mr-1" />
                    <span>{friend.distance}</span>
                  </div>
                  {friend.vehicle && (
                    <p className="text-xs text-gray-500 mt-1">{friend.vehicle}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <button
          onClick={onClose}
          className="w-full mt-6 py-2.5 rounded-xl border border-gray-700 text-gray-300 font-medium hover:bg-gray-800 active:scale-[0.98] transition-all duration-200"
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  );
};

export default FuelFriendSelector;
