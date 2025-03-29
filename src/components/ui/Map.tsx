
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MapPin, Plus, Minus, Navigation, Locate, Share2, Facebook, Twitter, Instagram, Mail, MessageCircle, Phone, ArrowUpRight, ArrowDownRight, ArrowUpLeft, ArrowDownLeft, ArrowLeft, User } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MapProps {
  className?: string;
  showRoute?: boolean;
  showDeliveryInfo?: boolean;
  interactive?: boolean;
  showBackButton?: boolean;
  driverLocation?: { lat: number; lng: number; };
  animate?: boolean;
  driverName?: string;
}

const Map: React.FC<MapProps> = ({ 
  className, 
  showRoute = false, 
  showDeliveryInfo = false,
  interactive = false,
  showBackButton = true,
  driverLocation = { lat: 35.1495, lng: -90.0490 },
  animate = false,
  driverName = "Driver"
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const mapRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(14);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userLocation, setUserLocation] = useState({ lat: 35.1495, lng: -90.0490 }); // Memphis coordinates
  const [currentDriverLocation, setCurrentDriverLocation] = useState(driverLocation);
  const [trafficIntensity, setTrafficIntensity] = useState("moderate");
  const [showDirections, setShowDirections] = useState(false);
  const [selectedStation, setSelectedStation] = useState(null);
  const [mapPosition, setMapPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [animatedRoute, setAnimatedRoute] = useState(false);
  const [routeProgress, setRouteProgress] = useState(0);
  
  // Hide back button on home page
  const isHomePage = location.pathname === '/';

  // Update driver location with animation
  useEffect(() => {
    if (animate) {
      const interval = setInterval(() => {
        setCurrentDriverLocation(prev => {
          // Generate small random movements to simulate driver movement
          const latDelta = (Math.random() - 0.5) * 0.002;
          const lngDelta = (Math.random() - 0.5) * 0.002;
          return {
            lat: prev.lat + latDelta,
            lng: prev.lng + lngDelta
          };
        });
      }, 2000);
      
      return () => clearInterval(interval);
    }
  }, [animate]);

  // Animate route progress
  useEffect(() => {
    if (showRoute || showDirections) {
      setAnimatedRoute(true);
      const routeAnimation = setInterval(() => {
        setRouteProgress(prev => {
          if (prev >= 100) {
            clearInterval(routeAnimation);
            return 100;
          }
          return prev + 1;
        });
      }, 50);
      
      return () => clearInterval(routeAnimation);
    } else {
      setRouteProgress(0);
    }
  }, [showRoute, showDirections]);

  const handleGoBack = () => {
    navigate(-1);
  };
  
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
    
    // Simulate traffic changes - reduced to 15 seconds
    const trafficTimer = setInterval(() => {
      const intensities = ["light", "moderate", "heavy"];
      const randomIntensity = intensities[Math.floor(Math.random() * intensities.length)];
      setTrafficIntensity(randomIntensity);
      
      // Generate random traffic update
      if (typeof window !== 'undefined') {
        const memphisRoads = [
          "Poplar Avenue", "Union Avenue", "Sam Cooper Boulevard", "I-240", 
          "I-40", "Madison Avenue", "E Parkway", "Walnut Grove Road", 
          "Summer Avenue", "Airways Boulevard", "Third Street", "Winchester Road",
          "Germantown Parkway", "Shelby Drive", "Riverside Drive", "Front Street",
          "McLean Boulevard", "Lamar Avenue", "Belvedere Boulevard", "Mississippi Boulevard"
        ];
        
        const trafficConditions = [
          "slow moving traffic", "accident causing delays", "road work ahead",
          "congestion building up", "vehicle breakdown", "police activity",
          "event traffic", "debris on road", "flooding reported"
        ];
        
        const randomRoad = memphisRoads[Math.floor(Math.random() * memphisRoads.length)];
        const randomCondition = trafficConditions[Math.floor(Math.random() * trafficConditions.length)];
        
        // Create traffic update element
        const trafficUpdate = document.createElement('div');
        trafficUpdate.className = 'fixed top-16 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-full text-sm z-50 animate-fade-in dark:bg-black/80';
        trafficUpdate.innerHTML = `<span class="font-bold">Traffic Alert:</span> ${randomRoad} - ${randomCondition}`;
        
        document.body.appendChild(trafficUpdate);
        
        // Remove after 5 seconds
        setTimeout(() => {
          trafficUpdate.classList.add('animate-fade-out');
          setTimeout(() => {
            document.body.removeChild(trafficUpdate);
          }, 300);
        }, 5000);
      }
    }, 15000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(trafficTimer);
    };
  }, [interactive]);
  
  // Map dragging functionality
  const handleMouseDown = (e) => {
    if (!interactive) return;
    setIsDragging(true);
    setStartPos({ x: e.clientX - mapPosition.x, y: e.clientY - mapPosition.y });
  };
  
  const handleTouchStart = (e) => {
    if (!interactive) return;
    setIsDragging(true);
    const touch = e.touches[0];
    setStartPos({ x: touch.clientX - mapPosition.x, y: touch.clientY - mapPosition.y });
  };
  
  const handleMouseMove = (e) => {
    if (!isDragging || !interactive) return;
    setMapPosition({ 
      x: e.clientX - startPos.x, 
      y: e.clientY - startPos.y 
    });
  };
  
  const handleTouchMove = (e) => {
    if (!isDragging || !interactive) return;
    const touch = e.touches[0];
    setMapPosition({ 
      x: touch.clientX - startPos.x, 
      y: touch.clientY - startPos.y 
    });
    e.preventDefault(); // Prevent scrolling while dragging
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  const handleTouchEnd = () => {
    setIsDragging(false);
  };
  
  useEffect(() => {
    if (interactive) {
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchend', handleTouchEnd);
      
      return () => {
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
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
  
  const handleShowDirections = (stationId) => {
    setSelectedStation(stationId);
    setShowDirections(true);
    setRouteProgress(0); // Reset route progress to animate from beginning
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
  
  // Get traffic color based on intensity
  const getTrafficColor = () => {
    switch(trafficIntensity) {
      case "light":
        return "#4ade80"; // green
      case "moderate":
        return "#facc15"; // yellow
      case "heavy":
        return "#ef4444"; // red
      default:
        return "#4ade80";
    }
  };
  
  const mapStyles = {
    transform: interactive ? `translate(${mapPosition.x}px, ${mapPosition.y}px) scale(${zoom/14})` : `scale(${zoom/14})`,
    cursor: isDragging ? 'grabbing' : (interactive ? 'grab' : 'default'),
    transition: isDragging ? 'none' : 'transform 0.3s ease-out'
  };
  
  return (
    <div className={`relative w-full bg-muted/10 overflow-hidden rounded-xl ${className}`}>
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
          <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <div 
            ref={mapRef}
            className="absolute inset-0 flex items-center justify-center overflow-hidden"
            style={mapStyles}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
          >
            <img 
              src="/lovable-uploads/891b4ea8-4791-4eaa-b7b8-39f843bc1b68.png" 
              alt="Memphis Map" 
              className="w-full h-full object-cover"
              draggable="false"
            />
            
            {/* User location blue dot */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="relative">
                <div className="h-5 w-5 bg-blue-500 rounded-full border-2 border-white"></div>
                <div className="absolute inset-0 h-5 w-5 bg-blue-500/50 rounded-full animate-ping opacity-75"></div>
              </div>
            </div>
            
            {/* Driver location marker */}
            {(showRoute || showDeliveryInfo) && (
              <div 
                className="absolute z-30 transition-all duration-700"
                style={{
                  top: `${50 - (currentDriverLocation.lat - userLocation.lat) * 5000}%`,
                  left: `${50 + (currentDriverLocation.lng - userLocation.lng) * 5000}%`
                }}
              >
                <div className="relative">
                  <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg animate-pulse-slow">
                    <User className="h-5 w-5 text-black" />
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 whitespace-nowrap mt-1 bg-black/70 text-xs py-1 px-2 rounded">
                    {driverName}
                  </div>
                </div>
              </div>
            )}
            
            {/* Gas station markers */}
            {gasStations.map((station) => {
              // Calculate position on the map (this is simplified)
              const latDiff = station.position.lat - userLocation.lat;
              const lngDiff = station.position.lng - userLocation.lng;
              const scale = 50; // Adjust based on zoom level for a real implementation
              
              const top = `${50 - latDiff * scale}%`;
              const left = `${50 + lngDiff * scale}%`;
              
              return (
                <div
                  key={station.id}
                  className="absolute z-20 hover:scale-110 transition-transform duration-300"
                  style={{ top, left }}
                >
                  <div className="relative">
                    <div className="h-10 w-10 flex items-center justify-center">
                      <div className="bg-white rounded-full p-1 shadow-lg">
                        <Link to={`/station/${station.id}`}>
                          <div className="bg-red-500 h-6 w-6 rounded-full flex items-center justify-center">
                            <MapPin className="h-4 w-4 text-white" />
                          </div>
                        </Link>
                      </div>
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 whitespace-nowrap mt-1 bg-black/70 text-white text-xs py-1 px-2 rounded">
                      {station.name} - ${station.price}
                    </div>
                    
                    {interactive && (
                      <button 
                        onClick={() => handleShowDirections(station.id)}
                        className="absolute -top-1 -right-1 bg-green-500 rounded-full h-5 w-5 flex items-center justify-center shadow-lg"
                      >
                        <Navigation className="h-3 w-3 text-white" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
            
            {/* Route path if enabled - ENHANCED WITH ANIMATION */}
            {(showRoute || showDirections) && (
              <div className="absolute inset-0 pointer-events-none">
                <svg width="100%" height="100%" className="absolute">
                  {/* Animated route path with dasharray animation and progress */}
                  <path
                    d={`M${50 + (currentDriverLocation.lng - userLocation.lng) * 5000}%,${50 - (currentDriverLocation.lat - userLocation.lat) * 5000}% C550,320 480,340 420,330 C360,320 320,280 250,300`}
                    stroke={getTrafficColor()}
                    strokeWidth="6"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray="10,10"
                    className="animate-dash"
                    style={{
                      strokeDashoffset: 100 - routeProgress,
                      opacity: animatedRoute ? 1 : 0,
                      transition: "opacity 0.5s ease-in"
                    }}
                  />
                  
                  {/* Direction arrows along the path - appear progressively */}
                  {routeProgress > 25 && (
                    <circle 
                      cx="550" cy="315" r="4" 
                      fill={getTrafficColor()} 
                      style={{animation: "fade-in 0.5s ease-out"}}
                    />
                  )}
                  {routeProgress > 50 && (
                    <polygon 
                      points="480,335 490,325 470,325" 
                      fill={getTrafficColor()} 
                      style={{animation: "fade-in 0.5s ease-out"}}
                    />
                  )}
                  {routeProgress > 75 && (
                    <circle 
                      cx="360" cy="320" r="4" 
                      fill={getTrafficColor()} 
                      style={{animation: "fade-in 0.5s ease-out"}}
                    />
                  )}
                  {routeProgress > 90 && (
                    <polygon 
                      points="250,300 260,290 260,310" 
                      fill={getTrafficColor()} 
                      style={{animation: "fade-in 0.5s ease-out"}}
                    />
                  )}
                  
                  {/* Animated driver position along the path */}
                  {animatedRoute && (
                    <circle
                      cx="550" 
                      cy="315"
                      r="6"
                      fill="#ffffff"
                      stroke="#22c55e"
                      strokeWidth="3"
                      style={{
                        transform: `translate(${(100 - routeProgress) * -3}px, ${(100 - routeProgress) * 0.15}px)`,
                        transition: "transform 0.5s linear",
                        display: routeProgress > 0 ? "block" : "none"
                      }}
                    />
                  )}
                </svg>
                
                {/* Direction instructions - now with animated appearance */}
                {showDirections && (
                  <div 
                    className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-sm text-white text-sm p-3 rounded-lg"
                    style={{
                      animation: "slide-in-right 0.5s ease-out",
                      transform: routeProgress > 0 ? "translateY(0)" : "translateY(100%)",
                      opacity: routeProgress > 0 ? 1 : 0,
                      transition: "transform 0.5s ease-out, opacity 0.5s ease-out"
                    }}
                  >
                    <div className="flex items-center mb-2">
                      <Navigation className="h-4 w-4 mr-2 text-green-500" />
                      <span>Head south on Main St for 0.5 miles</span>
                    </div>
                    <div 
                      className="flex items-center mb-2"
                      style={{
                        opacity: routeProgress > 30 ? 1 : 0.5,
                        transition: "opacity 0.5s ease-out"
                      }}
                    >
                      <ArrowDownRight className="h-4 w-4 mr-2 text-green-500" />
                      <span>Turn right onto Popular Ave for 0.3 miles</span>
                    </div>
                    <div 
                      className="flex items-center"
                      style={{
                        opacity: routeProgress > 60 ? 1 : 0.5,
                        transition: "opacity 0.5s ease-out"
                      }}
                    >
                      <MapPin className="h-4 w-4 mr-2 text-red-500" />
                      <span>Arrive at destination on right</span>
                    </div>
                    <div className="mt-2 text-xs flex items-center justify-between">
                      <span>ETA: 8 min (0.8 miles)</span>
                      <div className="w-20 bg-gray-700 h-1 rounded-full overflow-hidden">
                        <div 
                          className="bg-green-500 h-full rounded-full"
                          style={{ width: `${routeProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Map controls */}
          <div className="absolute bottom-20 left-4 flex flex-col space-y-2">
            <button 
              onClick={handleZoomIn}
              className="h-10 w-10 rounded-full bg-white text-black flex items-center justify-center shadow-lg hover:bg-gray-100 active:scale-95 transition-all"
            >
              <Plus className="h-5 w-5" />
            </button>
            <button 
              onClick={handleZoomOut}
              className="h-10 w-10 rounded-full bg-white text-black flex items-center justify-center shadow-lg hover:bg-gray-100 active:scale-95 transition-all"
            >
              <Minus className="h-5 w-5" />
            </button>
          </div>
          
          {/* Navigation and Share buttons */}
          <div className="absolute bottom-4 right-4 flex space-x-2">
            {showRoute && (
              <button 
                onClick={() => setShowDirections(!showDirections)}
                className="h-10 w-10 rounded-full bg-white text-black flex items-center justify-center shadow-lg hover:bg-gray-100 active:scale-95 transition-all"
              >
                <Navigation className="h-5 w-5" />
              </button>
            )}
            <button 
              onClick={handleShare}
              className="h-10 w-10 rounded-full bg-white text-black flex items-center justify-center shadow-lg relative hover:bg-gray-100 active:scale-95 transition-all"
            >
              <Share2 className="h-5 w-5" />
              
              {/* Share options popup */}
              {showShareOptions && (
                <div className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-lg p-3 animate-fade-in dark:bg-gray-800">
                  <div className="flex space-x-3">
                    <button 
                      onClick={() => shareToSocial('facebook')}
                      className="h-10 w-10 rounded-full bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600 active:scale-95 transition-all"
                    >
                      <Facebook className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => shareToSocial('twitter')}
                      className="h-10 w-10 rounded-full bg-blue-400 text-white flex items-center justify-center hover:bg-blue-500 active:scale-95 transition-all"
                    >
                      <Twitter className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => shareToSocial('instagram')}
                      className="h-10 w-10 rounded-full bg-pink-500 text-white flex items-center justify-center hover:bg-pink-600 active:scale-95 transition-all"
                    >
                      <Instagram className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => shareToSocial('email')}
                      className="h-10 w-10 rounded-full bg-gray-500 text-white flex items-center justify-center hover:bg-gray-600 active:scale-95 transition-all"
                    >
                      <Mail className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="w-2 h-2 bg-white absolute bottom-0 right-4 transform translate-y-1 rotate-45 dark:bg-gray-800"></div>
                </div>
              )}
            </button>
          </div>
          
          {/* Back button - only show on non-home pages */}
          {showBackButton && !isHomePage && (
            <button 
              className="absolute top-4 left-4 h-10 w-10 rounded-full bg-white text-black flex items-center justify-center shadow-lg hover:bg-gray-100 active:scale-95 transition-all z-30"
              onClick={handleGoBack}
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          )}
          
          {interactive && (
            <button 
              className="absolute right-4 top-4 h-10 w-10 rounded-full bg-white text-black flex items-center justify-center shadow-lg hover:bg-gray-100 active:scale-95 transition-all"
              onClick={() => setUserLocation({ lat: 35.1495, lng: -90.0490 })}
            >
              <Locate className="h-5 w-5" />
            </button>
          )}
          
          {/* Traffic incident indicator */}
          {trafficIntensity === "heavy" && (
            <div className="absolute top-16 right-4 bg-red-500 text-white text-xs p-2 rounded-lg animate-pulse shadow-lg flex items-center">
              <span className="mr-1">⚠️</span> Heavy traffic on I-240
            </div>
          )}
          
          {/* Delivery info with updated driver avatar */}
          {showDeliveryInfo && (
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur-sm rounded-t-xl">
              <div className="flex items-center mb-2">
                <div className="h-14 w-14 rounded-full bg-green-500 flex items-center justify-center border-2 border-green-500 mr-3 text-black">
                  <User className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{driverName}</h3>
                  <p className="text-muted-foreground">Memphis, TN</p>
                </div>
                <div className="ml-auto flex space-x-2">
                  <Link to={`/chat?driverName=${encodeURIComponent(driverName)}`}>
                    <button className="h-12 w-12 flex items-center justify-center rounded-full bg-green-500">
                      <MessageCircle className="h-6 w-6 text-black" />
                    </button>
                  </Link>
                  <Link to={`/call?driverName=${encodeURIComponent(driverName)}`}>
                    <button className="h-12 w-12 flex items-center justify-center rounded-full bg-green-500">
                      <Phone className="h-6 w-6 text-black" />
                    </button>
                  </Link>
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
