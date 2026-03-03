"use client";

import { useState, useEffect } from "react";
import BusinessSidebar from "../../component/BusinessSidebar";
import DashboardHeader from "../../component/DashboardHeader";
import FloatingChat from "../../component/FloatingChat";
import { api } from "@/lib/api";
import { Loader2 } from "lucide-react";

export default function BusinessLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [user, setUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await api.get('/dashboard/business/settings/profile');
                setUser({
                    name: data?.booth?.name || data?.user?.name || "My Business",
                    role: "Exhibitor",
                    email: data?.user?.email || "",
                    initials: (data?.booth?.name || data?.user?.name || "B").substring(0, 2).toUpperCase()
                });
            } catch (error) {
                console.error("Failed to fetch profile:", error);
                // Fallback for demo/error
                setUser({
                    name: "Exhibitor",
                    role: "Business Account",
                    email: "",
                    initials: "EX"
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
                <div className="text-center">
                    <Loader2 className="w-10 h-10 animate-spin text-orange-600 mx-auto mb-4" />
                    <p className="text-slate-500 font-bold animate-pulse tracking-widest uppercase text-xs">Syncing Dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 flex font-sans overflow-x-hidden relative">
            <BusinessSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} user={user} />

            <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
                <DashboardHeader
                    user={user}
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
