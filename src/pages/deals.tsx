import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { toast } from 'sonner';

interface Deal {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  discount?: string;
  couponCode?: string;
}

const mockDeals: Deal[] = [
  {
    id: 'deal-1',
    title: 'Summer Flight Sale',
    description: 'Save up to 30% on select flights this summer!',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    link: '/flights',
    discount: '30%',
  },
  {
    id: 'deal-2',
    title: 'Hotel Getaway Discount',
    description: 'Get 20% off your next hotel booking.',
    image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    link: '/hotels',
    discount: '20%',
  },
  {
    id: 'deal-3',
    title: 'Adventure Package Deal',
    description: 'Book an adventure package and receive a $50 discount.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    link: '/packages',
    discount: '$50',
  },
  {
    id: 'coupon-1',
    title: 'Extra 10% Off Flights',
    description: 'Use this coupon code at checkout for an additional 10% off flights.',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    link: '/flights',
    couponCode: 'FLY10',
  },
  {
    id: 'coupon-2',
    title: 'Free Upgrade on Hotel Stay',
    description: 'Apply this code to get a free room upgrade on your hotel booking.',
    image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    link: '/hotels',
    couponCode: 'UPGRADE',
  },
  {
    id: 'coupon-3',
    title: 'Hotel Stay 15% Off',
    description: 'Use this coupon for 15% off on 3+ night hotel stays.',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    link: '/hotels',
    couponCode: 'STAY15',
  },
  {
    id: 'coupon-4',
    title: 'Bundle & Save: Hotel + Flights',
    description: 'Save 10% when booking both hotel and flight together.',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    link: '/packages',
    couponCode: 'BUNDLE10',
  },
];


const DealsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [deals, setDeals] = useState(mockDeals);
  const [filteredDeals, setFilteredDeals] = useState(mockDeals);

  useEffect(() => {
    const results = deals.filter((deal) =>
      deal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deal.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (deal.couponCode && deal.couponCode.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredDeals(results);
  }, [searchTerm, deals]);

  const getCategory = (link: string) => {
    if (link.includes('hotels')) return 'Hotel';
    if (link.includes('flights')) return 'Flight';
    if (link.includes('packages')) return 'Package';
    return 'Other';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 py-12 flex-grow">
        <div className="mb-8 flex items-center">
          <Input
            type="text"
            placeholder="Search deals and coupons"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/2 mr-4"
          />
          <Button>
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div>

        <Tabs defaultValue="deals">
          <TabsList className="w-full justify-center mb-6">
            <TabsTrigger value="deals">Deals</TabsTrigger>
            <TabsTrigger value="coupons">Coupons</TabsTrigger>
          </TabsList>

          {/* Deals */}
          <TabsContent
            value="deals"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredDeals.filter(d => !d.couponCode).length === 0 ? (
              <p className="text-center text-gray-500 col-span-full">No deals found.</p>
            ) : (
              filteredDeals
                .filter(d => !d.couponCode)
                .map(deal => (
                  <Card key={deal.id} className="rounded-xl shadow-md hover:shadow-lg transition">
                    <img
                      src={deal.image}
                      alt={deal.title}
                      className="rounded-t-xl h-48 w-full object-cover"
                    />
                    <CardHeader className="pb-1 pt-4">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">{deal.title}</CardTitle>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {getCategory(deal.link)}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-gray-600">{deal.description}</p>
                      {deal.discount && (
                        <div className="bg-yellow-100 text-yellow-800 font-bold text-sm px-3 py-1 rounded-md w-fit">
                          {deal.discount} Off
                        </div>
                      )}
                      <Button asChild className="w-full mt-2">
                        <a href={deal.link} target="_blank" rel="noopener noreferrer">
                          View Deal
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))
            )}
          </TabsContent>

          {/* Coupons */}
          <TabsContent
            value="coupons"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredDeals.filter(d => d.couponCode).length === 0 ? (
              <p className="text-center text-gray-500 col-span-full">No coupons found.</p>
            ) : (
              filteredDeals
                .filter(d => d.couponCode)
                .map(deal => (
                  <Card key={deal.id} className="rounded-xl shadow-md border-dashed border-blue-400 hover:shadow-lg transition">
                    <img
                      src={deal.image}
                      alt={deal.title}
                      className="rounded-t-xl h-48 w-full object-cover"
                    />
                    <CardHeader className="pb-1 pt-4">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">{deal.title}</CardTitle>
                        <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                          {getCategory(deal.link)}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-gray-600">{deal.description}</p>
                      <div className="bg-gray-100 border border-gray-300 rounded-md p-2 flex justify-between items-center">
                        <span className="font-mono text-sm text-blue-800">{deal.couponCode}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            navigator.clipboard.writeText(deal.couponCode!);
                            toast.success('Copied!');
                          }}
                        >
                          Copy
                        </Button>
                      </div>
                      <Button asChild className="w-full mt-2">
                        <a href={deal.link} target="_blank" rel="noopener noreferrer">
                          Apply Coupon
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))
            )}
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default DealsPage;
