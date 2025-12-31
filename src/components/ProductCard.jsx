import { useState } from 'react';
import { formatPrice, formatCondition } from '../utils/helpers';

const ProductCard = ({ product, onClick }) => {
    const [imageError, setImageError] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);

    // Get the first image URL
    const getImageUrl = () => {
        if (!product.imageUrls) return '';

        // If it's a string with commas, split and take the first one
        if (typeof product.imageUrls === 'string' && product.imageUrls.includes(',')) {
            return product.imageUrls.split(',')[0].trim();
        }

        // If it's already a string without commas, return it
        if (typeof product.imageUrls === 'string') {
            return product.imageUrls.trim();
        }

        // If it's an array, return the first element
        if (Array.isArray(product.imageUrls) && product.imageUrls.length > 0) {
            return product.imageUrls[0].trim();
        }

        // For any other type, convert to string
        return String(product.imageUrls).trim();
    };

    const imageUrl = getImageUrl();

    const handleImageError = () => {
        setImageError(true);
        setImageLoading(false);
    };

    const handleImageLoad = () => {
        setImageLoading(false);
    };

    // Helper to render relevant specs based on available data
    const renderSpecs = () => {
        // If we have the new 'specs' object, use it
        if (product.specs) {
            // Prioritize certain common specs for display on card if they exist
            const priorityKeys = ['processor', 'ram', 'storage', 'graphics', 'display', 'screen', 'battery', 'color'];
            const specEntries = Object.entries(product.specs);

            // Filter detailed boolean flags or very long text for the card view
            const displaySpecs = specEntries.filter(([key, value]) => {
                const lowerKey = key.toLowerCase();
                // Skip internal-sounding keys or booleans for the main card text (optional)
                if (lowerKey.startsWith('has')) return false;
                // Prioritize showing only a few items
                return true;
            });

            // Sort to show priority keys first
            displaySpecs.sort(([keyA], [keyB]) => {
                const idxA = priorityKeys.indexOf(keyA.toLowerCase());
                const idxB = priorityKeys.indexOf(keyB.toLowerCase());
                if (idxA !== -1 && idxB !== -1) return idxA - idxB;
                if (idxA !== -1) return -1;
                if (idxB !== -1) return 1;
                return 0;
            });

            // Take top 3
            return (
                <div className="space-y-1 mb-4">
                    {displaySpecs.slice(0, 3).map(([key, value]) => (
                        <div key={key} className="flex items-center text-sm text-secondary-gray">
                            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2 flex-shrink-0"></span>
                            <span className="capitalize truncate">
                                {key}: {String(value)}
                            </span>
                        </div>
                    ))}
                </div>
            );
        }

        // Fallback for old data structure
        return (
            <div className="space-y-1 mb-4">
                {/* Show Processor if available */}
                {product.processor && (
                    <div className="flex items-center text-sm text-secondary-gray">
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2 flex-shrink-0"></span>
                        {product.processor}
                    </div>
                )}
                {/* Show RAM if available */}
                {product.ram && (
                    <div className="flex items-center text-sm text-secondary-gray">
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2 flex-shrink-0"></span>
                        {product.ram}
                    </div>
                )}
                {/* Show Storage if available */}
                {product.storage && (
                    <div className="flex items-center text-sm text-secondary-gray">
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2 flex-shrink-0"></span>
                        {product.storage}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div
            className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
            onClick={() => onClick(product)}
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
                        alt={`${product.brand} ${product.model}`}
                        className="w-full h-full object-cover"
                        onError={handleImageError}
                        onLoad={handleImageLoad}
                    />
                )}

                {/* Availability Badge */}
                <div className={`absolute top-2 right-2 px-2 py-1 text-xs font-medium rounded ${product.availability
                    ? 'bg-success-green text-white'
                    : 'bg-error-red text-white'
                    }`}>
                    {product.availability ? 'Available' : 'Sold Out'}
                </div>

                {/* Category Badge - Optional */}
                {product.category && (
                    <div className="absolute top-2 left-2 px-2 py-1 text-xs font-medium bg-gray-800 text-white rounded opacity-80">
                        {product.category}
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="p-4">
                {/* Brand and Model */}
                <div className="mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{product.brand} {product.model}</h3>
                    {!product.processor && product.name && product.name !== `${product.brand} ${product.model}` && (
                        <p className="text-sm text-secondary-gray line-clamp-1">{product.name}</p>
                    )}
                </div>

                {/* Condition Badge */}
                <div className="mb-3">
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${product.condition === 'NEW'
                        ? 'bg-blue-100 text-blue-800'
                        : product.condition === 'UK_USED'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                        {formatCondition(product.condition)}
                    </span>
                </div>

                {/* Specs */}
                {renderSpecs()}

                {/* Price and Button */}
                <div className="flex items-center justify-between mt-auto">
                    <div className="text-xl font-bold text-primary-blue">
                        {formatPrice(product.price)}
                    </div>
                    <button className="px-3 py-1 bg-primary-blue text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors">
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
