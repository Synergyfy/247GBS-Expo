export const DEFAULT_EVENT_CATEGORIES: string[] = [
  "Technology",
  "Fintech",
  "Digital Art",
  "Health & Wellness",
  "Sustainability",
  "Global Trade"
];

export const STORAGE_KEY_CATEGORIES = "admin_event_categories";

export function getStoredCategories(): string[] {
  if (typeof window === "undefined") return DEFAULT_EVENT_CATEGORIES;
  try {
    const saved = localStorage.getItem(STORAGE_KEY_CATEGORIES);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.filter((c): c is string => typeof c === "string" && c.trim().length > 0);
      }
    }
  } catch (e) {
    console.error("Failed to load event categories from localStorage:", e);
  }
  return DEFAULT_EVENT_CATEGORIES;
}

export function saveStoredCategories(categories: string[]): void {
  if (typeof window === "undefined") return;
  try {
    const cleaned = Array.from(new Set(categories.map((c) => c.trim()).filter(Boolean)));
    localStorage.setItem(STORAGE_KEY_CATEGORIES, JSON.stringify(cleaned));
    window.dispatchEvent(new CustomEvent("event_categories_changed", { detail: cleaned }));
  } catch (e) {
    console.error("Failed to save event categories to localStorage:", e);
  }
}
