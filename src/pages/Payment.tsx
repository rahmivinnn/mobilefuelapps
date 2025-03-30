
import React, { useState } from 'react';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { Check, ChevronLeft, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CreditCardForm from '@/components/ui/CreditCardForm';
import PaymentMethod from '@/components/ui/PaymentMethod';

const Payment: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const { fuelType, quantity, groceryCart, totalPrice } = location.state || {
    fuelType: { id: 'regular', name: 'Regular Unleaded', price: 3.29 },
    quantity: 2,
    groceryCart: [],
    totalPrice: 6.58
  };
  
  const [selectedPayment, setSelectedPayment] = useState('credit-card');
  
  const handlePayNow = () => {
    // In a real app, we would process the payment here
    navigate('/confirmation', { 
      state: { 
        fuelType, 
        quantity, 
        totalPrice, 
        paymentMethod: paymentMethods.find(m => m.id === selectedPayment) 
      }
    });
  };
  
  const paymentMethods = [
    { 
      id: 'credit-card', 
      name: 'Credit card', 
      icon: <CreditCard className="h-5 w-5" /> 
    },
    { 
      id: 'paypal', 
      name: 'PayPal', 
      icon: <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor">
              <path d="M19.5 8.5h-2a2 2 0 0 0-2 2v.5h-2a2 2 0 0 0-2 2v.5h-2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2Z" />
              <path d="M3 11v3a4 4 0 0 0 4 4h1" />
              <path d="M7 5.5v3" />
              <path d="M18 5.5v3" />
              <path d="M13.5 17h1" />
            </svg>
    },
    { 
      id: 'apple-pay', 
      name: 'Apple Pay', 
      icon: <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor">
              <path d="M12 17.5c-2.5 0-2.5-5-5-5" />
              <path d="M8 22c3.5 0 3.5-10 7-10" />
              <path d="M11 14.5c1.5 0 3-6.5 3-6.5" />
              <path d="M9 2h6" />
              <path d="M12 2v7" />
            </svg>
    },
  ];
  
  return (
    <div className="min-h-screen bg-black text-white pb-8">
      {/* Status bar */}
      <div className="px-4 py-1 flex justify-between items-center">
        <div className="text-sm font-medium">8:45</div>
        <div className="flex items-center space-x-1">
          <div className="flex items-center">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
              <path d="M17 20H7C4 20 2 18 2 15V9C2 6 4 4 7 4H17C20 4 22 6 22 9V15C22 18 20 20 17 20Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M12 14V10M12 14C11.2 14 10.5 13.3 10.5 12.5V11.5C10.5 10.7 11.2 10 12 10C12.8 10 13.5 10.7 13.5 11.5V12.5C13.5 13.3 12.8 14 12 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
              <path d="M6.43994 2C4.01994 2 1.98999 4.01995 1.98999 6.43995V17.56C1.98999 19.98 4.01994 22 6.43994 22H17.5599C19.9799 22 21.9999 19.98 21.9999 17.56V6.43995C21.9999 4.01995 19.9799 2 17.5599 2H6.43994Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M11.9999 7V9M11.9999 14.01V14M7.98993 12H15.9999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="text-sm font-bold">100%</div>
        </div>
      </div>
      
      {/* Header */}
      <div className="relative px-4 py-3 flex items-center justify-center">
        <Link to={`/station/${id}/fuel`} className="absolute left-4">
          <div className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-800">
            <ChevronLeft className="h-6 w-6" />
          </div>
        </Link>
        <h1 className="text-xl font-semibold">Checkout</h1>
      </div>
      
      {/* Progress steps */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center mb-2">
              <Check className="h-6 w-6 text-black" />
            </div>
            <span className="text-sm">Order</span>
          </div>
          
          <div className="flex-1 h-1 bg-green-500 mx-2"></div>
          
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center mb-2">
              <Check className="h-6 w-6 text-black" />
            </div>
            <span className="text-sm">Order summary</span>
          </div>
          
          <div className="flex-1 h-1 bg-green-500 mx-2"></div>
          
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full border-2 border-green-500 text-green-500 flex items-center justify-center mb-2">
              <span className="text-lg font-bold">3</span>
            </div>
            <span className="text-sm">Payment</span>
          </div>
        </div>
      </div>
      
      {/* Payment methods */}
      <div className="px-4 mb-6">
        <PaymentMethod 
          methods={paymentMethods}
          selectedMethod={selectedPayment}
          onSelectMethod={setSelectedPayment}
        />
      </div>
      
      {/* Card Form Component */}
      <div className="px-4 mb-6">
        {selectedPayment === 'credit-card' && (
          <CreditCardForm onSubmit={handlePayNow} />
        )}
      </div>
      
      {selectedPayment !== 'credit-card' && (
        <div className="px-4 fixed bottom-8 left-0 right-0">
          <Button 
            className="w-full py-6 bg-green-500 hover:bg-green-600 text-black rounded-full text-lg font-medium"
            onClick={handlePayNow}
          >
            Pay Now
          </Button>
        </div>
      )}
    </div>
  );
};

export default Payment;
