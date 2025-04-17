
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface DestinationCardProps {
  image: string;
  name: string;
  description: string;
  price: string;
  discount?: string;
  isPopular?: boolean;
}

const DestinationCard = ({ image, name, description, price, discount, isPopular }: DestinationCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
      <div className="relative w-full h-48">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
        />
        {discount && (
          <Badge className="absolute top-3 left-3 bg-travel-blue text-white">
            {discount} OFF
          </Badge>
        )}
        {isPopular && (
          <Badge className="absolute top-3 right-3 bg-travel-teal text-white">
            Popular
          </Badge>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg text-travel-navy">{name}</h3>
        <p className="text-travel-gray text-sm mt-1">{description}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-travel-blue font-bold">{price}</span>
          <span className="text-xs text-travel-gray">per person</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default DestinationCard;
