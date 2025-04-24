
import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Loader2, ArrowLeft, Filter, ArrowUpDown } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { searchFlights, FlightOption } from '@/services/api';

const FlightResults = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  
  const [flights, setFlights] = useState<FlightOption[]>([]);
  const [filteredFlights, setFilteredFlights] = useState<FlightOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [airlines, setAirlines] = useState<Set<string>>(new Set());
  const [selectedAirlines, setSelectedAirlines] = useState<Set<string>>(new Set());
  const [maxStops, setMaxStops] = useState<number>(2);
  const [sortOption, setSortOption] = useState<'price' | 'duration' | 'departure'>('price');
  
  // Extract search parameters
  const origin = searchParams.get('origin') || '';
  const destination = searchParams.get('destination') || '';
  const departDateStr = searchParams.get('departDate') || '';
  const returnDateStr = searchParams.get('returnDate') || '';
  const passengers = parseInt(searchParams.get('passengers') || '1', 10);
  
  useEffect(() => {
    const fetchFlights = async () => {
      if (!origin || !destination || !departDateStr) {
        setError('Missing search parameters');
        setLoading(false);
        return;
      }
      
      try {
        const departDate = new Date(departDateStr);
        const results = await searchFlights(
          origin, 
          destination, 
          departDate,
          returnDateStr ? new Date(returnDateStr) : undefined,
          passengers
        );
        
        // Extract unique airlines and price range
        const airlineSet = new Set<string>();
        let minPrice = Infinity;
        let maxPrice = 0;
        
        results.forEach(flight => {
          airlineSet.add(flight.airline);
          minPrice = Math.min(minPrice, flight.price);
          maxPrice = Math.max(maxPrice, flight.price);
        });
        
        setFlights(results);
        setFilteredFlights(results);
        setAirlines(airlineSet);
        setPriceRange([minPrice, maxPrice]);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch flights');
        setLoading(false);
      }
    };
    
    fetchFlights();
  }, [origin, destination, departDateStr, returnDateStr, passengers]);
  
  useEffect(() => {
    // Apply filters
    let results = [...flights];
    
    // Filter by price range
    results = results.filter(flight => 
      flight.price >= priceRange[0] && flight.price <= priceRange[1]
    );
    
    // Filter by selected airlines
    if (selectedAirlines.size > 0) {
      results = results.filter(flight => selectedAirlines.has(flight.airline));
    }
    
    // Filter by stops
    results = results.filter(flight => flight.stops <= maxStops);
    
    // Apply sorting
    switch (sortOption) {
      case 'price':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'duration':
        results.sort((a, b) => a.duration.localeCompare(b.duration));
        break;
      case 'departure':
        results.sort((a, b) => a.departureTime.localeCompare(b.departureTime));
        break;
    }
    
    setFilteredFlights(results);
  }, [flights, priceRange, selectedAirlines, maxStops, sortOption]);
  
  const toggleAirline = (airline: string) => {
    const updated = new Set(selectedAirlines);
    if (updated.has(airline)) {
      updated.delete(airline);
    } else {
      updated.add(airline);
    }
    setSelectedAirlines(updated);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Link to="/">
            <Button variant="ghost" className="p-0 mr-4">
              <ArrowLeft className="mr-1" /> Back
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">
            Flight Results: {origin} to {destination}
          </h1>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters sidebar */}
          <div className="lg:w-1/4 bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <Filter size={20} />
            </div>
            
            <Separator className="my-4" />
            
            <div className="mb-6">
              <h3 className="font-medium mb-3">Price Range</h3>
              <div className="px-2">
                <Slider
                  defaultValue={[priceRange[0], priceRange[1]]}
                  min={0}
                  max={2000}
                  step={10}
                  onValueChange={(value) => setPriceRange(value as [number, number])}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-3">Airlines</h3>
              <div className="space-y-2">
                {Array.from(airlines).map(airline => (
                  <div key={airline} className="flex items-center">
                    <Checkbox 
                      id={`airline-${airline}`}
                      checked={selectedAirlines.has(airline)}
                      onCheckedChange={() => toggleAirline(airline)}
                    />
                    <label htmlFor={`airline-${airline}`} className="ml-2 text-sm">
                      {airline}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-3">Stops</h3>
              <div className="space-y-2">
                {[0, 1, 2].map(stops => (
                  <div key={stops} className="flex items-center">
                    <Checkbox 
                      id={`stops-${stops}`}
                      checked={maxStops >= stops}
                      onCheckedChange={() => setMaxStops(stops)}
                    />
                    <label htmlFor={`stops-${stops}`} className="ml-2 text-sm">
                      {stops === 0 ? 'Non-stop' : stops === 1 ? '1 stop or less' : '2 stops or less'}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Results list */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-lg shadow p-4 mb-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  {filteredFlights.length} {filteredFlights.length === 1 ? 'Flight' : 'Flights'} Found
                </h2>
                <div className="flex items-center">
                  <span className="mr-2 text-sm">Sort by:</span>
                  <select
                    className="text-sm border rounded p-1"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value as 'price' | 'duration' | 'departure')}
                  >
                    <option value="price">Price</option>
                    <option value="duration">Duration</option>
                    <option value="departure">Departure Time</option>
                  </select>
                  <ArrowUpDown className="ml-1" size={16} />
                </div>
              </div>
            </div>
            
            {loading ? (
                <div role="status" className="flex justify-center p-12">
                  <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : error ? (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <h3 className="text-lg font-semibold text-red-600">Error</h3>
                <p className="mt-2">{error}</p>
                <Link to="/">
                  <Button className="mt-4">Return to Search</Button>
                </Link>
              </div>
            ) : filteredFlights.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <h3 className="text-lg font-semibold">No flights found</h3>
                <p className="mt-2">Try adjusting your search criteria</p>
                <Link to="/">
                  <Button className="mt-4">Return to Search</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFlights.map(flight => (
                  <div key={flight.id} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div className="mb-4 md:mb-0">
                        <div className="font-semibold text-lg mb-1">{flight.airline}</div>
                        <div className="text-gray-500 text-sm">Flight {flight.id}</div>
                      </div>
                      
                      <div className="flex-grow mx-4 flex flex-col md:flex-row md:items-center justify-center">
                        <div className="text-center mb-2 md:mb-0 md:mr-6">
                          <div className="font-bold text-xl">{flight.departureTime}</div>
                          <div className="text-gray-500 text-sm">{flight.origin}</div>
                        </div>
                        
                        <div className="flex flex-col items-center mb-2 md:mb-0 md:mx-4">
                          <div className="text-sm text-gray-500">{flight.duration}</div>
                          <div className="relative w-24 h-px bg-gray-300 my-2">
                            <div className="absolute right-0 top-1/2 transform translate-y-[-50%] w-2 h-2 rounded-full bg-gray-500"></div>
                          </div>
                          <div className="text-xs text-gray-500">
                            {flight.stops === 0 ? 'Non-stop' : `${flight.stops} ${flight.stops === 1 ? 'stop' : 'stops'}`}
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <div className="font-bold text-xl">{flight.arrivalTime}</div>
                          <div className="text-gray-500 text-sm">{flight.destination}</div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="font-bold text-xl text-travel-blue">${flight.price}</div>
                        <div className="text-gray-500 text-sm">per person</div>
                        <Button className="mt-2 bg-travel-blue hover:bg-travel-blue-dark text-white">
                          Select
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FlightResults;
