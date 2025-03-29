
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

interface SignInProps {
  onLogin: (token: string) => void;
}

const SignIn: React.FC<SignInProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock successful authentication
      const token = "mock-auth-token-" + Math.random();
      onLogin(token);
      setIsLoading(false);
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden">
      {/* Top green wave */}
      <div className="absolute top-0 left-0 w-full h-[25%] bg-green-500" style={{
        borderBottomLeftRadius: '50%',
        borderBottomRightRadius: '50%',
      }} />

      {/* Bottom green wave with hexagons */}
      <div className="absolute bottom-0 left-0 w-full h-[25%] bg-green-500 overflow-hidden" style={{
        borderTopLeftRadius: '50%',
        borderTopRightRadius: '50%',
      }}>
        <div className="absolute bottom-0 right-0 w-[60%] h-[70%] opacity-80">
          <img 
            src="/lovable-uploads/ca994f82-30e0-40dc-9ec4-689ac65e3db6.png" 
            alt="Hexagon Pattern" 
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md px-6 z-10"
      >
        {/* Logo and title */}
        <div className="flex flex-col items-center mb-12">
          <div className="w-24 h-24 rounded-full border-2 border-green-500 flex items-center justify-center mb-4">
            <img 
              src="/lovable-uploads/19fdfff8-09d0-4398-bcb2-6f4830ab5e38.png" 
              alt="FuelFriendly Logo" 
              className="w-16 h-16"
            />
          </div>
          <h1 
            className="text-2xl font-bold text-green-500" 
            style={{ fontFamily: 'Impact, Haettenschweiler, Arial Narrow Bold, sans-serif', letterSpacing: '1px', fontStyle: 'italic' }}
          >
            FUELFRIENDLY
          </h1>
        </div>

        {/* Buttons */}
        <div className="space-y-4">
          <Button 
            onClick={() => navigate('/sign-in')}
            className="w-full h-12 text-base font-semibold bg-green-500 hover:bg-green-600 rounded-full"
          >
            Log in
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => navigate('/sign-up')}
            className="w-full h-12 text-base font-medium border-2 border-green-500 text-green-500 hover:bg-green-500/10 rounded-full"
          >
            Sign up
          </Button>
          
          <div className="text-center text-white my-4">Or</div>
          
          <Button 
            variant="outline" 
            className="w-full h-12 text-base font-medium border-2 border-green-500 text-green-500 hover:bg-green-500/10 rounded-full"
            onClick={() => {
              setIsLoading(true);
              setTimeout(() => {
                const token = "google-auth-token-" + Math.random();
                onLogin(token);
                setIsLoading(false);
                navigate('/');
              }, 1500);
            }}
            disabled={isLoading}
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5 mr-2" />
            Continue with Google
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default SignIn;
