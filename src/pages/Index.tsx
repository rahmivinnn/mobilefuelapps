
import React, { useState } from 'react';
import { Search, Filter, Bell, User } from 'lucide-react';
import BottomNav from '@/components/layout/BottomNav';
import StationCard from '@/components/ui/StationCard';
import Map from '@/components/ui/Map';
import { useIsMobile } from '@/hooks/use-mobile';

// Updated mock data for nearby stations in Memphis, Tennessee
const nearbyStations = [
  {
    id: '1',
    name: 'Shell Gas Station',
    address: '2255 Union Ave, Memphis, TN',
    distance: '0.8',
    rating: 4.8,
    isOpen: true,
    imageUrl: 'https://images.unsplash.com/photo-1527018601619-a508a2be00cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: '2',
    name: 'ExxonMobil',
    address: '1701 Poplar Ave, Memphis, TN',
    distance: '1.5',
    rating: 4.6,
    isOpen: true,
    imageUrl: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: '3',
    name: 'Chevron',
    address: '1203 Madison Ave, Memphis, TN',
    distance: '2.3',
    rating: 4.3,
    isOpen: false,
    imageUrl: 'https://images.unsplash.com/photo-1527018601619-a508a2be00cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  }
];

const Index: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const isMobile = useIsMobile();
  
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Status bar mockup */}
      <div className="flex justify-between items-center p-2 text-xs">
        <div>8:45</div>
        <div className="flex items-center space-x-1">
          <span>●●●</span>
          <span>📶</span>
          <span>🔋</span>
        </div>
      </div>
      
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-2">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 overflow-hidden">
          <img 
            src="/lovable-uploads/463bf610-05e1-4137-856e-46609ab49bbc.png" 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1 flex justify-center">
          <img 
            src="/lovable-uploads/a3df03b1-a154-407f-b8fe-e5dd6f0bade3.png" 
            alt="FuelFriendly Logo" 
            className="h-8 w-[30%] object-contain"
          />
        </div>
        
        <button className="w-10 h-10 flex items-center justify-center">
          <Bell className="h-6 w-6" />
        </button>
      </div>
      
      {/* Search bar */}
      <div className="px-4 py-2 flex items-center space-x-3">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Search for fuel and gr..."
            className="h-12 w-full rounded-full bg-gray-800/80 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="h-12 w-12 flex items-center justify-center rounded-full bg-green-500/20">
          <Filter className="h-5 w-5 text-green-500" />
        </button>
      </div>
      
      {/* Map */}
      <div className="px-4 py-2">
        <Map className="h-72 w-full rounded-lg" interactive />
      </div>
      
      {/* Nearby Stations */}
      <div className="px-4 pt-4 pb-20">
        <h2 className="text-xl font-bold mb-4">Fuel Station nearby</h2>
        
        <div className="space-y-4">
          {nearbyStations.map(station => (
            <StationCard key={station.id} {...station} />
          ))}
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default Index;
