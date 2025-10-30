import React, { useState } from 'react';
import { Laptop } from '../types';
import { Monitor, Cpu, HardDrive, Zap } from 'lucide-react';

interface LaptopCardProps {
  laptop: Laptop;
  onClick: () => void;
}

const LaptopCard: React.FC<LaptopCardProps> = ({ laptop, onClick }) => {
  const [imageError, setImageError] = useState(false);
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Get the first valid image URL
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
  
  const imageUrl = getImageUrl();
  
  const handleImageError = () => {
    setImageError(true);
    console.error(`Failed to load image: ${imageUrl}`);
  };

  return (
    <div 
      className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer bg-card"
      onClick={onClick}
    >
      <div className="aspect-video bg-muted relative">
        {imageUrl && !imageError ? (
          <img 
            src={imageUrl} 
            alt={`${laptop.brand} ${laptop.model} laptop with ${laptop.processor}, ${laptop.ram} RAM, ${laptop.storage} - ${laptop.condition} condition`}
            className="w-full h-full object-cover"
            onError={handleImageError}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Monitor className="h-12 w-12 text-muted-foreground" />
          </div>
        )}
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
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg">{laptop.brand} {laptop.model}</h3>
          <span className="text-xs bg-muted px-2 py-1 rounded">{laptop.condition}</span>
        </div>
        
        <div className="space-y-1 mb-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Cpu className="h-3 w-3" />
            <span>{laptop.processor}</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="h-3 w-3" />
            <span>{laptop.ram} RAM</span>
          </div>
          <div className="flex items-center gap-2">
            <HardDrive className="h-3 w-3" />
            <span>{laptop.storage}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-primary">{formatPrice(laptop.price)}</span>
          <button className="text-sm px-3 py-1 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default LaptopCard;