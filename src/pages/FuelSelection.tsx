import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import FuelSelector from '@/components/ui/FuelSelector';
import QuantityCounter from '@/components/ui/QuantityCounter';
import { 
  ShoppingBag, Plus, ChevronRight, 
  Droplets, Cookie, CupSoda, CircleOff
} from 'lucide-react';
import { motion } from 'framer-motion';

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

// Updated grocery items available at the station preview
const groceryItems = [
  {
    id: 'water',
    name: 'Bottled Water',
    price: 1.99,
    icon: <Droplets className="h-10 w-10 text-blue-400" />
  },
  {
    id: 'chips',
    name: 'Potato Chips',
    price: 2.49,
    icon: <CircleOff className="h-10 w-10 text-yellow-300" />
  },
  {
    id: 'chocolate',
    name: 'Chocolate Bar',
    price: 1.79,
    icon: <Cookie className="h-10 w-10 text-amber-500" />
  },
  {
    id: 'soda',
    name: 'Soda',
    price: 1.89,
    icon: <CupSoda className="h-10 w-10 text-red-400" />
  }
];

const FuelSelection: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [selectedFuel, setSelectedFuel] = useState(fuelTypes[0].id);
  const [quantity, setQuantity] = useState(5); // Default to 5 gallons
  const [groceryCart, setGroceryCart] = useState<{id: string, quantity: number}[]>([]);
  
  const selectedFuelType = fuelTypes.find(fuel => fuel.id === selectedFuel);
  const fuelCost = selectedFuelType ? selectedFuelType.price * quantity : 0;
  
  // Calculate total cost including groceries
  const groceryCost = groceryCart.reduce((total, item) => {
    const groceryItem = groceryItems.find(g => g.id === item.id);
    return total + (groceryItem ? groceryItem.price * item.quantity : 0);
  }, 0);
  
  const totalPrice = fuelCost + groceryCost;
  
  const addToCart = (itemId: string) => {
    setGroceryCart(prev => {
      const existingItem = prev.find(item => item.id === itemId);
      if (existingItem) {
        return prev.map(item => 
          item.id === itemId 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        return [...prev, { id: itemId, quantity: 1 }];
      }
    });
  };
  
  const viewGroceryDetails = () => {
    navigate(`/station/${id}/groceries`, { 
      state: { 
        fuelType: selectedFuelType,
        fuelQuantity: quantity,
        groceryCart
      } 
    });
  };
  
  const handleContinue = () => {
    navigate(`/station/${id}/payment`, { 
      state: { 
        fuelType: selectedFuelType,
        quantity,
        groceryCart,
        totalPrice
      } 
    });
  };
  
  return (
    <>
      <Header showBack title="Select Fuel & Groceries" />
      
      <main className="page-container pb-20">
        <div className="mb-6 animate-fade-in">
          <div className="mb-1 text-sm text-muted-foreground">Step 1 of 3</div>
          <h2 className="text-2xl font-bold">Choose Fuel Type</h2>
        </div>
        
        <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <FuelSelector
            fuelTypes={fuelTypes}
            selectedFuel={selectedFuel}
            onSelectFuel={setSelectedFuel}
          />
        </div>
        
        <div className="my-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
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
        
        <div className="my-6 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <div className="mb-1 text-sm text-muted-foreground">Step 3 of 3</div>
          <h2 className="text-2xl font-bold mb-4">Add Groceries</h2>
          
          <div className="grid grid-cols-2 gap-3">
            {groceryItems.slice(0, 4).map((item) => {
              const cartItem = groceryCart.find(ci => ci.id === item.id);
              return (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass relative rounded-xl p-3 flex flex-col"
                >
                  <div className="h-24 w-full mb-2 rounded-lg overflow-hidden bg-gray-800 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-lg font-bold mt-1">${item.price.toFixed(2)}</p>
                  
                  <button
                    onClick={() => addToCart(item.id)}
                    className="absolute bottom-3 right-3 h-8 w-8 rounded-full bg-green-500 flex items-center justify-center text-black"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                  
                  {cartItem && (
                    <div className="absolute top-2 right-2 h-6 w-6 rounded-full bg-green-500 flex items-center justify-center text-xs font-bold text-black">
                      {cartItem.quantity}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
          
          <button
            onClick={viewGroceryDetails}
            className="w-full mt-4 py-3 rounded-xl glass flex items-center justify-between px-4"
          >
            <div className="flex items-center">
              <ShoppingBag className="h-5 w-5 text-green-500 mr-2" />
              <span>View all grocery items</span>
            </div>
            <ChevronRight className="h-5 w-5 text-green-500" />
          </button>
        </div>
        
        {/* Order Summary */}
        <div className="glass rounded-xl p-4 mb-4">
          <h3 className="text-lg font-medium mb-2">Order Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Fuel ({quantity} gallons)</span>
              <span>${fuelCost.toFixed(2)}</span>
            </div>
            {groceryCart.length > 0 && (
              <div className="flex justify-between">
                <span>Groceries ({groceryCart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                <span>${groceryCost.toFixed(2)}</span>
              </div>
            )}
            <div className="border-t border-gray-700 pt-2 mt-2 flex justify-between font-bold">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <button 
            onClick={handleContinue}
            className="w-full py-4 rounded-xl bg-green-500 text-black font-semibold hover:bg-green-600 active:scale-[0.98] transition-all duration-200"
          >
            Continue to Payment
          </button>
        </div>
      </main>
    </>
  );
};

export default FuelSelection;
