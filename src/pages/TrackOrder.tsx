
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, ShoppingBag, MapPin, Settings, Phone, MessageSquare, Share2 } from 'lucide-react';
import Map from '@/components/ui/Map';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import BottomNav from '@/components/layout/BottomNav';

const TrackOrder: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = useState({
    id: 'ORD-1234',
    status: 'in-transit',
    estimatedDelivery: '8:30 - 9:15 PM',
    items: [
      { name: 'Regular Unleaded', quantity: '5 Gallons', price: 18.95 },
      { name: 'Snickers bars', quantity: '2x', price: 3.50 }
    ],
    total: 22.45,
    driver: {
      name: 'Robin Sharma',
      location: 'Memphis, TN',
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
    <div className="min-h-screen bg-background pb-20 max-w-md mx-auto">
      {/* Header */}
      <div className="relative px-4 py-3 flex items-center justify-center">
        <Link to="/orders" className="absolute left-4">
          <div className="h-10 w-10 flex items-center justify-center rounded-full bg-background border border-border">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </Link>
        <h1 className="text-xl font-semibold">Track Your Order</h1>
        <button className="absolute right-4 h-10 w-10 flex items-center justify-center rounded-full bg-background border border-border">
          <Share2 className="h-5 w-5" />
        </button>
      </div>
      
      {/* Map section */}
      <div className="h-[300px] mb-3">
        <Map showRoute showDeliveryInfo />
      </div>
      
      {/* Driver info */}
      <div className="px-4 py-2">
        <div className="bg-card rounded-xl p-4 border border-border">
          <div className="flex items-center mb-4">
            <img 
              src={order.driver.image} 
              alt={order.driver.name} 
              className="h-14 w-14 rounded-full object-cover border-2 border-green-500 mr-3"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{order.driver.name}</h3>
              <div className="flex items-center">
                <p className="text-muted-foreground text-sm">{order.driver.location}</p>
                <div className="ml-2 flex items-center">
                  <svg className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-sm font-medium ml-1">{order.driver.rating}</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button 
                onClick={handleMessage}
                className="h-12 w-12 p-0 rounded-full bg-green-500 hover:bg-green-600"
              >
                <MessageSquare className="h-6 w-6 text-white" />
              </Button>
              <Button 
                onClick={handleCall}
                className="h-12 w-12 p-0 rounded-full bg-green-500 hover:bg-green-600"
              >
                <Phone className="h-6 w-6 text-white" />
              </Button>
            </div>
          </div>
          
          <div className="mb-4">
            <h4 className="text-muted-foreground text-sm mb-1">Your Delivery Time</h4>
            <p className="font-semibold">Estimated {order.estimatedDelivery}</p>
          </div>
          
          <div className="mb-4 relative">
            <div className="flex justify-between items-center">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 z-10">
                <MapPin className="h-3 w-3 text-white" />
              </div>
              <div className="flex-1 mx-2">
                <div className="h-0.5 border-t-2 border-dashed border-green-500"></div>
              </div>
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 z-10">
                <svg className="h-3 w-3 text-white" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M18 18.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5m1.5-9H17V12h4.46L19.5 9.5M6 18.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5M20 8l3 4v5h-2c0 1.66-1.34 3-3 3s-3-1.34-3-3H9c0 1.66-1.34 3-3 3s-3-1.34-3-3H1V6c0-1.11.89-2 2-2h14v4h3M3 6v9h.76c.55-.61 1.35-1 2.24-1 .89 0 1.69.39 2.24 1H15V6H3z"/>
                </svg>
              </div>
              <div className="flex-1 mx-2">
                <div className="h-0.5 border-t-2 border-dashed border-green-500"></div>
              </div>
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 z-10">
                <svg className="h-3 w-3 text-white" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M18 10a1 1 0 0 1-1-1 1 1 0 0 1 1-1 1 1 0 0 1 1 1 1 1 0 0 1-1 1m-6 0H6V5h6m7.77 2.23l.01-.01-3.72-3.72L15 4.56l2.11 2.11C16.17 7 15.5 7.93 15.5 9a2.5 2.5 0 0 0 2.5 2.5c.36 0 .69-.08 1-.21v7.21a1 1 0 0 1-1 1 1 1 0 0 1-1-1V14a2 2 0 0 0-2-2h-1V5a2 2 0 0 0-2-2H6c-1.11 0-2 .89-2 2v16h10v-7.5h1.5v5a2.5 2.5 0 0 0 2.5 2.5 2.5 2.5 0 0 0 2.5-2.5V9c0-.69-.28-1.32-.73-1.77M12 10H6V9h6m0-2H6V7h6M6 19v-3h5v3H6m6-4.5V19h-1v-4.5"/>
                </svg>
              </div>
              <div className="flex-1 mx-2">
                <div className="h-0.5 border-t-2 border-dashed border-muted-foreground"></div>
              </div>
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-muted z-10">
                <svg className="h-3 w-3 text-muted-foreground" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              </div>
            </div>
            
            <div className="flex justify-between mt-1 text-xs">
              <span className="text-left pl-1">Pickup</span>
              <span className="text-center">In Transit</span>
              <span className="text-center">Arriving</span>
              <span className="text-right pr-1 text-muted-foreground">Delivered</span>
            </div>
          </div>
          
          <div className="pt-2 border-t border-border">
            <h4 className="text-sm font-medium mb-2">Order</h4>
            {order.items.map((item, i) => (
              <div key={i} className="flex justify-between mb-1">
                <span className="text-muted-foreground text-sm">{item.name}</span>
                <span className="font-medium">${item.price.toFixed(2)}</span>
              </div>
            ))}
            <div className="flex justify-between mt-2 pt-2 border-t border-border">
              <span className="font-semibold">Total</span>
              <span className="font-semibold">${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default TrackOrder;
