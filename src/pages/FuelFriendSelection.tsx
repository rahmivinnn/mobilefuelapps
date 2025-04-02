
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, MapPin, Star, X, Filter, Clock, RadioTower } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import FuelFriendCard, { FuelFriendProps } from '@/components/ui/FuelFriendCard';
import NotificationPopup from '@/components/ui/NotificationPopup';

// Sample Fuel Friends data
const fuelFriends: FuelFriendProps[] = [
  {
    id: '1',
    name: 'Christopher Dastin',
    image: '/lovable-uploads/a3df03b1-a154-407f-b8fe-e5dd6f0bade3.png',
    rating: 4.8,
    completedOrders: 243,
    distance: '0.8 miles',
    available: true,
    location: 'Memphis, TN',
    phone: '+1 (901) 555-3478',
    timeToArrive: '10-15 min'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    image: '/lovable-uploads/c3b29f6b-a689-4ac3-a338-4194cbee5e0c.png',
    rating: 4.7,
    completedOrders: 189,
    distance: '1.3 miles',
    available: true,
    location: 'Memphis, TN',
    phone: '+1 (901) 555-9872',
    timeToArrive: '15-20 min'
  },
  {
    id: '3',
    name: 'Michael Davis',
    image: '/lovable-uploads/8a188651-80ec-4a90-8d5c-de0df713b6c7.png',
    rating: 4.9,
    completedOrders: 312,
    distance: '2.1 miles',
    available: true,
    location: 'Memphis, TN',
    phone: '+1 (901) 555-2341',
    timeToArrive: '20-25 min'
  },
  {
    id: '4',
    name: 'Emily Wilson',
    image: '/lovable-uploads/1bc06a60-0463-4f47-abde-502bc408852e.png',
    rating: 4.6,
    completedOrders: 156,
    distance: '1.5 miles',
    available: true,
    location: 'Memphis, TN',
    phone: '+1 (901) 555-7653',
    timeToArrive: '12-18 min'
  }
];

