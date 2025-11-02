import { useState, useEffect } from 'react';
import { usePaystackPayment } from 'react-paystack';
import { formatPrice } from '../utils/helpers';

// Custom WhatsApp message generator
const generateWhatsAppMessage = (laptop, formData, reference) => {
  return `Hey, I have paid for ${laptop.brand} ${laptop.model} (${formData.paymentType === 'full' ? 'Full Payment' : 'Half Payment'}). This is my delivery location: ${formData.deliveryLocation}. Please confirm my transaction for me. Reference: ${reference}. Here is a picture of my receipt.`;
};

const PaymentForm = ({ laptop, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    deliveryLocation: '',
    additionalNotes: '',
    paymentType: 'full', // 'full' or 'half'
  });
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [showWhatsAppButton, setShowWhatsAppButton] = useState(false);
  const [paymentReference, setPaymentReference] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_PHONE_NUMBER;

  const amount = formData.paymentType === 'full' 
    ? laptop.price * 100 // Paystack expects amount in kobo (cents)
    : Math.ceil(laptop.price / 2) * 100;

  const config = {
    reference: (new Date()).getTime().toString(),
    email: formData.email,
    amount: amount,
    publicKey: publicKey,
    currency: 'GHS', // Explicitly set currency to Ghanaian Cedis
    metadata: {
      custom_fields: [
        {
          display_name: "Product",
          variable_name: "product",
          value: `${laptop.brand} ${laptop.model}`
        },
        {
          display_name: "Payment Type",
          variable_name: "payment_type",
          value: formData.paymentType === 'full' ? 'Full Payment' : 'Half Payment'
        }
      ]
    },
    callback: (response) => {
      handlePaymentSuccess(response);
    },
    onClose: () => {
      setIsProcessing(false);
    }
  };

  const initializePayment = usePaystackPayment(config);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^(\+233|0)[0-9]{9}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Phone number is invalid. Please use format +233XXXXXXXXX or 0XXXXXXXXX';
    }
    
    if (!formData.deliveryLocation.trim()) {
      newErrors.deliveryLocation = 'Delivery location is required';
    }
    
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsProcessing(true);
    setPaymentError('');
    
    initializePayment(handlePaymentSuccess, handlePaymentClose);
  };

  const handlePaymentSuccess = (response) => {
    setIsProcessing(false);
    setPaymentSuccess(true);
    setPaymentReference(response.reference);
    
    // Generate WhatsApp message
    const message = generateWhatsAppMessage(laptop, formData, response.reference);
    
    // Redirect to WhatsApp
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;
    
    // Try to open WhatsApp
    const newWindow = window.open(whatsappUrl, '_blank');
    
    // Check if the popup was blocked
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      // If popup was blocked, show the button
      setShowWhatsAppButton(true);
    } else {
      // Close modal and notify parent
      onSuccess(response);
    }
  };

  const handlePaymentClose = () => {
    setIsProcessing(false);
  };

  const handleOpenWhatsApp = () => {
    const message = generateWhatsAppMessage(laptop, formData, paymentReference);
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    onSuccess({ reference: paymentReference });
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you would use a geocoding service to convert coordinates to address
          // For now, we'll just show a placeholder
          setFormData(prev => ({
            ...prev,
            deliveryLocation: `Lat: ${position.coords.latitude}, Lng: ${position.coords.longitude}`
          }));
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get your location. Please enter it manually.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <svg className="w-6 h-6 mr-2 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <h3 className="text-lg font-semibold text-gray-900">Secure Payment</h3>
      </div>

      {/* Product Summary */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <img
              src={laptop.imageUrls ? laptop.imageUrls.split(',')[0] : ''}
              alt={`${laptop.brand} ${laptop.model}`}
              className="w-16 h-16 object-cover rounded"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/64x64/2563eb/ffffff?text=No+Image';
              }}
            />
          </div>
          <div className="ml-4 flex-1">
            <h4 className="text-sm font-medium text-gray-900">{laptop.brand} {laptop.model}</h4>
            <p className="text-sm text-gray-600">{laptop.processor}, {laptop.ram}, {laptop.storage}</p>
            <div className="flex items-center justify-between mt-1">
              <span className="text-lg font-bold text-primary-blue">
                {formatPrice(formData.paymentType === 'full' ? laptop.price : Math.ceil(laptop.price / 2))}
              </span>
              <span className="text-xs text-gray-500">
                {formData.paymentType === 'full' ? 'Full Payment' : 'Half Payment'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Type Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Payment Type</label>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            className={`px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent ${
              formData.paymentType === 'full'
                ? 'border-primary-blue bg-primary-blue text-white'
                : 'border-gray-300 bg-white text-gray-700'
            }`}
            onClick={() => setFormData(prev => ({ ...prev, paymentType: 'full' }))}
          >
            Full Payment
            <div className="text-center">
              <div className="text-lg font-bold">{formatPrice(laptop.price)}</div>
              <div className="text-xs text-gray-500">Pay in full</div>
            </div>
          </button>
          <button
            type="button"
            className={`px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent ${
              formData.paymentType === 'half'
                ? 'border-primary-blue bg-primary-blue text-white'
                : 'border-gray-300 bg-white text-gray-700'
            }`}
            onClick={() => setFormData(prev => ({ ...prev, paymentType: 'half' }))}
          >
            Half Payment
            <div className="text-center">
              <div className="text-lg font-bold">{formatPrice(Math.ceil(laptop.price / 2))}</div>
              <div className="text-xs text-gray-500">Pay half now, half on delivery</div>
            </div>
          </button>
        </div>
      </div>

      {/* Payment Success Message */}
      {paymentSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-800 font-medium">Payment Successful!</p>
              <p className="text-green-700 text-sm">Reference: {paymentReference}</p>
              <p className="text-green-700 text-sm mt-1">Click the button to open WhatsApp and complete your order.</p>
            </div>
            <button
              type="button"
              className="px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors flex items-center"
              onClick={handleOpenWhatsApp}
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Open WhatsApp
            </button>
          </div>
        </div>
      )}

      {/* Form */}
      {!paymentSuccess && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent ${
                  errors.fullName ? 'border-error-red' : 'border-gray-300'
                }`}
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-error-red">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent ${
                  errors.email ? 'border-error-red' : 'border-gray-300'
                }`}
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-error-red">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent ${
                  errors.phone ? 'border-error-red' : 'border-gray-300'
                }`}
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-error-red">{errors.phone}</p>
              )}
            </div>

            <div>
              <label htmlFor="deliveryLocation" className="block text-sm font-medium text-gray-700 mb-1">
                Delivery Location *
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="deliveryLocation"
                  name="deliveryLocation"
                  className={`w-full px-3 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent ${
                    errors.deliveryLocation ? 'border-error-red' : 'border-gray-300'
                  }`}
                  value={formData.deliveryLocation}
                  onChange={handleChange}
                  placeholder="Enter your delivery location"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={handleGetLocation}
                  title="Use GPS Location"
                >
                  <svg className="w-5 h-5 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>
              {errors.deliveryLocation && (
                <p className="mt-1 text-sm text-error-red">{errors.deliveryLocation}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="additionalNotes" className="block text-sm font-medium text-gray-700 mb-1">
              Additional Notes
            </label>
            <textarea
              id="additionalNotes"
              name="additionalNotes"
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
              value={formData.additionalNotes}
              onChange={handleChange}
              placeholder="Any additional information or special requests"
            ></textarea>
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              id="acceptTerms"
              name="acceptTerms"
              className={`mt-1 h-4 w-4 text-primary-blue focus:ring-primary-blue border-gray-300 rounded ${
                errors.acceptTerms ? 'border-error-red' : ''
              }`}
              checked={formData.acceptTerms}
              onChange={handleChange}
            />
            <label htmlFor="acceptTerms" className="ml-2 text-sm text-gray-700">
              I agree to the <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-primary-blue hover:underline">Terms and Conditions</a> and <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-primary-blue hover:underline">Privacy Policy</a>
            </label>
            {errors.acceptTerms && (
              <p className="mt-1 text-sm text-error-red">{errors.acceptTerms}</p>
            )}
          </div>

          {paymentError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <p className="text-red-800">{paymentError}</p>
              </div>
            </div>
          )}

          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary-blue text-white font-medium rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-3 border-2 border-white border-t-transparent border-r-transparent border-b-transparent rounded-full" viewBox="0 0 24 24"></svg>
                  Processing...
                </>
              ) : (
                `Pay ${formData.paymentType === 'full' ? formatPrice(laptop.price) : formatPrice(Math.ceil(laptop.price / 2))}`
              )}
            </button>
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 text-secondary-gray font-medium rounded-md hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
              onClick={onClose}
              disabled={isProcessing}
            >
              Cancel
            </button>
          </div>

          <div className="text-xs text-secondary-gray text-center mt-4">
            <p>Your payment information is secure and encrypted.</p>
            <p>After successful payment, you'll be redirected to WhatsApp to complete your order.</p>
          </div>
        </form>
      )}
    </div>
  );
};

export default PaymentForm;