import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Hexagon, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

const VerifyOtp: React.FC<{ onLogin?: (token: string) => void }> = ({ onLogin }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [timer, setTimer] = useState(60);
  const inputs = Array(6).fill(0).map(() => useRef<HTMLInputElement>(null));
  
  const { email = 'your.email@example.com', isSignUp = true } = location.state || {};

  useEffect(() => {
    // If no email in state, redirect back to sign up
    if (!location.state?.email) {
      navigate('/sign-up', { replace: true });
      return;
    }

    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, [location.state, navigate]);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  const handleResendCode = () => {
    setTimer(60);
    toast({
      title: "Code Resent",
      description: "A new verification code has been sent to your email",
      variant: "default"
    });
  };

  const handleChange = (value: string, index: number) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) {
      return;
    }

    if (value.length > 1) {
      value = value[0];
    }
    
    // Update the current input
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // If we added a value and there's a next input, focus it
    if (value !== '' && index < 5) {
      inputs[index + 1].current?.focus();
    }

    // If all digits are filled, auto-submit
    if (value !== '' && newOtp.every(digit => digit !== '')) {
      handleVerify();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    // If backspace and current field is empty, focus previous field
    if (e.key === 'Backspace') {
      if (otp[index] === '' && index > 0) {
        inputs[index - 1].current?.focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }
  };

  const handleVerify = async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    const code = otp.join('');
    if (code.length !== 6) {
      toast({
        title: "Invalid Code",
        description: "Please enter all 6 digits of the verification code",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API verification
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsVerified(true);
      
      if (isSignUp) {
        // Get stored signup data
        const signupData = localStorage.getItem('signup_data');
        if (!signupData) {
          throw new Error('Signup data not found');
        }

        // Generate mock token using signup data
        const userData = JSON.parse(signupData);
        const token = btoa(JSON.stringify({
          id: Math.random().toString(36).substr(2, 9),
          email: userData.email,
          name: userData.name,
          timestamp: new Date().getTime()
        }));

        // Clear signup data
        localStorage.removeItem('signup_data');
        
        // Login and redirect
        onLogin?.(token);
        setTimeout(() => {
          navigate('/home', { replace: true });
        }, 2000);
      } else {
        // Password reset flow
        setTimeout(() => {
          navigate('/reset-password', { 
            state: { email },
            replace: true 
          });
        }, 2000);
      }
    } catch (error) {
      setIsVerified(false);
      setIsLoading(false);
      toast({
        title: "Verification Failed",
        description: "An error occurred during verification. Please try again.",
        variant: "destructive"
      });
    }
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
          
          {isVerified ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-2xl"
            >
              <div className="w-20 h-20 mx-auto bg-green-100 dark:bg-green-800/30 rounded-full flex items-center justify-center mb-4">
                <Check size={40} className="text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-green-700 dark:text-green-300 mb-2">Email Verified Successfully!</h2>
              <p className="text-green-600 dark:text-green-400">
                {isSignUp 
                  ? "Your account has been created successfully. Redirecting to homepage..." 
                  : "Email verified successfully. Redirecting to reset your password..."}
              </p>
            </motion.div>
          ) : (
            <>
              <h2 className="text-xl font-bold text-center mb-2 text-green-500">Email Verification</h2>
              <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
                Enter the 6-digit code sent to<br />
                <span className="font-semibold text-gray-800 dark:text-gray-200">{email}</span>
              </p>
              
              <form onSubmit={handleVerify} className="space-y-6">
                <div className="flex justify-between gap-2 max-w-sm mx-auto">
                  {otp.map((digit, index) => (
                    <Input
                      key={index}
                      ref={inputs[index]}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(e.target.value, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className="w-12 h-12 text-center text-xl font-bold border-2 rounded-lg focus:border-green-500 focus:ring-green-500"
                    />
                  ))}
                </div>
                
                <div className="text-center">
                  {timer > 0 ? (
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Resend code in <span className="font-semibold">{timer}s</span>
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendCode}
                      className="text-green-500 hover:text-green-600 text-sm font-medium focus:outline-none"
                    >
                      Resend Code
                    </button>
                  )}
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Verifying...
                    </div>
                  ) : (
                    'Verify Code'
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

export default VerifyOtp;
