
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Home, MapPin, Settings, Calendar, Clock, ChevronRight, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import BottomNav from '@/components/layout/BottomNav';

const orders = [
  {
    id: 'ORD-1234',
    date: '2023-09-15',
    time: '14:30',
    stationName: 'Shell Gas Station',
    items: [
      { name: 'Regular Unleaded', quantity: '5 Gallons', price: 18.95 },
      { name: 'Snickers', quantity: '2x', price: 3.50 }
    ],
    total: 22.45,
    status: 'delivered',
    paymentMethod: 'Credit Card',
  },
  {
    id: 'ORD-1235',
    date: '2023-09-12',
    time: '10:15',
    stationName: 'ExxonMobil',
    items: [
      { name: 'Premium Unleaded', quantity: '10 Gallons', price: 45.80 }
    ],
    total: 45.80,
    status: 'delivered',
    paymentMethod: 'PayPal',
  },
  {
    id: 'ORD-1236',
    date: '2023-09-10',
    time: '16:45',
    stationName: 'Chevron',
    items: [
      { name: 'Diesel', quantity: '8 Gallons', price: 34.40 },
      { name: 'Coffee', quantity: '1x', price: 2.50 },
      { name: 'Chips', quantity: '1x', price: 1.99 }
    ],
    total: 38.89,
    status: 'delivered',
    paymentMethod: 'Credit Card',
  }
];

const OrderHistory: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [filter, setFilter] = useState('all');
  const [filteredOrders, setFilteredOrders] = useState(orders);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    const batteryDrainInterval = setInterval(() => {
      setBatteryLevel(prev => Math.max(10, prev - 1));
    }, 300000); // every 5 minutes
    
    return () => {
      clearInterval(interval);
      clearInterval(batteryDrainInterval);
    };
  }, []);

  useEffect(() => {
    if (filter === 'all') {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter(order => order.status === filter));
    }
  }, [filter]);

  return (
    <div className="min-h-screen bg-background pb-20 max-w-md mx-auto">
      {/* Status bar */}
      <div className="px-4 py-2 flex justify-between items-center">
        <div className="text-sm">{currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
        <div className="flex items-center space-x-2">
          <span className="h-4 w-4 flex items-center justify-center">●●●</span>
          <span className="h-4 w-4 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 12H7M7 12C7 13.6569 8.34315 15 10 15H14C15.6569 15 17 13.6569 17 12M7 12C7 10.3431 8.34315 9 10 9H14C15.6569 9 17 10.3431 17 12M17 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <span className="h-4 w-5 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-5" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 10V8C21 6.89543 20.1046 6 19 6H5C3.89543 6 3 6.89543 3 8V16C3 17.1046 3.89543 18 5 18H19C20.1046 18 21 17.1046 21 16V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M7 10V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M11 10V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M15 10V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M19 10V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </span>
          <span className="font-bold">{batteryLevel}</span>
        </div>
      </div>
      
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <div className="flex items-center justify-center bg-green-500 rounded-full h-10 w-10 mr-3">
            <ShoppingBag className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl font-bold">My Orders</h1>
        </div>
        <button className="h-10 w-10 flex items-center justify-center rounded-full bg-background border border-border">
          <Filter className="h-5 w-5" />
        </button>
      </div>
      
      {/* Filter Tabs */}
      <div className="px-4 mb-4">
        <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-none">
          <button 
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${filter === 'all' ? 'bg-green-500 text-white' : 'bg-muted text-muted-foreground'}`}
          >
            All Orders
          </button>
          <button 
            onClick={() => setFilter('processing')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${filter === 'processing' ? 'bg-green-500 text-white' : 'bg-muted text-muted-foreground'}`}
          >
            Processing
          </button>
          <button 
            onClick={() => setFilter('in-transit')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${filter === 'in-transit' ? 'bg-green-500 text-white' : 'bg-muted text-muted-foreground'}`}
          >
            In Transit
          </button>
          <button 
            onClick={() => setFilter('delivered')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${filter === 'delivered' ? 'bg-green-500 text-white' : 'bg-muted text-muted-foreground'}`}
          >
            Delivered
          </button>
        </div>
      </div>
      
      {/* Orders List */}
      <div className="px-4 space-y-4">
        {filteredOrders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card rounded-xl p-4 border border-border"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-lg">{order.id}</h3>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{new Date(order.date).toLocaleDateString()}</span>
                  <span className="mx-2">•</span>
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{order.time}</span>
                </div>
              </div>
              <div className="bg-green-500/10 text-green-500 px-2 py-1 rounded-full text-xs font-medium">
                {order.status === 'delivered' ? 'Delivered' : 
                 order.status === 'in-transit' ? 'In Transit' : 'Processing'}
              </div>
            </div>
            
            <div className="border-t border-border pt-3 pb-2">
              <p className="text-sm font-medium mb-2">{order.stationName}</p>
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">{item.quantity} {item.name}</span>
                  <span>${item.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div className="border-t border-border pt-2 flex justify-between items-center">
              <div>
                <span className="text-sm text-muted-foreground">Total</span>
                <p className="font-semibold">${order.total.toFixed(2)}</p>
              </div>
              <Link 
                to={`/track?orderId=${order.id}`} 
                className="flex items-center text-green-500 text-sm font-medium"
              >
                View Details
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </motion.div>
        ))}
        
        {filteredOrders.length === 0 && (
          <div className="text-center py-10">
            <div className="w-20 h-20 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
              <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No orders found</h3>
            <p className="text-muted-foreground">You don't have any {filter !== 'all' ? filter : ''} orders yet.</p>
          </div>
        )}
      </div>
      
      <BottomNav />
    </div>
  );
};

export default OrderHistory;
