"use client";

import { useState } from "react";
import BusinessSidebar from "../../component/BusinessSidebar";

export default function BusinessLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="min-h-screen bg-slate-50 flex font-sans">
            <BusinessSidebar isOpen={isSidebarOpen} />

            {/* MAIN CONTENT WRAPPER */}
            <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'} p-8`}>
                {children}
            </main>
        </div>
    );
}
