
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { MapPin, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from "@/hooks/use-toast";

// Sample data
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
    id: "1", // Duplicate ID for demo
    date: "25/03/2025",
    pickupLocation: "Shell Station- Abc Town",
    dropoffLocation: "Shell Station- Abc Town",
    orderType: "Fuel delivery",
    status: "Pending"
  },
  {
    id: "1", // Duplicate ID for demo
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
  }
];

const completedOrders = [
  {
    id: "99",
    date: "24/03/2025",
    pickupLocation: "Shell Station- Downtown",
    dropoffLocation: "Shell Station- Downtown",
    orderType: "Fuel delivery",
    status: "Completed"
  }
];

type TabType = 'new' | 'active' | 'completed';

const AllOrders: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<TabType>('new');
  
  // Set initial tab based on URL query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab && (tab === 'active' || tab === 'completed')) {
      setActiveTab(tab);
    }
  }, [location]);
  
  // Function to handle job acceptance
  const handleAcceptJob = (orderId: string) => {
    toast({
      title: "Job Accepted",
      description: `You have accepted order #${orderId}`,
      duration: 3000,
    });
    
    // In a real app, you would update the order status in the backend
  };
  
  // Function to handle job cancellation
  const handleCancelJob = (orderId: string) => {
    toast({
      title: "Job Cancelled",
      description: `You have cancelled order #${orderId}`,
      duration: 3000,
    });
    
    // In a real app, you would update the order status in the backend
  };
  
  // Function to handle tab change
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };
  
  // Function to go back
  const handleGoBack = () => {
    navigate(-1);
  };
  
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
      
      {/* Header with back button */}
      <div className="p-4 flex items-center">
        <button 
          onClick={handleGoBack}
          className="h-8 w-8 rounded-full flex items-center justify-center border border-gray-700 mr-4"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-semibold">All Orders</h1>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b border-gray-800">
        <button 
          className={`flex-1 py-3 text-center ${activeTab === 'new' ? 'text-green-500 border-b-2 border-green-500' : 'text-gray-400'}`}
          onClick={() => handleTabChange('new')}
        >
          New
        </button>
        <button 
          className={`flex-1 py-3 text-center ${activeTab === 'active' ? 'text-green-500 border-b-2 border-green-500' : 'text-gray-400'}`}
          onClick={() => handleTabChange('active')}
        >
          Active
        </button>
        <button 
          className={`flex-1 py-3 text-center ${activeTab === 'completed' ? 'text-green-500 border-b-2 border-green-500' : 'text-gray-400'}`}
          onClick={() => handleTabChange('completed')}
        >
          Completed
        </button>
      </div>
      
      {/* Orders List */}
      <div className="px-4 py-4 space-y-4">
        {activeTab === 'new' && pendingOrders.map((order, index) => (
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
              <button 
                onClick={() => handleAcceptJob(order.id)}
                className="py-3 px-4 bg-green-500 rounded-lg text-black font-medium text-center"
              >
                Accept Job
              </button>
            </div>
          </motion.div>
        ))}
        
        {activeTab === 'active' && activeOrders.map((order, index) => (
          <motion.div 
            key={`${order.id}-${index}`} 
            className="bg-gray-900 rounded-lg p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
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
          </motion.div>
        ))}
        
        {activeTab === 'completed' && completedOrders.map((order, index) => (
          <motion.div 
            key={`${order.id}-${index}`} 
            className="bg-gray-900 rounded-lg p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex justify-between mb-1">
              <h4 className="font-semibold">Order #{order.id}</h4>
              <span className="px-3 py-1 text-xs bg-green-500 text-black rounded-full">
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
          </motion.div>
        ))}
        
        {/* Empty state */}
        {activeTab === 'new' && pendingOrders.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-gray-400">No new orders available</p>
          </div>
        )}
        
        {activeTab === 'active' && activeOrders.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-gray-400">You have no active orders</p>
          </div>
        )}
        
        {activeTab === 'completed' && completedOrders.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-gray-400">No completed orders</p>
          </div>
        )}
      </div>
      
      {/* Custom bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 py-2">
        <div className="max-w-md mx-auto flex justify-around">
          <Link to="/fuel-friend-home" className="flex flex-col items-center">
            <div className="h-6 w-6 text-gray-400">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
            </div>
            <span className="text-xs text-gray-400">Home</span>
          </Link>
          
          <Link to="/all-orders" className="flex flex-col items-center">
            <div className="h-6 w-6 text-green-500">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14h-2v-4H8v-2h2V9h2v2h2v2h-2v4zm3-8h-2V7h-2V5h2V3h2v2h2v2h-2z" />
              </svg>
            </div>
            <span className="text-xs text-green-500">My Orders</span>
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

export default AllOrders;
