
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MapPin, Phone, MessageSquare, ChevronLeft, Home, ShoppingBag, Map as MapIcon, Settings } from 'lucide-react';
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
  { 
    name: "Cristopert Dastin", 
    location: "Memphis, TN", 
    image: "/lovable-uploads/cb5a3b54-642b-4e6d-aa2c-2e489e9956dc.png", 
    rating: 4.8, 
    phone: "+1 (901) 555-3478" 
  },
  { 
    name: "Sarah Johnson", 
    location: "Memphis, TN", 
    image: "/lovable-uploads/c3b29f6b-a689-4ac3-a338-4194cbee5e0c.png", 
    rating: 4.7, 
    phone: "+1 (901) 555-9872" 
  },
  { 
    name: "Michael Davis", 
    location: "Memphis, TN", 
    image: "/lovable-uploads/8a188651-80ec-4a90-8d5c-de0df713b6c7.png", 
    rating: 4.9, 
    phone: "+1 (901) 555-2341" 
  },
  { 
    name: "Emily Wilson", 
    location: "Memphis, TN", 
    image: "/lovable-uploads/1bc06a60-0463-4f47-abde-502bc408852e.png", 
    rating: 4.6, 
    phone: "+1 (901) 555-7653" 
  }
];

const deliveryTimes = [
  "7:15 - 7:45 PM", "8:30 - 9:15 PM", "6:45 - 7:30 PM", "9:00 - 9:45 PM", "7:30 - 8:15 PM"
];

// Memphis street names for more realistic updates
const memphisStreets = [
  "Poplar Avenue", "Union Avenue", "Madison Avenue", "Beale Street", 
  "Front Street", "Main Street", "Second Street", "Third Street",
  "Elvis Presley Boulevard", "Winchester Road", "Summer Avenue",
  "Walnut Grove Road", "Sam Cooper Boulevard", "Airways Boulevard",
  "Lamar Avenue", "Germantown Parkway", "MLK Jr Avenue", "Riverside Drive"
];

// Default order data to ensure we always have valid initial state
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
  statusDetails: 'Order received'
};

// Real-time driver update messages
const driverUpdateMessages = [
  "I'm heading to pick up your fuel now",
  "Just arrived at the station to pick up your order",
  "Your fuel is being loaded now, will be on my way shortly",
  "I'm on my way to your location!",
  "Taking {street} to avoid traffic",
  "I'll be there in about 10 minutes",
  "I'm about 5 minutes away from your location",
  "I'm nearby, please prepare for arrival",
  "I've arrived at your location",
  "Is there a specific place you'd like me to meet you?",
  "I'm at the front entrance, let me know if you need me to come to a different spot",
  "Thank you for using our service!"
];

// Delivery status updates
const deliveryStatusUpdates = [
  "Order received and processing",
  "Driver has been assigned to your order",
  "Driver is on the way to the gas station",
  "Driver has arrived at the gas station",
  "Your fuel is being prepared",
  "Fuel loaded and ready for delivery",
  "Driver is now on the way to your location",
  "Driver is navigating through {street}",
  "Driver is getting close to your location",
  "Driver is arriving at your location",
  "Delivery completed successfully"
];

