
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Wallet, CreditCard, Landmark, Smartphone, Calendar, Clock, CheckCircle, AppleIcon } from 'lucide-react';
import Header from '@/components/layout/Header';
import PaymentMethod from '@/components/ui/PaymentMethod';
import CreditCardForm from '@/components/ui/CreditCardForm';
import DateTimePicker from '@/components/ui/DateTimePicker';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from '@/hooks/use-toast';
import OtpVerification from '@/components/ui/OtpVerification';
import { useIsMobile } from '@/hooks/use-mobile';
import VirtualAccount from '@/components/ui/VirtualAccount';

// Updated payment methods for US
const paymentMethods = [
  {
    id: 'credit-card',
    name: 'Credit/Debit Card',
    description: 'Visa, Mastercard, Amex, Discover',
    icon: <CreditCard className="h-5 w-5 text-green-500" />
  },
  {
    id: 'apple-pay',
    name: 'Apple Pay',
    description: 'Fast and secure payment',
    icon: <svg className="h-5 w-5 text-green-500" viewBox="0 0 24 24" fill="currentColor"><path d="M17.6 13.8c0-3 2.5-4.5 2.6-4.6-1.4-2.1-3.6-2.3-4.4-2.4-1.9-.2-3.6 1.1-4.6 1.1-.9 0-2.4-1.1-4-1-2 0-3.9 1.2-5 3-2.1 3.7-.5 9.1 1.5 12.1 1 1.5 2.2 3.1 3.8 3 1.5-.1 2.1-1 3.9-1s2.4.9 4 .9 2.7-1.5 3.7-2.9c1.2-1.7 1.6-3.3 1.7-3.4-.1-.1-3.2-1.3-3.2-4.8zm-3.1-8.7c.8-1 1.4-2.4 1.2-3.8-1.2.1-2.7.8-3.5 1.8-.8.9-1.5 2.3-1.3 3.7 1.4.1 2.8-.7 3.6-1.7z"/></svg>
  },
  {
    id: 'paypal',
    name: 'PayPal',
    description: 'Use your PayPal account',
    icon: <svg className="h-5 w-5 text-green-500" viewBox="0 0 24 24" fill="currentColor"><path d="M20.067 8.478c.492.981.78 2.143.78 3.374 0 4.157-3.352 7.361-7.474 7.361-2.121 0-4.07-.904-5.476-2.395L5.059 21l-1.845-5.367h3.873c.426.751.913 1.387 1.443 1.953 1.319 1.388 3.121 2.168 5.062 2.243v-8.951H8.433l1.620-7.438h4.122V2h5.433v7.238c.376.212.744.431 1.083.703.339.27.606.575.799.908l-1.083-.371h2.8l1.243 5.732h-3.549l.166-7.438h-5.75v7.475h3.383c-.22-.67-.126-1.272-.279-1.839-.153-.565-.434-1.133-.845-1.707-.411-.572-.981-1.045-1.711-1.422-.731-.376-1.569-.637-2.519-.778z"/></svg>
  },
  {
    id: 'venmo',
    name: 'Venmo',
    description: 'Split and pay',
    icon: <svg className="h-5 w-5 text-green-500" viewBox="0 0 24 24" fill="currentColor"><path d="M19.1818 5.89766C19.1818 10.7374 16.3446 16.2608 13.39 19.1491H6.20218L3.5 4.84078L9.32779 4.30662L10.9112 13.644C11.9491 11.2561 13.2421 7.82152 13.2421 5.43039C13.2421 4.02028 12.97 3.13117 12.6158 2.5L17.9314 0.5C18.7206 1.41294 19.1818 3.10803 19.1818 5.89766Z"/></svg>
  }
];

// E-wallet providers updated for US
const eWallets = [
  { id: 'apple-pay', name: 'Apple Pay' },
  { id: 'google-pay', name: 'Google Pay' },
  { id: 'samsung-pay', name: 'Samsung Pay' },
  { id: 'venmo', name: 'Venmo' }
];

// Bank list for US
const banks = [
  { id: 'chase', name: 'Chase' },
  { id: 'bank-of-america', name: 'Bank of America' },
  { id: 'wells-fargo', name: 'Wells Fargo' },
  { id: 'citi', name: 'Citibank' }
];

