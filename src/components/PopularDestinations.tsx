
import { useState } from 'react';
import DestinationCard from './DestinationCard';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

// Mock data for popular destinations
const destinations = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    name: 'Paris, France',
    description: 'The city of lights and romance',
    price: '$699',
    discount: '15%',
    isPopular: true
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    name: 'Dubai, UAE',
    description: 'Experience luxury in the desert',
    price: '$899',
    isPopular: true
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    name: 'Santorini, Greece',
    description: 'Stunning views of the Mediterranean',
    price: '$799',
    discount: '10%'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=1173&q=80',
    name: 'Rome, Italy',
    description: 'Ancient history and delicious cuisine',
    price: '$749',
    isPopular: true
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1600454309261-3dc9b7597637?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    name: 'Bali, Indonesia',
    description: 'Paradise beaches and spiritual temples',
    price: '$899',
    discount: '20%'
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1493306454986-c8877a09cbeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1171&q=80',
    name: 'Kyoto, Japan',
    description: 'Traditional culture and beautiful gardens',
    price: '$1099'
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1500964757637-c85e8a162699?ixlib=rb-4.0.3&auto=format&fit=crop&w=1078&q=80',
    name: 'Reykjavik, Iceland',
    description: 'Northern lights and natural wonders',
    price: '$999',
    isPopular: true
  },
  {
    id: 8,
    image: 'https://images.unsplash.com/photo-1558642084-fd07fae5282e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    name: 'Cape Town, South Africa',
    description: 'Stunning coastlines and diverse wildlife',
    price: '$849',
    discount: '12%'
  }
];

const PopularDestinations = () => {
  const [visibleDestinations, setVisibleDestinations] = useState(4);
  
  const loadMore = () => {
    setVisibleDestinations((prev) => Math.min(prev + 4, destinations.length));
  };

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-travel-navy">Popular Destinations</h2>
            <p className="text-travel-gray mt-2">Explore our most sought-after vacation spots</p>
          </div>
          <Button variant="link" className="text-travel-blue flex items-center">
            View All <ChevronRight size={16} className="ml-1" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.slice(0, visibleDestinations).map((destination) => (
            <DestinationCard
              key={destination.id}
              image={destination.image}
              name={destination.name}
              description={destination.description}
              price={destination.price}
              discount={destination.discount}
              isPopular={destination.isPopular}
            />
          ))}
        </div>
        
        {visibleDestinations < destinations.length && (
          <div className="flex justify-center mt-8">
            <Button 
              onClick={loadMore}
              variant="outline" 
              className="border-travel-blue text-travel-blue hover:bg-travel-blue/10"
            >
              Load More Destinations
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularDestinations;
