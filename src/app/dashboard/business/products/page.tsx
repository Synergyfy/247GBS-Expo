"use client";

import { useState } from "react";
import Image from "next/image";
import Modal from "../../../component/Modal";
import Tooltip from "../../../component/Tooltip";

// --- HELP ICONS ---
const InfoIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);

export default function ProductsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [products, setProducts] = useState([
        { id: 1, name: "Premium Watch Series 1", category: "Accessories", sku: "WT-001-B", price: "299.00", stock: 45, status: "Active", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=100&auto=format&fit=crop" },
        { id: 2, name: "Premium Watch Series 2", category: "Accessories", sku: "WT-002-B", price: "349.00", stock: 12, status: "Active", image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=100&auto=format&fit=crop" },
        { id: 3, name: "Premium Watch Series 3", category: "Accessories", sku: "WT-003-B", price: "399.00", stock: 0, status: "Out of Stock", image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=100&auto=format&fit=crop" },
    ]);

    const handleAddProduct = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock adding product
        const newId = products.length + 1;
        setProducts([{
            id: newId,
            name: "New Expo Product",
            category: "General",
            sku: `NEW-00${newId}`,
            price: "199.00",
            stock: 100,
            status: "Draft",
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=100&auto=format&fit=crop" // Mock image
        }, ...products]);
        setIsModalOpen(false);
    };

    return (
        <div className="max-w-6xl">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Products & Services</h1>
                    <p className="text-slate-500">Manage your catalog for the exhibition.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-orange-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-700 shadow-lg shadow-orange-200 flex items-center gap-2 transition-transform active:scale-95"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    Add New Product
                </button>
            </div>

            {/* FILTER BAR */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 flex gap-4 mb-6">
                <input type="text" placeholder="Search products..." className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 outline-none focus:border-orange-500" />
                <select className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 outline-none">
                    <option>All Status</option>
                    <option>Active</option>
                    <option>Draft</option>
                    <option>Out of Stock</option>
                </select>
            </div>

            {/* PRODUCT LIST */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
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
                                        <div className="w-12 h-12 bg-slate-100 rounded-lg overflow-hidden relative border border-slate-200">
                                            <Image src={item.image} alt="Product" fill className="object-cover" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-slate-900">{item.name}</div>
                                            <div className="text-xs text-slate-500">{item.category}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-600">{item.sku}</td>
                                <td className="px-6 py-4 font-medium text-slate-900">£{item.price}</td>
                                <td className="px-6 py-4 text-sm text-slate-600">{item.stock} units</td>
                                <td className="px-6 py-4">
                                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${item.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : item.status === 'Out of Stock' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'}`}>
                                        {item.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex justify-end gap-3">
                                        <button className="text-slate-400 hover:text-orange-600 font-medium text-sm">Edit</button>
                                        <button className="text-slate-400 hover:text-red-600 font-medium text-sm">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="p-4 border-t border-slate-200 flex justify-center">
                    <button className="text-sm text-slate-500 font-medium px-4 py-2 hover:bg-slate-50 rounded-lg">Load More</button>
                </div>
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
                        <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 outline-none transition-shadow focus:ring-4 focus:ring-orange-500/10" placeholder="e.g. Wireless Headphones" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                                Category
                                <Tooltip content="Helps buyers find your product in the expo categories">
                                    <InfoIcon className="text-slate-400 hover:text-orange-500 cursor-help" />
                                </Tooltip>
                            </label>
                            <select className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 outline-none transition-shadow focus:ring-4 focus:ring-orange-500/10 bg-white">
                                <option>Electronics</option>
                                <option>Fashion</option>
                                <option>Home & Garden</option>
                                <option>Software</option>
                                <option>Services</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                                Status
                                <Tooltip content="Control when your product becomes visible to the public">
                                    <InfoIcon className="text-slate-400 hover:text-orange-500 cursor-help" />
                                </Tooltip>
                            </label>
                            <select className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 outline-none transition-shadow focus:ring-4 focus:ring-orange-500/10 bg-white">
                                <option>Active</option>
                                <option>Draft</option>
                                <option>Hidden</option>
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
                            <input type="number" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 outline-none transition-shadow focus:ring-4 focus:ring-orange-500/10" placeholder="0.00" />
                        </div>
                        <div>
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                                Stock Level
                                <Tooltip content="Units available for immediate shipment">
                                    <InfoIcon className="text-slate-400 hover:text-orange-500 cursor-help" />
                                </Tooltip>
                            </label>
                            <input type="number" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 outline-none transition-shadow focus:ring-4 focus:ring-orange-500/10" placeholder="100" />
                        </div>
                    </div>

                    <div>
                        <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                            Product Description
                            <Tooltip content="Tell the world why your product is amazing">
                                <InfoIcon className="text-slate-400 hover:text-orange-500 cursor-help" />
                            </Tooltip>
                        </label>
                        <textarea className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 outline-none transition-shadow focus:ring-4 focus:ring-orange-500/10 h-24" placeholder="Describe your product..."></textarea>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                                SKU
                                <Tooltip content="Unique internal code for inventory tracking">
                                    <InfoIcon className="text-slate-400 hover:text-orange-500 cursor-help" />
                                </Tooltip>
                            </label>
                            <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 outline-none transition-shadow focus:ring-4 focus:ring-orange-500/10" placeholder="PROD-001" />
                        </div>
                        <div>
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                                Image URL
                                <Tooltip content="Paste a link to your product image">
                                    <InfoIcon className="text-slate-400 hover:text-orange-500 cursor-help" />
                                </Tooltip>
                            </label>
                            <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 outline-none transition-shadow focus:ring-4 focus:ring-orange-500/10" placeholder="https://..." />
                        </div>
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 font-bold text-slate-500 hover:bg-slate-50 rounded-xl">Cancel</button>
                        <button type="submit" className="flex-1 bg-orange-600 text-white py-3 rounded-xl font-bold hover:bg-orange-700 shadow-lg shadow-orange-200 transition-colors">Save Product</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
