import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';

interface SignUpProps {
  onLogin: (token: string) => void;
}

const SignUp: React.FC<SignUpProps> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    return /^[0-9]{10,13}$/.test(phone);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password || !phone) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    if (!validateEmail(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }

    if (!validatePhone(phone)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid phone number (10-13 digits)",
        variant: "destructive"
      });
      return;
    }

    if (!validatePassword(password)) {
      toast({
        title: "Invalid Password",
        description: "Password must be at least 8 characters long",
        variant: "destructive"
      });
      return;
    }
    
    if (!agreeTerms) {
      toast({
        title: "Terms Agreement",
        description: "Please agree to our terms and conditions",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store user data in localStorage for OTP verification
      localStorage.setItem('signup_data', JSON.stringify({
        name,
        email,
        phone,
        password
      }));
      
      // Navigate to OTP verification
      navigate('/verify-otp', { 
        state: { 
          email,
          isSignUp: true
        }
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred during sign up. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col relative overflow-hidden">
      {/* Top green wave */}
      <div className="absolute top-0 left-0 w-full h-1/4 bg-green-500 rounded-b-[50%] z-0" />
      
      {/* Bottom green section with hexagon pattern */}
      <div className="absolute bottom-0 left-0 w-full h-1/4 bg-green-500 z-0">
        <div className="absolute bottom-0 left-0 w-full h-full opacity-30">
          <img 
            src="/lovable-uploads/0c368b73-df56-4e77-94c3-14691cdc22b7.png" 
            alt="Hexagon Pattern" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      {/* Header */}
      <div className="pt-6 px-6 z-10">
        <Link to="/" className="inline-flex items-center text-green-500 hover:text-green-400">
          <ArrowLeft className="h-5 w-5 mr-1" />
          <span>Back</span>
        </Link>
      </div>
      
      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-between z-10 px-6 py-8">
        <div className="w-full pt-6">
          {/* Logo and brand section */}
          <motion.div 
            className="flex flex-col items-center mb-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Logo circle */}
            <motion.div 
              className="w-24 h-24 rounded-full border-2 border-green-500 flex items-center justify-center mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
            >
              <img 
                src="/lovable-uploads/44c35d38-14ee-46b9-8302-0944a264f34e.png" 
                alt="FuelFriendly Logo" 
                className="w-16 h-16"
              />
            </motion.div>
            
            {/* Brand name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <img 
                src="/lovable-uploads/2b80eff8-6efd-4f15-9213-ed9fe4e0cba9.png" 
                alt="FUELFRIENDLY" 
                className="h-6"
              />
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">Create account</h1>
            <p className="text-gray-400">Sign up to get started</p>
          </div>

          <form onSubmit={handleSignUp} className="space-y-6">
            <div>
              <Input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 rounded-lg"
                required
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 rounded-lg"
                required
              />
            </div>
            <div>
              <Input
                type="tel"
                placeholder="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-12 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 rounded-lg"
                required
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 rounded-lg"
                required
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="terms" 
                checked={agreeTerms} 
                onCheckedChange={(checked) => setAgreeTerms(checked as boolean)} 
                className="border-green-500 data-[state=checked]:bg-green-500 data-[state=checked]:text-white"
              />
              <label htmlFor="terms" className="text-sm text-gray-400">
                I agree to the <button type="button" className="text-green-500 hover:underline">Terms of Service</button> and <button type="button" className="text-green-500 hover:underline">Privacy Policy</button>
              </label>
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-12 rounded-full bg-green-500 hover:bg-green-600 text-white font-medium text-base"
              disabled={isLoading}
            >
              {isLoading ? 'Creating account...' : 'Sign Up'}
            </Button>
            
            <div className="text-center text-gray-400">
              Already have an account?{' '}
              <button 
                type="button" 
                onClick={() => navigate('/sign-in')}
                className="text-green-500 hover:underline font-medium"
              >
                Sign In
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUp;
