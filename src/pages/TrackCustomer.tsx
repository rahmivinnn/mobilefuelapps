
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { MapPin, Phone, MessageSquare, ChevronLeft, User, X, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from "@/hooks/use-toast";

// Sample customer data
const customerData = {
  id: "123",
  name: "John Doe",
  address: "123 Memphis St, Memphis, TN",
  phone: "+1 (901) 555-1234",
  location: { lat: 35.149, lng: -90.048 },
  avatar: "/lovable-uploads/30d22db4-3900-420c-92ef-c56914fef98a.png"
};

// Sample order data
const orderData = {
  id: "1",
  date: "25/03/2025",
  pickupLocation: "Shell Station- Abc Town",
  dropoffLocation: "Shell Station- Abc Town",
  orderType: "Fuel delivery",
  status: "Active"
};

const TrackCustomer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [orderId, setOrderId] = useState("");
  const [deliveryStage, setDeliveryStage] = useState(1);
  const [mapZoom, setMapZoom] = useState(14);
  const [customer] = useState(customerData);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  // Parse the orderId from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get('orderId');
    if (id) {
      setOrderId(id);
    }
  }, [location]);
  
  // Simulate delivery progress
  useEffect(() => {
    const timer = setInterval(() => {
      setDeliveryStage(prev => {
        // Cycle through stages 1-4
        const nextStage = prev >= 4 ? 1 : prev + 1;
        
        // Show notification based on stage
        if (nextStage === 2) {
          toast({
            title: "Approaching Customer",
            description: "You are 5 minutes away from the customer's location",
            duration: 3000,
          });
        } else if (nextStage === 3) {
          toast({
            title: "Almost There",
            description: "Customer has been notified of your arrival",
            duration: 3000,
          });
        } else if (nextStage === 4) {
          toast({
            title: "Delivery Complete",
            description: "Thank you for completing this delivery!",
            duration: 3000,
          });
        }
        
        return nextStage;
      });
    }, 15000); // Update every 15 seconds for demo
    
    return () => clearInterval(timer);
  }, [toast]);
  
  // Show success modal immediately on entering page
  useEffect(() => {
    setTimeout(() => {
      setShowSuccessModal(true);
    }, 1000);
  }, []);
  
  // Function to handle calling customer
  const handleCall = () => {
    navigate(`/call?customerId=${customer.id}`);
  };
  
  // Function to handle messaging customer
  const handleMessage = () => {
    navigate(`/chat?customerId=${customer.id}`);
  };
  
  // Function to go back
  const handleGoBack = () => {
    navigate(-1);
  };
  
  // Function to update zoom level
  const handleZoomIn = () => {
    setMapZoom(prev => Math.min(prev + 1, 18));
  };
  
  const handleZoomOut = () => {
    setMapZoom(prev => Math.max(prev - 1, 10));
  };
  
  // Function to handle tracking from modal
  const handleTrackFromModal = () => {
    setShowSuccessModal(false);
  };
  
  // Function to close modal
  const handleCloseModal = () => {
    setShowSuccessModal(false);
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
        <h1 className="text-xl font-semibold">Track Customer</h1>
      </div>
      
      {/* Job Status */}
      <div className="px-4 py-2">
        <h2 className="text-2xl font-bold">Job accepted</h2>
      </div>
      
      {/* Order Details */}
      <div className="px-4 py-2">
        <div className="bg-gray-900 rounded-lg p-4">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="font-semibold text-lg">Order #{orderId}</h2>
              <p className="text-green-500 text-sm">In progress</p>
            </div>
            <div className="bg-blue-400 px-3 py-1 rounded-full text-black text-xs">
              Active
            </div>
          </div>
          
          <div className="mt-3 flex items-center">
            <img 
              src={customer.avatar} 
              alt={customer.name}
              className="h-12 w-12 rounded-full object-cover mr-3"
            />
            <div>
              <h3 className="font-medium">{customer.name}</h3>
              <p className="text-sm text-gray-400">{customer.address}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Map */}
      <div className="mt-4 relative h-[350px] bg-gray-800">
        {/* Mock Map */}
        <div className="w-full h-full overflow-hidden relative">
          <img 
            src="/lovable-uploads/f7931378-76e5-4e0a-bc3c-1d7b4fff6f0d.png"
            alt="Map" 
            className="w-full h-full object-cover"
            style={{ transform: `scale(${mapZoom / 14})`, transformOrigin: 'center' }}
          />
          
          {/* Navigation route */}
          <div className="absolute inset-0 pointer-events-none">
            <svg width="100%" height="100%" className="absolute">
              <path
                d="M300,900 C350,750 400,650 450,500 C500,300 550,200 650,180"
                stroke="#4ade80"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="12,12"
                className="animate-dash"
              />
            </svg>
          </div>
          
          {/* Customer location */}
          <div className="absolute top-1/4 right-1/4 z-20">
            <div className="relative">
              <div className="h-8 w-8 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div className="absolute inset-0 h-8 w-8 bg-red-500/50 rounded-full animate-ping opacity-75"></div>
            </div>
          </div>
          
          {/* Driver location (that's you) */}
          <div 
            className="absolute z-30 transition-all duration-700"
            style={{
              top: `${50 + (deliveryStage * 5)}%`,
              left: `${40 + (deliveryStage * 2)}%`,
            }}
          >
            <div className="relative">
              <div className="h-10 w-10 bg-green-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg animate-pulse">
                <MapPin className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Map controls */}
        <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
          <button 
            className="h-10 w-10 bg-white rounded-full flex items-center justify-center shadow-md"
            onClick={handleZoomIn}
          >
            <div className="h-5 w-5 flex items-center justify-center text-xl font-bold text-gray-700">+</div>
          </button>
          <button 
            className="h-10 w-10 bg-white rounded-full flex items-center justify-center shadow-md"
            onClick={handleZoomOut}
          >
            <div className="h-5 w-5 flex items-center justify-center text-2xl font-bold text-gray-700">−</div>
          </button>
        </div>
        
        {/* ETA badge */}
        <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm px-4 py-2 rounded-lg">
          <p className="text-sm text-gray-400">Estimated arrival</p>
          <p className="text-xl font-semibold">
            {deliveryStage === 1 ? "10 min" : 
             deliveryStage === 2 ? "5 min" : 
             deliveryStage === 3 ? "1 min" : "Arrived"}
          </p>
        </div>
      </div>
      
      {/* Delivery progress */}
      <div className="px-4 pt-4">
        <h3 className="font-medium mb-4">Delivery Progress</h3>
        
        <div className="relative">
          {/* Progress line */}
          <div className="absolute left-[15px] top-0 bottom-0 w-0.5 bg-gray-700"></div>
          
          {/* Progress steps */}
          <div className="space-y-8">
            <div className="flex items-start">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-4 z-10 ${deliveryStage >= 1 ? 'bg-green-500' : 'bg-gray-700'}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 text-white">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="font-medium">Order Accepted</p>
                <p className="text-sm text-gray-400">You've started this delivery</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-4 z-10 ${deliveryStage >= 2 ? 'bg-green-500' : 'bg-gray-700'}`}>
                {deliveryStage >= 2 ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 text-white">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="text-white text-sm">2</span>
                )}
              </div>
              <div>
                <p className="font-medium">En Route</p>
                <p className="text-sm text-gray-400">Navigating to customer location</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-4 z-10 ${deliveryStage >= 3 ? 'bg-green-500' : 'bg-gray-700'}`}>
                {deliveryStage >= 3 ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 text-white">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="text-white text-sm">3</span>
                )}
              </div>
              <div>
                <p className="font-medium">Arriving Soon</p>
                <p className="text-sm text-gray-400">Almost at customer's location</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-4 z-10 ${deliveryStage >= 4 ? 'bg-green-500' : 'bg-gray-700'}`}>
                {deliveryStage >= 4 ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 text-white">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="text-white text-sm">4</span>
                )}
              </div>
              <div>
                <p className="font-medium">Delivery Complete</p>
                <p className="text-sm text-gray-400">Order has been delivered successfully</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contact Customer */}
      <div className="px-4 py-6 mt-4">
        <div className="flex space-x-4">
          <button 
            onClick={handleCall}
            className="flex-1 bg-green-500 text-black rounded-lg py-3 flex items-center justify-center space-x-2"
          >
            <Phone className="h-5 w-5" />
            <span>Call Customer</span>
          </button>
          
          <button 
            onClick={handleMessage}
            className="flex-1 bg-gray-800 text-white rounded-lg py-3 flex items-center justify-center space-x-2"
          >
            <MessageSquare className="h-5 w-5" />
            <span>Message</span>
          </button>
        </div>
      </div>
      
      {/* Job Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-black mx-4 rounded-2xl max-w-md w-full p-6 border border-gray-800">
            <div className="flex justify-end">
              <button onClick={handleCloseModal} className="h-8 w-8 flex items-center justify-center rounded-full">
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="h-24 w-24 rounded-full bg-black flex items-center justify-center mb-4 relative">
                <div className="h-20 w-20 rounded-full border-4 border-green-500 absolute animate-pulse"></div>
                <Check className="h-12 w-12 text-green-500" />
              </div>
              
              <h2 className="text-2xl font-bold mb-3">Job Started Successfully!</h2>
              <p className="text-gray-400 mb-6">Track your customer's location to ensure a smooth delivery!</p>
              
              <div className="space-y-3 w-full mb-6">
                <div className="flex items-center text-left">
                  <MapPin className="h-6 w-6 text-red-500 mr-3" />
                  <span>Pickup: {orderData.pickupLocation}</span>
                </div>
                
                <div className="flex items-center text-left">
                  <div className="h-6 w-6 flex items-center justify-center mr-3">
                    <span className="h-3 w-3 rounded-full bg-red-500"></span>
                  </div>
                  <span>Drop off: {orderData.dropoffLocation}</span>
                </div>
                
                <div className="flex items-center text-left">
                  <div className="h-6 w-6 text-green-500 mr-3">
                    ☑
                  </div>
                  <span>Order type: {orderData.orderType}</span>
                </div>
              </div>
              
              <button 
                onClick={handleTrackFromModal}
                className="w-full py-4 bg-green-500 rounded-full text-black font-semibold"
              >
                Track Customer
              </button>
            </div>
          </div>
        </div>
      )}
      
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

export default TrackCustomer;
