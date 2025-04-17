
import { useState } from 'react';
import { Shield, Car, Plane, Calendar, MapPin, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const TravelServices = () => {
  const [insuranceType, setInsuranceType] = useState('basic');
  const [transportLocations, setTransportLocations] = useState({ pickup: '', dropoff: '' });
  
  const handleInsuranceSelect = (type: string) => {
    setInsuranceType(type);
    toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} insurance selected`);
  };
  
  const handleTransportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transportLocations.pickup || !transportLocations.dropoff) {
      toast.error('Please enter pickup and drop-off locations');
      return;
    }
    toast.success('Transportation options found!');
  };
  
  const handleItineraryDownload = () => {
    toast.success('Itinerary downloaded successfully!');
  };
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Travel Services</h2>
      
      <Tabs defaultValue="insurance">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="insurance">
            <Shield className="mr-2 h-4 w-4" /> Travel Insurance
          </TabsTrigger>
          <TabsTrigger value="transport">
            <Car className="mr-2 h-4 w-4" /> Local Transportation
          </TabsTrigger>
          <TabsTrigger value="itinerary">
            <Calendar className="mr-2 h-4 w-4" /> Itinerary Planner
          </TabsTrigger>
        </TabsList>
        
        {/* Insurance Tab */}
        <TabsContent value="insurance">
          <div className="mb-6">
            <p className="text-gray-600 mb-4">
              Protect your trip with our comprehensive travel insurance options. Choose the coverage that best suits your needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className={`cursor-pointer border-2 transition-all ${insuranceType === 'basic' ? 'border-travel-blue' : 'hover:border-gray-300'}`}
                  onClick={() => handleInsuranceSelect('basic')}>
              <CardContent className="p-6">
                <CardTitle className="mb-4">Basic Coverage</CardTitle>
                <div className="mb-4 text-2xl font-bold text-travel-blue">$19</div>
                <ul className="space-y-2 mb-6 text-sm">
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 bg-green-100 rounded-full p-1">
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-600">
                        <path d="M9 1L3.5 6.5L1 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    Trip cancellation (up to $1,000)
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 bg-green-100 rounded-full p-1">
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-600">
                        <path d="M9 1L3.5 6.5L1 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    Emergency medical (up to $10,000)
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 bg-green-100 rounded-full p-1">
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-600">
                        <path d="M9 1L3.5 6.5L1 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    Baggage loss (up to $500)
                  </li>
                </ul>
                <Button className={`w-full ${insuranceType === 'basic' ? 'bg-travel-blue hover:bg-travel-blue-dark' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}>
                  {insuranceType === 'basic' ? 'Selected' : 'Select'}
                </Button>
              </CardContent>
            </Card>
            
            <Card className={`cursor-pointer border-2 transition-all ${insuranceType === 'standard' ? 'border-travel-blue' : 'hover:border-gray-300'}`}
                  onClick={() => handleInsuranceSelect('standard')}>
              <CardContent className="p-6">
                <CardTitle className="mb-4">Standard Coverage</CardTitle>
                <div className="mb-4 text-2xl font-bold text-travel-blue">$39</div>
                <ul className="space-y-2 mb-6 text-sm">
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 bg-green-100 rounded-full p-1">
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-600">
                        <path d="M9 1L3.5 6.5L1 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    Trip cancellation (up to $3,000)
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 bg-green-100 rounded-full p-1">
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-600">
                        <path d="M9 1L3.5 6.5L1 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    Emergency medical (up to $25,000)
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 bg-green-100 rounded-full p-1">
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-600">
                        <path d="M9 1L3.5 6.5L1 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    Baggage loss (up to $1,000)
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 bg-green-100 rounded-full p-1">
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-600">
                        <path d="M9 1L3.5 6.5L1 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    Travel delay coverage
                  </li>
                </ul>
                <Button className={`w-full ${insuranceType === 'standard' ? 'bg-travel-blue hover:bg-travel-blue-dark' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}>
                  {insuranceType === 'standard' ? 'Selected' : 'Select'}
                </Button>
              </CardContent>
            </Card>
            
            <Card className={`cursor-pointer border-2 transition-all ${insuranceType === 'premium' ? 'border-travel-blue' : 'hover:border-gray-300'}`}
                  onClick={() => handleInsuranceSelect('premium')}>
              <CardContent className="p-6">
                <CardTitle className="mb-4">Premium Coverage</CardTitle>
                <div className="mb-4 text-2xl font-bold text-travel-blue">$69</div>
                <ul className="space-y-2 mb-6 text-sm">
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 bg-green-100 rounded-full p-1">
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-600">
                        <path d="M9 1L3.5 6.5L1 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    Trip cancellation (up to $5,000)
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 bg-green-100 rounded-full p-1">
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-600">
                        <path d="M9 1L3.5 6.5L1 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    Emergency medical (up to $50,000)
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 bg-green-100 rounded-full p-1">
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-600">
                        <path d="M9 1L3.5 6.5L1 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    Baggage loss (up to $2,000)
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 bg-green-100 rounded-full p-1">
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-600">
                        <path d="M9 1L3.5 6.5L1 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    Travel delay & interruption
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 bg-green-100 rounded-full p-1">
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-600">
                        <path d="M9 1L3.5 6.5L1 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    Emergency evacuation
                  </li>
                </ul>
                <Button className={`w-full ${insuranceType === 'premium' ? 'bg-travel-blue hover:bg-travel-blue-dark' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}>
                  {insuranceType === 'premium' ? 'Selected' : 'Select'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Transportation Tab */}
        <TabsContent value="transport">
          <div className="mb-6">
            <p className="text-gray-600 mb-4">
              Find local transportation options for your destination. Book airport transfers, car rentals, or public transport passes.
            </p>
          </div>
          
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleTransportSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="space-y-2">
                    <Label htmlFor="pickupLocation">Pickup Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <Input
                        id="pickupLocation"
                        placeholder="Airport or hotel name"
                        className="pl-10"
                        value={transportLocations.pickup}
                        onChange={(e) => setTransportLocations({...transportLocations, pickup: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dropoffLocation">Drop-off Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <Input
                        id="dropoffLocation"
                        placeholder="Airport, hotel, or address"
                        className="pl-10"
                        value={transportLocations.dropoff}
                        onChange={(e) => setTransportLocations({...transportLocations, dropoff: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="space-y-2">
                    <Label>Transport Type</Label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Options</SelectItem>
                        <SelectItem value="taxi">Taxi / Ride Share</SelectItem>
                        <SelectItem value="shuttle">Airport Shuttle</SelectItem>
                        <SelectItem value="rental">Car Rental</SelectItem>
                        <SelectItem value="public">Public Transport</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>Time</Label>
                    <Input type="time" />
                  </div>
                </div>
                
                <Button type="submit" className="bg-travel-blue hover:bg-travel-blue-dark">
                  Search Transportation Options
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-travel-blue/10 p-2 rounded-full">
                    <Car size={24} className="text-travel-blue" />
                  </div>
                  <span className="text-lg font-bold">$35</span>
                </div>
                <h3 className="font-medium mb-1">Airport Taxi</h3>
                <p className="text-sm text-gray-600 mb-3">Private transfer, meet & greet</p>
                <Button variant="outline" className="w-full">Select</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-travel-blue/10 p-2 rounded-full">
                    <Plane size={24} className="text-travel-blue" />
                  </div>
                  <span className="text-lg font-bold">$12</span>
                </div>
                <h3 className="font-medium mb-1">Airport Shuttle</h3>
                <p className="text-sm text-gray-600 mb-3">Shared transfer, fixed schedule</p>
                <Button variant="outline" className="w-full">Select</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-travel-blue/10 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-travel-blue"><rect width="16" height="16" x="4" y="4" rx="2"></rect><rect width="6" height="6" x="9" y="9" rx="1"></rect><path d="M15 2v2"></path><path d="M15 20v2"></path><path d="M2 15h2"></path><path d="M20 15h2"></path></svg>
                  </div>
                  <span className="text-lg font-bold">$8</span>
                </div>
                <h3 className="font-medium mb-1">Public Transport</h3>
                <p className="text-sm text-gray-600 mb-3">Day pass for all transit options</p>
                <Button variant="outline" className="w-full">Select</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Itinerary Tab */}
        <TabsContent value="itinerary">
          <div className="mb-6">
            <p className="text-gray-600 mb-4">
              Plan and organize your trip itinerary. Add activities, set reminders, and keep all your travel information in one place.
            </p>
          </div>
          
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Your Trip to Paris</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center border-l-4 border-travel-blue pl-4 py-2">
                  <div className="mr-4">
                    <div className="text-xs text-gray-500">OCT 12</div>
                    <div className="font-medium">Day 1</div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Arrival & Check-in</h4>
                    <p className="text-sm text-gray-600">Charles de Gaulle Airport to Grand Plaza Hotel</p>
                  </div>
                  <Button variant="ghost" size="sm">Edit</Button>
                </div>
                
                <div className="flex items-center border-l-4 border-travel-blue pl-4 py-2">
                  <div className="mr-4">
                    <div className="text-xs text-gray-500">OCT 13</div>
                    <div className="font-medium">Day 2</div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Eiffel Tower Tour</h4>
                    <p className="text-sm text-gray-600">10:00 AM - Skip the line tickets</p>
                    <p className="text-sm text-gray-500 mt-1">Louvre Museum - 2:00 PM</p>
                  </div>
                  <Button variant="ghost" size="sm">Edit</Button>
                </div>
                
                <div className="flex items-center border-l-4 border-gray-200 pl-4 py-2">
                  <div className="mr-4">
                    <div className="text-xs text-gray-500">OCT 14</div>
                    <div className="font-medium">Day 3</div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Free Day</h4>
                    <p className="text-sm text-gray-600">No activities scheduled</p>
                  </div>
                  <Button variant="ghost" size="sm">Add</Button>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" className="flex items-center" onClick={handleItineraryDownload}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                  Download Itinerary
                </Button>
                <Button variant="outline" className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M4 4v16"></path><path d="M9 4v16"></path><path d="M14 4v16"></path><path d="M19 4v16"></path><path d="M4 9h16"></path><path d="M4 14h16"></path></svg>
                  View as Calendar
                </Button>
                <Button variant="outline" className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  View Map
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-4">Recommended Activities</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="overflow-hidden">
                <div className="w-full h-40 bg-gray-200">
                  <img 
                    src="/placeholder.svg" 
                    alt="Seine River Cruise"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h4 className="font-medium mb-1">Seine River Cruise</h4>
                  <p className="text-sm text-gray-600 mb-3">1-hour sightseeing cruise</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold">$29</span>
                    <Button size="sm" className="flex items-center">
                      Add <ChevronRight size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden">
                <div className="w-full h-40 bg-gray-200">
                  <img 
                    src="/placeholder.svg" 
                    alt="Montmartre Walking Tour"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h4 className="font-medium mb-1">Montmartre Walking Tour</h4>
                  <p className="text-sm text-gray-600 mb-3">2-hour guided tour</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold">$35</span>
                    <Button size="sm" className="flex items-center">
                      Add <ChevronRight size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden">
                <div className="w-full h-40 bg-gray-200">
                  <img 
                    src="/placeholder.svg" 
                    alt="French Cooking Class"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h4 className="font-medium mb-1">French Cooking Class</h4>
                  <p className="text-sm text-gray-600 mb-3">3-hour experience with lunch</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold">$89</span>
                    <Button size="sm" className="flex items-center">
                      Add <ChevronRight size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TravelServices;
