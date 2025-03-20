
import React from 'react';
import { Copy, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface VirtualAccountProps {
  bankName: string;
  accountNumber: string;
  amount: number;
  expiryTime: string;
}

const VirtualAccount: React.FC<VirtualAccountProps> = ({
  bankName,
  accountNumber,
  amount,
  expiryTime
}) => {
  const [copied, setCopied] = React.useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(accountNumber);
    setCopied(true);
    toast({
      title: "Account number copied",
      description: "The virtual account number has been copied to clipboard",
    });
    
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };
  
  return (
    <div className="glass card-shadow rounded-xl p-5">
      <h3 className="text-lg font-medium mb-4">{bankName} Virtual Account</h3>
      
      <div className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Virtual Account Number</p>
          <div className="flex items-center justify-between bg-muted/30 p-3 rounded-lg">
            <span className="font-mono text-lg">{accountNumber}</span>
            <button 
              onClick={handleCopy}
              className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-white/10"
            >
              {copied ? 
                <CheckCircle className="h-5 w-5 text-green-500" /> : 
                <Copy className="h-5 w-5" />
              }
            </button>
          </div>
        </div>
        
        <div>
          <p className="text-sm text-muted-foreground mb-1">Total Amount</p>
          <p className="font-medium text-lg">
            {amount.toLocaleString('id-ID', { 
              style: 'currency', 
              currency: 'IDR',
              minimumFractionDigits: 0 
            })}
          </p>
        </div>
        
        <div className="border-t border-border pt-4">
          <p className="text-sm text-muted-foreground">Payment Instructions:</p>
          <ol className="list-decimal ml-5 mt-2 text-sm space-y-1">
            <li>Log in to your {bankName} mobile banking app</li>
            <li>Select "Transfer" or "Payment"</li>
            <li>Choose "Virtual Account" option</li>
            <li>Enter the virtual account number above</li>
            <li>Confirm the payment details</li>
            <li>Complete the payment</li>
          </ol>
        </div>
        
        <div className="bg-yellow-500/20 p-3 rounded-lg text-sm">
          <p className="text-yellow-500 font-medium">Please complete payment before:</p>
          <p>{expiryTime}</p>
        </div>
      </div>
    </div>
  );
};

export default VirtualAccount;
