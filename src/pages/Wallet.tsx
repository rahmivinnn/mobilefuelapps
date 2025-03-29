
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Home, CreditCard, PlusCircle, MinusCircle, RefreshCcw, ArrowDownCircle, Clock, User, CheckCircle, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from "@/hooks/use-toast";

// Mock wallet data
const walletData = {
  balance: 1548.20,
  cardNumber: "5500 0000 0000 0004",
  expiryDate: "08/2025",
  transactions: [
    { id: 1, type: "Withdrawal", amount: 100, date: "Today, 10:30 AM", status: "Pending" },
    { id: 2, type: "Fuel delivered", amount: 150, date: "Yesterday, 3:45 PM", status: "Completed" },
    { id: 3, type: "Cash received", amount: 200, date: "June 10, 2:15 PM", status: "Completed" },
    { id: 4, type: "Bonus payment", amount: 50, date: "June 8, 11:00 AM", status: "Completed" },
    { id: 5, type: "Fuel delivered", amount: 120, date: "June 5, 9:30 AM", status: "Completed" }
  ]
};

const Wallet: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [balance, setBalance] = useState(walletData.balance);
  const [amount, setAmount] = useState("100.00");
  const [transactions, setTransactions] = useState(walletData.transactions);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState(['', '', '', '']);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [withdrawalAmount, setWithdrawalAmount] = useState(0);

  // Handle navigation back
  const handleBack = () => {
    navigate(-1);
  };

  // Handle amount buttons
  const handleAmountButton = (value: string) => {
    setAmount(value);
  };

  // Handle withdrawal request
  const handleWithdraw = () => {
    setWithdrawalAmount(parseFloat(amount));
    setShowPinModal(true);
  };

  // Handle PIN input
  const handlePinInput = (index: number, value: string) => {
    if (value.match(/^[0-9]$/) || value === '') {
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);
      
      // Auto focus next input
      if (value !== '' && index < 3) {
        const nextInput = document.getElementById(`pin-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
      
      // Check if PIN is complete
      if (index === 3 && value !== '') {
        // Simulate verification delay
        setTimeout(() => {
          setShowPinModal(false);
          setShowSuccessModal(true);
          
          // Update balance and add transaction
          const newBalance = balance - parseFloat(amount);
          setBalance(newBalance);
          
          const newTransaction = {
            id: Date.now(),
            type: "Withdrawal",
            amount: parseFloat(amount),
            date: "Today, " + new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
            status: "Pending"
          };
          
          setTransactions([newTransaction, ...transactions]);
          
          // Reset PIN
          setPin(['', '', '', '']);
        }, 1000);
      }
    }
  };

  // Handle PIN backspace
  const handlePinBackspace = (index: number) => {
    if (index > 0 && pin[index] === '') {
      const newPin = [...pin];
      newPin[index - 1] = '';
      setPin(newPin);
      const prevInput = document.getElementById(`pin-${index - 1}`);
      if (prevInput) prevInput.focus();
    } else if (pin[index] !== '') {
      const newPin = [...pin];
      newPin[index] = '';
      setPin(newPin);
    }
  };

  // Close success modal
  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    toast({
      title: "Withdrawal Successful",
      description: `$${amount} has been withdrawn from your wallet`,
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-black text-white max-w-md mx-auto pb-16">
      {/* Status bar (mock) */}
      <div className="flex justify-between items-center p-2 text-xs">
        <div>8:45</div>
        <div className="flex items-center space-x-1">
          <div className="h-3 w-3">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <div className="h-3 w-3">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 1h22v22H1z" />
            </svg>
          </div>
          <div>100%</div>
        </div>
      </div>
      
      {/* Header with back button */}
      <div className="p-4 flex items-center">
        <button 
          onClick={handleBack}
          className="h-8 w-8 rounded-full flex items-center justify-center border border-gray-700 mr-4"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-semibold">My Wallet</h1>
      </div>
      
      {/* Wallet Card */}
      <div className="px-4">
        <div className="bg-gradient-to-r from-gray-900 to-black rounded-xl p-5 shadow-lg border border-gray-800">
          <p className="text-gray-400 text-sm mb-1">Cash funds</p>
          <h2 className="text-3xl font-bold mb-6">${balance.toFixed(2)}</h2>
          
          <div className="flex items-center space-x-2 mb-3">
            <CreditCard className="h-5 w-5 text-green-500" />
            <span className="text-sm">{walletData.cardNumber}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-400">Exp: {walletData.expiryDate}</p>
            <p className="text-sm bg-green-500 text-black px-2 py-1 rounded-full">Active</p>
          </div>
        </div>
      </div>
      
      {/* Withdrawal Section */}
      <div className="mt-6 px-4">
        <h3 className="font-medium mb-3">Set Amount</h3>
        
        <div className="text-center mb-4">
          <div className="text-4xl font-bold mb-3">${amount}</div>
        </div>
        
        <div className="grid grid-cols-3 gap-3 mb-6">
          <button
            onClick={() => handleAmountButton("50.00")}
            className={`py-2 px-4 rounded-lg border ${amount === "50.00" ? 'bg-green-500 text-black border-green-500' : 'border-gray-700 text-white'}`}
          >
            $50
          </button>
          <button
            onClick={() => handleAmountButton("100.00")}
            className={`py-2 px-4 rounded-lg border ${amount === "100.00" ? 'bg-green-500 text-black border-green-500' : 'border-gray-700 text-white'}`}
          >
            $100
          </button>
          <button
            onClick={() => handleAmountButton("200.00")}
            className={`py-2 px-4 rounded-lg border ${amount === "200.00" ? 'bg-green-500 text-black border-green-500' : 'border-gray-700 text-white'}`}
          >
            $200
          </button>
        </div>
        
        <button
          onClick={handleWithdraw}
          className="w-full py-3 bg-green-500 text-black font-medium rounded-lg"
        >
          Withdraw
        </button>
      </div>
      
      {/* Transaction History */}
      <div className="mt-8 px-4">
        <h3 className="font-medium mb-4">Transaction History</h3>
        
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between border-b border-gray-800 pb-3"
            >
              <div className="flex items-center">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-3 ${
                  transaction.type === "Withdrawal" ? 'bg-red-500/10' : 'bg-green-500/10'
                }`}>
                  {transaction.type === "Withdrawal" ? (
                    <MinusCircle className="h-5 w-5 text-red-500" />
                  ) : transaction.type === "Fuel delivered" ? (
                    <PlusCircle className="h-5 w-5 text-green-500" />
                  ) : transaction.type === "Cash received" ? (
                    <ArrowDownCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <RefreshCcw className="h-5 w-5 text-blue-500" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{transaction.type}</p>
                  <p className="text-xs text-gray-400">{transaction.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-medium ${transaction.type === "Withdrawal" ? 'text-red-500' : 'text-green-500'}`}>
                  {transaction.type === "Withdrawal" ? "-" : "+"}${transaction.amount.toFixed(2)}
                </p>
                <p className={`text-xs ${
                  transaction.status === "Pending" ? 'text-amber-500' : 'text-green-500'
                }`}>
                  {transaction.status}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* PIN Verification Modal */}
      {showPinModal && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          <div className="bg-black mx-4 rounded-2xl max-w-md w-full p-6 border border-gray-800">
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-gray-900 flex items-center justify-center mb-4">
                <CreditCard className="h-8 w-8 text-green-500" />
              </div>
              
              <h2 className="text-xl font-bold mb-2">Verification</h2>
              <p className="text-gray-400 mb-6">Enter your 4-digit PIN to complete the withdrawal</p>
              
              <div className="flex gap-3 mb-8">
                {pin.map((digit, index) => (
                  <input
                    key={index}
                    id={`pin-${index}`}
                    type="password"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handlePinInput(index, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Backspace') {
                        handlePinBackspace(index);
                      }
                    }}
                    className="w-12 h-14 bg-gray-900 border border-gray-700 rounded-lg text-center text-xl focus:outline-none focus:border-green-500"
                  />
                ))}
              </div>
              
              <button 
                onClick={() => setShowPinModal(false)}
                className="w-full py-3 bg-gray-800 rounded-lg text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          <div className="bg-black mx-4 rounded-2xl max-w-md w-full p-6 border border-gray-800">
            <div className="flex justify-end">
              <button onClick={handleCloseSuccessModal} className="h-8 w-8 flex items-center justify-center">
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="h-20 w-20 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                <CheckCircle className="h-12 w-12 text-green-500" />
              </div>
              
              <h2 className="text-xl font-bold mb-3">Withdrawal Successful!</h2>
              <p className="text-gray-400 mb-6">Your withdrawal has been processed successfully</p>
              
              <div className="w-full bg-gray-900 rounded-lg p-4 mb-6">
                <p className="text-gray-400 text-sm">Amount</p>
                <p className="text-2xl font-bold">$ {withdrawalAmount.toFixed(2)}</p>
                <p className="text-green-500 text-sm">Sent to bank</p>
              </div>
              
              <button 
                onClick={handleCloseSuccessModal}
                className="w-full py-3 bg-green-500 rounded-lg text-black font-semibold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Custom bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 py-2">
        <div className="max-w-md mx-auto flex justify-around">
          <Link to="/fuel-friend-home" className="flex flex-col items-center">
            <div className="h-6 w-6 text-gray-400">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
            </div>
            <span className="text-xs text-gray-400">Home</span>
          </Link>
          
          <Link to="/all-orders" className="flex flex-col items-center">
            <div className="h-6 w-6 text-gray-400">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14h-2v-4H8v-2h2V9h2v2h2v2h-2v4zm3-8h-2V7h-2V5h2V3h2v2h2v2h-2z" />
              </svg>
            </div>
            <span className="text-xs text-gray-400">My Orders</span>
          </Link>
          
          <Link to="/wallet" className="flex flex-col items-center">
            <div className="h-6 w-6 text-green-500">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
              </svg>
            </div>
            <span className="text-xs text-green-500">Wallet</span>
          </Link>
          
          <Link to="/settings" className="flex flex-col items-center">
            <div className="h-6 w-6 text-gray-400">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
              </svg>
            </div>
            <span className="text-xs text-gray-400">Settings</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
