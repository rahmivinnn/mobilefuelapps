
import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Check, ChevronLeft, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const Payment: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedPayment, setSelectedPayment] = useState('credit-card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [saveCard, setSaveCard] = useState(true);
  
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };
  
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = formatCardNumber(e.target.value);
    setCardNumber(value);
  };
  
  const handlePayNow = () => {
    // In a real app, we would process the payment here
    navigate('/confirmation');
  };
  
  const paymentMethods = [
    { id: 'credit-card', name: 'Credit card', icon: '/lovable-uploads/f01d03f8-3174-4828-bdcd-196b636f0b6f.png' },
    { id: 'paypal', name: 'Paypal', icon: '/lovable-uploads/c6f7b2ed-2b72-441e-9423-5772c33b1029.png' },
    { id: 'apple-pay', name: 'Apple Pay', icon: '/lovable-uploads/f01d03f8-3174-4828-bdcd-196b636f0b6f.png' },
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
      <div className="px-4 pb-6 grid grid-cols-3 gap-3">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className={`border-2 p-4 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all ${
              selectedPayment === method.id ? 'border-green-500' : 'border-gray-800'
            }`}
            onClick={() => setSelectedPayment(method.id)}
          >
            <img src={method.icon} alt={method.name} className="h-6 mb-2" />
            <span className="text-sm">{method.name}</span>
          </div>
        ))}
      </div>
      
      {/* Credit card */}
      <div className="px-4 mb-6">
        <div className="bg-gray-800 rounded-xl p-4 mb-6 relative overflow-hidden">
          <div className="absolute top-4 right-4">
            <img src="/lovable-uploads/f12de587-6760-49e5-aa30-4d1aea99f177.png" alt="Mastercard" className="h-8" />
          </div>
          <div className="mb-6">
            <p className="text-gray-400 mb-1 uppercase text-sm">BANK NAME</p>
          </div>
          <div className="mb-6">
            <p className="text-gray-400 mb-1">Card Number</p>
            <p className="text-xl">{cardNumber || '1844 444 7860'}</p>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-gray-400 mb-1">Holder Name</p>
              <p>{cardName || 'Loreum Ipsum'}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-400 mb-1">Exp. Date</p>
              <p>{expiryDate || '10/28'}</p>
            </div>
          </div>
          <div className="absolute bottom-4 right-4">
            <img src="/lovable-uploads/bd7d3e2c-d8cc-4ae3-b3f6-e23f3527fa24.png" alt="Chip" className="h-10" />
          </div>
        </div>
        
        {/* Card form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-2">Card holder name</label>
            <input
              type="text"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              placeholder="Loreum ipsum"
              className="w-full px-4 py-3 bg-transparent border border-gray-700 rounded-full text-white focus:outline-none focus:border-green-500"
            />
          </div>
          
          <div>
            <label className="block text-sm mb-2">Card Number</label>
            <input
              type="text"
              value={cardNumber}
              onChange={handleCardNumberChange}
              placeholder="**** **** **** ****"
              maxLength={19}
              className="w-full px-4 py-3 bg-transparent border border-gray-700 rounded-full text-white focus:outline-none focus:border-green-500"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-2">Expiry Date</label>
              <input
                type="text"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                placeholder="oct 2025"
                className="w-full px-4 py-3 bg-transparent border border-gray-700 rounded-full text-white focus:outline-none focus:border-green-500"
              />
            </div>
            
            <div>
              <label className="block text-sm mb-2">CVV Code</label>
              <input
                type="password"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                placeholder="CVV code"
                maxLength={4}
                className="w-full px-4 py-3 bg-transparent border border-gray-700 rounded-full text-white focus:outline-none focus:border-green-500"
              />
            </div>
          </div>
          
          <div className="flex items-center">
            <button
              className="w-6 h-6 rounded flex items-center justify-center mr-2 border border-gray-700"
              onClick={() => setSaveCard(!saveCard)}
            >
              {saveCard && (
                <div className="w-4 h-4 bg-green-500 rounded-sm flex items-center justify-center">
                  <Check className="w-3 h-3 text-black" />
                </div>
              )}
            </button>
            <span>Save card Information</span>
          </div>
        </div>
      </div>
      
      <div className="px-4 fixed bottom-8 left-0 right-0">
        <Button 
          className="w-full py-6 bg-green-500 hover:bg-green-600 text-black rounded-full text-lg font-medium"
          onClick={handlePayNow}
        >
          Pay Now
        </Button>
      </div>
    </div>
  );
};

export default Payment;
