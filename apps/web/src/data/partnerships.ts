import { getStoredNotifications, saveStoredNotifications } from "./notifications";

export interface PartnershipTier {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  popular: boolean;
}

export type InquiryStatus = "under_review" | "approved" | "declined";

export interface PartnershipInquiry {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  tierId: string;
  tierName: string;
  message: string;
  status: InquiryStatus;
  submittedAt: string;
  decisionNote?: string;
  decidedAt?: string;
  emailsSent?: number;
  lastEmailedAt?: string;
}

const TIERS_KEY = "expo_partnership_tiers_v1";
const INQUIRIES_KEY = "expo_partnership_inquiries_v1";
export const PARTNERSHIPS_EVENT = "expo_partnerships_changed";

export const DEFAULT_PARTNERSHIP_TIERS: PartnershipTier[] = [
  {
    id: "tier-community",
    name: "Community Partner",
    price: "£299",
    period: "/ season",
    description:
      "Ideal for regional brands and associations looking for featured expo visibility beyond a standard CHS booth.",
    features: [
      "Featured Expo Directory Placement",
      "Co-Branded Seasonal Banner Slot",
      "1 Live Spotlight Stage Session",
      "Lead Capture & Partner Analytics",
      "Priority Expo Partner Support",
    ],
    cta: "Apply for Community",
    popular: false,
  },
  {
    id: "tier-premier",
    name: "Premier Sponsor",
    price: "£799",
    period: "/ season",
    description:
      "Full-scale seasonal sponsorship with main-hall placement, keynote branding, and MCOM Mall spotlighting.",
    features: [
      "Main Hall Featured Pavilion",
      "Keynote Stage & Stream Co-Branding",
      "MCOM Mall Featured Collection Slot",
      "5 Live Product Launch Broadcasts",
      "Dedicated Account Manager",
      "Cross-Network Newsletter Feature",
    ],
    cta: "Apply for Premier",
    popular: true,
  },
  {
    id: "tier-enterprise",
    name: "Enterprise Global",
    price: "Custom",
    period: "tailored",
    description:
      "Bespoke title sponsorship and white-label digital pavilion solutions for global enterprises and trade bodies.",
    features: [
      "Seasonal Title Sponsor Rights",
      "Custom Branded Multi-Hall Pavilion",
      "VIP Lounge & Executive Roundtable Host",
      "Bespoke Analytics & Lead API Sync",
      "24/7 Dedicated Technical Producer",
    ],
    cta: "Request Custom Proposal",
    popular: false,
  },
];

export const DEFAULT_PARTNERSHIP_INQUIRIES: PartnershipInquiry[] = [
  {
    id: "PINQ-2041",
    companyName: "Meridian Fintech Group",
    contactName: "Claire Thornton",
    email: "claire.thornton@meridianfintech.co.uk",
    tierId: "tier-premier",
    tierName: "Premier Sponsor",
    message:
      "We would like to sponsor the Spring 2026 Digital Commerce main stage and host two executive demos.",
    status: "under_review",
    submittedAt: "2h ago",
  },
  {
    id: "PINQ-2038",
    companyName: "Nordic Green Tech Alliance",
    contactName: "Henrik Lindqvist",
    email: "henrik@nordicgreentech.eu",
    tierId: "tier-enterprise",
    tierName: "Enterprise Global",
    message:
      "Interested in a custom multi-brand pavilion for 14 sustainability startups exhibiting under our trade body.",
    status: "approved",
    submittedAt: "1d ago",
    decisionNote: "Approved for Spring 2026 Enterprise Global Pavilion.",
    decidedAt: "18h ago",
  },
];

function emitPartnershipsChanged() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(PARTNERSHIPS_EVENT));
}

function normalizeStatus(raw: string): InquiryStatus {
  if (raw === "approved" || raw === "declined") return raw;
  return "under_review";
}

export function getPartnershipTiers(): PartnershipTier[] {
  if (typeof window === "undefined") return DEFAULT_PARTNERSHIP_TIERS;
  try {
    const raw = localStorage.getItem(TIERS_KEY);
    if (!raw) return DEFAULT_PARTNERSHIP_TIERS;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_PARTNERSHIP_TIERS;
  } catch {
    return DEFAULT_PARTNERSHIP_TIERS;
  }
}

export function savePartnershipTiers(tiers: PartnershipTier[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(TIERS_KEY, JSON.stringify(tiers));
    emitPartnershipsChanged();
  } catch {
    // ignore storage errors
  }
}

