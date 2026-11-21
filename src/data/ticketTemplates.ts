export interface GlobalTicketTemplate {
  id: string;
  name: string;
  access: string;
  priceRange: string;
  status: "Active" | "Draft" | "Archived";
  minPrice: number;
  maxPrice: number;
  defaultPrice?: number;
  isGiftOnly?: boolean;
  commission?: string;
  description?: string;
}

export const DEFAULT_TICKET_TEMPLATES: GlobalTicketTemplate[] = [
  {
    id: "tpl-general",
    name: "Standard Season Day Pass Template",
    access: "General",
    priceRange: "£0 - £50",
    status: "Active",
    minPrice: 0,
    maxPrice: 50,
    defaultPrice: 25,
    commission: "10% Platform Split",
    description: "Admin-approved general booth & keynote access template. Capped at £50 maximum."
  },
  {
    id: "tpl-vip",
    name: "VIP Executive Workshop Template",
    access: "Full Hall + Lounge",
    priceRange: "£50 - £250",
    status: "Active",
    minPrice: 50,
    maxPrice: 250,
    defaultPrice: 120,
    commission: "8% Platform Split",
    description: "Includes 1-on-1 consultation room access & MCOM voucher perk. Capped at £250 maximum."
  },
  {
    id: "tpl-free",
    name: "Platform-Sponsored Complimentary Pass",
    access: "Specific Booth",
    priceRange: "GIFT ONLY",
    status: "Active",
    minPrice: 0,
    maxPrice: 0,
    defaultPrice: 0,
    isGiftOnly: true,
    commission: "0% Fee • Platform Funded",
    description: "Free public access pass distributed directly via 247GBS Academy and central marketing."
  }
];

export const STORAGE_KEY_TEMPLATES = "admin_global_ticket_templates_v2";

export function getStoredTicketTemplates(): GlobalTicketTemplate[] {
  if (typeof window === "undefined") return DEFAULT_TICKET_TEMPLATES;
  try {
    const saved = localStorage.getItem(STORAGE_KEY_TEMPLATES);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error("Failed to load ticket templates from localStorage:", e);
  }
  return DEFAULT_TICKET_TEMPLATES;
}

export function saveStoredTicketTemplates(templates: GlobalTicketTemplate[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY_TEMPLATES, JSON.stringify(templates));
    window.dispatchEvent(new CustomEvent("ticket_templates_changed", { detail: templates }));
  } catch (e) {
    console.error("Failed to save ticket templates to localStorage:", e);
  }
}
