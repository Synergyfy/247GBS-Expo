export type NotificationRole = "admin" | "business" | "customer";

export interface ChsNotification {
  id: string;
  title: string;
  message: string;
  category: "event" | "payment" | "system" | "reward";
  read: boolean;
  createdAt: string;
  href: string;
}

export const INITIAL_NOTIFICATIONS: Record<NotificationRole, ChsNotification[]> = {
  admin: [
    {
      id: "ntf-a1",
      title: "New Event Submission",
      message: "Global Tech Corp submitted Annual Tech Symposium 2026 for admin approval.",
      category: "event",
      read: false,
      createdAt: "10m ago",
      href: "/dashboard/admin/approvals",
    },
    {
      id: "ntf-a2",
      title: "Dispute Escalated",
      message: "Case #DSP-402 requires immediate admin arbitration review.",
      category: "system",
      read: false,
      createdAt: "1h ago",
      href: "/dashboard/admin/disputes",
    },
    {
      id: "ntf-a3",
      title: "Escrow Batch Ready",
      message: "£42,000.00 settlement for Global Tech Corp is cleared for release.",
      category: "payment",
      read: true,
      createdAt: "3h ago",
      href: "/dashboard/admin/revenue",
    },
    {
      id: "ntf-a4",
      title: "CHS Identity Sync Healthy",
      message: "All 842 verified exhibitor booths passed scheduled CHS KYB sync.",
      category: "system",
      read: true,
      createdAt: "1d ago",
      href: "/dashboard/admin/health",
    },
  ],
  business: [
    {
      id: "ntf-b1",
      title: "New Booth Inquiry",
      message: "Sarah Lane sent a product inquiry on your virtual booth.",
      category: "event",
      read: false,
      createdAt: "12m ago",
      href: "/dashboard/business/messages",
    },
    {
      id: "ntf-b2",
      title: "MCOM Mall Order Synced",
      message: "Order #ORD-7829 (£259.98) cleared via MCOM Mall bridge.",
      category: "payment",
      read: false,
      createdAt: "2h ago",
      href: "/dashboard/business/revenue",
    },
    {
      id: "ntf-b3",
      title: "Ticket Templates Updated",
      message: "Super Admin updated season ticket price caps for Spring 2026.",
      category: "system",
      read: true,
      createdAt: "5h ago",
      href: "/dashboard/business/events/tickets",
    },
    {
      id: "ntf-b4",
      title: "MCOM Rewards Allocation Synced",
      message: "65 complimentary loyalty gift passes have been claimed for your event.",
      category: "reward",
      read: true,
      createdAt: "1d ago",
      href: "/dashboard/business/events/tickets",
    },
  ],
  customer: [
    {
      id: "ntf-c1",
      title: "Live Session Starting Now",
      message: "Panel: AI in Customer Support & Commerce is live in Workshop A.",
      category: "event",
      read: false,
      createdAt: "5m ago",
      href: "/dashboard/customer/events/spring2026/lobby",
    },
    {
      id: "ntf-c2",
      title: "MCOM Reward Points Credited",
      message: "+100 MCOM Pts added to your synced CHS loyalty wallet.",
      category: "reward",
      read: false,
      createdAt: "2h ago",
      href: "/dashboard/customer/rewards",
    },
    {
      id: "ntf-c3",
      title: "Season Pass Active",
      message: "Your VIP Pass GBX-88219-X22 is verified for all booths and lounges.",
      category: "system",
      read: true,
      createdAt: "1d ago",
      href: "/dashboard/customer/tickets",
    },
  ],
};

function storageKey(role: NotificationRole) {
  return `chs_expo_notifications_v1_${role}`;
}

export function getStoredNotifications(role: NotificationRole): ChsNotification[] {
  if (typeof window === "undefined") return INITIAL_NOTIFICATIONS[role];
  try {
    const raw = localStorage.getItem(storageKey(role));
    if (!raw) return INITIAL_NOTIFICATIONS[role];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_NOTIFICATIONS[role];
  } catch {
    return INITIAL_NOTIFICATIONS[role];
  }
}

export function saveStoredNotifications(role: NotificationRole, items: ChsNotification[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(storageKey(role), JSON.stringify(items));
    window.dispatchEvent(new CustomEvent("chs_notifications_changed", { detail: { role, items } }));
  } catch {
    // Ignore storage quota errors
  }
}
