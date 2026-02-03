"use client";

import React, { useState } from "react";
import CustomerSidebar from "../../component/CustomerSidebar";
import { Search, Bell, SearchIcon } from "lucide-react";

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="min-h-screen bg-slate-50 font-sans flex text-slate-900">
            <CustomerSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
            
            {/* Main Content Wrapper */}
            <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
                {/* Top Bar */}
                <header className="h-20 bg-white border-b border-slate-200 sticky top-0 z-30 px-8 flex items-center justify-between">
                    <div className="relative w-96 hidden md:block">
                        <input
                            type="text"
                            placeholder="Search for booths, events, or rewards..."
                            className="w-full pl-12 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/5 outline-none transition-all text-sm"
                        />
                        <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-orange-50 hover:text-orange-600 transition-all relative group">
                            <Bell className="w-5 h-5" />
                            <div className="absolute top-2.5 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-white ring-2 ring-red-500/20 group-hover:scale-110 transition-transform"></div>
                        </button>
                        
                        <div className="h-8 w-px bg-slate-200 mx-2"></div>

                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-black text-slate-900 leading-none">John Doe</p>
                                <p className="text-[10px] font-bold text-orange-600 uppercase tracking-widest mt-1">Lobby Level 1</p>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center text-white font-black shadow-lg shadow-orange-600/20 border-2 border-white cursor-pointer hover:scale-105 transition-transform">
                                JD
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}