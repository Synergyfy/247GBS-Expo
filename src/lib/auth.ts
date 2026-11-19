export interface ExpoUser {
  name: string;
  email: string;
  role: "customer" | "business" | "admin";
}

const STORAGE_KEY = "expo_user";

export function getStoredUser(): ExpoUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setStoredUser(user: ExpoUser): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  } catch (e) {
    console.error("Failed to persist user session", e);
  }
}

export function clearStoredUser(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error("Failed to clear user session", e);
  }
}

export function isUserAuthenticated(): boolean {
  return getStoredUser() !== null;
}

