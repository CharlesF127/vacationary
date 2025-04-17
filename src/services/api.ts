
// Simulated API service to fetch travel data
// In a production app, this would connect to real APIs

export interface FlightOption {
  id: string;
  airline: string;
  departureTime: string;
  arrivalTime: string;
  origin: string;
  destination: string;
  price: number;
  duration: string;
  stops: number;
}

export interface HotelOption {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  amenities: string[];
  image: string;
}

export interface PackageOption {
  id: string;
  name: string;
  destination: string;
  origin: string;
  duration: string;
  hotel: {
    name: string;
    rating: number;
  };
  flight: {
    airline: string;
    stops: number;
  };
  price: number;
  image: string;
}

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock data generators
const generateFlights = (origin: string, destination: string, departDate: Date): FlightOption[] => {
  const airlines = ['SkyWings', 'OceanAir', 'MountainJet', 'ValleyFlyers', 'SunsetAir'];
  const flights: FlightOption[] = [];
  
  for (let i = 0; i < 8; i++) {
    const departHour = 6 + Math.floor(Math.random() * 15);
    const durationHours = 1 + Math.floor(Math.random() * 10);
    const durationStr = durationHours > 1 ? `${durationHours}h` : `${durationHours}h ${Math.floor(Math.random() * 55)}m`;
    const stops = Math.floor(Math.random() * 3);
    
    const departureTime = new Date(departDate);
    departureTime.setHours(departHour, Math.floor(Math.random() * 60));
    
    const arrivalTime = new Date(departureTime);
    arrivalTime.setHours(arrivalTime.getHours() + durationHours);
    
    flights.push({
      id: `FL-${i + 1000}`,
      airline: airlines[Math.floor(Math.random() * airlines.length)],
      departureTime: departureTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      arrivalTime: arrivalTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      origin,
      destination,
      price: 150 + Math.floor(Math.random() * 850),
      duration: durationStr,
      stops
    });
  }
  
  return flights.sort((a, b) => a.price - b.price);
};

const generateHotels = (destination: string): HotelOption[] => {
  const hotelNames = ['Grand Plaza', 'Ocean View', 'Mountain Resort', 'City Center', 'Sunset Lodge', 'Royal Palace', 'Riverside Inn'];
  const amenitiesList = [
    'Free WiFi', 'Swimming Pool', 'Spa', 'Fitness Center', 'Restaurant', 
    'Bar', 'Room Service', 'Parking', 'Airport Shuttle', 'Business Center'
  ];
  const images = [
    '/hotel1.jpg', '/hotel2.jpg', '/hotel3.jpg', '/hotel4.jpg',
    '/hotel5.jpg', '/hotel6.jpg', '/hotel7.jpg',
  ];
  
  const hotels: HotelOption[] = [];
  
  for (let i = 0; i < 7; i++) {
    const randomAmenities = [...amenitiesList]
      .sort(() => 0.5 - Math.random())
      .slice(0, 3 + Math.floor(Math.random() * 4));
    
    hotels.push({
      id: `HT-${i + 1000}`,
      name: hotelNames[i],
      location: destination,
      price: 80 + Math.floor(Math.random() * 420),
      rating: 3 + Math.random() * 2,
      amenities: randomAmenities,
      image: images[i]
    });
  }
  
  return hotels.sort((a, b) => a.price - b.price);
};

const generatePackages = (origin: string, destination: string): PackageOption[] => {
  const packageNames = [
    'Weekend Getaway', 'City Explorer', 'Beach Vacation', 
    'Mountain Adventure', 'Luxury Escape', 'Family Holiday', 'Romantic Retreat'
  ];
  const airlines = ['SkyWings', 'OceanAir', 'MountainJet', 'ValleyFlyers', 'SunsetAir'];
  const hotelNames = ['Grand Plaza', 'Ocean View', 'Mountain Resort', 'City Center', 'Sunset Lodge', 'Royal Palace', 'Riverside Inn'];
  const durations = ['3 days', '5 days', '7 days', '10 days', '14 days'];
  const images = [
    '/package1.jpg', '/package2.jpg', '/package3.jpg', '/package4.jpg',
    '/package5.jpg', '/package6.jpg', '/package7.jpg',
  ];
  
  const packages: PackageOption[] = [];
  
  for (let i = 0; i < 7; i++) {
    packages.push({
      id: `PK-${i + 1000}`,
      name: packageNames[i],
      destination,
      origin,
      duration: durations[Math.floor(Math.random() * durations.length)],
      hotel: {
        name: hotelNames[Math.floor(Math.random() * hotelNames.length)],
        rating: 3 + Math.random() * 2
      },
      flight: {
        airline: airlines[Math.floor(Math.random() * airlines.length)],
        stops: Math.floor(Math.random() * 2)
      },
      price: 499 + Math.floor(Math.random() * 1500),
      image: images[i]
    });
  }
  
  return packages.sort((a, b) => a.price - b.price);
};

// API functions
export const searchFlights = async (
  origin: string, 
  destination: string, 
  departDate: Date, 
  returnDate?: Date, 
  passengers: number = 1
): Promise<FlightOption[]> => {
  await delay(1000); // Simulate network delay
  return generateFlights(origin, destination, departDate);
};

export const searchHotels = async (
  destination: string, 
  checkIn: Date, 
  checkOut: Date, 
  rooms: number = 1, 
  guests: number = 2
): Promise<HotelOption[]> => {
  await delay(1000); // Simulate network delay
  return generateHotels(destination);
};

export const searchPackages = async (
  origin: string, 
  destination: string, 
  departDate: Date, 
  returnDate: Date, 
  travelers: number = 2
): Promise<PackageOption[]> => {
  await delay(1000); // Simulate network delay
  return generatePackages(origin, destination);
};
