"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

// --- ICONS ---
const HomeIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
);
const PackageIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
);
const CalendarIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
);
const ChatIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
);
const SettingsIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
);
const StoreIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
);

interface SidebarProps {
    isOpen: boolean;
}

export default function BusinessSidebar({ isOpen }: SidebarProps) {
    const pathname = usePathname();

    return (
        <aside className={`bg-orange-600 text-white transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'} fixed h-full z-20 flex flex-col`}>
            <div className="p-6 flex items-center gap-3 border-b border-orange-500">
                <Link href="/dashboard/business" className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-orange-600 font-bold shrink-0">E</div>
                    {isOpen && <span className="font-bold text-lg tracking-tight">Exhibitor Hub</span>}
                </Link>
            </div>

            <nav className="flex-1 py-6 px-3 space-y-2">
                {[
                    { icon: <HomeIcon />, label: "Dashboard", href: "/dashboard/business", exact: true },
                    { icon: <StoreIcon />, label: "My Booth", href: "/dashboard/business/booth" },
                    { icon: <PackageIcon />, label: "Products", href: "/dashboard/business/products" },
                    { icon: <CalendarIcon />, label: "Live Demos", href: "/dashboard/business/demos" },
                    { icon: <ChatIcon />, label: "Messages", href: "/dashboard/business/messages", badge: 3 },
                    { icon: <SettingsIcon />, label: "Settings", href: "/dashboard/business/settings" },
                ].map((item, i) => {
                    const isActive = item.exact
                        ? pathname === item.href
                        : pathname.startsWith(item.href);

                    return (
                        <Link key={i} href={item.href} className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${isActive ? 'bg-white text-orange-600 shadow-lg shadow-orange-900/20' : 'text-orange-50 hover:bg-orange-700/40 hover:text-white'}`}>
                            <div className="shrink-0">{item.icon}</div>
                            {isOpen && (
                                <span className="flex-1 font-medium">{item.label}</span>
                            )}
                            {isOpen && item.badge && (
                                <span className="bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{item.badge}</span>
                            )}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-orange-500">
                <button className="flex items-center gap-3 text-orange-50 hover:text-white w-full">
                    <div className="w-8 h-8 rounded-full bg-orange-700 overflow-hidden relative">
                        <Image src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop" alt="User" fill className="object-cover" />
                    </div>
                    {isOpen && (
                        <div className="text-left">
                            <div className="text-sm font-medium text-white">Acme Corp</div>
                            <div className="text-xs text-orange-200">Premium Plan</div>
                        </div>
                    )}
                </button>
            </div>
        </aside>
    );
}
