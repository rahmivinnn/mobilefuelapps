
import React, { useState } from 'react';
import { Search, Filter, MapPin } from 'lucide-react';
import Header from '@/components/layout/Header';
import BottomNav from '@/components/layout/BottomNav';
import StationCard from '@/components/ui/StationCard';
import Map from '@/components/ui/Map';
import { useIsMobile } from '@/hooks/use-mobile';

// Mock data for nearby stations in Memphis, Tennessee
const nearbyStations = [
  {
    id: '1',
    name: 'Shell Gas Station',
    address: '2255 Union Ave, Memphis, TN',
    distance: '0.8 mi',
    rating: 4.8,
    isOpen: true,
    imageUrl: 'https://images.unsplash.com/photo-1527018601619-a508a2be00cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: '2',
    name: 'ExxonMobil',
    address: '1701 Poplar Ave, Memphis, TN',
    distance: '1.5 mi',
    rating: 4.6,
    isOpen: true,
    imageUrl: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: '3',
    name: 'Chevron',
    address: '1203 Madison Ave, Memphis, TN',
    distance: '2.3 mi',
    rating: 4.3,
    isOpen: false,
    imageUrl: 'https://images.unsplash.com/photo-1527018601619-a508a2be00cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  }
];

const Index: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const isMobile = useIsMobile();
  
  return (
    <>
      <div className="py-2 px-4 flex justify-center items-center">
        <img 
          src="/lovable-uploads/a3df03b1-a154-407f-b8fe-e5dd6f0bade3.png" 
          alt="FuelFriendly Logo" 
          className={`object-contain w-[30%] ${isMobile ? 'max-h-5' : 'max-h-6'}`}
        />
      </div>
      
      <main className="page-container pt-0">
        <div className="flex items-center space-x-3 mb-6">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            <input
              type="text"
              placeholder="Search gas stations..."
              className="h-11 w-full rounded-full bg-muted pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/40"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="h-11 w-11 flex items-center justify-center rounded-full bg-muted hover:bg-muted/80">
            <Filter className="h-4 w-4" />
          </button>
        </div>
        
        <div className="glass card-shadow rounded-xl p-4 mb-6">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
              <MapPin className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Current Location</p>
              <p className="font-medium">Memphis, Tennessee</p>
            </div>
          </div>
        </div>
        
        <Map className="h-48 mb-6" />
        
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Nearby Stations</h2>
            <button className="text-sm text-green-500 hover:underline">See All</button>
          </div>
          
          <div className="grid gap-4">
            {nearbyStations.map(station => (
              <StationCard key={station.id} {...station} />
            ))}
          </div>
        </div>
      </main>
      
      <BottomNav />
    </>
  );
};

export default Index;
