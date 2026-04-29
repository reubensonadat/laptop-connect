import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    ShoppingBag,
    Package,
    TrendingUp,
    DollarSign,
    Users,
    LogOut,
    Plus,
    Edit,
    Trash2,
    Search,
    Filter,
    CheckCircle,
    XCircle,
    Clock,
    BarChart3,
    ShieldAlert,
    Cpu,
    Activity,
    Lock
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { fetchOrders, updateOrderStatus } from '../services/orderService';

const ADMIN_PASSWORD = 'admin2024';

const AdminPage = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [activeTab, setActiveTab] = useState('dashboard');
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            setPasswordError('');
            loadData();
        } else {
            setPasswordError('System: Invalid Authorization Code');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setPassword('');
    };

    const loadData = async () => {
        setLoading(true);
        try {
            const { data: productsData, error: pError } = await supabase
                .from('products')
                .select('*')
                .order('created_at', { ascending: false });
            
            if (pError) throw pError;
            setProducts(productsData || []);

            const ordersData = await fetchOrders();
            setOrders(ordersData || []);
        } catch (error) {
            console.error('Data Sync Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const analytics = {
        totalProducts: products.length,
        totalOrders: orders.length,
        totalRevenue: orders.reduce((sum, order) => sum + (Number(order.total_amount) || 0), 0),
        totalCost: orders.reduce((sum, order) => {
            const orderCost = order.order_items?.reduce((oSum, item) => oSum + (Number(item.unit_cost) * item.quantity), 0) || 0;
            return sum + orderCost;
        }, 0),
        pendingOrders: orders.filter(o => o.status === 'pending').length,
        confirmedOrders: orders.filter(o => o.status === 'confirmed').length,
        completedOrders: orders.filter(o => o.status === 'completed').length
    };

    analytics.totalProfit = analytics.totalRevenue - analytics.totalCost;

    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.order_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customer_name?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const filteredProducts = products.filter(product => {
        return product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.brand?.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const handleDeleteProduct = async (productId) => {
        if (!confirm('PROTOCOL: Confirm permanent deletion?')) return;
        try {
            const { error } = await supabase.from('products').delete().eq('id', productId);
            if (error) throw error;
            setProducts(products.filter(p => p.id !== productId));
        } catch (error) {
            alert('Protocol Error: Deletion Failed');
        }
    };

    const handleUpdateOrderStatus = async (orderId, newStatus) => {
        try {
            await updateOrderStatus(orderId, newStatus);
            setOrders(orders.map(order =>
                order.id === orderId ? { ...order, status: newStatus } : order
            ));
        } catch (error) {
            alert('Protocol Error: Status Update Failed');
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-950 px-6">
                <div className="w-full max-w-md">
                    <div className="bg-gray-900 rounded-[48px] p-8 md:p-12 border border-white/5 shadow-2xl relative overflow-hidden">
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-[80px]"></div>
                        
                        <div className="text-center mb-12 relative z-10">
                            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/10">
                                <Lock className="text-white" size={24} />
                            </div>
                            <h1 className="text-3xl font-black text-white uppercase tracking-tighter italic">Admin Login</h1>
                            <p className="text-[9px] text-gray-500 uppercase tracking-[0.4em] mt-3 font-bold">Secure Dashboard Access</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-8 relative z-10">
                            <div className="space-y-3">
                                <label className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-black ml-4">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter Admin Key"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white text-sm font-bold placeholder:text-gray-700 focus:outline-none focus:border-white/30 transition-all"
                                />
                                {passwordError && <p className="text-red-500 text-[9px] font-black uppercase tracking-widest ml-4">{passwordError}</p>}
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-white text-black py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] hover:scale-105 active:scale-95 transition-all shadow-2xl"
                            >
                                Initiate Session
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-gray-900">
            {/* Dark Header */}
            <header className="bg-gray-900 text-white pt-24 pb-12 overflow-hidden sticky top-0 z-50">
                <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-gray-800 opacity-90"></div>
                <div className="relative max-w-[1400px] mx-auto px-6 md:px-8 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                            <Activity className="text-white" size={20} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black uppercase tracking-tighter leading-none italic">Control Center</h1>
                            <p className="text-[9px] text-gray-500 uppercase tracking-[0.4em] font-black mt-2">Active Admin Session / Protocol V2.1</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                    >
                        <LogOut size={14} />
                        Terminate
                    </button>
                </div>
            </header>

            <main className="max-w-[1400px] mx-auto px-6 md:px-8 py-16">
                {/* Navigation */}
                <div className="flex flex-wrap gap-4 mb-16 border-b border-gray-100 pb-8">
                    {[
                        { id: 'dashboard', label: 'Analytics', icon: BarChart3 },
                        { id: 'products', label: 'Inventory', icon: Cpu },
                        { id: 'orders', label: 'Transfers', icon: ShoppingBag },
                    ].map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-4 px-8 py-4 rounded-2xl border transition-all duration-500 ${activeTab === tab.id
                                    ? 'bg-black border-black text-white shadow-2xl'
                                    : 'bg-white border-gray-100 text-gray-400 hover:border-black hover:text-black'
                                    }`}
                            >
                                <Icon size={18} />
                                <span className="text-[11px] font-black uppercase tracking-[0.2em]">{tab.label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Dashboard */}
                {activeTab === 'dashboard' && (
                    <div className="space-y-16 animate-in fade-in duration-700">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <StatCard icon={Package} label="System Inventory" value={analytics.totalProducts} />
                            <StatCard icon={ShoppingBag} label="Active Orders" value={analytics.totalOrders} />
                            <StatCard icon={DollarSign} label="Gross Revenue" value={`GHS ${analytics.totalRevenue.toLocaleString()}`} accent />
                            <StatCard icon={TrendingUp} label="Operational Profit" value={`GHS ${analytics.totalProfit.toLocaleString()}`} accent />
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <StatusTile icon={Clock} label="Pending" value={analytics.pendingOrders} color="text-gray-400" />
                            <StatusTile icon={CheckCircle} label="Confirmed" value={analytics.confirmedOrders} color="text-gray-600" />
                            <StatusTile icon={ShieldAlert} label="Completed" value={analytics.completedOrders} color="text-black" />
                        </div>
                    </div>
                )}

                {/* Inventory Table */}
                {activeTab === 'products' && (
                    <div className="space-y-8 animate-in fade-in duration-700">
                        <div className="flex items-center justify-between">
                            <h2 className="text-4xl font-black uppercase tracking-tighter italic">Inventory Matrix</h2>
                            <button onClick={() => navigate('/')} className="px-8 py-4 bg-black text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl hover:scale-105 transition-all">
                                + Deploy Unit
                            </button>
                        </div>
                        <div className="bg-white rounded-[40px] border border-gray-100 overflow-hidden shadow-sm">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        {['Product Name', 'Category', 'Price', 'Status', 'Actions'].map((h, i) => (
                                            <th key={i} className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {filteredProducts.map((p) => (
                                        <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-white rounded-xl overflow-hidden border border-gray-100">
                                                        <img src={p.imageUrls?.[0] || p.image} className="w-full h-full object-cover" />
                                                    </div>
                                                    <div>
                                                        <p className="font-black text-gray-900 uppercase tracking-tight leading-none">{p.name}</p>
                                                        <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-2">{p.brand} {p.model}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6"><span className="text-[10px] font-black uppercase bg-gray-100 px-3 py-1 rounded-full">{p.category}</span></td>
                                            <td className="px-8 py-6 font-black text-gray-900 tracking-tighter italic">GHS {p.price.toLocaleString()}</td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-1.5 h-1.5 rounded-full ${p.availability ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                                                    <span className="text-[10px] font-black uppercase tracking-widest">{p.availability ? 'Active' : 'Offline'}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <button onClick={() => handleDeleteProduct(p.id)} className="p-3 text-gray-300 hover:text-red-500 transition-colors">
                                                    <Trash2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Transfers Table */}
                {activeTab === 'orders' && (
                    <div className="space-y-8 animate-in fade-in duration-700">
                        <div className="flex items-center justify-between">
                            <h2 className="text-4xl font-black uppercase tracking-tighter italic">Transfer Log</h2>
                            <div className="flex bg-gray-100 p-1 rounded-2xl">
                                {['all', 'pending', 'confirmed', 'completed'].map((s) => (
                                    <button key={s} onClick={() => setStatusFilter(s)} className={`px-6 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${statusFilter === s ? 'bg-black text-white shadow-lg' : 'text-gray-400'}`}>{s}</button>
                                ))}
                            </div>
                        </div>
                        <div className="bg-white rounded-[40px] border border-gray-100 overflow-hidden shadow-sm">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        {['Order ID', 'Customer', 'Items', 'Total Price', 'Order Status'].map((h, i) => (
                                            <th key={i} className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {filteredOrders.map((o) => (
                                        <tr key={o.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-8 py-6 font-mono text-[10px] text-gray-400 font-bold uppercase">{o.order_number}</td>
                                            <td className="px-8 py-6">
                                                <p className="font-black text-gray-900 uppercase tracking-tight">{o.customer_name}</p>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">{o.customer_phone}</p>
                                            </td>
                                            <td className="px-8 py-6 text-[10px] font-black uppercase text-gray-400">{o.items?.length} Units</td>
                                            <td className="px-8 py-6 font-black text-gray-900 tracking-tighter italic">GHS {Number(o.total_amount).toLocaleString()}</td>
                                            <td className="px-8 py-6">
                                                <select
                                                    value={o.status}
                                                    onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value)}
                                                    className="bg-gray-100 border-none text-[9px] font-black uppercase tracking-widest rounded-full px-4 py-2 focus:ring-0 cursor-pointer"
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="confirmed">Confirmed</option>
                                                    <option value="completed">Completed</option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

const StatCard = ({ icon: Icon, label, value, accent }) => (
    <div className={`p-8 rounded-[40px] border border-gray-100 space-y-6 hover:shadow-2xl hover:shadow-gray-200 transition-all duration-500 group ${accent ? 'bg-black text-white border-black' : 'bg-white'}`}>
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${accent ? 'bg-white/10 text-white' : 'bg-gray-50 text-gray-300'} group-hover:scale-110 transition-transform duration-500`}>
            <Icon size={20} />
        </div>
        <div className="space-y-1">
            <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${accent ? 'text-gray-500' : 'text-gray-400'}`}>{label}</p>
            <p className="text-3xl font-black tracking-tighter italic">{value}</p>
        </div>
    </div>
);

const StatusTile = ({ icon: Icon, label, value, color }) => (
    <div className="p-8 bg-gray-50 rounded-[40px] border border-gray-100 flex items-center justify-between group">
        <div className="flex items-center gap-6">
            <div className={`w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm ${color}`}>
                <Icon size={20} />
            </div>
            <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">{label}</p>
                <p className="text-2xl font-black text-gray-900 tracking-tighter italic">{value}</p>
            </div>
        </div>
    </div>
);

export default AdminPage;
