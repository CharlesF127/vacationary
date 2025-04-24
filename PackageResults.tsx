import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Loader2, ArrowLeft, Filter, ArrowUpDown, Star, Clock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { searchPackages, PackageOption } from '@/services/api';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { createPriceAlert } from '@/services/userService';

const PackageResults = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [packages, setPackages] = useState<PackageOption[]>([]);
  const [filteredPackages, setFilteredPackages] = useState<PackageOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [selectedDurations, setSelectedDurations] = useState<Set<string>>(new Set());
  const [selectedRatings, setSelectedRatings] = useState<Set<number>>(new Set());
  const [sortOption, setSortOption] = useState<'price' | 'duration'>('price');

  const origin = searchParams.get('origin') || '';
  const destination = searchParams.get('destination') || '';
  const departDateStr = searchParams.get('departDate') || '';
  const returnDateStr = searchParams.get('returnDate') || '';
  const travelers = parseInt(searchParams.get('travelers') || '2', 10);

  const handleSetAlert = (pkg: PackageOption) => {
    createPriceAlert({
      userId: 'user-1',
      type: 'package',
      origin: pkg.origin,
      destination: pkg.destination,
      maxPrice: pkg.price - 50,
    });

    toast.success('Price alert created!', {
      description: `We'll notify you when packages to ${pkg.destination} drop below $${pkg.price - 50}.`
    });
  };

  useEffect(() => {
    const fetchPackages = async () => {
      if (!origin || !destination || !departDateStr || !returnDateStr) {
        setError('Missing search parameters');
        setLoading(false);
        return;
      }

      try {
        const departDate = new Date(departDateStr);
        const returnDate = new Date(returnDateStr);
        const results = await searchPackages(
          origin,
          destination,
          departDate,
          returnDate,
          travelers
        );

        const durationsSet = new Set<string>();
        let minPrice = Infinity;
        let maxPrice = 0;

        results.forEach(pkg => {
          durationsSet.add(pkg.duration);
          minPrice = Math.min(minPrice, pkg.price);
          maxPrice = Math.max(maxPrice, pkg.price);
        });

        setPackages(results);
        setFilteredPackages(results);
        setPriceRange([minPrice, maxPrice]);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch packages');
        setLoading(false);
      }
    };

    fetchPackages();
  }, [origin, destination, departDateStr, returnDateStr, travelers]);

  useEffect(() => {
    let results = [...packages];
    results = results.filter(pkg => pkg.price >= priceRange[0] && pkg.price <= priceRange[1]);

    if (selectedDurations.size > 0) {
      results = results.filter(pkg => selectedDurations.has(pkg.duration));
    }

    if (selectedRatings.size > 0) {
      results = results.filter(pkg => selectedRatings.has(Math.floor(pkg.hotel.rating)));
    }

    switch (sortOption) {
      case 'price':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'duration':
        results.sort((a, b) => {
          const aDays = parseInt(a.duration.split(' ')[0]);
          const bDays = parseInt(b.duration.split(' ')[0]);
          return aDays - bDays;
        });
        break;
    }

    setFilteredPackages(results);
  }, [packages, priceRange, selectedDurations, selectedRatings, sortOption]);

  const toggleDuration = (d: string) => {
    const updated = new Set(selectedDurations);
    updated.has(d) ? updated.delete(d) : updated.add(d);
    setSelectedDurations(updated);
  };

  const toggleRating = (r: number) => {
    const updated = new Set(selectedRatings);
    updated.has(r) ? updated.delete(r) : updated.add(r);
    setSelectedRatings(updated);
  };

  const getAllDurations = () => {
    const set = new Set<string>();
    packages.forEach(pkg => set.add(pkg.duration));
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
          <h1 className="text-2xl font-bold">Vacation Packages: {origin} to {destination}</h1>
        </div>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters */}
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
                  max={3000}
                  step={50}
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
              <h3 className="font-medium mb-3">Duration</h3>
              <div className="space-y-2">
                {getAllDurations().sort().map((d) => (
                  <div key={d} className="flex items-center">
                    <Checkbox id={`duration-${d}`} checked={selectedDurations.has(d)} onCheckedChange={() => toggleDuration(d)} />
                    <label htmlFor={`duration-${d}`} className="ml-2 text-sm">{d}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <h3 className="font-medium mb-3">Hotel Rating</h3>
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
          </div>

          {/* Results */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-lg shadow p-4 mb-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">{filteredPackages.length} {filteredPackages.length === 1 ? 'Package' : 'Packages'} Found</h2>
                <div className="flex items-center">
                  <span className="mr-2 text-sm">Sort by:</span>
                  <select className="text-sm border rounded p-1" value={sortOption} onChange={(e) => setSortOption(e.target.value as any)}>
                    <option value="price">Price</option>
                    <option value="duration">Duration</option>
                  </select>
                  <ArrowUpDown className="ml-1" size={16} />
                </div>
              </div>
            </div>
            {loading ? (
              <div className="flex justify-center p-12" role="status">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : error ? (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <h3 className="text-lg font-semibold text-red-600">Error</h3>
                <p className="mt-2">{error}</p>
                <Link to="/"><Button className="mt-4">Return to Search</Button></Link>
              </div>
            ) : filteredPackages.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <h3 className="text-lg font-semibold">No packages found</h3>
                <p className="mt-2">Try adjusting your search criteria</p>
                <Link to="/"><Button className="mt-4">Return to Search</Button></Link>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredPackages.map((pkg) => (
                  <Card key={pkg.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="flex-1 p-4">
                      <div className="flex flex-col h-full justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="text-xl font-bold">{pkg.name}</h3>
                            <Badge variant="outline" className="flex items-center">
                              <Clock size={14} className="mr-1" /> {pkg.duration}
                            </Badge>
                          </div>
                          <p className="text-gray-600 mb-3">{pkg.destination}</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                            <div className="flex items-center space-x-2">
                              <div className="text-sm font-medium">Hotel:</div>
                              <div className="text-sm text-gray-600 flex items-center">
                                {pkg.hotel.name}
                                <span className="flex ml-1">
                                  {Array(Math.floor(pkg.hotel.rating)).fill(0).map((_, i) => (
                                    <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />
                                  ))}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="text-sm font-medium">Flight:</div>
                              <div className="text-sm text-gray-600">
                                {pkg.flight.airline}
                                {pkg.flight.stops === 0 ? ' (Non-stop)' : ` (${pkg.flight.stops} ${pkg.flight.stops === 1 ? 'stop' : 'stops'})`}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-between items-end mt-auto">
                          <div>
                            <div className="font-bold text-xl text-travel-blue">${pkg.price}</div>
                            <div className="text-gray-500 text-sm">per person</div>
                            <button onClick={() => handleSetAlert(pkg)} className="text-travel-blue text-sm hover:underline mt-1">
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

export default PackageResults;
