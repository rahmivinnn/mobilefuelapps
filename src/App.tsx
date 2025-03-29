
import * as React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import StationDetails from "./pages/StationDetails";
import FuelSelection from "./pages/FuelSelection";
import Payment from "./pages/Payment";
import Confirmation from "./pages/Confirmation";
import TrackOrder from "./pages/TrackOrder";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Map from "./components/ui/Map";
import SplashScreen from "./components/ui/SplashScreen";
import OrderHistory from "./pages/OrderHistory";
import CallScreen from "./pages/CallScreen";
import ChatScreen from "./pages/ChatScreen";

const queryClient = new QueryClient();

const App: React.FC = () => {
  const [splashVisible, setSplashVisible] = React.useState(true);
  
  const handleSplashFinish = () => {
    setSplashVisible(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {splashVisible ? (
            <SplashScreen onFinish={handleSplashFinish} />
          ) : (
            <BrowserRouter>
              <Routes>
                {/* All routes accessible directly */}
                <Route path="/" element={<Index />} />
                <Route path="/station/:id" element={<StationDetails />} />
                <Route path="/station/:id/fuel" element={<FuelSelection />} />
                <Route path="/station/:id/payment" element={<Payment />} />
                <Route path="/confirmation" element={<Confirmation />} />
                <Route path="/track" element={<TrackOrder />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/orders" element={<OrderHistory />} />
                <Route path="/map" element={
                  <div className="h-screen w-full">
                    <Map className="h-full w-full" />
                  </div>
                } />
                <Route path="/call" element={<CallScreen />} />
                <Route path="/chat" element={<ChatScreen />} />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          )}
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
