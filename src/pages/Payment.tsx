
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Wallet, CreditCard, Landmark, Smartphone } from 'lucide-react';
import Header from '@/components/layout/Header';
import PaymentMethod from '@/components/ui/PaymentMethod';

// Mock data for payment methods
const paymentMethods = [
  {
    id: 'e-wallet',
    name: 'E-Wallet',
    description: 'GoPay, OVO, DANA, LinkAja',
    icon: <Wallet className="h-5 w-5 text-green-500" />
  },
  {
    id: 'credit-card',
    name: 'Credit/Debit Card',
    description: 'Visa, Mastercard, JCB',
    icon: <CreditCard className="h-5 w-5 text-green-500" />
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

const Payment: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState(paymentMethods[0].id);
  
  // Get data passed from fuel selection
  const { fuelType, quantity, totalPrice } = location.state || {
    fuelType: { id: 'pertamax', name: 'Pertamax', price: 13000 },
    quantity: 10,
    totalPrice: 130000
  };
  
  const handlePay = () => {
    navigate('/confirmation', {
      state: {
        fuelType,
        quantity,
        totalPrice,
        paymentMethod: paymentMethods.find(method => method.id === selectedMethod)
      }
    });
  };
  
  return (
    <>
      <Header showBack title="Payment" />
      
      <main className="page-container">
        <div className="mb-6">
          <div className="mb-1 text-sm text-muted-foreground">Step 3 of 3</div>
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
        
        <PaymentMethod
          methods={paymentMethods}
          selectedMethod={selectedMethod}
          onSelectMethod={setSelectedMethod}
        />
        
        <div className="mt-8">
          <button 
            onClick={handlePay}
            className="w-full py-4 rounded-xl bg-green-500 text-black font-semibold hover:bg-green-600 active:scale-[0.99] transition-all duration-200"
          >
            Pay Now
          </button>
        </div>
      </main>
    </>
  );
};

export default Payment;
