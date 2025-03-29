
// Generate 100 random stations around Memphis, TN

// Helper function to generate random coordinates around Memphis
function generateRandomCoordinates(baseLat: number, baseLng: number, radiusInKm: number) {
  const earthRadius = 6371; // Earth radius in kilometers
  const degreesToRadians = Math.PI / 180;
  const radiansToDegreesLat = 180 / Math.PI;
  const radiansToDegreesLng = 180 / Math.PI / Math.cos(baseLat * degreesToRadians);
  
  const randomDistance = Math.random() * radiusInKm;
  const randomAngle = Math.random() * 2 * Math.PI;
  
  const latOffset = randomDistance / earthRadius * radiansToDegreesLat;
  const lngOffset = randomDistance / earthRadius * radiansToDegreesLng;
  
  const lat = baseLat + latOffset * Math.sin(randomAngle);
  const lng = baseLng + lngOffset * Math.cos(randomAngle);
  
  return { lat, lng };
}

// Memphis coordinates
const memphisLat = 35.1495;
const memphisLng = -90.0490;

// Gas station brand names in Memphis
const stationBrands = [
  'Shell', 
  'ExxonMobil', 
  'Chevron', 
  'BP', 
  'Marathon', 
  'CITGO', 
  'Valero', 
  'QuikTrip', 
  'Mobil', 
  'RaceTrac',
  'Circle K',
  'Pilot',
  'Flying J',
  'Love\'s',
  'Murphy USA',
  'Phillips 66'
];

// Memphis area neighborhoods and areas
const memphisAreas = [
  'Downtown',
  'Midtown',
  'East Memphis',
  'South Memphis',
  'Germantown',
  'Cordova',
  'Bartlett',
  'Collierville',
  'Millington',
  'Arlington',
  'Lakeland',
  'Raleigh',
  'Frayser',
  'Whitehaven',
  'Hickory Hill',
  'Berclair',
  'Cooper-Young',
  'Binghampton',
  'Mud Island',
  'Harbor Town'
];

// Memphis streets
const memphisStreets = [
  'Poplar Ave',
  'Union Ave',
  'Sam Cooper Blvd',
  'Summer Ave',
  'Park Ave',
  'Walnut Grove Rd',
  'Winchester Rd',
  'Lamar Ave',
  'Airways Blvd',
  'Jackson Ave',
  'Elvis Presley Blvd',
  'Getwell Rd',
  'Highland St',
  'Central Ave',
  'Madison Ave',
  'Shelby Dr',
  'Germantown Pkwy',
  'Mt Moriah Rd',
  'Macon Rd',
  'Austin Peay Hwy'
];

// Fuel types available in Memphis area
export const fuelTypes = [
  { id: 'regular', name: 'Regular Unleaded', price: 3.29 },
  { id: 'midgrade', name: 'Midgrade Unleaded', price: 3.59 },
  { id: 'premium', name: 'Premium Unleaded', price: 3.89 },
  { id: 'diesel', name: 'Diesel', price: 3.69 },
  { id: 'e85', name: 'E85 Flex Fuel', price: 2.99 }
];

// Generate random station images
const stationImages = [
  '/lovable-uploads/00333baa-ca73-4e51-8f20-49acab199b5b.png',
  '/lovable-uploads/049ef9d2-46de-4e78-bee2-10fa706d9425.png',
  '/lovable-uploads/8c6a633e-ae68-4424-b2b3-4458a96b7d3b.png',
  '/lovable-uploads/aafa9060-dd0c-4f89-9725-afe221ab74ba.png',
  '/lovable-uploads/ba008608-8960-40b9-8a96-e5b173a48e08.png',
  '/lovable-uploads/c123a960-63f7-48ab-b0a0-6f29584106f7.png'
];

// Generate 100 random gas stations
export const allStations = Array.from({ length: 100 }, (_, i) => {
  const coords = generateRandomCoordinates(memphisLat, memphisLng, 15);
  const brandName = stationBrands[Math.floor(Math.random() * stationBrands.length)];
  const area = memphisAreas[Math.floor(Math.random() * memphisAreas.length)];
  const street = memphisStreets[Math.floor(Math.random() * memphisStreets.length)];
  const distance = (Math.random() * 15).toFixed(1);
  const rating = (3 + Math.random() * 2).toFixed(1);
  const reviewCount = Math.floor(Math.random() * 100) + 5;
  const isOpen = Math.random() > 0.2; // 80% chance of being open
  const imageUrl = stationImages[Math.floor(Math.random() * stationImages.length)];
  
  // Generate random available fuel types and prices
  const availableFuels = fuelTypes.filter(() => Math.random() > 0.3).map(fuel => ({
    ...fuel,
    price: (fuel.price + (Math.random() * 0.4 - 0.2)).toFixed(2) // Add random price variation
  }));
  
  return {
    id: (i + 1).toString(),
    name: `${brandName} ${area}`,
    address: `${1000 + Math.floor(Math.random() * 8000)} ${street}, Memphis, TN`,
    distance,
    rating: parseFloat(rating),
    reviewCount,
    isOpen,
    imageUrl,
    position: coords,
    fuels: availableFuels,
    amenities: {
      hasConvenienceStore: Math.random() > 0.3,
      hasCarWash: Math.random() > 0.7,
      hasRestrooms: Math.random() > 0.2,
      hasATM: Math.random() > 0.5,
      hasFoodService: Math.random() > 0.6
    }
  };
});

// Generate 100 random order history items
const orderStatuses = ['completed', 'in-transit', 'processing', 'cancelled'];

export const orderHistory = Array.from({ length: 100 }, (_, i) => {
  const station = allStations[Math.floor(Math.random() * allStations.length)];
  const fuel = fuelTypes[Math.floor(Math.random() * fuelTypes.length)];
  const quantity = Math.floor(Math.random() * 10) + 1;
  const orderDate = new Date();
  orderDate.setDate(orderDate.getDate() - Math.floor(Math.random() * 30)); // Random date in the last 30 days
  const status = orderStatuses[Math.floor(Math.random() * orderStatuses.length)];
  
  return {
    id: `ORD-${100000 + i}`,
    stationId: station.id,
    stationName: station.name,
    fuelType: fuel.name,
    quantity,
    totalPrice: (fuel.price * quantity).toFixed(2),
    orderDate: orderDate.toISOString(),
    status,
    items: [
      { name: `${quantity} Gallons ${fuel.name}`, quantity: '1x', price: parseFloat((fuel.price * quantity).toFixed(2)) },
      ...(Math.random() > 0.7 ? [{ name: 'Snacks', quantity: '2x', price: 4.50 }] : [])
    ],
    driver: Math.random() > 0.5 ? {
      name: 'Mike Johnson',
      location: 'Memphis, TN',
      image: '/lovable-uploads/a3df03b1-a154-407f-b8fe-e5dd6f0bade3.png',
      rating: 4.8,
      phone: '+1 (555) 123-4567'
    } : {
      name: 'Sarah Miller',
      location: 'Memphis, TN',
      image: '/lovable-uploads/c3b29f6b-a689-4ac3-a338-4194cbee5e0c.png',
      rating: 4.9,
      phone: '+1 (555) 987-6543'
    }
  };
});
