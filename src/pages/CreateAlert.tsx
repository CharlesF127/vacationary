
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { createPriceAlert } from '@/services/userService';
import { toast } from 'sonner';

const CreateAlert = () => {
  const navigate = useNavigate();
  const [alertType, setAlertType] = useState<'flight' | 'hotel' | 'package'>('flight');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departDate, setDepartDate] = useState<Date | undefined>(undefined);
  const [returnDate, setReturnDate] = useState<Date | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!destination) {
      toast.error('Please enter a destination');
      return;
    }
    
    if (alertType === 'flight' && !origin) {
      toast.error('Please enter an origin for flight alerts');
      return;
    }
    
    if (!maxPrice || isNaN(Number(maxPrice)) || Number(maxPrice) <= 0) {
      toast.error('Please enter a valid maximum price');
      return;
    }
    
    try {
      createPriceAlert({
        userId: 'user-1', // In a real app, this would be the authenticated user's ID
        type: alertType,
        origin: alertType === 'flight' ? origin : undefined,
        destination,
        departDate,
        returnDate,
        maxPrice: Number(maxPrice),
      });
      
      toast.success('Price alert created successfully');
      navigate('/profile');
    } catch (error) {
      toast.error('Failed to create price alert');
      console.error(error);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          className="mb-6" 
          onClick={() => navigate('/profile')}
        >
          <ArrowLeft className="mr-2" /> Back to Profile
        </Button>
        
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 mb-4 bg-travel-blue/10 rounded-full">
              <Bell className="text-travel-blue" />
            </div>
            <h1 className="text-2xl font-bold">Create Price Alert</h1>
            <p className="text-gray-500 mt-2">
              We'll notify you when prices drop to your desired amount
            </p>
          </div>
          
          <Card>
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-6">
                {/* Alert Type */}
                <div>
                  <Label className="text-base font-medium mb-3 block">What do you want to track?</Label>
                  <RadioGroup 
                    value={alertType} 
                    onValueChange={(val) => setAlertType(val as 'flight' | 'hotel' | 'package')}
                    className="flex flex-col space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="flight" id="flight" />
                      <Label htmlFor="flight">Flight</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="hotel" id="hotel" />
                      <Label htmlFor="hotel">Hotel</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="package" id="package" />
                      <Label htmlFor="package">Vacation Package</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                {/* Origin (for flights and packages) */}
                {alertType !== 'hotel' && (
                  <div>
                    <Label htmlFor="origin">Origin</Label>
                    <Input
                      id="origin"
                      placeholder="City or Airport"
                      value={origin}
                      onChange={(e) => setOrigin(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                )}
                
                {/* Destination */}
                <div>
                  <Label htmlFor="destination">Destination</Label>
                  <Input
                    id="destination"
                    placeholder="City, Airport, or Hotel"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                {/* Dates (Optional) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="block mb-1">Departure Date (Optional)</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !departDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {departDate ? format(departDate, "PPP") : <span>Select date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={departDate}
                          onSelect={setDepartDate}
                          initialFocus
                          disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div>
                    <Label className="block mb-1">Return Date (Optional)</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !returnDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {returnDate ? format(returnDate, "PPP") : <span>Select date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={returnDate}
                          onSelect={setReturnDate}
                          initialFocus
                          disabled={(date) => 
                            date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                            (departDate && date < departDate)
                          }
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                
                {/* Max Price */}
                <div>
                  <Label htmlFor="maxPrice">Maximum Price ($)</Label>
                  <Input
                    id="maxPrice"
                    type="number"
                    placeholder="250"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="mt-1"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    You'll be notified when prices drop below this amount
                  </p>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-travel-blue hover:bg-travel-blue-dark"
                >
                  <Bell className="mr-2 h-4 w-4" />
                  Create Price Alert
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreateAlert;
