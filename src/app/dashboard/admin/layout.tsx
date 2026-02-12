"use client";

import { useState } from "react";
import AdminSidebar from "../../component/AdminSidebar";
import DashboardHeader from "../../component/DashboardHeader";
import FloatingChat from "../../component/FloatingChat";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="min-h-screen bg-slate-100 flex font-sans relative overflow-x-hidden">
            <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            {/* MAIN CONTENT WRAPPER */}
            <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'} relative`}>
                <DashboardHeader
                    user={{
                        name: "Super Admin",
                        role: "Platform Authority",
                        email: "admin@247gbs.com",
                        initials: "SA"
                    }}
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
