
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MapPin, Phone, MessageSquare, Share2, ChevronLeft, Home, ShoppingBag, Map as MapIcon, Settings } from 'lucide-react';
import Map from '@/components/ui/Map';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useToast } from "@/components/ui/use-toast";
import { orderHistory } from '@/data/dummyData';

// Memphis-specific data
const memphisLicensePlates = [
  "TN-56A782", "TN-23B471", "TN-78C912", "TN-34D654", "TN-91E349"
];

const deliveryPeople = [
  { name: "Cristopert Dastin", location: "Memphis, TN", image: "/lovable-uploads/a3df03b1-a154-407f-b8fe-e5dd6f0bade3.png", rating: 4.8, phone: "+1 (901) 555-3478" },
  { name: "Sarah Johnson", location: "Memphis, TN", image: "/lovable-uploads/c3b29f6b-a689-4ac3-a338-4194cbee5e0c.png", rating: 4.7, phone: "+1 (901) 555-9872" },
  { name: "Michael Davis", location: "Memphis, TN", image: "/lovable-uploads/8a188651-80ec-4a90-8d5c-de0df713b6c7.png", rating: 4.9, phone: "+1 (901) 555-2341" },
  { name: "Emily Wilson", location: "Memphis, TN", image: "/lovable-uploads/1bc06a60-0463-4f47-abde-502bc408852e.png", rating: 4.6, phone: "+1 (901) 555-7653" }
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
  statusDetails: 'Order received'
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
  const [order, setOrder] = useState(defaultOrder);
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
            ...prevOrder,
            id: foundOrder.id,
            status: foundOrder.status || prevOrder.status,
            estimatedDelivery: randomDeliveryTime,
            items: foundOrder.items || prevOrder.items,
            total: parseFloat(foundOrder.totalPrice) || prevOrder.total,
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
        setOrder(prevOrder => ({
          ...prevOrder,
          status: statuses[currentStep].status,
          progress: statuses[currentStep].progress,
          statusDetails: statuses[currentStep].statusDetails
        }));
        
        // Show toast notification for status changes
        toast({
          title: "Order Update",
          description: statuses[currentStep].statusDetails,
          duration: 3000
        });
        
        // Check if this is the final step (delivery complete)
        if (currentStep === statuses.length - 1) {
          setOrderComplete(true);
          
          // Show delivery completion toast (now smaller)
          setTimeout(() => {
            toast({
              title: "Delivery Complete!",
              description: "Your order has been successfully delivered.",
              duration: 3000,
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

    // Update driver every 15-30 seconds (faster than before)
    const driverUpdateTimer = setInterval(() => {
      // Choose random Memphis license plate
      const randomLicensePlate = memphisLicensePlates[Math.floor(Math.random() * memphisLicensePlates.length)];
      
      // Choose random delivery person (different from current)
      let currentDriverIndex = deliveryPeople.findIndex(driver => driver.name === order.driver?.name);
      let newDriverIndex;
      do {
        newDriverIndex = Math.floor(Math.random() * deliveryPeople.length);
      } while (newDriverIndex === currentDriverIndex && deliveryPeople.length > 1);
      
      const randomDeliveryPerson = deliveryPeople[newDriverIndex];
      
      // Choose random delivery time
      const randomDeliveryTime = deliveryTimes[Math.floor(Math.random() * deliveryTimes.length)];
      
      setOrder(prevOrder => ({
        ...prevOrder,
        estimatedDelivery: randomDeliveryTime,
        licensePlate: randomLicensePlate,
        driver: randomDeliveryPerson
      }));
      
      // Only show driver update notification if the order is not complete
      if (!orderComplete) {
        toast({
          title: "Driver Update",
          description: `Your order is now being delivered by ${randomDeliveryPerson.name}`,
          duration: 3000
        });
      }
    }, Math.floor(Math.random() * 15000) + 15000); // Random time between 15-30 seconds
    
    // Show random driver messages every 15-30 seconds
    const messageTimer = setInterval(() => {
      // Only show messages if the order is in progress
      if (!orderComplete) {
        const randomMessage = driverMessages[Math.floor(Math.random() * driverMessages.length)];
        
        toast({
          title: `Message from ${order.driver?.name || 'Driver'}`,
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

  // Helper function to determine status color
  const getStatusColor = (status: string | undefined) => {
    if (!status) return 'bg-gray-500'; // Default fallback
    
    switch(status) {
      case 'processing': return 'bg-yellow-500';
      case 'in-transit': return 'bg-green-500';
      case 'delivered': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  // Helper function to get status name
  const getStatusName = (status: string | undefined) => {
    if (!status) return 'Unknown'; // Default fallback
    
    switch(status) {
      case 'processing': return 'Processing';
      case 'in-transit': return 'In Transit';
      case 'delivered': return 'Delivered';
      default: return 'Unknown';
    }
  };

  // The render section remains unchanged
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
            <div className={`w-3 h-3 rounded-full ${getStatusColor(order?.status)} mr-2`}></div>
            <span className="font-medium">{getStatusName(order?.status)}</span>
          </div>
          <span className="text-sm text-gray-400">{order?.id}</span>
        </div>
        
        {/* Progress bar */}
        <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
          <motion.div 
            className={`h-2 rounded-full ${getStatusColor(order?.status)}`}
            initial={{ width: 0 }}
            animate={{ width: `${order?.progress || 0}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <p className="text-gray-400 text-sm">{order?.statusDetails}</p>
      </div>
      
      {/* Map section */}
      <div className="h-[300px] mb-3">
        <Map 
          showRoute 
          showDeliveryInfo 
        />
      </div>
      
      {/* Driver info and order details */}
      <div className="px-4 py-2 bg-black rounded-t-3xl -mt-12 relative">
        <div className="h-1 w-12 bg-gray-700 rounded-full mx-auto mb-4"></div>
        
        {/* Driver info */}
        <div className="flex items-center mb-6">
          <img 
            src={order?.driver?.image} 
            alt={order?.driver?.name} 
            className="h-14 w-14 rounded-full object-cover mr-3"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{order?.driver?.name}</h3>
            <p className="text-gray-400">{order?.driver?.location}</p>
            <p className="text-gray-400 text-xs mt-1">Vehicle License: {order?.licensePlate}</p>
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
          <p className="font-semibold text-white text-lg">Estimated {order?.estimatedDelivery}</p>
        </div>
        
        {/* Delivery status */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 ${(order?.progress || 0) >= 20 ? 'bg-green-500' : 'bg-gray-700'} rounded-full flex items-center justify-center`}>
                <MapPin className={`h-4 w-4 ${(order?.progress || 0) >= 20 ? 'text-black' : 'text-gray-400'}`} />
              </div>
              <p className="text-xs text-gray-400 mt-1">Pickup</p>
            </div>
            <div className="flex-1 mx-1 h-0.5">
              <div className={`h-0.5 w-full border-t-2 border-dashed ${(order?.progress || 0) >= 40 ? 'border-green-500' : 'border-gray-700'}`}></div>
            </div>
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 ${(order?.progress || 0) >= 40 ? 'bg-green-500' : 'bg-gray-700'} rounded-full flex items-center justify-center`}>
                <svg className={`h-4 w-4 ${(order?.progress || 0) >= 40 ? 'text-black' : 'text-gray-400'}`} viewBox="0 0 24 24">
                  <path fill="currentColor" d="M18 18.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5m1.5-9H17V12h4.46L19.5 9.5M6 18.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5M20 8l3 4v5h-2c0 1.66-1.34 3-3 3s-3-1.34-3-3H9c0 1.66-1.34 3-3 3s-3-1.34-3-3H1V6c0-1.11.89-2 2-2h14v4h3M3 6v9h.76c.55-.61 1.35-1 2.24-1 .89 0 1.69.39 2.24 1H15V6H3z"/>
                </svg>
              </div>
              <p className="text-xs text-gray-400 mt-1">Transit</p>
            </div>
            <div className="flex-1 mx-1 h-0.5">
              <div className={`h-0.5 w-full border-t-2 border-dashed ${(order?.progress || 0) >= 80 ? 'border-green-500' : 'border-gray-700'}`}></div>
            </div>
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 ${(order?.progress || 0) >= 80 ? 'bg-green-500' : 'bg-gray-700'} rounded-full flex items-center justify-center`}>
                <svg className={`h-4 w-4 ${(order?.progress || 0) >= 80 ? 'text-black' : 'text-gray-400'}`} viewBox="0 0 24 24">
                  <path fill="currentColor" d="M18 10a1 1 0 0 1-1-1 1 1 0 0 1 1-1 1 1 0 0 1 1 1 1 1 0 0 1-1 1m-6 0H6V5h6m7.77 2.23l.01-.01-3.72-3.72L15 4.56l2.11 2.11C16.17 7 15.5 7.93 15.5 9a2.5 2.5 0 0 0 2.5 2.5c.36 0 .69-.08 1-.21v7.21a1 1 0 0 1-1 1 1 1 0 0 1-1-1V14a2 2 0 0 0-2-2h-1V5a2 2 0 0 0-2-2H6c-1.11 0-2 .89-2 2v16h10v-7.5h1.5v5a2.5 2.5 0 0 0 2.5 2.5 2.5 2.5 0 0 0 2.5-2.5V9c0-.69-.28-1.32-.73-1.77M12 10H6V9h6m0-2H6V7h6M6 19v-3h5v3H6m6-4.5V19h-1v-4.5"/>
                </svg>
              </div>
              <p className="text-xs text-gray-400 mt-1">Arriving</p>
            </div>
            <div className="flex-1 mx-1 h-0.5">
              <div className={`h-0.5 w-full border-t-2 border-dashed ${(order?.progress || 0) >= 100 ? 'border-green-500' : 'border-gray-700'}`}></div>
            </div>
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 ${(order?.progress || 0) >= 100 ? 'bg-green-500' : 'bg-gray-700'} rounded-full flex items-center justify-center`}>
                <svg className={`h-4 w-4 ${(order?.progress || 0) >= 100 ? 'text-black' : 'text-gray-400'}`} viewBox="0 0 24 24">
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
          {order?.items && order.items.map((item, i) => (
            <div key={i} className="flex justify-between mb-2">
              <p className="text-gray-300">{item.name}</p>
              <p className="font-medium">${item.price.toFixed(2)}</p>
            </div>
          ))}
          <div className="border-t border-gray-800 mt-3 pt-3">
            <div className="flex justify-between">
              <p className="font-medium">Total</p>
              <p className="font-bold">${order?.total.toFixed(2)}</p>
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
