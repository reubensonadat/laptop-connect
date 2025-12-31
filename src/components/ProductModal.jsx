import React, { useState, useEffect } from 'react';
import { formatPrice, formatCondition } from '../utils/helpers';

const ProductModal = ({ product, isOpen, onClose }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
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
        if (isOpen && product) {
            setCurrentImageIndex(0);
            setImageError(false);
            setImageLoading(true);
        }
    }, [isOpen, product]);

    // Early return if modal is not open or no product is selected
    if (!isOpen || !product) return null;

    const handleImageError = () => {
        setImageError(true);
        setImageLoading(false);
    };

    const handleImageLoad = () => {
        setImageLoading(false);
    };

    // Get image URLs helper
    const getImageUrls = () => {
        if (!product || !product.imageUrls) return [];

        // If it's a string with commas, split it
        if (typeof product.imageUrls === 'string' && product.imageUrls.includes(',')) {
            return product.imageUrls.split(',').map(url => url.trim());
        }

        // If it's already a string without commas, return it as an array with one element
        if (typeof product.imageUrls === 'string') {
            return [product.imageUrls.trim()];
        }

        // If it's already an array, return it
        if (Array.isArray(product.imageUrls)) {
            return product.imageUrls.map(url => url.trim());
        }

        // For any other type, convert to string and return as array
        return [String(product.imageUrls).trim()];
    };

    const imageUrls = getImageUrls();

    const handleNextImage = () => {
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

    const handleCheckAvailability = () => {
        const phoneNumber = import.meta.env.VITE_WHATSAPP_PHONE_NUMBER || '233201534711';
        const message = `Hi, I'm checking availability for the ${product.brand} ${product.model} (${product.category || 'Product'}). Is it still available?`;

        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    const renderSpecs = () => {
        // Dynamic rendering of specs
        // Combine explicit known specs with the dynamic 'specs' object if available

        let displaySpecs = [];

        if (product.specs) {
            // Use the dynamic specs object if it exists
            displaySpecs = Object.entries(product.specs).map(([key, value]) => ({
                label: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim(), // Capitalize and split camelCase
                value: String(value)
            }));
        } else {
            // Fallback to manual extraction for old data
            displaySpecs = [
                { label: 'Processor', value: product.processor },
                { label: 'Memory', value: product.ram },
                { label: 'Storage', value: product.storage },
                { label: 'Graphics', value: product.graphics },
                { label: 'Display', value: product.display },
                { label: 'Battery Life', value: product.batteryLife ? `${product.batteryLife} hours` : null },
                { label: 'Weight', value: product.weight ? `${product.weight} kg` : null },
                { label: 'Warranty', value: product.warranty ? `${product.warranty} months` : null },
            ];
        }

        // Filter out empty values and boolean 'hasSomething' that might have slipped into specs if not filtered elsewhere
        displaySpecs = displaySpecs.filter(spec => {
            if (!spec.value) return false;
            // Optional: Filter out raw boolean flags if you want them in the "Features" section instead
            if (spec.label.toLowerCase().startsWith('has ') || spec.label.startsWith('Has')) return false;
            return true;
        });

        if (displaySpecs.length === 0) return null;

        return (
            <div>
                <h3 className="text-lg font-semibold mb-2">Specifications</h3>
                <div className="space-y-2">
                    {displaySpecs.map((spec, index) => (
                        <div key={index} className="flex items-start">
                            <svg className="w-5 h-5 mr-2 mt-0.5 text-primary-blue flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                                <span className="font-medium">{spec.label}:</span> {spec.value}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

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
                            {product.brand} {product.model}
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
                                            alt={`${product.brand} ${product.model}`}
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
                                                className={`flex-shrink-0 w-16 h-16 rounded border-2 ${index === currentImageIndex ? 'border-primary-blue' : 'border-transparent'
                                                    }`}
                                                onClick={() => {
                                                    setCurrentImageIndex(index);
                                                    setImageError(false);
                                                    setImageLoading(true);
                                                }}
                                            >
                                                <img
                                                    src={url}
                                                    alt={`${product.brand} ${product.model} ${index + 1}`}
                                                    className="w-full h-full object-cover rounded"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Details */}
                            <div className="space-y-4">
                                {/* Category */}
                                {product.category && (
                                    <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                                        {product.category}
                                    </div>
                                )}

                                {/* Price and Availability */}
                                <div className="flex items-center justify-between">
                                    <div className="text-2xl font-bold text-primary-blue">
                                        {formatPrice(product.price)}
                                    </div>
                                    <div className={`px-3 py-1 text-sm font-medium rounded ${product.availability
                                        ? 'bg-success-green text-white'
                                        : 'bg-error-red text-white'
                                        }`}>
                                        {product.availability ? 'Available' : 'Sold Out'}
                                    </div>
                                </div>

                                {/* Condition */}
                                <div>
                                    <span className={`inline-block px-3 py-1 text-sm font-medium rounded ${product.condition === 'NEW'
                                        ? 'bg-blue-100 text-blue-800'
                                        : product.condition === 'UK_USED'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {formatCondition(product.condition)}
                                    </span>
                                </div>

                                {/* Specifications */}
                                {renderSpecs()}

                                {/* Features */}
                                {(product.hasBacklight || product.hasFingerprint || product.hasWebcam ||
                                    product.hasUsbC || product.hasHdmi || product.hasSdCardReader || product.hasNumericPad) && (
                                        <div>
                                            <h3 className="text-lg font-semibold mb-2">Features</h3>
                                            <div className="grid grid-cols-2 gap-2">
                                                {product.hasBacklight && (
                                                    <div className="flex items-center text-sm">
                                                        <svg className="w-4 h-4 mr-1 text-success-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        Backlit Keyboard
                                                    </div>
                                                )}
                                                {product.hasFingerprint && (
                                                    <div className="flex items-center text-sm">
                                                        <svg className="w-4 h-4 mr-1 text-success-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        Fingerprint Reader
                                                    </div>
                                                )}
                                                {product.hasWebcam && (
                                                    <div className="flex items-center text-sm">
                                                        <svg className="w-4 h-4 mr-1 text-success-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        Webcam
                                                    </div>
                                                )}
                                                {product.hasUsbC && (
                                                    <div className="flex items-center text-sm">
                                                        <svg className="w-4 h-4 mr-1 text-success-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        USB-C Port
                                                    </div>
                                                )}
                                                {product.hasHdmi && (
                                                    <div className="flex items-center text-sm">
                                                        <svg className="w-4 h-4 mr-1 text-success-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        HDMI Port
                                                    </div>
                                                )}
                                                {product.hasSdCardReader && (
                                                    <div className="flex items-center text-sm">
                                                        <svg className="w-4 h-4 mr-1 text-success-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        SD Card Reader
                                                    </div>
                                                )}
                                                {product.hasNumericPad && (
                                                    <div className="flex items-center text-sm">
                                                        <svg className="w-4 h-4 mr-1 text-success-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        Numeric Pad
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                {/* Description */}
                                {product.description && (
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2">Description</h3>
                                        <p className="text-sm text-secondary-gray">{product.description}</p>
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div className='flex justify-center'>
                                    <div className="flex space-x-3 pt-4 w-full md:w-auto">
                                        <button
                                            className="flex-1 md:flex-none px-6 py-3 bg-primary-blue text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-offset-2 flex items-center justify-center shadow-lg transform hover:-translate-y-0.5"
                                            onClick={handleCheckAvailability}
                                        >
                                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                            </svg>
                                            Check Availability
                                        </button>
                                        <button
                                            className="px-6 py-3 border border-border-gray text-secondary-gray font-medium rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-offset-2"
                                            onClick={onClose}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;
