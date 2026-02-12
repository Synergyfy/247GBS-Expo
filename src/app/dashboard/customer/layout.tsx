"use client";

import React, { useState } from "react";
import CustomerSidebar from "../../component/CustomerSidebar";
import DashboardHeader from "../../component/DashboardHeader";
import FloatingChat from "../../component/FloatingChat";
import { Radio } from "lucide-react";
import Link from "next/link";

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="min-h-screen bg-slate-50 font-sans flex text-slate-900 relative overflow-x-hidden">
            <CustomerSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

            {/* Main Content Wrapper */}
            <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
                {/* Top Bar with Live Indicator Integration */}
                <div className="sticky top-0 z-30 flex flex-col">
                    <DashboardHeader
                        user={{
                            name: "John Doe",
                            role: "Visitor",
                            email: "john.doe@example.com",
                            initials: "JD"
                        }}
                        searchPlaceholder="Search for booths, events, or rewards..."
                        dashboardType="customer"
                    />

                    {/* Secondary Header for Customer Specifics (Live Indicator) */}
                    <div className="h-12 bg-orange-600 px-8 flex items-center justify-center">
                        <Link
                            href="/dashboard/customer/events"
                            className="flex items-center gap-2 text-white animate-pulse"
                        >
                            <Radio className="w-4 h-4" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Live Now: Innovation Fair 2026</span>
                        </Link>
                    </div>
                </div>

                {/* Page Content */}
                <div className="p-8">
                    {children}
                </div>
            </main>

            <FloatingChat />
        </div>
    );
}