const Payment: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [selectedMethod, setSelectedMethod] = useState(paymentMethods[0].id);
  const [selectedEWallet, setSelectedEWallet] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [showEWalletOtp, setShowEWalletOtp] = useState(false);
  const [showVirtualAccount, setShowVirtualAccount] = useState(false);
  const [scheduledDate, setScheduledDate] = useState<Date | undefined>(
    new Date(Date.now() + 30 * 60 * 1000) // 30 minutes from now as default
  );
  
  // Get data passed from fuel selection with correct US units
  const { fuelType, quantity, totalPrice } = location.state || {
    fuelType: { id: 'regular', name: 'Regular Unleaded', price: 3.79 },
    quantity: 5,
    totalPrice: 18.95
  };
  
  const handleCardFormSubmit = (values: any) => {
    console.log('Card form values:', values);
    handlePay();
  };
  
  const handleSelectEWallet = (walletId: string) => {
    setSelectedEWallet(walletId);
    setShowEWalletOtp(true);
  };
  
  const handleSelectBank = (bankId: string) => {
    setSelectedBank(bankId);
    setShowVirtualAccount(true);
  };
  
  const handleEWalletOtpVerify = () => {
    setShowEWalletOtp(false);
    handlePay();
  };
  
  const handleEWalletOtpCancel = () => {
    setShowEWalletOtp(false);
    setSelectedEWallet('');
  };
  
  const handleCloseVirtualAccount = () => {
    setShowVirtualAccount(false);
    handlePay();
  };
  
  const handlePay = () => {
    if (!scheduledDate) {
      toast({
        title: "Select delivery time",
        description: "Please select when you want to receive your fuel",
        variant: "destructive"
      });
      return;
    }
    
    navigate('/confirmation', {
      state: {
        fuelType,
        quantity,
        totalPrice,
        paymentMethod: selectedBank ? 
          { id: selectedBank, name: banks.find(b => b.id === selectedBank)?.name || 'Bank Transfer' } : 
          selectedEWallet ? 
            { id: selectedEWallet, name: eWallets.find(w => w.id === selectedEWallet)?.name || 'E-Wallet' } : 
            paymentMethods.find(method => method.id === selectedMethod),
        scheduledDate
      }
    });
  };
  
  // Generate a random account number for bank transfers
  const generateAccountNumber = () => {
    return `${Math.floor(100000000 + Math.random() * 900000000)}`;
  };
  
  // Calculate expiry time (24 hours from now)
  const calculateExpiryTime = () => {
    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 24);
    return expiryDate.toLocaleString('en-US', { 
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  };
  
  return (
    <>
      <Header showBack title="Payment" />
      
      <main className="page-container">
        <div className="mb-6">
          <div className="mb-1 text-sm text-muted-foreground">Step 3 of 4</div>
          <h2 className="text-2xl font-bold">Select Payment Method</h2>
        </div>
        
        <div className="glass card-shadow rounded-xl p-4 mb-6">
          <h3 className="text-sm text-muted-foreground mb-2">Order Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Fuel Type</span>
              <span className="font-medium">{fuelType.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Quantity</span>
              <span className="font-medium">{quantity} gallons</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Price per gallon</span>
              <span className="font-medium">
                ${fuelType.price.toFixed(2)}
              </span>
            </div>
            <div className="border-t border-border pt-2 mt-2">
              <div className="flex justify-between">
                <span className="font-medium">Total</span>
                <span className="font-bold">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Schedule Delivery</h3>
          <DateTimePicker 
            date={scheduledDate} 
            setDate={setScheduledDate} 
          />
          {scheduledDate && (
            <div className="mt-2 glass card-shadow rounded-xl p-3 flex items-center text-sm">
              <div className="mr-2 flex space-x-2">
                <Calendar className="h-4 w-4 text-green-500" />
                <Clock className="h-4 w-4 text-green-500" />
              </div>
              <span>
                Your fuel will be delivered on&nbsp;
                <span className="font-medium">
                  {scheduledDate.toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    month: 'short', 
                    day: 'numeric'
                  })}
                </span> 
                &nbsp;between&nbsp;
                <span className="font-medium">
                  {scheduledDate.toLocaleTimeString('en-US', { 
                    hour: 'numeric', 
                    minute: 'numeric',
                    hour12: true 
                  })}
                </span> 
                &nbsp;and&nbsp;
                <span className="font-medium">
                  {new Date(scheduledDate.getTime() + 45 * 60000).toLocaleTimeString('en-US', { 
                    hour: 'numeric', 
                    minute: 'numeric',
                    hour12: true 
                  })}
                </span>
              </span>
            </div>
          )}
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Payment Method</h3>
          <Tabs defaultValue="credit-card" className="w-full" onValueChange={setSelectedMethod}>
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="credit-card">
                <CreditCard className="h-5 w-5" />
              </TabsTrigger>
              <TabsTrigger value="apple-pay">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.6 13.8c0-3 2.5-4.5 2.6-4.6-1.4-2.1-3.6-2.3-4.4-2.4-1.9-.2-3.6 1.1-4.6 1.1-.9 0-2.4-1.1-4-1-2 0-3.9 1.2-5 3-2.1 3.7-.5 9.1 1.5 12.1 1 1.5 2.2 3.1 3.8 3 1.5-.1 2.1-1 3.9-1s2.4.9 4 .9 2.7-1.5 3.7-2.9c1.2-1.7 1.6-3.3 1.7-3.4-.1-.1-3.2-1.3-3.2-4.8zm-3.1-8.7c.8-1 1.4-2.4 1.2-3.8-1.2.1-2.7.8-3.5 1.8-.8.9-1.5 2.3-1.3 3.7 1.4.1 2.8-.7 3.6-1.7z"/></svg>
              </TabsTrigger>
              <TabsTrigger value="paypal">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.067 8.478c.492.981.78 2.143.78 3.374 0 4.157-3.352 7.361-7.474 7.361-2.121 0-4.07-.904-5.476-2.395L5.059 21l-1.845-5.367h3.873c.426.751.913 1.387 1.443 1.953 1.319 1.388 3.121 2.168 5.062 2.243v-8.951H8.433l1.62-7.438h4.122V2h5.433v7.238c.376.212.744.431 1.083.703.339.27.606.575.799.908l-1.083-.371h2.8l1.243 5.732h-3.549l.166-7.438h-5.75v7.475h3.383c-.22-.67-.126-1.272-.279-1.839-.153-.565-.434-1.133-.845-1.707-.411-.572-.981-1.045-1.711-1.422-.731-.376-1.569-.637-2.519-.778z"/></svg>
              </TabsTrigger>
              <TabsTrigger value="venmo">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19.1818 5.89766C19.1818 10.7374 16.3446 16.2608 13.39 19.1491H6.20218L3.5 4.84078L9.32779 4.30662L10.9112 13.644C11.9491 11.2561 13.2421 7.82152 13.2421 5.43039C13.2421 4.02028 12.97 3.13117 12.6158 2.5L17.9314 0.5C18.7206 1.41294 19.1818 3.10803 19.1818 5.89766Z"/></svg>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="credit-card">
              <CreditCardForm onSubmit={handleCardFormSubmit} />
            </TabsContent>
            
            <TabsContent value="apple-pay">
              <div className="glass card-shadow rounded-xl p-4 text-center py-8">
                <svg className="h-12 w-12 mx-auto mb-4 text-green-500" viewBox="0 0 24 24" fill="currentColor"><path d="M17.6 13.8c0-3 2.5-4.5 2.6-4.6-1.4-2.1-3.6-2.3-4.4-2.4-1.9-.2-3.6 1.1-4.6 1.1-.9 0-2.4-1.1-4-1-2 0-3.9 1.2-5 3-2.1 3.7-.5 9.1 1.5 12.1 1 1.5 2.2 3.1 3.8 3 1.5-.1 2.1-1 3.9-1s2.4.9 4 .9 2.7-1.5 3.7-2.9c1.2-1.7 1.6-3.3 1.7-3.4-.1-.1-3.2-1.3-3.2-4.8zm-3.1-8.7c.8-1 1.4-2.4 1.2-3.8-1.2.1-2.7.8-3.5 1.8-.8.9-1.5 2.3-1.3 3.7 1.4.1 2.8-.7 3.6-1.7z"/></svg>
                <h3 className="text-lg font-medium mb-1">Apple Pay</h3>
                <p className="text-muted-foreground mb-6">Quick, easy and secure payment with Apple Pay</p>
                <button 
                  onClick={() => handleSelectEWallet('apple-pay')}
                  className="w-full py-3 rounded-xl bg-black text-white font-semibold hover:bg-black/90 active:scale-[0.99] transition-all duration-200 flex items-center justify-center"
                >
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.6 13.8c0-3 2.5-4.5 2.6-4.6-1.4-2.1-3.6-2.3-4.4-2.4-1.9-.2-3.6 1.1-4.6 1.1-.9 0-2.4-1.1-4-1-2 0-3.9 1.2-5 3-2.1 3.7-.5 9.1 1.5 12.1 1 1.5 2.2 3.1 3.8 3 1.5-.1 2.1-1 3.9-1s2.4.9 4 .9 2.7-1.5 3.7-2.9c1.2-1.7 1.6-3.3 1.7-3.4-.1-.1-3.2-1.3-3.2-4.8zm-3.1-8.7c.8-1 1.4-2.4 1.2-3.8-1.2.1-2.7.8-3.5 1.8-.8.9-1.5 2.3-1.3 3.7 1.4.1 2.8-.7 3.6-1.7z"/>
                  </svg>
                  Pay with Apple Pay
                </button>
              </div>
            </TabsContent>
            
            <TabsContent value="paypal">
              <div className="glass card-shadow rounded-xl p-4 text-center py-8">
                <svg className="h-12 w-12 mx-auto mb-4 text-green-500" viewBox="0 0 24 24" fill="currentColor"><path d="M20.067 8.478c.492.981.78 2.143.78 3.374 0 4.157-3.352 7.361-7.474 7.361-2.121 0-4.07-.904-5.476-2.395L5.059 21l-1.845-5.367h3.873c.426.751.913 1.387 1.443 1.953 1.319 1.388 3.121 2.168 5.062 2.243v-8.951H8.433l1.62-7.438h4.122V2h5.433v7.238c.376.212.744.431 1.083.703.339.27.606.575.799.908l-1.083-.371h2.8l1.243 5.732h-3.549l.166-7.438h-5.75v7.475h3.383c-.22-.67-.126-1.272-.279-1.839-.153-.565-.434-1.133-.845-1.707-.411-.572-.981-1.045-1.711-1.422-.731-.376-1.569-.637-2.519-.778z"/></svg>
                <h3 className="text-lg font-medium mb-1">PayPal</h3>
                <p className="text-muted-foreground mb-6">Fast, secure payments with PayPal</p>
                <button 
                  onClick={() => handleSelectEWallet('paypal')}
                  className="w-full py-3 rounded-xl bg-[#003087] text-white font-semibold hover:bg-[#003087]/90 active:scale-[0.99] transition-all duration-200 flex items-center justify-center"
                >
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.067 8.478c.492.981.78 2.143.78 3.374 0 4.157-3.352 7.361-7.474 7.361-2.121 0-4.07-.904-5.476-2.395L5.059 21l-1.845-5.367h3.873c.426.751.913 1.387 1.443 1.953 1.319 1.388 3.121 2.168 5.062 2.243v-8.951H8.433l1.62-7.438h4.122V2h5.433v7.238c.376.212.744.431 1.083.703.339.27.606.575.799.908l-1.083-.371h2.8l1.243 5.732h-3.549l.166-7.438h-5.75v7.475h3.383c-.22-.67-.126-1.272-.279-1.839-.153-.565-.434-1.133-.845-1.707-.411-.572-.981-1.045-1.711-1.422-.731-.376-1.569-.637-2.519-.778z"/>
                  </svg>
                  Pay with PayPal
                </button>
              </div>
            </TabsContent>
            
            <TabsContent value="venmo">
              <div className="glass card-shadow rounded-xl p-4 text-center py-8">
                <svg className="h-12 w-12 mx-auto mb-4 text-green-500" viewBox="0 0 24 24" fill="currentColor"><path d="M19.1818 5.89766C19.1818 10.7374 16.3446 16.2608 13.39 19.1491H6.20218L3.5 4.84078L9.32779 4.30662L10.9112 13.644C11.9491 11.2561 13.2421 7.82152 13.2421 5.43039C13.2421 4.02028 12.97 3.13117 12.6158 2.5L17.9314 0.5C18.7206 1.41294 19.1818 3.10803 19.1818 5.89766Z"/></svg>
                <h3 className="text-lg font-medium mb-1">Venmo</h3>
                <p className="text-muted-foreground mb-6">Pay with your Venmo balance</p>
                <button 
                  onClick={() => handleSelectEWallet('venmo')}
                  className="w-full py-3 rounded-xl bg-[#3396cd] text-white font-semibold hover:bg-[#3396cd]/90 active:scale-[0.99] transition-all duration-200 flex items-center justify-center"
                >
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.1818 5.89766C19.1818 10.7374 16.3446 16.2608 13.39 19.1491H6.20218L3.5 4.84078L9.32779 4.30662L10.9112 13.644C11.9491 11.2561 13.2421 7.82152 13.2421 5.43039C13.2421 4.02028 12.97 3.13117 12.6158 2.5L17.9314 0.5C18.7206 1.41294 19.1818 3.10803 19.1818 5.89766Z"/>
                  </svg>
                  Pay with Venmo
                </button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="mt-8 mb-4">
          <button 
            onClick={handlePay}
            className="w-full py-4 rounded-xl bg-green-500 text-black font-semibold hover:bg-green-600 active:scale-[0.99] transition-all duration-200"
          >
            Pay Now
          </button>
        </div>
      </main>
      
      {showEWalletOtp && (
        <OtpVerification 
          onVerify={handleEWalletOtpVerify} 
          onCancel={handleEWalletOtpCancel} 
        />
      )}
      
      {showVirtualAccount && selectedBank && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md animate-scale-in">
            <VirtualAccount 
              bankName={banks.find(b => b.id === selectedBank)?.name || 'Bank'}
              accountNumber={generateAccountNumber()}
              amount={totalPrice}
              expiryTime={calculateExpiryTime()}
            />
            <button 
              onClick={handleCloseVirtualAccount}
              className="w-full mt-4 py-3 rounded-xl bg-green-500 text-black font-semibold hover:bg-green-600 active:scale-[0.99] transition-all duration-200"
            >
              Confirm Payment
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Payment;
