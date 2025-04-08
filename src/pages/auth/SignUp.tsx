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
      {/* Top wave pattern */}
      <div className="absolute top-0 left-0 w-full h-[30vh]">
        <svg 
          viewBox="0 0 1440 320" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          preserveAspectRatio="none"
          style={{ transform: 'scaleY(0.9)' }}
        >
          <path 
            fill="#22C55E"
            fillOpacity="0.15"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </svg>
        <svg 
          viewBox="0 0 1440 320" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full absolute top-0"
          preserveAspectRatio="none"
          style={{ transform: 'scaleY(0.8)' }}
        >
          <path 
            fill="#22C55E"
            fillOpacity="0.1"
            d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,181.3C672,192,768,160,864,144C960,128,1056,128,1152,138.7C1248,149,1344,171,1392,181.3L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </svg>
      </div>
      
      {/* Bottom wave pattern */}
      <div className="absolute bottom-0 left-0 w-full h-[30vh]">
        <svg 
          viewBox="0 0 1440 320" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          preserveAspectRatio="none"
          style={{ transform: 'scaleY(0.9)' }}
        >
          <path 
            fill="#22C55E"
            fillOpacity="0.15"
            d="M0,224L48,208C96,192,192,160,288,160C384,160,480,192,576,208C672,224,768,224,864,208C960,192,1056,160,1152,160C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
        <svg 
          viewBox="0 0 1440 320" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full absolute bottom-0"
          preserveAspectRatio="none"
          style={{ transform: 'scaleY(0.8)' }}
        >
          <path 
            fill="#22C55E"
            fillOpacity="0.1"
            d="M0,192L48,181.3C96,171,192,149,288,138.7C384,128,480,128,576,144C672,160,768,192,864,181.3C960,171,1056,117,1152,106.7C1248,96,1344,128,1392,144L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col z-10 px-6 pt-8 pb-16 backdrop-blur-sm">
        {/* Back button */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button
            onClick={() => navigate(-1)}
            className="text-green-400 hover:text-green-300 flex items-center transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            Back
          </button>
        </motion.div>

        {/* Logo and brand section */}
        <div className="flex flex-col items-center mb-10">
          <motion.div 
            className="w-20 h-20 rounded-full bg-black/50 border-2 border-green-500 flex items-center justify-center mb-3 shadow-lg shadow-green-500/20"
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
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">Create account</h1>
            <p className="text-sm text-gray-400">Sign up to get started</p>
          </div>

          <form onSubmit={handleSignUp} className="space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12 bg-gray-900/70 border-gray-800 text-white placeholder:text-gray-500 rounded-lg focus:border-green-500 focus:ring-green-500/30 transition-all duration-200"
                required
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 bg-gray-900/70 border-gray-800 text-white placeholder:text-gray-500 rounded-lg focus:border-green-500 focus:ring-green-500/30 transition-all duration-200"
                required
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Input
                type="tel"
                placeholder="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-12 bg-gray-900/70 border-gray-800 text-white placeholder:text-gray-500 rounded-lg focus:border-green-500 focus:ring-green-500/30 transition-all duration-200"
                required
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 bg-gray-900/70 border-gray-800 text-white placeholder:text-gray-500 rounded-lg focus:border-green-500 focus:ring-green-500/30 transition-all duration-200"
                required
              />
            </motion.div>
            
            <motion.div 
              className="flex items-center space-x-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Checkbox 
                id="terms" 
                checked={agreeTerms} 
                onCheckedChange={(checked) => setAgreeTerms(checked as boolean)} 
                className="border-green-500 data-[state=checked]:bg-green-500 data-[state=checked]:text-white"
              />
              <label htmlFor="terms" className="text-xs text-gray-400">
                I agree to the <Link to="#" className="text-green-400 hover:text-green-300 transition-colors duration-200">Terms of Service</Link> and <Link to="#" className="text-green-400 hover:text-green-300 transition-colors duration-200">Privacy Policy</Link>
              </label>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button 
                type="submit"
                className="w-full h-12 bg-green-500 hover:bg-green-400 text-black font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create account"}
              </Button>
            </motion.div>
            
            <motion.p 
              className="text-center text-sm text-gray-400 mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              Already have an account?{" "}
              <Link to="/login" className="text-green-400 hover:text-green-300 transition-colors duration-200">
                Log in
              </Link>
            </motion.p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUp;
