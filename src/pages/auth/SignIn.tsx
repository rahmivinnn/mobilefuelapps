
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Hexagon, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SignInProps {
  onLogin: (token: string) => void;
}

const SignIn: React.FC<SignInProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (username && password) {
        // Generate a fake token
        const token = Math.random().toString(36).substring(2, 15);
        onLogin(token);
      } else {
        setIsLoading(false);
        alert('Please fill in all fields');
      }
    }, 1000);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-background">
      {/* Status bar */}
      <div className="px-4 py-2 flex justify-between items-center">
        <div className="text-sm">{currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
        <div className="flex items-center space-x-2">
          <span className="h-4 w-4 flex items-center justify-center">●●●</span>
          <span className="h-4 w-4 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 12H7M7 12C7 13.6569 8.34315 15 10 15H14C15.6569 15 17 13.6569 17 12M7 12C7 10.3431 8.34315 9 10 9H14C15.6569 9 17 10.3431 17 12M17 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <span className="h-4 w-5 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-5" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 10V8C21 6.89543 20.1046 6 19 6H5C3.89543 6 3 6.89543 3 8V16C3 17.1046 3.89543 18 5 18H19C20.1046 18 21 17.1046 21 16V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M7 10V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M11 10V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M15 10V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M19 10V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </span>
          <span className="font-bold">100</span>
        </div>
      </div>

      <div className="p-6 flex flex-col items-center">
        <div className="w-full max-w-md mx-auto">
          <div className="flex justify-center mb-6">
            <img 
              src="/lovable-uploads/f01d03f8-3174-4828-bdcd-196b636f0b6f.png" 
              alt="FuelFriendly Logo" 
              className="h-16 w-16 object-contain dark:filter-none filter brightness-0"
            />
          </div>
          
          <h2 className="text-xl font-bold text-center mb-8 text-green-500">Sign In</h2>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-lg border-gray-300 focus:ring-green-500 focus:border-green-500 px-4 py-3"
              />
            </div>
            
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border-gray-300 focus:ring-green-500 focus:border-green-500 px-4 py-3 pr-10"
              />
              <button 
                type="button" 
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            
            <div className="text-right">
              <Link to="/forgot-password" className="text-green-500 text-sm hover:underline">
                Forgot Password?
              </Link>
            </div>
            
            <Button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Signing In...
                </div>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link to="/sign-up" className="text-green-500 font-semibold hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
          
          <div className="mt-8">
            <div className="relative flex items-center justify-center">
              <div className="border-t border-gray-300 dark:border-gray-700 w-full"></div>
              <div className="bg-white dark:bg-background px-4 text-sm text-gray-500 dark:text-gray-400 absolute">
                Or sign in with
              </div>
            </div>
            
            <div className="mt-6 flex justify-center space-x-4">
              <button className="p-2 rounded-full border border-gray-300 dark:border-gray-700">
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" className="fill-[#4285F4]"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" className="fill-[#34A853]"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" className="fill-[#FBBC05]"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" className="fill-[#EA4335]"/>
                </svg>
              </button>
              <button className="p-2 rounded-full border border-gray-300 dark:border-gray-700">
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" className="fill-[#1877F2]"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Hexagon decoration at bottom */}
      <div className="fixed bottom-0 left-0 right-0 h-32 overflow-hidden opacity-10 pointer-events-none">
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-wrap"
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <Hexagon 
              key={i}
              size={40} 
              className="text-green-500"
              fill="rgba(0,230,118,0.2)"
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default SignIn;
