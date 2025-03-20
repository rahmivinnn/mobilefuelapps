
import React from 'react';
import { MapPin, Star, Clock } from 'lucide-react';
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
  return (
    <Link 
      to={`/station/${id}`}
      className="block w-full transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99]"
    >
      <div className="glass card-shadow rounded-2xl overflow-hidden animate-fade-in">
        <div className="relative h-36 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent h-20 pointer-events-none" />
          <div className="absolute bottom-3 left-3 flex items-center space-x-2">
            <div className="flex items-center bg-black/50 rounded-full px-2 py-1">
              <Star className="h-3 w-3 text-yellow-400 mr-1" />
              <span className="text-xs font-medium">{rating}</span>
            </div>
            <div className="flex items-center bg-black/50 rounded-full px-2 py-1">
              <MapPin className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-xs font-medium">{distance}</span>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-medium text-foreground">{name}</h3>
            <div className={`flex items-center ${isOpen ? 'text-green-500' : 'text-red-500'}`}>
              <Clock className="h-3 w-3 mr-1" />
              <span className="text-xs font-medium">
                {isOpen ? 'Open' : 'Closed'}
              </span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground truncate">{address}</p>
        </div>
      </div>
    </Link>
  );
};

export default StationCard;
