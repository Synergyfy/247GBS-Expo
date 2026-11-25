export interface TickerEvent {
    id: string;
    season: string;
    dates: string;
    event: string;
    color: string;
    isActive: boolean;
}

export const TICKER_EVENTS: TickerEvent[] = [
    { id: "1", season: "SPRING 2026", dates: "April 10-19", event: "Brand Launches", color: "emerald", isActive: true },
    { id: "2", season: "SUMMER 2026", dates: "July 15-24", event: "Peak Season", color: "amber", isActive: true },
    { id: "3", season: "AUTUMN 2026", dates: "Oct 10-19", event: "Product Expo", color: "orange", isActive: true },
    { id: "4", season: "WINTER 2026", dates: "Dec 5-14", event: "Holiday Fest", color: "cyan", isActive: true },
];

const TICKER_STORAGE_KEY = "expo_ticker_events_v1";
export const TICKER_EVENT = "expo_ticker_changed";

export function getStoredTickerEvents(): TickerEvent[] {
    if (typeof window === "undefined") return TICKER_EVENTS;
    try {
        const raw = localStorage.getItem(TICKER_STORAGE_KEY);
        if (!raw) return TICKER_EVENTS;
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) && parsed.length > 0 ? parsed : TICKER_EVENTS;
    } catch {
        return TICKER_EVENTS;
    }
}

export function saveStoredTickerEvents(events: TickerEvent[]) {
    if (typeof window === "undefined") return;
    try {
        localStorage.setItem(TICKER_STORAGE_KEY, JSON.stringify(events));
        window.dispatchEvent(new CustomEvent(TICKER_EVENT));
    } catch {
        // ignore storage errors
    }
}
