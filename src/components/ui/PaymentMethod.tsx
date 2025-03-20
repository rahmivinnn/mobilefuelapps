
import React from 'react';
import { CheckCircle } from 'lucide-react';

export interface PaymentMethodProps {
  id: string;
  name: string;
  description?: string;
  icon: React.ReactNode;
}

interface PaymentSelectorProps {
  methods: PaymentMethodProps[];
  selectedMethod: string;
  onSelectMethod: (id: string) => void;
}

const PaymentMethod: React.FC<PaymentSelectorProps> = ({
  methods,
  selectedMethod,
  onSelectMethod
}) => {
  return (
    <div className="grid gap-3">
      {methods.map((method) => (
        <div 
          key={method.id}
          onClick={() => onSelectMethod(method.id)}
          className={`relative p-4 rounded-xl glass flex items-center justify-between transition-all duration-200 cursor-pointer ${
            selectedMethod === method.id 
              ? 'border-green-500 shadow-[0_0_0_1.5px_rgb(0,230,118)]' 
              : 'border-white/10 hover:border-white/20'
          }`}
        >
          <div className="flex items-center">
            <div className="h-10 w-10 flex items-center justify-center bg-muted rounded-full mr-3">
              {method.icon}
            </div>
            <div>
              <h3 className="font-medium">{method.name}</h3>
              {method.description && (
                <p className="text-sm text-muted-foreground">{method.description}</p>
              )}
            </div>
          </div>
          
          {selectedMethod === method.id && (
            <div className="h-6 w-6 text-green-500 animate-scale-in">
              <CheckCircle className="h-6 w-6 fill-green-500 text-background" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PaymentMethod;
