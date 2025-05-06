import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, User, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check for sign-in status on initial load
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setIsSignedIn(true);
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const handleSignIn = () => {
    localStorage.setItem('user', JSON.stringify({ name: "user", signedIn: true }));
    setIsSignedIn(true);
    toast({
      title: 'Signed In',
      description: 'You are now signed in as Guest User.',
    });
  };

  const handleSignOut = () => {
    localStorage.removeItem('user');
    setIsSignedIn(false);
    toast({
      title: 'Signed Out',
      description: 'You have been signed out.',
    });
  };

  const handleDeals = () => {
    navigate('/deals');
    setIsMenuOpen(false); // optional: close mobile menu if open
  };
  const handleCreateAlert = () => {
    navigate('/create-alert');
    setIsMenuOpen(false); // optional: close mobile menu if open  
  };

  const handleProfile = () => {
    navigate('/profile');
    setIsMenuOpen(false); // optional: close mobile menu if open
  };
  const handleFlightResults = () => {
    navigate('/flight-results');
    setIsMenuOpen(false); // optional: close mobile menu if open
  };
  const handleHotelResults = () => {
    navigate('/hotel-results');
    setIsMenuOpen(false); // optional: close mobile menu if open    

  };
  const handlePackageResults = () => {
    navigate('/package-results');
    setIsMenuOpen(false); // optional: close mobile menu if open
  };     

  

  return (
    <nav className="bg-white shadow-sm py-3 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="bg-travel-blue rounded-full p-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-white">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                <path d="M14.05 2a9 9 0 018 7.94M14.05 6a5 5 0 015 4.95" />
              </svg>
            </span>
            <h1 className="text-2xl font-bold text-travel-navy">VACATIONARY</h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex space-x-6">
            <NavLink onClick={() => handleNavigation('/flight-results')} label="Flights" />
            <NavLink onClick={() => handleNavigation('/hotel-results')} label="Hotels" />
            <NavLink onClick={() => handleNavigation('/package-results')} label="Packages" />
            <NavLink onClick={() => handleNavigation('/deals')} label="Deals"  />
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => navigate('/create-alert')}
            >
              <Bell size={18} className="text-travel-gray" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => navigate('/profile')}
            >
              <User size={18} className="text-travel-gray" />
            </Button>
            
              <Button className="bg-red-500 hover:bg-red-600 text-white" onClick={() => navigate('/signin')}>
                Sign In
                
              </Button>
           
  
            
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-travel-navy" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white w-full py-4 shadow-md animate-fade-in">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <MobileNavLink onClick={() => handleNavigation('/flight-results')} label="Flights" />
            <MobileNavLink onClick={() => handleNavigation('/hotel-results')} label="Hotels" />
            <MobileNavLink onClick={() => handleNavigation('/package-results')} label="Packages" />
            <MobileNavLink onClick={handleDeals} label="Deals" />
            <div className="pt-4 border-t">
              {isSignedIn ? (
                <Button className="w-full bg-red-500 hover:bg-red-600 text-white" onClick={handleSignOut}>
                  Sign Out
                </Button>
              ) : (
                <Button className="w-full bg-travel-blue hover:bg-travel-blue-dark text-white" onClick={handleSignIn}>
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLink = ({
  onClick,
  label,
  hasDropdown = false,
}: {
  onClick: () => void;
  label: string;
  hasDropdown?: boolean;
}) => (
  <button
    onClick={onClick}
    className="text-travel-navy font-medium hover:text-travel-blue transition-colors flex items-center"
  >
    {label}
    {hasDropdown && <ChevronDown size={16} className="ml-1" />}
  </button>
);

const MobileNavLink = ({ onClick, label }: { onClick: () => void; label: string }) => (
  <button
    onClick={onClick}
    className="text-travel-navy font-medium py-2 hover:text-travel-blue transition-colors block w-full text-left"
  >
    {label}
  </button>
);

export default Navbar;
