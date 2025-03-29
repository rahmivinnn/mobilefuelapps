
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Hexagon, Eye, EyeOff, Check, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ResetPassword: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { email = 'your.email@example.com' } = location.state || {};

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      
      // Redirect to login after showing success message
      setTimeout(() => {
        navigate('/sign-in', { replace: true });
      }, 2000);
    }, 1500);
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
          
          {isSuccess ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-2xl"
            >
              <div className="w-20 h-20 mx-auto bg-green-100 dark:bg-green-800/30 rounded-full flex items-center justify-center mb-4">
                <Check size={40} className="text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-green-700 dark:text-green-300 mb-2">Password Reset Successfully!</h2>
              <p className="text-green-600 dark:text-green-400">
                Your password has been reset successfully. Redirecting to sign in...
              </p>
            </motion.div>
          ) : (
            <>
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock size={30} className="text-green-500" />
                </div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Reset Password</h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Create a new strong password for your account<br />
                  <span className="font-semibold text-gray-800 dark:text-gray-200">{email}</span>
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="New Password"
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
                
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                
                <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                  <p className="flex items-center">
                    <span className={`h-2 w-2 rounded-full mr-2 ${password.length >= 8 ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                    At least 8 characters
                  </p>
                  <p className="flex items-center">
                    <span className={`h-2 w-2 rounded-full mr-2 ${/[A-Z]/.test(password) ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                    At least one uppercase letter
                  </p>
                  <p className="flex items-center">
                    <span className={`h-2 w-2 rounded-full mr-2 ${/[0-9]/.test(password) ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                    At least one number
                  </p>
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Resetting...
                    </div>
                  ) : (
                    'Reset Password'
                  )}
                </Button>
              </form>
            </>
          )}
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

export default ResetPassword;
