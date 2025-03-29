
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, CreditCard, Bell, Shield, Wallet, Clock, ChevronRight, LogOut, ChevronLeft, MapPin } from 'lucide-react';
import BottomNav from '@/components/layout/BottomNav';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { ThemeToggle } from '@/components/ui/theme-toggle';

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
  const [notifications, setNotifications] = useState(true);
  const [locationServices, setLocationServices] = useState(true);
  const [savePaymentInfo, setSavePaymentInfo] = useState(true);
  const [biometricLogin, setBiometricLogin] = useState(false);
  const { toast } = useToast();
  
  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    
    if (onLogout) {
      onLogout();
    }
  };

  const handleToggleNotifications = (checked: boolean) => {
    setNotifications(checked);
    toast({
      title: checked ? "Notifications enabled" : "Notifications disabled",
      description: checked ? "You will now receive notifications" : "You will no longer receive notifications",
    });
  };

  const handleToggleLocationServices = (checked: boolean) => {
    setLocationServices(checked);
    toast({
      title: checked ? "Location services enabled" : "Location services disabled",
      description: checked ? "Apps can access your location" : "Apps cannot access your location",
    });
  };

  const handleToggleSavePayment = (checked: boolean) => {
    setSavePaymentInfo(checked);
    toast({
      title: checked ? "Payment info will be saved" : "Payment info will not be saved",
      description: checked ? "Your payment information will be securely stored" : "Your payment information will not be stored",
    });
  };

  const handleToggleBiometric = (checked: boolean) => {
    setBiometricLogin(checked);
    toast({
      title: checked ? "Biometric login enabled" : "Biometric login disabled",
      description: checked ? "You can now login using biometrics" : "Biometric login has been disabled",
    });
  };

  const handleViewAllTransactions = () => {
    toast({
      title: "View all transactions",
      description: "Redirecting to transaction history",
    });
  };

  const handlePaymentMethods = () => {
    toast({
      title: "Payment Methods",
      description: "Manage your payment methods",
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <div className="px-4 py-3 flex items-center">
        <Link to="/">
          <div className="h-10 w-10 flex items-center justify-center rounded-full bg-background border border-border mr-3">
            <ChevronLeft className="h-6 w-6" />
          </div>
        </Link>
        <h1 className="text-xl font-semibold">Account & Settings</h1>
      </div>
      
      <div className="px-4 py-3">
        <div className="bg-card rounded-xl p-4 border border-border">
          <div className="flex items-center">
            <div className="h-16 w-16 rounded-full bg-green-500 flex items-center justify-center text-black text-xl font-bold mr-4">
              JD
            </div>
            <div>
              <h2 className="text-xl font-bold">John Doe</h2>
              <p className="text-muted-foreground">john.doe@example.com</p>
            </div>
            <button className="ml-auto bg-background h-10 w-10 rounded-full flex items-center justify-center border border-border">
              <User className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="px-4 py-3">
        <h3 className="text-lg font-medium mb-3">Account & Preferences</h3>
        
        <div className="bg-card rounded-xl overflow-hidden mb-4 border border-border">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-background flex items-center justify-center mr-3 border border-border">
                <Bell className="h-5 w-5 text-green-500" />
              </div>
              <span>Notifications</span>
            </div>
            <Switch 
              checked={notifications} 
              onCheckedChange={handleToggleNotifications} 
              className="data-[state=checked]:bg-green-500"
            />
          </div>
          
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-background flex items-center justify-center mr-3 border border-border">
                <ThemeToggle />
              </div>
              <span>Dark Mode</span>
            </div>
          </div>
          
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-background flex items-center justify-center mr-3 border border-border">
                <MapPin className="h-5 w-5 text-green-500" />
              </div>
              <span>Location Services</span>
            </div>
            <Switch 
              checked={locationServices} 
              onCheckedChange={handleToggleLocationServices} 
              className="data-[state=checked]:bg-green-500"
            />
          </div>
        </div>
        
        <h3 className="text-lg font-medium mb-3">Payment & Security</h3>
        
        <div className="bg-card rounded-xl overflow-hidden mb-4 border border-border">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-background flex items-center justify-center mr-3 border border-border">
                <CreditCard className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p>Payment Methods</p>
                <p className="text-xs text-muted-foreground">Visa •••• 4242</p>
              </div>
            </div>
            <button onClick={handlePaymentMethods}>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>
          
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-background flex items-center justify-center mr-3 border border-border">
                <Wallet className="h-5 w-5 text-green-500" />
              </div>
              <span>Save Payment Info</span>
            </div>
            <Switch 
              checked={savePaymentInfo} 
              onCheckedChange={handleToggleSavePayment} 
              className="data-[state=checked]:bg-green-500"
            />
          </div>
          
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-background flex items-center justify-center mr-3 border border-border">
                <Shield className="h-5 w-5 text-green-500" />
              </div>
              <span>Biometric Login</span>
            </div>
            <Switch 
              checked={biometricLogin} 
              onCheckedChange={handleToggleBiometric} 
              className="data-[state=checked]:bg-green-500"
            />
          </div>
        </div>
        
        <h3 className="text-lg font-medium mb-3">Recent Transactions</h3>
        
        <div className="bg-card rounded-xl overflow-hidden mb-6 border border-border">
          {paymentHistory.map((payment, index) => (
            <div 
              key={payment.id}
              className={`p-4 flex justify-between items-center ${index !== paymentHistory.length - 1 ? 'border-b border-border' : ''}`}
            >
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-background flex items-center justify-center mr-3 border border-border">
                  <Wallet className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <h4 className="text-sm">{payment.stationName}</h4>
                  <div className="flex items-center mt-1">
                    <Clock className="h-3 w-3 text-muted-foreground mr-1" />
                    <p className="text-xs text-muted-foreground">{payment.date}</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">${payment.amount.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">{payment.method}</p>
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
