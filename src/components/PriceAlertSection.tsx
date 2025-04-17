
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Bell, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

const PriceAlertSection = () => {
  const [email, setEmail] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }
    
    toast.success("Price alert set!", {
      description: "We'll notify you when prices drop."
    });
    
    setEmail('');
  };
  
  return (
    <section className="bg-travel-gray-light py-16 px-4">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <div className="inline-flex items-center justify-center w-12 h-12 mb-4 bg-travel-blue/10 rounded-full">
                <Bell size={24} className="text-travel-blue" />
              </div>
              <h2 className="text-2xl font-bold text-travel-navy mb-3">Never Miss a Deal</h2>
              <p className="text-travel-gray max-w-md">
                Set up price alerts for your favorite destinations and be the first to know when fares drop.
              </p>
            </div>
            
            <div className="w-full md:w-auto space-y-4">
              <form onSubmit={handleSubmit} className="mb-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email" className="text-travel-navy">Your Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className="mt-1 w-full md:w-72"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <Button 
                    type="submit"
                    className="w-full md:w-auto bg-travel-blue hover:bg-travel-blue-dark"
                  >
                    Set Quick Alert
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </div>
              </form>
              
              <div className="text-center">
                <Link to="/create-alert">
                  <Button variant="outline" className="w-full">
                    Create Custom Alert
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PriceAlertSection;
