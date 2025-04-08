import * as React from "react";
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import SplashScreen from "./components/ui/SplashScreen";

// Essential components loaded immediately
import SignUp from "./pages/auth/SignUp";
import SignIn from "./pages/auth/SignIn";
import VerifyOtp from "./pages/auth/VerifyOtp";

// Lazy load non-essential components
const Index = lazy(() => import("./pages/Index"));
const StationDetails = lazy(() => import("./pages/StationDetails"));
const FuelSelection = lazy(() => import("./pages/FuelSelection"));
const GroceryList = lazy(() => import("./pages/GroceryList"));
const Payment = lazy(() => import("./pages/Payment"));
const Confirmation = lazy(() => import("./pages/Confirmation"));
const TrackOrder = lazy(() => import("./pages/TrackOrder"));
const Settings = lazy(() => import("./pages/Settings"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Map = lazy(() => import("./components/ui/Map"));
const Welcome = lazy(() => import("./pages/auth/Welcome"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/auth/ResetPassword"));
const OrderHistory = lazy(() => import("./pages/OrderHistory"));
const CallScreen = lazy(() => import("./pages/CallScreen"));
const ChatScreen = lazy(() => import("./pages/ChatScreen"));

// Loading component for lazy-loaded routes
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// Create the query client with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

const App: React.FC = () => {
  const [splashVisible, setSplashVisible] = React.useState(true);
  const [isAuthenticated, setIsAuthenticated] = React.useState(() => {
    // Initialize auth state from localStorage
    return !!localStorage.getItem('auth-token');
  });
  
  const handleSplashFinish = () => {
    setSplashVisible(false);
  };
  
  const handleLogin = (token: string) => {
    localStorage.setItem('auth-token', token);
    setIsAuthenticated(true);
  };
  
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
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  {/* Auth routes - Updated to go directly to sign-up */}
                  <Route 
                    path="/" 
                    element={isAuthenticated ? <Navigate to="/home" /> : <SignUp onLogin={handleLogin} />} 
                  />
                  <Route 
                    path="/welcome" 
                    element={isAuthenticated ? <Navigate to="/home" /> : <Welcome />} 
                  />
                  <Route 
                    path="/sign-in" 
                    element={isAuthenticated ? <Navigate to="/home" /> : <SignIn onLogin={handleLogin} />} 
                  />
                  <Route 
                    path="/sign-up" 
                    element={isAuthenticated ? <Navigate to="/home" /> : <SignUp onLogin={handleLogin} />} 
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
                    path="/station/:id/groceries" 
                    element={isAuthenticated ? <GroceryList /> : <Navigate to="/" />} 
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
              </Suspense>
            </BrowserRouter>
          )}
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
