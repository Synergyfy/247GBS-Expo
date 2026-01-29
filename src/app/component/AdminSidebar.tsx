"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// --- ICONS ---
const DashboardIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>
);
const CalendarIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
);
const QueueIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
);
const MoneyIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);
const SupportIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
);

interface AdminSidebarProps {
    isOpen: boolean;
}

export default function AdminSidebar({ isOpen }: AdminSidebarProps) {
    const pathname = usePathname();

    const menuItems = [
        { label: "Command Center", icon: <DashboardIcon />, href: "/dashboard/admin", exact: true },
        { label: "Event Planner", icon: <CalendarIcon />, href: "/dashboard/admin/events" },
        { label: "Exhibitor Queue", icon: <QueueIcon />, href: "/dashboard/admin/exhibitors", badge: 5 },
        { label: "Financial Hub", icon: <MoneyIcon />, href: "/dashboard/admin/payments" },
        { label: "Moderation", icon: <SupportIcon />, href: "/dashboard/admin/support" },
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
