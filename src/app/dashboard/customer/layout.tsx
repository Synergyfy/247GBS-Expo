"use client";

import React, { useState, useEffect } from "react";
import CustomerSidebar from "../../component/CustomerSidebar";
import DashboardHeader from "../../component/DashboardHeader";
import FloatingChat from "../../component/FloatingChat";
import { Radio, Loader2 } from "lucide-react";
import Link from "next/link";
import { api } from "@/lib/api";

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [user, setUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get('/customer/profile');
                const u = res.data;
                setUser({
                    name: u?.name || "Visitor",
                    role: u?.role === "CUSTOMER" ? "VIP Pass Holder" : u?.role || "Global Explorer",
                    email: u?.email || "",
                    initials: (u?.name || "VI").substring(0, 2).toUpperCase(),
                });
            } catch (error) {
                console.error("Failed to fetch customer profile:", error);
                setUser({
                    name: "Visitor",
                    role: "Global Explorer",
                    email: "",
                    initials: "VI",
                });
            } finally {
                setIsLoading(false);
            }
        };
        fetchProfile();
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 font-sans flex text-slate-900 relative overflow-x-hidden">
            <CustomerSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} user={user} />

            {/* Main Content Wrapper */}
            <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
                {/* Top Bar with Live Indicator Integration */}
                <div className="sticky top-0 z-30 flex flex-col">
                    <DashboardHeader
                        user={user}
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