import React from 'react';
import { NavLink } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import CartIcon from './CartIcon';
import { useCart } from '../context/CartContext';

const BottomTabBar = () => {
    const { toggleCart, cartCount } = useCart();

    return (
        <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-xl border-t border-gray-200 md:hidden z-[100] px-10 py-3.5 flex justify-around items-center shadow-[0_-10px_40px_rgba(0,0,0,0.03)] pb-safe tracking-[0.15em] text-[10px] uppercase font-bold">
            <NavLink
                to="/"
                className={({ isActive }) =>
                    `flex flex-col items-center gap-1 transition-all duration-300 ${isActive ? 'text-blue-600' : 'text-gray-400'}`
                }
            >
                <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
                <span>Shop</span>
            </NavLink>

            <NavLink
                to="/cart"
                className={({ isActive }) =>
                    `flex flex-col items-center gap-1 transition-all duration-300 ${isActive ? 'text-blue-600' : 'text-gray-400'}`
                }
            >
                <div className="relative">
                    <CartIcon className="w-5 h-5" strokeWidth={1.5} />
                    {cartCount > 0 && (
                        <span className="absolute -top-1.5 -right-2.5 w-4 h-4 bg-gray-900 text-white text-[8px] flex items-center justify-center rounded-full font-bold">
                            {cartCount}
                        </span>
                    )}
                </div>
                <span>Cart</span>
            </NavLink>
        </div>
    );
};

export default BottomTabBar;
