"use client";

import { useState, useEffect } from "react";
import AdminSidebar from "../../component/AdminSidebar";
import DashboardHeader from "../../component/DashboardHeader";
import FloatingChat from "../../component/FloatingChat";
import { api } from "@/lib/api";
import { Loader2 } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [user, setUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get('/admin/profile');
                const u = res.data;
                setUser({
                    name: u?.name || "Admin",
                    role: u?.role === "ADMIN" ? "Platform Authority" : u?.role || "Admin",
                    email: u?.email || "",
                    initials: (u?.name || "AD").substring(0, 2).toUpperCase(),
                });
            } catch (error) {
                console.error("Failed to fetch admin profile:", error);
                setUser({
                    name: "Admin",
                    role: "Platform Authority",
                    email: "",
                    initials: "AD",
                });
            } finally {
                setIsLoading(false);
            }
        };
        fetchProfile();
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-100 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-100 flex font-sans relative overflow-x-hidden">
            <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} user={user} />

            {/* MAIN CONTENT WRAPPER */}
            <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'} relative`}>
                <DashboardHeader
                    user={user}
                    searchPlaceholder="Search platform logs, users, or events..."
                    dashboardType="admin"
                />

                {/* Top Header Placeholder / Blur background */}
                <div className="absolute top-20 w-full h-48 bg-gradient-to-b from-orange-50 to-transparent pointer-events-none -z-0 opacity-50"></div>

                <div className="relative z-10 p-8">
                    {children}
                </div>
            </main>

            <FloatingChat />
        </div>
    );
}
