
import { v4 as uuidv4 } from 'uuid';

// Helper function to generate a random date within the last 30 days
const getRandomDate = () => {
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const randomTime = thirtyDaysAgo.getTime() + Math.random() * (now.getTime() - thirtyDaysAgo.getTime());
  return new Date(randomTime);
};

// Generate 100 dummy order data for stations across Memphis
export const generateDummyStations = () => {
  const stationBrands = [
    { brand: 'Shell', imageUrl: '/lovable-uploads/00333baa-ca73-4e51-8f20-49acab199b5b.png' },
    { brand: 'ExxonMobil', imageUrl: '/lovable-uploads/049ef9d2-46de-4e78-bee2-10fa706d9425.png' },
    { brand: 'Chevron', imageUrl: '/lovable-uploads/8c6a633e-ae68-4424-b2b3-4458a96b7d3b.png' },
    { brand: 'BP', imageUrl: '/lovable-uploads/34aae0f7-f7a9-441b-8d2e-1d8027cf8360.png' }
  ];
  
  const streets = [
    'Union Ave', 'Poplar Ave', 'Madison Ave', 'Cooper St', 'Highland St',
    'Central Ave', 'Southern Ave', 'Jackson Ave', 'Summer Ave', 'Walnut Grove Rd'
  ];
  
  const dummyStations = [];
  
  for (let i = 1; i <= 100; i++) {
    const randomBrand = stationBrands[Math.floor(Math.random() * stationBrands.length)];
    const randomStreet = streets[Math.floor(Math.random() * streets.length)];
    const randomStreetNumber = Math.floor(Math.random() * 4000) + 1000;
    const randomDistance = (Math.random() * 9.9 + 0.1).toFixed(1);
    const randomRating = (Math.random() * 2 + 3).toFixed(1);
    
    dummyStations.push({
      id: `${i}`,
      name: `${randomBrand.brand} Gas Station`,
      address: `${randomStreetNumber} ${randomStreet}, Memphis, TN`,
      distance: randomDistance,
      rating: parseFloat(randomRating),
      isOpen: Math.random() > 0.2, // 80% chance to be open
      imageUrl: randomBrand.imageUrl,
      lat: 35.1495 + (Math.random() * 0.02 - 0.01), // Coordinates around Memphis
      lng: -90.0490 + (Math.random() * 0.02 - 0.01)
    });
  }
  
  return dummyStations;
};

