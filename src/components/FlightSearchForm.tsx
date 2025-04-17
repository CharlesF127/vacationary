
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';
import { Search, Calendar as CalendarIcon, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const FlightSearchForm = () => {
  const navigate = useNavigate();
  const [tripType, setTripType] = useState('roundTrip');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departDate, setDepartDate] = useState<Date | undefined>(undefined);
  const [returnDate, setReturnDate] = useState<Date | undefined>(undefined);
  const [passengers, setPassengers] = useState('1');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!origin || !destination || !departDate || (tripType === 'roundTrip' && !returnDate)) {
      toast.error("Please fill in all required fields");
      return;
    }

    toast.success("Searching flights...", {
      description: `From ${origin} to ${destination}`
    });
    
    // Build search params for the results page
    const searchParams = new URLSearchParams();
    searchParams.append('origin', origin);
    searchParams.append('destination', destination);
    searchParams.append('departDate', departDate.toISOString());
    if (tripType === 'roundTrip' && returnDate) {
      searchParams.append('returnDate', returnDate.toISOString());
    }
    searchParams.append('passengers', passengers);
    searchParams.append('tripType', tripType);
    
    // Navigate to the results page
    navigate(`/flight-results?${searchParams.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div className="flex flex-wrap gap-4">
          <RadioGroup
            defaultValue="roundTrip"
            className="flex gap-4"
            onValueChange={setTripType}
            value={tripType}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="roundTrip" id="roundTrip" />
              <Label htmlFor="roundTrip">Round Trip</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="oneWay" id="oneWay" />
              <Label htmlFor="oneWay">One Way</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="multiCity" id="multiCity" />
              <Label htmlFor="multiCity">Multi-City</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="origin">From</Label>
            <Input
              id="origin"
              placeholder="City or Airport"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="destination">To</Label>
            <Input
              id="destination"
              placeholder="City or Airport"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Departure Date</Label>
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
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>

          {tripType === 'roundTrip' && (
            <div className="space-y-2">
              <Label>Return Date</Label>
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
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}

          <div className="space-y-2">
            <Label>Passengers</Label>
            <Select value={passengers} onValueChange={setPassengers}>
              <SelectTrigger>
                <SelectValue placeholder="Select passengers" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5].map((num) => (
                  <SelectItem key={num} value={String(num)}>
                    {num} {num === 1 ? 'Passenger' : 'Passengers'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button type="submit" className="w-full bg-travel-blue hover:bg-travel-blue-dark text-white font-medium py-2 px-4 rounded-md">
          <Search className="mr-2 h-4 w-4" />
          Search Flights
        </Button>
      </div>
    </form>
  );
};

export default FlightSearchForm;
