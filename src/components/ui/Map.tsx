
import React, { useState } from 'react';
import { MapPin, Plus, Minus, Navigation, MessageCircle, Phone } from 'lucide-react';

interface MapProps {
  className?: string;
  showRoute?: boolean;
  showDeliveryInfo?: boolean;
}

const Map: React.FC<MapProps> = ({ className, showRoute = false, showDeliveryInfo = false }) => {
  const [zoom, setZoom] = useState(12);
  
  const handleZoomIn = () => {
    setZoom(Math.min(zoom + 1, 18));
  };
  
  const handleZoomOut = () => {
    setZoom(Math.max(zoom - 1, 1));
  };
  
  return (
    <div className={`relative w-full bg-muted/50 overflow-hidden rounded-xl ${className}`}>
      <div className="absolute inset-0 flex items-center justify-center">
        <img 
          src="https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/106.816666,-6.200000,11,0/1200x600?access_token=pk.eyJ1IjoibG92YWJsZWxsYyIsImEiOiJjbHEwd3RrcGkwaWpnMmtwNDR2Zzc1ZTY3In0.MlBl0yQcCQBTqN3mpV1LpA" 
          alt="Jakarta Map" 
          className="w-full h-full object-cover"
          style={{ 
            objectFit: 'cover',
            transform: `scale(${zoom/10})`,
            transition: 'transform 0.3s ease'
          }}
        />
        
        {/* Overlay for map styling */}
        <div className="absolute inset-0 bg-background/10" />
        
        {/* User location pin (blue dot) */}
        <div className="absolute bottom-1/3 right-1/3">
          <div className="relative">
            <div className="h-4 w-4 bg-blue-500 rounded-full animate-pulse"></div>
            <div className="absolute inset-0 h-4 w-4 bg-blue-500 rounded-full animate-ping opacity-75"></div>
          </div>
        </div>
        
        {/* Station location (red pin) */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="text-red-500">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" />
            </svg>
          </div>
        </div>
        
        {/* Route line */}
        {showRoute && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <svg width="100%" height="100%" className="absolute">
              <path
                d="M200,500 C250,400 300,350 400,300"
                stroke="#4ade80"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="10,10"
              />
            </svg>
          </div>
        )}
      </div>
      
      {/* Zoom controls */}
      <div className="absolute bottom-20 left-4 flex flex-col space-y-2">
        <button 
          onClick={handleZoomIn}
          className="h-10 w-10 rounded-full bg-green-500 text-black flex items-center justify-center shadow-lg"
        >
          <Plus className="h-5 w-5" />
        </button>
        <button 
          onClick={handleZoomOut}
          className="h-10 w-10 rounded-full bg-green-500 text-black flex items-center justify-center shadow-lg"
        >
          <Minus className="h-5 w-5" />
        </button>
      </div>
      
      {/* Current location button */}
      <div className="absolute bottom-4 right-4">
        <button className="h-10 w-10 rounded-full bg-white text-black flex items-center justify-center shadow-lg">
          <Navigation className="h-5 w-5" />
        </button>
      </div>
      
      {/* Delivery info if needed */}
      {showDeliveryInfo && (
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur-sm rounded-t-xl">
          <div className="flex items-center mb-2">
            <img 
              src="/lovable-uploads/a3df03b1-a154-407f-b8fe-e5dd6f0bade3.png" 
              alt="Driver" 
              className="h-14 w-14 rounded-full object-cover border-2 border-green-500 mr-3"
            />
            <div>
              <h3 className="font-semibold text-lg">Cristopert Dastin</h3>
              <p className="text-muted-foreground">Tennessee</p>
            </div>
            <div className="ml-auto flex space-x-2">
              <button className="h-12 w-12 flex items-center justify-center rounded-full bg-green-500">
                <MessageCircle className="h-6 w-6 text-black" />
              </button>
              <button className="h-12 w-12 flex items-center justify-center rounded-full bg-green-500">
                <Phone className="h-6 w-6 text-black" />
              </button>
            </div>
          </div>
          
          <div className="mt-4">
            <h4 className="text-muted-foreground text-sm mb-1">Your Delivery Time</h4>
            <p className="font-semibold">Estimated 8:30 - 9:15 PM</p>
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center">
                <MapPin className="h-3 w-3 text-black" />
              </div>
            </div>
            <div className="flex-1 mx-2 h-0.5 border-t-2 border-dashed border-green-500"></div>
            <div className="flex items-center">
              <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center">
                <svg className="h-3 w-3 text-black" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M18 18.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5m1.5-9H17V12h4.46L19.5 9.5M6 18.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5M20 8l3 4v5h-2c0 1.66-1.34 3-3 3s-3-1.34-3-3H9c0 1.66-1.34 3-3 3s-3-1.34-3-3H1V6c0-1.11.89-2 2-2h14v4h3M3 6v9h.76c.55-.61 1.35-1 2.24-1 .89 0 1.69.39 2.24 1H15V6H3z"/>
                </svg>
              </div>
            </div>
            <div className="flex-1 mx-2 h-0.5 border-t-2 border-dashed border-green-500"></div>
            <div className="flex items-center">
              <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center">
                <svg className="h-3 w-3 text-black" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M18 10a1 1 0 0 1-1-1 1 1 0 0 1 1-1 1 1 0 0 1 1 1 1 1 0 0 1-1 1m-6 0H6V5h6m7.77 2.23l.01-.01-3.72-3.72L15 4.56l2.11 2.11C16.17 7 15.5 7.93 15.5 9a2.5 2.5 0 0 0 2.5 2.5c.36 0 .69-.08 1-.21v7.21a1 1 0 0 1-1 1 1 1 0 0 1-1-1V14a2 2 0 0 0-2-2h-1V5a2 2 0 0 0-2-2H6c-1.11 0-2 .89-2 2v16h10v-7.5h1.5v5a2.5 2.5 0 0 0 2.5 2.5 2.5 2.5 0 0 0 2.5-2.5V9c0-.69-.28-1.32-.73-1.77M12 10H6V9h6m0-2H6V7h6M6 19v-3h5v3H6m6-4.5V19h-1v-4.5"/>
                </svg>
              </div>
            </div>
            <div className="flex-1 mx-2 h-0.5 border-t-2 border-dashed border-muted-foreground"></div>
            <div className="flex items-center">
              <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center">
                <svg className="h-3 w-3 text-muted-foreground" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-1">Order</h4>
            <div className="flex justify-between">
              <span>2 Liters Fuel</span>
              <span className="font-semibold">$283</span>
            </div>
            <div className="flex justify-between">
              <span>2x Chocolate cookies</span>
              <span className="font-semibold">$20</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Map;
