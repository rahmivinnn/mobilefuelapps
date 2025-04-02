
import React from 'react';
import { Star, Clock, MapPin, Phone, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface FuelFriendProps {
  id: string;
  name: string;
  image?: string;
  rating: number;
  completedOrders: number;
  distance: string;
  available: boolean;
  location: string;
  phone: string;
  timeToArrive?: string;
}

interface FuelFriendCardProps {
  fuelFriend: FuelFriendProps;
  selected?: boolean;
  onSelect: (id: string) => void;
  onMessage?: (id: string) => void;
  onCall?: (id: string) => void;
}

const FuelFriendCard: React.FC<FuelFriendCardProps> = ({
  fuelFriend,
  selected = false,
  onSelect,
  onMessage,
  onCall
}) => {
  return (
    <div 
      className={`p-4 rounded-xl glass transition-all transform 
        hover:scale-[1.01] ${selected 
          ? 'border-green-500 shadow-[0_0_0_1.5px_rgb(0,230,118)]' 
          : 'dark:border-white/10 dark:hover:border-white/20 light:border-green-200 light:hover:border-green-300'
        }`}
    >
      <div className="flex items-center mb-3">
        <div className="mr-3">
          {fuelFriend.image ? (
            <div className="h-16 w-16 rounded-full overflow-hidden">
              <img src={fuelFriend.image} alt={fuelFriend.name} className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="h-16 w-16 rounded-full bg-green-500 flex items-center justify-center text-black text-2xl font-bold">
              {fuelFriend.name.charAt(0)}
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">{fuelFriend.name}</h3>
              <div className="flex items-center mt-1">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                <span className="mr-2">{fuelFriend.rating.toFixed(1)}</span>
                <span className="text-sm text-gray-400">{fuelFriend.completedOrders} orders</span>
              </div>
            </div>
            
            <div className={`px-2 py-1 text-xs rounded-full ${fuelFriend.available ? 'bg-green-500/20 text-green-500' : 'bg-gray-500/20 text-gray-400'}`}>
              {fuelFriend.available ? 'Available' : 'Busy'}
            </div>
          </div>
          
          <div className="mt-2 flex items-center text-sm text-gray-400">
            <MapPin className="h-3 w-3 mr-1" />
            <span className="mr-3">{fuelFriend.distance} away</span>
            {fuelFriend.timeToArrive && (
              <>
                <Clock className="h-3 w-3 mr-1" />
                <span>Est. {fuelFriend.timeToArrive}</span>
              </>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex space-x-2">
        <Button 
          onClick={() => onSelect(fuelFriend.id)}
          className={`flex-1 ${selected 
            ? 'bg-green-500 hover:bg-green-600 text-black' 
            : 'bg-white/10 hover:bg-white/20'}`}
          variant="ghost"
        >
          {selected ? 'Selected' : 'Select'}
        </Button>
        
        {onMessage && (
          <Button 
            onClick={() => onMessage(fuelFriend.id)}
            className="bg-white/10 hover:bg-white/20 p-0 h-10 w-10 rounded-lg"
            variant="ghost"
          >
            <MessageSquare className="h-5 w-5" />
          </Button>
        )}
        
        {onCall && (
          <Button 
            onClick={() => onCall(fuelFriend.id)}
            className="bg-white/10 hover:bg-white/20 p-0 h-10 w-10 rounded-lg"
            variant="ghost"
          >
            <Phone className="h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default FuelFriendCard;
