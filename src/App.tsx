import * as React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import Welcome from "./pages/auth/Welcome";
import SignIn from "./pages/auth/SignIn";
import ForgotPassword from "./pages/auth/ForgotPassword";
import VerifyOtp from "./pages/auth/VerifyOtp";
import ResetPassword from "./pages/auth/ResetPassword";
import OrderHistory from "./pages/OrderHistory";
import CallScreen from "./pages/CallScreen";
import ChatScreen from "./pages/ChatScreen";

const queryClient = new QueryClient();

const App: React.FC = () => {
  const [splashVisible, setSplashVisible] = React.useState(true);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  
  const handleSplashFinish = () => {
    setSplashVisible(false);
  };
  
  const handleLogin = (token: string) => {
    // Save the token to localStorage for persistence
    localStorage.setItem('auth-token', token);
    setIsAuthenticated(true);
  };
  
  // Check for existing token on app load
  React.useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    setIsAuthenticated(false);
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
                {/* Auth routes */}
                <Route 
                  path="/" 
                  element={isAuthenticated ? <Navigate to="/home" /> : <Welcome />} 
                />
                <Route 
                  path="/sign-in" 
                  element={isAuthenticated ? <Navigate to="/home" /> : <SignIn onLogin={handleLogin} />} 
                />
                <Route 
                  path="/sign-up" 
                  element={<Navigate to="/sign-in" />} 
                />
                <Route 
                  path="/forgot-password" 
                  element={isAuthenticated ? <Navigate to="/home" /> : <ForgotPassword />} 
                />
                <Route 
                  path="/verify-otp" 
                  element={isAuthenticated ? <Navigate to="/home" /> : <VerifyOtp />} 
                />
                <Route 
                  path="/reset-password" 
                  element={isAuthenticated ? <Navigate to="/home" /> : <ResetPassword />} 
                />
                
                {/* Protected routes */}
                <Route 
                  path="/home" 
                  element={isAuthenticated ? <Index /> : <Navigate to="/" />} 
                />
                <Route 
                  path="/station/:id" 
                  element={isAuthenticated ? <StationDetails /> : <Navigate to="/" />} 
                />
                <Route 
                  path="/station/:id/fuel" 
                  element={isAuthenticated ? <FuelSelection /> : <Navigate to="/" />} 
                />
                <Route 
                  path="/station/:id/payment" 
                  element={isAuthenticated ? <Payment /> : <Navigate to="/" />} 
                />
                <Route 
                  path="/confirmation" 
                  element={isAuthenticated ? <Confirmation /> : <Navigate to="/" />} 
                />
                <Route 
                  path="/track" 
                  element={isAuthenticated ? <TrackOrder /> : <Navigate to="/" />} 
                />
                <Route 
                  path="/settings" 
                  element={
                    isAuthenticated ? (
                      <Settings onLogout={handleLogout} />
                    ) : (
                      <Navigate to="/" />
                    )
                  } 
                />
                <Route 
                  path="/orders" 
                  element={isAuthenticated ? <OrderHistory /> : <Navigate to="/" />} 
                />
                <Route 
                  path="/map" 
                  element={
                    isAuthenticated ? (
                      <div className="h-screen w-full">
                        <Map className="h-full w-full" />
                      </div>
                    ) : (
                      <Navigate to="/" />
                    )
                  } 
                />
                <Route 
                  path="/call" 
                  element={isAuthenticated ? <CallScreen /> : <Navigate to="/" />} 
                />
                <Route 
                  path="/chat" 
                  element={isAuthenticated ? <ChatScreen /> : <Navigate to="/" />} 
                />
                
                {/* Catch-all route */}
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
