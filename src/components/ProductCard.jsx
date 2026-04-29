import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice, formatCondition } from '../utils/helpers';

const ProductCard = ({ product }) => {
    const [imageLoading, setImageLoading] = useState(true);
    const { addToCart } = useCart();

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();

        addToCart({
            id: product.id,
            name: `${product.brand} ${product.model}`,
            price: product.price,
            image: product.image,
            category: product.category,
            brand: product.brand
        });
    };

    return (
        <Link
            to={`/product/${product.id}`}
            className="group relative flex flex-col transition-all duration-700 hover:-translate-y-3"
        >
            {/* Image Section - Technical Border */}
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center transition-all duration-700 group-hover:shadow-2xl group-hover:shadow-gray-200">
                {imageLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                        <div className="w-6 h-6 border-2 border-gray-200 border-t-black rounded-full animate-spin"></div>
                    </div>
                )}

                <img
                    src={product.image}
                    alt={`${product.brand} ${product.model}`}
                    className={`w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 ${imageLoading ? 'opacity-0' : 'opacity-100'} ${!product.availability ? 'grayscale opacity-50' : ''}`}
                    onLoad={() => setImageLoading(false)}
                />

                {/* Status Indicator */}
                <div className="absolute top-6 left-6">
                    <span className="px-3 py-1.5 bg-black text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-full shadow-xl">
                        {formatCondition(product.condition)}
                    </span>
                </div>

                {/* Quick Add Overlay */}
                <div className="absolute inset-x-6 bottom-6 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700 z-10">
                    <button
                        onClick={handleAddToCart}
                        disabled={!product.availability}
                        className="w-full py-4 bg-white text-black rounded-[20px] font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl hover:scale-105 transition-all active:scale-95 disabled:opacity-30"
                    >
                        {product.availability ? 'Commit to Buffer' : 'Sold Out'}
                    </button>
                </div>
            </div>

            {/* Content Section - Monochromatic */}
            <div className="pt-8 pb-2 flex flex-col flex-1 space-y-4">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">
                            {product.brand}
                        </span>
                        <div className="w-1 h-1 bg-gray-200 rounded-full" />
                        <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">
                            {product.category}
                        </span>
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 leading-[0.9] uppercase tracking-tighter italic group-hover:text-gray-500 transition-colors">
                        {product.model}
                    </h3>
                </div>

                <div className="flex items-end justify-between border-t border-gray-50 pt-4">
                    <div className="flex flex-col">
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Valuation</span>
                        <span className="text-2xl font-black text-gray-900 tracking-tighter italic">
                            {formatPrice(product.price)}
                        </span>
                    </div>
                    
                    {product.processor && (
                        <div className="text-right flex flex-col items-end">
                             <Zap size={12} className="text-gray-300 mb-1" />
                             <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest max-w-[100px] truncate">
                                {product.processor}
                             </span>
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
