
import { useState } from 'react';
import { 
  CreditCard, 
  LockKeyhole, 
  Check,
  Calendar,
  User,
  MapPin 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { toast } from 'sonner';

interface PaymentGatewayProps {
  amount: number;
  description: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const PaymentGateway: React.FC<PaymentGatewayProps> = ({ 
  amount, 
  description,
  onSuccess,
  onCancel 
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'credit' | 'paypal' | 'apple'>('credit');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [billingAddress, setBillingAddress] = useState('');
  const [zipCode, setZipCode] = useState('');
  
  const formatCardNumber = (value: string) => {
    // Remove non-digit characters
    const digits = value.replace(/\D/g, '');
    // Add space after every 4 digits
    const formatted = digits.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
    // Limit to 19 characters (16 digits + 3 spaces)
    return formatted.substring(0, 19);
  };
  
  const formatExpiryDate = (value: string) => {
    // Remove non-digit characters
    const digits = value.replace(/\D/g, '');
    // Format as MM/YY
    if (digits.length > 2) {
      return `${digits.substring(0, 2)}/${digits.substring(2, 4)}`;
    }
    return digits;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (paymentMethod === 'credit') {
      if (!cardNumber || !expiryDate || !cvv || !name || !billingAddress || !zipCode) {
        toast.error('Please fill in all required fields');
        return;
      }
      
      if (cardNumber.replace(/\s/g, '').length !== 16) {
        toast.error('Please enter a valid card number');
        return;
      }
      
      if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
        toast.error('Please enter a valid expiry date (MM/YY)');
        return;
      }
      
      if (!/^\d{3,4}$/.test(cvv)) {
        toast.error('Please enter a valid CVV');
        return;
      }
    }
    
    setLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      toast.success('Payment successful!', {
        description: 'Your booking has been confirmed.'
      });
      if (onSuccess) onSuccess();
    }, 2000);
  };
  
  const handleCancel = () => {
    if (onCancel) onCancel();
  };
  
  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            <LockKeyhole className="mr-2" size={24} />
            Secure Payment
          </CardTitle>
          <CardDescription>
            Your payment information is encrypted and secure
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <Label className="text-lg font-medium mb-3 block">Payment Method</Label>
                  <RadioGroup 
                    value={paymentMethod} 
                    onValueChange={(value) => setPaymentMethod(value as 'credit' | 'paypal' | 'apple')}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2 border rounded-md p-3">
                      <RadioGroupItem value="credit" id="credit" />
                      <Label htmlFor="credit" className="flex items-center cursor-pointer">
                        <CreditCard className="mr-2" size={20} />
                        Credit or Debit Card
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-md p-3">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal" className="cursor-pointer">PayPal</Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-md p-3">
                      <RadioGroupItem value="apple" id="apple" />
                      <Label htmlFor="apple" className="cursor-pointer">Apple Pay</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                {paymentMethod === 'credit' && (
                  <>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <div className="relative">
                          <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            className="pl-10"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate">Expiry Date</Label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            <Input
                              id="expiryDate"
                              placeholder="MM/YY"
                              className="pl-10"
                              value={expiryDate}
                              onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            maxLength={4}
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="name">Cardholder Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                          <Input
                            id="name"
                            placeholder="John Smith"
                            className="pl-10"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="billingAddress">Billing Address</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                          <Input
                            id="billingAddress"
                            placeholder="123 Main Street"
                            className="pl-10"
                            value={billingAddress}
                            onChange={(e) => setBillingAddress(e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="zipCode">ZIP / Postal Code</Label>
                        <Input
                          id="zipCode"
                          placeholder="12345"
                          value={zipCode}
                          onChange={(e) => setZipCode(e.target.value)}
                        />
                      </div>
                    </div>
                  </>
                )}
                
                {paymentMethod === 'paypal' && (
                  <div className="text-center p-6">
                    <p className="mb-4">You will be redirected to PayPal to complete your payment.</p>
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                      Continue to PayPal
                    </Button>
                  </div>
                )}
                
                {paymentMethod === 'apple' && (
                  <div className="text-center p-6">
                    <p className="mb-4">Click below to pay with Apple Pay.</p>
                    <Button type="submit" className="w-full bg-black hover:bg-gray-800 text-white">
                      Pay with Apple Pay
                    </Button>
                  </div>
                )}
              </form>
            </div>
            
            <Separator orientation="vertical" className="hidden md:block" />
            
            <div className="w-full md:w-72 bg-gray-50 p-4 rounded-lg">
              <h3 className="font-bold mb-4">Order Summary</h3>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${(amount * 0.9).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Taxes & Fees</span>
                  <span>${(amount * 0.1).toFixed(2)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${amount.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded p-3 mb-4">
                <p className="text-sm text-gray-600">{description}</p>
              </div>
              
              <div className="flex items-center justify-between mb-2 text-sm">
                <span className="flex items-center text-green-600">
                  <Check size={16} className="mr-1" /> 30-day refund policy
                </span>
              </div>
              
              <Button 
                type="submit" 
                onClick={handleSubmit}
                className="w-full bg-travel-blue hover:bg-travel-blue-dark mb-2"
                disabled={loading}
              >
                {loading ? 'Processing...' : `Pay $${amount.toFixed(2)}`}
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleCancel}
                disabled={loading}
              >
                Cancel
              </Button>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-center border-t pt-6">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <LockKeyhole size={16} />
            <span>Secure Payment</span>
            <Separator orientation="vertical" />
            <span>SSL Encrypted</span>
            <Separator orientation="vertical" />
            <span>Privacy Protected</span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PaymentGateway;
