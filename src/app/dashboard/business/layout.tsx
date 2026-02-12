"use client";

import { useState } from "react";
import BusinessSidebar from "../../component/BusinessSidebar";
import DashboardHeader from "../../component/DashboardHeader";
import FloatingChat from "../../component/FloatingChat";

export default function BusinessLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="min-h-screen bg-slate-50 flex font-sans overflow-x-hidden relative">
            <BusinessSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
                <DashboardHeader
                    user={{
                        name: "Acme Corp",
                        role: "Premium Exhibitor",
                        email: "contact@acme.com",
                        initials: "AC"
                    }}
                    searchPlaceholder="Search products, sales, or messages..."
                    dashboardType="business"
                />

                <div className="p-4 md:p-8 lg:p-12">
                    {children}
                </div>
            </main>

            {/* SHARED FLOATING COMPONENTS */}
            <FloatingChat />
        </div>
    );
}
