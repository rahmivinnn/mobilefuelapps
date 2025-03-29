
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { MapPin, Phone, MessageSquare, ChevronLeft, User } from 'lucide-react';
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

const TrackCustomer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [orderId, setOrderId] = useState("");
  const [deliveryStage, setDeliveryStage] = useState(1);
  const [mapZoom, setMapZoom] = useState(14);
  const [customer] = useState(customerData);
  
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
    </div>
  );
};

export default TrackCustomer;
