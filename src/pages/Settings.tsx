
import * as React from "react";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { ChevronRight, Moon, Sun, Bell, Shield, CreditCard, HelpCircle, LogOut } from "lucide-react";
import { useTheme } from "next-themes";

interface SettingsProps {
  onLogout: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onLogout }) => {
  const { theme, setTheme } = useTheme();
  const isDarkMode = theme === 'dark';

  const handleToggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setTheme(newTheme);
    toast({
      title: isDarkMode ? "Light mode activated" : "Dark mode activated",
      description: "Your theme preference has been updated",
    });
  };

  const handleNotifications = () => {
    toast({
      title: "Notifications",
      description: "Notifications settings page coming soon",
    });
  };

  const handleSecurity = () => {
    toast({
      title: "Security",
      description: "Security settings page coming soon",
    });
  };

  const handlePaymentMethods = () => {
    toast({
      title: "Payment Methods",
      description: "Payment methods settings page coming soon",
    });
  };

  const handleHelpCenter = () => {
    toast({
      title: "Help Center",
      description: "Help center page coming soon",
    });
  };

  const handleLogout = () => {
    toast({
      title: "Logging out",
      description: "You have been logged out successfully",
    });
    onLogout();
    // The redirect will happen automatically because of the protected route in App.tsx
  };

  const settingSections = [
    {
      title: "Appearance",
      items: [
        {
          name: "Dark Mode",
          icon: isDarkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />,
          action: handleToggleTheme,
          isToggle: true,
          value: isDarkMode,
        },
      ],
    },
    {
      title: "Account",
      items: [
        {
          name: "Notifications",
          icon: <Bell className="h-5 w-5" />,
          action: handleNotifications,
        },
        {
          name: "Security",
          icon: <Shield className="h-5 w-5" />,
          action: handleSecurity,
        },
        {
          name: "Payment Methods",
          icon: <CreditCard className="h-5 w-5" />,
          action: handlePaymentMethods,
        },
      ],
    },
    {
      title: "Support",
      items: [
        {
          name: "Help Center",
          icon: <HelpCircle className="h-5 w-5" />,
          action: handleHelpCenter,
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header title="Settings" showBack={false} />
      <div className="container max-w-md mx-auto px-4 py-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {settingSections.map((section, index) => (
            <div key={index} className="space-y-2">
              <h2 className="text-sm font-medium text-muted-foreground">{section.title}</h2>
              <div className="space-y-1 rounded-lg overflow-hidden">
                {section.items.map((item, itemIndex) => (
                  <button
                    key={itemIndex}
                    className="w-full flex items-center justify-between p-3 bg-card hover:bg-accent/50 transition-colors"
                    onClick={item.action}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-primary">{item.icon}</div>
                      <span>{item.name}</span>
                    </div>
                    {item.isToggle ? (
                      <div className={`w-11 h-6 rounded-full p-1 transition-colors ${item.value ? 'bg-primary' : 'bg-gray-400'}`}>
                        <div className={`w-4 h-4 rounded-full bg-white transform transition-transform ${item.value ? 'translate-x-5' : 'translate-x-0'}`} />
                      </div>
                    ) : (
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
          
          {/* Logout section */}
          <div className="pt-4">
            <Button 
              variant="destructive" 
              className="w-full flex items-center justify-center gap-2"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              <span>Log out</span>
            </Button>
          </div>
        </motion.div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Settings;
