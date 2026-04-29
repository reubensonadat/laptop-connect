import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ShoppingBag, Info, Phone, LayoutDashboard } from 'lucide-react';
import logo from '../assets/logo.png';
import CartIcon from './CartIcon';
import { useCart } from '../context/CartContext';

const Sidebar = () => {
    const { cartCount } = useCart();

    return (
        <aside className="fixed left-0 top-0 h-screen w-[280px] bg-gray-50 border-r border-gray-200 flex flex-col py-16 px-10 z-[100] hidden md:flex select-none">
            {/* Centered Premium Branding Area */}
            <div className="flex flex-col items-center text-center mb-24">
                <Link to="/" className="block group">
                    <div className="w-20 mb-6 transition-all duration-700 group-hover:scale-110">
                        <img src={logo} alt="Laptop Connect" className="w-full h-auto object-contain" />
                    </div>
                    <div className="space-y-1">
                        <span className="font-heading text-3xl tracking-[0.25em] text-gray-900 uppercase block leading-none">Laptop</span>
                        <span className="font-heading text-3xl tracking-[0.25em] text-blue-600 uppercase block leading-none">Connect</span>
                        <span className="text-[10px] tracking-[0.4em] text-gray-400 uppercase block font-medium">Gadgets & More</span>
                    </div>
                </Link>
            </div>

            {/* Navigation Links - Consistent Global Button Style */}
            <nav className="flex-1 space-y-8">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `group relative flex items-center gap-4 px-8 py-5 text-[11px] uppercase font-black tracking-[0.3em] transition-all duration-500 rounded-full border overflow-hidden ${isActive
                            ? 'bg-gray-900 border-gray-900 text-white shadow-2xl'
                            : 'bg-white border-gray-200 text-gray-400 hover:border-gray-900 hover:shadow-xl hover:-translate-y-1'
                        }`
                    }
                >
                    {({ isActive }) => (
                        <>
                            {!isActive && (
                                <div className="absolute inset-0 bg-gray-900 top-full group-hover:top-0 transition-all duration-500" />
                            )}
                            <ShoppingBag className={`relative z-10 w-4 h-4 transition-colors duration-500 ${isActive ? 'text-white' : 'group-hover:text-white'}`} />
                            <span className={`relative z-10 transition-colors duration-500 ${isActive ? 'text-white' : 'group-hover:text-white'}`}>
                                Shop
                            </span>
                        </>
                    )}
                </NavLink>

                <NavLink
                    to="/cart"
                    className={({ isActive }) =>
                        `group relative flex items-center gap-4 px-8 py-5 text-[11px] uppercase font-black tracking-[0.3em] transition-all duration-500 rounded-full border overflow-hidden ${isActive
                            ? 'bg-gray-900 border-gray-900 text-white shadow-2xl'
                            : 'bg-white border-gray-200 text-gray-400 hover:border-gray-900 hover:shadow-xl hover:-translate-y-1'
                        }`
                    }
                >
                    {({ isActive }) => (
                        <>
                            {!isActive && (
                                <div className="absolute inset-0 bg-gray-900 top-full group-hover:top-0 transition-all duration-500" />
                            )}
                            <div className="relative z-10">
                                <CartIcon className={`w-4 h-4 transition-colors duration-500 ${isActive ? 'text-white' : 'group-hover:text-white'}`} />
                                {cartCount > 0 && (
                                    <span className={`absolute -top-3 -right-4 w-4.5 h-4.5 flex items-center justify-center rounded-full text-[8px] font-black shadow-sm transition-colors duration-500 ${isActive ? 'bg-white text-gray-900' : 'bg-blue-600 text-white'}`}>
                                        {cartCount}
                                    </span>
                                )}
                            </div>
                            <span className={`relative z-10 transition-colors duration-500 ${isActive ? 'text-white' : 'group-hover:text-white'}`}>
                                Cart
                            </span>
                        </>
                    )}
                </NavLink>

                <NavLink
                    to="/about"
                    className={({ isActive }) =>
                        `group relative flex items-center gap-4 px-8 py-5 text-[11px] uppercase font-black tracking-[0.3em] transition-all duration-500 rounded-full border overflow-hidden ${isActive
                            ? 'bg-gray-900 border-gray-900 text-white shadow-2xl'
                            : 'bg-white border-gray-200 text-gray-400 hover:border-gray-900 hover:shadow-xl hover:-translate-y-1'
                        }`
                    }
                >
                    {({ isActive }) => (
                        <>
                            {!isActive && (
                                <div className="absolute inset-0 bg-gray-900 top-full group-hover:top-0 transition-all duration-500" />
                            )}
                            <Info className={`relative z-10 w-4 h-4 transition-colors duration-500 ${isActive ? 'text-white' : 'group-hover:text-white'}`} />
                            <span className={`relative z-10 transition-colors duration-500 ${isActive ? 'text-white' : 'group-hover:text-white'}`}>
                                About
                            </span>
                        </>
                    )}
                </NavLink>

                <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                        `group relative flex items-center gap-4 px-8 py-5 text-[11px] uppercase font-black tracking-[0.3em] transition-all duration-500 rounded-full border overflow-hidden ${isActive
                            ? 'bg-gray-900 border-gray-900 text-white shadow-2xl'
                            : 'bg-white border-gray-200 text-gray-400 hover:border-gray-900 hover:shadow-xl hover:-translate-y-1'
                        }`
                    }
                >
                    {({ isActive }) => (
                        <>
                            {!isActive && (
                                <div className="absolute inset-0 bg-gray-900 top-full group-hover:top-0 transition-all duration-500" />
                            )}
                            <Phone className={`relative z-10 w-4 h-4 transition-colors duration-500 ${isActive ? 'text-white' : 'group-hover:text-white'}`} />
                            <span className={`relative z-10 transition-colors duration-500 ${isActive ? 'text-white' : 'group-hover:text-white'}`}>
                                Contact
                            </span>
                        </>
                    )}
                </NavLink>

                <NavLink
                    to="/admin"
                    className={({ isActive }) =>
                        `group relative flex items-center gap-4 px-8 py-5 text-[11px] uppercase font-black tracking-[0.3em] transition-all duration-500 rounded-full border overflow-hidden ${isActive
                            ? 'bg-gray-900 border-gray-900 text-white shadow-2xl'
                            : 'bg-white border-gray-200 text-gray-400 hover:border-gray-900 hover:shadow-xl hover:-translate-y-1'
                        }`
                    }
                >
                    {({ isActive }) => (
                        <>
                            {!isActive && (
                                <div className="absolute inset-0 bg-gray-900 top-full group-hover:top-0 transition-all duration-500" />
                            )}
                            <LayoutDashboard className={`relative z-10 w-4 h-4 transition-colors duration-500 ${isActive ? 'text-white' : 'group-hover:text-white'}`} />
                            <span className={`relative z-10 transition-colors duration-500 ${isActive ? 'text-white' : 'group-hover:text-white'}`}>
                                Admin
                            </span>
                        </>
                    )}
                </NavLink>
            </nav>

            {/* Footer Info */}
            <div className="mt-auto space-y-6">
                <div className="h-[1px] w-16 bg-blue-600/40" />
                <div className="space-y-2">
                    <p className="text-[9px] tracking-[0.4em] text-gray-300 uppercase font-extrabold">Contact Us</p>
                    <a href="tel:0201534711" className="group block">
                        <span className="text-[13px] font-bold text-blue-600 group-hover:text-gray-900 transition-colors tracking-tight">
                            020 153 4711
                        </span>
                    </a>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
