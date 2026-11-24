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
