import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
    ArrowLeft, ShoppingCart, Minus, Plus, Phone, 
    ShieldCheck, Zap, Cpu, HardDrive, Monitor, 
    Layers, Battery, Palette, Camera, Fingerprint, 
    ScanFace, Usb
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice, formatCondition } from '../utils/helpers';
import { getProductById } from '../services/productService';
import SEO from '../components/SEO';

const ProductDetailPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            setError(null);
            try {
                const foundProduct = await getProductById(id);
                if (foundProduct) {
                    setProduct(foundProduct);
                } else {
                    setError('Hardware identifier not recognized in system.');
                }
            } catch (err) {
                setError('System synchronization failed. Retry initiated.');
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleAddToCart = () => {
        if (!product) return;
        for (let i = 0; i < quantity; i++) {
            addToCart({
                id: product.id,
                name: `${product.brand} ${product.model}`,
                price: product.price,
                image: product.image,
                category: product.category,
                brand: product.brand
            });
        }
        setQuantity(1);
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-white">
                <div className="w-16 h-16 border-4 border-gray-100 border-t-black rounded-full animate-spin" />
                <p className="mt-6 text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Syncing Hardware Profile...</p>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center px-6">
                <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">{error || 'Protocol Error'}</h2>
                <Link to="/" className="px-10 py-5 bg-black text-white font-black uppercase text-[10px] tracking-[0.3em] rounded-2xl">
                    Return to Catalog
                </Link>
            </div>
        );
    }

    const techSpecs = [
        { label: 'Processor', value: product.processor, icon: <Cpu size={18} /> },
        { label: 'Memory', value: product.ram, icon: <Layers size={18} /> },
        { label: 'Storage', value: product.storage, icon: <HardDrive size={18} /> },
        { label: 'Graphics', value: product.graphics, icon: <Zap size={18} /> },
        { label: 'Display', value: product.display, icon: <Monitor size={18} /> },
        { label: 'Battery', value: product.batteryLife, icon: <Battery size={18} /> },
        { label: 'Finish', value: product.color, icon: <Palette size={18} /> },
        { label: 'Warranty', value: product.warranty, icon: <ShieldCheck size={18} /> }
    ].filter(s => s.value);

    const capabilities = [
        { label: 'Face ID', active: product.hasFaceId, icon: <ScanFace size={16} /> },
        { label: 'Fingerprint', active: product.hasFingerprint, icon: <Fingerprint size={16} /> },
        { label: 'Webcam', active: product.hasWebcam, icon: <Camera size={16} /> },
        { label: 'USB-C', active: product.hasUsbC, icon: <Usb size={16} /> },
        { label: 'Backlight', active: product.hasBacklight, icon: <Zap size={16} /> }
    ].filter(c => c.active);

    return (
        <>
            <SEO title={`${product.brand} ${product.model} | System Profile`} />
            
            <div className="min-h-screen bg-white text-gray-900">
                {/* Technical Header */}
                <header className="relative bg-gray-900 pt-32 pb-24 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-gray-800 opacity-90"></div>
                    <div className="relative max-w-[1400px] mx-auto px-6 md:px-8 flex flex-col md:flex-row justify-between items-end gap-8">
                        <div className="space-y-4">
                            <span className="inline-block py-1 px-4 rounded-full bg-white/5 border border-white/10 text-gray-400 text-[10px] font-black uppercase tracking-[0.4em]">
                                Profile / {product.category} / {product.id}
                            </span>
                            <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none">
                                {product.brand} <br /> <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-500">{product.model}</span>
                            </h1>
                        </div>
                        <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                            <ArrowLeft size={16} />
                            Exit Profile
                        </Link>
                    </div>
                </header>

                <main className="max-w-[1400px] mx-auto px-6 md:px-8 py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
                        
                        {/* Hardware Visualization */}
                        <div className="lg:col-span-7 space-y-8">
                            <div className="aspect-square max-w-[500px] rounded-2xl bg-gray-50 border border-gray-100 overflow-hidden flex items-center justify-center group relative shadow-2xl shadow-gray-200/50">
                                <img
                                    src={product.image}
                                    alt={product.model}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                />
                                <div className="absolute top-8 right-8 px-4 py-2 bg-black/80 backdrop-blur-md rounded-full text-white text-[10px] font-black uppercase tracking-widest border border-white/10">
                                    {formatCondition(product.condition)}
                                </div>
                            </div>

                            {/* Technical Capabilities Tags */}
                            <div className="flex flex-wrap gap-4">
                                {capabilities.map((cap, i) => (
                                    <div key={i} className="flex items-center gap-3 px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 group transition-all hover:bg-white hover:shadow-xl">
                                        <div className="text-gray-400 group-hover:text-black transition-colors">{cap.icon}</div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-black transition-colors">{cap.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Technical Specifications */}
                        <div className="lg:col-span-5 space-y-12">
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-gray-400 italic">
                                    <Zap size={14} />
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">Operational Status: Verified</span>
                                </div>
                                <div className="flex items-baseline gap-4">
                                    <span className="text-5xl font-black text-gray-900 tracking-tighter italic">{formatPrice(product.price)}</span>
                                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Fixed Logic Price</span>
                                </div>
                            </div>

                            {/* Matrix Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                {techSpecs.map((spec, i) => (
                                    <div key={i} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 space-y-4 hover:bg-white hover:shadow-2xl hover:shadow-gray-200 transition-all duration-500 group">
                                        <div className="text-gray-300 group-hover:text-black transition-colors">{spec.icon}</div>
                                        <div className="space-y-1">
                                            <p className="text-[9px] uppercase font-black tracking-[0.3em] text-gray-400">{spec.label}</p>
                                            <p className="text-sm font-black text-gray-900 tracking-tight">{spec.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-[10px] font-black text-gray-900 uppercase tracking-[0.4em]">Documentation</h3>
                                <p className="text-gray-500 font-medium leading-relaxed tracking-tight">
                                    {product.description || `Verified ${product.brand} ${product.model} unit. Scrupulously tested for maximum performance throughput in high-demand environments.`}
                                </p>
                            </div>

                            {/* Protocol Actions */}
                            <div className="pt-8 border-t border-gray-100 space-y-6">
                                <div className="flex items-center gap-6">
                                    <div className="flex items-center bg-gray-100 rounded-2xl p-1">
                                        <button 
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="w-12 h-12 flex items-center justify-center text-gray-400 hover:text-black transition-colors"
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span className="w-12 text-center font-black text-gray-900">{quantity}</span>
                                        <button 
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="w-12 h-12 flex items-center justify-center text-gray-400 hover:text-black transition-colors"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Acquisition Quantity</span>
                                </div>

                                <div className="grid gap-4">
                                    <button
                                        onClick={handleAddToCart}
                                        className="w-full py-6 bg-black text-white rounded-2xl font-black uppercase tracking-[0.3em] text-[11px] flex items-center justify-center gap-3 shadow-2xl hover:bg-gray-800 transition-all active:scale-95"
                                    >
                                        <ShoppingCart size={18} strokeWidth={2} />
                                        Commit to Buffer
                                    </button>
                                    
                                    <button 
                                        onClick={() => window.open(`https://wa.me/233201534711?text=Hi, I am interested in the ${product.brand} ${product.model}`, '_blank')}
                                        className="w-full py-5 border-2 border-gray-100 hover:border-black text-gray-900 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all flex items-center justify-center gap-3"
                                    >
                                        <Phone size={14} />
                                        Inquire via WhatsApp
                                    </button>
                                </div>

                                <div className="flex items-center justify-center gap-3 py-4 text-gray-400">
                                    <ShieldCheck size={16} />
                                    <span className="text-[9px] font-black uppercase tracking-[0.3em]">Verified Technical Integrity</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default ProductDetailPage;
