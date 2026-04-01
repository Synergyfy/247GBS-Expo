"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Loader2 } from "lucide-react";

export default function BoothsCatalogPage() {
    const categories = ["All Booths", "Technology", "Fashion", "Health", "Home & Design", "Services"];
    const [selectedCategory, setSelectedCategory] = useState("All Booths");
    const [isLoading, setIsLoading] = useState(true);
    const [booths, setBooths] = useState<any[]>([]);

    useEffect(() => {
        loadBooths();
    }, []);

    const loadBooths = async () => {
        setIsLoading(true);
        try {
            const res = await api.get("/customer/booths");
            if (res.success) {
                setBooths(res.data);
            }
        } catch (error) {
            console.error("Failed to load booths", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <Loader2 className="w-12 h-12 text-orange-600 animate-spin" />
                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs text-center text-center">Opening the doors...</p>
            </div>
        );
    }

    const filteredBooths = selectedCategory === "All Booths" 
        ? booths 
        : booths.filter(b => b.category === selectedCategory);

    return (
        <div>
            <div className="mb-8 text-center max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Expo Hall</h1>
                <p className="text-slate-500">Discover thousands of virtual booths from industry leaders and emerging startups.</p>
            </div>

            {/* FILTERS */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
                {categories.map((cat, i) => (
                    <button
                        key={i}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-5 py-2.5 rounded-full font-medium transition-colors ${selectedCategory === cat ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20' : 'bg-white text-slate-600 border border-slate-200 hover:border-orange-500 hover:text-orange-600'}`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* BOOTHS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBooths.length > 0 ? filteredBooths.map((booth) => (
                    <div key={booth.id} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group">
                        <div className="h-48 rounded-xl bg-slate-200 relative mb-4 overflow-hidden">
                            <Image
                                src={booth.image}
                                alt={booth.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur text-xs font-bold px-2 py-1 rounded-md text-slate-900 text-center">
                                BOOTH {booth.boothNumber}
                            </div>
                            {booth.isLive && (
                                <div className="absolute top-3 left-3 bg-orange-600 text-white text-[10px] font-bold px-2 py-1 rounded text-center">
                                    LIVE NOW
                                </div>
                            )}
                        </div>
                        <div className="flex items-start justify-between mb-2">
                            <div>
                                <h3 className="font-bold text-lg text-slate-900 leading-tight">{booth.name}</h3>
                                <div className="text-xs text-slate-500 mt-1">{booth.location}</div>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                            </div>
                        </div>

                        <p className="text-slate-500 text-sm mb-4 line-clamp-2">
                            {booth.description}
                        </p>

                        <div className="flex items-center justify-between border-t border-slate-50 pt-4">
                            <div className="flex gap-2 text-xs font-medium text-slate-600">
                                <span className="bg-slate-100 px-2 py-1 rounded">{booth.category}</span>
                            </div>
                            <Link href={`/dashboard/customer/booths/${booth.id}`} className="text-orange-600 text-sm font-bold group-hover:underline">Visit Booth &rarr;</Link>
                        </div>
                    </div>
                )) : (
                    <div className="col-span-full text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                        <p className="text-slate-500 font-bold">No exhibitors found in this category.</p>
                    </div>
                )}
            </div>

            <div className="mt-12 text-center text-center">
                <button className="bg-white border border-slate-200 text-slate-600 px-8 py-3 rounded-full font-bold hover:bg-slate-50 transition-colors">
                    Load More Exhibitors
                </button>
            </div>
        </div>
    );
}