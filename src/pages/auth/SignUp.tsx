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
    <div className="min-h-screen bg-black flex flex-col relative">
      {/* Top wave pattern */}
      <div className="absolute top-0 left-0 w-full h-[25vh]">
        <svg 
          viewBox="0 0 1440 320" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          preserveAspectRatio="none"
          style={{ transform: 'scaleY(0.8)' }}
        >
          <path 
            fill="#22C55E"
            fillOpacity="0.3"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </svg>
      </div>
      
      {/* Bottom wave pattern */}
      <div className="absolute bottom-0 left-0 w-full h-[25vh]">
        <svg 
          viewBox="0 0 1440 320" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          preserveAspectRatio="none"
          style={{ transform: 'scaleY(0.8)' }}
        >
          <path 
            fill="#22C55E"
            fillOpacity="0.3"
            d="M0,224L48,208C96,192,192,160,288,160C384,160,480,192,576,208C672,224,768,224,864,208C960,192,1056,160,1152,160C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col z-10 px-6 pt-8 pb-16">
        {/* Back button */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="text-green-500 hover:text-green-400 flex items-center"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            Back
          </button>
        </div>

        {/* Logo and brand section */}
        <div className="flex flex-col items-center mb-10">
          <motion.div 
            className="w-20 h-20 rounded-full border-2 border-green-500 flex items-center justify-center mb-3"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
          >
            <img 
              src="/lovable-uploads/44c35d38-14ee-46b9-8302-0944a264f34e.png" 
              alt="FuelFriendly Logo" 
              className="w-12 h-12"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <img 
              src="/lovable-uploads/2b80eff8-6efd-4f15-9213-ed9fe4e0cba9.png" 
              alt="FUELFRIENDLY" 
              className="h-5"
            />
          </motion.div>
        </div>

        {/* Form section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md mx-auto"
        >
          <div className="text-center mb-6">
            <h1 className="text-xl font-bold text-white mb-1">Create account</h1>
            <p className="text-sm text-gray-400">Sign up to get started</p>
          </div>

          <form onSubmit={handleSignUp} className="space-y-4">
            <Input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-11 bg-gray-900 border-gray-800 text-white placeholder:text-gray-500 rounded-lg focus:border-green-500 focus:ring-green-500"
              required
            />
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 bg-gray-900 border-gray-800 text-white placeholder:text-gray-500 rounded-lg focus:border-green-500 focus:ring-green-500"
              required
            />
            <Input
              type="tel"
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="h-11 bg-gray-900 border-gray-800 text-white placeholder:text-gray-500 rounded-lg focus:border-green-500 focus:ring-green-500"
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11 bg-gray-900 border-gray-800 text-white placeholder:text-gray-500 rounded-lg focus:border-green-500 focus:ring-green-500"
              required
            />
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="terms" 
                checked={agreeTerms} 
                onCheckedChange={(checked) => setAgreeTerms(checked as boolean)} 
                className="border-green-500 data-[state=checked]:bg-green-500 data-[state=checked]:text-white"
              />
              <label htmlFor="terms" className="text-xs text-gray-400">
                I agree to the <Link to="#" className="text-green-500 hover:text-green-400">Terms of Service</Link> and <Link to="#" className="text-green-500 hover:text-green-400">Privacy Policy</Link>
              </label>
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-11 rounded-full bg-green-500 hover:bg-green-600 text-white font-medium text-base"
              disabled={isLoading}
            >
              {isLoading ? 'Creating account...' : 'Sign Up'}
            </Button>

            <div className="flex items-center my-4">
              <div className="flex-1 h-px bg-gray-800"></div>
              <span className="px-4 text-sm text-gray-500">Or</span>
              <div className="flex-1 h-px bg-gray-800"></div>
            </div>

            <Button 
              type="button" 
              variant="outline" 
              className="w-full h-11 rounded-full border-2 border-green-500 bg-transparent text-white hover:bg-green-500/10 font-medium text-base flex items-center justify-center gap-2"
              onClick={() => {
                // Handle Google sign up
              }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </Button>
          </form>

          <div className="text-center mt-4 mb-6">
            <p className="text-sm text-gray-400">
              Already have an account?{' '}
              <Link to="/sign-in" className="text-green-500 hover:text-green-400 font-medium">
                Log in
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUp;
