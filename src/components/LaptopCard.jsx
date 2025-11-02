import { useState } from 'react';
import { formatPrice, formatCondition } from '../utils/helpers';

const LaptopCard = ({ laptop, onClick }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  // Get the first image URL
  const getImageUrl = () => {
    if (!laptop.imageUrls) return '';
    
    // If it's a string with commas, split and take the first one
    if (typeof laptop.imageUrls === 'string' && laptop.imageUrls.includes(',')) {
      return laptop.imageUrls.split(',')[0].trim();
    }
    
    // If it's already a string without commas, return it
    if (typeof laptop.imageUrls === 'string') {
      return laptop.imageUrls.trim();
    }
    
    // If it's an array, return the first element
    if (Array.isArray(laptop.imageUrls) && laptop.imageUrls.length > 0) {
      return laptop.imageUrls[0].trim();
    }
    
    // For any other type, convert to string
    return String(laptop.imageUrls).trim();
  };

  const imageUrl = getImageUrl();

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  return (
    <div 
      className="bg-white rounded-lg border border-border-gray overflow-hidden hover:shadow-medium transition-shadow cursor-pointer"
      onClick={() => onClick(laptop)}
    >
      {/* Image Section */}
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="spinner"></div>
          </div>
        )}
        
        {imageError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-secondary-gray">
            <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-sm">No image available</span>
          </div>
        ) : (
          <img
            src={imageUrl}
            alt={`${laptop.brand} ${laptop.model}`}
            className="w-full h-full object-cover"
            onError={handleImageError}
            onLoad={handleImageLoad}
          />
        )}
        
        {/* Availability Badge */}
        <div className={`absolute top-2 right-2 px-2 py-1 text-xs font-medium rounded ${
          laptop.availability 
            ? 'bg-success-green text-white' 
            : 'bg-error-red text-white'
        }`}>
          {laptop.availability ? 'In Stock' : 'Out of Stock'}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Brand and Model */}
        <div className="mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{laptop.brand}</h3>
          <p className="text-sm text-secondary-gray">{laptop.model}</p>
        </div>

        {/* Condition Badge */}
        <div className="mb-3">
          <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${
            laptop.condition === 'NEW' 
              ? 'bg-blue-100 text-blue-800' 
              : laptop.condition === 'UK_USED'
              ? 'bg-green-100 text-green-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {formatCondition(laptop.condition)}
          </span>
        </div>

        {/* Specs */}
        <div className="space-y-1 mb-4">
          <div className="flex items-center text-sm text-secondary-gray">
            <svg className="w-4 h-4 mr-2 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
            {laptop.processor}
          </div>
          <div className="flex items-center text-sm text-secondary-gray">
            <svg className="w-4 h-4 mr-2 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            {laptop.ram} RAM
          </div>
          <div className="flex items-center text-sm text-secondary-gray">
            <svg className="w-4 h-4 mr-2 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
            </svg>
            {laptop.storage}
          </div>
        </div>

        {/* Price and Button */}
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold text-primary-blue">
            {formatPrice(laptop.price)}
          </div>
          <button className="px-3 py-1 bg-primary-blue text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default LaptopCard;