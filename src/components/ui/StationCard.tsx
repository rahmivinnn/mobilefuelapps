
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
      className="block w-full transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99]"
    >
      <div className="bg-black/90 rounded-xl overflow-hidden animate-fade-in border border-gray-800">
        <div className="flex p-4">
          <div className="w-24 h-24 rounded-lg overflow-hidden mr-4">
            <img 
              src={imageUrl} 
              alt={name} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1">
            <h3 className="font-medium text-lg text-white mb-1">{name}</h3>
            
            <div className="flex items-center text-white/60 mb-2">
              <Fuel className="h-4 w-4 mr-2 text-green-500" />
              <span className="text-sm font-semibold text-white">${fuelPrice}</span>
            </div>
            
            <div className="flex items-center text-white/60 mb-2">
              <MapPin className="h-4 w-4 mr-2 text-red-500" />
              <span className="text-sm">{distance} miles</span>
            </div>
            
            <div className="flex items-center text-white/60">
              <Star className="h-4 w-4 mr-2 text-yellow-400" />
              <span className="text-sm">{rating} (24 Reviews)</span>
            </div>
          </div>
        </div>
        
        <button className="w-full py-3 bg-green-500 text-black font-medium hover:bg-green-600 transition-colors">
          Select Station
        </button>
      </div>
    </Link>
  );
};

export default StationCard;
