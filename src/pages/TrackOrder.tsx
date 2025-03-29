
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MapPin, Phone, MessageSquare, Share2, ChevronLeft, Home, ShoppingBag, Map as MapIcon, Settings } from 'lucide-react';
import Map from '@/components/ui/Map';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const TrackOrder: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = useState({
    id: 'ORD-1234',
    status: 'in-transit',
    estimatedDelivery: '8:30 - 9:15 PM',
    items: [
      { name: '2 Liters Fuel', quantity: '1x', price: 283 },
      { name: 'Chocolate cookies', quantity: '2x', price: 20 }
    ],
    total: 303,
    driver: {
      name: 'Cristopert Dastin',
      location: 'Tennessee',
      image: '/lovable-uploads/a3df03b1-a154-407f-b8fe-e5dd6f0bade3.png',
      rating: 4.8,
      phone: '+1 (555) 123-4567'
    }
  });

  useEffect(() => {
    // Get orderId from URL query params
    const params = new URLSearchParams(location.search);
    const orderId = params.get('orderId');
    if (orderId) {
      // In a real app, you would fetch order details here
      console.log(`Fetching order details for ${orderId}`);
    }
  }, [location.search]);

  const handleCall = () => {
    navigate('/call');
  };

  const handleMessage = () => {
    navigate('/chat');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Status bar */}
      <div className="px-4 py-1 flex justify-between items-center">
        <div className="text-sm font-medium">8:45</div>
        <div className="flex items-center space-x-1">
          <div className="flex items-center">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
              <path d="M17 20H7C4 20 2 18 2 15V9C2 6 4 4 7 4H17C20 4 22 6 22 9V15C22 18 20 20 17 20Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M12 14V10M12 14C11.2 14 10.5 13.3 10.5 12.5V11.5C10.5 10.7 11.2 10 12 10C12.8 10 13.5 10.7 13.5 11.5V12.5C13.5 13.3 12.8 14 12 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
              <path d="M6.43994 2C4.01994 2 1.98999 4.01995 1.98999 6.43995V17.56C1.98999 19.98 4.01994 22 6.43994 22H17.5599C19.9799 22 21.9999 19.98 21.9999 17.56V6.43995C21.9999 4.01995 19.9799 2 17.5599 2H6.43994Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M11.9999 7V9M11.9999 14.01V14M7.98993 12H15.9999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="text-sm font-bold">100%</div>
        </div>
      </div>
      
      {/* Header */}
      <div className="relative px-4 py-3 flex items-center justify-center">
        <Link to="/orders" className="absolute left-4">
          <div className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-800">
            <ChevronLeft className="h-6 w-6" />
          </div>
        </Link>
        <h1 className="text-xl font-semibold">Track Your Order</h1>
      </div>
      
      {/* Map section */}
      <div className="h-[300px] mb-3">
        <Map showRoute showDeliveryInfo />
      </div>
      
      {/* Driver info and order details */}
      <div className="px-4 py-2 bg-black rounded-t-3xl -mt-12 relative">
        <div className="h-1 w-12 bg-gray-700 rounded-full mx-auto mb-4"></div>
        
        {/* Driver info */}
        <div className="flex items-center mb-6">
          <img 
            src={order.driver.image} 
            alt={order.driver.name} 
            className="h-14 w-14 rounded-full object-cover mr-3"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{order.driver.name}</h3>
            <p className="text-gray-400">{order.driver.location}</p>
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
          <p className="font-semibold text-white text-lg">Estimated {order.estimatedDelivery}</p>
        </div>
        
        {/* Delivery status */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <MapPin className="h-4 w-4 text-black" />
              </div>
              <p className="text-xs text-gray-400 mt-1">Pickup</p>
            </div>
            <div className="flex-1 mx-1 h-0.5">
              <div className="h-0.5 w-full border-t-2 border-dashed border-green-500"></div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="h-4 w-4 text-black" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M18 18.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5m1.5-9H17V12h4.46L19.5 9.5M6 18.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5M20 8l3 4v5h-2c0 1.66-1.34 3-3 3s-3-1.34-3-3H9c0 1.66-1.34 3-3 3s-3-1.34-3-3H1V6c0-1.11.89-2 2-2h14v4h3M3 6v9h.76c.55-.61 1.35-1 2.24-1 .89 0 1.69.39 2.24 1H15V6H3z"/>
                </svg>
              </div>
              <p className="text-xs text-gray-400 mt-1">Transit</p>
            </div>
            <div className="flex-1 mx-1 h-0.5">
              <div className="h-0.5 w-full border-t-2 border-dashed border-green-500"></div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="h-4 w-4 text-black" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M18 10a1 1 0 0 1-1-1 1 1 0 0 1 1-1 1 1 0 0 1 1 1 1 1 0 0 1-1 1m-6 0H6V5h6m7.77 2.23l.01-.01-3.72-3.72L15 4.56l2.11 2.11C16.17 7 15.5 7.93 15.5 9a2.5 2.5 0 0 0 2.5 2.5c.36 0 .69-.08 1-.21v7.21a1 1 0 0 1-1 1 1 1 0 0 1-1-1V14a2 2 0 0 0-2-2h-1V5a2 2 0 0 0-2-2H6c-1.11 0-2 .89-2 2v16h10v-7.5h1.5v5a2.5 2.5 0 0 0 2.5 2.5 2.5 2.5 0 0 0 2.5-2.5V9c0-.69-.28-1.32-.73-1.77M12 10H6V9h6m0-2H6V7h6M6 19v-3h5v3H6m6-4.5V19h-1v-4.5"/>
                </svg>
              </div>
              <p className="text-xs text-gray-400 mt-1">Arriving</p>
            </div>
            <div className="flex-1 mx-1 h-0.5">
              <div className="h-0.5 w-full border-t-2 border-dashed border-gray-700"></div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                <svg className="h-4 w-4 text-gray-400" viewBox="0 0 24 24">
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
          {order.items.map((item, i) => (
            <div key={i} className="flex justify-between mb-2">
              <p className="text-gray-300">{item.name}</p>
              <p className="font-medium">${item.price}</p>
            </div>
          ))}
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
