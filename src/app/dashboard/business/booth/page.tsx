"use client";

import { useState } from "react";
import Image from "next/image";

export default function MyBoothPage() {
    const [activeTab, setActiveTab] = useState("branding");

    return (
        <div className="max-w-5xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900">My Booth</h1>
                <p className="text-slate-500">Manage your digital storefront aesthetics and information.</p>
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
                            <div className="w-24 h-24 rounded-2xl bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center shrink-0 cursor-pointer hover:bg-slate-50">
                                <span className="text-xs text-slate-400 font-semibold px-2 text-center">Upload Logo</span>
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-slate-900 mb-1">Company Logo</h3>
                                <p className="text-sm text-slate-500 mb-4">Recommended: 500x500px, PNG or JPG.</p>
                                <button className="text-sm border border-slate-200 px-4 py-2 rounded-lg font-medium hover:bg-slate-50 mr-2">Choose File</button>
                            </div>
                        </div>

                        {/* Banner Upload */}
                        <div>
                            <h3 className="font-bold text-slate-900 mb-1">Booth Banner</h3>
                            <p className="text-sm text-slate-500 mb-4">This will be the main hero image of your virtual booth. Recommended: 1200x400px.</p>

                            <div className="w-full h-48 rounded-2xl bg-slate-100 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors">
                                <svg className="w-10 h-10 text-slate-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                <span className="text-sm font-medium text-slate-500">Click to upload banner image</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* INFORMATION TAB */}
                {activeTab === "information" && (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Display Name</label>
                            <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 outline-none" placeholder="Acme Corporation" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Short Tagline (1-2 sentences)</label>
                            <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 outline-none" placeholder="Leading the way in global logistics..." />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Full Description</label>
                            <textarea className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 outline-none h-32" placeholder="Tell visitors about your company history and values..."></textarea>
                            <p className="text-xs text-slate-400 mt-2 text-right">0 / 300 words</p>
                        </div>
                    </div>
                )}

                {/* CONTACT TAB */}
                {activeTab === "contact" && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Contact Person Name</label>
                                <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 outline-none" placeholder="Jane Doe" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Role/Title</label>
                                <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 outline-none" placeholder="Sales Director" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Public Email</label>
                            <input type="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 outline-none" placeholder="sales@acmecorp.com" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Phone / WhatsApp</label>
                            <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 outline-none" placeholder="+1 (555) 000-0000" />
                        </div>
                    </div>
                )}

                <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
                    <button className="bg-orange-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-700 shadow-lg shadow-orange-200 transition-all">
                        Save Changes
                    </button>
                </div>

            </div>
        </div>
    );
}
