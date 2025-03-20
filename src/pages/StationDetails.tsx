
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, MapPin, Clock, Navigation, Share2 } from 'lucide-react';
import Header from '@/components/layout/Header';
import BottomNav from '@/components/layout/BottomNav';
import Map from '@/components/ui/Map';

// Mock data for the station
const stationData = {
  id: '1',
  name: 'Pertamina Gas Station',
  address: 'Jl. Sudirman No. 123, Jakarta',
  distance: '1.2 km',
  rating: 4.8,
  reviews: 234,
  isOpen: true,
  hours: '24 Hours',
  imageUrl: 'https://images.unsplash.com/photo-1560005262-823d9d53e891?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  description: 'One of the premier Pertamina gas stations in Jakarta, offering a wide variety of fuel types and additional services including a convenience store and ATM.',
};

const StationDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // In a real app, we would fetch the specific station data
  // For this demo, we'll use the mock data
  
  const handleBuyFuel = () => {
    navigate(`/station/${id}/fuel`);
  };
  
  return (
    <>
      <Header showBack title="Station Details" />
      
      <main className="page-container">
        <div className="relative h-56 rounded-xl overflow-hidden mb-5">
          <img 
            src={stationData.imageUrl} 
            alt={stationData.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h1 className="text-2xl font-bold text-white mb-1">{stationData.name}</h1>
            <div className="flex items-center space-x-3 mb-2">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                <span className="text-sm font-medium text-white">{stationData.rating}</span>
                <span className="text-sm text-white/70 ml-1">({stationData.reviews})</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-white">{stationData.distance}</span>
              </div>
              <div className={`flex items-center ${stationData.isOpen ? 'text-green-500' : 'text-red-500'}`}>
                <Clock className="h-4 w-4 mr-1" />
                <span className="text-sm">{stationData.isOpen ? 'Open' : 'Closed'}</span>
              </div>
            </div>
            <p className="text-sm text-white/80">{stationData.address}</p>
          </div>
        </div>
        
        <div className="glass card-shadow rounded-xl p-4 mb-5">
          <h2 className="text-lg font-medium mb-2">About</h2>
          <p className="text-sm text-muted-foreground">{stationData.description}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mb-5">
          <button className="glass card-shadow rounded-xl p-4 flex items-center justify-center">
            <Navigation className="h-5 w-5 mr-2 text-green-500" />
            <span>Directions</span>
          </button>
          <button className="glass card-shadow rounded-xl p-4 flex items-center justify-center">
            <Share2 className="h-5 w-5 mr-2 text-green-500" />
            <span>Share</span>
          </button>
        </div>
        
        <Map className="h-48 mb-5" />
        
        <button 
          onClick={handleBuyFuel}
          className="w-full py-4 rounded-xl bg-green-500 text-black font-semibold hover:bg-green-600 active:scale-[0.99] transition-all duration-200"
        >
          Buy Fuel Now
        </button>
      </main>
      
      <BottomNav />
    </>
  );
};

export default StationDetails;
