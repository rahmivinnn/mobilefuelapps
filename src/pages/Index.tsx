
import React, { useState, useEffect } from 'react';
import { Search, Filter, Bell, User } from 'lucide-react';
import BottomNav from '@/components/layout/BottomNav';
import StationCard from '@/components/ui/StationCard';
import Map from '@/components/ui/Map';
import { useIsMobile } from '@/hooks/use-mobile';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { allStations } from "@/data/dummyData";  // Import from dummyData

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const isMobile = useIsMobile();
  const [showTraffic, setShowTraffic] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [mapVisible, setMapVisible] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Get 10 nearby stations sorted by distance
  const nearbyStations = allStations
    .sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
    .slice(0, 10);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setLastUpdated(new Date());
      // Show random traffic updates every minute
      const trafficConditions = {
        light: ['Union Ave', 'Madison Ave', 'Cooper St'],
        moderate: ['Poplar Ave', 'Central Ave'],
        heavy: ['I-240', 'I-40', 'Sam Cooper Blvd']
      };
      
      const roads = [...trafficConditions.light, ...trafficConditions.moderate, ...trafficConditions.heavy];
      const randomRoad = roads[Math.floor(Math.random() * roads.length)];
      const conditions = ["light", "moderate", "heavy"];
      const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
      
      toast({
        title: "Real-time Traffic Update",
        description: `${randomCondition.charAt(0).toUpperCase() + randomCondition.slice(1)} traffic detected on ${randomRoad}.`,
        duration: 5000,
      });
    }, 60000);
    
    return () => clearInterval(timer);
  }, [toast]);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setMapVisible(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Show notification toast when component mounts
    toast({
      title: "Traffic Update",
      description: "Heavy traffic detected on I-240. Consider alternative routes.",
      duration: 5000,
    });
  }, [toast]);
  
  const handleSeeAll = () => {
    navigate('/map');
  };
  
  const handleNotificationClick = () => {
    toast({
      title: "Notifications",
      description: "You have 3 new notifications",
      duration: 3000,
    });
    
    // Show multiple notifications sequentially
    setTimeout(() => {
      toast({
        title: "New Promotion",
        description: "Get 5% off your next fuel purchase with code FUEL5",
        duration: 4000,
      });
    }, 1000);
    
    setTimeout(() => {
      toast({
        title: "Order Update",
        description: "Your last order has been delivered successfully",
        duration: 4000,
      });
    }, 2000);
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-300 max-w-[420px] mx-auto">
      <div className="flex justify-between items-center px-4 py-2">
        <div className="relative group">
          <Avatar className="w-10 h-10 bg-green-500 ring-2 ring-green-500/50 hover:ring-green-500 transition-all duration-300 transform hover:scale-110 group-hover:rotate-6">
            <AvatarFallback className="bg-gradient-to-br from-green-400 to-green-600">
              <User className="h-5 w-5 text-white" />
            </AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="text-[10px] text-white font-bold">+</span>
          </div>
        </div>
        
        <div className="flex-1 flex justify-center items-center">
          <img 
            src="/lovable-uploads/57aff490-f08a-4205-9ae9-496a32e810e6.png" 
            alt="FUELFRIENDLY" 
            className="h-1 animate-fade-in" // Further reduced from h-1.25 to h-1
          />
        </div>
        
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button 
            className="w-10 h-10 flex items-center justify-center hover:bg-white/5 rounded-full transition-all duration-300 relative overflow-hidden group cursor-pointer"
            onClick={handleNotificationClick}
          >
            <Bell className="h-6 w-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12 group-active:scale-90" />
            <span className="absolute top-2 right-2.5 h-2 w-2 bg-green-500 rounded-full animate-ping opacity-75"></span>
            <span className="absolute top-2 right-2.5 h-2 w-2 bg-green-500 rounded-full"></span>
          </button>
        </div>
      </div>
      
      <div className="px-4 py-2 flex items-center space-x-3 animate-fade-in">
        <div className="relative flex-1 group">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none group-focus-within:text-green-500 transition-colors duration-300">
            <Search className="h-4 w-4 text-gray-500 group-hover:text-green-500 transition-all duration-300 group-hover:rotate-12" />
          </div>
          <input
            type="text"
            placeholder="Search for fuel and gr..."
            className="h-12 w-full rounded-full dark:bg-gray-900/80 bg-white/80 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 hover:ring-1 hover:ring-green-500/30 focus:scale-[1.02] transform"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="h-12 w-12 flex items-center justify-center rounded-full bg-green-500/20 hover:bg-green-500/30 transition-all duration-300 active:scale-90 hover:rotate-12 hover:shadow-lg hover:shadow-green-500/20">
          <Filter className="h-5 w-5 text-green-500 transition-transform duration-300 hover:scale-110" />
        </button>
      </div>
      
      <div className="px-4 py-2 relative animate-fade-in" style={{ animationDelay: "0.2s" }}>
        <div className={`transition-all duration-1000 rounded-xl overflow-hidden transform ${mapVisible ? 'opacity-100 shadow-xl shadow-green-500/10 scale-100' : 'opacity-0 scale-95'}`}>
          <Map 
            className="h-56 w-full rounded-lg overflow-hidden" 
            interactive={true} 
            showRoute={showTraffic} 
            showBackButton={true}
          />
        </div>
        
        <div className="absolute bottom-4 left-8 dark:bg-black/70 bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs flex items-center space-x-2 animate-fade-in hover:bg-green-500/20 transition-all duration-300 hover:pl-5 hover:pr-7">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="dark:text-white text-green-800 whitespace-nowrap">Live traffic</span>
        </div>
        
        <div className="absolute top-6 right-6 flex flex-col space-y-1 z-10">
          <div className="flex items-center space-x-1 px-2 py-1 dark:bg-black/70 bg-white/70 backdrop-blur-sm rounded-full text-xs animate-fade-in hover:bg-green-400/20 transition-all duration-300 hover:pl-4 hover:pr-6" style={{ animationDelay: '0.2s' }}>
            <div className="h-2 w-2 rounded-full bg-green-400"></div>
            <span className="dark:text-white text-green-800">Light</span>
          </div>
          <div className="flex items-center space-x-1 px-2 py-1 dark:bg-black/70 bg-white/70 backdrop-blur-sm rounded-full text-xs animate-fade-in hover:bg-yellow-400/20 transition-all duration-300 hover:pl-4 hover:pr-6" style={{ animationDelay: '0.4s' }}>
            <div className="h-2 w-2 rounded-full bg-yellow-400"></div>
            <span className="dark:text-white text-green-800">Moderate</span>
          </div>
          <div className="flex items-center space-x-1 px-2 py-1 dark:bg-black/70 bg-white/70 backdrop-blur-sm rounded-full text-xs animate-fade-in hover:bg-red-500/20 transition-all duration-300 hover:pl-4 hover:pr-6" style={{ animationDelay: '0.6s' }}>
            <div className="h-2 w-2 rounded-full bg-red-500"></div>
            <span className="dark:text-white text-green-800">Heavy</span>
          </div>
        </div>
        
        <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
          <button className="h-8 w-8 rounded-full bg-white/80 text-black flex items-center justify-center shadow-lg hover:bg-white active:scale-95 transition-all">
            <span className="text-lg font-bold">+</span>
          </button>
          <button className="h-8 w-8 rounded-full bg-white/80 text-black flex items-center justify-center shadow-lg hover:bg-white active:scale-95 transition-all">
            <span className="text-lg font-bold">-</span>
          </button>
        </div>
      </div>
      
      <div className="px-4 pt-3 pb-20 flex-1 animate-fade-in" style={{ animationDelay: "0.4s" }}>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-bold relative group">
            <span className="transition-all duration-300 dark:text-white text-green-800 group-hover:text-green-500">Fuel Stations nearby</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 transition-all duration-500 group-hover:w-full"></span>
          </h2>
          <button 
            onClick={handleSeeAll}
            className="text-sm text-green-500 hover:text-green-400 transition-colors relative overflow-hidden group cursor-pointer"
          >
            <span className="relative z-10 group-hover:tracking-wider transition-all duration-300">See all</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-500/30 transition-all duration-300 group-hover:w-full"></span>
          </button>
        </div>
        
        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1 custom-scrollbar">
          {nearbyStations.map((station, index) => (
            <div 
              key={station.id} 
              className="animate-fade-in transform transition-all duration-500 hover:translate-x-1" 
              style={{ animationDelay: `${0.6 + (index * 0.1)}s` }}
            >
              <StationCard {...station} />
            </div>
          ))}
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default Index;
