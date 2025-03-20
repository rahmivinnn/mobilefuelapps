
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Map, CreditCard, User } from 'lucide-react';

const BottomNav: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 max-w-md">
        <div className="flex h-16 items-center justify-between">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `flex flex-col items-center space-y-1 ${isActive ? 'text-green-500' : 'text-muted-foreground'} transition-colors hover:text-green-500`
            }
            end
          >
            <Home className="h-5 w-5" />
            <span className="text-xs">Home</span>
          </NavLink>
          
          <NavLink 
            to="/map" 
            className={({ isActive }) => 
              `flex flex-col items-center space-y-1 ${isActive ? 'text-green-500' : 'text-muted-foreground'} transition-colors hover:text-green-500`
            }
          >
            <Map className="h-5 w-5" />
            <span className="text-xs">Stations</span>
          </NavLink>
          
          <NavLink 
            to="/payments" 
            className={({ isActive }) => 
              `flex flex-col items-center space-y-1 ${isActive ? 'text-green-500' : 'text-muted-foreground'} transition-colors hover:text-green-500`
            }
          >
            <CreditCard className="h-5 w-5" />
            <span className="text-xs">Payments</span>
          </NavLink>
          
          <NavLink 
            to="/profile" 
            className={({ isActive }) => 
              `flex flex-col items-center space-y-1 ${isActive ? 'text-green-500' : 'text-muted-foreground'} transition-colors hover:text-green-500`
            }
          >
            <User className="h-5 w-5" />
            <span className="text-xs">Profile</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
