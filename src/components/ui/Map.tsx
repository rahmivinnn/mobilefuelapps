
import React from 'react';
import { MapPin } from 'lucide-react';

interface MapProps {
  className?: string;
}

const Map: React.FC<MapProps> = ({ className }) => {
  // In a real app, we would integrate with Google Maps or Mapbox
  // For now, we'll create a simple placeholder
  return (
    <div className={`relative w-full bg-muted/50 overflow-hidden rounded-xl ${className}`}>
      <div className="absolute inset-0 flex items-center justify-center">
        <img 
          src="/lovable-uploads/059210be-e086-4557-aafc-6a7e6dad067c.png" 
          alt="Map" 
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-background/30 backdrop-blur-sm" />
        
        {/* Map pin for the station */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="animate-pulse-slow">
            <MapPin className="h-10 w-10 text-green-500" />
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-green-500 rounded-full border-2 border-background" />
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-3 right-3">
        <div className="glass rounded-lg px-3 py-2 text-sm">
          <span className="text-muted-foreground">Tap to open full map</span>
        </div>
      </div>
    </div>
  );
};

export default Map;
