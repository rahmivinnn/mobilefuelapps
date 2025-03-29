
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
      <div className="bg-black/90 rounded-xl overflow-hidden border border-gray-800 hover:border-green-500/50 transition-all duration-300 shadow-lg hover:shadow-green-500/5">
        <div className="h-36 relative overflow-hidden">
          <img 
            src="/lovable-uploads/247dfa28-8829-4c62-b755-e246ccd89956.png" 
            alt="Gas Station" 
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
          
          <div className="absolute bottom-2 left-2 flex items-center">
            <div className="flex items-center bg-black/60 rounded-full px-2 py-1 text-white text-xs">
              <Star className="h-3 w-3 mr-1 text-yellow-400" />
              <span>{rating} (24)</span>
            </div>
          </div>
          
          {isOpen ? (
            <div className="absolute top-2 right-2 px-2 py-0.5 bg-green-500 text-black text-xs font-medium rounded-full animate-pulse-slow">
              Open
            </div>
          ) : (
            <div className="absolute top-2 right-2 px-2 py-0.5 bg-red-500 text-white text-xs font-medium rounded-full">
              Closed
            </div>
          )}
          
          <div className="absolute top-2 left-2 bg-black/60 px-2 py-1 rounded-full">
            <img 
              src={imageUrl} 
              alt={name} 
              className="h-5 w-5 object-contain"
            />
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-lg text-white mb-1 hover:text-green-500 transition-colors duration-300">{name}</h3>
          
          <div className="flex items-center text-white/60 mb-2 group hover:bg-green-500/10 rounded-full px-2 py-0.5 transition-all duration-300">
            <Fuel className="h-4 w-4 mr-2 text-green-500 group-hover:animate-pulse" />
            <span className="text-sm font-semibold text-white">${fuelPrice}</span>
          </div>
          
          <div className="flex items-center text-white/60 mb-2 hover:text-white/80 transition-colors hover:bg-red-500/10 rounded-full px-2 py-0.5">
            <MapPin className="h-4 w-4 mr-2 text-red-500" />
            <span className="text-sm">{distance} miles</span>
          </div>
        </div>
        
        <button className="w-full py-3 bg-green-500 text-black font-medium hover:bg-green-600 transition-all duration-300 active:bg-green-700 hover:tracking-wider">
          Select Station
        </button>
      </div>
    </Link>
  );
};

export default StationCard;
