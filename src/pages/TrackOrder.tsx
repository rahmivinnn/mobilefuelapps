
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ShoppingBag, MapPin, Settings } from 'lucide-react';
import Map from '@/components/ui/Map';

const TrackOrder: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-background pb-20">
      {/* Status bar */}
      <div className="px-4 py-2 flex justify-between items-center">
        <div className="text-sm">8:45</div>
        <div className="flex items-center space-x-1">
          <div className="w-4 h-4">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.72 7.72C16.1 7.1 15.38 6.65 14.6 6.4C13.81 6.15 12.98 6.11 12.16 6.28C11.35 6.45 10.59 6.82 9.93998 7.36C9.28998 7.9 8.77001 8.6 8.42001 9.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13.48 14.08C13.28 14.33 13.03 14.53 12.76 14.68C12.49 14.83 12.2 14.92 11.89 14.96C11.59 14.99 11.29 14.96 11 14.88C10.71 14.8 10.44 14.66 10.2 14.48C9.95999 14.29 9.75999 14.05 9.60999 13.77C9.46 13.5 9.37001 13.2 9.33001 12.9C9.30001 12.59 9.32 12.29 9.4 12C9.48 11.71 9.62999 11.44 9.81999 11.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15.9 9.4C16.37 10.85 16.16 12.43 15.32 13.71" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19.07 5.55C20.47 7.46 21.26 9.77 21.33 12.16C21.4 14.54 20.75 16.9 19.47 18.89C18.18 20.88 16.33 22.39 14.14 23.25C11.96 24.11 9.55 24.26 7.28 23.69C5.01 23.11 2.99 21.84 1.51 20.05C0.0300003 18.26 -0.38 16.06 0.28 13.97C0.950001 11.88 2.26 10.03 4.07 8.71C5.88 7.38 8.09 6.67 10.36 6.69" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="w-4 h-4">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.67 18H3C2.46957 18 1.96086 17.7893 1.58579 17.4142C1.21071 17.0391 1 16.5304 1 16V6.5C1 4.01 3.01 2 5.5 2H18.5C20.99 2 23 4.01 23 6.5V11.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 10C8 10.5304 7.78929 11.0391 7.41422 11.4142C7.03914 11.7893 6.53043 12 6 12C5.46957 12 4.96086 11.7893 4.58579 11.4142C4.21071 11.0391 4 10.5304 4 10C4 9.46957 4.21071 8.96086 4.58579 8.58579C4.96086 8.21071 5.46957 8 6 8C6.53043 8 7.03914 8.21071 7.41422 8.58579C7.78929 8.96086 8 9.46957 8 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13 2V9L15.5 7.5L18 9V2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15 15V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M18 15V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 15V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 21H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="font-bold">100</div>
        </div>
      </div>
      
      {/* Header */}
      <div className="relative px-4 py-3 flex items-center justify-center">
        <Link to="/" className="absolute left-4">
          <div className="h-10 w-10 flex items-center justify-center rounded-full bg-background border border-border">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </Link>
        <h1 className="text-xl font-semibold">Track Your Order</h1>
      </div>
      
      {/* Map section */}
      <div className="h-[360px]">
        <Map showRoute showDeliveryInfo />
      </div>
      
      {/* Bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border py-2">
        <div className="container mx-auto px-4 max-w-md">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex flex-col items-center text-muted-foreground">
              <Home className="h-6 w-6 mb-1" />
              <span className="text-xs">Home</span>
            </Link>
            
            <Link to="/orders" className="flex flex-col items-center text-muted-foreground">
              <ShoppingBag className="h-6 w-6 mb-1" />
              <span className="text-xs">My Orders</span>
            </Link>
            
            <Link to="/track" className="flex flex-col items-center text-green-500">
              <MapPin className="h-6 w-6 mb-1" />
              <span className="text-xs">Track Order</span>
              <div className="w-10 h-1 bg-green-500 rounded-full mt-1"></div>
            </Link>
            
            <Link to="/settings" className="flex flex-col items-center text-muted-foreground">
              <Settings className="h-6 w-6 mb-1" />
              <span className="text-xs">Settings</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
