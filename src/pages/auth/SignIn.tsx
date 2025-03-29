
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

interface SignInProps {
  onLogin: (token: string) => void;
}

const SignIn: React.FC<SignInProps> = ({ onLogin }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
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

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      const token = "google-auth-token-" + Math.random();
      onLogin(token);
      setIsLoading(false);
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-between relative overflow-hidden">
      {/* Top curved section */}
      <div className="absolute top-0 left-0 w-full h-[30%] bg-green-500" style={{
        borderBottomLeftRadius: '50%',
        borderBottomRightRadius: '50%',
      }} />

      {/* Content */}
      <div className="w-full h-full flex flex-col items-center justify-between pt-[25%] pb-[25%] px-6 z-10">
        {/* Logo and Title */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full border-2 border-green-500 flex items-center justify-center">
            <img 
              src="/lovable-uploads/19fdfff8-09d0-4398-bcb2-6f4830ab5e38.png" 
              alt="FuelFriendly Logo" 
              className="w-16 h-16"
            />
          </div>
          <h1 
            className="text-2xl font-bold text-green-500 mt-4" 
            style={{ fontFamily: 'Impact, Haettenschweiler, Arial Narrow Bold, sans-serif', letterSpacing: '2px', fontStyle: 'italic' }}
          >
            FUELFRIENDLY
          </h1>
        </div>

        {/* Buttons */}
        <div className="w-full space-y-4 mb-8">
          <Button 
            onClick={handleLogin}
            disabled={isLoading}
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
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5 mr-2" />
            Continue with Google
          </Button>
        </div>
      </div>

      {/* Bottom curved section with hexagons */}
      <div className="absolute bottom-0 left-0 w-full h-[30%] bg-green-500" style={{
        borderTopLeftRadius: '50%',
        borderTopRightRadius: '50%',
      }}>
        <div className="absolute bottom-0 right-0 w-full h-full flex justify-end items-end opacity-70">
          <img 
            src="/lovable-uploads/0d7c7d76-567e-4ed4-826a-796ce5e559b2.png" 
            alt="Hexagon Pattern" 
            className="w-2/3 h-2/3 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
