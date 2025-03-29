
import React from "react";
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
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
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

  React.useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem('authToken', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
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
                {/* Auth Routes */}
                <Route path="/sign-in" element={
                  isAuthenticated ? <Navigate to="/" /> : <SignIn onLogin={login} />
                } />
                <Route path="/sign-up" element={
                  isAuthenticated ? <Navigate to="/" /> : <SignUp onLogin={login} />
                } />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/verify-otp" element={<VerifyOtp />} />
                <Route path="/reset-password" element={<ResetPassword />} />

                {/* Protected Routes */}
                <Route path="/" element={
                  isAuthenticated ? <Index /> : <Navigate to="/sign-in" />
                } />
                <Route path="/station/:id" element={
                  isAuthenticated ? <StationDetails /> : <Navigate to="/sign-in" />
                } />
                <Route path="/station/:id/fuel" element={
                  isAuthenticated ? <FuelSelection /> : <Navigate to="/sign-in" />
                } />
                <Route path="/station/:id/payment" element={
                  isAuthenticated ? <Payment /> : <Navigate to="/sign-in" />
                } />
                <Route path="/confirmation" element={
                  isAuthenticated ? <Confirmation /> : <Navigate to="/sign-in" />
                } />
                <Route path="/track" element={
                  isAuthenticated ? <TrackOrder /> : <Navigate to="/sign-in" />
                } />
                <Route path="/settings" element={
                  isAuthenticated ? <Settings onLogout={logout} /> : <Navigate to="/sign-in" />
                } />
                <Route path="/orders" element={
                  isAuthenticated ? <OrderHistory /> : <Navigate to="/sign-in" />
                } />
                <Route path="/map" element={
                  isAuthenticated ? (
                    <div className="h-screen w-full">
                      <Map className="h-full w-full" />
                    </div>
                  ) : <Navigate to="/sign-in" />
                } />
                <Route path="/call" element={
                  isAuthenticated ? <CallScreen /> : <Navigate to="/sign-in" />
                } />
                <Route path="/chat" element={
                  isAuthenticated ? <ChatScreen /> : <Navigate to="/sign-in" />
                } />
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
