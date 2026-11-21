export interface GlobalTicketTemplate {
  id: string;
  name: string;
  access: string;
  priceRange: string;
  status: "Active" | "Draft" | "Archived";
  minPrice: number;
  maxPrice: number;
  isGiftOnly?: boolean;
  commission?: string;
  description?: string;
}

export const DEFAULT_TICKET_TEMPLATES: GlobalTicketTemplate[] = [
  {
    id: "tpl_standard",
    name: "Standard Day Pass",
    access: "General",
    priceRange: "£0 - £50",
    status: "Active",
    minPrice: 0,
    maxPrice: 50,
    commission: "10% Platform Split",
    description: "Standard daytime exhibition floor and general booth access."
  },
  {
    id: "tpl_vip",
    name: "VIP Experience",
    access: "Full Hall + Lounge",
    priceRange: "£99 - £500",
    status: "Active",
    minPrice: 99,
    maxPrice: 500,
    commission: "8% Platform Split",
    description: "Includes VIP executive lounge, 1-on-1 meeting rooms, and priority seating."
  },
  {
    id: "tpl_reward",
    name: "Reward Pass",
    access: "Specific Booth",
    priceRange: "Gift Only",
    status: "Active",
    minPrice: 0,
    maxPrice: 0,
    isGiftOnly: true,
    commission: "0% Fee • Platform Sponsored",
    description: "Sponsored reward vouchers for specific exhibitor booths and promotions."
  }
];

export const STORAGE_KEY_TEMPLATES = "admin_global_ticket_templates";

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
