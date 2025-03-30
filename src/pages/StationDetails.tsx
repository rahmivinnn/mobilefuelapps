
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, MapPin, Clock, Navigation, Share2, Facebook, Twitter, Instagram, Mail, Fuel, ShoppingBag } from 'lucide-react';
import Header from '@/components/layout/Header';
import BottomNav from '@/components/layout/BottomNav';
import Map from '@/components/ui/Map';
import { toast } from '@/components/ui/use-toast';

// Mock data for the station with updated image URL
const stationData = {
  id: '1',
  name: 'Shell Gas Station',
  address: '2255 Union Ave, Memphis, TN',
  distance: '0.8 mi',
  rating: 4.8,
  reviews: 234,
  isOpen: true,
  hours: '24 Hours',
  imageUrl: '/lovable-uploads/8ed0bc34-d448-42c8-804a-8dda4e3e6840.png',
  description: 'One of the premier Shell gas stations in Memphis, offering a wide variety of fuel types and additional services including a convenience store with fresh groceries and snacks.',
  latitude: 35.1477,
  longitude: -90.0518
};

// Services offered at the station
const stationServices = [
  { id: 'fuel', name: 'Fuel Services', description: 'Choose from various fuel types with available Fuel Friends to pump for you' },
  { id: 'store', name: 'Convenience Store', description: 'Shop from a variety of snacks, drinks, and essential grocery items' },
  { id: 'car-wash', name: 'Car Wash', description: 'Professional car washing services available' },
  { id: 'atm', name: 'ATM', description: '24/7 access to cash withdrawal' }
];

// Station images for different locations - all using the Shell image
const stationImages = {
  shell: '/lovable-uploads/8ed0bc34-d448-42c8-804a-8dda4e3e6840.png',
  exxon: '/lovable-uploads/8ed0bc34-d448-42c8-804a-8dda4e3e6840.png',
  chevron: '/lovable-uploads/8ed0bc34-d448-42c8-804a-8dda4e3e6840.png',
  bp: '/lovable-uploads/8ed0bc34-d448-42c8-804a-8dda4e3e6840.png'
};

const StationDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showShareOptions, setShowShareOptions] = React.useState(false);
  
  const handleBuyFuel = () => {
    navigate(`/station/${id}/fuel`);
  };
  
  const handleShopGroceries = () => {
    navigate(`/station/${id}/groceries`);
  };
  
  const handleShare = () => {
    setShowShareOptions(!showShareOptions);
  };
  
  const getDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${stationData.latitude},${stationData.longitude}&travelmode=driving`;
    window.open(url, '_blank');
    
    toast({
      title: "Opening directions",
      description: "Directions to Shell Gas Station are opening in a new tab",
    });
  };
  
  const shareToSocial = (platform: string) => {
    const shareUrl = window.location.href;
    const shareText = `Check out ${stationData.name} on FuelFriendly!`;
    
    let shareLink = "";
    
    switch(platform) {
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
        break;
      case 'instagram':
        toast({
          title: "Instagram sharing",
          description: "Instagram sharing requires the app. Copy the link and share manually.",
        });
        return;
      case 'email':
        shareLink = `mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(shareUrl)}`;
        break;
    }
    
    if (shareLink) {
      window.open(shareLink, '_blank');
    }
    
    setShowShareOptions(false);
  };
  
  return (
    <>
      <Header showBack title="Station Details" />
      
      <main className="page-container">
        <div className="relative h-56 rounded-xl overflow-hidden mb-5">
          <img 
            src={stationData.imageUrl} 
            alt={stationData.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h1 className="text-2xl font-bold text-white mb-1">{stationData.name}</h1>
            <div className="flex items-center space-x-3 mb-2">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                <span className="text-sm font-medium text-white">{stationData.rating}</span>
                <span className="text-sm text-white/70 ml-1">({stationData.reviews})</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-white">{stationData.distance}</span>
              </div>
              <div className={`flex items-center ${stationData.isOpen ? 'text-green-500' : 'text-red-500'}`}>
                <Clock className="h-4 w-4 mr-1" />
                <span className="text-sm">{stationData.isOpen ? 'Open' : 'Closed'}</span>
              </div>
            </div>
            <p className="text-sm text-white/80">{stationData.address}</p>
          </div>
        </div>
        
        {/* Station description */}
        <div className="glass card-shadow rounded-xl p-4 mb-5">
          <h2 className="text-lg font-medium mb-2">About</h2>
          <p className="text-sm text-muted-foreground">{stationData.description}</p>
        </div>
        
        {/* Station services */}
        <div className="glass card-shadow rounded-xl p-4 mb-5">
          <h2 className="text-lg font-medium mb-3">Available Services</h2>
          <div className="space-y-3">
            {stationServices.map(service => (
              <div key={service.id} className="flex items-start">
                <div className={`h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center mr-3 mt-0.5 ${service.id === 'fuel' || service.id === 'store' ? 'bg-green-500/20' : ''}`}>
                  {service.id === 'fuel' && <Fuel className="h-4 w-4 text-green-500" />}
                  {service.id === 'store' && <ShoppingBag className="h-4 w-4 text-green-500" />}
                  {service.id === 'car-wash' && <div className="h-4 w-4 text-blue-400">🚿</div>}
                  {service.id === 'atm' && <div className="h-4 w-4 text-yellow-400">💳</div>}
                </div>
                <div>
                  <h3 className="font-medium">{service.name}</h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Actions */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <button 
            onClick={getDirections}
            className="glass card-shadow rounded-xl p-4 flex items-center justify-center"
          >
            <Navigation className="h-5 w-5 mr-2 text-green-500" />
            <span>Directions</span>
          </button>
          <div className="relative">
            <button 
              onClick={handleShare}
              className="w-full glass card-shadow rounded-xl p-4 flex items-center justify-center"
            >
              <Share2 className="h-5 w-5 mr-2 text-green-500" />
              <span>Share</span>
            </button>
            
            {showShareOptions && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-background/90 backdrop-blur-sm rounded-xl shadow-lg p-4 z-10 w-full animate-fade-in">
                <h3 className="text-sm font-medium mb-3">Share via</h3>
                <div className="grid grid-cols-4 gap-3">
                  <button 
                    onClick={() => shareToSocial('facebook')}
                    className="flex flex-col items-center"
                  >
                    <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center mb-1">
                      <Facebook className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xs">Facebook</span>
                  </button>
                  <button 
                    onClick={() => shareToSocial('twitter')}
                    className="flex flex-col items-center"
                  >
                    <div className="h-10 w-10 rounded-full bg-blue-400 flex items-center justify-center mb-1">
                      <Twitter className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xs">Twitter</span>
                  </button>
                  <button 
                    onClick={() => shareToSocial('instagram')}
                    className="flex flex-col items-center"
                  >
                    <div className="h-10 w-10 rounded-full bg-pink-500 flex items-center justify-center mb-1">
                      <Instagram className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xs">Instagram</span>
                  </button>
                  <button 
                    onClick={() => shareToSocial('email')}
                    className="flex flex-col items-center"
                  >
                    <div className="h-10 w-10 rounded-full bg-gray-500 flex items-center justify-center mb-1">
                      <Mail className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xs">Email</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <Map className="h-48 mb-5" showRoute={true} />
        
        {/* Main action buttons */}
        <div className="grid grid-cols-1 gap-3 mb-6">
          <button 
            onClick={handleBuyFuel}
            className="w-full py-4 rounded-xl bg-green-500 text-black font-semibold hover:bg-green-600 active:scale-[0.99] transition-all duration-200 flex items-center justify-center"
          >
            <Fuel className="h-5 w-5 mr-2" />
            Get Fuel with Fuel Friend
          </button>
          
          <button 
            onClick={handleShopGroceries}
            className="w-full py-4 rounded-xl glass border border-green-500/30 text-white font-semibold hover:bg-green-500/10 active:scale-[0.99] transition-all duration-200 flex items-center justify-center"
          >
            <ShoppingBag className="h-5 w-5 mr-2 text-green-500" />
            Shop Groceries
          </button>
        </div>
      </main>
      
      <BottomNav />
    </>
  );
};

export default StationDetails;
