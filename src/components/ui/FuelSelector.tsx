
import React from 'react';
import { CheckCircle } from 'lucide-react';

export interface FuelTypeProps {
  id: string;
  name: string;
  price: number;
  recommended?: boolean;
}

interface FuelSelectorProps {
  fuelTypes: FuelTypeProps[];
  selectedFuel: string;
  onSelectFuel: (id: string) => void;
}

const FuelSelector: React.FC<FuelSelectorProps> = ({
  fuelTypes,
  selectedFuel,
  onSelectFuel
}) => {
  return (
    <div className="grid gap-3">
      {fuelTypes.map((fuel) => (
        <div 
          key={fuel.id}
          onClick={() => onSelectFuel(fuel.id)}
          className={`relative p-4 rounded-xl glass flex items-center justify-between transition-all duration-200 cursor-pointer ${
            selectedFuel === fuel.id 
              ? 'border-green-500 shadow-[0_0_0_1.5px_rgb(0,230,118)]' 
              : 'border-white/10 hover:border-white/20'
          }`}
        >
          <div>
            <div className="flex items-center">
              <h3 className="font-medium">{fuel.name}</h3>
              {fuel.recommended && (
                <span className="ml-2 text-xs bg-green-500 text-black font-medium px-2 py-0.5 rounded-full">
                  Recommended
                </span>
              )}
            </div>
            <p className="text-2xl font-bold mt-1">
              {fuel.price.toLocaleString('id-ID', { 
                style: 'currency', 
                currency: 'IDR',
                minimumFractionDigits: 0 
              })}
              <span className="text-sm font-normal text-muted-foreground">/liter</span>
            </p>
          </div>
          
          {selectedFuel === fuel.id && (
            <div className="h-6 w-6 text-green-500 animate-scale-in">
              <CheckCircle className="h-6 w-6 fill-green-500 text-background" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FuelSelector;