const TrackOrder: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Initialize with defaultOrder to avoid undefined issues
  const [order, setOrder] = useState<typeof defaultOrder>(defaultOrder);
  const [orderComplete, setOrderComplete] = useState(false);

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
          
          // Safely update the order with found data
          setOrder(prevOrder => ({
            ...defaultOrder, // Always include default values as fallback
            ...prevOrder,
            id: foundOrder.id || defaultOrder.id,
            status: foundOrder.status || defaultOrder.status,
            estimatedDelivery: randomDeliveryTime,
            items: foundOrder.items || defaultOrder.items,
            total: parseFloat(foundOrder.totalPrice) || defaultOrder.total,
            licensePlate: randomLicensePlate,
            driver: randomDeliveryPerson
          }));
        }
        
        console.log(`Fetching order details for ${orderId}`, foundOrder);
      } catch (error) {
        console.error("Error processing order data:", error);
        // Toast to inform user
        toast({
          title: "Error",
          description: "Could not load order details",
          duration: 3000,
          variant: "destructive"
        });
      }
    }
    
    // Status update every 8-12 seconds for realistic progression
    const statuses = [
      { status: 'processing', progress: 0, statusDetails: 'Order received' },
      { status: 'processing', progress: 20, statusDetails: 'Processing your order' },
      { status: 'in-transit', progress: 40, statusDetails: 'Driver on the way to pickup' },
      { status: 'in-transit', progress: 60, statusDetails: 'Fuel picked up, headed your way' },
      { status: 'in-transit', progress: 80, statusDetails: 'Almost at your location' },
      { status: 'delivered', progress: 100, statusDetails: 'Delivery complete!' }
    ];
    
    let currentStep = 0;
    
    // Update status at varying intervals for more natural progression
    const updateStatus = () => {
      if (currentStep < statuses.length) {
        setOrder(prevOrder => {
          // Ensure prevOrder is never undefined by using defaultOrder as fallback
          const safeOrder = prevOrder || defaultOrder;
          
          return {
            ...safeOrder,
            status: statuses[currentStep].status,
            progress: statuses[currentStep].progress,
            statusDetails: statuses[currentStep].statusDetails
          };
        });
        
        // Get a status update message and replace placeholders
        let statusMessage = deliveryStatusUpdates[Math.min(currentStep, deliveryStatusUpdates.length - 1)];
        
        if (statusMessage.includes("{street}")) {
          const randomStreet = memphisStreets[Math.floor(Math.random() * memphisStreets.length)];
          statusMessage = statusMessage.replace("{street}", randomStreet);
        }
        
        // Show toast notification for status changes
        toast({
          title: `Order Update: ${statuses[currentStep].status.toUpperCase()}`,
          description: statusMessage,
          duration: 3000,
          className: "bg-black border-gray-800 text-white"
        });
        
        // Check if this is the final step (delivery complete)
        if (currentStep === statuses.length - 1) {
          setOrderComplete(true);
          
          // Show delivery completion toast when delivered
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
            }, 5000);
          }, 1000);
        }
        
        currentStep++;
        
        // Schedule next update with random delay for more natural progression
        if (currentStep < statuses.length) {
          const randomDelay = Math.floor(Math.random() * 4000) + 8000; // 8-12 seconds
          setTimeout(updateStatus, randomDelay);
        }
      }
    };
    
    // Start status updates
    const initialDelay = Math.floor(Math.random() * 2000) + 3000; // 3-5 seconds initial delay
    const statusTimer = setTimeout(updateStatus, initialDelay);

    // Driver message updates at random intervals (5-15 seconds)
    const driverMessageTimer = setInterval(() => {
      // Only show messages if the order is in progress
      if (!orderComplete) {
        // Choose a random message
        let randomMessage = driverUpdateMessages[Math.floor(Math.random() * driverUpdateMessages.length)];
        
        // Replace street placeholder if present
        if (randomMessage.includes("{street}")) {
          const randomStreet = memphisStreets[Math.floor(Math.random() * memphisStreets.length)];
          randomMessage = randomMessage.replace("{street}", randomStreet);
        }
        
        const driverName = order?.driver?.name || 'Driver';
        
        toast({
          title: `Message from ${driverName}`,
          description: randomMessage,
          duration: 3000,
          className: "bg-green-500 border-green-600 text-black"
        });
      }
    }, Math.floor(Math.random() * 10000) + 5000);
    
    return () => {
      clearTimeout(statusTimer);
      clearInterval(driverMessageTimer);
    };
  }, [location.search, toast, navigate, orderComplete]);

  const handleCall = () => {
    navigate('/call');
  };

  const handleMessage = () => {
    navigate('/chat');
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
  const driverLocation = order?.driver?.location || 'Memphis, TN';
  const driverImage = order?.driver?.image || '/lovable-uploads/cb5a3b54-642b-4e6d-aa2c-2e489e9956dc.png';
  const licensePlate = order?.licensePlate || 'TN-XXXXX';
  const estimatedDelivery = order?.estimatedDelivery || 'Soon';
  const orderItems = order?.items || [];
  const orderTotal = order?.total || 0;
  const orderId = order?.id || 'ORD-XXXX';

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header - matches reference image */}
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
      
      {/* Map section - Updated to show the animated map */}
      <div className="h-[440px] mb-3">
        <Map 
          showRoute={true}
          showDeliveryInfo={true}
          driverInfo={order?.driver}
        />
      </div>
      
      {/* Driver info card - matches reference image */}
      <div className="mx-4 p-3 bg-black border border-gray-800 rounded-xl -mt-20 mb-4 relative">
        <div className="flex items-center">
          <img 
            src={driverImage} 
            alt={driverName} 
            className="h-14 w-14 rounded-full object-cover mr-3 border-2 border-green-500"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{driverName}</h3>
            <p className="text-gray-400">{driverLocation}</p>
          </div>
          <div className="flex space-x-2">
            <Button 
              onClick={handleCall}
              className="h-12 w-12 p-0 rounded-full bg-green-500 hover:bg-green-600"
            >
              <Phone className="h-6 w-6 text-black" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Order details */}
      <div className="px-4 py-2">
        {/* Delivery time */}
        <div className="mb-4">
          <h4 className="text-gray-400 mb-1">Your Delivery Time</h4>
          <p className="font-semibold text-white text-lg">Estimated {estimatedDelivery}</p>
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
