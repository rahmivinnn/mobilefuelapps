
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, BellIcon, Menu } from 'lucide-react';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, showBack = false }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex h-16 max-w-md items-center justify-between px-4">
        <div className="flex items-center">
          {showBack ? (
            <button 
              onClick={goBack} 
              className="mr-2 rounded-full p-1.5 text-foreground/80 hover:bg-muted transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          ) : (
            <button className="mr-2 rounded-full p-1.5 text-foreground/80 hover:bg-muted transition-colors">
              <Menu className="h-5 w-5" />
            </button>
          )}
          {title && (
            <h1 className="text-lg font-medium">{title}</h1>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <button className="relative rounded-full p-1.5 text-foreground/80 hover:bg-muted transition-colors">
            <BellIcon className="h-5 w-5" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-green-500"></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
