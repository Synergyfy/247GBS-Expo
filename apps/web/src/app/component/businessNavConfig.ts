import {
  LayoutDashboard,
  Globe,
  Store,
  Package,
  Calendar,
  Ticket,
  ShieldCheck,
  QrCode,
  Wallet,
  BarChart3,
  MessageSquare,
  LifeBuoy,
  Settings,
  Radio,
  CalendarCheck
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface BusinessNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
  exact?: boolean;
}

export interface BusinessNavGroup {
  id: string;
  label: string;
  icon: LucideIcon;
  items: BusinessNavItem[];
}

export const BUSINESS_NAV_GROUPS: BusinessNavGroup[] = [
  {
    id: "booth-products",
    label: "Booth & MCOM Catalog",
    icon: Store,
    items: [
      { label: "Overview", href: "/dashboard/business", icon: LayoutDashboard, exact: true },
      { label: "Discover Events", href: "/dashboard/business/marketplace", icon: Globe },
      { label: "My Booth", href: "/dashboard/business/booth", icon: Store },
      { label: "MCOM Products", href: "/dashboard/business/products", icon: Package, exact: true }
    ]
  },
  {
    id: "events-ticketing",
    label: "Events & Ticketing",
    icon: Calendar,
    items: [
      { label: "My Events", href: "/dashboard/business/events", icon: Calendar },
      { label: "Live Studio", href: "/dashboard/business/demos", icon: Radio },
      { label: "Consultations", href: "/dashboard/business/consultations", icon: CalendarCheck },
      { label: "Ticket Templates", href: "/dashboard/business/events/tickets", icon: Ticket },
      { label: "Ticket Verification", href: "/dashboard/business/verification", icon: ShieldCheck }
    ]
  },
  {
    id: "sales-revenue",
    label: "Sales & Revenue",
    icon: Wallet,
    items: [
      { label: "Sales Links & QR", href: "/dashboard/business/sales/links", icon: QrCode },
      { label: "Revenue & Payouts", href: "/dashboard/business/revenue", icon: Wallet },
      { label: "Analytics", href: "/dashboard/business/analytics", icon: BarChart3 }
    ]
  },
  {
    id: "communication-settings",
    label: "Chat, Support & Settings",
    icon: Settings,
    items: [
      { label: "Live Chat", href: "/dashboard/business/messages", icon: MessageSquare, badge: "3" },
      { label: "Support & Disputes", href: "/dashboard/business/support", icon: LifeBuoy },
      { label: "Profile & Settings", href: "/dashboard/business/settings", icon: Settings }
    ]
  }
];

export const BUSINESS_MOBILE_PRIMARY_TABS: BusinessNavItem[] = [
  { label: "Overview", href: "/dashboard/business", icon: LayoutDashboard, exact: true },
  { label: "Booth", href: "/dashboard/business/booth", icon: Store },
  { label: "Products", href: "/dashboard/business/products", icon: Package },
  { label: "Events", href: "/dashboard/business/events", icon: Calendar }
];

export function isBusinessRouteActive(pathname: string, item: BusinessNavItem): boolean {
  if (item.href === "/dashboard/business/events") {
    // Keep "My Events" active when on the events list or inside the event creation wizard
    return (
      pathname === "/dashboard/business/events" ||
      pathname.startsWith("/dashboard/business/events/create")
    );
  }
  if (item.exact || item.href === "/dashboard/business") {
    return pathname === item.href;
  }
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

