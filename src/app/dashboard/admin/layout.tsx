"use client";

import { useState, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import AdminSidebar from "../../component/AdminSidebar";
import AdminMobileNav from "../../component/AdminMobileNav";
import DashboardHeader from "../../component/DashboardHeader";

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
    const searchParams = useSearchParams();
    const isInitiallyCollapsed = searchParams?.get('collapsed') === 'true';
    const [isSidebarOpen, setIsSidebarOpen] = useState(!isInitiallyCollapsed);

    useEffect(() => {
        if (searchParams?.get('collapsed') === 'true') {
            setIsSidebarOpen(false);
        }
    }, [searchParams]);

    return (
        <div className="min-h-screen bg-slate-100 flex font-sans relative overflow-x-hidden">
            {/* Desktop Collapsible Sidebar (hidden on mobile) */}
            <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            {/* Mobile Bottom Navigation & Slide-Up Drawer (< lg) */}
            <AdminMobileNav />

            {/* MAIN CONTENT WRAPPER */}
            <main className={`flex-1 min-w-0 w-full max-w-full transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-20'} ml-0 relative min-h-screen flex flex-col`}>
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
                <div className="absolute top-16 sm:top-20 w-full h-48 bg-gradient-to-b from-orange-50 to-transparent pointer-events-none -z-0 opacity-50"></div>

                <div className="relative z-10 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8 flex-1">
                    {children}
                </div>
            </main>
        </div>
    );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <Suspense fallback={<div className="min-h-screen bg-slate-100" />}>
            <AdminLayoutContent>{children}</AdminLayoutContent>
        </Suspense>
    );
}
