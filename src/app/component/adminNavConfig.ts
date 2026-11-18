import React from "react";
import {
  LayoutDashboard,
  ClipboardList,
  Calendar,
  Building2,
  Users,
  MessageSquare,
  Gavel,
  ShieldCheck,
  AlertTriangle,
  History,
  Activity,
  Newspaper,
  Radio,
  Banknote,
  CreditCard,
  BarChart3,
  Settings,
  Headphones
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  iconName: string;
  badge?: number;
  exact?: boolean;
}

export interface NavGroup {
  id: string;
  title: string;
  iconName: string;
  items: NavItem[];
}

export const ADMIN_NAV_GROUPS: NavGroup[] = [
  {
    id: "platform-ops",
    title: "Platform Directory & Operations",
    iconName: "LayoutDashboard",
    items: [
      { label: "Command Overview", href: "/dashboard/admin", iconName: "LayoutDashboard", exact: true },
      { label: "Event Approvals", href: "/dashboard/admin/approvals", iconName: "ClipboardList", badge: 12 },
      { label: "Events Directory", href: "/dashboard/admin/events", iconName: "Calendar" },
      { label: "Registered Businesses", href: "/dashboard/admin/businesses", iconName: "Building2" },
      { label: "Attendees & Visitors", href: "/dashboard/admin/visitors", iconName: "Users" },
      { label: "Dispute Center", href: "/dashboard/admin/disputes", iconName: "MessageSquare", badge: 3 },
      { label: "Platform Governance", href: "/dashboard/admin/governance", iconName: "Gavel" }
    ]
  },
  {
    id: "compliance-audit",
    title: "Compliance & Audit",
    iconName: "ShieldCheck",
    items: [
      { label: "Compliance Checks", href: "/dashboard/admin/compliance", iconName: "ShieldCheck" },
      { label: "Risk Management", href: "/dashboard/admin/risk", iconName: "AlertTriangle" },
      { label: "Audit Trail", href: "/dashboard/admin/audit", iconName: "History" },
      { label: "System Health", href: "/dashboard/admin/health", iconName: "Activity" }
    ]
  },
  {
    id: "content-media",
    title: "Content & Media",
    iconName: "Newspaper",
    items: [
      { label: "News CMS", href: "/dashboard/admin/news", iconName: "Newspaper" },
      { label: "Banner Ticker", href: "/dashboard/admin/ticker", iconName: "Radio" }
    ]
  },
  {
    id: "financials-access",
    title: "Financials & Access",
    iconName: "Banknote",
    items: [
      { label: "Revenue & Settlements", href: "/dashboard/admin/revenue", iconName: "Banknote" },
      { label: "Pass Plans & Pricing", href: "/dashboard/admin/passes", iconName: "CreditCard" },
      { label: "Global Reporting", href: "/dashboard/admin/reporting", iconName: "BarChart3" },
      { label: "System Configuration", href: "/dashboard/admin/configuration", iconName: "Settings" },
      { label: "Platform Support", href: "/dashboard/admin/support", iconName: "Headphones" }
    ]
  }
];

export const MOBILE_PRIMARY_TABS = [
  { label: "Overview", href: "/dashboard/admin", iconName: "LayoutDashboard", exact: true },
  { label: "Approvals", href: "/dashboard/admin/approvals", iconName: "ClipboardList", badge: 12 },
  { label: "Events", href: "/dashboard/admin/events", iconName: "Calendar" },
  { label: "Revenue", href: "/dashboard/admin/revenue", iconName: "Banknote" }
];

