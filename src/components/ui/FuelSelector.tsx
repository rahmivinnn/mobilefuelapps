
import React from 'react';
import { CheckCircle, Droplets } from 'lucide-react';

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
      {fuelTypes.map((fuel, index) => (
        <div 
          key={fuel.id}
          onClick={() => onSelectFuel(fuel.id)}
          className={`relative p-4 rounded-xl glass flex items-center justify-between transition-all duration-300 cursor-pointer transform hover:scale-[1.01] active:scale-[0.99] ${
            selectedFuel === fuel.id 
              ? 'border-green-500 shadow-[0_0_0_1.5px_rgb(0,230,118)]' 
              : 'border-white/10 hover:border-white/20 dark:border-white/5 dark:hover:border-white/10 light:border-green-200 light:hover:border-green-300'
          }`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex items-center space-x-3">
            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
              selectedFuel === fuel.id 
                ? 'bg-green-500 text-black' 
                : 'bg-gray-800/50 dark:bg-gray-800/50 light:bg-green-100'
            } transition-colors duration-300`}>
              <Droplets className={`h-5 w-5 ${
                selectedFuel === fuel.id 
                  ? 'text-black animate-pulse' 
                  : 'text-green-500'
              }`} />
            </div>
            <div>
              <div className="flex items-center">
                <h3 className="font-medium dark:text-white light:text-green-800">{fuel.name}</h3>
                {fuel.recommended && (
                  <span className="ml-2 text-xs bg-green-500 text-black font-medium px-2 py-0.5 rounded-full animate-pulse-slow">
                    Recommended
                  </span>
                )}
              </div>
              <p className="text-2xl font-bold mt-1 dark:text-white light:text-green-800">
                ${fuel.price.toFixed(2)}
                <span className="text-sm font-normal text-muted-foreground">/gallon</span>
              </p>
            </div>
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