const FuelFriendSelection: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const [selectedFriendId, setSelectedFriendId] = useState<string | null>(null);
  const [filteredFriends, setFilteredFriends] = useState<FuelFriendProps[]>(fuelFriends);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [sortOption, setSortOption] = useState<'distance' | 'rating' | 'orders'>('distance');
  const [showNotification, setShowNotification] = useState(false);
  const [isSearching, setIsSearching] = useState(true);
  const [foundFriends, setFoundFriends] = useState(false);
  
  // Get order details from location state or use default
  const orderDetails = location.state?.orderDetails || {
    stationName: 'Shell Gas Station',
    fuelType: 'Regular Unleaded',
    quantity: '5 gallons',
    totalPrice: 18.75,
    hasGroceries: true,
    groceryItems: [
      { name: 'Water Bottle', quantity: 2, price: 3.00 },
      { name: 'Protein Bar', quantity: 1, price: 2.50 }
    ]
  };
  
  useEffect(() => {
    // Simulate searching for nearby Fuel Friends
    setIsSearching(true);
    
    const searchTimer = setTimeout(() => {
      setIsSearching(false);
      setFoundFriends(true);
      
      toast({
        title: "Fuel Friends Found",
        description: `Found ${fuelFriends.length} available Fuel Friends in your area`,
        duration: 3000
      });
    }, 2000);
    
    return () => clearTimeout(searchTimer);
  }, [toast]);
  
  useEffect(() => {
    if (searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase();
      const filtered = fuelFriends.filter(friend => 
        friend.name.toLowerCase().includes(lowercaseQuery) ||
        friend.location.toLowerCase().includes(lowercaseQuery)
      );
      setFilteredFriends(filtered);
    } else {
      setFilteredFriends(fuelFriends);
    }
  }, [searchQuery]);
  
  const sortFriends = (friends: FuelFriendProps[], option: typeof sortOption) => {
    switch (option) {
      case 'distance':
        // Sort by closest first (this is just a simulation, would need actual distance calculation)
        return [...friends].sort((a, b) => 
          parseFloat(a.distance.split(' ')[0]) - parseFloat(b.distance.split(' ')[0])
        );
      case 'rating':
        // Sort by highest rating first
        return [...friends].sort((a, b) => b.rating - a.rating);
      case 'orders':
        // Sort by most completed orders first
        return [...friends].sort((a, b) => b.completedOrders - a.completedOrders);
      default:
        return friends;
    }
  };
  
  useEffect(() => {
    const sorted = sortFriends(filteredFriends, sortOption);
    setFilteredFriends(sorted);
  }, [sortOption]);
  
  const handleSelectFriend = (id: string) => {
    setSelectedFriendId(id);
    
    // Find the selected friend
    const selectedFriend = fuelFriends.find(friend => friend.id === id);
    
    if (selectedFriend) {
      // Show a notification that the request was sent
      toast({
        title: "Request Sent",
        description: `Your request has been sent to ${selectedFriend.name}`,
        duration: 3000,
        className: "bg-blue-500 border-blue-600 text-white"
      });
      
      // Simulate the friend accepting the request after a short delay
      setTimeout(() => {
        setShowNotification(true);
      }, 3000);
    }
  };
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  const handleRequestAccepted = () => {
    setShowNotification(false);
    
    // Get the selected friend's data
    const selectedFriend = fuelFriends.find(friend => friend.id === selectedFriendId);
    
    if (selectedFriend) {
      // Navigate to the tracking page with order and friend info
      navigate('/track', { 
        state: { 
          orderId: `ORD-${Math.floor(Math.random() * 10000)}`,
          friend: selectedFriend,
          orderDetails: orderDetails
        }
      });
    }
  };
  
  const handleApplySorting = () => {
    setShowFilterOptions(false);
  };
  
  const handleMessageFriend = (id: string) => {
    const friend = fuelFriends.find(f => f.id === id);
    if (friend) {
      navigate(`/chat?fuelFriendName=${encodeURIComponent(friend.name)}`);
    }
  };
  
  const handleCallFriend = (id: string) => {
    const friend = fuelFriends.find(f => f.id === id);
    if (friend) {
      navigate(`/call?fuelFriendName=${encodeURIComponent(friend.name)}`);
    }
  };
  
  const selectedFriend = fuelFriends.find(friend => friend.id === selectedFriendId);
  
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="px-4 py-3 flex items-center justify-between">
        <button onClick={handleGoBack} className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-800">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-semibold">Select Fuel Friend</h1>
        <div className="h-10 w-10"></div> {/* Empty div for spacing */}
      </div>
      
      {/* Order Summary */}
      <div className="px-4 py-3 bg-gray-800/50 mx-4 rounded-xl mb-4">
        <h2 className="font-medium mb-2">Order Summary</h2>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-gray-400">Gas Station</p>
            <p>{orderDetails.stationName}</p>
          </div>
          <div>
            <p className="text-gray-400">Fuel Type</p>
            <p>{orderDetails.fuelType}</p>
          </div>
          <div>
            <p className="text-gray-400">Quantity</p>
            <p>{orderDetails.quantity}</p>
          </div>
          <div>
            <p className="text-gray-400">Total Price</p>
            <p>${orderDetails.totalPrice.toFixed(2)}</p>
          </div>
          {orderDetails.hasGroceries && (
            <div className="col-span-2">
              <p className="text-gray-400">Groceries</p>
              <p>{orderDetails.groceryItems.length} items</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Search Bar */}
      <div className="px-4 mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by name or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-800 rounded-xl px-4 py-3 pr-12 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-green-500"
          />
          {searchQuery ? (
            <button 
              className="absolute right-4 top-1/2 transform -translate-y-1/2"
              onClick={() => setSearchQuery('')}
            >
              <X className="h-5 w-5 text-gray-400" />
            </button>
          ) : (
            <button 
              className="absolute right-4 top-1/2 transform -translate-y-1/2"
              onClick={() => setShowFilterOptions(!showFilterOptions)}
            >
              <Filter className="h-5 w-5 text-gray-400" />
            </button>
          )}
        </div>
      </div>
      
      {/* Filter Options */}
      <AnimatePresence>
        {showFilterOptions && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden px-4 mb-4"
          >
            <div className="bg-gray-800 rounded-xl p-4">
              <h3 className="font-medium mb-3">Sort by</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="sort-distance"
                    name="sort"
                    checked={sortOption === 'distance'}
                    onChange={() => setSortOption('distance')}
                    className="h-4 w-4 text-green-500"
                  />
                  <label htmlFor="sort-distance" className="ml-2">Distance (closest first)</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="sort-rating"
                    name="sort"
                    checked={sortOption === 'rating'}
                    onChange={() => setSortOption('rating')}
                    className="h-4 w-4 text-green-500"
                  />
                  <label htmlFor="sort-rating" className="ml-2">Rating (highest first)</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="sort-orders"
                    name="sort"
                    checked={sortOption === 'orders'}
                    onChange={() => setSortOption('orders')}
                    className="h-4 w-4 text-green-500"
                  />
                  <label htmlFor="sort-orders" className="ml-2">Experience (most orders first)</label>
                </div>
              </div>
              <div className="mt-4">
                <Button onClick={handleApplySorting} className="w-full bg-green-500 hover:bg-green-600 text-black">
                  Apply
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Loading State */}
      {isSearching && (
        <div className="px-4 py-8 flex flex-col items-center justify-center">
          <div className="relative">
            <div className="h-16 w-16 rounded-full bg-gray-800 flex items-center justify-center">
              <RadioTower className="h-8 w-8 text-green-500 animate-pulse" />
            </div>
            <div className="absolute inset-0 rounded-full border-4 border-t-green-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
          </div>
          <p className="mt-4 text-center">Searching for nearby Fuel Friends...</p>
        </div>
      )}
      
      {/* Fuel Friends List */}
      {!isSearching && (
        <div className="px-4 pb-24">
          {filteredFriends.length === 0 ? (
            <div className="text-center py-8">
              <div className="bg-gray-800 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-gray-500" />
              </div>
              <h3 className="font-medium text-lg mb-2">No Fuel Friends Found</h3>
              <p className="text-gray-400">
                {searchQuery ? 'Try a different search term' : 'No available Fuel Friends in your area right now'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFriends.map(friend => (
                <FuelFriendCard
                  key={friend.id}
                  fuelFriend={friend}
                  selected={selectedFriendId === friend.id}
                  onSelect={handleSelectFriend}
                  onMessage={handleMessageFriend}
                  onCall={handleCallFriend}
                />
              ))}
            </div>
          )}
        </div>
      )}
      
      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-black pt-2 pb-8 border-t border-gray-800">
        <div className="px-4">
          <Button 
            onClick={() => {
              if (selectedFriendId) {
                handleSelectFriend(selectedFriendId);
              } else {
                toast({
                  title: "Selection Required",
                  description: "Please select a Fuel Friend to continue",
                  variant: "destructive"
                });
              }
            }}
            disabled={!selectedFriendId || !foundFriends}
            className="w-full bg-green-500 hover:bg-green-600 text-black py-6 rounded-xl font-medium"
          >
            {selectedFriendId ? 'Confirm Selection' : 'Select a Fuel Friend'}
          </Button>
        </div>
      </div>
      
      {/* Friend Accepted Notification */}
      {showNotification && selectedFriend && (
        <NotificationPopup
          type="success"
          title="Request Accepted!"
          message={`${selectedFriend.name} has accepted your request and is on the way!`}
          isOpen={showNotification}
          onClose={() => setShowNotification(false)}
          onAction={handleRequestAccepted}
          actionText="Track Order"
          autoClose={false}
          image={selectedFriend.image}
        />
      )}
    </div>
  );
};

export default FuelFriendSelection;
