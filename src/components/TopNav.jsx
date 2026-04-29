import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, User, MapPin, Cpu } from 'lucide-react';
import CartIcon from './CartIcon';
import { useCart } from '../context/CartContext';

const TopNav = () => {
    const { cartCount } = useCart();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const activeCategory = queryParams.get('category')?.toLowerCase();

    return (
        <header className="fixed top-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 z-[90]">
            <div className="max-w-[1400px] mx-auto h-full px-6 flex items-center justify-between">
                
                <div className="flex items-center gap-12">
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-12 h-12 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                            <img src="/logo.png" alt="Laptop Connect" className="w-full h-full object-contain" />
                        </div>
                        <div className="flex flex-col -space-y-1 hidden sm:flex">
                            <span className="text-lg font-black tracking-tighter text-gray-900 uppercase">
                                Laptop<span className="italic">Connect</span>
                            </span>
                            <span className="text-[9px] font-black tracking-[0.4em] text-gray-400 uppercase leading-none">Premium Tech</span>
                        </div>
                    </Link>

                    {/* Navigation Links */}
                    <nav className="hidden lg:flex items-center gap-8">
                        {[
                            { name: 'Home', path: '/' },
                            { name: 'About', path: '/about' },
                            { name: 'Contact', path: '/contact' },
                            { name: 'Terms', path: '/terms' }
                        ].map((link) => {
                            const isActive = location.pathname === link.path;
                            return (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`text-[13px] font-semibold tracking-wide transition-all relative py-1 ${
                                        isActive ? 'text-gray-900' : 'text-gray-400 hover:text-gray-900'
                                    }`}
                                >
                                    {link.name}
                                    {isActive && (
                                        <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gray-900 rounded-full" />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Icons & Location */}
                <div className="flex items-center gap-4 sm:gap-8">
                    {/* Location Selector - Hidden on very small screens */}
                    <button className="hidden sm:flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors group">
                        <MapPin className="w-4 h-4" />
                        <div className="flex flex-col items-start leading-none">
                            <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-0.5">Your Location</span>
                            <span className="text-xs font-bold text-gray-900 group-hover:text-gray-900">Accra, Ghana</span>
                        </div>
                    </button>
 
                    <div className="flex items-center gap-4 sm:gap-6 sm:border-l border-gray-100 sm:pl-8">
                        <button className="text-gray-500 hover:text-gray-900 transition-colors">
                            <Search className="w-5 h-5" />
                        </button>
                        
                        <Link to="/cart" className="relative group text-gray-500 hover:text-gray-900 transition-colors flex items-center">
                            <CartIcon className="w-5 h-5" />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 w-4 h-4 flex items-center justify-center bg-gray-900 text-white rounded-full text-[9px] font-bold shadow-lg shadow-gray-200">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default TopNav;
