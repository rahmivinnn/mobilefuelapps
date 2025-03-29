
// Generate random locations around Memphis
const generateRandomLocation = (baseLat: number, baseLng: number, radiusKm: number) => {
  // Earth's radius in kilometers
  const earthRadius = 6371;
  
  // Convert radius from kilometers to radians
  const radiusInRadian = radiusKm / earthRadius;
  
  // Random angle
  const randomAngle = Math.random() * Math.PI * 2;
  
  // Random radius (using square root to ensure uniform distribution)
  const randomRadius = Math.sqrt(Math.random()) * radiusInRadian;
  
  // Calculate new position
  const newLat = baseLat + randomRadius * Math.cos(randomAngle);
  const newLng = baseLng + randomRadius * Math.sin(randomAngle);
  
  return { lat: newLat, lng: newLng };
};

// Random station name generator
const generateStationName = () => {
  const brands = ['Shell', 'ExxonMobil', 'Chevron', 'BP', 'Marathon', 'Texaco', 'Citgo', 'Valero', 'Speedway', 'QuikTrip'];
  const types = ['Gas Station', 'Fuel Stop', 'Petrol', 'Energy', 'Fuels', 'Express', 'Mart', 'Quick Stop', 'Fuel Center'];
  
  const brand = brands[Math.floor(Math.random() * brands.length)];
  const type = types[Math.floor(Math.random() * types.length)];
  
  return `${brand} ${type}`;
};

// Random address generator for Memphis
const generateMemphisAddress = () => {
  const streets = ['Poplar Ave', 'Union Ave', 'Madison Ave', 'Cooper St', 'Central Ave', 'Lamar Ave', 'Summer Ave', 'Elvis Presley Blvd', 'Airways Blvd', 'Highland St'];
  const randomStreet = streets[Math.floor(Math.random() * streets.length)];
  const randomNumber = Math.floor(Math.random() * 5000) + 1000;
  
  return `${randomNumber} ${randomStreet}, Memphis, TN`;
};

// Generate random time
const generateRandomTime = () => {
  const hours = Math.floor(Math.random() * 24);
  const minutes = Math.floor(Math.random() * 60);
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${formattedHours}:${formattedMinutes} ${ampm}`;
};

// Generate 100 dummy stations
export const allStations = Array.from({ length: 100 }, (_, index) => {
  // Memphis coordinates as base
  const baseCoords = { lat: 35.1495, lng: -90.0490 };
  const position = generateRandomLocation(baseCoords.lat, baseCoords.lng, 15);
  
  // Determine which image to use
  const imageTypes = [
    '/lovable-uploads/00333baa-ca73-4e51-8f20-49acab199b5b.png', // Shell
    '/lovable-uploads/049ef9d2-46de-4e78-bee2-10fa706d9425.png', // ExxonMobil
    '/lovable-uploads/8c6a633e-ae68-4424-b2b3-4458a96b7d3b.png', // Chevron
    '/lovable-uploads/34aae0f7-f7a9-441b-8d2e-1d8027cf8360.png'  // BP
  ];
  
  const randomImage = imageTypes[Math.floor(Math.random() * imageTypes.length)];
  const distance = (Math.random() * 15 + 0.5).toFixed(1);
  const rating = (Math.random() * 2 + 3).toFixed(1);
  
  return {
    id: `station-${index + 1}`,
    name: generateStationName(),
    address: generateMemphisAddress(),
    distance,
    rating: parseFloat(rating),
    position,
    reviews: Math.floor(Math.random() * 500) + 50,
    isOpen: Math.random() > 0.2, // 80% chance of being open
    price: (Math.random() * 1 + 3).toFixed(2),
    imageUrl: randomImage,
    hours: Math.random() > 0.7 ? '24 Hours' : `${generateRandomTime()} - ${generateRandomTime()}`,
    amenities: ['ATM', 'Car Wash', 'Convenience Store', 'Restrooms'].filter(() => Math.random() > 0.5)
  };
});

// Generate order statuses
const orderStatuses = ['Pending', 'Confirmed', 'En Route', 'Delivered', 'Cancelled'];
const fuelTypes = ['Regular Unleaded', 'Premium Unleaded', 'Diesel', 'E85', 'Super Unleaded'];
const paymentMethods = ['Credit Card', 'Debit Card', 'PayPal', 'Apple Pay', 'Google Pay', 'Cash'];

// Generate 100 dummy orders
export const allOrders = Array.from({ length: 100 }, (_, index) => {
  const station = allStations[Math.floor(Math.random() * allStations.length)];
  const orderDate = new Date();
  orderDate.setDate(orderDate.getDate() - Math.floor(Math.random() * 30)); // Random date within last 30 days
  
  const status = orderStatuses[Math.floor(Math.random() * orderStatuses.length)];
  const fuelType = fuelTypes[Math.floor(Math.random() * fuelTypes.length)];
  const gallons = (Math.random() * 20 + 1).toFixed(1);
  const pricePerGallon = (Math.random() * 1 + 3).toFixed(2);
  const subtotal = (parseFloat(gallons) * parseFloat(pricePerGallon)).toFixed(2);
  const tax = (parseFloat(subtotal) * 0.0725).toFixed(2);
  const deliveryFee = (Math.random() * 5 + 2.99).toFixed(2);
  const total = (parseFloat(subtotal) + parseFloat(tax) + parseFloat(deliveryFee)).toFixed(2);
  
  let estimatedDelivery = null;
  if (status !== 'Delivered' && status !== 'Cancelled') {
    const deliveryDate = new Date();
    deliveryDate.setMinutes(deliveryDate.getMinutes() + Math.floor(Math.random() * 60 + 15));
    estimatedDelivery = deliveryDate;
  }
  
  let actualDelivery = null;
  if (status === 'Delivered') {
    const deliveredDate = new Date(orderDate);
    deliveredDate.setMinutes(deliveredDate.getMinutes() + Math.floor(Math.random() * 60 + 30));
    actualDelivery = deliveredDate;
  }
  
  return {
    id: `order-${index + 1}`,
    orderNumber: `FF-${Math.floor(Math.random() * 900000) + 100000}`,
    orderDate,
    status,
    station: station.name,
    stationId: station.id,
    fuelType,
    gallons: parseFloat(gallons),
    pricePerGallon: parseFloat(pricePerGallon),
    subtotal: parseFloat(subtotal),
    tax: parseFloat(tax),
    deliveryFee: parseFloat(deliveryFee),
    total: parseFloat(total),
    paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
    estimatedDelivery,
    actualDelivery,
    driverName: Math.random() > 0.5 ? 'Mike Johnson' : 'Sarah Williams',
    driverPhone: '(901) 555-' + Math.floor(Math.random() * 9000 + 1000),
    driverRating: (Math.random() * 1 + 4).toFixed(1),
    address: generateMemphisAddress(),
    notes: Math.random() > 0.7 ? 'Please call when you arrive' : ''
  };
});
