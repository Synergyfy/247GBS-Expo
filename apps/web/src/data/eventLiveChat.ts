import { getStoredNotifications, saveStoredNotifications } from "@/data/notifications";

export interface LiveChatMessage {
  id: number;
  user: string;
  role: "customer" | "business";
  message: string;
  time: string;
  avatar: string;
}

const CHAT_STORAGE_KEY = "expo_live_event_chat_v1";

export const INITIAL_LIVE_CHAT: LiveChatMessage[] = [
  {
    id: 1,
    user: "Alex Thompson",
    role: "customer",
    message: "The keynote on digital commerce scaling is fantastic!",
    time: "10:42 AM",
    avatar: "AT"
  },
  {
    id: 2,
    user: "Sarah Chen",
    role: "customer",
    message: "Does FutureTech offer bulk enterprise licensing on MCOM Mall?",
    time: "10:43 AM",
    avatar: "SC"
  },
  {
    id: 3,
    user: "FutureTech Host",
    role: "business",
    message: "@Sarah Chen Yes! Click Buy Now on Cloud Core Hub X1 below for volume tiers.",
    time: "10:44 AM",
    avatar: "FH"
  }
];

export function getStoredLiveChat(): LiveChatMessage[] {
  if (typeof window === "undefined") return INITIAL_LIVE_CHAT;
  try {
    const raw = localStorage.getItem(CHAT_STORAGE_KEY);
    if (!raw) return INITIAL_LIVE_CHAT;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_LIVE_CHAT;
  } catch {
    return INITIAL_LIVE_CHAT;
  }
}

export function postLiveChatMessage(params: {
  user: string;
  role: "customer" | "business";
  message: string;
}): LiveChatMessage[] {
  const current = getStoredLiveChat();
  const initials = params.user
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const nextMsg: LiveChatMessage = {
    id: Date.now(),
    user: params.user,
    role: params.role,
    message: params.message.trim(),
    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    avatar: initials || "US"
  };

  const next = [...current, nextMsg];

  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(next));
      window.dispatchEvent(new CustomEvent("expo_live_chat_changed", { detail: next }));

      const isMentionReply = params.message.trim().startsWith("@");

      // Push real-time in-app notification to the other portal (and to customer on @reply)
      if (params.role === "customer") {
        const bizNotifs = getStoredNotifications("business");
        saveStoredNotifications("business", [
          {
            id: `ntf-chat-${Date.now()}`,
            title: isMentionReply ? "Live Chat Reply" : "New Live Event Question",
            message: `${params.user}: ${params.message.trim()}`,
            category: "event",
            read: false,
            createdAt: "Just now",
            href: "/dashboard/business/demos"
          },
          ...bizNotifs
        ]);

        if (isMentionReply) {
          const custNotifs = getStoredNotifications("customer");
          saveStoredNotifications("customer", [
            {
              id: `ntf-reply-${Date.now()}`,
              title: `${params.user} replied in Live Chat`,
              message: params.message.trim(),
              category: "event",
              read: false,
              createdAt: "Just now",
              href: "/dashboard/customer/events/techsummit/lobby"
            },
            ...custNotifs
          ]);
        }
      } else {
        const custNotifs = getStoredNotifications("customer");
        saveStoredNotifications("customer", [
          {
            id: `ntf-host-${Date.now()}`,
            title: `${params.user} replied in Live Stream`,
            message: params.message.trim(),
            category: "event",
            read: false,
            createdAt: "Just now",
            href: "/dashboard/customer/events/techsummit/lobby"
          },
          ...custNotifs
        ]);
      }
    } catch {
      // ignore storage errors
    }
  }

  return next;
}
