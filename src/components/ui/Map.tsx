
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
  driverInfo?: {
    name: string;
    image: string;
    location: string;
  };
}

const Map: React.FC<MapProps> = ({ 
  className, 
  showRoute = false, 
  showDeliveryInfo = false,
  interactive = false,
  showBackButton = true,
  driverInfo
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const mapRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(14);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userLocation, setUserLocation] = useState({ lat: 35.1495, lng: -90.0490 }); // Memphis coordinates
  const [trafficIntensity, setTrafficIntensity] = useState("moderate");
  const [showDirections, setShowDirections] = useState(false);
  const [selectedStation, setSelectedStation] = useState(null);
  const [mapPosition, setMapPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  
  // Driver location animation - only active when showRoute is true (TrackOrder page)
  const [driverPosition, setDriverPosition] = useState({ x: 200, y: 400 });
  const [routeProgress, setRouteProgress] = useState(0);
  
  // Hide back button on home page
  const isHomePage = location.pathname === '/';
  const isTrackOrderPage = location.pathname === '/track';

  const handleGoBack = () => {
    navigate(-1);
  };
  
  // Memphis neighborhoods and landmarks for more realistic updates
  const memphisLocations = [
    "Downtown Memphis", "Midtown", "Cooper-Young", "Overton Square", 
    "Beale Street", "Harbor Town", "South Bluffs", "Mud Island",
    "South Main Arts District", "Victorian Village", "The Pinch District",
    "Memphis Medical District", "FedExForum area", "Crosstown Concourse",
    "East Memphis", "University District", "Orange Mound", "Binghampton",
    "Shelby Farms Park", "Germantown Parkway"
  ];
  
  // Memphis roads for traffic updates
  const memphisRoads = [
    "Poplar Avenue", "Union Avenue", "Sam Cooper Boulevard", "I-240", 
    "I-40", "Madison Avenue", "E Parkway", "Walnut Grove Road", 
    "Summer Avenue", "Airways Boulevard", "Third Street", "Winchester Road",
    "Germantown Parkway", "Shelby Drive", "Riverside Drive", "Front Street",
    "McLean Boulevard", "Lamar Avenue", "Belvedere Boulevard", "Mississippi Boulevard"
  ];
  
  // Traffic conditions and events
  const trafficConditions = [
    "slow moving traffic", "accident causing delays", "road work ahead",
    "congestion building up", "vehicle breakdown", "police activity",
    "event traffic", "debris on road", "flooding reported"
  ];
  
  // Delivery update messages
  const deliveryMessages = [
    "Driver is picking up your order now",
    "Driver has your order and is heading your way",
    "Driver is navigating through traffic",
    "Driver is taking the fastest route to your location",
    "Driver will arrive at your location soon",
    "Your driver is making good time",
    "Driver is about 10 minutes away",
    "Driver is about 5 minutes away",
    "Driver is approaching your location",
    "Driver has arrived at the pickup location",
    "Your fuel is being loaded now",
    "Your order is on its way",
    "Driver is passing through {location} area",
    "Driver is on {road} heading towards you",
    "Driver is taking a slight detour to avoid traffic on {road}",
    "Driver is about to turn onto your street"
  ];
  
  // Route coordinates (simplified for visualization)
  const routePoints = [
    { x: 200, y: 400 },
    { x: 250, y: 350 },
    { x: 300, y: 320 },
    { x: 350, y: 300 },
    { x: 400, y: 320 },
    { x: 450, y: 350 },
    { x: 500, y: 300 },
    { x: 500, y: 250 }
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
    
    // Simulate traffic changes
    const trafficTimer = setInterval(() => {
      const intensities = ["light", "moderate", "heavy"];
      const randomIntensity = intensities[Math.floor(Math.random() * intensities.length)];
      setTrafficIntensity(randomIntensity);
      
      // Generate random traffic update
      if (typeof window !== 'undefined' && showRoute) {
        const randomRoad = memphisRoads[Math.floor(Math.random() * memphisRoads.length)];
        const randomCondition = trafficConditions[Math.floor(Math.random() * trafficConditions.length)];
        
        // Create traffic update element
        const trafficUpdate = document.createElement('div');
        trafficUpdate.className = 'fixed top-16 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-full text-sm z-50 animate-fade-in';
        trafficUpdate.innerHTML = `<span class="font-bold">Traffic Alert:</span> ${randomRoad} - ${randomCondition}`;
        
        document.body.appendChild(trafficUpdate);
        
        // Remove after 5 seconds
        setTimeout(() => {
          trafficUpdate.classList.add('animate-fade-out');
          setTimeout(() => {
            if (document.body.contains(trafficUpdate)) {
              document.body.removeChild(trafficUpdate);
            }
          }, 300);
        }, 5000);
      }
    }, 20000); // Traffic updates every 20 seconds
    
    // Driver movement animation - ONLY FOR TRACK ORDER PAGE
    let currentPointIndex = 0;
    let driverTimer;
    
    if (showRoute) {
      const moveDriver = () => {
        if (currentPointIndex < routePoints.length - 1) {
          const startPoint = routePoints[currentPointIndex];
          const endPoint = routePoints[currentPointIndex + 1];
          
          // Calculate progress along current segment (0 to 1)
          const segmentProgress = routeProgress - currentPointIndex;
          
          // Interpolate position
          const newX = startPoint.x + (endPoint.x - startPoint.x) * segmentProgress;
          const newY = startPoint.y + (endPoint.y - startPoint.y) * segmentProgress;
          
          setDriverPosition({ x: newX, y: newY });
          
          // Update overall route progress
          setRouteProgress(prevProgress => {
            const newProgress = prevProgress + 0.01;
            
            // If reached next point, increment current point index
            if (newProgress >= currentPointIndex + 1) {
              currentPointIndex = Math.floor(newProgress);
            }
            
            // Reset when complete
            if (newProgress >= routePoints.length - 1) {
              return 0;
            }
            
            return newProgress;
          });
        } else {
          // Reset animation when complete
          currentPointIndex = 0;
          setRouteProgress(0);
        }
      };
      
      // Driver movement update interval - only for tracking page
      driverTimer = setInterval(moveDriver, 100);
    }
    
    // Driver status updates - ONLY FOR TRACK ORDER PAGE
    let driverUpdateTimer;
    
    if (showRoute) {
      driverUpdateTimer = setInterval(() => {
        // Random message for driver update
        let message = deliveryMessages[Math.floor(Math.random() * deliveryMessages.length)];
        
        // Replace placeholders with actual Memphis locations/roads
        if (message.includes("{location}")) {
          const randomLocation = memphisLocations[Math.floor(Math.random() * memphisLocations.length)];
          message = message.replace("{location}", randomLocation);
        }
        
        if (message.includes("{road}")) {
          const randomRoad = memphisRoads[Math.floor(Math.random() * memphisRoads.length)];
          message = message.replace("{road}", randomRoad);
        }
        
        // Create driver update notification
        const driverUpdate = document.createElement('div');
        driverUpdate.className = 'fixed bottom-32 left-1/2 transform -translate-x-1/2 bg-green-500 text-black px-4 py-2 rounded-full text-sm z-50 animate-fade-in';
        
        // Use driver name if available
        const driverName = driverInfo?.name || "Your driver";
        driverUpdate.innerHTML = `<span class="font-bold">${driverName}:</span> ${message}`;
        
        document.body.appendChild(driverUpdate);
        
        // Remove after 4 seconds
        setTimeout(() => {
          driverUpdate.classList.add('animate-fade-out');
          setTimeout(() => {
            if (document.body.contains(driverUpdate)) {
              document.body.removeChild(driverUpdate);
            }
          }, 300);
        }, 4000);
      }, 10000); // Driver updates every 10 seconds
    }
    
    return () => {
      clearTimeout(timer);
      clearInterval(trafficTimer);
      if (driverTimer) clearInterval(driverTimer);
      if (driverUpdateTimer) clearInterval(driverUpdateTimer);
    };
  }, [interactive, showRoute, driverInfo]);
  
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
            {/* Memphis Map Background */}
            <img 
              src="/lovable-uploads/79dad56a-54cd-4a41-b420-9798ba1ff0bd.png" 
              alt="Memphis Map" 
              className="w-full h-full object-cover"
              draggable="false"
            />
            
            {/* Driver Position - Animated - ONLY ON TRACK ORDER PAGE */}
            {showRoute && (
              <div 
                className="absolute z-20 transition-all duration-100" 
                style={{ 
                  top: `${driverPosition.y}px`, 
                  left: `${driverPosition.x}px`,
                }}
              >
                <div className="h-8 w-8 rounded-full bg-red-500 border-2 border-white flex items-center justify-center animate-pulse">
                  <Navigation className="h-5 w-5 text-white" />
                </div>
              </div>
            )}
            
            {/* User location blue dot */}
            <div className="absolute bottom-48 right-48 z-10">
              <div className="relative">
                <div className="h-5 w-5 bg-blue-500 rounded-full border-2 border-white"></div>
                <div className="absolute inset-0 h-5 w-5 bg-blue-500/50 rounded-full animate-ping opacity-75"></div>
              </div>
            </div>
            
            {/* Route path - Animated Green Line - ONLY ON TRACK ORDER PAGE */}
            {showRoute && (
              <svg className="absolute inset-0 z-0 pointer-events-none" width="100%" height="100%">
                <path
                  d={`M${routePoints.map(p => `${p.x},${p.y}`).join(' L')}`}
                  stroke="#10b981"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray="8,4"
                  className="animate-dash"
                />
                
                {/* Destination marker */}
                <circle cx={routePoints[routePoints.length-1].x} cy={routePoints[routePoints.length-1].y} r="8" fill="#10b981" />
                <circle cx={routePoints[routePoints.length-1].x} cy={routePoints[routePoints.length-1].y} r="16" fill="#10b981" fillOpacity="0.3" />
              </svg>
            )}
          </div>
          
          {/* Map controls */}
          <div className="absolute bottom-20 left-4 flex flex-col space-y-2">
            <button 
              onClick={handleZoomIn}
              className="h-10 w-10 rounded-full bg-green-500 text-black flex items-center justify-center shadow-lg hover:bg-green-600 active:scale-95 transition-all"
            >
              <Plus className="h-5 w-5" />
            </button>
            <button 
              onClick={handleZoomOut}
              className="h-10 w-10 rounded-full bg-green-500 text-black flex items-center justify-center shadow-lg hover:bg-green-600 active:scale-95 transition-all"
            >
              <Minus className="h-5 w-5" />
            </button>
          </div>
          
          {/* Back button - only show on non-home pages */}
          {showBackButton && !isHomePage && (
            <button 
              className="absolute top-4 left-4 h-10 w-10 rounded-full bg-black border border-gray-700 text-white flex items-center justify-center shadow-lg hover:bg-gray-900 active:scale-95 transition-all z-30"
              onClick={handleGoBack}
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          )}
          
          {interactive && (
            <button 
              className="absolute right-4 top-4 h-10 w-10 rounded-full bg-green-500 text-black flex items-center justify-center shadow-lg hover:bg-green-600 active:scale-95 transition-all"
              onClick={() => setUserLocation({ lat: 35.1495, lng: -90.0490 })}
            >
              <Locate className="h-5 w-5" />
            </button>
          )}
          
          {/* Traffic incident indicator */}
          {trafficIntensity === "heavy" && showRoute && (
            <div className="absolute top-16 right-4 bg-red-500 text-white text-xs p-2 rounded-lg animate-pulse shadow-lg flex items-center">
              <span className="mr-1">⚠️</span> Heavy traffic on I-240
            </div>
          )}
          
          {/* Delivery info with driver avatar - ONLY ON TRACK ORDER PAGE */}
          {showDeliveryInfo && driverInfo && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/95 backdrop-blur p-3 rounded-t-xl">
              <div className="flex items-center">
                <img 
                  src={driverInfo.image || "/lovable-uploads/cb5a3b54-642b-4e6d-aa2c-2e489e9956dc.png"} 
                  alt={driverInfo.name} 
                  className="h-14 w-14 rounded-full object-cover mr-3 border-2 border-green-500"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{driverInfo.name}</h3>
                  <p className="text-gray-400">{driverInfo.location}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="h-12 w-12 flex items-center justify-center rounded-full bg-green-500">
                    <Phone className="h-6 w-6 text-black" />
                  </button>
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
