"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
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
    LifeBuoy,
    BarChart3,
    ChevronLeft,
    ChevronRight,
    LogOut,
    Globe
} from "lucide-react";

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export default function BusinessSidebar({ isOpen, setIsOpen }: SidebarProps) {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = () => {
        // Clear session logic here
        router.push("/");
    };

    const menuItems = [
        { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/business", exact: true },
        { icon: Globe, label: "Discover Events", href: "/dashboard/business/marketplace" },
        { icon: Store, label: "My Booth", href: "/dashboard/business/booth" },
        {
            icon: Package,
            label: "Products",
            href: "/dashboard/business/products",
            subItems: [
                { label: "Catalog", href: "/dashboard/business/products", exact: true },
                { label: "Fulfilment", href: "/dashboard/business/products/fulfilment" },
                { label: "Redemption", href: "/dashboard/business/products/redemption" },
            ]
        },
        {
            icon: Calendar,
            label: "Events & Tickets",
            href: "/dashboard/business/events",
            subItems: [
                { label: "All Events", href: "/dashboard/business/events", exact: true },
                { label: "Create New", href: "/dashboard/business/events/create" },
                { label: "Configuration", href: "/dashboard/business/events/configuration" },
                { label: "Ticket Manager", href: "/dashboard/business/events/tickets" },
            ]
        },
        {
            icon: TrendingUp,
            label: "Sales and Distribution",
            href: "/dashboard/business/sales",
            subItems: [
                { label: "Sales Channels", href: "/dashboard/business/sales", exact: true },
                { label: "Links & Codes", href: "/dashboard/business/sales/links" },
                { label: "Campaigns", href: "/dashboard/business/sales/campaigns" },
            ]
        },
        {
            icon: Gift,
            label: "Rewards",
            href: "/dashboard/business/rewards",
            subItems: [
                { label: "Overview", href: "/dashboard/business/rewards", exact: true },
                { label: "Loyalty Integration", href: "/dashboard/business/rewards/integration" },
                { label: "Reward Monitoring", href: "/dashboard/business/rewards/monitoring" },
            ]
        },
        { icon: BarChart3, label: "Analytics", href: "/dashboard/business/analytics" },
        { icon: ScanLine, label: "POS Console", href: "/dashboard/business/pos" },
        {
            icon: ShieldCheck,
            label: "Event Operations",
            href: "/dashboard/business/operations",
            subItems: [
                { label: "Check-in Setup", href: "/dashboard/business/operations", exact: true },
                { label: "Live Verification", href: "/dashboard/business/operations/verification" },
                { label: "Crowd Control", href: "/dashboard/business/operations/crowd" },
            ]
        },
        { icon: Wallet, label: "Revenue", href: "/dashboard/business/revenue" },
        { icon: MessageSquare, label: "Messages", href: "/dashboard/business/messages", badge: 3 },
        { icon: LifeBuoy, label: "Support Center", href: "/dashboard/business/support" },
        {
            icon: Settings,
            label: "Settings",
            href: "/dashboard/business/settings",
            subItems: [
                { label: "Profile", href: "/dashboard/business/settings", exact: true },
                { label: "Team", href: "/dashboard/business/settings/team" },
                { label: "Integrations", href: "/dashboard/business/settings/integrations" },
                { label: "Audit Logs", href: "/dashboard/business/settings/audits" },
            ]
        },
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
                        <div key={i}>
                            <Link href={item.href} className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all group ${isActive ? 'bg-white text-orange-600 shadow-xl' : 'text-orange-50 hover:bg-white/10'}`}>
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

                            {/* Sub-menu */}
                            {isOpen && isActive && item.subItems && (
                                <div className="ml-4 mt-1 space-y-1 pl-4 border-l border-orange-400/30">
                                    {item.subItems.map((sub, j) => {
                                        const isSubActive = sub.exact ? pathname === sub.href : pathname === sub.href; // Simplified for now
                                        return (
                                            <Link key={j} href={sub.href} className={`block px-3 py-2 rounded-lg text-xs font-bold transition-all ${isSubActive ? 'text-white bg-orange-500/50' : 'text-orange-200 hover:text-white'}`}>
                                                {sub.label}
                                            </Link>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-orange-500 shrink-0">
                <div className="space-y-4">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-full flex items-center justify-center py-2 rounded-xl bg-orange-700/20 text-orange-100 hover:bg-orange-700/40 transition-all"
                    >
                        {isOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                    </button>

                    <div className={`flex items-center ${isOpen ? 'gap-3' : 'justify-center'}`}>
                        <div className="w-8 h-8 rounded-full bg-orange-700 overflow-hidden relative shrink-0">
                            <Image src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop" alt="User" fill className="object-cover" />
                        </div>
                        {isOpen && (
                            <div className="text-left overflow-hidden">
                                <div className="text-sm font-medium text-white truncate">Acme Corp</div>
                                <div className="text-xs text-orange-200 truncate">Premium Plan</div>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-orange-50 hover:bg-red-500/20 hover:text-white transition-all group"
                    >
                        <LogOut className="w-5 h-5 shrink-0" />
                        {isOpen && <span className="font-bold text-sm tracking-tight">Logout</span>}
                    </button>
                </div>
            </div>
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.2);
                }
            `}</style>
        </aside>
    );
}