
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Download, Share2 } from 'lucide-react';
import Header from '@/components/layout/Header';

const Confirmation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { fuelType, quantity, totalPrice, paymentMethod } = location.state || {
    fuelType: { id: 'pertamax', name: 'Pertamax', price: 13000 },
    quantity: 10,
    totalPrice: 130000,
    paymentMethod: { id: 'e-wallet', name: 'E-Wallet' }
  };
  
  // Generate a random transaction ID
  const transactionId = 'TRX' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  
  // Get current date and time for the transaction
  const transactionDate = new Date().toLocaleString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  const handleBackToHome = () => {
    navigate('/');
  };
  
  // Confetti effect on successful payment
  useEffect(() => {
    // In a real app, we would implement a confetti effect here
    console.log('Payment successful! Showing confetti animation.');
  }, []);
  
  return (
    <>
      <Header showBack={false} title="Payment Successful" />
      
      <main className="page-container">
        <div className="flex flex-col items-center justify-center my-8">
          <div className="h-20 w-20 rounded-full bg-green-500/20 flex items-center justify-center mb-4 animate-scale-in">
            <CheckCircle className="h-10 w-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-center">Payment Successful!</h2>
          <p className="text-muted-foreground text-center mt-2">
            Your transaction has been completed
          </p>
        </div>
        
        <div className="glass card-shadow rounded-xl p-5 mb-6">
          <h3 className="text-lg font-medium mb-4">Receipt Details</h3>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Transaction ID</p>
              <p className="font-medium">{transactionId}</p>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">Date & Time</p>
              <p className="font-medium">{transactionDate}</p>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">Fuel Type</p>
              <p className="font-medium">{fuelType.name}</p>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">Quantity</p>
              <p className="font-medium">{quantity} liters</p>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">Payment Method</p>
              <p className="font-medium">{paymentMethod.name}</p>
            </div>
            
            <div className="border-t border-border pt-4">
              <p className="text-sm text-muted-foreground">Total Amount</p>
              <p className="text-xl font-bold">
                {totalPrice.toLocaleString('id-ID', { 
                  style: 'currency', 
                  currency: 'IDR',
                  minimumFractionDigits: 0 
                })}
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button className="glass card-shadow rounded-xl p-4 flex flex-col items-center justify-center">
            <Download className="h-5 w-5 mb-2 text-green-500" />
            <span>Download</span>
          </button>
          <button className="glass card-shadow rounded-xl p-4 flex flex-col items-center justify-center">
            <Share2 className="h-5 w-5 mb-2 text-green-500" />
            <span>Share</span>
          </button>
        </div>
        
        <div className="glass card-shadow rounded-xl p-4 mb-6">
          <p className="text-center text-sm text-muted-foreground">
            Please proceed to the selected gas station and show this receipt to the attendant to get your fuel.
          </p>
        </div>
        
        <button 
          onClick={handleBackToHome}
          className="w-full py-4 rounded-xl bg-green-500 text-black font-semibold hover:bg-green-600 active:scale-[0.99] transition-all duration-200"
        >
          Back to Home
        </button>
      </main>
    </>
  );
};

export default Confirmation;
