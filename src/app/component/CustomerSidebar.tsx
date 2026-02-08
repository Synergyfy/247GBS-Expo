"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
    LayoutDashboard, 
    Store, 
    Calendar, 
    Gift, 
    Ticket, 
    ChevronLeft, 
    ChevronRight,
    LogOut,
    User,
    Search,
    Bell,
    Globe
} from "lucide-react";

interface SidebarItemProps {
    icon: React.ElementType;
    label: string;
    href: string;
    isOpen: boolean;
    isActive: boolean;
}

const SidebarItem = ({ icon: Icon, label, href, isOpen, isActive }: SidebarItemProps) => {
    return (
        <Link
            href={href}
            className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group mb-1 ${
                isActive 
                ? "bg-orange-600 text-white shadow-lg shadow-orange-600/20" 
                : "text-slate-500 hover:bg-orange-50 hover:text-orange-600"
            }`}
        >
            <div className={`shrink-0 transition-colors ${isActive ? "text-white" : "group-hover:text-orange-600"}`}>
                <Icon className="w-5 h-5" />
            </div>
            {isOpen && (
                <div className="flex items-center justify-between w-full min-w-0">
                    <span className="font-bold text-sm tracking-tight whitespace-nowrap overflow-hidden">
                        {label}
                    </span>
                    {label === "Discover Events" && (
                        <span className="bg-red-600 text-[8px] text-white px-1.5 py-0.5 rounded font-black animate-pulse">LIVE</span>
                    )}
                </div>
            )}
        </Link>
    );
};

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export default function CustomerSidebar({ isOpen, setIsOpen }: SidebarProps) {
    const pathname = usePathname();

    const menuItems = [
        { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/customer" },
        { icon: Globe, label: "Discover Events", href: "/dashboard/customer/events" },
        { icon: Store, label: "Expo Hall", href: "/dashboard/customer/booths" },
        { icon: Calendar, label: "Live Schedule", href: "/dashboard/customer/schedule" },
        { icon: Ticket, label: "My Tickets", href: "/dashboard/customer/tickets" },
        { icon: Gift, label: "My Rewards", href: "/dashboard/customer/rewards" },
    ];

    return (
        <aside 
            className={`bg-white border-r border-slate-200 transition-all duration-300 fixed left-0 top-0 h-screen z-40 flex flex-col ${
                isOpen ? "w-64" : "w-20"
            }`}
        >
            {/* Header / Logo */}
            <div className="h-20 flex items-center px-5 border-b border-slate-50 shrink-0">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-orange-600/20 shrink-0 group-hover:scale-105 transition-transform">
                        E
                    </div>
                    {isOpen && (
                        <div className="flex flex-col animate-in fade-in slide-in-from-left-2">
                            <span className="font-black text-slate-900 leading-none tracking-tighter uppercase">247GBS</span>
                            <span className="text-[10px] font-bold text-orange-600 tracking-widest uppercase">VISITOR</span>
                        </div>
                    )}
                </Link>
            </div>

            {/* Navigation */}
            <div className="flex-1 px-4 py-6 overflow-y-auto overflow-x-hidden custom-scrollbar">
                <div className="mb-4 px-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    {isOpen ? "Main Menu" : "•••"}
                </div>
                {menuItems.map((item) => (
                    <SidebarItem
                        key={item.href}
                        {...item}
                        isOpen={isOpen}
                        isActive={pathname === item.href}
                    />
                ))}
            </div>

            {/* Footer / User Profile Area */}
            <div className="p-4 border-t border-slate-50 shrink-0">
                <div className={`flex items-center ${isOpen ? "gap-3" : "justify-center"} mb-4`}>
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-700 font-black border-2 border-white shadow-sm shrink-0">
                        JD
                    </div>
                    {isOpen && (
                        <div className="flex flex-col min-w-0 overflow-hidden">
                            <span className="font-bold text-slate-900 text-sm truncate">John Doe</span>
                            <span className="text-[10px] text-slate-500 font-bold uppercase truncate">VIP Pass Holder</span>
                        </div>
                    )}
                </div>

                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full flex items-center justify-center py-2 rounded-xl bg-slate-50 text-slate-400 hover:bg-orange-50 hover:text-orange-600 transition-all mb-2"
                >
                    {isOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                </button>

                <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all group">
                    <LogOut className="w-5 h-5 shrink-0" />
                    {isOpen && <span className="font-bold text-sm tracking-tight">Logout</span>}
                </button>
            </div>
        </aside>
    );
}
