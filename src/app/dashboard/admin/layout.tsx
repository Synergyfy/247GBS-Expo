"use client";

import { useState } from "react";
import AdminSidebar from "../../component/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="min-h-screen bg-slate-100 flex font-sans">
            <AdminSidebar isOpen={isSidebarOpen} />

            {/* MAIN CONTENT WRAPPER */}
            <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'} relative`}>
                {/* Top Header Placeholder / Blur background */}
                <div className="absolute top-0 w-full h-64 bg-gradient-to-b from-slate-200 to-transparent pointer-events-none -z-0 opacity-50"></div>

                <div className="relative z-10 p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
