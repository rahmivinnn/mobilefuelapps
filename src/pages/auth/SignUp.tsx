
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/components/ui/use-toast';
import { Facebook } from 'lucide-react';

interface SignUpProps {
  onLogin: (token: string) => void;
}

const SignUp: React.FC<SignUpProps> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields",
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
    
    // Simulate API call
    setTimeout(() => {
      // Mock successful registration
      const token = "mock-auth-token-" + Math.random();
      onLogin(token);
      setIsLoading(false);
      navigate('/');
    }, 1500);
  };
  
  const handleFacebookSignUp = () => {
    setIsLoading(true);
    
    // Simulate Facebook API call
    setTimeout(() => {
      const token = "facebook-auth-token-" + Math.random();
      onLogin(token);
      setIsLoading(false);
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.img 
            src="/lovable-uploads/ba008608-8960-40b9-8a96-e5b173a48e08.png"
            alt="FuelFriendly Logo" 
            className="w-24 h-24 mx-auto mb-4"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          />
          <h1 
            className="text-3xl font-bold mb-2 text-green-500" 
            style={{ fontFamily: 'Impact, Haettenschweiler, Arial Narrow Bold, sans-serif', letterSpacing: '1px', fontStyle: 'italic' }}
          >
            FUELFRIENDLY
          </h1>
          <p className="text-muted-foreground">Create your account</p>
        </div>

        <div className="bg-card p-6 rounded-xl border border-border">
          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12"
                required
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12"
                required
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12"
                required
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="terms" 
                checked={agreeTerms} 
                onCheckedChange={(checked) => setAgreeTerms(checked as boolean)} 
              />
              <label htmlFor="terms" className="text-sm text-muted-foreground">
                I agree to the <Link to="#" className="text-green-500 hover:underline">Terms of Service</Link> and <Link to="#" className="text-green-500 hover:underline">Privacy Policy</Link>
              </label>
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-12 text-base font-semibold bg-green-500 hover:bg-green-600"
              disabled={isLoading}
            >
              {isLoading ? 'Creating account...' : 'Sign Up'}
            </Button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-border"></div>
            <span className="px-4 text-sm text-muted-foreground">OR</span>
            <div className="flex-1 h-px bg-border"></div>
          </div>

          <Button 
            type="button" 
            variant="outline" 
            className="w-full h-12 text-base font-medium border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
            onClick={handleFacebookSignUp}
            disabled={isLoading}
          >
            <Facebook className="mr-2 h-5 w-5" />
            Continue with Facebook
          </Button>
        </div>

        <div className="text-center mt-6">
          <p className="text-muted-foreground text-sm">
            Already have an account?{' '}
            <Link to="/sign-in" className="text-green-500 hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;
