
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Phone, MessageSquare, Bell, ChevronLeft, ChevronRight, User } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { motion } from 'framer-motion';
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';

// Sample data for pending and active orders
const pendingOrders = [
  {
    id: "1",
    date: "25/03/2025",
    pickupLocation: "Shell Station- Abc Town",
    dropoffLocation: "Shell Station- Abc Town",
    orderType: "Fuel delivery",
    status: "Pending"
  },
  {
    id: "2",
    date: "25/03/2025",
    pickupLocation: "Shell Station- Abc Town",
    dropoffLocation: "Shell Station- Abc Town",
    orderType: "Fuel delivery",
    status: "Pending"
  }
];

const activeOrders = [
  {
    id: "123",
    date: "25/03/2025",
    pickupLocation: "Shell Station- Tennessee",
    dropoffLocation: "Shell Station-Tennessee",
    orderType: "Fuel",
    status: "Active"
  },
  {
    id: "124",
    date: "25/03/2025",
    pickupLocation: "Shell Station- Tennessee",
    dropoffLocation: "Shell Station-Tennessee",
    orderType: "Fuel",
    status: "Active"
  }
];

const FuelFriendHome: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [acceptedJobs, setAcceptedJobs] = useState<string[]>([]);
  
  // Function to handle job acceptance
  const handleAcceptJob = (orderId: string) => {
    setAcceptedJobs(prev => [...prev, orderId]);
    
    toast({
      title: "Job Accepted",
      description: `You have accepted order #${orderId}`,
      duration: 3000,
    });
    
    // Show job success modal
    setTimeout(() => {
      showJobSuccessModal(orderId);
    }, 500);
  };
  
  // Function to show job success modal
  const showJobSuccessModal = (orderId: string) => {
    const modal = document.getElementById('job-success-modal');
    if (modal) {
      modal.classList.remove('hidden');
    }
  };
  
  // Function to close job success modal
  const closeJobSuccessModal = () => {
    const modal = document.getElementById('job-success-modal');
    if (modal) {
      modal.classList.add('hidden');
    }
  };
  
  // Function to handle tracking from modal
  const handleTrackFromModal = () => {
    closeJobSuccessModal();
    navigate(`/track-customer?orderId=1`);
  };
  
  // Function to handle job cancellation
  const handleCancelJob = (orderId: string) => {
    toast({
      title: "Job Cancelled",
      description: `You have cancelled order #${orderId}`,
      duration: 3000,
    });
  };
  
  // Function to handle customer tracking
  const handleTrackCustomer = (orderId: string) => {
    navigate(`/track-customer?orderId=${orderId}`);
  };
  
  // Function to handle calling customer
  const handleCall = (orderId: string) => {
    navigate(`/call?orderId=${orderId}`);
  };
  
  // Function to handle messaging customer
  const handleMessage = (orderId: string) => {
    navigate(`/chat?orderId=${orderId}`);
  };
  
  // Simulating real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      const randomEvent = Math.floor(Math.random() * 4);
      
      if (randomEvent === 0) {
        toast({
          title: "New Order Request",
          description: "You have received a new order request",
          duration: 3000,
        });
      }
    }, 30000); // Check for updates every 30 seconds
    
    return () => clearInterval(interval);
  }, [toast]);
  
  return (
    <div className="min-h-screen bg-black text-white max-w-md mx-auto pb-16">
      {/* Status bar (mock) */}
      <div className="flex justify-between items-center p-2 text-xs">
        <div>8:45</div>
        <div className="flex items-center space-x-1">
          <div className="h-3 w-3">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <div className="h-3 w-3">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 1h22v22H1z" />
            </svg>
          </div>
          <div>100%</div>
        </div>
      </div>
      
      {/* Header */}
      <div className="p-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Avatar className="h-12 w-12 border-2 border-green-500">
            <AvatarFallback className="bg-gray-800">
              <User className="h-6 w-6 text-green-500" />
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-gray-400 text-sm">Hello!</p>
            <h2 className="text-xl font-semibold">Fuel Friend</h2>
          </div>
        </div>
        
        {/* Notification bell */}
        <button className="h-10 w-10 flex items-center justify-center rounded-full">
          <Bell className="h-6 w-6" />
        </button>
      </div>
      
      {/* Order Requests section */}
      <div className="mt-6 px-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xl font-semibold">Order Requests</h3>
          <Link to="/all-orders" className="text-green-500 flex items-center">
            See all
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        {/* Pending orders */}
        <div className="space-y-4">
          {pendingOrders.map((order, index) => (
            <motion.div 
              key={`${order.id}-${index}`} 
              className="bg-gray-900 rounded-lg p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex justify-between mb-1">
                <h4 className="font-semibold">Order #{order.id}</h4>
                <span className="px-3 py-1 text-xs bg-amber-600 text-black rounded-full">
                  {order.status}
                </span>
              </div>
              <p className="text-sm text-gray-400 mb-2">{order.date}</p>
              
              <div className="space-y-2 mb-3">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Pickup: {order.pickupLocation}</p>
                </div>
                <div className="flex items-start">
                  <div className="h-5 w-5 flex items-center justify-center mr-2 flex-shrink-0">
                    <span className="h-2 w-2 rounded-full bg-red-500"></span>
                  </div>
                  <p className="text-sm">Drop off: {order.dropoffLocation}</p>
                </div>
                <div className="flex items-start">
                  <div className="h-5 w-5 flex items-center justify-center mr-2 text-green-500 flex-shrink-0">
                    ☑
                  </div>
                  <p className="text-sm">Order type: {order.orderType}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mt-4">
                <button 
                  onClick={() => handleCancelJob(order.id)}
                  className="py-3 px-4 bg-gray-800 rounded-lg text-white text-center"
                >
                  Cancel Job
                </button>
                {acceptedJobs.includes(order.id) ? (
                  <button 
                    className="py-3 px-4 bg-gray-600 rounded-lg text-white font-medium text-center"
                    disabled
                  >
                    Accepted
                  </button>
                ) : (
                  <button 
                    onClick={() => handleAcceptJob(order.id)}
                    className="py-3 px-4 bg-green-500 rounded-lg text-black font-medium text-center"
                  >
                    Accept Job
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Current Orders section */}
      <div className="mt-8 px-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xl font-semibold">Current orders</h3>
          <Link to="/all-orders?tab=active" className="text-green-500 flex items-center">
            See all
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        {/* Active orders */}
        <div className="space-y-4">
          {activeOrders.map((order, index) => (
            <motion.div 
              key={`${order.id}-${index}`} 
              className="bg-gray-900 rounded-lg p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + (index * 0.1) }}
            >
              <div className="flex justify-between mb-1">
                <h4 className="font-semibold">Order #{order.id}</h4>
                <span className="px-3 py-1 text-xs bg-blue-400 text-black rounded-full">
                  {order.status}
                </span>
              </div>
              <p className="text-sm text-gray-400 mb-2">{order.date}</p>
              
              <div className="space-y-2 mb-3">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Pickup: {order.pickupLocation}</p>
                </div>
                <div className="flex items-start">
                  <div className="h-5 w-5 flex items-center justify-center mr-2 flex-shrink-0">
                    <span className="h-2 w-2 rounded-full bg-red-500"></span>
                  </div>
                  <p className="text-sm">Drop off: {order.dropoffLocation}</p>
                </div>
                <div className="flex items-start">
                  <div className="h-5 w-5 flex items-center justify-center mr-2 text-green-500 flex-shrink-0">
                    ☑
                  </div>
                  <p className="text-sm">Order type: {order.orderType}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <button 
                  onClick={() => handleCall(order.id)}
                  className="flex items-center text-green-500"
                >
                  <Phone className="h-5 w-5 mr-1" />
                  <span>Call</span>
                </button>
                
                <button 
                  onClick={() => handleMessage(order.id)}
                  className="flex items-center text-green-500"
                >
                  <MessageSquare className="h-5 w-5 mr-1" />
                  <span>Message</span>
                </button>
                
                <button 
                  onClick={() => handleTrackCustomer(order.id)}
                  className="py-2 px-4 bg-green-500 rounded-lg text-black text-sm"
                >
                  Track Customer
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Job Success Modal */}
      <div id="job-success-modal" className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 hidden">
        <div className="bg-black mx-4 rounded-2xl max-w-md w-full p-6 border border-gray-800">
          <div className="flex justify-end">
            <button onClick={closeJobSuccessModal} className="h-8 w-8 flex items-center justify-center rounded-full">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="h-6 w-6">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="h-24 w-24 rounded-full bg-black flex items-center justify-center mb-4 relative">
              <div className="h-20 w-20 rounded-full border-4 border-green-500 absolute animate-pulse"></div>
              <svg className="h-12 w-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            
            <h2 className="text-2xl font-bold mb-3">Job Started Successfully!</h2>
            <p className="text-gray-400 mb-6">Track your customer's location to ensure a smooth delivery!</p>
            
            <div className="space-y-3 w-full mb-6">
              <div className="flex items-center text-left">
                <div className="h-6 w-6 text-red-500 mr-3">
                  <MapPin className="h-6 w-6" />
                </div>
                <span>Pickup: Shell Station- Abc Town</span>
              </div>
              
              <div className="flex items-center text-left">
                <div className="h-6 w-6 flex items-center justify-center mr-3">
                  <span className="h-3 w-3 rounded-full bg-red-500"></span>
                </div>
                <span>Drop off: Shell Station- Abc Town</span>
              </div>
              
              <div className="flex items-center text-left">
                <div className="h-6 w-6 text-green-500 mr-3">
                  ☑
                </div>
                <span>Order type: Fuel delivery</span>
              </div>
            </div>
            
            <button 
              onClick={handleTrackFromModal}
              className="w-full py-4 bg-green-500 rounded-full text-black font-semibold"
            >
              Track Order
            </button>
          </div>
        </div>
      </div>
      
      {/* Custom bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 py-2">
        <div className="max-w-md mx-auto flex justify-around">
          <Link to="/fuel-friend-home" className="flex flex-col items-center">
            <div className="h-6 w-6 text-green-500">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
            </div>
            <span className="text-xs text-green-500">Home</span>
          </Link>
          
          <Link to="/all-orders" className="flex flex-col items-center">
            <div className="h-6 w-6 text-gray-400">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14h-2v-4H8v-2h2V9h2v2h2v2h-2v4zm3-8h-2V7h-2V5h2V3h2v2h2v2h-2z" />
              </svg>
            </div>
            <span className="text-xs text-gray-400">My Orders</span>
          </Link>
          
          <Link to="/wallet" className="flex flex-col items-center">
            <div className="h-6 w-6 text-gray-400">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
              </svg>
            </div>
            <span className="text-xs text-gray-400">Wallet</span>
          </Link>
          
          <Link to="/settings" className="flex flex-col items-center">
            <div className="h-6 w-6 text-gray-400">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
              </svg>
            </div>
            <span className="text-xs text-gray-400">Settings</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FuelFriendHome;
