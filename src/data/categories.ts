export const DEFAULT_EVENT_TYPES: string[] = [
  "Workshop",
  "Demonstration",
  "Seller Training",
  "Keynote Showcase",
  "Product Launch",
  "Networking Session"
];

export const DEFAULT_EVENT_CATEGORIES = DEFAULT_EVENT_TYPES;
export const STORAGE_KEY_TYPES = "admin_event_types_v3";
export const STORAGE_KEY_CATEGORIES = STORAGE_KEY_TYPES;

export function getStoredEventTypes(): string[] {
  if (typeof window === "undefined") return DEFAULT_EVENT_TYPES;
  try {
    const saved = localStorage.getItem(STORAGE_KEY_TYPES);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.filter((c): c is string => typeof c === "string" && c.trim().length > 0);
      }
    }
  } catch (e) {
    console.error("Failed to load event types from localStorage:", e);
  }
  return DEFAULT_EVENT_TYPES;
}

export const getStoredCategories = getStoredEventTypes;

export function saveStoredEventTypes(types: string[]): void {
  if (typeof window === "undefined") return;
  try {
    const cleaned = Array.from(new Set(types.map((c) => c.trim()).filter(Boolean)));
    localStorage.setItem(STORAGE_KEY_TYPES, JSON.stringify(cleaned));
    window.dispatchEvent(new CustomEvent("event_types_changed", { detail: cleaned }));
    window.dispatchEvent(new CustomEvent("event_categories_changed", { detail: cleaned }));
  } catch (e) {
    console.error("Failed to save event types to localStorage:", e);
  }
}

export const saveStoredCategories = saveStoredEventTypes;
