// src/components/PaymentForm.tsx
import React, { useState } from 'react';
import { CreditCard, User, Mail, Phone, MapPin, FileText, Check, ExternalLink, X, Navigation, RefreshCw, AlertCircle } from 'lucide-react';
import { Laptop } from '../types';
import { toast } from 'sonner';
import { initializePayment, generateReference } from '../services/simplePaymentService';

// Enhanced BuyerInfo type with accuracy information
interface BuyerInfo {
  name: string;
  email: string;
  phone: string;
  deliveryLocation: string;
  coordinates?: {
    latitude: number;
    longitude: number;
    accuracy: number; // in meters
    timestamp: number;
  };
  notes: string;
  agreedToTerms: boolean;
}

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
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);
  const [paymentData, setPaymentData] = useState<any>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [useCoordinates, setUseCoordinates] = useState(false);
  const [locationAttempts, setLocationAttempts] = useState(0);
  const [locationQuality, setLocationQuality] = useState<'high' | 'medium' | 'low' | null>(null);

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

  const getHighAccuracyLocation = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      const options = {
        enableHighAccuracy: true, // Use GPS if available
        timeout: 15000, // 15 seconds timeout
        maximumAge: 0 // Don't use cached position
      };

      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => reject(error),
        options
      );
    });
  };

  const watchHighAccuracyLocation = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      const options = {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0
      };

      let watchId: number;
      let bestAccuracy = Infinity;
      let bestPosition: GeolocationPosition | null = null;
      let attempts = 0;
      const maxAttempts = 5;

      watchId = navigator.geolocation.watchPosition(
        (position) => {
          attempts++;
          const accuracy = position.coords.accuracy;
          
          if (accuracy < bestAccuracy) {
            bestAccuracy = accuracy;
            bestPosition = position;
          }

          // If we get good accuracy or max attempts, resolve
          if (accuracy <= 10 || attempts >= maxAttempts) {
            navigator.geolocation.clearWatch(watchId);
            if (bestPosition) {
              resolve(bestPosition);
            } else {
              reject(new Error('Could not get accurate location'));
            }
          }
        },
        (error) => {
          navigator.geolocation.clearWatch(watchId);
          reject(error);
        },
        options
      );

      // Fallback timeout
      setTimeout(() => {
        navigator.geolocation.clearWatch(watchId);
        if (bestPosition) {
          resolve(bestPosition);
        } else {
          reject(new Error('Location request timed out'));
        }
      }, 20000);
    });
  };

  const getLocation = async (isRetry = false) => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser');
      return;
    }

    setIsGettingLocation(true);
    setLocationAttempts(prev => prev + 1);

    try {
      // First try high accuracy
      let position = await getHighAccuracyLocation();
      
      // If accuracy is poor and it's not a retry, try watching for better accuracy
      if (position.coords.accuracy > 20 && !isRetry) {
        try {
          position = await watchHighAccuracyLocation();
        } catch (watchError) {
          console.log('Watch position failed, using initial position');
        }
      }

      const { latitude, longitude, accuracy } = position.coords;
      
      // Determine location quality
      let quality: 'high' | 'medium' | 'low';
      if (accuracy <= 10) {
        quality = 'high';
      } else if (accuracy <= 50) {
        quality = 'medium';
      } else {
        quality = 'low';
      }
      
      setLocationQuality(quality);
      
      setBuyerInfo(prev => ({
        ...prev,
        coordinates: { 
          latitude, 
          longitude, 
          accuracy,
          timestamp: Date.now()
        },
        deliveryLocation: `Lat: ${latitude.toFixed(6)}, Lng: ${longitude.toFixed(6)} (±${Math.round(accuracy)}m)`
      }));
      
      setUseCoordinates(true);
      
      // Show appropriate message based on accuracy
      if (quality === 'high') {
        toast.success(`High accuracy location captured! (±${Math.round(accuracy)}m)`);
      } else if (quality === 'medium') {
        toast.info(`Location captured with medium accuracy (±${Math.round(accuracy)}m). For better accuracy, ensure GPS is enabled.`);
      } else {
        toast.warning(`Location accuracy is low (±${Math.round(accuracy)}m). Consider entering address manually for precise delivery.`);
      }
      
    } catch (error: any) {
      let errorMessage = 'Failed to get your location';
      
      switch(error.code) {
        case error.PERMISSION_DENIED:
          errorMessage = "Location access denied. Please enable location permissions in your browser settings.";
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage = "Location information unavailable. Please check your GPS/WiFi connection.";
          break;
        case error.TIMEOUT:
          errorMessage = "Location request timed out. Please try again.";
          break;
        default:
          errorMessage = error.message || "Unknown error occurred while getting location.";
      }
      
      toast.error(errorMessage);
    } finally {
      setIsGettingLocation(false);
    }
  };

  const toggleLocationInput = () => {
    setUseCoordinates(!useCoordinates);
    if (!useCoordinates) {
      // If switching to coordinates, get the location
      getLocation();
    } else {
      // If switching back to text input, clear coordinates
      setBuyerInfo(prev => ({
        ...prev,
        coordinates: undefined,
        deliveryLocation: ''
      }));
      setLocationQuality(null);
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
    
    // Validate location accuracy if using coordinates
    if (useCoordinates && buyerInfo.coordinates && buyerInfo.coordinates.accuracy > 100) {
      const confirmLowAccuracy = window.confirm(
        `Your location accuracy is quite low (±${Math.round(buyerInfo.coordinates.accuracy)}m). ` +
        'This might affect delivery precision. Would you like to enter your address manually instead?'
      );
      if (confirmLowAccuracy) {
        setUseCoordinates(false);
        setBuyerInfo(prev => ({ ...prev, deliveryLocation: '', coordinates: undefined }));
        return false;
      }
    }
    
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsProcessing(true);
    
    try {
      const reference = generateReference();
      const paymentAmount = paymentType === 'Full' ? laptop.price : laptop.price / 2;
      
      console.log('Initializing payment with reference:', reference);
      
      // Initialize payment
      initializePayment(
        buyerInfo.email,
        paymentAmount,
        reference,
        (response: any) => {
          console.log('Payment response:', response);
          
          if (response.status === 'success') {
            toast.success('Payment successful! Redirecting to WhatsApp...');
            
            // Store payment data
            setPaymentData(response);
            setPaymentSuccessful(true);
            
            // Prepare the message with location details
            let locationInfo = buyerInfo.deliveryLocation;
            if (useCoordinates && buyerInfo.coordinates) {
              const { latitude, longitude, accuracy } = buyerInfo.coordinates;
              locationInfo = `GPS Coordinates: ${latitude.toFixed(6)}, ${longitude.toFixed(6)} (Accuracy: ±${Math.round(accuracy)}m)`;
              
              // Add Google Maps link for easy navigation
              const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
              locationInfo += `\nMap: ${mapsUrl}`;
            }
            
            const message = `Hello, I've just paid for ${laptop.brand} ${laptop.model} (${paymentType} Payment). Here are my details:\n\nName: ${buyerInfo.name}\nEmail: ${buyerInfo.email}\nPhone: ${buyerInfo.phone}\nDelivery Location: ${locationInfo}\n\nPayment Reference: ${response.reference}\nPayment ID: ${response.transaction}\n\nPlease confirm my purchase \n\nI am about to send a picture of my receipt`;
            
            // Try to redirect to WhatsApp automatically
            setTimeout(() => {
              redirectToWhatsApp(message);
              onSuccess();
            }, 2000);
          } else {
            toast.error('Payment was not successful. Please try again.');
          }
          setIsProcessing(false);
        }
      );
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('An error occurred during payment. Please try again.');
      setIsProcessing(false);
    }
  };

  // Local helper to redirect to WhatsApp with a prefilled message
  const redirectToWhatsApp = (message: string) => {
    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/233201534711?text=${encoded}`;
    
    // Try multiple methods to open WhatsApp
    try {
      // Method 1: Direct window.open
      const newWindow = window.open(url, '_blank');
      
      // Method 2: If the popup was blocked, try opening in the same tab
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        console.log('Popup blocked, trying in same tab');
        window.location.href = url;
      }
    } catch (error) {
      console.error('Error opening WhatsApp:', error);
      
      // Method 3: Fallback - copy message to clipboard
      try {
        navigator.clipboard.writeText(message).then(() => {
          alert('Message copied to clipboard. Please open WhatsApp and paste the message.');
        }).catch(() => {
          alert('Could not open WhatsApp. Please send this message to +233201534711:\n\n' + message);
        });
      } catch (clipboardError) {
        alert('Could not open WhatsApp. Please send this message to +233201534711:\n\n' + message);
      }
    }
  };

  const paymentAmount = paymentType === 'Full' ? laptop.price : laptop.price / 2;

  const getAccuracyColor = (quality: 'high' | 'medium' | 'low' | null) => {
    switch(quality) {
      case 'high': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getAccuracyIcon = (quality: 'high' | 'medium' | 'low' | null) => {
    switch(quality) {
      case 'high': return <Check className="h-3 w-3" />;
      case 'medium': return <AlertCircle className="h-3 w-3" />;
      case 'low': return <AlertCircle className="h-3 w-3" />;
      default: return null;
    }
  };

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
        
        {!paymentSuccessful ? (
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
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="deliveryLocation"
                      value={buyerInfo.deliveryLocation}
                      onChange={handleInputChange}
                      className="flex-1 p-2 border rounded-md bg-background"
                      placeholder={useCoordinates ? "Location captured" : "Enter delivery location"}
                      disabled={useCoordinates}
                    />
                    <button
                      type="button"
                      onClick={toggleLocationInput}
                      className="p-2 border rounded-md bg-primary/10 hover:bg-primary/20 transition-colors"
                      title={useCoordinates ? "Use text input instead" : "Get my current location"}
                    >
                      {isGettingLocation ? (
                        <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <Navigation className="h-4 w-4 text-primary" />
                      )}
                    </button>
                    {useCoordinates && (
                      <button
                        type="button"
                        onClick={() => getLocation(true)}
                        className="p-2 border rounded-md bg-blue-50 hover:bg-blue-100 transition-colors"
                        title="Refresh location"
                      >
                        <RefreshCw className="h-4 w-4 text-blue-600" />
                      </button>
                    )}
                  </div>
                  
                  {useCoordinates && locationQuality && (
                    <div className={`flex items-center gap-1 text-xs ${getAccuracyColor(locationQuality)}`}>
                      {getAccuracyIcon(locationQuality)}
                      <span>
                        {locationQuality === 'high' && 'High accuracy location (GPS)'}
                        {locationQuality === 'medium' && 'Medium accuracy location'}
                        {locationQuality === 'low' && 'Low accuracy - consider manual entry'}
                        {buyerInfo.coordinates && ` (±${Math.round(buyerInfo.coordinates.accuracy)}m)`}
                      </span>
                    </div>
                  )}
                </div>
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
                placeholder="Any additional information or requests (e.g., landmarks, specific delivery instructions)"
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
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-md">
              <div className="flex items-center gap-2 mb-2">
                <Check className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-semibold text-green-800">Payment Successful!</h3>
              </div>
              <p className="text-sm text-green-700 mb-3">
                Thank you for your payment. Your order has been received and will be processed shortly.
              </p>
              <div className="bg-white p-3 rounded border border-green-200">
                <p className="text-sm font-medium text-gray-700 mb-1">Payment Details:</p>
                <p className="text-xs text-gray-600">Reference: {paymentData?.reference}</p>
                <p className="text-xs text-gray-600">Transaction ID: {paymentData?.transaction}</p>
              </div>
            </div>
            
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-sm text-blue-800 mb-2">
                <strong>Next Step:</strong> Please send your order details via WhatsApp to complete your purchase.
              </p>
              <button
                onClick={() => {
                  // Prepare the message with location details
                  let locationInfo = buyerInfo.deliveryLocation;
                  if (useCoordinates && buyerInfo.coordinates) {
                    const { latitude, longitude, accuracy } = buyerInfo.coordinates;
                    locationInfo = `GPS Coordinates: ${latitude.toFixed(6)}, ${longitude.toFixed(6)} (Accuracy: ±${Math.round(accuracy)}m)`;
                    
                    // Add Google Maps link for easy navigation
                    const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
                    locationInfo += `\nMap: ${mapsUrl}`;
                  }
                  
                  const message = `Hello, I've just paid for ${laptop.brand} ${laptop.model} (${paymentType} Payment). Here are my details:\n\nName: ${buyerInfo.name}\nEmail: ${buyerInfo.email}\nPhone: ${buyerInfo.phone}\nDelivery Location: ${locationInfo}\n\nPayment Reference: ${paymentData?.reference}\nPayment ID: ${paymentData?.transaction}\n\n Please confirm my purchase \n\nI am about to send a picture of my receipt`;
                  redirectToWhatsApp(message);
                }}
                className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Send Order Details via WhatsApp
              </button>
            </div>
          </div>
        )}
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