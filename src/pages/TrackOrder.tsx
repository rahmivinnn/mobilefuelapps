
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MapPin, Phone, MessageSquare, Share2, ChevronLeft, Home, ShoppingBag, Map as MapIcon, Settings, User, Star } from 'lucide-react';
import Map from '@/components/ui/Map';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from "@/hooks/use-toast";
import { orderHistory } from '@/data/dummyData';
import { useIsMobile } from '@/hooks/use-mobile';
import RatingModal from '@/components/ui/RatingModal';
import NotificationPopup from '@/components/ui/NotificationPopup';
import OrderProcessNotification from '@/components/ui/OrderProcessNotification';

const memphisLicensePlates = [
  "TN-56A782", "TN-23B471", "TN-78C912", "TN-34D654", "TN-91E349"
];

const deliveryPeople = [
  { name: "Christopher Dastin", location: "Memphis, TN", image: "/lovable-uploads/a3df03b1-a154-407f-b8fe-e5dd6f0bade3.png", rating: 4.8, phone: "+1 (901) 555-3478" },
  { name: "Sarah Johnson", location: "Memphis, TN", image: "/lovable-uploads/c3b29f6b-a689-4ac3-a338-4194cbee5e0c.png", rating: 4.7, phone: "+1 (901) 555-9872" },
  { name: "Michael Davis", location: "Memphis, TN", image: "/lovable-uploads/8a188651-80ec-4a90-8d5c-de0df713b6c7.png", rating: 4.9, phone: "+1 (901) 555-2341" },
  { name: "Emily Wilson", location: "Memphis, TN", image: "/lovable-uploads/1bc06a60-0463-4f47-abde-502bc408852e.png", rating: 4.6, phone: "+1 (901) 555-7653" }
];

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

const driverMessages = [
  "I'm on my way to your location!",
  "I'll be there in about 5 minutes.",
  "I'm nearby, please prepare for arrival.",
  "I've arrived at your location.",
  "Is there a specific place you'd like me to meet you?",
  "Thank you for using our service!"
];

const gasStations = [
  { id: '1', name: 'Shell', location: 'Memphis, TN' },
  { id: '2', name: 'ExxonMobil', location: 'Memphis, TN' },
  { id: '3', name: 'Chevron', location: 'Memphis, TN' },
  { id: '4', name: 'BP', location: 'Memphis, TN' }
];

const TrackOrder: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  const [order, setOrder] = useState<typeof defaultOrder>(defaultOrder);
  const [orderComplete, setOrderComplete] = useState(false);
  const [driverLocation, setDriverLocation] = useState({ lat: 35.149, lng: -90.048 });
  const [showDirections, setShowDirections] = useState(true);
  const [routeColor, setRouteColor] = useState('#4ade80');
  const [mapImage] = useState('/lovable-uploads/f7931378-76e5-4e0a-bc3c-1d7b4fff6f0d.png');
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [ratingServiceType, setRatingServiceType] = useState<'fuelFriend' | 'gasStation'>('fuelFriend');
  const [currentGasStation, setCurrentGasStation] = useState(gasStations[0]);
  const [showCompletionNotification, setShowCompletionNotification] = useState(false);
  const [showProcessSteps, setShowProcessSteps] = useState(false);
  const [showArrivalNotification, setShowArrivalNotification] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const orderSteps = [
    {
      id: 'step1',
      title: 'Order Received',
      description: 'Your order has been received and is being processed',
      icon: <MapPin className="h-5 w-5 text-white" />,
      completed: order.progress >= 20,
      current: order.progress < 20
    },
    {
      id: 'step2',
      title: 'Fuel Friend Assigned',
      description: `${order?.driver?.name || 'Your Fuel Friend'} is on the way`,
      icon: <User className="h-5 w-5 text-white" />,
      completed: order.progress >= 40,
      current: order.progress >= 20 && order.progress < 40
    },
    {
      id: 'step3',
      title: 'At Gas Station',
      description: 'Fuel Friend is picking up your order',
      icon: <MapPin className="h-5 w-5 text-white" />,
      completed: order.progress >= 80,
      current: order.progress >= 40 && order.progress < 80
    },
    {
      id: 'step4',
      title: 'Delivery',
      description: 'Order is being delivered to your location',
      icon: <ShoppingBag className="h-5 w-5 text-white" />,
      completed: order.progress >= 100,
      current: order.progress >= 80 && order.progress < 100
    }
  ];

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const orderId = params.get('orderId');
    
    if (orderId) {
      try {
        const foundOrder = orderHistory.find(o => o.id === orderId);
        
        if (foundOrder) {
          const randomLicensePlate = memphisLicensePlates[Math.floor(Math.random() * memphisLicensePlates.length)];
          const randomDeliveryPerson = deliveryPeople[Math.floor(Math.random() * deliveryPeople.length)];
          const randomDeliveryTime = deliveryTimes[Math.floor(Math.random() * deliveryTimes.length)];
          const randomAvatarIndex = Math.floor(Math.random() * driverAvatars.length);
          
          const initialDriverLocation = {
            lat: 35.149 + (Math.random() - 0.5) * 0.01,
            lng: -90.048 + (Math.random() - 0.5) * 0.01
          };
          
          setDriverLocation(initialDriverLocation);
          
          setOrder({
            ...defaultOrder,
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
          console.log(`Order ${orderId} not found, using default`);
          setOrder({...defaultOrder});
        }
        
        console.log(`Fetching order details for ${orderId}`, foundOrder);
      } catch (error) {
        console.error("Error processing order data:", error);
        setOrder({...defaultOrder});
        toast({
          title: "Error",
          description: "Could not load order details",
          duration: 3000,
          variant: "destructive"
        });
      }
    } else {
      setOrder({...defaultOrder});
    }
    
    const statuses = [
      { status: 'processing', progress: 0, statusDetails: 'Order received' },
      { status: 'processing', progress: 20, statusDetails: 'Processing your order' },
      { status: 'in-transit', progress: 40, statusDetails: 'Driver on the way to pickup' },
      { status: 'in-transit', progress: 60, statusDetails: 'Fuel picked up, headed your way' },
      { status: 'in-transit', progress: 80, statusDetails: 'Almost at your location' },
      { status: 'delivered', progress: 100, statusDetails: 'Delivery complete!' }
    ];
    
    let currentStep = 0;
    
    const statusTimer = setInterval(() => {
      if (currentStep < statuses.length) {
        setOrder(prevOrder => {
          const safeOrder = prevOrder || {...defaultOrder};
          return {
            ...safeOrder,
            status: statuses[currentStep].status,
            progress: statuses[currentStep].progress,
            statusDetails: statuses[currentStep].statusDetails
          };
        });
        
        if (statuses[currentStep].status === 'processing') {
          setRouteColor('#facc15');
        } else if (statuses[currentStep].status === 'in-transit') {
          setRouteColor('#4ade80');
        } else if (statuses[currentStep].status === 'delivered') {
          setRouteColor('#3b82f6');
        }
        
        // Show notification for each step
        toast({
          title: "Order Update",
          description: statuses[currentStep].statusDetails,
          duration: 3000
        });
        
        // Show arrival notification when the driver is about to arrive
        if (currentStep === 4) {
          setShowArrivalNotification(true);
          setTimeout(() => setShowArrivalNotification(false), 5000);
        }
        
        if (currentStep === statuses.length - 1) {
          setOrderComplete(true);
          setShowCompletionNotification(true);
          
          setTimeout(() => {
            toast({
              title: "Delivery Complete!",
              description: "Your order has been successfully delivered.",
              duration: 2000,
              className: "bg-green-500 border-green-600 text-white"
            });
            
            // Show confirmation dialog after delivery
            setTimeout(() => {
              setShowConfirmation(true);
            }, 2000);
          }, 1000);
        }
        
        currentStep++;
      } else {
        clearInterval(statusTimer);
      }
    }, 5000);

    const driverUpdateTimer = setInterval(() => {
      const randomLicensePlate = memphisLicensePlates[Math.floor(Math.random() * memphisLicensePlates.length)];
      
      let currentDriverIndex = -1;
      
      // Fix: Use a safe default when order is undefined
      const currentOrder = order || {...defaultOrder};
      
      if (currentOrder?.driver?.name) {
        currentDriverIndex = deliveryPeople.findIndex(driver => driver.name === currentOrder.driver.name);
      }
      
      let newDriverIndex;
      do {
        newDriverIndex = Math.floor(Math.random() * deliveryPeople.length);
      } while (newDriverIndex === currentDriverIndex && deliveryPeople.length > 1);
      
      const randomDeliveryPerson = deliveryPeople[newDriverIndex];
      
      const randomDeliveryTime = deliveryTimes[Math.floor(Math.random() * deliveryTimes.length)];
      
      setOrder(prevOrder => {
        // Fix: Use a safe default when prevOrder is undefined
        const safeOrder = prevOrder || {...defaultOrder};
        return {
          ...safeOrder,
          estimatedDelivery: randomDeliveryTime,
          licensePlate: randomLicensePlate,
          driver: randomDeliveryPerson
        };
      });
      
      if (!orderComplete) {
        toast({
          title: "Driver Update",
          description: `Your order is now being delivered by ${randomDeliveryPerson.name}`,
          duration: 3000
        });
      }
    }, Math.floor(Math.random() * 5000) + 5000);

    const messageTimer = setInterval(() => {
      if (!orderComplete) {
        const randomMessage = driverMessages[Math.floor(Math.random() * driverMessages.length)];
        // Fix: Use a safe default when order is undefined
        const currentOrder = order || {...defaultOrder};
        const driverName = currentOrder?.driver?.name || 'Driver';
        
        toast({
          title: `Message from ${driverName}`,
          description: randomMessage,
          duration: 3000,
          className: "bg-blue-500 border-blue-600 text-white"
        });
      }
    }, Math.floor(Math.random() * 15000) + 15000);

    return () => {
      clearInterval(statusTimer);
      clearInterval(driverUpdateTimer);
      clearInterval(messageTimer);
    };
  }, [location.search, toast, navigate, orderComplete]);

  useEffect(() => {
    const movementInterval = setInterval(() => {
      const newDriverLocation = {
        lat: driverLocation.lat + (Math.random() - 0.5) * 0.002,
        lng: driverLocation.lng + (Math.random() - 0.5) * 0.002
      };
      setDriverLocation(newDriverLocation);
      
      setOrder(prev => {
        // Fix: Use a safe default when prev is undefined
        const safeOrder = prev || {...defaultOrder};
        return {
          ...safeOrder,
          driverLocation: newDriverLocation
        };
      });
    }, 3000);
    
    return () => clearInterval(movementInterval);
  }, [driverLocation]);

  useEffect(() => {
    if (orderComplete) {
      const arrivalTimer = setTimeout(() => {
        toast({
          title: "Service Complete",
          description: "Your Fuel Friend has finished pumping gas and delivered your groceries!",
          duration: 2000,
          className: "bg-green-500 border-green-600 text-white"
        });
      }, 2000);
      
      return () => clearTimeout(arrivalTimer);
    }
  }, [orderComplete, toast]);

  const handleCall = () => {
    const fuelFriendName = order?.driver?.name || 'Fuel Friend';
    navigate(`/call?fuelFriendName=${encodeURIComponent(fuelFriendName)}`);
  };

  const handleMessage = () => {
    const fuelFriendName = order?.driver?.name || 'Fuel Friend';
    navigate(`/chat?fuelFriendName=${encodeURIComponent(fuelFriendName)}`);
  };

  const toggleDirections = () => {
    setShowDirections(!showDirections);
  };

  const getStatusColor = (status: string | undefined) => {
    if (!status) return 'bg-gray-500';
    
    switch(status) {
      case 'processing': return 'bg-yellow-500';
      case 'in-transit': return 'bg-green-500';
      case 'delivered': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusName = (status: string | undefined) => {
    if (!status) return 'Unknown';
    
    switch(status) {
      case 'processing': return 'Processing';
      case 'in-transit': return 'In Transit';
      case 'delivered': return 'Delivered';
      default: return 'Unknown';
    }
  };

  const handleSubmitRating = (rating: number, comment: string) => {
    console.log(`Rating submitted for ${ratingServiceType}:`, { rating, comment });
    
    // If user just rated a fuel friend, now ask them to rate the gas station
    if (ratingServiceType === 'fuelFriend') {
      toast({
        title: "Rating Submitted",
        description: "Thank you for rating your Fuel Friend!",
        className: "bg-green-500 border-green-600 text-white"
      });
      
      setTimeout(() => {
        setRatingServiceType('gasStation');
        setShowRatingModal(true);
      }, 500);
    } else {
      // Both ratings are complete, navigate to home or another page
      toast({
        title: "Rating Submitted",
        description: "Thank you for rating the gas station!",
        className: "bg-green-500 border-green-600 text-white"
      });
      
      setTimeout(() => {
        navigate('/');
      }, 1500);
    }
  };

  const handleConfirmOrder = () => {
    setShowConfirmation(false);
    
    toast({
      title: "Order Confirmed",
      description: "Payment has been processed successfully",
      className: "bg-green-500 border-green-600 text-white"
    });
    
    // Show rating modal after confirmation
    setTimeout(() => {
      setRatingServiceType('fuelFriend');
      setShowRatingModal(true);
    }, 1000);
  };

  const handleViewOrderDetails = () => {
    setShowProcessSteps(true);
  };

  // Safely extract values from order with fallbacks
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
  const driverImage = order?.driver?.image;

  const driverAvatar = driverAvatars[avatarIndex] || driverAvatars[0];

  return (
    <div className="fixed inset-0 flex flex-col bg-black text-white">
      <div className="relative px-4 py-3 flex items-center justify-center">
        <Link to="/orders" className="absolute left-4">
          <div className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-800">
            <ChevronLeft className="h-6 w-6" />
          </div>
        </Link>
        <h1 className="text-xl font-semibold">Track Fuel Friend</h1>
      </div>
      
      <div className="px-4 py-2">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <div className={`w-3 h-3 rounded-full ${getStatusColor(status)} mr-2`}></div>
            <span className="font-medium">{getStatusName(status)}</span>
          </div>
          <span className="text-sm text-gray-400">{orderId}</span>
        </div>
        
        <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
          <motion.div 
            className={`h-2 rounded-full ${getStatusColor(status)}`}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <div className="flex justify-between items-center">
          <p className="text-gray-400 text-sm">{statusDetails}</p>
          <Button 
            variant="link" 
            className="text-green-500 p-0 h-auto text-sm"
            onClick={handleViewOrderDetails}
          >
            View Details
          </Button>
        </div>
      </div>
      
      <div className={`${isMobile ? 'h-[350px]' : 'h-[300px]'} mb-4 mt-2 relative`}>
        <Map 
          interactive={true}
          showRoute={true}
          animate={true}
          driverName={driverName}
          driverLocation={driverLocation}
        />
      </div>
      
      <div className="px-4 py-2 bg-black relative">
        <div className="flex items-center mb-6">
          <div className="mr-3">
            {driverImage ? (
              <div className="h-14 w-14 rounded-full overflow-hidden border-2 border-white">
                <img src={driverImage} alt={driverName} className="w-full h-full object-cover" />
              </div>
            ) : (
              driverAvatar
            )}
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
        
        <div className="mb-6">
          <h4 className="text-gray-400 mb-1">Your Fuel Friend Will Arrive</h4>
          <p className="font-semibold text-white text-lg">Estimated {estimatedDelivery}</p>
        </div>
        
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 ${progress >= 20 ? 'bg-green-500' : 'bg-gray-700'} rounded-full flex items-center justify-center`}>
                <MapPin className={`h-4 w-4 ${progress >= 20 ? 'text-black' : 'text-gray-400'}`} />
              </div>
              <p className="text-xs text-gray-400 mt-1">Assigned</p>
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
              <p className="text-xs text-gray-400 mt-1">At Station</p>
            </div>
            <div className="flex-1 mx-1 h-0.5">
              <div className={`h-0.5 w-full border-t-2 border-dashed ${progress >= 80 ? 'border-green-500' : 'border-gray-700'}`}></div>
            </div>
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 ${progress >= 80 ? 'bg-green-500' : 'bg-gray-700'} rounded-full flex items-center justify-center`}>
                <svg className={`h-4 w-4 ${progress >= 80 ? 'text-black' : 'text-gray-400'}`} viewBox="0 0 24 24">
                  <path fill="currentColor" d="M18 10a1 1 0 0 1-1-1 1 1 0 0 1 1-1 1 1 0 0 1 1 1 1 1 0 0 1-1 1m-6 0H6V5h6m7.77 2.23l.01-.01-3.72-3.72L15 4.56l2.11 2.11C16.17 7 15.5 7.93 15.5 9a2.5 2.5 0 0 0 2.5 2.5c.36 0 .69-.08 1-.21v7.21a1 1 0 0 1-1 1 1 1 0 0 1-1-1V14a2 2 0 0 0-2-2h-1V5a2 2 0 0 0-2-2H6c-1.11 0-2 .89-2 2v16h10v-7.5h1.5v5a2.5 2.5 0 0 0 2.5 2.5 2.5 2.5 0 0 0 2.5-2.5V9c0-.69-.28-1.32-.73-1.77M12 10H6V9h6m0-2H6V7h6M6 19v-3h5v3H6m0-4.5V19h-1v-4.5"/>
                </svg>
              </div>
              <p className="text-xs text-gray-400 mt-1">Pumping</p>
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
              <p className="text-xs text-gray-400 mt-1">Complete</p>
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-3">Your Order</h3>
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

      {/* Order Completion Popup Notification */}
      <AnimatePresence>
        {showCompletionNotification && (
          <motion.div 
            className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-green-500 rounded-xl p-4 shadow-lg z-50 w-11/12 max-w-sm"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <div className="flex items-start">
              <div className="bg-white rounded-full p-2 mr-3">
                <svg className="h-8 w-8 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-black font-bold text-lg">Order Complete!</h3>
                <p className="text-black/80 text-sm">Your fuel has been delivered. Please rate your experience.</p>
              </div>
              <button 
                onClick={() => setShowCompletionNotification(false)}
                className="text-black/60 hover:text-black"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-3 flex justify-end">
              <button 
                onClick={() => {
                  setShowCompletionNotification(false);
                  setRatingServiceType('fuelFriend');
                  setShowRatingModal(true);
                }}
                className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium"
              >
                Rate Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Driver Arrival Notification */}
      <NotificationPopup
        type="info"
        title="Driver Arrival"
        message={`${driverName} is arriving at your location! Please be ready to confirm arrival.`}
        isOpen={showArrivalNotification}
        onClose={() => setShowArrivalNotification(false)}
        actionText="View Details"
        onAction={() => {
          setShowArrivalNotification(false);
          setShowProcessSteps(true);
        }}
        image={driverImage}
      />

      {/* Order Confirmation Dialog */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="w-[90%] max-w-md p-6 bg-black border border-gray-800 rounded-xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="flex flex-col items-center mb-6">
                <div className="h-20 w-20 rounded-full bg-green-500 flex items-center justify-center mb-4">
                  <svg className="h-10 w-10 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-white mb-2">Confirm Delivery</h2>
                <p className="text-gray-400 text-center">
                  Your Fuel Friend has marked this order as complete. Please confirm that you have received your order.
                </p>
              </div>
              
              <div className="mb-4 bg-gray-800 rounded-lg p-4">
                <h3 className="font-medium mb-2">Order Summary</h3>
                {orderItems.map((item, i) => (
                  <div key={i} className="flex justify-between mb-2 text-sm">
                    <p className="text-gray-300">{item.name}</p>
                    <p className="font-medium">${item.price.toFixed(2)}</p>
                  </div>
                ))}
                <div className="border-t border-gray-700 mt-3 pt-3">
                  <div className="flex justify-between">
                    <p className="font-medium">Total</p>
                    <p className="font-bold">${orderTotal.toFixed(2)}</p>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-400 mb-4">
                By confirming, you agree that you have received the order as described above. 
                Your payment will be processed and released to the Fuel Friend after admin verification.
              </p>
              
              <div className="flex space-x-3">
                <Button 
                  onClick={() => setShowConfirmation(false)}
                  className="flex-1 bg-gray-800 hover:bg-gray-700 text-white"
                  variant="outline"
                >
                  Report Issue
                </Button>
                <Button 
                  onClick={handleConfirmOrder}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-black"
                >
                  Confirm Receipt
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Order Process Steps Dialog */}
      <OrderProcessNotification
        isOpen={showProcessSteps}
        steps={orderSteps}
        onClose={() => setShowProcessSteps(false)}
      />

      {/* Rating Modal */}
      <RatingModal 
        isOpen={showRatingModal}
        onClose={() => setShowRatingModal(false)}
        serviceName={ratingServiceType === 'fuelFriend' ? order?.driver?.name || 'Your Fuel Friend' : 'Gas Station'}
        serviceImage={ratingServiceType === 'fuelFriend' ? order?.driver?.image : undefined}
        serviceType={ratingServiceType}
        onSubmitRating={handleSubmitRating}
      />
    </div>
  );
};

export default TrackOrder;
