"use client";

import { useState } from "react";
import Image from "next/image";
import Modal from "../../../component/Modal";
import {
  Plus,
  RefreshCw,
  Search,
  ExternalLink,
  Trash2,
  Edit3,
  X,
  Upload,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ExpoProduct {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  mcomUrl: string;
  buttonLabel?: string;
  source: "MCOM Auto-Import" | "Manual Link";
}

export default function ProductsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [importToast, setImportToast] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [imageMode, setImageMode] = useState<"upload" | "url">("upload");

  const [products, setProducts] = useState<ExpoProduct[]>([
    {
      id: 1,
      name: "Cloud Core Hub X1",
      description:
        "High-availability enterprise cloud router with automated failover and hardware encryption.",
      price: "499.00",
      image: "/ideal.png",
      mcomUrl: "https://mcommall.com/products/cloud-core-hub-x1",
      buttonLabel: "Buy Now",
      source: "MCOM Auto-Import"
    },
    {
      id: 2,
      name: "Edge Guard Pro Appliance",
      description:
        "Real-time zero-trust firewall and DDoS mitigation node for distributed retail branches.",
      price: "199.00",
      image: "/main_stage_banner.png",
      mcomUrl: "https://mcommall.com/products/edge-guard-pro",
      buttonLabel: "Buy Now",
      source: "MCOM Auto-Import"
    },
    {
      id: 3,
      name: "Global Sync Node S4",
      description:
        "Multi-region storage replication server with plug-and-play MCOM inventory synchronization.",
      price: "899.00",
      image: "/f265f1748035f3fe5d0e6839698aecfc.jpg",
      mcomUrl: "https://mcommall.com/products/global-sync-node",
      buttonLabel: "Book Now",
      source: "MCOM Auto-Import"
    }
  ]);

  const [newProd, setNewProd] = useState({
    name: "",
    description: "",
    price: "",
    image: "/hero.webp",
    mcomUrl: "",
    buttonLabel: "Buy Now"
  });

  // Auto-Import from MCOM Mall popup toast
  const handleAutoImportMcom = () => {
    setImportToast(true);
    setTimeout(() => {
      setImportToast(false);
    }, 3500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProd((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Add Product with customizable CTA button label and dual image input
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProd.name.trim()) return;
    setProducts([
      {
        id: Date.now(),
        name: newProd.name,
        description:
          newProd.description || "Direct exhibition showcase item linked to product checkout.",
        price: newProd.price || "199.00",
        image: newProd.image || "/hero.webp",
        mcomUrl: newProd.mcomUrl || "https://mcommall.com/products/item",
        buttonLabel: newProd.buttonLabel || "Buy Now",
        source: "Manual Link"
      },
      ...products
    ]);
    setNewProd({
      name: "",
      description: "",
      price: "",
      image: "/hero.webp",
      mcomUrl: "",
      buttonLabel: "Buy Now"
    });
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-4 sm:space-y-5 relative">
      {/* Toast Notification when clicking Auto-Import */}
      <AnimatePresence>
        {importToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 right-4 sm:right-8 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-white/10 flex items-center gap-3 max-w-sm"
          >
            <div className="w-8 h-8 rounded-xl bg-orange-600 flex items-center justify-center shrink-0">
              <RefreshCw className="w-4 h-4 text-white animate-spin" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Auto-Import from MCOM Mall</p>
              <p className="text-[11px] text-slate-300">Coming soon! Merchant store sync is in progress.</p>
            </div>
            <button
              onClick={() => setImportToast(false)}
              className="text-slate-400 hover:text-white ml-auto p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compact Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <h1 className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900 tracking-tight uppercase">
            MCOM Mall Products & Services
          </h1>
          <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
            Auto-import your products from MCOM Mall or link items directly to product checkout.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap shrink-0">
          <button
            type="button"
            onClick={handleAutoImportMcom}
            className="bg-slate-900 text-white px-3.5 py-2 rounded-xl font-bold text-xs hover:bg-orange-600 flex items-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95"
          >
            <RefreshCw className="w-3.5 h-3.5 text-orange-400" />
            <span>Auto-Import from MCOM Mall</span>
          </button>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="bg-orange-600 text-white px-3.5 py-2 rounded-xl font-bold text-xs hover:bg-orange-700 shadow-xs flex items-center gap-1 transition-all cursor-pointer active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products..."
          className="w-full bg-white border border-slate-200/80 rounded-xl pl-8 pr-7 py-2 text-xs font-medium outline-none focus:border-orange-500 shadow-2xs"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={() => setSearchTerm("")}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Unified Products Container (Desktop Table + Mobile Stacked Cards) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-slate-100 text-[10px] font-bold uppercase text-slate-400 tracking-wider">
              <tr>
                <th className="px-5 py-3.5">Product & Description</th>
                <th className="px-5 py-3.5">Price</th>
                <th className="px-5 py-3.5">Source</th>
                <th className="px-5 py-3.5">Action Link</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3 max-w-md">
                      <div className="w-11 h-11 bg-slate-100 rounded-xl overflow-hidden relative shrink-0 border border-slate-200/60">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                          {item.name}
                        </div>
                        <div className="text-[11px] text-slate-500 line-clamp-1">
                          {item.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 font-extrabold text-slate-900 text-xs sm:text-sm">
                    £{item.price}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                      {item.source}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <a
                      href={item.mcomUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-orange-600 font-bold text-xs hover:underline"
                    >
                      <span>{item.buttonLabel || "Buy Now"}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex justify-end gap-1.5">
                      <button
                        type="button"
                        className="p-1.5 text-slate-400 hover:text-orange-600 rounded-lg hover:bg-orange-50 cursor-pointer"
                        aria-label="Edit product"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 cursor-pointer"
                        aria-label="Delete product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Stacked List */}
        <div className="md:hidden divide-y divide-slate-100">
          {filteredProducts.map((item) => (
            <div key={item.id} className="p-3.5 space-y-2.5">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden relative shrink-0 bg-slate-100">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                      {item.source}
                    </span>
                    <span className="font-extrabold text-xs text-slate-900">£{item.price}</span>
                  </div>
                  <h3 className="font-bold text-xs sm:text-sm text-slate-900 truncate mt-0.5">
                    {item.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px]">
                <a
                  href={item.mcomUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-orange-600 inline-flex items-center gap-1 hover:underline"
                >
                  <span>{item.buttonLabel || "Buy Now"}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  className="text-slate-400 hover:text-red-600 p-1"
                  aria-label="Remove product"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* STREAMLINED ADD PRODUCT MODAL */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Product or Service"
      >
        <form className="space-y-3.5" onSubmit={handleAddProduct}>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Product Name
            </label>
            <input
              type="text"
              required
              value={newProd.name}
              onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:border-orange-500 outline-none text-xs font-bold"
              placeholder="e.g. Cloud Core Hub X1"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Product Description
            </label>
            <textarea
              rows={2}
              value={newProd.description}
              onChange={(e) => setNewProd({ ...newProd, description: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:border-orange-500 outline-none text-xs font-medium resize-none"
              placeholder="Concise description of the product..."
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Price (£)
            </label>
            <input
              type="number"
              required
              value={newProd.price}
              onChange={(e) => setNewProd({ ...newProd, price: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:border-orange-500 outline-none text-xs font-bold"
              placeholder="199.00"
            />
          </div>

          {/* DUAL IMAGE INPUT: Choose to Upload File or Enter URL */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Product Image
              </label>
              <div className="flex gap-1 bg-slate-100 p-0.5 rounded-lg text-[10px] font-bold">
                <button
                  type="button"
                  onClick={() => setImageMode("upload")}
                  className={`px-2 py-0.5 rounded-md transition-colors ${
                    imageMode === "upload" ? "bg-white text-orange-600 shadow-2xs font-extrabold" : "text-slate-500"
                  }`}
                >
                  Upload File
                </button>
                <button
                  type="button"
                  onClick={() => setImageMode("url")}
                  className={`px-2 py-0.5 rounded-md transition-colors ${
                    imageMode === "url" ? "bg-white text-orange-600 shadow-2xs font-extrabold" : "text-slate-500"
                  }`}
                >
                  Image URL
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl border border-slate-200 overflow-hidden relative shrink-0 bg-slate-100">
                <Image src={newProd.image || "/hero.webp"} alt="Preview" fill className="object-cover" />
              </div>

              {imageMode === "upload" ? (
                <label className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border-2 border-dashed border-slate-200 hover:border-orange-500 rounded-xl cursor-pointer bg-slate-50 transition-colors">
                  <Upload className="w-4 h-4 text-slate-500" />
                  <span className="text-xs font-bold text-slate-600">Click to choose image file</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              ) : (
                <input
                  type="text"
                  value={newProd.image}
                  onChange={(e) => setNewProd({ ...newProd, image: e.target.value })}
                  className="flex-1 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:border-orange-500 outline-none text-xs font-medium"
                  placeholder="https://... or /hero.webp"
                />
              )}
            </div>
          </div>

          {/* CUSTOMIZABLE BUTTON LABEL & LINK URL */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Button Action Label
              </label>
              <input
                type="text"
                value={newProd.buttonLabel}
                onChange={(e) => setNewProd({ ...newProd, buttonLabel: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:border-orange-500 outline-none text-xs font-bold"
                placeholder="e.g. Buy Now, Book Now, View Deal"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Product Link (URL)
              </label>
              <input
                type="url"
                required
                value={newProd.mcomUrl}
                onChange={(e) => setNewProd({ ...newProd, mcomUrl: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:border-orange-500 outline-none text-xs font-mono"
                placeholder="https://mcommall.com/products/item"
              />
            </div>
          </div>

          <div className="pt-2.5 border-t border-slate-100 flex gap-2.5">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="flex-1 py-2 border border-slate-200 font-bold text-xs text-slate-600 hover:bg-slate-50 rounded-xl cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
            >
              Save Product
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
