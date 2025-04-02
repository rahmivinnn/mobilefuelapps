import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MapPin, Plus, Minus, Navigation, Locate, Share2, Facebook, Twitter, Instagram, Mail, MessageCircle, Phone, ArrowUpRight, ArrowDownRight, ArrowUpLeft, ArrowDownLeft, ArrowLeft, User, Car, Truck } from 'lucide-react';
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
  const [showMapLayers, setShowMapLayers] = useState(false);
  const [activeLayer, setActiveLayer] = useState("standard");
  const [showNearbyFuelStations, setShowNearbyFuelStations] = useState(true);
  const [showRestaurants, setShowRestaurants] = useState(false);
  const [showATMs, setShowATMs] = useState(false);
  const [is3DMode, setIs3DMode] = useState(false);
  const [viewMode, setViewMode] = useState("map"); // "map", "satellite", "terrain"
  const [nightMode, setNightMode] = useState(false);
  
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
      }, 1500);
      
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
  
  // Toggle 3D mode
  const toggle3DMode = () => {
    setIs3DMode(!is3DMode);
  };
  
  // Toggle night mode
  const toggleNightMode = () => {
    setNightMode(!nightMode);
  };
  
  // Change view mode
  const changeViewMode = (mode) => {
    setViewMode(mode);
    setShowMapLayers(false);
  };
  
  // Gas station data for Memphis
  const gasStations = [
    { 
      id: '1', 
      name: 'Shell', 
      position: { lat: 35.1477, lng: -90.0518 }, 
      price: 3.67, 
      distance: '0.8',
      type: 'gas'
    },
    { 
      id: '2', 
      name: 'ExxonMobil', 
      position: { lat: 35.1513, lng: -90.0425 }, 
      price: 3.72, 
      distance: '1.5',
      type: 'gas'
    },
    { 
      id: '3', 
      name: 'Chevron', 
      position: { lat: 35.1448, lng: -90.0561 }, 
      price: 3.65, 
      distance: '2.3',
      type: 'gas'
    },
    { 
      id: '4', 
      name: 'BP', 
      position: { lat: 35.1532, lng: -90.0389 }, 
      price: 3.69, 
      distance: '2.7',
      type: 'gas' 
    },
  ];
  
  // Restaurant data
  const restaurants = [
    { 
      id: 'r1', 
      name: 'Gus\'s Fried Chicken', 
      position: { lat: 35.1458, lng: -90.0508 },
      type: 'restaurant'
    },
    { 
      id: 'r2', 
      name: 'Central BBQ', 
      position: { lat: 35.1502, lng: -90.0415 },
      type: 'restaurant'
    },
  ];
  
  // ATM data
  const atms = [
    { 
      id: 'a1', 
      name: 'Bank of America ATM', 
      position: { lat: 35.1467, lng: -90.0498 },
      type: 'atm'
    },
    { 
      id: 'a2', 
      name: 'Wells Fargo ATM', 
      position: { lat: 35.1522, lng: -90.0435 },
      type: 'atm'
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
    
    // Simulate traffic changes - reduced to 10 seconds
    const trafficTimer = setInterval(() => {
      const intensities = ["light", "moderate", "heavy"];
      const randomIntensity = intensities[Math.floor(Math.random() * intensities.length)];
      setTrafficIntensity(randomIntensity);
      
      // Generate random traffic update
      if (typeof window !== 'undefined' && interactive) {
        const memphisRoads = [
          "Poplar Avenue", "Union Avenue", "Sam Cooper Boulevard", "I-240", 
          "I-40", "Madison Avenue", "E Parkway", "Walnut Grove Road"
        ];
        
        const trafficConditions = [
          "slow moving traffic", "accident causing delays", "road work ahead",
          "congestion building up"
        ];
        
        const randomRoad = memphisRoads[Math.floor(Math.random() * memphisRoads.length)];
        const randomCondition = trafficConditions[Math.floor(Math.random() * trafficConditions.length)];
        
        // Create traffic update element
        const trafficUpdate = document.createElement('div');
        trafficUpdate.className = 'fixed top-16 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-full text-sm z-50 animate-fade-in dark:bg-black/80';
        trafficUpdate.innerHTML = `<span class="font-bold">Traffic Alert:</span> ${randomRoad} - ${randomCondition}`;
        
        document.body.appendChild(trafficUpdate);
        
        // Remove after 4 seconds
        setTimeout(() => {
          trafficUpdate.classList.add('animate-fade-out');
          setTimeout(() => {
            document.body.removeChild(trafficUpdate);
          }, 300);
        }, 4000);
      }
    }, 10000);
    
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
  
  // Get map image based on view mode and night mode
  const getMapImage = () => {
    if (viewMode === "satellite") {
      return "/lovable-uploads/8baf7fa9-2b5c-4335-b69b-eefef9610e3a.png"; // Satellite view
    } else if (viewMode === "terrain") {
      return "/lovable-uploads/a3df03b1-a154-407f-b8fe-e5dd6f0bade3.png"; // Terrain view
    } else {
      // Standard view
      return nightMode 
        ? "/lovable-uploads/63b42fc8-62eb-4bdb-84c2-73e747d69d45.png" // Night mode
        : "/lovable-uploads/891b4ea8-4791-4eaa-b7b8-39f843bc1b68.png"; // Day mode
    }
  };
  
  // FIX: Use proper CSSProperties type for transformStyle
  const mapStyles: React.CSSProperties = {
    transform: interactive 
      ? `translate(${mapPosition.x}px, ${mapPosition.y}px) scale(${zoom/14}) ${is3DMode ? 'rotateX(45deg)' : ''}`
      : `scale(${zoom/14}) ${is3DMode ? 'rotateX(45deg)' : ''}`,
    cursor: isDragging ? 'grabbing' : (interactive ? 'grab' : 'default'),
    transition: isDragging ? 'none' : 'transform 0.3s ease-out',
    perspective: is3DMode ? '1000px' : 'none',
    // Fix: Use the correct enum value for transformStyle
    transformStyle: is3DMode ? 'preserve-3d' : 'flat'
  };
  
  // Determine what POIs to show
  const getPointsOfInterest = () => {
    let pois = [];
    
    if (showNearbyFuelStations) {
      pois = [...pois, ...gasStations];
    }
    
    if (showRestaurants) {
      pois = [...pois, ...restaurants];
    }
    
    if (showATMs) {
      pois = [...pois, ...atms];
    }
    
    return pois;
  };
  
  const getPOIIcon = (poiType) => {
    switch(poiType) {
      case 'gas':
        return <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 7h-1c-1 0-2-1-2-2V4c0-1 1-2 2-2h1v5zM4 22V5c0-1.66 1.34-3 3-3h7c1.66 0 3 1.34 3 3v17H4zm3-10h7M4 5h13" />
        </svg>;
      case 'restaurant':
        return <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 19h18m-9-13v13M6 6l.001 5c0 1 1 2 2 2h1M12 7c0-1 .6-2 2-2h.6c.96 0 1.4 0 1.4 3 0 .667 0 2-1 2h-3" />
        </svg>;
      case 'atm':
        return <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2 7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7z" />
          <path d="M12 14c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
          <path d="M17 3v4M7 3v4M17 17v4M7 17v4" />
        </svg>;
      default:
        return <MapPin className="h-4 w-4 text-white" />;
    }
  };
  
  const getPOIColor = (poiType) => {
    switch(poiType) {
      case 'gas':
        return "bg-red-500";
      case 'restaurant':
        return "bg-blue-500";
      case 'atm':
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
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
              src={getMapImage()}
              alt="Map View" 
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
                  left: `${50 + (currentDriverLocation.lng - userLocation.lng) * 5000}%`,
                  transform: is3DMode ? 'translateZ(20px)' : 'none'
                }}
              >
                <div className="relative">
                  <div className="h-12 w-12 bg-green-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg animate-pulse-slow">
                    <Car className="h-6 w-6 text-black" />
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 whitespace-nowrap mt-1 bg-black/70 text-xs py-1 px-2 rounded">
                    {driverName}
                  </div>
                </div>
              </div>
            )}
            
            {/* Points of Interest markers */}
            {getPointsOfInterest().map((poi) => {
              // Calculate position on the map
              const latDiff = poi.position.lat - userLocation.lat;
              const lngDiff = poi.position.lng - userLocation.lng;
              const scale = 50; // Adjust based on zoom level for a real implementation
              
              const top = `${50 - latDiff * scale}%`;
              const left = `${50 + lngDiff * scale}%`;
              
              return (
                <div
                  key={poi.id}
                  className="absolute z-20 hover:scale-110 transition-transform duration-300"
                  style={{ top, left, transform: is3DMode ? 'translateZ(10px)' : 'none' }}
                >
                  <div className="relative">
                    <div className="h-10 w-10 flex items-center justify-center">
                      <div className="bg-white rounded-full p-1 shadow-lg">
                        <Link to={`/station/${poi.id}`}>
                          <div className={`${getPOIColor(poi.type)} h-7 w-7 rounded-full flex items-center justify-center ${is3DMode ? 'shadow-xl' : ''}`}>
                            {getPOIIcon(poi.type)}
                          </div>
                        </Link>
                      </div>
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 whitespace-nowrap mt-1 bg-black/70 text-white text-xs py-1 px-2 rounded">
                      {poi.name} {poi.price ? `- $${poi.price}` : ''}
                    </div>
                    
                    {interactive && (
                      <button 
                        onClick={() => handleShowDirections(poi.id)}
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
            
            {/* 3D Buildings in 3D mode */}
            {is3DMode && (
              <>
                <div className="absolute" style={{ 
                  top: '45%', 
                  left: '48%', 
                  width: '40px', 
                  height: '40px', 
                  backgroundColor: '#444',
                  transform: 'translateZ(30px)',
                  boxShadow: '0 0 10px rgba(0,0,0,0.5)'
                }}></div>
                <div className="absolute" style={{ 
                  top: '42%', 
                  left: '52%', 
                  width: '30px', 
                  height: '50px', 
                  backgroundColor: '#555',
                  transform: 'translateZ(40px)',
                  boxShadow: '0 0 10px rgba(0,0,0,0.5)'
                }}></div>
                <div className="absolute" style={{ 
                  top: '48%', 
                  left: '45%', 
                  width: '25px', 
                  height: '25px', 
                  backgroundColor: '#666',
                  transform: 'translateZ(20px)',
                  boxShadow: '0 0 10px rgba(0,0,0,0.5)'
                }}></div>
              </>
            )}
          </div>
          
          {/* Map controls */}
          {interactive && (
            <>
              {/* Zoom Controls */}
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
              
              {/* Map Layers Button */}
              <div className="absolute top-16 right-4">
                <button 
                  onClick={() => setShowMapLayers(!showMapLayers)}
                  className="h-10 w-10 rounded-full bg-white text-black flex items-center justify-center shadow-lg hover:bg-gray-100 active:scale-95 transition-all"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M2 17L12 22L22 17M2 12L12 17L22 12M2 7L12 12L22 7L12 2L2 7Z" />
                  </svg>
                </button>
                
                {/* Map Layers Dropdown */}
                {showMapLayers && (
                  <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg p-3 animate-fade-in dark:bg-gray-800 z-50">
                    <div className="text-sm font-semibold mb-2 text-black dark:text-white">Map View</div>
                    <div className="flex flex-col space-y-2">
                      <button 
                        onClick={() => changeViewMode("standard")}
                        className={`flex items-center px-3 py-2 rounded-md text-sm ${viewMode === "standard" ? "bg-green-500 text-white" : "text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"}`}
                      >
                        <svg viewBox="0 0 24 24" className="h-4 w-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M3 7L12 3L21 7V17L12 21L3 17V7Z" />
                          <path d="M12 3V21" />
                          <path d="M3 7L21 7" />
                        </svg>
                        Standard
                      </button>
                      <button 
                        onClick={() => changeViewMode("satellite")}
                        className={`flex items-center px-3 py-2 rounded-md text-sm ${viewMode === "satellite" ? "bg-green-500 text-white" : "text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"}`}
                      >
                        <svg viewBox="0 0 24 24" className="h-4 w-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 2V22" />
                          <path d="M2 12H22" />
                        </svg>
                        Satellite
                      </button>
                      <button 
                        onClick={() => changeViewMode("terrain")}
                        className={`flex items-center px-3 py-2 rounded-md text-sm ${viewMode === "terrain" ? "bg-green-500 text-white" : "text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"}`}
                      >
                        <svg viewBox="0 0 24 24" className="h-4 w-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                        </svg>
                        Terrain
                      </button>
                      
                      <div className="border-t my-2 dark:border-gray-700"></div>
                      
                      <div className="text-sm font-semibold mb-1 text-black dark:text-white">Display Options</div>
                      
                      {/* 3D Mode Toggle */}
                      <div className="flex items-center justify-between py-1 text-sm text-black dark:text-white">
                        <span className="flex items-center">
                          <svg viewBox="0 0 24 24" className="h-4 w-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
                            <path d="M2 12H22" />
                            <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" />
                          </svg>
                          3D Buildings
                        </span>
                        <button 
                          onClick={toggle3DMode}
                          className={`relative inline-flex items-center h-5 rounded-full w-10 ${is3DMode ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}
                        >
                          <span className={`inline-block w-4 h-4 transform transition ease-in-out duration-200 rounded-full bg-white ${is3DMode ? 'translate-x-5' : 'translate-x-1'}`} />
                        </button>
                      </div>
                      
                      {/* Night Mode Toggle */}
                      <div className="flex items-center justify-between py-1 text-sm text-black dark:text-white">
                        <span className="flex items-center">
                          <svg viewBox="0 0 24 24" className="h-4 w-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                          </svg>
                          Night Mode
                        </span>
                        <button 
                          onClick={toggleNightMode}
                          className={`relative inline-flex items-center h-5 rounded-full w-10 ${nightMode ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}
                        >
                          <span className={`inline-block w-4 h-4 transform transition ease-in-out duration-200 rounded-full bg-white ${nightMode ? 'translate-x-5' : 'translate-x-1'}`} />
                        </button>
                      </div>
                      
                      <div className="border-t my-2 dark:border-gray-700"></div>
                      
                      <div className="text-sm font-semibold mb-1 text-black dark:text-white">Places</div>
                      
                      {/* Gas Stations Toggle */}
                      <div className="flex items-center justify-between py-1 text-sm text-black dark:text-white">
                        <span className="flex items-center">
                          <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 7h-1c-1 0-2-1-2-2V4c0-1 1-2 2-2h1v5zM4 22V5c0-1.66 1.34-3 3-3h7c1.66 0 3 1.34 3 3v17H4zm3-10h7M4 5h13" />
                          </svg>
                          Gas Stations
                        </span>
                        <button 
                          onClick={() => setShowNearbyFuelStations(!showNearbyFuelStations)}
                          className={`relative inline-flex items-center h-5 rounded-full w-10 ${showNearbyFuelStations ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}
                        >
                          <span className={`inline-block w-4 h-4 transform transition ease-in-out duration-200 rounded-full bg-white ${showNearbyFuelStations ? 'translate-x-5' : 'translate-x-1'}`} />
                        </button>
                      </div>
                      
                      {/* Restaurants Toggle */}
                      <div className="flex items-center justify-between py-1 text-sm text-black dark:text-white">
                        <span className="flex items-center">
                          <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 19h18m-9-13v13M6 6l.001 5c0 1 1 2 2 2h1M12 7c0-1 .6-2 2-2h.6c.96 0 1.4 0 1.4 3 0 .667 0 2-1 2h-3" />
                          </svg>
                          Restaurants
                        </span>
                        <button 
                          onClick={() => setShowRestaurants(!showRestaurants)}
                          className={`relative inline-flex items-center h-5 rounded-full w-10 ${showRestaurants ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}
                        >
                          <span className={`inline-block w-4 h-4 transform transition ease-in-out duration-200 rounded-full bg-white ${showRestaurants ? 'translate-x-5' : 'translate-x-1'}`} />
                        </button>
                      </div>
                      
                      {/* ATMs Toggle */}
                      <div className="flex items-center justify-between py-1 text-sm text-black dark:text-white">
                        <span className="flex items-center">
                          <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M2 7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7z" />
                            <path d="M12 14c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
                            <path d="M17 3v4M7 3v4M17 17v4M7 17v4" />
                          </svg>
                          ATMs
                        </span>
                        <button 
                          onClick={() => setShowATMs(!showATMs)}
                          className={`relative inline-flex items-center h-5 rounded-full w-10 ${showATMs ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}
                        >
                          <span className={`inline-block w-4 h-4 transform transition ease-in-out duration-200 rounded-full bg-white ${showATMs ? 'translate-x-5' : 'translate-x-1'}`} />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
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
            </>
          )}
          
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
            <div className="absolute top-16 left-4 bg-red-500 text-white text-xs p-2 rounded-lg animate-pulse shadow-lg flex items-center">
              <span className="mr-1">⚠️</span> Heavy traffic on I-240
            </div>
          )}
          
          {/* Delivery info with updated driver avatar */}
          {showDeliveryInfo && (
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur-sm rounded-t-xl">
              <div className="flex items-center mb-2">
                <div className="h-14 w-14 rounded-full bg-green-500 flex items-center justify-center border-2 border-green-500 mr-3 text-black">
                  <Car className="h-8 w-8" />
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
                    <Car className="h-3 w-3 text-black" />
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
