import React, { useState } from 'react';
import { CreditCard, User, Mail, Phone, MapPin, FileText, Check, ExternalLink, X } from 'lucide-react';
import { Laptop, BuyerInfo } from '../types';
import { toast } from 'sonner';

interface PaymentFormProps {
  laptop: Laptop;
  paymentType: 'Full' | 'Half';
  onSuccess: () => void;
  onCancel: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ 
  laptop, 
  paymentType, 
  onSuccess, 
  onCancel 
}) => {
  const [buyerInfo, setBuyerInfo] = useState<BuyerInfo>({
    name: '',
    email: '',
    phone: '',
    deliveryLocation: '',
    notes: '',
    agreedToTerms: false
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setBuyerInfo(prev => ({ ...prev, [name]: checked }));
    } else {
      setBuyerInfo(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = (): boolean => {
    if (!buyerInfo.name.trim()) {
      toast.error('Please enter your name');
      return false;
    }
    
    if (!buyerInfo.email.trim()) {
      toast.error('Please enter your email');
      return false;
    }
    
    if (!buyerInfo.phone.trim()) {
      toast.error('Please enter your phone number');
      return false;
    }
    
    if (!buyerInfo.agreedToTerms) {
      toast.error('Please agree to the terms and conditions');
      return false;
    }
    
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsProcessing(true);
    
    // In a real implementation, you would integrate with Paystack here
    // For this example, we'll simulate a payment process
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess();
    }, 2000);
  };

  const paymentAmount = paymentType === 'Full' ? laptop.price : laptop.price / 2;

  return (
    <>
      <div className="bg-muted/30 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-primary" />
          Payment Information
        </h3>
        
        <div className="mb-4 p-3 bg-background rounded-md border">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Product</span>
            <span className="font-medium">{laptop.brand} {laptop.model}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Payment Type</span>
            <span className="font-medium">{paymentType} Payment</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Amount</span>
            <span className="text-lg font-bold text-primary">{formatPrice(paymentAmount)}</span>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 flex items-center gap-1">
                <User className="h-3 w-3" />
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={buyerInfo.name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md bg-background"
                placeholder="Enter your full name"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1 flex items-center gap-1">
                <Mail className="h-3 w-3" />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={buyerInfo.email}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md bg-background"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 flex items-center gap-1">
                <Phone className="h-3 w-3" />
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={buyerInfo.phone}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md bg-background"
                placeholder="Enter your phone number"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1 flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                Delivery Location
              </label>
              <input
                type="text"
                name="deliveryLocation"
                value={buyerInfo.deliveryLocation}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md bg-background"
                placeholder="Enter delivery location"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 flex items-center gap-1">
              <FileText className="h-3 w-3" />
              Additional Notes (Optional)
            </label>
            <textarea
              name="notes"
              value={buyerInfo.notes}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md bg-background"
              placeholder="Any additional information or requests"
              rows={3}
            />
          </div>
          
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              name="agreedToTerms"
              checked={buyerInfo.agreedToTerms}
              onChange={handleInputChange}
              className="mt-1"
              id="terms"
            />
            <label htmlFor="terms" className="text-sm text-muted-foreground">
              I agree to the 
              <button
                type="button"
                onClick={() => setShowTermsModal(true)}
                className="text-primary hover:underline ml-1 inline-flex items-center gap-1"
              >
                terms and conditions
                <ExternalLink className="h-3 w-3" />
              </button>
              {" "}and understand that this is a payment for the selected laptop. I will be contacted for delivery arrangements.
            </label>
          </div>
          
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2 border rounded-md hover:bg-muted transition-colors"
              disabled={isProcessing}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="h-4 w-4" />
                  Pay {formatPrice(paymentAmount)}
                </>
              )}
            </button>
          </div>
        </form>
        
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> This is a demo payment form. In a real implementation, this would integrate with Paystack for secure payment processing.
          </p>
        </div>
      </div>
      
      {/* Terms and Conditions Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-background border-b p-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold">Terms and Conditions</h2>
              <button 
                onClick={() => setShowTermsModal(false)}
                className="p-1 rounded-md hover:bg-muted transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-4 md:p-6">
              <div className="space-y-4 text-sm">
                <h3 className="text-lg font-semibold">Introduction</h3>
                <p className="text-muted-foreground">
                  Welcome to Laptop Connect. These terms and conditions outline the rules and regulations for the use of our website and services. By accessing this website and purchasing our products, you accept these terms and conditions in full.
                </p>
                
                <h3 className="text-lg font-semibold">Product Information</h3>
                <p className="text-muted-foreground">
                  We make every effort to display as accurately as possible the colors, features, specifications, and details of the products available on our website. We do not accept liability for any errors or omissions and reserve the right to change information, prices, specifications, and descriptions of listed products at any time without prior notice.
                </p>
                
                <h3 className="text-lg font-semibold">Pricing and Payment</h3>
                <p className="text-muted-foreground">
                  All prices are displayed in Ghanaian Cedis (GHS) and are inclusive of applicable taxes. We offer two payment options: Full Payment and Half Payment. Payment is processed securely through Paystack. We do not store your payment information.
                </p>
                
                <h3 className="text-lg font-semibold">Delivery</h3>
                <p className="text-muted-foreground">
                  Delivery times are estimates and may vary based on your location and product availability. Standard delivery within Accra typically takes 2-3 business days. Delivery to other regions in Ghana typically takes 3-5 business days.
                </p>
                
                <h3 className="text-lg font-semibold">Returns and Warranty</h3>
                <p className="text-muted-foreground">
                  All new laptops come with a minimum 6-month manufacturer warranty. Used laptops come with a 3-month warranty unless otherwise specified. Warranty covers manufacturing defects and does not cover physical damage, software issues, or damage caused by misuse.
                </p>
                
                <h3 className="text-lg font-semibold">Limitation of Liability</h3>
                <p className="text-muted-foreground">
                  Laptop Connect shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
                </p>
                
                <h3 className="text-lg font-semibold">Governing Law</h3>
                <p className="text-muted-foreground">
                  These terms and conditions are governed by and construed in accordance with the laws of Ghana and you irrevocably submit to the exclusive jurisdiction of the courts in Ghana.
                </p>
                
                <h3 className="text-lg font-semibold">Contact Information</h3>
                <p className="text-muted-foreground">
                  If you have any questions about these terms and conditions, please contact us:
                  Email: laptopconnect@gmail.com
                  Phone: +233 201 534 711
                </p>
              </div>
              
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => window.open('/terms', '_blank')}
                  className="px-4 py-2 border rounded-md hover:bg-muted transition-colors"
                >
                  View Full Page
                </button>
                <button
                  onClick={() => setShowTermsModal(false)}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentForm;