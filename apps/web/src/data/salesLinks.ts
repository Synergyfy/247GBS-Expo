export interface SalesInviteLink {
  id: string;
  code: string;
  title: string;
  template: string;
  discountPercent: number;
  isComplimentary: boolean;
  allocated: string;
  revenue: string;
  status: string;
}

const STORAGE_KEY = "expo_sales_invite_links_v1";
export const SALES_LINKS_EVENT = "expo_sales_links_changed";

export const DEFAULT_SALES_LINKS: SalesInviteLink[] = [
  {
    id: "LNK-01",
    code: "techflow-vip-2026",
    title: "VIP Client Complimentary Pass Link",
    template: "VIP Executive Pass",
    discountPercent: 100,
    isComplimentary: true,
    allocated: "35 / 50 Passes Claimed",
    revenue: "Gift Allocation",
    status: "Active",
  },
  {
    id: "LNK-02",
    code: "techflow-partner20",
    title: "Partner Booth Referral Link (20% Off)",
    template: "Standard Season Day Pass (£20)",
    discountPercent: 20,
    isComplimentary: false,
    allocated: "142 / 200 Passes Claimed",
    revenue: "£2,840",
    status: "Active",
  },
  {
    id: "LNK-03",
    code: "mcom-bundle-bonus",
    title: "Exhibitor Reward Pass Allocation",
    template: "Partner Reward Pass",
    discountPercent: 50,
    isComplimentary: false,
    allocated: "65 / 100 Passes Claimed",
    revenue: "£4,120 Partner Referral",
    status: "Active",
  },
];

export function getStoredSalesLinks(): SalesInviteLink[] {
  if (typeof window === "undefined") return DEFAULT_SALES_LINKS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SALES_LINKS;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_SALES_LINKS;
  } catch {
    return DEFAULT_SALES_LINKS;
  }
}

export function saveStoredSalesLinks(links: SalesInviteLink[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
    window.dispatchEvent(new CustomEvent(SALES_LINKS_EVENT));
  } catch {
    // ignore storage errors
  }
}

export function createSalesInviteLink(payload: {
  recipientEmail: string;
  template: string;
  ticketQty: string;
  discountPercent?: number;
}): SalesInviteLink {
  const existing = getStoredSalesLinks();
  const isGift = payload.template.toLowerCase().includes("gift") || payload.discountPercent === 100;
  const discount = isGift ? 100 : payload.discountPercent ?? 20;
  const slug = `partner-${Date.now().toString().slice(-4)}`;

  const created: SalesInviteLink = {
    id: `LNK-0${existing.length + 1}`,
    code: slug,
    title: `Assigned Pass Link (${payload.recipientEmail.trim()})`,
    template: payload.template,
    discountPercent: discount,
    isComplimentary: isGift,
    allocated: `0 / ${payload.ticketQty || "5"} Passes Claimed`,
    revenue: isGift ? "Direct Gift Assignment" : `${discount}% Partner Discount`,
    status: "Active",
  };

  saveStoredSalesLinks([created, ...existing]);
  return created;
}

export function findSalesLinkByCode(code: string | null): SalesInviteLink | null {
  if (!code) return null;
  const normalized = code.trim().toLowerCase();
  return (
    getStoredSalesLinks().find((l) => l.code.toLowerCase() === normalized) || null
  );
}
