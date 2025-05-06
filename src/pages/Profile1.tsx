import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, Bell, Settings, Heart, ClipboardList, 
  CreditCard, Trash2, PlusCircle
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  getCurrentUser, 
  getPriceAlerts, 
  updateUserPreferences,
  deletePriceAlert,
  togglePriceAlert 
} from '@/services/userService';
import { toast } from 'sonner';


const Profile1 = () => {
  const [user, setUser] = useState(getCurrentUser());
  const [alerts, setAlerts] = useState(getPriceAlerts());
  
  const [newDestination, setNewDestination] = useState('');
  const [newAirline, setNewAirline] = useState('');
  const [newHotelChain, setNewHotelChain] = useState('');
  
  // Handle adding a new favorite destination
  const handleAddDestination = () => {
    if (!newDestination) return;
    
    const updatedUser = updateUserPreferences({
      favoriteDestinations: [
        ...user!.preferences.favoriteDestinations,
        newDestination
      ]
    });
    
    setUser(updatedUser);
    setNewDestination('');
    toast.success('Destination added to favorites');
  };
  
  // Handle adding a new preferred airline
  const handleAddAirline = () => {
    if (!newAirline) return;
    
    const updatedUser = updateUserPreferences({
      preferredAirlines: [
        ...user!.preferences.preferredAirlines,
        newAirline
      ]
    });
    
    setUser(updatedUser);
    setNewAirline('');
    toast.success('Airline added to preferences');
  };
  
  // Handle adding a new preferred hotel chain
  const handleAddHotelChain = () => {
    if (!newHotelChain) return;
    
    const updatedUser = updateUserPreferences({
      preferredHotelChains: [
        ...user!.preferences.preferredHotelChains,
        newHotelChain
      ]
    });
    
    setUser(updatedUser);
    setNewHotelChain('');
    toast.success('Hotel chain added to preferences');
  };
  
  // Handle removing a price alert
  const handleDeleteAlert = (alertId: string) => {
    deletePriceAlert(alertId);
    setAlerts(getPriceAlerts());
    toast.success('Price alert deleted');
  };

  // Fetch updated user data on mount
  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = getCurrentUser();
      setUser(currentUser);
      setAlerts(getPriceAlerts());
    };
    
    fetchUser();
  }
  , []);

  // Update user preferences when user data changes
  useEffect(() => {
    if (user) {
      updateUserPreferences(user.preferences);
    }
  }
  , [user]);

  // Handle updating user preferences
    const handleUpdatePreferences = (preferences: any) => {
    const updatedUser = updateUserPreferences(preferences);
    setUser(updatedUser);
    toast.success('Preferences updated successfully');
  };

  
  // Handle toggling a price alert
  const handleToggleAlert = (alertId: string) => {
    togglePriceAlert(alertId);
    setAlerts(getPriceAlerts());
    toast.success('Price alert status updated');
  };
  
  // Format date for display
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle>Sign in Required</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="mb-4">You need to sign in to view your profile.</p>
              <Button>Sign In</Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start gap-6">
          {/* User info sidebar */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="h-20 w-20 rounded-full bg-travel-blue/10 flex items-center justify-center mb-4">
                    <User size={32} className="text-travel-blue" />
                  </div>
                  <h2 className="text-xl font-bold">{user.name}</h2>
                  <p className="text-gray-500">{user.email}</p>
                </div>
                
                <div className="space-y-1">
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link to="/profile">
                      <User size={18} className="mr-2" />
                      Profile
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link to="/bookings">
                      <ClipboardList size={18} className="mr-2" />
                      My Bookings
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link to="/favorites">
                      <Heart size={18} className="mr-2" />
                      Favorites
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link to="/price-alerts">
                      <Bell size={18} className="mr-2" />
                      Price Alerts
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link to="/payment-methods">
                      <CreditCard size={18} className="mr-2" />
                      Payment Methods
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link to="/settings">
                      <Settings size={18} className="mr-2" />
                      Settings
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main content */}
          <div className="w-full md:w-3/4">
            <Tabs defaultValue="preferences" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
                <TabsTrigger value="alerts">Price Alerts</TabsTrigger>
                <TabsTrigger value="account">Account Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="preferences">
                <Card>
                  <CardHeader>
                    <CardTitle>Travel Preferences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Favorite destinations */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Favorite Destinations</h3>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {user.preferences.favoriteDestinations.map((destination, index) => (
                          <div 
                            key={index} 
                            className="bg-travel-blue/10 text-travel-blue px-3 py-1 rounded-full text-sm"
                          >
                            {destination}
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input 
                          placeholder="Add destination" 
                          value={newDestination}
                          onChange={(e) => setNewDestination(e.target.value)}
                        />
                        <Button 
                          variant="outline" 
                          onClick={handleAddDestination}
                        >
                          <PlusCircle size={18} className="mr-1" /> Add
                        </Button>
                      </div>
                    </div>
                    
                    {/* Preferred airlines */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Preferred Airlines</h3>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {user.preferences.preferredAirlines.map((airline, index) => (
                          <div 
                            key={index} 
                            className="bg-travel-blue/10 text-travel-blue px-3 py-1 rounded-full text-sm"
                          >
                            {airline}
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input 
                          placeholder="Add airline" 
                          value={newAirline}
                          onChange={(e) => setNewAirline(e.target.value)}
                        />
                        <Button 
                          variant="outline" 
                          onClick={handleAddAirline}
                        >
                          <PlusCircle size={18} className="mr-1" /> Add
                        </Button>
                      </div>
                    </div>
                    
                    {/* Preferred hotel chains */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Preferred Hotel Chains</h3>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {user.preferences.preferredHotelChains.map((hotel, index) => (
                          <div 
                            key={index} 
                            className="bg-travel-blue/10 text-travel-blue px-3 py-1 rounded-full text-sm"
                          >
                            {hotel}
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input 
                          placeholder="Add hotel chain" 
                          value={newHotelChain}
                          onChange={(e) => setNewHotelChain(e.target.value)}
                        />
                        <Button 
                          variant="outline" 
                          onClick={handleAddHotelChain}
                        >
                          <PlusCircle size={18} className="mr-1" /> Add
                        </Button>
                      </div>
                    </div>
                    
                    {/* Price range preferences */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Price Range</h3>
                      <div className="flex items-center gap-4">
                        <div className="w-1/2">
                          <p className="text-sm text-gray-500 mb-1">Minimum ($)</p>
                          <Input 
                            type="number" 
                            value={user.preferences.priceRange.min}
                            onChange={(e) => {
                              const value = parseInt(e.target.value);
                              if (!isNaN(value)) {
                                updateUserPreferences({
                                  priceRange: {
                                    ...user.preferences.priceRange,
                                    min: value
                                  }
                                });
                              }
                            }}
                          />
                        </div>
                        <div className="w-1/2">
                          <p className="text-sm text-gray-500 mb-1">Maximum ($)</p>
                          <Input 
                            type="number"
                            value={user.preferences.priceRange.max}
                            onChange={(e) => {
                              const value = parseInt(e.target.value);
                              if (!isNaN(value)) {
                                updateUserPreferences({
                                  priceRange: {
                                    ...user.preferences.priceRange,
                                    max: value
                                  }
                                });
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="alerts">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Price Alerts</CardTitle>
                    <Button asChild>
                      <Link to="/create-alert">
                        <PlusCircle size={18} className="mr-1" /> New Alert
                      </Link>
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {alerts.length === 0 ? (
                      <div className="text-center py-8">
                        <Bell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500 mb-4">You don't have any price alerts yet</p>
                        <Button asChild>
                          <Link to="/create-alert">Create Your First Alert</Link>
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {alerts.map((alert) => (
                          <Card key={alert.id}>
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <div className={`w-3 h-3 rounded-full mr-3 ${alert.active ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                  <div>
                                    <h4 className="font-medium">
                                      {alert.type === 'flight' && `Flight: ${alert.origin} to ${alert.destination}`}
                                      {alert.type === 'hotel' && `Hotel in ${alert.destination}`}
                                      {alert.type === 'package' && `Package to ${alert.destination}`}
                                    </h4>
                                    <p className="text-sm text-gray-500">
                                      {alert.departDate && alert.returnDate && 
                                        `${formatDate(alert.departDate)} - ${formatDate(alert.returnDate)}`}
                                      {!alert.departDate && !alert.returnDate && 
                                        `Created ${formatDate(alert.created)}`}
                                    </p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="font-bold text-travel-blue">
                                    Under ${alert.maxPrice}
                                  </div>
                                  <div className="flex items-center mt-2">
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="text-gray-500 hover:text-travel-blue h-8 px-2"
                                      onClick={() => handleToggleAlert(alert.id)}
                                    >
                                      {alert.active ? 'Disable' : 'Enable'}
                                    </Button>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="text-gray-500 hover:text-red-500 h-8 px-2"
                                      onClick={() => handleDeleteAlert(alert.id)}
                                    >
                                      <Trash2 size={16} />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="account">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Personal Information</h3>
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Full Name</p>
                          <Input defaultValue={user.name} />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Email Address</p>
                          <Input defaultValue={user.email} />
                        </div>
                      </div>
                      <Button className="mt-4">Update Information</Button>
                    </div>
                    
                    <div className="pt-4">
                      <h3 className="text-lg font-semibold mb-3">Password</h3>
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Current Password</p>
                          <Input type="password" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">New Password</p>
                          <Input type="password" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Confirm New Password</p>
                          <Input type="password" />
                        </div>
                      </div>
                      <Button className="mt-4">Change Password</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile1;
