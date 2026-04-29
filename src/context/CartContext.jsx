import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    // Initialize state from localStorage if available
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('laptop_connect_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const [isCartOpen, setIsCartOpen] = useState(false);

    // Sync cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('laptop_connect_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product) => {
        setCartItems(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (productId) => {
        setCartItems(prev => prev.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, delta) => {
        setCartItems(prev => prev.map(item => {
            if (item.id === productId) {
                const newQ = item.quantity + delta;
                return newQ > 0 ? { ...item, quantity: newQ } : item;
            }
            return item;
        }));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const toggleCart = () => setIsCartOpen(!isCartOpen);

    const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            cartTotal,
            cartCount,
            isCartOpen,
            setIsCartOpen,
            toggleCart
        }}>
            {children}
        </CartContext.Provider>
    );
};