// Generate 100 dummy orders
export const generateDummyOrders = () => {
  const fuelTypes = ['Regular Unleaded', 'Premium Unleaded', 'Diesel', 'Ethanol'];
  const addOns = [
    { name: 'Snickers', price: 1.49 },
    { name: 'Coca-Cola', price: 2.29 },
    { name: 'Water Bottle', price: 1.19 },
    { name: 'Chips', price: 1.79 },
    { name: 'Energy Drink', price: 3.49 },
    { name: 'Coffee', price: 2.99 }
  ];
  
  const drivers = [
    { name: 'Mike Johnson', location: 'Memphis, TN', image: '/lovable-uploads/a3df03b1-a154-407f-b8fe-e5dd6f0bade3.png', rating: 4.8, phone: '+1 (555) 123-4567' },
    { name: 'Sarah Williams', location: 'Memphis, TN', image: '/lovable-uploads/59210be-e086-4557-aafc-6a7e6dad067c.png', rating: 4.7, phone: '+1 (555) 765-4321' },
    { name: 'David Thompson', location: 'Memphis, TN', image: '/lovable-uploads/f01d03f8-3174-4828-bdcd-196b636f0b6f.png', rating: 4.9, phone: '+1 (555) 987-6543' }
  ];
  
  const statusOptions = ['pending', 'in-transit', 'delivered', 'cancelled'];
  
  const stations = generateDummyStations();
  const dummyOrders = [];
  
  for (let i = 1; i <= 100; i++) {
    // Select a random station
    const randomStation = stations[Math.floor(Math.random() * stations.length)];
    
    // Generate random order details
    const fuelType = fuelTypes[Math.floor(Math.random() * fuelTypes.length)];
    const gallons = (Math.random() * 9 + 1).toFixed(1);
    const pricePerGallon = (Math.random() * 2 + 3).toFixed(2);
    const fuelSubtotal = parseFloat(gallons) * parseFloat(pricePerGallon);
    
    // Add up to 3 random add-ons
    const numAddOns = Math.floor(Math.random() * 4); // 0 to 3 add-ons
    const selectedAddOns = [];
    let addOnSubtotal = 0;
    
    for (let j = 0; j < numAddOns; j++) {
      const randomAddOn = addOns[Math.floor(Math.random() * addOns.length)];
      const quantity = Math.floor(Math.random() * 3) + 1; // 1 to 3 quantity
      const addOnTotal = randomAddOn.price * quantity;
      
      selectedAddOns.push({
        name: randomAddOn.name,
        price: randomAddOn.price,
        quantity,
        total: addOnTotal
      });
      
      addOnSubtotal += addOnTotal;
    }
    
    // Calculate total
    const orderTotal = fuelSubtotal + addOnSubtotal;
    
    // Select a random driver
    const randomDriver = drivers[Math.floor(Math.random() * drivers.length)];
    
    // Generate a random status weighted toward delivered
    const randomStatus = Math.random() < 0.6 
      ? 'delivered' 
      : statusOptions[Math.floor(Math.random() * statusOptions.length)];
    
    // Generate a random date
    const orderDate = getRandomDate();
    
    // Generate a random delivery time (30 min - 2 hours after order time)
    const deliveryMinutes = Math.floor(Math.random() * 90) + 30;
    const deliveryTime = new Date(orderDate.getTime() + deliveryMinutes * 60000);
    
    // Format as "8:30 - 9:15 PM" with a 45-minute window
    const formatTimeWindow = (time: Date) => {
      const startTime = time;
      const endTime = new Date(time.getTime() + 45 * 60000);
      
      const startHour = startTime.getHours();
      const startMinute = startTime.getMinutes();
      const endHour = endTime.getHours();
      const endMinute = endTime.getMinutes();
      
      const startAmPm = startHour >= 12 ? 'PM' : 'AM';
      const endAmPm = endHour >= 12 ? 'PM' : 'AM';
      
      const formattedStartHour = startHour % 12 || 12;
      const formattedEndHour = endHour % 12 || 12;
      
      return `${formattedStartHour}:${startMinute.toString().padStart(2, '0')} - ${formattedEndHour}:${endMinute.toString().padStart(2, '0')} ${endAmPm}`;
    };
    
    dummyOrders.push({
      id: `ORD-${1000 + i}`,
      stationId: randomStation.id,
      stationName: randomStation.name,
      stationAddress: randomStation.address,
      stationImage: randomStation.imageUrl,
      fuelType,
      gallons: parseFloat(gallons),
      pricePerGallon: parseFloat(pricePerGallon),
      fuelSubtotal,
      addOns: selectedAddOns,
      addOnSubtotal,
      total: orderTotal,
      status: randomStatus,
      orderDate,
      estimatedDelivery: formatTimeWindow(deliveryTime),
      driver: randomDriver,
      paymentMethod: Math.random() > 0.5 ? 'Credit Card' : 'PayPal',
      orderItems: [
        { name: `${gallons} Gallons ${fuelType}`, quantity: '1x', price: fuelSubtotal },
        ...selectedAddOns.map(addOn => ({
          name: addOn.name,
          quantity: `${addOn.quantity}x`,
          price: addOn.total
        }))
      ]
    });
  }
  
  return dummyOrders;
};

// Get all stations
export const allStations = generateDummyStations();

// Get all orders
export const allOrders = generateDummyOrders();

// Get 3 nearest stations for quick use
export const nearbyStations = allStations
  .sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
  .slice(0, 3);

// Get most recent order for tracking
export const currentOrder = allOrders
  .filter(order => order.status === 'in-transit')
  .sort((a, b) => b.orderDate.getTime() - a.orderDate.getTime())[0];
