"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { api } from "@/lib/api";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export default function MyBoothPage() {
    const [activeTab, setActiveTab] = useState("branding");
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [hasBooth, setHasBooth] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        tagline: "",
        description: "",
        logo: "",
        banner: "",
        contactName: "",
        contactTitle: "",
        publicEmail: "",
        phoneDisplay: "",
        website: "",
        location: "",
        category: ""
    });

    useEffect(() => {
        const fetchBooth = async () => {
            try {
                // Ensure we use the correct business-prefixed endpoint if that's where the data lives
                const response = await api.get('/business/booth/me');
                console.log("Booth data received:", response);

                if (response) {
                    setFormData({
                        name: response.name || "",
                        tagline: response.tagline || "",
                        description: response.description || "",
                        logo: response.logo || "",
                        banner: response.banner || "",
                        contactName: response.contactName || "",
                        contactTitle: response.contactTitle || "",
                        publicEmail: response.publicEmail || "",
                        phoneDisplay: response.phoneDisplay || "",
                        website: response.website || "",
                        location: response.location || "",
                        category: response.category || ""
                    });
                    setHasBooth(true);
                }
            } catch (error: any) {
                console.error("Failed to fetch booth data:", error);
                if (error.message?.toLowerCase().includes("not found")) {
                    setHasBooth(false);
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchBooth();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSave = async () => {
        if (!formData.name) {
            setMessage({ type: 'error', text: 'Booth Name is required.' });
            return;
        }

        setIsSaving(true);
        setMessage(null);
        try {
            if (hasBooth) {
                await api.patch('/business/booth/update', formData);
                setMessage({ type: 'success', text: 'Booth updated successfully!' });
            } else {
                await api.post('/business/booth/setup', formData);
                setHasBooth(true);
                setMessage({ type: 'success', text: 'Booth created successfully!' });
            }
            // Hide message after 3 seconds
            setTimeout(() => setMessage(null), 3000);
        } catch (error: any) {
            console.error("Failed to save booth:", error);
            setMessage({ type: 'error', text: error.message || 'Failed to save. Please try again.' });
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
            </div>
        );
    }

    return (
        <div className="max-w-5xl">
            <div className="mb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">My Booth</h1>
                    <p className="text-slate-500">Manage your digital storefront aesthetics and information.</p>
                </div>
                {message && (
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium animate-in fade-in slide-in-from-top-4 ${message.type === 'success' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-red-50 text-red-600 border border-red-100'}`}>
                        {message.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                        {message.text}
                    </div>
                )}
            </div>

            {/* Tabs */}
            <div className="flex gap-6 border-b border-slate-200 mb-8">
                {["Branding", "Information", "Contact"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab.toLowerCase())}
                        className={`pb-4 px-2 font-medium text-sm transition-colors relative ${activeTab === tab.toLowerCase() ? 'text-orange-600' : 'text-slate-500 hover:text-slate-900'}`}
                    >
                        {tab}
                        {activeTab === tab.toLowerCase() && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-600 rounded-t-full"></div>
                        )}
                    </button>
                ))}
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">

                {/* BRANDING TAB */}
                {activeTab === "branding" && (
                    <div className="space-y-8">
                        {/* Logo Upload */}
                        <div className="flex items-start gap-8 border-b border-slate-100 pb-8">
                            <div className="w-24 h-24 rounded-2xl bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center shrink-0 cursor-pointer overflow-hidden group relative">
                                {formData.logo ? (
                                    <img src={formData.logo} alt="Logo" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-xs text-slate-400 font-semibold px-2 text-center">No Logo</span>
                                )}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                    <span className="text-[10px] text-white font-bold">Edit</span>
                                </div>
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-slate-900 mb-1">Company Logo</h3>
                                <p className="text-sm text-slate-500 mb-4">Provide a URL for your logo image.</p>
                                <input
                                    id="logo"
                                    type="text"
                                    className="w-full px-4 py-2 text-sm rounded-lg border border-slate-200 focus:border-orange-500 outline-none"
                                    value={formData.logo}
                                    onChange={handleChange}
                                    placeholder="https://example.com/logo.png"
                                />
                            </div>
                        </div>

                        {/* Banner Upload */}
                        <div>
                            <h3 className="font-bold text-slate-900 mb-1">Booth Banner</h3>
                            <p className="text-sm text-slate-500 mb-4">Provide a URL for your main hero image.</p>

                            <div className="w-full h-48 rounded-2xl bg-slate-100 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center overflow-hidden group relative">
                                {formData.banner ? (
                                    <img src={formData.banner} alt="Banner" className="w-full h-full object-cover" />
                                ) : (
                                    <>
                                        <svg className="w-10 h-10 text-slate-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                        <span className="text-sm font-medium text-slate-500">No banner image</span>
                                    </>
                                )}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                    <span className="text-sm text-white font-bold">Change Banner URL below</span>
                                </div>
                            </div>
                            <input
                                id="banner"
                                type="text"
                                className="w-full mt-4 px-4 py-2 text-sm rounded-lg border border-slate-200 focus:border-orange-500 outline-none"
                                value={formData.banner}
                                onChange={handleChange}
                                placeholder="https://example.com/banner.jpg"
                            />
                        </div>
                    </div>
                )}

                {/* INFORMATION TAB */}
                {activeTab === "information" && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Display Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 outline-none"
                                    placeholder="Acme Corporation"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Business Category</label>
                                <input
                                    id="category"
                                    type="text"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 outline-none"
                                    placeholder="Electronics, Fashion, Food, etc."
                                    value={formData.category}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Company Website</label>
                                <input
                                    id="website"
                                    type="text"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 outline-none"
                                    placeholder="https://acmecorp.com"
                                    value={formData.website}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Physical / Global Location</label>
                                <input
                                    id="location"
                                    type="text"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 outline-none"
                                    placeholder="London, UK or Worldwide"
                                    value={formData.location}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Short Tagline (1-2 sentences)</label>
                            <input
                                id="tagline"
                                type="text"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 outline-none"
                                placeholder="Leading the way in global logistics..."
                                value={formData.tagline}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Full Description</label>
                            <textarea
                                id="description"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 outline-none h-32"
                                placeholder="Tell visitors about your company history and values..."
                                value={formData.description}
                                onChange={handleChange}
                            ></textarea>
                            <p className="text-xs text-slate-400 mt-2 text-right">{formData.description?.length} characters</p>
                        </div>
                    </div>
                )}

                {/* CONTACT TAB */}
                {activeTab === "contact" && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Contact Person Name</label>
                                <input
                                    id="contactName"
                                    type="text"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 outline-none"
                                    placeholder="Jane Doe"
                                    value={formData.contactName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Role/Title</label>
                                <input
                                    id="contactTitle"
                                    type="text"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 outline-none"
                                    placeholder="Sales Director"
                                    value={formData.contactTitle}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Public Email</label>
                            <input
                                id="publicEmail"
                                type="email"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 outline-none"
                                placeholder="sales@acmecorp.com"
                                value={formData.publicEmail}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Phone / WhatsApp</label>
                            <input
                                id="phoneDisplay"
                                type="text"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 outline-none"
                                placeholder="+1 (555) 000-0000"
                                value={formData.phoneDisplay}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                )}

                <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="bg-orange-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-700 shadow-lg shadow-orange-200 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSaving ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Saving...
                            </>
                        ) : "Save Changes"}
                    </button>
                </div>

            </div>
        </div>
    );
}
