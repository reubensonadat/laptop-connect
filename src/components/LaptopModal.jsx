// src/components/LaptopModal.js

import React, { useState, useEffect } from 'react';
import { formatPrice, formatCondition } from '../utils/helpers';
import PaymentForm from './PaymentForm';

const LaptopModal = ({ laptop, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && laptop) {
      setCurrentImageIndex(0);
      setImageError(false);
      setImageLoading(true);
    }
  }, [isOpen, laptop]);

  // Early return if modal is not open or no laptop is selected
  if (!isOpen || !laptop) return null;

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleNextImage = () => {
    const imageUrls = getImageUrls();
    if (currentImageIndex < imageUrls.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
      setImageError(false);
      setImageLoading(true);
    }
  };

  const handlePrevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
      setImageError(false);
      setImageLoading(true);
    }
  };

  const handlePaymentClick = () => {
    setShowPaymentForm(true);
  };

  const handlePaymentClose = () => {
    setShowPaymentForm(false);
  };

  const handlePaymentSuccess = () => {
    setShowPaymentForm(false);
    onClose();
  };

  const handleWhatsAppEnquiry = () => {
    const phoneNumber = import.meta.env.VITE_WHATSAPP_PHONE_NUMBER || '233201534711';
    const message = `Hi, I'm interested in the ${laptop.brand} ${laptop.model}. Can you provide more information about this laptop?`;
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Get image URLs function - moved inside and with null check
  const getImageUrls = () => {
    if (!laptop || !laptop.imageUrls) return [];
    
    // If it's a string with commas, split it
    if (typeof laptop.imageUrls === 'string' && laptop.imageUrls.includes(',')) {
      return laptop.imageUrls.split(',').map(url => url.trim());
    }
    
    // If it's a string without commas, return it as an array with one element
    if (typeof laptop.imageUrls === 'string') {
      return [laptop.imageUrls.trim()];
    }
    
    // If it's already an array, return it
    if (Array.isArray(laptop.imageUrls)) {
      return laptop.imageUrls.map(url => url.trim());
    }
    
    // For any other type, convert to string and return as array
    return [String(laptop.imageUrls).trim()];
  };

  const imageUrls = getImageUrls();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 transition-opacity bg-gray-900 bg-opacity-75" 
          onClick={onClose}
          aria-hidden="true"
        ></div>

        {/* Modal panel */}
        <div className="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border-gray">
            <h2 className="text-xl font-semibold text-gray-900">
              {laptop.brand} {laptop.model}
            </h2>
            <button
              type="button"
              className="text-secondary-gray hover:text-gray-900 focus:outline-none"
              onClick={onClose}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="p-6">
            {showPaymentForm ? (
              <PaymentForm 
                laptop={laptop} 
                onClose={handlePaymentClose}
                onSuccess={handlePaymentSuccess}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Image Gallery */}
                <div>
                  <div className="relative h-64 md:h-80 bg-gray-100 rounded-lg overflow-hidden">
                    {imageLoading && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue"></div>
                      </div>
                    )}
                    
                    {imageError ? (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-secondary-gray">
                        <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm">No image available</span>
                      </div>
                    ) : (
                      <img
                        src={imageUrls[currentImageIndex] || ''}
                        alt={`${laptop.brand} ${laptop.model}`}
                        className="w-full h-full object-cover"
                        onError={handleImageError}
                        onLoad={handleImageLoad}
                      />
                    )}
                    
                    {/* Image Navigation */}
                    {imageUrls.length > 1 && (
                      <>
                        <button
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-1 text-gray-800 hover:bg-opacity-90"
                          onClick={handlePrevImage}
                          disabled={currentImageIndex === 0}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-1 text-gray-800 hover:bg-opacity-90"
                          onClick={handleNextImage}
                          disabled={currentImageIndex === imageUrls.length - 1}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </>
                    )}
                  </div>
                  
                  {/* Image Thumbnails */}
                  {imageUrls.length > 1 && (
                    <div className="flex mt-2 space-x-2 overflow-x-auto">
                      {imageUrls.map((url, index) => (
                        <button
                          key={index}
                          className={`flex-shrink-0 w-16 h-16 rounded border-2 ${
                            index === currentImageIndex ? 'border-primary-blue' : 'border-transparent'
                          }`}
                          onClick={() => {
                            setCurrentImageIndex(index);
                            setImageError(false);
                            setImageLoading(true);
                          }}
                        >
                          <img
                            src={url}
                            alt={`${laptop.brand} ${laptop.model} ${index + 1}`}
                            className="w-full h-full object-cover rounded"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="space-y-4">
                  {/* Price and Availability */}
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-primary-blue">
                      {formatPrice(laptop.price)}
                    </div>
                    <div className={`px-3 py-1 text-sm font-medium rounded ${
                      laptop.availability 
                        ? 'bg-success-green text-white' 
                        : 'bg-error-red text-white'
                    }`}>
                      {laptop.availability ? 'In Stock' : 'Out of Stock'}
                    </div>
                  </div>

                  {/* Condition */}
                  <div>
                    <span className={`inline-block px-3 py-1 text-sm font-medium rounded ${
                      laptop.condition === 'NEW' 
                        ? 'bg-blue-100 text-blue-800' 
                        : laptop.condition === 'UK_USED'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {formatCondition(laptop.condition)}
                    </span>
                  </div>

                  {/* Specifications */}
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Specifications</h3>
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <svg className="w-5 h-5 mr-2 mt-0.5 text-primary-blue flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                        </svg>
                        <div>
                          <span className="font-medium">Processor:</span> {laptop.processor}
                        </div>
                      </div>
                      <div className="flex items-start">
                        <svg className="w-5 h-5 mr-2 mt-0.5 text-primary-blue flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        <div>
                          <span className="font-medium">Memory:</span> {laptop.ram}
                        </div>
                      </div>
                      <div className="flex items-start">
                        <svg className="w-5 h-5 mr-2 mt-0.5 text-primary-blue flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                        </svg>
                        <div>
                          <span className="font-medium">Storage:</span> {laptop.storage}
                        </div>
                      </div>
                      <div className="flex items-start">
                        <svg className="w-5 h-5 mr-2 mt-0.5 text-primary-blue flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <div>
                          <span className="font-medium">Graphics:</span> {laptop.graphics}
                        </div>
                      </div>
                      <div className="flex items-start">
                        <svg className="w-5 h-5 mr-2 mt-0.5 text-primary-blue flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <div>
                          <span className="font-medium">Display:</span> {laptop.display}
                        </div>
                      </div>
                      <div className="flex items-start">
                        <svg className="w-5 h-5 mr-2 mt-0.5 text-primary-blue flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <span className="font-medium">Battery Life:</span> {laptop.batteryLife} hours
                        </div>
                      </div>
                      <div className="flex items-start">
                        <svg className="w-5 h-5 mr-2 mt-0.5 text-primary-blue flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <span className="font-medium">Weight:</span> {laptop.weight} kg
                        </div>
                      </div>
                      <div className="flex items-start">
                        <svg className="w-5 h-5 mr-2 mt-0.5 text-primary-blue flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <div>
                          <span className="font-medium">Warranty:</span> {laptop.warranty} months
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Features</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {laptop.hasBacklight && (
                        <div className="flex items-center text-sm">
                          <svg className="w-4 h-4 mr-1 text-success-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Backlit Keyboard
                        </div>
                      )}
                      {laptop.hasFingerprint && (
                        <div className="flex items-center text-sm">
                          <svg className="w-4 h-4 mr-1 text-success-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Fingerprint Reader
                        </div>
                      )}
                      {laptop.hasWebcam && (
                        <div className="flex items-center text-sm">
                          <svg className="w-4 h-4 mr-1 text-success-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Webcam
                        </div>
                      )}
                      {laptop.hasUsbC && (
                        <div className="flex items-center text-sm">
                          <svg className="w-4 h-4 mr-1 text-success-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          USB-C Port
                        </div>
                      )}
                      {laptop.hasHdmi && (
                        <div className="flex items-center text-sm">
                          <svg className="w-4 h-4 mr-1 text-success-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          HDMI Port
                        </div>
                      )}
                      {laptop.hasSdCardReader && (
                        <div className="flex items-center text-sm">
                          <svg className="w-4 h-4 mr-1 text-success-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          SD Card Reader
                        </div>
                      )}
                      {laptop.hasNumericPad && (
                        <div className="flex items-center text-sm">
                          <svg className="w-4 h-4 mr-1 text-success-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Numeric Pad
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  {laptop.description && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Description</h3>
                      <p className="text-sm text-secondary-gray">{laptop.description}</p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex space-x-3 pt-4">
                    <button
                      className="flex-1 px-4 py-2 bg-primary-blue text-white font-medium rounded hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-offset-2"
                      onClick={handlePaymentClick}
                      disabled={!laptop.availability}
                    >
                      {laptop.availability ? 'Buy Now' : 'Out of Stock'}
                    </button>
                    <button
                      className="px-4 py-2 bg-green-500 text-white font-medium rounded hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center"
                      onClick={handleWhatsAppEnquiry}
                    >
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                      Chat on WhatsApp
                    </button>
                    <button
                      className="px-4 py-2 border border-border-gray text-secondary-gray font-medium rounded hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-offset-2"
                      onClick={onClose}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaptopModal;