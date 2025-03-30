import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Header from '@/components/layout/Header';
import { 
  Search, Plus, Minus, ShoppingBag, Coffee, CupSoda, 
  Droplets, Zap, Circle, Square, CircleOff, CircleDot, 
  CircleSlash, Layers, Flower, Cloud, Cookie, Cake, Candy, 
  Apple, Banana, Beef as BeefIcon, Cherry, Grape, Pizza, 
  Sandwich, IceCream, Milk
} from 'lucide-react';
import { motion } from 'framer-motion';

// Comprehensive grocery items list with specific food icons
const allGroceryItems = [
  {
    id: 'water',
    name: 'Bottled Water',
    price: 1.99,
    icon: <Droplets className="h-5 w-5 text-blue-400" />,
    category: 'drinks'
  },
  {
    id: 'soda',
    name: 'Soda',
    price: 1.89,
    icon: <CupSoda className="h-5 w-5 text-red-400" />,
    category: 'drinks'
  },
  {
    id: 'energy',
    name: 'Energy Drink',
    price: 3.49,
    icon: <Zap className="h-5 w-5 text-yellow-400" />,
    category: 'drinks'
  },
  {
    id: 'coffee',
    name: 'Coffee',
    price: 2.99,
    icon: <Coffee className="h-5 w-5 text-brown-400" />,
    category: 'drinks'
  },
  {
    id: 'juice',
    name: 'Fresh Juice',
    price: 3.29,
    icon: <Apple className="h-5 w-5 text-orange-400" />,
    category: 'drinks'
  },
  {
    id: 'chips',
    name: 'Potato Chips',
    price: 2.49,
    icon: <CircleOff className="h-5 w-5 text-yellow-300" />,
    category: 'snacks'
  },
  {
    id: 'popcorn',
    name: 'Popcorn',
    price: 2.29,
    icon: <Circle className="h-5 w-5 text-yellow-200" />,
    category: 'snacks'
  },
  {
    id: 'nuts',
    name: 'Mixed Nuts',
    price: 3.49,
    icon: <CircleDot className="h-5 w-5 text-brown-300" />,
    category: 'snacks'
  },
  {
    id: 'jerky',
    name: 'Beef Jerky',
    price: 5.99,
    icon: <BeefIcon className="h-5 w-5 text-red-600" />,
    category: 'snacks'
  },
  {
    id: 'chocolate',
    name: 'Chocolate Bar',
    price: 1.79,
    icon: <Square className="h-5 w-5 text-brown-500" />,
    category: 'snacks'
  },
  {
    id: 'candy',
    name: 'Candy Pack',
    price: 1.29,
    icon: <Candy className="h-5 w-5 text-pink-400" />,
    category: 'snacks'
  },
  {
    id: 'gum',
    name: 'Chewing Gum',
    price: 1.29,
    icon: <CircleSlash className="h-5 w-5 text-blue-300" />,
    category: 'snacks'
  },
  {
    id: 'sandwich',
    name: 'Fresh Sandwich',
    price: 4.99,
    icon: <Sandwich className="h-5 w-5 text-yellow-600" />,
    category: 'food'
  },
  {
    id: 'hotdog',
    name: 'Hot Dog',
    price: 3.49,
    icon: <Sandwich className="h-5 w-5 text-red-300" />,
    category: 'food'
  },
  {
    id: 'burrito',
    name: 'Breakfast Burrito',
    price: 4.49,
    icon: <Sandwich className="h-5 w-5 text-yellow-500" />,
    category: 'food'
  },
  {
    id: 'salad',
    name: 'Fresh Salad',
    price: 5.49,
    icon: <Flower className="h-5 w-5 text-green-400" />,
    category: 'food'
  },
  {
    id: 'icecream',
    name: 'Ice Cream',
    price: 3.79,
    icon: <IceCream className="h-5 w-5 text-blue-200" />,
    category: 'desserts'
  },
  {
    id: 'cookies',
    name: 'Cookies',
    price: 2.49,
    icon: <Cookie className="h-5 w-5 text-amber-500" />,
    category: 'desserts'
  },
  {
    id: 'donuts',
    name: 'Donuts',
    price: 1.99,
    icon: <Circle className="h-5 w-5 text-pink-300" />,
    category: 'desserts'
  },
  {
    id: 'muffin',
    name: 'Blueberry Muffin',
    price: 2.29,
    icon: <Cake className="h-5 w-5 text-purple-400" />,
    category: 'desserts'
  }
];

