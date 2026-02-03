"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
    Gift, 
    LayoutDashboard, 
    Store, 
    Package, 
    Calendar, 
    ShieldCheck, 
    Monitor, 
    MessageSquare, 
    Wallet, 
    Settings,
    TrendingUp,
    ScanLine,
    LifeBuoy
} from "lucide-react";

interface SidebarProps {
    isOpen: boolean;
}

export default function BusinessSidebar({ isOpen }: SidebarProps) {
    const pathname = usePathname();

    const menuItems = [
        { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/business", exact: true },
        { icon: Store, label: "My Booth", href: "/dashboard/business/booth" },
        { icon: Package, label: "Products", href: "/dashboard/business/products" },
        { icon: Calendar, label: "Events & Tickets", href: "/dashboard/business/events" },
        { icon: TrendingUp, label: "Sales Center", href: "/dashboard/business/sales" },
        { icon: Gift, label: "Rewards", href: "/dashboard/business/rewards" },
        { icon: ScanLine, label: "POS Console", href: "/dashboard/business/pos" },
        { icon: Wallet, label: "Revenue", href: "/dashboard/business/revenue" },
        { icon: MessageSquare, label: "Messages", href: "/dashboard/business/messages", badge: 3 },
        { icon: ShieldCheck, label: "Verification", href: "/dashboard/business/verification" },
        { icon: LifeBuoy, label: "Support Center", href: "/dashboard/business/support" },
        { icon: Settings, label: "Settings", href: "/dashboard/business/settings" },
    ];

    return (
        <aside className={`bg-orange-600 text-white transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'} fixed left-0 top-0 h-screen z-20 flex flex-col shadow-2xl`}>
            <div className="p-6 flex items-center gap-3 border-b border-orange-500 shrink-0">
                <Link href="/dashboard/business" className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-orange-600 font-bold shrink-0 shadow-sm">E</div>
                    {isOpen && <span className="font-bold text-lg tracking-tight uppercase">Exhibitor Hub</span>}
                </Link>
            </div>

            <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto custom-scrollbar">
                {menuItems.map((item, i) => {
                    const isActive = item.exact
                        ? pathname === item.href
                        : pathname.startsWith(item.href);

                    return (
                        <Link key={i} href={item.href} className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all group ${isActive ? 'bg-white text-orange-600 shadow-xl' : 'text-orange-50 hover:bg-white/10'}`}>
                            <div className="shrink-0">
                                <item.icon className={`w-5 h-5 ${isActive ? 'text-orange-600' : 'group-hover:scale-110 transition-transform'}`} />
                            </div>
                            {isOpen && (
                                <span className={`flex-1 text-sm font-bold tracking-tight ${isActive ? 'opacity-100' : 'opacity-90'}`}>{item.label}</span>
                            )}
                            {isOpen && item.badge && (
                                <span className="bg-white text-orange-600 text-[10px] font-black px-2 py-0.5 rounded-full">{item.badge}</span>
                            )}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-orange-500 shrink-0">
                <button className="flex items-center gap-3 text-orange-50 hover:text-white w-full">
                    <div className="w-8 h-8 rounded-full bg-orange-700 overflow-hidden relative shrink-0">
                        <Image src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop" alt="User" fill className="object-cover" />
                    </div>
                    {isOpen && (
                        <div className="text-left overflow-hidden">
                            <div className="text-sm font-medium text-white truncate">Acme Corp</div>
                            <div className="text-xs text-orange-200 truncate">Premium Plan</div>
                        </div>
                    )}
                </button>
            </div>
        </aside>
    );
}