
// User service to handle user preferences and alerts

export interface User {
  id: string;
  email: string;
  name: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  favoriteDestinations: string[];
  preferredAirlines: string[];
  preferredHotelChains: string[];
  priceRange: {
    min: number;
    max: number;
  };
}

export interface PriceAlert {
  id: string;
  userId: string;
  type: 'flight' | 'hotel' | 'package';
  origin?: string;
  destination: string;
  departDate?: Date;
  returnDate?: Date;
  maxPrice: number;
  created: Date;
  active: boolean;
}

// Mock user data
const mockUser: User = {
  id: 'user-1',
  email: 'user@example.com',
  name: 'Travel User',
  preferences: {
    favoriteDestinations: ['Paris', 'Tokyo', 'New York'],
    preferredAirlines: ['SkyWings', 'OceanAir'],
    preferredHotelChains: ['Grand Plaza', 'Mountain Resort'],
    priceRange: {
      min: 100,
      max: 1000
    }
  }
};

// Mock price alerts
const mockAlerts: PriceAlert[] = [
  {
    id: 'alert-1',
    userId: 'user-1',
    type: 'flight',
    origin: 'San Francisco',
    destination: 'New York',
    departDate: new Date('2025-07-10'),
    returnDate: new Date('2025-07-17'),
    maxPrice: 400,
    created: new Date('2025-04-01'),
    active: true
  },
  {
    id: 'alert-2',
    userId: 'user-1',
    type: 'hotel',
    destination: 'Paris',
    maxPrice: 250,
    created: new Date('2025-04-05'),
    active: true
  }
];

// Simulate local storage
const getLocalStorageUser = (): User | null => {
  const userData = localStorage.getItem('travelUser');
  return userData ? JSON.parse(userData) : null;
};

const setLocalStorageUser = (user: User): void => {
  localStorage.setItem('travelUser', JSON.stringify(user));
};

const getLocalStorageAlerts = (): PriceAlert[] => {
  const alertsData = localStorage.getItem('priceAlerts');
  return alertsData ? JSON.parse(alertsData) : [];
};

const setLocalStorageAlerts = (alerts: PriceAlert[]): void => {
  localStorage.setItem('priceAlerts', JSON.stringify(alerts));
};

// Initialize local storage with mock data
const initializeLocalStorage = (): void => {
  if (!localStorage.getItem('travelUser')) {
    setLocalStorageUser(mockUser);
  }
  
  if (!localStorage.getItem('priceAlerts')) {
    setLocalStorageAlerts(mockAlerts);
  }
};

// User service functions
export const getCurrentUser = (): User | null => {
  initializeLocalStorage();
  return getLocalStorageUser();
};

export const updateUserPreferences = (preferences: Partial<UserPreferences>): User => {
  const user = getCurrentUser();
  if (!user) throw new Error('User not found');
  
  const updatedUser = {
    ...user,
    preferences: {
      ...user.preferences,
      ...preferences
    }
  };
  
  setLocalStorageUser(updatedUser);
  return updatedUser;
};

export const getPriceAlerts = (): PriceAlert[] => {
  initializeLocalStorage();
  return getLocalStorageAlerts();
};

export const createPriceAlert = (alert: Omit<PriceAlert, 'id' | 'created' | 'active'>): PriceAlert => {
  const alerts = getPriceAlerts();
  
  const newAlert: PriceAlert = {
    ...alert,
    id: `alert-${Date.now()}`,
    created: new Date(),
    active: true
  };
  
  const updatedAlerts = [...alerts, newAlert];
  setLocalStorageAlerts(updatedAlerts);
  
  return newAlert;
};

export const deletePriceAlert = (alertId: string): boolean => {
  const alerts = getPriceAlerts();
  const updatedAlerts = alerts.filter(alert => alert.id !== alertId);
  
  if (updatedAlerts.length === alerts.length) {
    return false; // No alert deleted
  }
  
  setLocalStorageAlerts(updatedAlerts);
  return true;
};

export const togglePriceAlert = (alertId: string): PriceAlert | null => {
  const alerts = getPriceAlerts();
  const alertIndex = alerts.findIndex(alert => alert.id === alertId);
  
  if (alertIndex === -1) {
    return null;
  }
  
  const updatedAlerts = [...alerts];
  updatedAlerts[alertIndex] = {
    ...updatedAlerts[alertIndex],
    active: !updatedAlerts[alertIndex].active
  };
  
  setLocalStorageAlerts(updatedAlerts);
  return updatedAlerts[alertIndex];
};
