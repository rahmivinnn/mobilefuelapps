
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MapPin, Phone, MessageSquare, Share2, ChevronLeft, Home, ShoppingBag, Map as MapIcon, Settings, User } from 'lucide-react';
import Map from '@/components/ui/Map';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useToast } from "@/hooks/use-toast";
import { orderHistory } from '@/data/dummyData';

// Memphis-specific data
const memphisLicensePlates = [
  "TN-56A782", "TN-23B471", "TN-78C912", "TN-34D654", "TN-91E349"
];

const deliveryPeople = [
  { name: "Christopher Dastin", location: "Memphis, TN", image: "/lovable-uploads/a3df03b1-a154-407f-b8fe-e5dd6f0bade3.png", rating: 4.8, phone: "+1 (901) 555-3478" },
  { name: "Sarah Johnson", location: "Memphis, TN", image: "/lovable-uploads/c3b29f6b-a689-4ac3-a338-4194cbee5e0c.png", rating: 4.7, phone: "+1 (901) 555-9872" },
  { name: "Michael Davis", location: "Memphis, TN", image: "/lovable-uploads/8a188651-80ec-4a90-8d5c-de0df713b6c7.png", rating: 4.9, phone: "+1 (901) 555-2341" },
  { name: "Emily Wilson", location: "Memphis, TN", image: "/lovable-uploads/1bc06a60-0463-4f47-abde-502bc408852e.png", rating: 4.6, phone: "+1 (901) 555-7653" }
];

// Generate driver avatars using the User icon
const driverAvatars = [
  <div className="h-14 w-14 rounded-full bg-green-500 flex items-center justify-center border-2 border-white text-black">
    <User className="h-8 w-8" />
  </div>,
  <div className="h-14 w-14 rounded-full bg-green-600 flex items-center justify-center border-2 border-white text-black">
    <User className="h-8 w-8" />
  </div>,
  <div className="h-14 w-14 rounded-full bg-green-500 flex items-center justify-center border-2 border-white text-black">
    <User className="h-8 w-8" />
  </div>,
  <div className="h-14 w-14 rounded-full bg-green-600 flex items-center justify-center border-2 border-white text-black">
    <User className="h-8 w-8" />
  </div>
];

const deliveryTimes = [
  "7:15 - 7:45 PM", "8:30 - 9:15 PM", "6:45 - 7:30 PM", "9:00 - 9:45 PM", "7:30 - 8:15 PM"
];

// Default order data
const defaultOrder = {
  id: 'ORD-1234',
  status: 'processing',
  estimatedDelivery: '8:30 - 9:15 PM',
  items: [
    { name: '2 Gallons Regular Unleaded', quantity: '1x', price: 7.34 },
    { name: 'Chocolate cookies', quantity: '2x', price: 3.50 }
  ],
  total: 10.84,
  licensePlate: memphisLicensePlates[0],
  driver: deliveryPeople[0],
  progress: 0,
  statusDetails: 'Order received',
  avatarIndex: 0,
  driverLocation: { lat: 35.149, lng: -90.048 }
};

// Sample driver messages
const driverMessages = [
  "I'm on my way to your location!",
  "I'll be there in about 5 minutes.",
  "I'm nearby, please prepare for arrival.",
  "I've arrived at your location.",
  "Is there a specific place you'd like me to meet you?",
  "Thank you for using our service!"
];

