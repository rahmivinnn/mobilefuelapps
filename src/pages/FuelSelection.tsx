
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import FuelSelector from '@/components/ui/FuelSelector';
import QuantityCounter from '@/components/ui/QuantityCounter';

// Updated mock data for US fuel types
const fuelTypes = [
  {
    id: 'regular',
    name: 'Regular Unleaded',
    price: 3.79,
    recommended: true,
  },
  {
    id: 'plus',
    name: 'Plus Unleaded',
    price: 3.99,
  },
  {
    id: 'premium',
    name: 'Premium Unleaded',
    price: 4.29,
  },
  {
    id: 'diesel',
    name: 'Diesel',
    price: 4.09,
  }
];

const FuelSelection: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [selectedFuel, setSelectedFuel] = useState(fuelTypes[0].id);
  const [quantity, setQuantity] = useState(5); // Default to 5 gallons
  
  const selectedFuelType = fuelTypes.find(fuel => fuel.id === selectedFuel);
  const totalPrice = selectedFuelType ? selectedFuelType.price * quantity : 0;
  
  const handleContinue = () => {
    navigate(`/station/${id}/payment`, { 
      state: { 
        fuelType: selectedFuelType,
        quantity,
        totalPrice
      } 
    });
  };
  
  return (
    <>
      <Header showBack title="Select Fuel" />
      
      <main className="page-container">
        <div className="mb-6">
          <div className="mb-1 text-sm text-muted-foreground">Step 1 of 3</div>
          <h2 className="text-2xl font-bold">Choose Fuel Type</h2>
        </div>
        
        <FuelSelector
          fuelTypes={fuelTypes}
          selectedFuel={selectedFuel}
          onSelectFuel={setSelectedFuel}
        />
        
        <div className="my-6">
          <div className="mb-1 text-sm text-muted-foreground">Step 2 of 3</div>
          <h2 className="text-2xl font-bold mb-4">Set Amount</h2>
          
          <QuantityCounter
            initialValue={5}
            min={1}
            max={50}
            step={1}
            onChange={setQuantity}
            pricePerUnit={selectedFuelType?.price || 0}
          />
        </div>
        
        <div className="mt-8">
          <button 
            onClick={handleContinue}
            className="w-full py-4 rounded-xl bg-green-500 text-black font-semibold hover:bg-green-600 active:scale-[0.99] transition-all duration-200"
          >
            Continue to Payment
          </button>
        </div>
      </main>
    </>
  );
};

export default FuelSelection;
