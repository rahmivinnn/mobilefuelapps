
import React, { useState, useEffect } from 'react';
import { MapPin, Plus, Minus, Navigation, Locate, Share2, Facebook, Twitter, Instagram, Mail, MessageCircle, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MapProps {
  className?: string;
  showRoute?: boolean;
  showDeliveryInfo?: boolean;
  interactive?: boolean;
}

const Map: React.FC<MapProps> = ({ 
  className, 
  showRoute = false, 
  showDeliveryInfo = false,
  interactive = false
}) => {
  const [zoom, setZoom] = useState(14);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userLocation, setUserLocation] = useState({ lat: 35.1495, lng: -90.0490 }); // Memphis coordinates
  
  // Gas station data for Memphis
  const gasStations = [
    { 
      id: '1', 
      name: 'Shell', 
      position: { lat: 35.1477, lng: -90.0518 }, 
      price: 3.67, 
      distance: '0.8' 
    },
    { 
      id: '2', 
      name: 'ExxonMobil', 
      position: { lat: 35.1513, lng: -90.0425 }, 
      price: 3.72, 
      distance: '1.5' 
    },
    { 
      id: '3', 
      name: 'Chevron', 
      position: { lat: 35.1448, lng: -90.0561 }, 
      price: 3.65, 
      distance: '2.3' 
    },
    { 
      id: '4', 
      name: 'BP', 
      position: { lat: 35.1532, lng: -90.0389 }, 
      price: 3.69, 
      distance: '2.7' 
    },
  ];
  
  // Simulate loading the map
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    // Simulate getting user location
    if (navigator.geolocation && interactive) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Use actual position in a real implementation
          // Here we'll just keep the Memphis coordinates
          setUserLocation({ lat: 35.1495, lng: -90.0490 });
        },
        (error) => {
          console.error("Error getting location", error);
        }
      );
    }
    
    return () => clearTimeout(timer);
  }, [interactive]);
  
  const handleZoomIn = () => {
    setZoom(Math.min(zoom + 1, 19));
  };
  
  const handleZoomOut = () => {
    setZoom(Math.max(zoom - 1, 10));
  };
  
  const handleShare = () => {
    setShowShareOptions(!showShareOptions);
  };
  
  const shareToSocial = (platform: string) => {
    const shareUrl = window.location.href;
    const shareText = "Check out this gas station on FuelFriendly!";
    
    let shareLink = "";
    
    switch(platform) {
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
        break;
      case 'instagram':
        alert("Instagram sharing requires the app. Copy the link and share manually.");
        return;
      case 'email':
        shareLink = `mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(shareUrl)}`;
        break;
    }
    
    if (shareLink) {
      window.open(shareLink, '_blank');
    }
    
    setShowShareOptions(false);
  };
  
  // Generate dynamic map URL
  const mapUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${userLocation.lng},${userLocation.lat},${zoom},0/1200x600@2x?access_token=pk.eyJ1IjoibG92YWJsZWxsYyIsImEiOiJjbHEwd3RrcGkwaWpnMmtwNDR2Zzc1ZTY3In0.MlBl0yQcCQBTqN3mpV1LpA`;
  
  return (
    <div className={`relative w-full bg-muted/10 overflow-hidden rounded-xl ${className}`}>
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
          <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <img 
              src={mapUrl} 
              alt="Memphis Map" 
              className="w-full h-full object-cover"
            />
            
            {/* User location blue dot */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="relative">
                <div className="h-5 w-5 bg-blue-500 rounded-full border-2 border-white"></div>
                <div className="absolute inset-0 h-5 w-5 bg-blue-500/50 rounded-full animate-ping opacity-75"></div>
              </div>
            </div>
            
            {/* Gas station markers */}
            {gasStations.map((station) => {
              // Calculate position on the map (this is simplified)
              const latDiff = station.position.lat - userLocation.lat;
              const lngDiff = station.position.lng - userLocation.lng;
              const scale = 50; // Adjust based on zoom level for a real implementation
              
              const top = `${50 - latDiff * scale}%`;
              const left = `${50 + lngDiff * scale}%`;
              
              return (
                <Link
                  key={station.id}
                  to={`/station/${station.id}`}
                  className="absolute z-20"
                  style={{ top, left }}
                >
                  <div className="relative">
                    <div className="h-10 w-10 flex items-center justify-center">
                      <div className="bg-white rounded-full p-1 shadow-lg">
                        <div className="bg-red-500 h-6 w-6 rounded-full flex items-center justify-center">
                          <MapPin className="h-4 w-4 text-white" />
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 whitespace-nowrap mt-1 bg-black/70 text-white text-xs py-1 px-2 rounded">
                      {station.name}
                    </div>
                  </div>
                </Link>
              );
            })}
            
            {/* Route path if enabled */}
            {showRoute && (
              <div className="absolute inset-0 pointer-events-none">
                <svg width="100%" height="100%" className="absolute">
                  <path
                    d="M600,300 C550,320 480,340 420,330 C360,320 320,280 250,300"
                    stroke="#4ade80"
                    strokeWidth="6"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray="1,0"
                    className="animate-dash"
                  />
                  {/* Direction arrows along the path */}
                  <circle cx="550" cy="315" r="4" fill="#4ade80" />
                  <polygon points="480,335 490,325 470,325" fill="#4ade80" />
                  <circle cx="360" cy="320" r="4" fill="#4ade80" />
                  <polygon points="250,300 260,290 260,310" fill="#4ade80" />
                </svg>
              </div>
            )}
          </div>
          
          {/* Map controls */}
          <div className="absolute bottom-20 left-4 flex flex-col space-y-2">
            <button 
              onClick={handleZoomIn}
              className="h-10 w-10 rounded-full bg-white text-black flex items-center justify-center shadow-lg"
            >
              <Plus className="h-5 w-5" />
            </button>
            <button 
              onClick={handleZoomOut}
              className="h-10 w-10 rounded-full bg-white text-black flex items-center justify-center shadow-lg"
            >
              <Minus className="h-5 w-5" />
            </button>
          </div>
          
          {/* Navigation and Share buttons */}
          <div className="absolute bottom-4 right-4 flex space-x-2">
            {showRoute && (
              <button className="h-10 w-10 rounded-full bg-white text-black flex items-center justify-center shadow-lg">
                <Navigation className="h-5 w-5" />
              </button>
            )}
            <button 
              onClick={handleShare}
              className="h-10 w-10 rounded-full bg-white text-black flex items-center justify-center shadow-lg relative"
            >
              <Share2 className="h-5 w-5" />
              
              {/* Share options popup */}
              {showShareOptions && (
                <div className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-lg p-3 animate-fade-in">
                  <div className="flex space-x-3">
                    <button 
                      onClick={() => shareToSocial('facebook')}
                      className="h-10 w-10 rounded-full bg-blue-500 text-white flex items-center justify-center"
                    >
                      <Facebook className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => shareToSocial('twitter')}
                      className="h-10 w-10 rounded-full bg-blue-400 text-white flex items-center justify-center"
                    >
                      <Twitter className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => shareToSocial('instagram')}
                      className="h-10 w-10 rounded-full bg-pink-500 text-white flex items-center justify-center"
                    >
                      <Instagram className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => shareToSocial('email')}
                      className="h-10 w-10 rounded-full bg-gray-500 text-white flex items-center justify-center"
                    >
                      <Mail className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="w-2 h-2 bg-white absolute bottom-0 right-4 transform translate-y-1 rotate-45"></div>
                </div>
              )}
            </button>
          </div>
          
          {interactive && (
            <button 
              className="absolute right-4 top-4 h-10 w-10 rounded-full bg-white text-black flex items-center justify-center shadow-lg"
              onClick={() => setUserLocation({ lat: 35.1495, lng: -90.0490 })}
            >
              <Locate className="h-5 w-5" />
            </button>
          )}
          
          {/* Delivery info */}
          {showDeliveryInfo && (
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur-sm rounded-t-xl">
              <div className="flex items-center mb-2">
                <img 
                  src="/lovable-uploads/a3df03b1-a154-407f-b8fe-e5dd6f0bade3.png" 
                  alt="Driver" 
                  className="h-14 w-14 rounded-full object-cover border-2 border-green-500 mr-3"
                />
                <div>
                  <h3 className="font-semibold text-lg">Mike Johnson</h3>
                  <p className="text-muted-foreground">Memphis, TN</p>
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
                  <span>5 Gallons Regular Unleaded</span>
                  <span className="font-semibold">$18.95</span>
                </div>
                <div className="flex justify-between">
                  <span>2x Snickers bars</span>
                  <span className="font-semibold">$3.50</span>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Map;
