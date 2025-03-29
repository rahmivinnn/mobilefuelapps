
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, CreditCard, Bell, Shield, Wallet, Clock, ChevronRight, LogOut, ChevronLeft, MapPin } from 'lucide-react';
import BottomNav from '@/components/layout/BottomNav';
import { Switch } from '@/components/ui/switch';
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "next-themes";

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
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  
  const [notifications, setNotifications] = useState(true);
  const [locationServices, setLocationServices] = useState(true);
  const [savePaymentInfo, setSavePaymentInfo] = useState(true);
  const [biometricLogin, setBiometricLogin] = useState(false);
  
  const handleDarkModeToggle = (checked: boolean) => {
    setTheme(checked ? "dark" : "light");
    toast({
      title: checked ? "Dark Mode Enabled" : "Light Mode Enabled",
      description: checked 
        ? "App theme set to dark mode" 
        : "App theme set to light mode",
      duration: 2000
    });
  };

  const handleNotificationsToggle = (checked: boolean) => {
    setNotifications(checked);
    toast({
      title: checked ? "Notifications Enabled" : "Notifications Disabled",
      description: checked 
        ? "You will receive notifications about orders and updates" 
        : "You will not receive any notifications",
      duration: 2000
    });
  };

  const handleLocationToggle = (checked: boolean) => {
    setLocationServices(checked);
    toast({
      title: checked ? "Location Services Enabled" : "Location Services Disabled",
      description: checked 
        ? "We'll use your location to find nearby stations" 
        : "Location services are now disabled",
      duration: 2000
    });
  };

  const handleSavePaymentToggle = (checked: boolean) => {
    setSavePaymentInfo(checked);
    toast({
      title: checked ? "Payment Info Saving Enabled" : "Payment Info Saving Disabled",
      description: checked 
        ? "Your payment information will be saved for future orders" 
        : "Your payment information will not be saved",
      duration: 2000
    });
  };

  const handleBiometricToggle = (checked: boolean) => {
    setBiometricLogin(checked);
    toast({
      title: checked ? "Biometric Login Enabled" : "Biometric Login Disabled",
      description: checked 
        ? "You can now use fingerprint or face recognition to log in" 
        : "Biometric login has been disabled",
      duration: 2000
    });
  };
  
  const handlePaymentMethodsClick = () => {
    toast({
      title: "Payment Methods",
      description: "This feature is coming soon!",
      duration: 2000
    });
  };
  
  const handleViewAllTransactions = () => {
    navigate('/orders');
  };
  
  const handleLogout = () => {
    toast({
      title: "Signed Out",
      description: "You have been signed out successfully",
      duration: 2000
    });
    
    setTimeout(() => {
      navigate('/');
    }, 1000);
    
    if (onLogout) {
      onLogout();
    }
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
              onCheckedChange={handleNotificationsToggle} 
              className="data-[state=checked]:bg-green-500"
            />
          </div>
          
          <div className="p-4 border-b border-gray-800 flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-black flex items-center justify-center mr-3 border border-gray-800">
                <svg className="h-5 w-5 text-green-500" viewBox="0 0 24 24" fill="none">
                  <path d="M12 18.5C15.5899 18.5 18.5 15.5899 18.5 12C18.5 8.41015 15.5899 5.5 12 5.5C8.41015 5.5 5.5 8.41015 5.5 12C5.5 15.5899 8.41015 18.5 12 18.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M19.14 19.14L19.01 19.01M19.01 4.99L19.14 4.86L19.01 4.99ZM4.86 19.14L4.99 19.01L4.86 19.14ZM12 2.08V2V2.08ZM12 22V21.92V22ZM2.08 12H2H2.08ZM22 12H21.92H22ZM4.99 4.99L4.86 4.86L4.99 4.99Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span>Dark Mode</span>
            </div>
            <Switch 
              checked={theme === "dark"} 
              onCheckedChange={handleDarkModeToggle} 
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
              onCheckedChange={handleLocationToggle} 
              className="data-[state=checked]:bg-green-500"
            />
          </div>
        </div>
        
        <h3 className="text-lg font-medium mb-3">Payment & Security</h3>
        
        <div className="bg-gray-900 rounded-xl overflow-hidden mb-4">
          <div onClick={handlePaymentMethodsClick} className="p-4 border-b border-gray-800 flex items-center justify-between cursor-pointer hover:bg-gray-800 transition-colors">
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
              onCheckedChange={handleSavePaymentToggle} 
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
              onCheckedChange={handleBiometricToggle}
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
