
import { Shield, Clock, CreditCard, Calendar, Award } from 'lucide-react';

const WhyChooseUs = () => {
  const features = [
    {
      icon: <Shield className="w-12 h-12 text-travel-blue" />,
      title: "Secure Booking",
      description: "Your transactions and personal data are protected with industry-standard encryption."
    },
    {
      icon: <Clock className="w-12 h-12 text-travel-blue" />,
      title: "Real-Time Pricing",
      description: "Get access to up-to-the-minute pricing and availability for all travel options."
    },
    {
      icon: <Award className="w-12 h-12 text-travel-blue" />,
      title: "Best Price Guarantee",
      description: "Find a lower price? We'll match it and give you an additional discount."
    },
    {
      icon: <Calendar className="w-12 h-12 text-travel-blue" />,
      title: "Flexible Changes",
      description: "Plans change. Many of our bookings offer free cancellation or date changes."
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-travel-navy mb-3">Why Choose WanderEase</h2>
          <p className="text-travel-gray max-w-2xl mx-auto">We're committed to making your travel planning and booking experience as seamless and rewarding as possible.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6 bg-travel-gray-light rounded-lg transform transition-transform hover:scale-105">
              <div className="mb-4 bg-white p-3 rounded-full shadow-sm">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-travel-navy mb-2">{feature.title}</h3>
              <p className="text-travel-gray">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