const categories = [
  { id: 'all', name: 'All Items' },
  { id: 'drinks', name: 'Drinks' },
  { id: 'snacks', name: 'Snacks' },
  { id: 'food', name: 'Food' },
  { id: 'desserts', name: 'Desserts' }
];

const GroceryList: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get existing cart from location state or initialize empty
  const initialCart = location.state?.groceryCart || [];
  const fuelType = location.state?.fuelType || {};
  const fuelQuantity = location.state?.fuelQuantity || 0;
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [groceryCart, setGroceryCart] = useState<{id: string, quantity: number}[]>(initialCart);
  
  // Filter items based on search and category
  const filteredItems = allGroceryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });
  
  const getItemQuantity = (itemId: string) => {
    const item = groceryCart.find(i => i.id === itemId);
    return item ? item.quantity : 0;
  };
  
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
  
  const removeFromCart = (itemId: string) => {
    setGroceryCart(prev => {
      const existingItem = prev.find(item => item.id === itemId);
      if (existingItem && existingItem.quantity > 1) {
        return prev.map(item => 
          item.id === itemId 
            ? { ...item, quantity: item.quantity - 1 } 
            : item
        );
      } else {
        return prev.filter(item => item.id !== itemId);
      }
    });
  };
  
  // Calculate totals
  const itemCount = groceryCart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCost = groceryCart.reduce((total, item) => {
    const groceryItem = allGroceryItems.find(g => g.id === item.id);
    return total + (groceryItem ? groceryItem.price * item.quantity : 0);
  }, 0);
  
  const handleContinue = () => {
    navigate(`/station/${id}/fuel`, { 
      state: { 
        fuelType,
        fuelQuantity,
        groceryCart
      } 
    });
  };
  
  return (
    <>
      <Header showBack title="Grocery Items" />
      
      <main className="page-container pb-20">
        {/* Search bar */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-800 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
        
        {/* Category tabs */}
        <div className="flex space-x-2 overflow-x-auto py-2 mb-4 scrollbar-hide">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm ${
                activeCategory === category.id 
                  ? 'bg-green-500 text-black font-medium' 
                  : 'bg-gray-800 text-white'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        {/* Item grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {filteredItems.map((item) => {
            const quantity = getItemQuantity(item.id);
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
                
                {quantity === 0 ? (
                  <button
                    onClick={() => addToCart(item.id)}
                    className="absolute bottom-3 right-3 h-8 w-8 rounded-full bg-green-500 flex items-center justify-center text-black"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                ) : (
                  <div className="absolute bottom-3 right-3 flex items-center">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="mx-2 font-bold">{quantity}</span>
                    <button
                      onClick={() => addToCart(item.id)}
                      className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center text-black"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </main>
      
      {/* Fixed bottom cart summary and checkout button */}
      <div className="fixed bottom-0 left-0 right-0 bg-black p-4 border-t border-gray-800">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <ShoppingBag className="h-5 w-5 text-green-500 mr-2" />
            <span>{itemCount} items</span>
          </div>
          <span className="font-bold text-lg">${totalCost.toFixed(2)}</span>
        </div>
        
        <button 
          onClick={handleContinue}
          className="w-full py-4 rounded-xl bg-green-500 text-black font-semibold hover:bg-green-600 active:scale-[0.98] transition-all duration-200"
        >
          Done
        </button>
      </div>
    </>
  );
};

export default GroceryList;
