import {
  LayoutDashboard,
  Globe,
  Store,
  Package,
  Calendar,
  Ticket,
  ShieldCheck,
  QrCode,
  Gift,
  Wallet,
  BarChart3,
  MessageSquare,
  LifeBuoy,
  Settings,
  Truck,
  PlusCircle
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
      { label: "My Booth (CHS)", href: "/dashboard/business/booth", icon: Store },
      { label: "MCOM Products", href: "/dashboard/business/products", icon: Package, exact: true },
      { label: "Bundle Fulfilment", href: "/dashboard/business/products/fulfilment", icon: Truck }
    ]
  },
  {
    id: "events-ticketing",
    label: "Events & Ticketing",
    icon: Calendar,
    items: [
      { label: "My Events", href: "/dashboard/business/events", icon: Calendar, exact: true },
      { label: "Create Event", href: "/dashboard/business/events/create", icon: PlusCircle },
      { label: "Ticket Templates", href: "/dashboard/business/events/tickets", icon: Ticket },
      { label: "Ticket Verification", href: "/dashboard/business/verification", icon: ShieldCheck }
    ]
  },
  {
    id: "sales-revenue",
    label: "Sales, Rewards & Revenue",
    icon: Wallet,
    items: [
      { label: "Sales Links & QR", href: "/dashboard/business/sales/links", icon: QrCode },
      { label: "MCOM Rewards & Bulk", href: "/dashboard/business/rewards", icon: Gift },
      { label: "Revenue & Payouts", href: "/dashboard/business/revenue", icon: Wallet },
      { label: "Analytics", href: "/dashboard/business/analytics", icon: BarChart3 }
    ]
  },
  {
    id: "communication-settings",
    label: "Chat, Support & Settings",
    icon: Settings,
    items: [
      { label: "CHS Live Chat", href: "/dashboard/business/messages", icon: MessageSquare, badge: "3" },
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
  if (item.exact || item.href === "/dashboard/business") {
    return pathname === item.href;
  }
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

