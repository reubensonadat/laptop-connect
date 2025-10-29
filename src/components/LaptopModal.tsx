import React, { useState } from 'react';
import { X, Monitor, Cpu, HardDrive, Zap, Check, CreditCard, MessageCircle } from 'lucide-react';
import { Laptop, BuyerInfo } from '../types';
import PaymentForm from './PaymentForm';
import { toast } from 'sonner';

interface LaptopModalProps {
  laptop: Laptop;
  onClose: () => void;
}

const LaptopModal: React.FC<LaptopModalProps> = ({ laptop, onClose }) => {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentType, setPaymentType] = useState<'Full' | 'Half'>('Full');
  const [imageError, setImageError] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Get the first valid image URL from imageUrls
  const getImageUrl = (): string | null => {
    if (!laptop.imageUrls) return null;
    
    // If it's a string with multiple URLs separated by commas
    if (typeof laptop.imageUrls === 'string') {
      const urls = laptop.imageUrls.split(',').map(url => url.trim());
      return urls[0] || null;
    }
    
    // If it's an array
    if (Array.isArray(laptop.imageUrls)) {
      return laptop.imageUrls[0] || null;
    }
    
    return null;
  };

  const handlePayment = (type: 'Full' | 'Half') => {
    setPaymentType(type);
    setShowPaymentForm(true);
  };

  const handlePaymentSuccess = () => {
    toast.success('Payment successful! Redirecting to WhatsApp...');
    setTimeout(() => {
      const message = `Hello, I've just paid for ${laptop.brand} ${laptop.model} (${paymentType} Payment). I'm about to send a screenshot of my payment receipt.`;
      window.open(`https://wa.me/233201534711?text=${encodeURIComponent(message)}`, '_blank');
      onClose();
    }, 2000);
  };

  const handlePaymentCancel = () => {
    toast('Payment cancelled');
    setShowPaymentForm(false);
  };

  const handleImageError = () => {
    setImageError(true);
    console.error(`Failed to load image for ${laptop.brand} ${laptop.model}`);
  };

  const imageUrl = getImageUrl();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-background border-b p-4 flex justify-between items-center z-100">
          <h2 className="text-xl font-semibold">{laptop.brand} {laptop.model}</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-md hover:bg-muted transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-4 md:p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Image Section */}
            <div className="aspect-video bg-muted rounded-lg overflow-hidden relative ">
              {imageUrl && !imageError ? (
                <img 
                  src={imageUrl} 
                  alt={`${laptop.brand} ${laptop.model}`}
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <Monitor className="h-16 w-16 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">No image available</p>
                </div>
              )}
              
              {/* Stock Badge */}
              <div className="absolute top-2 right-2">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  laptop.availability 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {laptop.availability ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>
            
            {/* Details Section */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Specifications</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Cpu className="h-4 w-4 text-primary" />
                    <span>Processor: {laptop.processor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-primary" />
                    <span>Memory: {laptop.ram}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <HardDrive className="h-4 w-4 text-primary" />
                    <span>Storage: {laptop.storage}</span>
                  </div>
                  {laptop.graphics && (
                    <div className="flex items-center gap-2">
                      <Monitor className="h-4 w-4 text-primary" />
                      <span>Graphics: {laptop.graphics}</span>
                    </div>
                  )}
                  {laptop.display && (
                    <div className="flex items-center gap-2">
                      <Monitor className="h-4 w-4 text-primary" />
                      <span>Display: {laptop.display}</span>
                    </div>
                  )}
                  {laptop.operatingSystem && (
                    <div className="flex items-center gap-2">
                      <Monitor className="h-4 w-4 text-primary" />
                      <span>OS: {laptop.operatingSystem}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Features</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {laptop.hasBacklight && (
                    <div className="flex items-center gap-1">
                      <Check className="h-3 w-3 text-green-600" />
                      <span>Backlit Keyboard</span>
                    </div>
                  )}
                  {laptop.hasFingerprint && (
                    <div className="flex items-center gap-1">
                      <Check className="h-3 w-3 text-green-600" />
                      <span>Fingerprint Reader</span>
                    </div>
                  )}
                  {laptop.hasWebcam && (
                    <div className="flex items-center gap-1">
                      <Check className="h-3 w-3 text-green-600" />
                      <span>Webcam</span>
                    </div>
                  )}
                  {laptop.hasUsbC && (
                    <div className="flex items-center gap-1">
                      <Check className="h-3 w-3 text-green-600" />
                      <span>USB-C Port</span>
                    </div>
                  )}
                  {laptop.hasHdmi && (
                    <div className="flex items-center gap-1">
                      <Check className="h-3 w-3 text-green-600" />
                      <span>HDMI Port</span>
                    </div>
                  )}
                  {laptop.hasSdCardReader && (
                    <div className="flex items-center gap-1">
                      <Check className="h-3 w-3 text-green-600" />
                      <span>SD Card Reader</span>
                    </div>
                  )}
                  {laptop.hasNumericPad && (
                    <div className="flex items-center gap-1">
                      <Check className="h-3 w-3 text-green-600" />
                      <span>Numeric Pad</span>
                    </div>
                  )}
                </div>
              </div>
              
              {laptop.description && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-sm text-muted-foreground">{laptop.description}</p>
                </div>
              )}
              
              {/* Additional Info */}
              {(laptop.weight || laptop.batteryLife || laptop.warranty || laptop.material) && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Additional Information</h3>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    {laptop.weight && <p>Weight: {laptop.weight} kg</p>}
                    {laptop.batteryLife && <p>Battery Life: {laptop.batteryLife}</p>}
                    {laptop.warranty && <p>Warranty: {laptop.warranty}</p>}
                    {laptop.material && <p>Material: {laptop.material}</p>}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Pricing and Payment Section */}
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="text-sm text-muted-foreground">Price</span>
                <div className="text-2xl font-bold text-primary">{formatPrice(laptop.price)}</div>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm ${
                laptop.availability 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {laptop.availability ? 'In Stock' : 'Out of Stock'}
              </div>
            </div>
            
            {laptop.availability && (
              <div className="space-y-3">
                <div className="flex gap-3">
                  <button
                    onClick={() => handlePayment('Full')}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-colors ${
                      paymentType === 'Full' && !showPaymentForm
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-background border hover:bg-muted'
                    }`}
                  >
                    <CreditCard className="h-4 w-4" />
                    Pay Full Amount
                  </button>
                  <button
                    onClick={() => handlePayment('Half')}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-colors ${
                      paymentType === 'Half' && !showPaymentForm
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-background border hover:bg-muted'
                    }`}
                  >
                    <CreditCard className="h-4 w-4" />
                    Pay Half ({formatPrice(laptop.price / 2)})
                  </button>
                </div>
                
                <button
                  onClick={() => {
                    const message = `Hello, I'm interested in ${laptop.brand} ${laptop.model}. Can you provide more information?`;
                    window.open(`https://wa.me/233201534711?text=${encodeURIComponent(message)}`, '_blank');
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  Chat on WhatsApp
                </button>
              </div>
            )}
          </div>
          
          {/* Payment Form */}
          {showPaymentForm && (
            <div className="mt-6">
              <PaymentForm 
                laptop={laptop}
                paymentType={paymentType}
                onSuccess={handlePaymentSuccess}
                onCancel={handlePaymentCancel}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LaptopModal;