
import React from 'react';
import { MapPin, Star, Fuel } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface StationProps {
  id: string;
  name: string;
  address: string;
  distance: string;
  rating: number;
  isOpen: boolean;
  imageUrl: string;
}

const StationCard: React.FC<StationProps> = ({
  id,
  name,
  address,
  distance,
  rating,
  isOpen,
  imageUrl
}) => {
  // Calculate fuel price (mock data)
  const fuelPrice = Math.floor(Math.random() * 10) + 30 + Math.random().toFixed(2);
  
  return (
    <Link 
      to={`/station/${id}`}
      className="block w-full transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
    >
      <div className="bg-black/90 dark:bg-black/70 rounded-xl overflow-hidden border border-gray-800 hover:border-green-500/50 transition-all duration-300 shadow-lg hover:shadow-green-500/5">
        <div className="flex p-4">
          <div className="w-24 h-24 rounded-lg overflow-hidden mr-4 relative group">
            <img 
              src={imageUrl} 
              alt={name} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {isOpen ? (
              <div className="absolute top-2 left-2 px-2 py-0.5 bg-green-500 text-black text-xs font-medium rounded-full">
                Open
              </div>
            ) : (
              <div className="absolute top-2 left-2 px-2 py-0.5 bg-red-500 text-white text-xs font-medium rounded-full">
                Closed
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <h3 className="font-medium text-lg text-white mb-1">{name}</h3>
            
            <div className="flex items-center text-white/60 mb-2 group">
              <Fuel className="h-4 w-4 mr-2 text-green-500 group-hover:animate-pulse" />
              <span className="text-sm font-semibold text-white">${fuelPrice}</span>
            </div>
            
            <div className="flex items-center text-white/60 mb-2 hover:text-white/80 transition-colors">
              <MapPin className="h-4 w-4 mr-2 text-red-500" />
              <span className="text-sm">{distance} miles</span>
            </div>
            
            <div className="flex items-center text-white/60 hover:text-white/80 transition-colors">
              <Star className="h-4 w-4 mr-2 text-yellow-400" />
              <span className="text-sm">{rating} (24 Reviews)</span>
            </div>
          </div>
        </div>
        
        <button className="w-full py-3 bg-green-500 text-black font-medium hover:bg-green-600 transition-colors active:bg-green-700">
          Select Station
        </button>
      </div>
    </Link>
  );
};

export default StationCard;
