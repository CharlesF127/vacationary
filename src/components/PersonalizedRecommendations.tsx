
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getCurrentUser } from '@/services/userService';
import { FlightOption, HotelOption, PackageOption, searchFlights, searchHotels, searchPackages } from '@/services/api';
import { toast } from 'sonner';

interface RecommendationProps {
  type?: 'flights' | 'hotels' | 'packages' | 'all';
  limit?: number;
}

const PersonalizedRecommendations: React.FC<RecommendationProps> = ({ 
  type = 'all', 
  limit = 3
}) => {
  const [user, setUser] = useState(getCurrentUser());
  const [recommendedFlights, setRecommendedFlights] = useState<FlightOption[]>([]);
  const [recommendedHotels, setRecommendedHotels] = useState<HotelOption[]>([]);
  const [recommendedPackages, setRecommendedPackages] = useState<PackageOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        // Fetch data based on user preferences
        if (user) {
          // Get destinations based on user's favorite destinations
          const destination = user.preferences.favoriteDestinations[
            Math.floor(Math.random() * user.preferences.favoriteDestinations.length)
          ];
          
          const origin = "San Francisco"; // Default origin
          const departDate = new Date();
          departDate.setDate(departDate.getDate() + 30); // Set to 30 days from now
          const returnDate = new Date(departDate);
          returnDate.setDate(returnDate.getDate() + 7); // Set to 7 days after departure
          
          // Only fetch the types we need based on the "type" prop
          const promises = [];
          
          if (type === 'all' || type === 'flights') {
            promises.push(
              searchFlights(origin, destination, departDate).then(flights => {
                // Filter by preferred airlines if any
                if (user.preferences.preferredAirlines.length > 0) {
                  flights = flights.filter(flight => 
                    user.preferences.preferredAirlines.includes(flight.airline)
                  );
                }
                // Filter by price range
                flights = flights.filter(flight => 
                  flight.price >= user.preferences.priceRange.min && 
                  flight.price <= user.preferences.priceRange.max
                );
                setRecommendedFlights(flights.slice(0, limit));
              })
            );
          }
          
          if (type === 'all' || type === 'hotels') {
            promises.push(
              searchHotels(destination, departDate, returnDate).then(hotels => {
                // Filter by preferred hotel chains if any
                if (user.preferences.preferredHotelChains.length > 0) {
                  hotels = hotels.filter(hotel => 
                    user.preferences.preferredHotelChains.includes(hotel.name)
                  );
                }
                // Filter by price range
                hotels = hotels.filter(hotel => 
                  hotel.price >= user.preferences.priceRange.min && 
                  hotel.price <= user.preferences.priceRange.max
                );
                setRecommendedHotels(hotels.slice(0, limit));
              })
            );
          }
          
          if (type === 'all' || type === 'packages') {
            promises.push(
              searchPackages(origin, destination, departDate, returnDate).then(packages => {
                // Filter by price range
                packages = packages.filter(pkg => 
                  pkg.price >= user.preferences.priceRange.min && 
                  pkg.price <= user.preferences.priceRange.max
                );
                setRecommendedPackages(packages.slice(0, limit));
              })
            );
          }
          
          await Promise.all(promises);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
        setLoading(false);
      }
    };
    
    fetchRecommendations();
  }, [user, type, limit]);
  
  const toggleFavorite = (id: string) => {
    const updatedFavorites = new Set(favorites);
    if (updatedFavorites.has(id)) {
      updatedFavorites.delete(id);
      toast.info('Removed from favorites');
    } else {
      updatedFavorites.add(id);
      toast.success('Added to favorites');
    }
    setFavorites(updatedFavorites);
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-48">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-travel-blue"></div>
      </div>
    );
  }
  
  if (!user) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="mb-4">Sign in to see personalized recommendations based on your preferences.</p>
          <Button>Sign In</Button>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="space-y-8">
      {/* Flight recommendations */}
      {(type === 'all' || type === 'flights') && recommendedFlights.length > 0 && (
        <div>
          <h3 className="text-xl font-bold mb-4">Recommended Flights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendedFlights.map(flight => (
              <Card key={flight.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold">{flight.airline}</h4>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8" 
                      onClick={() => toggleFavorite(flight.id)}
                    >
                      <Heart 
                        size={18} 
                        className={favorites.has(flight.id) ? "fill-red-500 text-red-500" : ""} 
                      />
                    </Button>
                  </div>
                  
                  <div className="text-sm text-gray-500 mb-3">Flight {flight.id}</div>
                  
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-center">
                      <div className="font-bold">{flight.departureTime}</div>
                      <div className="text-sm text-gray-500">{flight.origin}</div>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <div className="text-xs text-gray-500">{flight.duration}</div>
                      <div className="relative w-16 h-px bg-gray-300 my-1">
                        <div className="absolute right-0 top-1/2 transform translate-y-[-50%] w-1.5 h-1.5 rounded-full bg-gray-500"></div>
                      </div>
                      <div className="text-xs text-gray-500">
                        {flight.stops === 0 ? 'Non-stop' : `${flight.stops} ${flight.stops === 1 ? 'stop' : 'stops'}`}
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="font-bold">{flight.arrivalTime}</div>
                      <div className="text-sm text-gray-500">{flight.destination}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="font-bold text-travel-blue">${flight.price}</div>
                      <div className="text-xs text-gray-500">per person</div>
                    </div>
                    <Button size="sm" className="bg-travel-blue hover:bg-travel-blue-dark">
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
      
      {/* Hotel recommendations */}
      {(type === 'all' || type === 'hotels') && recommendedHotels.length > 0 && (
        <div>
          <h3 className="text-xl font-bold mb-4">Recommended Hotels</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendedHotels.map(hotel => (
              <Card key={hotel.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative h-36 bg-gray-200">
                  <img 
                    src={hotel.image || '/hotel1.jpg'} 
                    alt={hotel.name}
                    className="w-full h-full object-cover"
                  />
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-2 right-2 h-8 w-8 bg-white/80 hover:bg-white" 
                    onClick={() => toggleFavorite(hotel.id)}
                  >
                    <Heart 
                      size={18} 
                      className={favorites.has(hotel.id) ? "fill-red-500 text-red-500" : ""} 
                    />
                  </Button>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold">{hotel.name}</h4>
                    <div className="flex items-center">
                      <span className="text-sm mr-1">{hotel.rating.toFixed(1)}</span>
                      <Star size={14} className="text-yellow-400 fill-yellow-400" />
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600 mb-2">{hotel.location}</div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {hotel.amenities.slice(0, 3).map((amenity, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                    {hotel.amenities.length > 3 && (
                      <span className="text-xs text-gray-500">+{hotel.amenities.length - 3} more</span>
                    )}
                  </div>
                  
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="font-bold text-travel-blue">${hotel.price}</div>
                      <div className="text-xs text-gray-500">per night</div>
                    </div>
                    <Button size="sm" className="bg-travel-blue hover:bg-travel-blue-dark">
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
      
      {/* Package recommendations */}
      {(type === 'all' || type === 'packages') && recommendedPackages.length > 0 && (
        <div>
          <h3 className="text-xl font-bold mb-4">Recommended Packages</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendedPackages.map(packageItem => (
              <Card key={packageItem.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative h-36 bg-gray-200">
                  <img 
                    src={packageItem.image || '/package1.jpg'} 
                    alt={packageItem.name}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-2 left-2 bg-travel-blue">{packageItem.duration}</Badge>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-2 right-2 h-8 w-8 bg-white/80 hover:bg-white" 
                    onClick={() => toggleFavorite(packageItem.id)}
                  >
                    <Heart 
                      size={18} 
                      className={favorites.has(packageItem.id) ? "fill-red-500 text-red-500" : ""} 
                    />
                  </Button>
                </div>
                <CardContent className="p-4">
                  <h4 className="font-bold mb-1">{packageItem.name}</h4>
                  <div className="text-sm text-gray-600 mb-3">{packageItem.destination}</div>
                  
                  <div className="space-y-1 mb-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Hotel:</span>
                      <span>{packageItem.hotel.name} ({packageItem.hotel.rating.toFixed(1)}★)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Flight:</span>
                      <span>{packageItem.flight.airline}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="font-bold text-travel-blue">${packageItem.price}</div>
                      <div className="text-xs text-gray-500">per person</div>
                    </div>
                    <Button size="sm" className="bg-travel-blue hover:bg-travel-blue-dark">
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
      
      {recommendedFlights.length === 0 && recommendedHotels.length === 0 && recommendedPackages.length === 0 && (
        <Card>
          <CardContent className="p-6">
            <p className="text-center mb-4">
              We couldn't find any recommendations based on your preferences. 
              Try updating your profile preferences.
            </p>
            <div className="flex justify-center">
              <Link to="/profile">
                <Button>Update Preferences</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PersonalizedRecommendations;
