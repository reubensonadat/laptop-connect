import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import {
    ShoppingBag, Trash2, ChevronRight, User, Phone,
    MapPin, Send, ArrowLeft, Cpu, Layers,
    ShieldCheck, Zap, Minus, Plus
} from 'lucide-react';
import * as orderService from '../services/orderService';
import SEO from '../components/SEO';

const CartPage = () => {
    const { cartItems, removeFromCart, updateQuantity, cartTotal, cartCount, clearCart } = useCart();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        phone: '',
        location: ''
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomerInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckout = async (e) => {
        e.preventDefault();
        if (!customerInfo.name || !customerInfo.phone || !customerInfo.location) {
            alert("Please provide your name, phone, and delivery address.");
            return;
        }

        setIsSubmitting(true);
        try {
            const result = await orderService.createOrder(customerInfo, cartItems, cartTotal);

            if (result.success) {
                const phoneNumber = '+233201534711';
                const message = `🛍️ *NEW ORDER - LAPTOP CONNECT*\n` +
                    `---------------------------\n` +
                    `Order ID: ${result.order?.order_number || 'PENDING'}\n` +
                    `Customer: ${customerInfo.name}\n` +
                    `Phone: ${customerInfo.phone}\n` +
                    `Address: ${customerInfo.location}\n` +
                    `---------------------------\n` +
                    `Items:\n` +
                    `${cartItems.map(item => `> ${item.name} [x${item.quantity}] (GHS ${item.price.toLocaleString()})`).join('\n')}\n` +
                    `---------------------------\n` +
                    `TOTAL: GHS ${cartTotal.toLocaleString()}\n` +
                    `---------------------------`;

                const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
                clearCart();
                navigate('/');
            }
        } catch (error) {
            console.error('Order Error:', error);
            alert("Order failed. Please check your connection.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
                <div className="w-32 h-32 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-200 mb-8">
                    <ShoppingBag size={48} strokeWidth={0.5} />
                </div>
                <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter mb-4">Your Cart is Empty</h1>
                <p className="text-[10px] uppercase tracking-[0.4em] text-gray-400 font-black mb-10 max-w-xs">You haven't added any products to your cart yet.</p>
                <Link to="/" className="px-12 py-6 bg-black text-white font-black uppercase text-[11px] tracking-[0.3em] rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-2xl">
                    Go Shopping
                </Link>
            </div>
        );
    }

    return (
        <>
            <SEO title="Shopping Cart | Laptop Connect" />

            <div className="min-h-screen bg-white text-gray-900">
                {/* Header */}
                <header className="relative bg-gray-900 pt-48 pb-32 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-gray-800 opacity-90"></div>
                    <div className="relative max-w-[1400px] mx-auto px-6 md:px-8">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                                    <span className="text-[11px] font-black uppercase tracking-[0.5em] text-gray-500">Laptop Connect / Checkout</span>
                                </div>
                                <h1 className="text-6xl md:text-9xl font-black text-white uppercase tracking-tighter leading-none">
                                    Shopping <br /> <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-500">Cart.</span>
                                </h1>
                            </div>
                            <Link to="/" className="flex items-center gap-3 text-gray-400 hover:text-white transition-all text-[11px] font-black uppercase tracking-[0.4em] mb-4 group">
                                <ArrowLeft size={18} className="group-hover:-translate-x-2 transition-transform" />
                                Back to Store
                            </Link>
                        </div>
                    </div>
                </header>

                <main className="max-w-[1400px] mx-auto px-6 md:px-8 py-24">
                    <div className="grid lg:grid-cols-12 gap-24 items-start">

                        {/* Items List */}
                        <div className="lg:col-span-7 space-y-12">
                            <div className="flex items-center justify-between border-b border-gray-100 pb-8">
                                <h2 className="text-2xl font-black uppercase tracking-tighter italic">Order Summary</h2>
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">{cartCount} Items</span>
                            </div>

                            <div className="space-y-4">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="group flex flex-col md:flex-row items-center gap-8 p-8 bg-white border border-gray-100 rounded-2xl hover:shadow-2xl hover:shadow-gray-100 transition-all duration-700 relative overflow-hidden">
                                        <div className="absolute top-0 left-0 w-1.5 h-full bg-gray-50 group-hover:bg-black transition-colors" />

                                        {/* Hardware Visual */}
                                        <div className="w-32 h-32 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 border border-gray-50 relative">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                                        </div>

                                        {/* Unit Profile */}
                                        <div className="flex-1 space-y-4 w-full">
                                            <div className="flex justify-between items-start">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[9px] uppercase tracking-[0.3em] font-black text-gray-400 italic">{item.brand}</span>
                                                        <div className="w-1 h-1 bg-gray-100 rounded-full" />
                                                        <span className="text-[9px] uppercase tracking-[0.3em] font-black text-gray-300">Certified Tech</span>
                                                    </div>
                                                    <h3 className="text-2xl font-black uppercase tracking-tighter text-gray-900 leading-[0.9]">
                                                        {item.name}
                                                    </h3>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="p-4 bg-gray-50 text-gray-300 hover:text-red-500 rounded-2xl border border-gray-100 transition-all hover:scale-105"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>

                                            {/* Manifest Footer */}
                                            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-4 border-t border-gray-50">
                                                <div className="flex items-center gap-4 bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, Math.max(1, (item.quantity || 1) - 1))}
                                                        className="w-10 h-10 flex items-center justify-center bg-white rounded-xl text-gray-400 hover:text-black transition-colors shadow-sm"
                                                    >
                                                        <Minus size={14} />
                                                    </button>
                                                    <span className="w-10 text-center font-black text-gray-900 text-sm italic">{item.quantity || 1}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                                                        className="w-10 h-10 flex items-center justify-center bg-white rounded-xl text-gray-400 hover:text-black transition-colors shadow-sm"
                                                    >
                                                        <Plus size={14} />
                                                    </button>
                                                </div>

                                                <div className="flex items-end gap-3">
                                                    <div className="text-right">
                                                        <p className="text-[9px] font-black uppercase tracking-widest text-gray-300 mb-1">Price</p>
                                                        <p className="text-2xl font-black tracking-tighter text-gray-900 italic">GHS {item.price.toLocaleString()}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="p-10 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between group">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-gray-300 shadow-sm group-hover:scale-110 transition-transform">
                                        <ShieldCheck size={28} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Security Guaranteed</p>
                                        <p className="text-sm font-black text-gray-900 uppercase tracking-tight">Verified Professional Service</p>
                                    </div>
                                </div>
                                <Zap className="text-gray-200" size={32} />
                            </div>
                        </div>

                        {/* Checkout Form */}
                        <div className="lg:col-span-5">
                            <div className="bg-gray-900 rounded-3xl p-12 md:p-16 text-white sticky top-32 shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-16 text-white/5 pointer-events-none">
                                    <Send size={240} strokeWidth={1} />
                                </div>

                                <div className="relative z-10 space-y-16">
                                    <div className="space-y-6">
                                        <h2 className="text-4xl font-black uppercase tracking-tighter italic leading-tight">Checkout</h2>
                                        <p className="text-gray-400 text-sm font-bold leading-relaxed tracking-wide">Please enter your details to complete your order. We will contact you on WhatsApp to confirm delivery.</p>
                                    </div>

                                    <form onSubmit={handleCheckout} className="space-y-6">
                                        <div className="space-y-4">
                                            <div className="relative group">
                                                <User className="absolute left-8 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-white transition-colors" />
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={customerInfo.name}
                                                    onChange={handleInputChange}
                                                    placeholder="Full Name"
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-16 pr-8 py-6 text-sm font-bold placeholder:text-gray-700 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
                                                    required
                                                />
                                            </div>
                                            <div className="relative group">
                                                <Phone className="absolute left-8 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-white transition-colors" />
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={customerInfo.phone}
                                                    onChange={handleInputChange}
                                                    placeholder="Phone Number"
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-16 pr-8 py-6 text-sm font-bold placeholder:text-gray-700 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
                                                    required
                                                />
                                            </div>
                                            <div className="relative group">
                                                <MapPin className="absolute left-8 top-8 w-4 h-4 text-gray-600 group-focus-within:text-white transition-colors" />
                                                <textarea
                                                    name="location"
                                                    value={customerInfo.location}
                                                    onChange={handleInputChange}
                                                    placeholder="Delivery Address"
                                                    rows="4"
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-16 pr-8 py-8 text-sm font-bold placeholder:text-gray-700 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all resize-none"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="pt-10 border-t border-white/10 space-y-8">
                                            <div className="flex justify-between items-center px-2">
                                                <div className="space-y-1">
                                                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-500">Total Amount</span>
                                                    <p className="text-4xl font-black text-white tracking-tighter italic">GHS {cartTotal.toLocaleString()}</p>
                                                </div>
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full bg-white text-black py-8 rounded-2xl font-black uppercase tracking-[0.3em] text-[12px] flex items-center justify-center gap-4 transition-all duration-700 hover:scale-105 active:scale-95 disabled:opacity-50 shadow-2xl"
                                            >
                                                {isSubmitting ? 'Processing...' : 'Place Order'}
                                                <ChevronRight size={18} />
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>
                </main>
            </div>
        </>
    );
};

export default CartPage;
