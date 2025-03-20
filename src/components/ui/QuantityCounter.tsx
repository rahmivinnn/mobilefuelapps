
import React, { useState, useEffect } from 'react';
import { Minus, Plus } from 'lucide-react';

interface QuantityCounterProps {
  initialValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
  pricePerUnit: number;
}

const QuantityCounter: React.FC<QuantityCounterProps> = ({
  initialValue = 1,
  min = 1,
  max = 100,
  step = 1,
  onChange,
  pricePerUnit
}) => {
  const [quantity, setQuantity] = useState(initialValue);
  const [isDecreaseDisabled, setIsDecreaseDisabled] = useState(false);
  const [isIncreaseDisabled, setIsIncreaseDisabled] = useState(false);

  useEffect(() => {
    setIsDecreaseDisabled(quantity <= min);
    setIsIncreaseDisabled(quantity >= max);
  }, [quantity, min, max]);

  const handleDecrease = () => {
    if (quantity > min) {
      const newValue = quantity - step;
      setQuantity(newValue);
      onChange(newValue);
    }
  };

  const handleIncrease = () => {
    if (quantity < max) {
      const newValue = quantity + step;
      setQuantity(newValue);
      onChange(newValue);
    }
  };

  const totalPrice = quantity * pricePerUnit;

  return (
    <div className="glass p-5 rounded-xl">
      <div className="flex justify-between items-center mb-8">
        <span className="text-sm text-muted-foreground">Amount (liters)</span>
        <div className="text-sm text-muted-foreground font-mono">
          {quantity} × {pricePerUnit.toLocaleString('id-ID', { 
            style: 'currency', 
            currency: 'IDR',
            minimumFractionDigits: 0 
          })}
        </div>
      </div>
      
      <div className="flex items-center">
        <button
          onClick={handleDecrease}
          disabled={isDecreaseDisabled}
          className={`h-12 w-12 rounded-full flex items-center justify-center transition-colors ${
            isDecreaseDisabled 
              ? 'bg-muted text-muted-foreground' 
              : 'bg-muted hover:bg-muted/80 text-foreground'
          }`}
        >
          <Minus className="h-5 w-5" />
        </button>
        
        <div className="flex-1 mx-4">
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 transition-all duration-300"
              style={{ width: `${(quantity / max) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <button
          onClick={handleIncrease}
          disabled={isIncreaseDisabled}
          className={`h-12 w-12 rounded-full flex items-center justify-center transition-colors ${
            isIncreaseDisabled 
              ? 'bg-muted text-muted-foreground' 
              : 'bg-muted hover:bg-muted/80 text-foreground'
          }`}
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>
      
      <div className="mt-8 text-center">
        <div className="text-sm text-muted-foreground">Total</div>
        <div className="text-2xl font-bold mt-1">
          {totalPrice.toLocaleString('id-ID', { 
            style: 'currency', 
            currency: 'IDR',
            minimumFractionDigits: 0
          })}
        </div>
      </div>
    </div>
  );
};

export default QuantityCounter;
