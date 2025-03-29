
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MapPin, Phone, MessageSquare, Share2, ChevronLeft, Home, ShoppingBag, Map as MapIcon, Settings, UserCircle2 } from 'lucide-react';
import Map from '@/components/ui/Map';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useToast } from "@/hooks/use-toast";
import { orderHistory } from '@/data/dummyData';

// Memphis-specific data
const memphisLicensePlates = [
  "TN-56A782", "TN-23B471", "TN-78C912", "TN-34D654", "TN-91E349"
];

// Driver vector avatars
const driverAvatars = [
  <UserCircle2 className="h-14 w-14 text-green-500 bg-black rounded-full p-0.5" />,
  <svg className="h-14 w-14 text-green-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5ZM12 19.2C9.5 19.2 7.29 17.92 6 15.98C6.03 13.99 10 12.9 12 12.9C13.99 12.9 17.97 13.99 18 15.98C16.71 17.92 14.5 19.2 12 19.2Z" fill="currentColor"/>
  </svg>,
  <svg className="h-14 w-14 text-green-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor"/>
  </svg>,
  <svg className="h-14 w-14 text-green-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C9.38 2 7.25 4.13 7.25 6.75C7.25 9.32 9.26 11.4 11.88 11.49C11.96 11.48 12.04 11.48 12.1 11.49C12.12 11.49 12.13 11.49 12.15 11.49C12.16 11.49 12.16 11.49 12.17 11.49C14.73 11.4 16.74 9.32 16.75 6.75C16.75 4.13 14.62 2 12 2Z" fill="currentColor"/>
    <path d="M17.0809 14.1489C14.2909 12.2889 9.74094 12.2889 6.93094 14.1489C5.66094 14.9989 4.96094 16.1489 4.96094 17.3789C4.96094 18.6089 5.66094 19.7489 6.92094 20.5889C8.32094 21.5289 10.1609 21.9989 12.0009 21.9989C13.8409 21.9989 15.6809 21.5289 17.0809 20.5889C18.3409 19.7389 19.0409 18.5989 19.0409 17.3589C19.0309 16.1289 18.3409 14.9889 17.0809 14.1489Z" fill="currentColor"/>
  </svg>
];

const deliveryPeople = [
  { name: "Cristopert Dastin", location: "Memphis, TN", phone: "+1 (901) 555-3478", rating: 4.8 },
  { name: "Sarah Johnson", location: "Memphis, TN", phone: "+1 (901) 555-9872", rating: 4.7 },
  { name: "Michael Davis", location: "Memphis, TN", phone: "+1 (901) 555-2341", rating: 4.9 },
  { name: "Emily Wilson", location: "Memphis, TN", phone: "+1 (901) 555-7653", rating: 4.6 }
];

const deliveryTimes = [
  "7:15 - 7:45 PM", "8:30 - 9:15 PM", "6:45 - 7:30 PM", "9:00 - 9:45 PM", "7:30 - 8:15 PM"
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
  statusDetails: 'Order received',
  avatarIndex: 0
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
  
  // Initialize with defaultOrder to avoid undefined issues
  const [order, setOrder] = useState<typeof defaultOrder>({...defaultOrder, avatarIndex: Math.floor(Math.random() * driverAvatars.length)});
  const [orderComplete, setOrderComplete] = useState(false);
  const [driverLocation, setDriverLocation] = useState({ lat: 35.1175, lng: -89.9711 }); // Initial Memphis coordinates

  // Update driver location randomly to simulate movement
  useEffect(() => {
    if (orderComplete) return;

    const moveDriver = setInterval(() => {
      // Generate small random movements
      setDriverLocation(prev => ({
        lat: prev.lat + (Math.random() * 0.002 - 0.001),
        lng: prev.lng + (Math.random() * 0.002 - 0.001)
      }));
    }, 2000);

    return () => clearInterval(moveDriver);
  }, [orderComplete]);

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
          
          // Choose random avatar
          const randomAvatarIndex = Math.floor(Math.random() * driverAvatars.length);
          
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
            driver: randomDeliveryPerson,
            avatarIndex: randomAvatarIndex
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
          // Ensure prevOrder is never undefined by using defaultOrder as fallback
          const safeOrder = prevOrder || defaultOrder;
          
          return {
            ...safeOrder,
            status: statuses[currentStep].status,
            progress: statuses[currentStep].progress,
            statusDetails: statuses[currentStep].statusDetails
          };
        });
        
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
      // Only continue if the order is not complete
      if (orderComplete) return;
      
      // Choose random Memphis license plate
      const randomLicensePlate = memphisLicensePlates[Math.floor(Math.random() * memphisLicensePlates.length)];
      
      // Choose random delivery person (different from current)
      let currentDriverIndex = -1;
      
      // Safely get current driver index with null check
      const currentDriverName = order?.driver?.name;
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
      
      // Choose random avatar
      const randomAvatarIndex = Math.floor(Math.random() * driverAvatars.length);
      
      setOrder(prevOrder => {
        // Ensure prevOrder is never undefined by using defaultOrder as fallback
        const safeOrder = prevOrder || defaultOrder;
        
        return {
          ...safeOrder,
          estimatedDelivery: randomDeliveryTime,
          licensePlate: randomLicensePlate,
          driver: randomDeliveryPerson,
          avatarIndex: randomAvatarIndex
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
        const driverName = order?.driver?.name || 'Driver';
        
        toast({
          title: `Message from ${driverName}`,
          description: randomMessage,
          duration: 3000,
          className: "bg-green-500 border-green-600 text-white"
        });
      }
    }, Math.floor(Math.random() * 15000) + 15000); // Random time between 15-30 seconds
    
    return () => {
      clearInterval(statusTimer);
      clearInterval(driverUpdateTimer);
      clearInterval(messageTimer);
    };
  }, [location.search, toast, navigate, orderComplete, order?.driver?.name]);

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
    navigate('/call');
  };

  const handleMessage = () => {
    navigate('/chat');
  };

  // Helper function to determine status color with default value for safety
  const getStatusColor = (status: string | undefined) => {
    if (!status) return 'bg-gray-500'; // Default fallback
    
    switch(status) {
      case 'processing': return 'bg-green-500';
      case 'in-transit': return 'bg-green-500';
      case 'delivered': return 'bg-green-500';
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
  const driverPhone = order?.driver?.phone || '+1 (555) 555-5555';
  const licensePlate = order?.licensePlate || 'TN-XXXXX';
  const estimatedDelivery = order?.estimatedDelivery || 'Soon';
  const orderItems = order?.items || [];
  const orderTotal = order?.total || 0;
  const orderId = order?.id || 'ORD-XXXX';
  const avatarIndex = order?.avatarIndex || 0;

  // Get the driver avatar based on the current index
  const driverAvatar = driverAvatars[avatarIndex] || driverAvatars[0];

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
      
      {/* Map section */}
      <div className="h-[300px] mb-3">
        <Map 
          showRoute 
          showDeliveryInfo
          driverLocation={driverLocation}
          animate={true}
        />
      </div>
      
      {/* Driver info and order details */}
      <div className="px-4 py-2 bg-black rounded-t-3xl -mt-12 relative">
        <div className="h-1 w-12 bg-gray-700 rounded-full mx-auto mb-4"></div>
        
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
