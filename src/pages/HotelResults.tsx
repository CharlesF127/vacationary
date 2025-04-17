import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Loader2, ArrowLeft, Filter, ArrowUpDown, Star } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { searchHotels, HotelOption } from '@/services/api';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { createPriceAlert } from '@/services/userService';

const HotelResults = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [hotels, setHotels] = useState<HotelOption[]>([]);
  const [filteredHotels, setFilteredHotels] = useState<HotelOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [selectedRatings, setSelectedRatings] = useState<Set<number>>(new Set());
  const [selectedAmenities, setSelectedAmenities] = useState<Set<string>>(new Set());
  const [sortOption, setSortOption] = useState<'price' | 'rating'>('price');

  const destination = searchParams.get('destination') || '';
  const checkInStr = searchParams.get('checkIn') || '';
  const checkOutStr = searchParams.get('checkOut') || '';
  const rooms = parseInt(searchParams.get('rooms') || '1', 10);
  const guests = parseInt(searchParams.get('guests') || '2', 10);

  const handleSetAlert = (hotel: HotelOption) => {
    createPriceAlert({
      userId: 'user-1',
      type: 'hotel',
      destination: hotel.location,
      maxPrice: hotel.price - 10,
    });

    toast.success('Price alert created!', {
      description: `We'll notify you when hotels in ${hotel.location} drop below $${hotel.price - 10}.`,
    });
  };

  useEffect(() => {
    const fetchHotels = async () => {
      if (!destination || !checkInStr || !checkOutStr) {
        setError('Missing search parameters');
        setLoading(false);
        return;
      }

      try {
        const checkIn = new Date(checkInStr);
        const checkOut = new Date(checkOutStr);
        const results = await searchHotels(destination, checkIn, checkOut, rooms, guests);

        const amenitiesSet = new Set<string>();
        let minPrice = Infinity;
        let maxPrice = 0;

        results.forEach((hotel) => {
          hotel.amenities.forEach((amenity) => amenitiesSet.add(amenity));
          minPrice = Math.min(minPrice, hotel.price);
          maxPrice = Math.max(maxPrice, hotel.price);
        });

        setHotels(results);
        setFilteredHotels(results);
        setPriceRange([minPrice, maxPrice]);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch hotels');
        setLoading(false);
      }
    };

    fetchHotels();
  }, [destination, checkInStr, checkOutStr, rooms, guests]);

  useEffect(() => {
    let results = [...hotels];
    results = results.filter((hotel) => hotel.price >= priceRange[0] && hotel.price <= priceRange[1]);

    if (selectedRatings.size > 0) {
      results = results.filter((hotel) => selectedRatings.has(Math.floor(hotel.rating)));
    }

    if (selectedAmenities.size > 0) {
      results = results.filter((hotel) => hotel.amenities.some((a) => selectedAmenities.has(a)));
    }

    switch (sortOption) {
      case 'price':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'rating':
        results.sort((a, b) => b.rating - a.rating);
        break;
    }

    setFilteredHotels(results);
  }, [hotels, priceRange, selectedRatings, selectedAmenities, sortOption]);

  const toggleRating = (rating: number) => {
    const updated = new Set(selectedRatings);
    updated.has(rating) ? updated.delete(rating) : updated.add(rating);
    setSelectedRatings(updated);
  };

  const toggleAmenity = (amenity: string) => {
    const updated = new Set(selectedAmenities);
    updated.has(amenity) ? updated.delete(amenity) : updated.add(amenity);
    setSelectedAmenities(updated);
  };

  const getAllAmenities = () => {
    const set = new Set<string>();
    hotels.forEach((h) => h.amenities.forEach((a) => set.add(a)));
    return Array.from(set);
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
          <h1 className="text-2xl font-bold">Hotels in {destination}</h1>
        </div>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/4 bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <Filter size={20} />
            </div>
            <Separator className="my-4" />
            <div className="mb-6">
              <h3 className="font-medium mb-3">Price Per Night</h3>
              <div className="px-2">
                <Slider
                  defaultValue={[priceRange[0], priceRange[1]]}
                  min={0}
                  max={1000}
                  step={10}
                  onValueChange={(val) => setPriceRange(val as [number, number])}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <h3 className="font-medium mb-3">Star Rating</h3>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((r) => (
                  <div key={r} className="flex items-center">
                    <Checkbox id={`rating-${r}`} checked={selectedRatings.has(r)} onCheckedChange={() => toggleRating(r)} />
                    <label htmlFor={`rating-${r}`} className="ml-2 text-sm flex items-center">
                      {Array(r).fill(0).map((_, i) => <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />)}
                      {Array(5 - r).fill(0).map((_, i) => <Star key={i} size={16} className="text-gray-300" />)}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <h3 className="font-medium mb-3">Amenities</h3>
              <div className="space-y-2">
                {getAllAmenities().map((a) => (
                  <div key={a} className="flex items-center">
                    <Checkbox id={`amenity-${a}`} checked={selectedAmenities.has(a)} onCheckedChange={() => toggleAmenity(a)} />
                    <label htmlFor={`amenity-${a}`} className="ml-2 text-sm">{a}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:w-3/4">
            <div className="bg-white rounded-lg shadow p-4 mb-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">{filteredHotels.length} {filteredHotels.length === 1 ? 'Hotel' : 'Hotels'} Found</h2>
                <div className="flex items-center">
                  <span className="mr-2 text-sm">Sort by:</span>
                  <select className="text-sm border rounded p-1" value={sortOption} onChange={(e) => setSortOption(e.target.value as any)}>
                    <option value="price">Price</option>
                    <option value="rating">Rating</option>
                  </select>
                  <ArrowUpDown className="ml-1" size={16} />
                </div>
              </div>
            </div>
            {loading ? (
              <div className="flex justify-center p-12">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : error ? (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <h3 className="text-lg font-semibold text-red-600">Error</h3>
                <p className="mt-2">{error}</p>
                <Link to="/"><Button className="mt-4">Return to Search</Button></Link>
              </div>
            ) : filteredHotels.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <h3 className="text-lg font-semibold">No hotels found</h3>
                <p className="mt-2">Try adjusting your search criteria</p>
                <Link to="/"><Button className="mt-4">Return to Search</Button></Link>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredHotels.map((hotel) => (
                  <Card key={hotel.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex flex-col h-full justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-bold">{hotel.name}</h3>
                            <div className="flex items-center">
                              <span className="font-bold mr-1">{hotel.rating.toFixed(1)}</span>
                              <Star size={16} className="text-yellow-400 fill-yellow-400" />
                            </div>
                          </div>
                          <p className="text-gray-600 mb-2">{hotel.location}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {hotel.amenities.slice(0, 4).map((a, i) => (
                              <span key={i} className="bg-travel-blue/10 text-travel-blue px-2 py-1 rounded-full text-xs">{a}</span>
                            ))}
                            {hotel.amenities.length > 4 && (
                              <span className="text-xs text-gray-500 flex items-center">
                                +{hotel.amenities.length - 4} more
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-between items-end mt-auto">
                          <div>
                            <div className="font-bold text-xl text-travel-blue">${hotel.price}</div>
                            <div className="text-gray-500 text-sm">per night</div>
                            <button onClick={() => handleSetAlert(hotel)} className="text-travel-blue text-sm hover:underline mt-1">
                              Set Price Alert
                            </button>
                          </div>
                          <div className="mt-3 sm:mt-0">
                            <Button className="bg-travel-blue hover:bg-travel-blue-dark text-white">View Deal</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
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

export default HotelResults;
