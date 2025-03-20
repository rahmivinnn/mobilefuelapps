import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Wallet, CreditCard, Landmark, Smartphone, Calendar, Clock, CheckCircle } from 'lucide-react';
import Header from '@/components/layout/Header';
import PaymentMethod from '@/components/ui/PaymentMethod';
import CreditCardForm from '@/components/ui/CreditCardForm';
import DateTimePicker from '@/components/ui/DateTimePicker';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from '@/hooks/use-toast';
import OtpVerification from '@/components/ui/OtpVerification';
import { useIsMobile } from '@/hooks/use-mobile';
import VirtualAccount from '@/components/ui/VirtualAccount';

// Mock data for payment methods
const paymentMethods = [
  {
    id: 'credit-card',
    name: 'Credit/Debit Card',
    description: 'Visa, Mastercard, JCB',
    icon: <CreditCard className="h-5 w-5 text-green-500" />
  },
  {
    id: 'e-wallet',
    name: 'E-Wallet',
    description: 'GoPay, OVO, DANA, LinkAja',
    icon: <Wallet className="h-5 w-5 text-green-500" />
  },
  {
    id: 'bank-transfer',
    name: 'Bank Transfer',
    description: 'BCA, BNI, Mandiri, BRI',
    icon: <Landmark className="h-5 w-5 text-green-500" />
  },
  {
    id: 'qris',
    name: 'QRIS',
    description: 'Quick Response Code Indonesian Standard',
    icon: <Smartphone className="h-5 w-5 text-green-500" />
  }
];

// E-wallet providers
const eWallets = [
  { id: 'gopay', name: 'GoPay' },
  { id: 'ovo', name: 'OVO' },
  { id: 'dana', name: 'DANA' },
  { id: 'linkaja', name: 'LinkAja' }
];

// Bank list
const banks = [
  { id: 'bca', name: 'BCA' },
  { id: 'bni', name: 'BNI' },
  { id: 'mandiri', name: 'Mandiri' },
  { id: 'bri', name: 'BRI' }
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
  
  // Get data passed from fuel selection
  const { fuelType, quantity, totalPrice } = location.state || {
    fuelType: { id: 'pertamax', name: 'Pertamax', price: 13000 },
    quantity: 10,
    totalPrice: 130000
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
  
  // Generate a random virtual account number
  const generateVirtualAccount = () => {
    return `${Math.floor(10000000000000 + Math.random() * 90000000000000)}`;
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
              <span className="font-medium">{quantity} liters</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Price per liter</span>
              <span className="font-medium">
                {fuelType.price.toLocaleString('id-ID', { 
                  style: 'currency', 
                  currency: 'IDR',
                  minimumFractionDigits: 0 
                })}
              </span>
            </div>
            <div className="border-t border-border pt-2 mt-2">
              <div className="flex justify-between">
                <span className="font-medium">Total</span>
                <span className="font-bold">
                  {totalPrice.toLocaleString('id-ID', { 
                    style: 'currency', 
                    currency: 'IDR',
                    minimumFractionDigits: 0 
                  })}
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
              <TabsTrigger value="e-wallet">
                <Wallet className="h-5 w-5" />
              </TabsTrigger>
              <TabsTrigger value="bank-transfer">
                <Landmark className="h-5 w-5" />
              </TabsTrigger>
              <TabsTrigger value="qris">
                <Smartphone className="h-5 w-5" />
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="credit-card">
              <CreditCardForm onSubmit={handleCardFormSubmit} />
            </TabsContent>
            
            <TabsContent value="e-wallet">
              <div className="glass card-shadow rounded-xl p-4 text-center py-8">
                <Wallet className="h-12 w-12 mx-auto mb-4 text-green-500" />
                <h3 className="text-lg font-medium mb-1">E-Wallet Payment</h3>
                <p className="text-muted-foreground">Select your preferred e-wallet provider</p>
                <div className="grid grid-cols-2 gap-3 mt-6">
                  {eWallets.map(wallet => (
                    <button 
                      key={wallet.id} 
                      className={`glass p-3 rounded-lg hover:bg-white/5 transition-all duration-200 flex items-center justify-center ${
                        selectedEWallet === wallet.id ? 'border-green-500 shadow-[0_0_0_1.5px_rgb(0,230,118)]' : 'border-white/10'
                      }`}
                      onClick={() => handleSelectEWallet(wallet.id)}
                    >
                      {selectedEWallet === wallet.id && (
                        <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                      )}
                      {wallet.name}
                    </button>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="bank-transfer">
              <div className="glass card-shadow rounded-xl p-4 text-center py-8">
                <Landmark className="h-12 w-12 mx-auto mb-4 text-green-500" />
                <h3 className="text-lg font-medium mb-1">Bank Transfer</h3>
                <p className="text-muted-foreground">Select your bank for payment instructions</p>
                <div className="grid grid-cols-2 gap-3 mt-6">
                  {banks.map(bank => (
                    <button 
                      key={bank.id} 
                      className={`glass p-3 rounded-lg hover:bg-white/5 transition-all duration-200 ${
                        selectedBank === bank.id ? 'border-green-500 shadow-[0_0_0_1.5px_rgb(0,230,118)]' : 'border-white/10'
                      }`}
                      onClick={() => handleSelectBank(bank.id)}
                    >
                      {selectedBank === bank.id && (
                        <CheckCircle className="h-4 w-4 mr-1 inline-block text-green-500" />
                      )}
                      {bank.name}
                    </button>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="qris">
              <div className="glass card-shadow rounded-xl p-4 text-center py-8">
                <Smartphone className="h-12 w-12 mx-auto mb-4 text-green-500" />
                <h3 className="text-lg font-medium mb-1">QRIS Payment</h3>
                <p className="text-muted-foreground">Scan the QR code with your banking app</p>
                <div className="mt-6 bg-white p-4 rounded-lg mx-auto w-48 h-48 flex items-center justify-center">
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    QR Code
                  </div>
                </div>
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
              accountNumber={generateVirtualAccount()}
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
