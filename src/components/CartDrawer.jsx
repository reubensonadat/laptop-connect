import React, { useState } from 'react';
import { X, Minus, Plus, ShoppingBag, MapPin, User, Phone, Truck, CheckCircle, Loader2, Trash2, Send, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext';
import * as orderService from '../services/orderService';

const CartDrawer = () => {
    const { isCartOpen, setIsCartOpen, cartItems, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
    const [isLocating, setIsLocating] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        phone: '',
        location: ''
    });
    const [deliveryMethod, setDeliveryMethod] = useState('delivery');
    const WHATSAPP_NUMBER = '233201534711';

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomerInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleGetLocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocation not supported by your browser.");
            return;
        }
        setIsLocating(true);
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                setCustomerInfo(prev => ({ ...prev, location: `GPS: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}` }));
                setIsLocating(false);
            },
            () => {
                alert("Unable to retrieve your location.");
                setIsLocating(false);
            }
        );
    };

    const handleCheckout = async () => {
        if (cartItems.length === 0) return;

        if (!customerInfo.name || !customerInfo.phone || (deliveryMethod === 'delivery' && !customerInfo.location)) {
            alert('Please provide your name, phone, and delivery address.');
            return;
        }

        setIsSubmitting(true);

        try {
            const orderNumber = 'LC' + Date.now().toString().slice(-8);

            // WhatsApp message template
            let message = `🛍️ *NEW ORDER - LAPTOP CONNECT*\n`;
            message += `---------------------------\n`;
            message += `Order ID: ${orderNumber}\n`;
            message += `Customer: ${customerInfo.name}\n`;
            message += `Phone: ${customerInfo.phone}\n`;
            message += `Method: ${deliveryMethod.toUpperCase()}\n`;

            if (deliveryMethod === 'delivery') {
                message += `Address: ${customerInfo.location}\n`;
            }

            message += `---------------------------\n`;
            message += `Products:\n`;
            cartItems.forEach((item, index) => {
                message += `${index + 1}. ${item.name} [Qty: ${item.quantity}] (GHS ${item.price.toLocaleString()})\n`;
            });

            message += `---------------------------\n`;
            message += `TOTAL: GHS ${cartTotal.toLocaleString()}\n`;
            message += `---------------------------`;

            const encodedMessage = encodeURIComponent(message);

            // Persist to database
            const { success } = await orderService.createOrder({
                orderNumber,
                customerName: customerInfo.name,
                customerPhone: customerInfo.phone,
                deliveryMethod,
                deliveryLocation: customerInfo.location,
                total: cartTotal
            }, cartItems);

            window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');

            clearCart();
            setIsCartOpen(false);
            window.location.reload();

        } catch (error) {
            console.error('Checkout error:', error);
            alert('Failed to process order. Please check your connection.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/60 backdrop-blur-md z-[150] transition-opacity duration-700 ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsCartOpen(false)}
            />

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-[500px] max-w-full bg-white z-[160] shadow-2xl flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-10 py-10 bg-gray-950 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 text-white/5 pointer-events-none">
                        <ShoppingBag size={120} strokeWidth={1} />
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Shopping Cart</span>
                        </div>
                        <h2 className="text-3xl font-black uppercase tracking-tighter italic leading-none">Your Items</h2>
                    </div>
                    <button
                        onClick={() => setIsCartOpen(false)}
                        className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all z-10"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto no-scrollbar p-10 space-y-12 bg-white">
                    {cartItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center space-y-8">
                            <div className="w-24 h-24 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-200">
                                <ShoppingBag size={40} strokeWidth={0.5} />
                            </div>
                            <div className="space-y-2">
                                <p className="text-xl font-black uppercase tracking-tight text-gray-900">Cart is Empty</p>
                                <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-black">No products added yet.</p>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {cartItems.map((item) => (
                                <div key={item.id} className="group flex gap-8 relative p-6 bg-gray-50/50 rounded-2xl border border-transparent hover:border-gray-100 hover:bg-white transition-all duration-500">
                                    <div className="w-20 h-20 flex-shrink-0 bg-white border border-gray-100 rounded-[20px] overflow-hidden">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                                    </div>
                                    <div className="flex-1 space-y-3">
                                        <div className="flex justify-between items-start">
                                            <div className="space-y-1">
                                                <span className="text-[8px] uppercase tracking-[0.3em] text-gray-400 font-black italic leading-none">{item.brand}</span>
                                                <h3 className="text-xs font-black text-gray-900 uppercase tracking-tight leading-none group-hover:text-gray-500 transition-colors">{item.name}</h3>
                                            </div>
                                            <button onClick={() => removeFromCart(item.id)} className="text-gray-200 hover:text-red-500 transition-colors"><Trash2 size={12} /></button>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3 bg-white border border-gray-100 px-2 py-1 rounded-xl">
                                                <button onClick={() => updateQuantity(item.id, Math.max(1, (item.quantity || 1) - 1))} className="text-gray-300 hover:text-black"><Minus size={10} /></button>
                                                <span className="text-[10px] font-black w-3 text-center">{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)} className="text-gray-300 hover:text-black"><Plus size={10} /></button>
                                            </div>
                                            <span className="text-sm font-black text-gray-900 tracking-tighter italic">GHS {item.price.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {cartItems.length > 0 && (
                    <div className="p-10 bg-white border-t border-gray-100 space-y-8">
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => setDeliveryMethod('delivery')}
                                className={`py-4 rounded-2xl text-[9px] font-black uppercase tracking-widest border transition-all ${deliveryMethod === 'delivery' ? 'bg-black text-white border-black shadow-xl' : 'bg-white text-gray-400 border-gray-100 hover:border-black hover:text-black'}`}
                            >
                                Delivery
                            </button>
                            <button
                                onClick={() => setDeliveryMethod('pickup')}
                                className={`py-4 rounded-2xl text-[9px] font-black uppercase tracking-widest border transition-all ${deliveryMethod === 'pickup' ? 'bg-black text-white border-black shadow-xl' : 'bg-white text-gray-400 border-gray-100 hover:border-black hover:text-black'}`}
                            >
                                Pickup
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="relative group">
                                <User className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-black transition-colors" />
                                <input
                                    type="text"
                                    name="name"
                                    value={customerInfo.name}
                                    onChange={handleInputChange}
                                    placeholder="Full Name"
                                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-14 pr-6 py-5 text-[10px] font-black uppercase tracking-widest placeholder:text-gray-200 focus:outline-none focus:border-black transition-all"
                                />
                            </div>
                            <div className="relative group">
                                <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-black transition-colors" />
                                <input
                                    type="tel"
                                    name="phone"
                                    value={customerInfo.phone}
                                    onChange={handleInputChange}
                                    placeholder="Phone Number"
                                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-14 pr-6 py-5 text-[10px] font-black uppercase tracking-widest placeholder:text-gray-200 focus:outline-none focus:border-black transition-all"
                                />
                            </div>
                            {deliveryMethod === 'delivery' && (
                                <div className="relative group">
                                    <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-black transition-colors" />
                                    <input
                                        type="text"
                                        name="location"
                                        value={customerInfo.location}
                                        onChange={handleInputChange}
                                        placeholder="Delivery Address"
                                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-14 pr-20 py-5 text-[10px] font-black uppercase tracking-widest placeholder:text-gray-200 focus:outline-none focus:border-black transition-all"
                                    />
                                    <button onClick={handleGetLocation} className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] font-black uppercase text-gray-400 hover:text-black transition-colors">GPS</button>
                                </div>
                            )}
                        </div>

                        <div className="space-y-4 pt-6 border-t border-gray-100">
                            <div className="flex justify-between items-center px-2">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Total Price</span>
                                <span className="text-3xl font-black text-gray-900 tracking-tighter italic">GHS {cartTotal.toLocaleString()}</span>
                            </div>
                            <button
                                onClick={handleCheckout}
                                disabled={isSubmitting}
                                className="w-full bg-black text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-3 shadow-2xl hover:bg-gray-800 transition-all active:scale-95 disabled:opacity-50"
                            >
                                {isSubmitting ? 'Syncing...' : 'Complete Order'}
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

const ChevronRight = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="m9 18 6-6-6-6" />
    </svg>
);

export default CartDrawer;
