
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import SearchTabs from '@/components/SearchTabs';
import PopularDestinations from '@/components/PopularDestinations';
import PriceAlertSection from '@/components/PriceAlertSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import Footer from '@/components/Footer';
import { ChevronDown } from 'lucide-react';

const Index = () => {
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setShowScrollIndicator(false);
    } else {
      setShowScrollIndicator(true);
    }
  };

  // Add scroll event listener using useEffect correctly
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to content
  const scrollToContent = () => {
    const contentSection = document.getElementById('content-section');
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-section relative h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
            Travel <span className="text-travel-teal-light">Without</span> Limits
          </h1>
          <p className="text-xl text-white max-w-3xl mx-auto mb-10 animate-slide-up">
            Explore the world with ease. Find and book flights, hotels, and vacation packages all in one place.
          </p>
          <SearchTabs />
        </div>
        
        {/* Scroll down indicator */}
        {showScrollIndicator && (
          <div 
            className="absolute bottom-10 left-0 right-0 flex flex-col items-center animate-bounce cursor-pointer"
            onClick={scrollToContent}
          >
            <span className="text-white text-sm mb-2">Explore More</span>
            <ChevronDown className="h-6 w-6 text-white" />
          </div>
        )}
      </section>
      
      {/* Main Content */}
      <main id="content-section">
        <PopularDestinations />
        <WhyChooseUs />
        <PriceAlertSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
