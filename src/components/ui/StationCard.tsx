
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin } from 'lucide-react';

interface StationCardProps {
  id: string;
  name: string;
  address: string;
  distance: string;
  price?: string;
  rating: number;
  image?: string;
  imageUrl?: string;
  openStatus?: string;
  isOpen?: boolean;
}

const StationCard: React.FC<StationCardProps> = ({
  id,
  name,
  address,
  distance,
  price,
  rating,
  image,
  imageUrl,
  openStatus,
  isOpen = true
}) => {
  const navigate = useNavigate();
  // Use the new Shell image for all station cards
  const displayImage = "/lovable-uploads/8ed0bc34-d448-42c8-804a-8dda4e3e6840.png";
  const displayStatus = openStatus || (isOpen ? "Open" : "Closed");
  
  // Get the lowest price from the first fuel type if price is not provided
  const displayPrice = price || "3.29";  // Default price if not provided

  const handleStationClick = () => {
    navigate(`/station/${id}`);
  };

  return (
    <div 
      className="rounded-xl overflow-hidden h-52 relative cursor-pointer shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-800 bg-gray-900/40"
      onClick={handleStationClick}
    >
      <img 
        src={displayImage} 
        alt={name}
        className="absolute inset-0 h-full w-full object-cover"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
      
      <div className="relative h-full flex flex-col justify-between p-4">
        <div className="flex justify-between items-start">
          <div className="bg-green-500 px-2 py-0.5 rounded-md text-xs font-medium text-black">
            {displayStatus}
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
              <p className="text-white font-bold text-xl">${displayPrice}</p>
              <p className="text-gray-400 text-xs text-right">per gallon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StationCard;
