
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, CreditCard, Bell, Shield, Wallet, Clock, ChevronRight, LogOut, ChevronLeft, MapPin, Sun, Moon } from 'lucide-react';
import BottomNav from '@/components/layout/BottomNav';
import { Switch } from '@/components/ui/switch';
import { useTheme } from 'next-themes';
import { useToast } from '@/hooks/use-toast';

interface SettingsProps {
  onLogout?: () => void;
}

const paymentHistory = [
  {
    id: '1',
    stationName: 'Shell Gas Station',
    date: 'Apr 23, 2023',
    amount: 18.95,
    method: 'Credit Card'
  },
  {
    id: '2',
    stationName: 'ExxonMobil',
    date: 'Apr 15, 2023',
    amount: 24.73,
    method: 'Apple Pay'
  },
  {
    id: '3',
    stationName: 'Chevron',
    date: 'Apr 3, 2023',
    amount: 12.49,
    method: 'Venmo'
  }
];

const Settings: React.FC<SettingsProps> = ({ onLogout }) => {
  const { setTheme, theme } = useTheme();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(theme === 'dark');
  const [locationServices, setLocationServices] = useState(true);
  const [savePaymentInfo, setSavePaymentInfo] = useState(true);
  const [biometricLogin, setBiometricLogin] = useState(false);
  
  // Update theme when darkMode changes
  useEffect(() => {
    if (darkMode) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, [darkMode, setTheme]);
  
  // Sync darkMode state with actual theme
  useEffect(() => {
    setDarkMode(theme === 'dark');
  }, [theme]);
  
  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
      duration: 3000
    });
    
    if (onLogout) {
      onLogout();
    }
    
    // Navigate to home page
    setTimeout(() => {
      navigate('/');
    }, 800);
  };
  
  const handleNotificationsChange = (checked: boolean) => {
    setNotifications(checked);
    toast({
      title: checked ? "Notifications Enabled" : "Notifications Disabled",
      description: checked ? "You will now receive notifications" : "You will no longer receive notifications",
      duration: 2000
    });
  };
  
  const handleDarkModeChange = (checked: boolean) => {
    setDarkMode(checked);
    toast({
      title: checked ? "Dark Mode Enabled" : "Light Mode Enabled",
      description: checked ? "App theme set to dark" : "App theme set to light",
      duration: 2000
    });
  };
  
  const handleLocationChange = (checked: boolean) => {
    setLocationServices(checked);
    toast({
      title: checked ? "Location Services Enabled" : "Location Services Disabled",
      description: checked ? "Your location will be used to find nearby stations" : "Location services have been disabled",
      duration: 2000
    });
  };
  
  const handleSavePaymentChange = (checked: boolean) => {
    setSavePaymentInfo(checked);
    toast({
      title: checked ? "Payment Info Saving Enabled" : "Payment Info Saving Disabled",
      description: checked ? "Your payment info will be saved for future use" : "Your payment info will not be saved",
      duration: 2000
    });
  };
  
  const handleBiometricChange = (checked: boolean) => {
    setBiometricLogin(checked);
    toast({
      title: checked ? "Biometric Login Enabled" : "Biometric Login Disabled",
      description: checked ? "You can now use biometric authentication" : "Biometric authentication has been disabled",
      duration: 2000
    });
  };
  
  const handleViewAllTransactions = () => {
    navigate('/orders');
    toast({
      title: "Transaction History",
      description: "Viewing all transactions",
      duration: 2000
    });
  };
  
  const handlePaymentMethodsClick = () => {
    toast({
      title: "Payment Methods",
      description: "Manage your payment methods",
      duration: 2000
    });
  };

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <div className="px-4 py-3 flex items-center">
        <Link to="/">
          <div className="h-10 w-10 flex items-center justify-center rounded-full bg-black border border-gray-800 mr-3">
            <ChevronLeft className="h-6 w-6" />
          </div>
        </Link>
        <h1 className="text-xl font-semibold">Account & Settings</h1>
      </div>
      
      <div className="px-4 py-3">
        <div className="bg-gray-900 rounded-xl p-4">
          <div className="flex items-center">
            <div className="h-16 w-16 rounded-full bg-green-500 flex items-center justify-center text-black text-xl font-bold mr-4">
              JD
            </div>
            <div>
              <h2 className="text-xl font-bold">John Doe</h2>
              <p className="text-gray-400">john.doe@example.com</p>
            </div>
            <button className="ml-auto bg-black h-10 w-10 rounded-full flex items-center justify-center border border-gray-800">
              <User className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="px-4 py-3">
        <h3 className="text-lg font-medium mb-3">Account & Preferences</h3>
        
        <div className="bg-gray-900 rounded-xl overflow-hidden mb-4">
          <div className="p-4 border-b border-gray-800 flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-black flex items-center justify-center mr-3 border border-gray-800">
                <Bell className="h-5 w-5 text-green-500" />
              </div>
              <span>Notifications</span>
            </div>
            <Switch 
              checked={notifications} 
              onCheckedChange={handleNotificationsChange} 
              className="data-[state=checked]:bg-green-500"
            />
          </div>
          
          <div className="p-4 border-b border-gray-800 flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-black flex items-center justify-center mr-3 border border-gray-800">
                {darkMode ? (
                  <Moon className="h-5 w-5 text-green-500" />
                ) : (
                  <Sun className="h-5 w-5 text-green-500" />
                )}
              </div>
              <span>Dark Mode</span>
            </div>
            <Switch 
              checked={darkMode} 
              onCheckedChange={handleDarkModeChange} 
              className="data-[state=checked]:bg-green-500"
            />
          </div>
          
          <div className="p-4 border-b border-gray-800 flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-black flex items-center justify-center mr-3 border border-gray-800">
                <MapPin className="h-5 w-5 text-green-500" />
              </div>
              <span>Location Services</span>
            </div>
            <Switch 
              checked={locationServices} 
              onCheckedChange={handleLocationChange} 
              className="data-[state=checked]:bg-green-500"
            />
          </div>
        </div>
        
        <h3 className="text-lg font-medium mb-3">Payment & Security</h3>
        
        <div className="bg-gray-900 rounded-xl overflow-hidden mb-4">
          <div 
            className="p-4 border-b border-gray-800 flex items-center justify-between cursor-pointer hover:bg-gray-800/50 transition-colors"
            onClick={handlePaymentMethodsClick}
          >
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-black flex items-center justify-center mr-3 border border-gray-800">
                <CreditCard className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p>Payment Methods</p>
                <p className="text-xs text-gray-400">Visa •••• 4242</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="p-4 border-b border-gray-800 flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-black flex items-center justify-center mr-3 border border-gray-800">
                <Wallet className="h-5 w-5 text-green-500" />
              </div>
              <span>Save Payment Info</span>
            </div>
            <Switch 
              checked={savePaymentInfo} 
              onCheckedChange={handleSavePaymentChange} 
              className="data-[state=checked]:bg-green-500"
            />
          </div>
          
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-black flex items-center justify-center mr-3 border border-gray-800">
                <Shield className="h-5 w-5 text-green-500" />
              </div>
              <span>Biometric Login</span>
            </div>
            <Switch 
              checked={biometricLogin} 
              onCheckedChange={handleBiometricChange} 
              className="data-[state=checked]:bg-green-500"
            />
          </div>
        </div>
        
        <h3 className="text-lg font-medium mb-3">Recent Transactions</h3>
        
        <div className="bg-gray-900 rounded-xl overflow-hidden mb-6">
          {paymentHistory.map((payment, index) => (
            <div 
              key={payment.id}
              className={`p-4 flex justify-between items-center ${index !== paymentHistory.length - 1 ? 'border-b border-gray-800' : ''}`}
            >
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-black flex items-center justify-center mr-3 border border-gray-800">
                  <Wallet className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <h4 className="text-sm">{payment.stationName}</h4>
                  <div className="flex items-center mt-1">
                    <Clock className="h-3 w-3 text-gray-400 mr-1" />
                    <p className="text-xs text-gray-400">{payment.date}</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">${payment.amount.toFixed(2)}</p>
                <p className="text-xs text-gray-400">{payment.method}</p>
              </div>
            </div>
          ))}
          
          <div className="p-4 text-center">
            <button 
              className="text-green-500 text-sm hover:underline"
              onClick={handleViewAllTransactions}
            >
              View All Transactions
            </button>
          </div>
        </div>
        
        <button 
          className="w-full py-3 rounded-xl border border-red-500/30 text-red-500 flex items-center justify-center hover:bg-red-500/10 transition-colors"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 mr-2" />
          Sign Out
        </button>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default Settings;
