
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin } from 'lucide-react';

interface StationCardProps {
  id: string;
  name: string;
  address: string;
  distance: string;
  price: string;
  rating: number;
  image: string;
  openStatus?: string;
}

const StationCard: React.FC<StationCardProps> = ({
  id,
  name,
  address,
  distance,
  price,
  rating,
  image,
  openStatus = "Open"
}) => {
  const navigate = useNavigate();

  const handleStationClick = () => {
    navigate(`/station/${id}`);
  };

  return (
    <div 
      className="rounded-xl overflow-hidden h-52 relative cursor-pointer shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-800 bg-gray-900/40"
      onClick={handleStationClick}
    >
      <img 
        src={image} 
        alt={name}
        className="absolute inset-0 h-full w-full object-cover"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
      
      <div className="relative h-full flex flex-col justify-between p-4">
        <div className="flex justify-between items-start">
          <div className="bg-green-500 px-2 py-0.5 rounded-md text-xs font-medium text-black">
            {openStatus}
          </div>
          
          <div className="flex space-x-1 items-center bg-black/60 rounded-full px-2 py-1">
            <Star className="text-yellow-400 w-3 h-3" />
            <span className="text-xs text-white">{rating}</span>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-end">
            <div>
              <h3 className="text-base font-semibold text-white mb-1">{name}</h3>
              <div className="flex items-center text-gray-300 text-xs">
                <MapPin className="h-3 w-3 mr-1" />
                <span className="truncate max-w-[150px]">{address}</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">{distance} miles away</p>
            </div>
            
            <div>
              <p className="text-white font-bold text-xl">${price}</p>
              <p className="text-gray-400 text-xs text-right">per gallon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StationCard;
