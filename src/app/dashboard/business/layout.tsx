"use client";

import { useState } from "react";
import BusinessSidebar from "../../component/BusinessSidebar";
import FloatingChat from "../../component/FloatingChat";

export default function BusinessLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="min-h-screen bg-slate-50 flex font-sans overflow-x-hidden relative">
            <BusinessSidebar isOpen={isSidebarOpen} />

            {/* MAIN CONTENT WRAPPER */}
            <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'pl-64' : 'pl-20'}`}>
                <main className="p-4 md:p-8 lg:p-12">
                    {children}
                </main>
            </div>

            {/* SHARED FLOATING COMPONENTS */}
            <FloatingChat />
        </div>
    );
}
