
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Hexagon, Eye, EyeOff, Check, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SignUpProps {
  onLogin: (token: string) => void;
}

const SignUp: React.FC<SignUpProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
        alert('Please fill all fields');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match');
        return;
      }
    }
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Navigate to verification
      navigate('/verify-otp', { 
        state: { 
          email: formData.email,
          isSignUp: true
        } 
      });
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
          
          <h2 className="text-xl font-bold text-center mb-4 text-green-500">Registration</h2>
          
          {/* Steps indicator */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                {step > 1 ? <Check size={18} /> : '1'}
              </div>
              <div className={`w-12 h-1 ${step >= 2 ? 'bg-green-500' : 'bg-gray-200'}`}></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                {step > 2 ? <Check size={18} /> : '2'}
              </div>
              <div className={`w-12 h-1 ${step >= 3 ? 'bg-green-500' : 'bg-gray-200'}`}></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                3
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div>
                  <Input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full rounded-lg border-gray-300 focus:ring-green-500 focus:border-green-500 px-4 py-3"
                  />
                </div>
                
                <div>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-lg border-gray-300 focus:ring-green-500 focus:border-green-500 px-4 py-3"
                  />
                </div>
                
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
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
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
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
                
                <Button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center"
                >
                  <span>Next</span>
                  <ChevronRight size={18} className="ml-2" />
                </Button>
              </motion.div>
            )}
            
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="flex space-x-2">
                  <Input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full rounded-lg border-gray-300 focus:ring-green-500 focus:border-green-500 px-4 py-3"
                  />
                  <Input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full rounded-lg border-gray-300 focus:ring-green-500 focus:border-green-500 px-4 py-3"
                  />
                </div>
                
                <div>
                  <Input
                    type="tel"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full rounded-lg border-gray-300 focus:ring-green-500 focus:border-green-500 px-4 py-3"
                  />
                </div>
                
                <div>
                  <Input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full rounded-lg border-gray-300 focus:ring-green-500 focus:border-green-500 px-4 py-3"
                  />
                </div>
                
                <div className="flex space-x-2">
                  <Input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full rounded-lg border-gray-300 focus:ring-green-500 focus:border-green-500 px-4 py-3"
                  />
                  <Input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full rounded-lg border-gray-300 focus:ring-green-500 focus:border-green-500 px-4 py-3"
                  />
                </div>
                
                <div>
                  <Input
                    type="text"
                    name="zipCode"
                    placeholder="Zip Code"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className="w-full rounded-lg border-gray-300 focus:ring-green-500 focus:border-green-500 px-4 py-3"
                  />
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    type="button"
                    onClick={handlePrevStep}
                    className="w-1/2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 rounded-lg"
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    onClick={handleNextStep}
                    className="w-1/2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg"
                  >
                    Next
                  </Button>
                </div>
              </motion.div>
            )}
            
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-medium text-green-800 mb-2">Review your information</h3>
                  <div className="space-y-2 text-sm text-green-700">
                    <p><strong>Username:</strong> {formData.username}</p>
                    <p><strong>Email:</strong> {formData.email}</p>
                    <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
                    <p><strong>Phone:</strong> {formData.phoneNumber}</p>
                    <p><strong>Address:</strong> {formData.address}, {formData.city}, {formData.state} {formData.zipCode}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="terms"
                    className="w-4 h-4 text-green-500 border-gray-300 rounded focus:ring-green-500"
                  />
                  <label htmlFor="terms" className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                    I agree to the <a href="#" className="text-green-500 hover:underline">Terms of Service</a> and <a href="#" className="text-green-500 hover:underline">Privacy Policy</a>
                  </label>
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    type="button"
                    onClick={handlePrevStep}
                    className="w-1/2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 rounded-lg"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="w-1/2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Submitting...
                      </div>
                    ) : (
                      'Sign Up'
                    )}
                  </Button>
                </div>
              </motion.div>
            )}
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link to="/sign-in" className="text-green-500 font-semibold hover:underline">
                Sign In
              </Link>
            </p>
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

export default SignUp;
