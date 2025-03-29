import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, CreditCard, Bell, Shield, Wallet, Clock, ChevronRight, LogOut, ChevronLeft, MapPin } from 'lucide-react';
import BottomNav from '@/components/layout/BottomNav';
import { Switch } from '@/components/ui/switch';

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
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [locationServices, setLocationServices] = useState(true);
  const [savePaymentInfo, setSavePaymentInfo] = useState(true);
  const [biometricLogin, setBiometricLogin] = useState(false);
  
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setBatteryLevel(prev => Math.max(10, prev - 1));
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);

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
              onCheckedChange={setNotifications} 
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
              checked={darkMode} 
              onCheckedChange={setDarkMode} 
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
              onCheckedChange={setLocationServices} 
              className="data-[state=checked]:bg-green-500"
            />
          </div>
        </div>
        
        <h3 className="text-lg font-medium mb-3">Payment & Security</h3>
        
        <div className="bg-gray-900 rounded-xl overflow-hidden mb-4">
          <div className="p-4 border-b border-gray-800 flex items-center justify-between">
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
              onCheckedChange={setSavePaymentInfo} 
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
              onCheckedChange={setBiometricLogin} 
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
            <button className="text-green-500 text-sm hover:underline">View All Transactions</button>
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