const TrackOrder: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Explicitly initialize with defaultOrder as a safety measure
  const [order, setOrder] = useState<typeof defaultOrder>(defaultOrder);
  const [orderComplete, setOrderComplete] = useState(false);
  const [driverLocation, setDriverLocation] = useState({ lat: 35.149, lng: -90.048 });
  const [showDirections, setShowDirections] = useState(true);
  const [routeColor, setRouteColor] = useState('#4ade80'); // Green route color
  const [mapImage] = useState('/lovable-uploads/f7931378-76e5-4e0a-bc3c-1d7b4fff6f0d.png');

  // Status progression logic
  useEffect(() => {
    // Get orderId from URL query params
    const params = new URLSearchParams(location.search);
    const orderId = params.get('orderId');
    
    if (orderId) {
      try {
        // Find the order in orderHistory
        const foundOrder = orderHistory.find(o => o.id === orderId);
        
        if (foundOrder) {
          // Choose random Memphis license plate
          const randomLicensePlate = memphisLicensePlates[Math.floor(Math.random() * memphisLicensePlates.length)];
          
          // Choose random delivery person
          const randomDeliveryPerson = deliveryPeople[Math.floor(Math.random() * deliveryPeople.length)];
          
          // Choose random delivery time
          const randomDeliveryTime = deliveryTimes[Math.floor(Math.random() * deliveryTimes.length)];
          
          // Random avatar index
          const randomAvatarIndex = Math.floor(Math.random() * driverAvatars.length);
          
          // Random initial driver location (near Memphis)
          const initialDriverLocation = {
            lat: 35.149 + (Math.random() - 0.5) * 0.01,
            lng: -90.048 + (Math.random() - 0.5) * 0.01
          };
          
          setDriverLocation(initialDriverLocation);
          
          // Safely update the order with found data - making sure we have all required properties
          setOrder({
            ...defaultOrder, // Always include default values as fallback
            id: foundOrder.id || defaultOrder.id,
            status: foundOrder.status || defaultOrder.status,
            estimatedDelivery: randomDeliveryTime,
            items: foundOrder.items || defaultOrder.items,
            total: parseFloat(foundOrder.totalPrice) || defaultOrder.total,
            licensePlate: randomLicensePlate,
            driver: randomDeliveryPerson,
            avatarIndex: randomAvatarIndex,
            driverLocation: initialDriverLocation,
            progress: defaultOrder.progress,
            statusDetails: defaultOrder.statusDetails
          });
        } else {
          // If order not found, explicitly use default order
          console.log(`Order ${orderId} not found, using default`);
          setOrder({...defaultOrder});
        }
        
        console.log(`Fetching order details for ${orderId}`, foundOrder);
      } catch (error) {
        console.error("Error processing order data:", error);
        // If there's an error, explicitly use default order
        setOrder({...defaultOrder});
        // Toast to inform user
        toast({
          title: "Error",
          description: "Could not load order details",
          duration: 3000,
          variant: "destructive"
        });
      }
    } else {
      // No orderId in URL, explicitly use default order
      setOrder({...defaultOrder});
    }
    
    // Status update every 5 seconds for demonstration purposes
    // In reality, this would be connected to a backend with real updates
    const statuses = [
      { status: 'processing', progress: 0, statusDetails: 'Order received' },
      { status: 'processing', progress: 20, statusDetails: 'Processing your order' },
      { status: 'in-transit', progress: 40, statusDetails: 'Driver on the way to pickup' },
      { status: 'in-transit', progress: 60, statusDetails: 'Fuel picked up, headed your way' },
      { status: 'in-transit', progress: 80, statusDetails: 'Almost at your location' },
      { status: 'delivered', progress: 100, statusDetails: 'Delivery complete!' }
    ];
    
    let currentStep = 0;
    
    // Update status every 5 seconds
    const statusTimer = setInterval(() => {
      if (currentStep < statuses.length) {
        setOrder(prevOrder => {
          // Make a deep copy of defaultOrder as fallback
          const safeOrder = prevOrder ? {...prevOrder} : {...defaultOrder};
          
          return {
            ...safeOrder,
            status: statuses[currentStep].status,
            progress: statuses[currentStep].progress,
            statusDetails: statuses[currentStep].statusDetails
          };
        });
        
        // Update route color based on status
        if (statuses[currentStep].status === 'processing') {
          setRouteColor('#facc15'); // Yellow
        } else if (statuses[currentStep].status === 'in-transit') {
          setRouteColor('#4ade80'); // Green
        } else if (statuses[currentStep].status === 'delivered') {
          setRouteColor('#3b82f6'); // Blue
        }
        
        // Show toast notification for status changes
        toast({
          title: "Order Update",
          description: statuses[currentStep].statusDetails,
          duration: 3000
        });
        
        // Check if this is the final step (delivery complete)
        if (currentStep === statuses.length - 1) {
          setOrderComplete(true);
          
          // Show smaller delivery completion toast when delivered
          setTimeout(() => {
            toast({
              title: "Delivery Complete!",
              description: "Your order has been successfully delivered.",
              duration: 2000,
              className: "bg-green-500 border-green-600 text-white"
            });
            
            // Navigate back to home after a delay
            setTimeout(() => {
              navigate('/');
            }, 3000);
          }, 1000);
        }
        
        currentStep++;
      } else {
        clearInterval(statusTimer);
      }
    }, 5000);

    // Update driver much more frequently (every 5-10 seconds)
    const driverUpdateTimer = setInterval(() => {
      // Choose random Memphis license plate
      const randomLicensePlate = memphisLicensePlates[Math.floor(Math.random() * memphisLicensePlates.length)];
      
      // Choose random delivery person (different from current)
      let currentDriverIndex = -1;
      
      // Get current order safely with explicit fallback
      const currentOrder = order || {...defaultOrder};
      
      // Safely get current driver index with proper null check
      const currentDriverName = currentOrder?.driver?.name;
      if (currentDriverName) {
        currentDriverIndex = deliveryPeople.findIndex(driver => driver.name === currentDriverName);
      }
      
      let newDriverIndex;
      do {
        newDriverIndex = Math.floor(Math.random() * deliveryPeople.length);
      } while (newDriverIndex === currentDriverIndex && deliveryPeople.length > 1);
      
      const randomDeliveryPerson = deliveryPeople[newDriverIndex];
      
      // Choose random delivery time
      const randomDeliveryTime = deliveryTimes[Math.floor(Math.random() * deliveryTimes.length)];
      
      setOrder(prevOrder => {
        // Deep copy of defaultOrder as fallback
        const safeOrder = prevOrder ? {...prevOrder} : {...defaultOrder};
        
        return {
          ...safeOrder,
          estimatedDelivery: randomDeliveryTime,
          licensePlate: randomLicensePlate,
          driver: randomDeliveryPerson
        };
      });
      
      // Only show driver update notification if the order is not complete
      if (!orderComplete) {
        toast({
          title: "Driver Update",
          description: `Your order is now being delivered by ${randomDeliveryPerson.name}`,
          duration: 3000
        });
      }
    }, Math.floor(Math.random() * 5000) + 5000); // Random time between 5-10 seconds
    
    // Show random driver messages every 15-30 seconds
    const messageTimer = setInterval(() => {
      // Only show messages if the order is in progress
      if (!orderComplete) {
        const randomMessage = driverMessages[Math.floor(Math.random() * driverMessages.length)];
        // Get current order safely with explicit fallback
        const currentOrder = order || {...defaultOrder};
        const driverName = currentOrder?.driver?.name || 'Driver';
        
        toast({
          title: `Message from ${driverName}`,
          description: randomMessage,
          duration: 3000,
          className: "bg-blue-500 border-blue-600 text-white"
        });
      }
    }, Math.floor(Math.random() * 15000) + 15000); // Random time between 15-30 seconds
    
    return () => {
      clearInterval(statusTimer);
      clearInterval(driverUpdateTimer);
      clearInterval(messageTimer);
    };
  }, [location.search, toast, navigate, orderComplete]);

  // Simulate driver movement
  useEffect(() => {
    const movementInterval = setInterval(() => {
      // Update driver location with small random changes to simulate movement
      const newDriverLocation = {
        lat: driverLocation.lat + (Math.random() - 0.5) * 0.002,
        lng: driverLocation.lng + (Math.random() - 0.5) * 0.002
      };
      setDriverLocation(newDriverLocation);
      
      // Also update the order object with the new location - with fallback to avoid undefined
      setOrder(prev => {
        const safeOrder = prev ? {...prev} : {...defaultOrder};
        return {
          ...safeOrder,
          driverLocation: newDriverLocation
        };
      });
    }, 3000);
    
    return () => clearInterval(movementInterval);
  }, [driverLocation]);

  // Effect to watch for order completion and show additional notifications
  useEffect(() => {
    if (orderComplete) {
      // Show arrival notification after the order is complete
      const arrivalTimer = setTimeout(() => {
        toast({
          title: "Arrived at Destination",
          description: "Your fuel has been delivered. Enjoy!",
          duration: 2000,
          className: "bg-green-500 border-green-600 text-white"
        });
      }, 2000);
      
      return () => clearTimeout(arrivalTimer);
    }
  }, [orderComplete, toast]);

  const handleCall = () => {
    // Make sure to safely access driverName with fallback
    const driverName = order?.driver?.name || 'Driver';
    navigate(`/call?driverName=${encodeURIComponent(driverName)}`);
  };

  const handleMessage = () => {
    // Make sure to safely access driverName with fallback
    const driverName = order?.driver?.name || 'Driver';
    navigate(`/chat?driverName=${encodeURIComponent(driverName)}`);
  };

  const toggleDirections = () => {
    setShowDirections(!showDirections);
  };

  // Helper function to determine status color with default value for safety
  const getStatusColor = (status: string | undefined) => {
    if (!status) return 'bg-gray-500'; // Default fallback
    
    switch(status) {
      case 'processing': return 'bg-yellow-500';
      case 'in-transit': return 'bg-green-500';
      case 'delivered': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  // Helper function to get status name with default value for safety
  const getStatusName = (status: string | undefined) => {
    if (!status) return 'Unknown'; // Default fallback
    
    switch(status) {
      case 'processing': return 'Processing';
      case 'in-transit': return 'In Transit';
      case 'delivered': return 'Delivered';
      default: return 'Unknown';
    }
  };

  // Safely access properties with fallbacks to avoid undefined errors
  const status = order?.status || 'processing';
  const progress = order?.progress || 0;
  const statusDetails = order?.statusDetails || 'Processing your order';
  const driverName = order?.driver?.name || 'Driver';
  const driverLocation1 = order?.driver?.location || 'Memphis, TN';
  const driverPhone = order?.driver?.phone || '+1 (901) 555-1234';
  const licensePlate = order?.licensePlate || 'TN-XXXXX';
  const estimatedDelivery = order?.estimatedDelivery || 'Soon';
  const orderItems = order?.items || [];
  const orderTotal = order?.total || 0;
  const orderId = order?.id || 'ORD-XXXX';
  const avatarIndex = order?.avatarIndex || 0;

  // Get the driver avatar based on the current index
  const driverAvatar = driverAvatars[avatarIndex] || driverAvatars[0];

  // Custom Map component to match the provided reference image
  const GoogleStyleMap = () => {
    return (
      <div className="relative w-full h-full overflow-hidden rounded-lg">
        {/* Base map image */}
        <img 
          src={mapImage}
          alt="Memphis Map" 
          className="w-full h-full object-cover"
        />
        
        {/* Route path */}
        <div className="absolute inset-0 pointer-events-none">
          <svg width="100%" height="100%" className="absolute">
            {/* Animated route path */}
            <path
              d="M300,900 C350,750 400,650 450,500 C500,300 550,200 650,180"
              stroke={routeColor}
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="10,10"
              className="animate-dash"
              style={{
                opacity: showDirections ? 1 : 0.5,
              }}
            />
          </svg>
        </div>
        
        {/* User location (destination) */}
        <div className="absolute bottom-1/4 right-1/4 z-20">
          <div className="relative">
            <div className="h-6 w-6 bg-green-500 rounded-full border-2 border-white"></div>
            <div className="absolute inset-0 h-6 w-6 bg-green-500/50 rounded-full animate-ping opacity-75"></div>
          </div>
        </div>
        
        {/* Driver location */}
        <div 
          className="absolute z-30 transition-all duration-700"
          style={{
            top: `${40 + (Math.random() * 5)}%`,
            left: `${45 + (Math.random() * 5)}%`,
          }}
        >
          <div className="relative">
            <div className="h-8 w-8 bg-red-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg animate-pulse">
              <MapPin className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
        
        {/* Zoom controls */}
        <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
          <button className="h-10 w-10 bg-white rounded-full flex items-center justify-center shadow-md">
            <div className="h-5 w-5 flex items-center justify-center text-xl font-bold text-gray-700">+</div>
          </button>
          <button className="h-10 w-10 bg-white rounded-full flex items-center justify-center shadow-md">
            <div className="h-5 w-5 flex items-center justify-center text-2xl font-bold text-gray-700">−</div>
          </button>
        </div>
        
        {/* Location pin */}
        <button className="absolute bottom-4 right-20 h-10 w-10 bg-white rounded-full flex items-center justify-center shadow-md">
          <div className="h-6 w-6 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-gray-700">
              <path fill="currentColor" d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3A8.994 8.994 0 0 0 13 3.06V1h-2v2.06A8.994 8.994 0 0 0 3.06 11H1v2h2.06A8.994 8.994 0 0 0 11 20.94V23h2v-2.06A8.994 8.994 0 0 0 20.94 13H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/>
            </svg>
          </div>
        </button>
        
        {/* Map attribution */}
        <div className="absolute bottom-1 left-1 text-xs text-gray-500 bg-white/70 px-1 rounded">
          Map data ©2023
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="relative px-4 py-3 flex items-center justify-center">
        <Link to="/orders" className="absolute left-4">
          <div className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-800">
            <ChevronLeft className="h-6 w-6" />
          </div>
        </Link>
        <h1 className="text-xl font-semibold">Track Your Order</h1>
      </div>
      
      {/* Status indicator */}
      <div className="px-4 py-2">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <div className={`w-3 h-3 rounded-full ${getStatusColor(status)} mr-2`}></div>
            <span className="font-medium">{getStatusName(status)}</span>
          </div>
          <span className="text-sm text-gray-400">{orderId}</span>
        </div>
        
        {/* Progress bar */}
        <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
          <motion.div 
            className={`h-2 rounded-full ${getStatusColor(status)}`}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <p className="text-gray-400 text-sm">{statusDetails}</p>
      </div>
      
      {/* Map section - Now using the custom Google style map */}
      <div className="h-[300px] mb-4 mt-2 relative">
        <GoogleStyleMap />
      </div>
      
      {/* Driver info and order details */}
      <div className="px-4 py-2 bg-black relative">
        {/* Driver info */}
        <div className="flex items-center mb-6">
          <div className="mr-3">
            {driverAvatar}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{driverName}</h3>
            <p className="text-gray-400">{driverLocation1}</p>
            <p className="text-gray-400 text-xs mt-1">Vehicle License: {licensePlate}</p>
          </div>
          <div className="flex space-x-2">
            <Button 
              onClick={handleMessage}
              className="h-12 w-12 p-0 rounded-full bg-green-500 hover:bg-green-600"
            >
              <MessageSquare className="h-6 w-6 text-black" />
            </Button>
            <Button 
              onClick={handleCall}
              className="h-12 w-12 p-0 rounded-full bg-green-500 hover:bg-green-600"
            >
              <Phone className="h-6 w-6 text-black" />
            </Button>
          </div>
        </div>
        
        {/* Delivery time */}
        <div className="mb-6">
          <h4 className="text-gray-400 mb-1">Your Delivery Time</h4>
          <p className="font-semibold text-white text-lg">Estimated {estimatedDelivery}</p>
        </div>
        
        {/* Delivery status */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 ${progress >= 20 ? 'bg-green-500' : 'bg-gray-700'} rounded-full flex items-center justify-center`}>
                <MapPin className={`h-4 w-4 ${progress >= 20 ? 'text-black' : 'text-gray-400'}`} />
              </div>
              <p className="text-xs text-gray-400 mt-1">Pickup</p>
            </div>
            <div className="flex-1 mx-1 h-0.5">
              <div className={`h-0.5 w-full border-t-2 border-dashed ${progress >= 40 ? 'border-green-500' : 'border-gray-700'}`}></div>
            </div>
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 ${progress >= 40 ? 'bg-green-500' : 'bg-gray-700'} rounded-full flex items-center justify-center`}>
                <svg className={`h-4 w-4 ${progress >= 40 ? 'text-black' : 'text-gray-400'}`} viewBox="0 0 24 24">
                  <path fill="currentColor" d="M18 18.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5m1.5-9H17V12h4.46L19.5 9.5M6 18.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5M20 8l3 4v5h-2c0 1.66-1.34 3-3 3s-3-1.34-3-3H9c0 1.66-1.34 3-3 3s-3-1.34-3-3H1V6c0-1.11.89-2 2-2h14v4h3M3 6v9h.76c.55-.61 1.35-1 2.24-1 .89 0 1.69.39 2.24 1H15V6H3z"/>
                </svg>
              </div>
              <p className="text-xs text-gray-400 mt-1">Transit</p>
            </div>
            <div className="flex-1 mx-1 h-0.5">
              <div className={`h-0.5 w-full border-t-2 border-dashed ${progress >= 80 ? 'border-green-500' : 'border-gray-700'}`}></div>
            </div>
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 ${progress >= 80 ? 'bg-green-500' : 'bg-gray-700'} rounded-full flex items-center justify-center`}>
                <svg className={`h-4 w-4 ${progress >= 80 ? 'text-black' : 'text-gray-400'}`} viewBox="0 0 24 24">
                  <path fill="currentColor" d="M18 10a1 1 0 0 1-1-1 1 1 0 0 1 1-1 1 1 0 0 1 1 1 1 1 0 0 1-1 1m-6 0H6V5h6m7.77 2.23l.01-.01-3.72-3.72L15 4.56l2.11 2.11C16.17 7 15.5 7.93 15.5 9a2.5 2.5 0 0 0 2.5 2.5c.36 0 .69-.08 1-.21v7.21a1 1 0 0 1-1 1 1 1 0 0 1-1-1V14a2 2 0 0 0-2-2h-1V5a2 2 0 0 0-2-2H6c-1.11 0-2 .89-2 2v16h10v-7.5h1.5v5a2.5 2.5 0 0 0 2.5 2.5 2.5 2.5 0 0 0 2.5-2.5V9c0-.69-.28-1.32-.73-1.77M12 10H6V9h6m0-2H6V7h6M6 19v-3h5v3H6m6-4.5V19h-1v-4.5"/>
                </svg>
              </div>
              <p className="text-xs text-gray-400 mt-1">Arriving</p>
            </div>
            <div className="flex-1 mx-1 h-0.5">
              <div className={`h-0.5 w-full border-t-2 border-dashed ${progress >= 100 ? 'border-green-500' : 'border-gray-700'}`}></div>
            </div>
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 ${progress >= 100 ? 'bg-green-500' : 'bg-gray-700'} rounded-full flex items-center justify-center`}>
                <svg className={`h-4 w-4 ${progress >= 100 ? 'text-black' : 'text-gray-400'}`} viewBox="0 0 24 24">
                  <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              </div>
              <p className="text-xs text-gray-400 mt-1">Delivered</p>
            </div>
          </div>
        </div>
        
        {/* Order items */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-3">Order</h3>
          {orderItems.map((item, i) => (
            <div key={i} className="flex justify-between mb-2">
              <p className="text-gray-300">{item.name}</p>
              <p className="font-medium">${item.price.toFixed(2)}</p>
            </div>
          ))}
          <div className="border-t border-gray-800 mt-3 pt-3">
            <div className="flex justify-between">
              <p className="font-medium">Total</p>
              <p className="font-bold">${orderTotal.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-black pt-2 pb-8 border-t border-gray-800">
        <div className="grid grid-cols-4 gap-2 px-4">
          <Link to="/" className="flex flex-col items-center">
            <div className="w-6 h-6">
              <Home className="w-6 h-6 text-gray-400" />
            </div>
            <span className="text-xs mt-1 text-gray-400">Home</span>
          </Link>
          <Link to="/orders" className="flex flex-col items-center">
            <div className="w-6 h-6">
              <ShoppingBag className="w-6 h-6 text-gray-400" />
            </div>
            <span className="text-xs mt-1 text-gray-400">My Orders</span>
          </Link>
          <Link to="/track" className="flex flex-col items-center">
            <div className="w-6 h-6">
              <MapIcon className="w-6 h-6 text-green-500" />
            </div>
            <span className="text-xs mt-1 text-green-500">Track Order</span>
          </Link>
          <Link to="/settings" className="flex flex-col items-center">
            <div className="w-6 h-6">
              <Settings className="w-6 h-6 text-gray-400" />
            </div>
            <span className="text-xs mt-1 text-gray-400">Settings</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
