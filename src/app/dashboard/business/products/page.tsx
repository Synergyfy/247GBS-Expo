"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Modal from "../../../component/Modal";
import Tooltip from "../../../component/Tooltip";
import { api } from "@/lib/api";
import { Loader2, Plus, Search, Filter, MoreVertical, Trash2, Edit2, AlertCircle, CheckCircle2 } from "lucide-react";

// --- HELP ICONS ---
const InfoIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);

export default function ProductsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [products, setProducts] = useState<any[]>([]);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        category: "OTHER",
        status: "DRAFT",
        price: "",
        stock: "",
        description: "",
        sku: "",
        image: ""
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            const data = await api.get('/dashboard/business/products');
            setProducts(data);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleAddProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setMessage(null);

        try {
            const payload = {
                ...formData,
                price: parseFloat(formData.price) || 0,
                stock: parseInt(formData.stock) || 0
            };

            await api.post('/dashboard/business/products', payload);
            setMessage({ type: 'success', text: 'Product added successfully!' });
            setIsModalOpen(false);
            setFormData({
                name: "",
                category: "OTHER",
                status: "DRAFT",
                price: "",
                stock: "",
                description: "",
                sku: "",
                image: ""
            });
            fetchProducts();
            setTimeout(() => setMessage(null), 3000);
        } catch (error: any) {
            console.error("Failed to add product:", error);
            setMessage({ type: 'error', text: error.message || 'Failed to add product.' });
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this product?")) return;
        try {
            await api.delete(`/dashboard/business/products/${id}`);
            fetchProducts();
        } catch (error) {
            console.error("Failed to delete product:", error);
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <Loader2 className="w-10 h-10 animate-spin text-orange-600 mb-4" />
                <p className="text-slate-500 font-bold animate-pulse">Loading Catalog...</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Products & Services</h1>
                    <p className="text-slate-500">Manage your catalog for the exhibition.</p>
                </div>
                <div className="flex items-center gap-4">
                    {message && (
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium animate-in fade-in slide-in-from-top-4 ${message.type === 'success' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-red-50 text-red-600 border border-red-100'}`}>
                            {message.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                            {message.text}
                        </div>
                    )}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-orange-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-700 shadow-lg shadow-orange-200 flex items-center gap-2 transition-transform active:scale-95"
                    >
                        <Plus className="w-5 h-5" />
                        Add New Product
                    </button>
                </div>
            </div>

            {/* FILTER BAR */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 flex gap-4 mb-6 shadow-sm">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="text" placeholder="Search products..." className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2 outline-none focus:border-orange-500" />
                </div>
                <select className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 outline-none">
                    <option>All Status</option>
                    <option>ACTIVE</option>
                    <option>DRAFT</option>
                    <option>OUT_OF_STOCK</option>
                </select>
                <button className="bg-white border border-slate-200 p-2 rounded-lg hover:bg-slate-50 text-slate-500">
                    <Filter className="w-5 h-5" />
                </button>
            </div>

            {/* PRODUCT LIST */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                {products.length === 0 ? (
                    <div className="p-20 text-center">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-dashed border-slate-200">
                            <Plus className="w-10 h-10 text-slate-300" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">No products yet</h3>
                        <p className="text-slate-500 mb-6">Start by adding your first product or service.</p>
                        <button onClick={() => setIsModalOpen(true)} className="text-orange-600 font-bold hover:underline">Add product &rarr;</button>
                    </div>
                ) : (
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-slate-600 text-sm">Product</th>
                                <th className="px-6 py-4 font-semibold text-slate-600 text-sm">SKU</th>
                                <th className="px-6 py-4 font-semibold text-slate-600 text-sm">Price</th>
                                <th className="px-6 py-4 font-semibold text-slate-600 text-sm">Stock</th>
                                <th className="px-6 py-4 font-semibold text-slate-600 text-sm">Status</th>
                                <th className="px-6 py-4 font-semibold text-slate-600 text-sm text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {products.map((item) => (
                                <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-slate-100 rounded-lg overflow-hidden relative border border-slate-200 shrink-0">
                                                {item.image ? (
                                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-400 font-bold text-center px-1">No Image</div>
                                                )}
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-900 truncate max-w-[200px]">{item.name}</div>
                                                <div className="text-xs text-slate-500">{item.category}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600 font-mono">{item.sku || "—"}</td>
                                    <td className="px-6 py-4 font-medium text-slate-900">£{parseFloat(item.price).toLocaleString()}</td>
                                    <td className="px-6 py-4 text-sm text-slate-600">{item.stock} units</td>
                                    <td className="px-6 py-4">
                                        <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${item.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-700' : item.status === 'OUT_OF_STOCK' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'}`}>
                                            {item.status.replace(/_/g, ' ')}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex justify-end gap-1">
                                            <button className="p-2 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors">
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => handleDelete(item.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {/* Pagination */}
                {products.length > 0 && (
                    <div className="p-4 border-t border-slate-200 flex justify-center">
                        <button className="text-sm text-slate-500 font-medium px-4 py-2 hover:bg-slate-50 rounded-lg">Load More</button>
                    </div>
                )}
            </div>

            {/* ADD PRODUCT MODAL */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Product">
                <form className="space-y-5" onSubmit={handleAddProduct}>
                    <div>
                        <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                            Product Name
                            <Tooltip content="The main title displayed in the expo hall">
                                <InfoIcon className="text-slate-400 hover:text-orange-500 cursor-help" />
                            </Tooltip>
                        </label>
                        <input id="name" required type="text" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 outline-none transition-shadow focus:ring-4 focus:ring-orange-500/10" placeholder="e.g. Wireless Headphones" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                                Category
                                <Tooltip content="Helps buyers find your product in the expo categories">
                                    <InfoIcon className="text-slate-400 hover:text-orange-500 cursor-help" />
                                </Tooltip>
                            </label>
                            <select id="category" value={formData.category} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 outline-none transition-shadow focus:ring-4 focus:ring-orange-500/10 bg-white">
                                <option value="ELECTRONICS">Electronics</option>
                                <option value="FASHION">Fashion</option>
                                <option value="HOME_GARDEN">Home & Garden</option>
                                <option value="SOFTWARE">Software</option>
                                <option value="SERVICES">Services</option>
                                <option value="OTHER">Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                                Status
                                <Tooltip content="Control when your product becomes visible to the public">
                                    <InfoIcon className="text-slate-400 hover:text-orange-500 cursor-help" />
                                </Tooltip>
                            </label>
                            <select id="status" value={formData.status} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 outline-none transition-shadow focus:ring-4 focus:ring-orange-500/10 bg-white">
                                <option value="ACTIVE">Active</option>
                                <option value="DRAFT">Draft</option>
                                <option value="HIDDEN">Hidden</option>
                                <option value="OUT_OF_STOCK">Out of Stock</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                                Price (£)
                                <Tooltip content="Set a competitive price including tax">
                                    <InfoIcon className="text-slate-400 hover:text-orange-500 cursor-help" />
                                </Tooltip>
                            </label>
                            <input id="price" required type="number" step="0.01" value={formData.price} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 outline-none transition-shadow focus:ring-4 focus:ring-orange-500/10" placeholder="0.00" />
                        </div>
                        <div>
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                                Stock Level
                                <Tooltip content="Units available for immediate shipment">
                                    <InfoIcon className="text-slate-400 hover:text-orange-500 cursor-help" />
                                </Tooltip>
                            </label>
                            <input id="stock" required type="number" value={formData.stock} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 outline-none transition-shadow focus:ring-4 focus:ring-orange-500/10" placeholder="100" />
                        </div>
                    </div>

                    <div>
                        <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                            Product Description
                            <Tooltip content="Tell the world why your product is amazing">
                                <InfoIcon className="text-slate-400 hover:text-orange-500 cursor-help" />
                            </Tooltip>
                        </label>
                        <textarea id="description" value={formData.description} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 outline-none transition-shadow focus:ring-4 focus:ring-orange-500/10 h-24" placeholder="Describe your product..."></textarea>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                                SKU
                                <Tooltip content="Unique internal code for inventory tracking">
                                    <InfoIcon className="text-slate-400 hover:text-orange-500 cursor-help" />
                                </Tooltip>
                            </label>
                            <input id="sku" type="text" value={formData.sku} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 outline-none transition-shadow focus:ring-4 focus:ring-orange-500/10" placeholder="PROD-001" />
                        </div>
                        <div>
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                                Image URL
                                <Tooltip content="Paste a link to your product image">
                                    <InfoIcon className="text-slate-400 hover:text-orange-500 cursor-help" />
                                </Tooltip>
                            </label>
                            <input id="image" type="text" value={formData.image} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 outline-none transition-shadow focus:ring-4 focus:ring-orange-500/10" placeholder="https://..." />
                        </div>
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 font-bold text-slate-500 hover:bg-slate-50 rounded-xl transition-colors">Cancel</button>
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="flex-1 bg-orange-600 text-white py-3 rounded-xl font-bold hover:bg-orange-700 shadow-lg shadow-orange-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSaving ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Saving...
                                </>
                            ) : "Save Product"}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
