import React, { useState, useEffect, useRef } from 'react';
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
import { allStations } from "@/data/dummyData";

const trafficConditions = {
  light: ['Union Ave', 'Madison Ave', 'Cooper St'],
  moderate: ['Poplar Ave', 'Central Ave'],
  heavy: ['I-240', 'I-40', 'Sam Cooper Blvd']
};

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const isMobile = useIsMobile();
  const [showTraffic, setShowTraffic] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [mapVisible, setMapVisible] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const stationListRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  
  const filteredStations = allStations
    .filter(station => 
      station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      station.address.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
    .slice(0, 10);

  useEffect(() => {
    const timer = setInterval(() => {
      setLastUpdated(new Date());
      const roads = [...trafficConditions.light, ...trafficConditions.moderate, ...trafficConditions.heavy];
      const randomRoad = roads[Math.floor(Math.random() * roads.length)];
      const conditions = ["light", "moderate", "heavy"];
      const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
      
      toast({
        title: "Real-time Traffic Update",
        description: `${randomCondition.charAt(0).toUpperCase() + randomCondition.slice(1)} traffic detected on ${randomRoad}.`,
        duration: 5000,
      });
    }, 15000);
    
    return () => clearInterval(timer);
  }, [toast]);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setMapVisible(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
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
      description: "Viewing all notifications",
      duration: 3000,
    });
  };

  const handleStationScroll = () => {
    if (stationListRef.current) {
      setScrollPosition(stationListRef.current.scrollLeft);
    }
  };
  
  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };
  
  const handleTouchMove = (e) => {
    if (!isDragging || !stationListRef.current) return;
    
    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;
    stationListRef.current.scrollLeft += diff;
    setStartX(currentX);
  };
  
  const handleTouchEnd = () => {
    setIsDragging(false);
  };
  
  const handleMouseDown = (e) => {
    setStartX(e.clientX);
    setIsDragging(true);
  };
  
  const handleMouseMove = (e) => {
    if (!isDragging || !stationListRef.current) return;
    
    const currentX = e.clientX;
    const diff = startX - currentX;
    stationListRef.current.scrollLeft += diff;
    setStartX(currentX);
    
    e.preventDefault();
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  const handleMouseLeave = () => {
    setIsDragging(false);
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
        
        <div className="flex-1 flex justify-center">
          <svg className="h-6 animate-fade-in" viewBox="0 0 217 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.728 23.04H0V0.48H13.728V4.416H4.608V9.504H12.672V13.44H4.608V19.104H13.728V23.04ZM29.3609 23.04H24.8489V14.496C24.8489 13.664 24.6169 13.024 24.1529 12.576C23.7049 12.128 23.0969 11.904 22.3289 11.904C21.5129 11.904 20.8569 12.16 20.3609 12.672C19.8649 13.168 19.6169 13.872 19.6169 14.784V23.04H15.1049V7.2H19.6169V9.408C20.0809 8.656 20.7209 8.064 21.5369 7.632C22.3689 7.184 23.3129 6.96 24.3689 6.96C25.5529 6.96 26.5609 7.232 27.3929 7.776C28.2249 8.32 28.8649 9.088 29.3129 10.08C29.7769 11.056 30.0089 12.208 30.0089 13.536V23.04H29.3609ZM33.1367 23.04V0.48H37.6487V23.04H33.1367ZM46.827 23.28C45.115 23.28 43.595 22.96 42.267 22.32C40.939 21.664 39.883 20.72 39.099 19.488C38.331 18.24 37.947 16.768 37.947 15.072C37.947 13.376 38.331 11.92 39.099 10.704C39.883 9.472 40.939 8.528 42.267 7.872C43.595 7.216 45.115 6.888 46.827 6.888C48.539 6.888 50.059 7.216 51.387 7.872C52.731 8.528 53.787 9.472 54.555 10.704C55.339 11.92 55.731 13.376 55.731 15.072C55.731 16.768 55.339 18.24 54.555 19.488C53.787 20.72 52.731 21.664 51.387 22.32C50.059 22.96 48.539 23.28 46.827 23.28ZM46.827 19.344C47.979 19.344 48.955 18.96 49.755 18.192C50.571 17.424 50.979 16.384 50.979 15.072C50.979 13.76 50.571 12.72 49.755 11.952C48.955 11.184 47.979 10.8 46.827 10.8C45.675 10.8 44.699 11.184 43.899 11.952C43.099 12.72 42.699 13.76 42.699 15.072C42.699 16.384 43.099 17.424 43.899 18.192C44.699 18.96 45.675 19.344 46.827 19.344ZM68.848 23.28C67.136 23.28 65.616 22.96 64.288 22.32C62.96 21.664 61.904 20.72 61.12 19.488C60.352 18.24 59.968 16.768 59.968 15.072C59.968 13.376 60.352 11.92 61.12 10.704C61.904 9.472 62.96 8.528 64.288 7.872C65.616 7.216 67.136 6.888 68.848 6.888C70.56 6.888 72.08 7.216 73.408 7.872C74.752 8.528 75.808 9.472 76.576 10.704C77.36 11.92 77.752 13.376 77.752 15.072C77.752 16.768 77.36 18.24 76.576 19.488C75.808 20.72 74.752 21.664 73.408 22.32C72.08 22.96 70.56 23.28 68.848 23.28ZM68.848 19.344C70 19.344 70.976 18.96 71.776 18.192C72.592 17.424 73 16.384 73 15.072C73 13.76 72.592 12.72 71.776 11.952C70.976 11.184 70 10.8 68.848 10.8C67.696 10.8 66.72 11.184 65.92 11.952C65.12 12.72 64.72 13.76 64.72 15.072C64.72 16.384 65.12 17.424 65.92 18.192C66.72 18.96 67.696 19.344 68.848 19.344ZM90.9609 23.28C89.2969 23.28 87.7929 22.96 86.4489 22.32C85.1049 21.664 84.0489 20.72 83.2809 19.488C82.5129 18.256 82.1289 16.784 82.1289 15.072C82.1289 13.376 82.5129 11.92 83.2809 10.704C84.0489 9.472 85.1049 8.528 86.4489 7.872C87.7929 7.216 89.2969 6.888 90.9609 6.888C92.3689 6.888 93.6169 7.152 94.7049 7.68C95.7929 8.192 96.6889 8.928 97.3929 9.888V0.48H101.905V23.04H97.3929V20.16C96.7689 21.136 95.9049 21.904 94.8009 22.464C93.7129 23.008 92.4329 23.28 90.9609 23.28ZM91.8729 19.344C93.0249 19.344 94.0009 18.96 94.8009 18.192C95.6169 17.408 96.0249 16.368 96.0249 15.072C96.0249 13.776 95.6169 12.752 94.8009 11.952C94.0009 11.168 93.0249 10.776 91.8729 10.776C90.7369 10.776 89.7609 11.168 88.9449 11.952C88.1449 12.736 87.7449 13.76 87.7449 15.024C87.7449 16.304 88.1449 17.344 88.9449 18.144C89.7609 18.944 90.7369 19.344 91.8729 19.344ZM117.921 23.28C116.225 23.28 114.721 22.96 113.409 22.32C112.097 21.664 111.057 20.72 110.289 19.488C109.537 18.24 109.161 16.768 109.161 15.072C109.161 13.376 109.537 11.92 110.289 10.704C111.057 9.472 112.097 8.528 113.409 7.872C114.721 7.216 116.225 6.888 117.921 6.888C119.265 6.888 120.465 7.152 121.521 7.68C122.593 8.192 123.473 8.928 124.161 9.888V7.2H128.673V23.04H124.161V20.304C123.489 21.264 122.609 22.016 121.521 22.56C120.449 23.04 119.249 23.28 117.921 23.28ZM118.833 19.344C119.985 19.344 120.961 18.96 121.761 18.192C122.577 17.408 122.985 16.368 122.985 15.072C122.985 13.776 122.577 12.752 121.761 11.952C120.961 11.168 119.985 10.776 118.833 10.776C117.697 10.776 116.721 11.168 115.905 11.952C115.105 12.736 114.705 13.76 114.705 15.024C114.705 16.304 115.105 17.344 115.905 18.144C116.721 18.944 117.697 19.344 118.833 19.344ZM144.85 23.04H140.338V14.496C140.338 13.664 140.106 13.024 139.642 12.576C139.194 12.128 138.586 11.904 137.818 11.904C137.002 11.904 136.346 12.16 135.85 12.672C135.354 13.168 135.106 13.872 135.106 14.784V23.04H130.594V7.2H135.106V9.408C135.57 8.656 136.21 8.064 137.026 7.632C137.858 7.184 138.802 6.96 139.858 6.96C141.042 6.96 142.05 7.232 142.882 7.776C143.714 8.32 144.354 9.088 144.802 10.08C145.266 11.056 145.498 12.208 145.498 13.536V23.04H144.85ZM151.49 23.04H146.978V0.48H151.49V9.408C151.97 8.656 152.61 8.064 153.41 7.632C154.226 7.184 155.154 6.96 156.194 6.96C157.41 6.96 158.45 7.232 159.314 7.776C160.178 8.32 160.834 9.088 161.282 10.08C161.746 11.072 161.978 12.24 161.978 13.584V23.04H157.466V14.496C157.466 13.648 157.218 12.992 156.722 12.528C156.242 12.064 155.618 11.832 154.85 11.832C154.034 11.832 153.362 12.08 152.834 12.576C152.322 13.072 152.066 13.776 152.066 14.688V23.04H151.49ZM180.273 23.04H175.377L169.089 15.12V23.04H164.577V0.48H169.089V14.784L175.209 7.2H180.105L173.025 15.36L180.273 23.04ZM191.619 18.144L195.891 7.2H200.691L193.971 23.04H189.195L182.499 7.2H187.347L191.619 18.144ZM217 14.64H203.128C203.288 15.824 203.784 16.736 204.616 17.376C205.448 18.016 206.472 18.336 207.688 18.336C208.536 18.336 209.28 18.176 209.92 17.856C210.576 17.536 211.088 17.072 211.456 16.464H216.808C216.328 18.176 215.368 19.584 213.928 20.688C212.488 21.792 210.656 22.344 208.432 22.344C206.688 22.344 205.12 22.016 203.728 21.36C202.336 20.688 201.248 19.744 200.464 18.528C199.696 17.296 199.312 15.856 199.312 14.208C199.312 12.544 199.696 11.088 200.464 9.84C201.232 8.592 202.304 7.648 203.68 7.008C205.056 6.368 206.64 6.048 208.432 6.048C210.16 6.048 211.696 6.352 213.04 6.96C214.4 7.568 215.456 8.464 216.208 9.648C216.976 10.816 217.36 12.208 217.36 13.824C217.36 14.096 217.312 14.368 217.216 14.64H217ZM208.36 9.984C207.256 9.984 206.32 10.256 205.552 10.8C204.784 11.328 204.272 12.096 204.016 13.104H212.704C212.48 12.112 212 11.344 211.264 10.8C210.528 10.256 209.576 9.984 208.408 9.984H208.36Z" fill="#00E676"/>
          </svg>
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
            showBackButton={false}
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
        
        <div 
          ref={stationListRef}
          className="overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide cursor-grab"
          onScroll={handleStationScroll}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          <div className="flex space-x-4" style={{ width: `${filteredStations.length * 280}px` }}>
            {filteredStations.map((station, index) => {
              const cheapestFuel = station.fuels && station.fuels.length > 0 
                ? station.fuels.reduce((min, fuel) => 
                    parseFloat(fuel.price) < parseFloat(min.price) ? fuel : min, 
                    station.fuels[0])
                : null;
              
              return (
                <div 
                  key={station.id} 
                  className="animate-fade-in w-64 flex-shrink-0" 
                  style={{ animationDelay: `${0.6 + (index * 0.1)}s` }}
                >
                  <StationCard 
                    id={station.id}
                    name={station.name}
                    address={station.address}
                    distance={station.distance}
                    price={cheapestFuel ? cheapestFuel.price : "3.29"}
                    rating={station.rating}
                    imageUrl={station.imageUrl}
                    isOpen={station.isOpen}
                  />
                </div>
              );
            })}
          </div>
          
          <div className="mt-3 flex justify-center">
            <div className="h-1 bg-gray-800 rounded-full w-48 relative">
              <div 
                className="absolute top-0 left-0 h-1 bg-green-500 rounded-full transition-all duration-300" 
                style={{ 
                  width: '30%', 
                  left: `${Math.min(70, scrollPosition / (stationListRef.current?.scrollWidth || 1) * 100)}%` 
                }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="mt-2 text-center">
          <p className="text-xs text-gray-500 animate-pulse">
            ← Swipe to see more stations →
          </p>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default Index;
