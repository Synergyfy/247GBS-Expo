"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
    LayoutDashboard, 
    ClipboardList, 
    Gavel, 
    Banknote, 
    ShieldCheck, 
    AlertTriangle, 
    Activity, 
    MessageSquare,
    Settings,
    ChevronLeft,
    ChevronRight,
    BarChart3,
    History
} from "lucide-react";

interface AdminSidebarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export default function AdminSidebar({ isOpen, setIsOpen }: AdminSidebarProps) {
    const pathname = usePathname();

    interface MenuItem {
        label: string;
        icon: JSX.Element;
        href: string;
        badge?: number;
        exact?: boolean;
    }

    const menuItems: MenuItem[] = [
        { label: "Governance", icon: <Gavel className="w-5 h-5" />, href: "/dashboard/admin/governance" },
        { label: "Approvals", icon: <ClipboardList className="w-5 h-5" />, href: "/dashboard/admin/approvals", badge: 12 },
        { label: "Revenue", icon: <Banknote className="w-5 h-5" />, href: "/dashboard/admin/revenue" },
        { label: "Risk", icon: <AlertTriangle className="w-5 h-5" />, href: "/dashboard/admin/risk" },
        { label: "Compliance", icon: <ShieldCheck className="w-5 h-5" />, href: "/dashboard/admin/compliance" },
        { label: "Audit", icon: <History className="w-5 h-5" />, href: "/dashboard/admin/audit" },
        { label: "Reporting", icon: <BarChart3 className="w-5 h-5" />, href: "/dashboard/admin/reporting" },
        { label: "Health", icon: <Activity className="w-5 h-5" />, href: "/dashboard/admin/health" },
        { label: "Disputes", icon: <MessageSquare className="w-5 h-5" />, href: "/dashboard/admin/disputes", badge: 3 },
        { label: "Configuration", icon: <Settings className="w-5 h-5" />, href: "/dashboard/admin/configuration" },
        { label: "Support", icon: <MessageSquare className="w-5 h-5" />, href: "/dashboard/admin/support" },
    ];

    return (
        <aside className={`bg-orange-600 text-white transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'} fixed h-full z-20 flex flex-col items-center border-r border-orange-500`}>
            <div className="py-6 w-full px-6 flex items-center justify-center border-b border-orange-500 mb-6 bg-orange-700/20">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-orange-600 font-black shadow-lg shadow-orange-900/20 shrink-0">A</div>
                    {isOpen && <span className="font-bold text-lg tracking-tight uppercase">Platform Admin</span>}
                </div>
            </div>

            <nav className="flex-1 w-full space-y-2 px-3">
                {menuItems.map((item, i) => {
                    const isActive = item.exact
                        ? pathname === item.href
                        : pathname.startsWith(item.href);

                    return (
                        <Link
                            key={i}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${isActive ? 'bg-white text-orange-600 shadow-xl shadow-orange-900/30' : 'text-orange-50 hover:bg-orange-700/40 hover:text-white'}`}
                        >
                            <div className={`shrink-0 transition-colors ${isActive ? 'text-orange-600' : 'group-hover:text-white'}`}>
                                {item.icon}
                            </div>
                            {isOpen && (
                                <span className="flex-1 font-semibold text-sm">{item.label}</span>
                            )}
                            {isOpen && item.badge && (
                                <span className="bg-orange-500 text-[10px] font-black px-1.5 py-0.5 rounded-md text-white border border-orange-400/30">{item.badge}</span>
                            )}
                        </Link>
                    );
                })}
            </nav>

            <div className="w-full px-3 mb-2">
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full flex items-center justify-center py-2 rounded-xl bg-orange-700/20 text-orange-100 hover:bg-orange-700/40 transition-all"
                >
                    {isOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                </button>
            </div>

            <div className="p-4 w-full border-t border-orange-500">
                <div className="flex items-center gap-3 px-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-900 font-bold shrink-0">SA</div>
                    {isOpen && (
                        <div className="text-left overflow-hidden">
                            <div className="text-xs font-bold truncate">Super Admin</div>
                            <div className="text-[10px] text-orange-200 font-medium tracking-wide">Main Platform</div>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
}
