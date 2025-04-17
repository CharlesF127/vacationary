
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FlightSearchForm from './FlightSearchForm';
import HotelSearchForm from './HotelSearchForm';
import PackageSearchForm from './PackageSearchForm';

const SearchTabs = () => {
  const [activeTab, setActiveTab] = useState('flights');

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg p-6 animate-fade-in">
        <Tabs defaultValue="flights" onValueChange={setActiveTab} value={activeTab}>
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="flights" className="text-base">Flights</TabsTrigger>
            <TabsTrigger value="hotels" className="text-base">Hotels</TabsTrigger>
            <TabsTrigger value="packages" className="text-base">Packages</TabsTrigger>
          </TabsList>
          <TabsContent value="flights">
            <FlightSearchForm />
          </TabsContent>
          <TabsContent value="hotels">
            <HotelSearchForm />
          </TabsContent>
          <TabsContent value="packages">
            <PackageSearchForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};


export default SearchTabs;
