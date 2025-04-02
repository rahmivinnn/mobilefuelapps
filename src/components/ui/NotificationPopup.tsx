
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, X, AlertCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NotificationPopupProps {
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
  isOpen: boolean;
  onClose: () => void;
  onAction?: () => void;
  actionText?: string;
  autoClose?: boolean;
  autoCloseTime?: number;
  image?: string;
}

const NotificationPopup: React.FC<NotificationPopupProps> = ({
  type = 'info',
  title,
  message,
  isOpen,
  onClose,
  onAction,
  actionText,
  autoClose = true,
  autoCloseTime = 5000,
  image
}) => {
  React.useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (isOpen && autoClose) {
      timeout = setTimeout(() => {
        onClose();
      }, autoCloseTime);
    }
    
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [isOpen, onClose, autoClose, autoCloseTime]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-8 w-8 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-8 w-8 text-red-500" />;
      case 'warning':
        return <AlertCircle className="h-8 w-8 text-yellow-500" />;
      case 'info':
      default:
        return <Info className="h-8 w-8 text-blue-500" />;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'info':
      default:
        return 'bg-blue-500';
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div 
      className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 w-11/12 max-w-sm"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    >
      <div className={`rounded-xl p-4 shadow-lg ${type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'}`}>
        <div className="flex items-start">
          {image ? (
            <div className="h-12 w-12 rounded-full overflow-hidden mr-3">
              <img src={image} alt="Notification" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="bg-white rounded-full p-2 mr-3">
              {getIcon()}
            </div>
          )}
          
          <div className="flex-1">
            <h3 className="text-black font-bold text-lg">{title}</h3>
            <p className="text-black/80 text-sm">{message}</p>
          </div>
          
          <button 
            onClick={onClose}
            className="text-black/60 hover:text-black"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {onAction && actionText && (
          <div className="mt-3 flex justify-end">
            <Button 
              onClick={onAction}
              className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium"
            >
              {actionText}
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default NotificationPopup;
