import {
  LayoutDashboard,
  Globe,
  Store,
  Calendar,
  Ticket,
  Gift,
  Compass,
  Wallet,
  User,
  Settings
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface CustomerNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
}

export interface CustomerNavGroup {
  id: string;
  label: string;
  icon: LucideIcon;
  items: CustomerNavItem[];
}

export const CUSTOMER_NAV_GROUPS: CustomerNavGroup[] = [
  {
    id: "expo-discovery",
    label: "Live Expo & Discovery",
    icon: Compass,
    items: [
      { label: "Overview", href: "/dashboard/customer", icon: LayoutDashboard },
      { label: "Discover Events", href: "/dashboard/customer/events", icon: Globe, badge: "LIVE" },
      { label: "Expo Hall & Booths", href: "/dashboard/customer/booths", icon: Store },
      { label: "Live Schedule", href: "/dashboard/customer/schedule", icon: Calendar }
    ]
  },
  {
    id: "wallet-rewards",
    label: "Pass Wallet & MCOM",
    icon: Wallet,
    items: [
      { label: "My Tickets & Passes", href: "/dashboard/customer/tickets", icon: Ticket },
      { label: "MCOM Rewards & Orders", href: "/dashboard/customer/rewards", icon: Gift }
    ]
  },
  {
    id: "profile-account",
    label: "Account & Identity",
    icon: User,
    items: [
      { label: "Profile Settings", href: "/dashboard/customer/profile", icon: User },
      { label: "Account Settings", href: "/dashboard/customer/settings", icon: Settings }
    ]
  }
];

export const CUSTOMER_MOBILE_PRIMARY_TABS: CustomerNavItem[] = [
  { label: "Overview", href: "/dashboard/customer", icon: LayoutDashboard },
  { label: "Events", href: "/dashboard/customer/events", icon: Globe, badge: "LIVE" },
  { label: "Booths", href: "/dashboard/customer/booths", icon: Store },
  { label: "Tickets", href: "/dashboard/customer/tickets", icon: Ticket }
];

export function isCustomerRouteActive(pathname: string, href: string): boolean {
  if (href === "/dashboard/customer") {
    return pathname === "/dashboard/customer";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