export function getPartnershipInquiries(): PartnershipInquiry[] {
  if (typeof window === "undefined") return DEFAULT_PARTNERSHIP_INQUIRIES;
  try {
    const raw = localStorage.getItem(INQUIRIES_KEY);
    if (!raw) return DEFAULT_PARTNERSHIP_INQUIRIES;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return DEFAULT_PARTNERSHIP_INQUIRIES;
    return parsed.map((item) => ({
      ...item,
      status: normalizeStatus(item.status),
    }));
  } catch {
    return DEFAULT_PARTNERSHIP_INQUIRIES;
  }
}

export function savePartnershipInquiries(inquiries: PartnershipInquiry[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(INQUIRIES_KEY, JSON.stringify(inquiries));
    emitPartnershipsChanged();
  } catch {
    // ignore storage errors
  }
}

export function submitPartnershipInquiry(
  payload: Omit<PartnershipInquiry, "id" | "status" | "submittedAt">
): PartnershipInquiry {
  const newInquiry: PartnershipInquiry = {
    ...payload,
    id: `PINQ-${Math.floor(2100 + Math.random() * 7800)}`,
    status: "under_review",
    submittedAt: "Just now",
  };

  const existing = getPartnershipInquiries();
  savePartnershipInquiries([newInquiry, ...existing]);

  // Push live notification to Admin bell
  const adminNotifs = getStoredNotifications("admin");
  saveStoredNotifications("admin", [
    {
      id: `ntf-partner-${Date.now()}`,
      title: `New Partnership Inquiry (${payload.tierName})`,
      message: `${payload.companyName} (${payload.contactName}) applied for ${payload.tierName}.`,
      category: "event",
      read: false,
      createdAt: "Just now",
      href: "/dashboard/admin/partnerships",
    },
    ...adminNotifs,
  ]);

  return newInquiry;
}

export function decidePartnershipInquiry(
  id: string,
  decision: "approved" | "declined",
  decisionNote?: string
): PartnershipInquiry[] {
  let decidedTarget: PartnershipInquiry | null = null;

  const updated = getPartnershipInquiries().map((item) => {
    // Irreversible: only applications currently under_review can be decided
    if (item.id !== id || item.status !== "under_review") return item;
    decidedTarget = {
      ...item,
      status: decision,
      decisionNote: decisionNote?.trim() || undefined,
      decidedAt: "Just now",
    };
    return decidedTarget;
  });

  if (decidedTarget) {
    savePartnershipInquiries(updated);
    const target = decidedTarget as PartnershipInquiry;

    // Notify Business portal of the final partnership decision
    const bizNotifs = getStoredNotifications("business");
    saveStoredNotifications("business", [
      {
        id: `ntf-partner-decision-${Date.now()}`,
        title:
          decision === "approved"
            ? `Partnership Approved: ${target.tierName}`
            : `Partnership Application Update: ${target.tierName}`,
        message:
          decision === "approved"
            ? `Your ${target.tierName} partnership application (${target.id}) was approved.${target.decisionNote ? ` Note: ${target.decisionNote}` : ""}`
            : `Your ${target.tierName} partnership application (${target.id}) was declined.${target.decisionNote ? ` Reason: ${target.decisionNote}` : ""}`,
        category: "system",
        read: false,
        createdAt: "Just now",
        href: "/dashboard/business/notifications",
      },
      ...bizNotifs,
    ]);
  }

  return updated;
}

export function sendPartnershipEmail(
  id: string,
  subject: string,
  body: string
): PartnershipInquiry[] {
  let target: PartnershipInquiry | null = null;

  const updated = getPartnershipInquiries().map((item) => {
    if (item.id !== id) return item;
    target = {
      ...item,
      emailsSent: (item.emailsSent || 0) + 1,
      lastEmailedAt: "Just now",
    };
    return target;
  });

  if (target) {
    savePartnershipInquiries(updated);
    const emailed = target as PartnershipInquiry;
    const bizNotifs = getStoredNotifications("business");
    saveStoredNotifications("business", [
      {
        id: `ntf-partner-email-${Date.now()}`,
        title: subject.trim() || `Message from 247GBS Partnerships`,
        message: `${body.trim()} (Ref: ${emailed.id})`,
        category: "system",
        read: false,
        createdAt: "Just now",
        href: "/dashboard/business/notifications",
      },
      ...bizNotifs,
    ]);
  }

  return updated;
}
