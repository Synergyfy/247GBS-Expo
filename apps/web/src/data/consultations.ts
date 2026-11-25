import { getStoredNotifications, saveStoredNotifications } from "./notifications";

export type ConsultationStatus = "pending" | "confirmed" | "declined";

export interface ConsultationBooking {
  id: string;
  boothId: string;
  boothName: string;
  customerName: string;
  customerEmail: string;
  slot: string;
  topic: string;
  status: ConsultationStatus;
  requestedAt: string;
  meetingLink?: string;
  responseNote?: string;
  decidedAt?: string;
}

const STORAGE_KEY = "expo_consultations_v1";
export const CONSULTATIONS_EVENT = "expo_consultations_changed";

export const DEFAULT_CONSULTATIONS: ConsultationBooking[] = [
  {
    id: "CNS-3081",
    boothId: "futuretech-systems",
    boothName: "FutureTech Systems",
    customerName: "Sarah Chen",
    customerEmail: "sarah.chen@acmeretail.co.uk",
    slot: "Today • 04:30 PM",
    topic: "Enterprise cloud migration & volume licensing pricing for 250 seats.",
    status: "pending",
    requestedAt: "25m ago",
  },
  {
    id: "CNS-3074",
    boothId: "futuretech-systems",
    boothName: "FutureTech Systems",
    customerName: "Marcus Okafor",
    customerEmail: "m.okafor@meridianops.com",
    slot: "Tomorrow • 10:00 AM",
    topic: "Hardware integration demo for Cloud Core Hub X1.",
    status: "confirmed",
    requestedAt: "3h ago",
    meetingLink: "https://meet.247gbs.com/booth/futuretech-cns-3074",
    responseNote: "Looking forward to walking you through the live unit!",
    decidedAt: "2h ago",
  },
];

function emitConsultationsChanged() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(CONSULTATIONS_EVENT));
}

export function getConsultations(): ConsultationBooking[] {
  if (typeof window === "undefined") return DEFAULT_CONSULTATIONS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_CONSULTATIONS;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_CONSULTATIONS;
  } catch {
    return DEFAULT_CONSULTATIONS;
  }
}

export function saveConsultations(items: ConsultationBooking[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    emitConsultationsChanged();
  } catch {
    // ignore storage errors
  }
}

export function createConsultationBooking(payload: {
  boothId: string;
  boothName: string;
  customerName: string;
  customerEmail: string;
  slot: string;
  topic: string;
}): ConsultationBooking {
  const newBooking: ConsultationBooking = {
    id: `CNS-${Math.floor(3100 + Math.random() * 6800)}`,
    boothId: payload.boothId,
    boothName: payload.boothName,
    customerName: payload.customerName.trim() || "Alex Thompson",
    customerEmail: payload.customerEmail.trim() || "alex.thompson@example.com",
    slot: payload.slot,
    topic: payload.topic.trim() || "General 1-on-1 booth product walkthrough",
    status: "pending",
    requestedAt: "Just now",
  };

  const existing = getConsultations();
  saveConsultations([newBooking, ...existing]);

  // Notify Business bell
  const bizNotifs = getStoredNotifications("business");
  saveStoredNotifications("business", [
    {
      id: `ntf-consult-${Date.now()}`,
      title: `New 1-on-1 Consultation Request (${newBooking.id})`,
      message: `${newBooking.customerName} requested a slot (${newBooking.slot}) at ${newBooking.boothName}.`,
      category: "event",
      read: false,
      createdAt: "Just now",
      href: "/dashboard/business/consultations",
    },
    ...bizNotifs,
  ]);

  return newBooking;
}

export function decideConsultationBooking(
  id: string,
  decision: "confirmed" | "declined",
  responseNote?: string,
  meetingLink?: string
): ConsultationBooking[] {
  let decidedTarget: ConsultationBooking | null = null;

  const updated = getConsultations().map((item) => {
    if (item.id !== id || item.status !== "pending") return item;
    decidedTarget = {
      ...item,
      status: decision,
      responseNote: responseNote?.trim() || undefined,
      meetingLink:
        decision === "confirmed"
          ? meetingLink?.trim() || `https://meet.247gbs.com/booth/${item.id.toLowerCase()}`
          : undefined,
      decidedAt: "Just now",
    };
    return decidedTarget;
  });

  if (decidedTarget) {
    saveConsultations(updated);
    const target = decidedTarget as ConsultationBooking;

    // Notify Customer bell
    const custNotifs = getStoredNotifications("customer");
    saveStoredNotifications("customer", [
      {
        id: `ntf-cust-consult-${Date.now()}`,
        title:
          decision === "confirmed"
            ? `Consultation Confirmed: ${target.boothName}`
            : `Consultation Update: ${target.boothName}`,
        message:
          decision === "confirmed"
            ? `Your 1-on-1 slot (${target.slot}) with ${target.boothName} is confirmed!${target.responseNote ? ` Note: ${target.responseNote}` : ""}`
            : `Your 1-on-1 request (${target.slot}) with ${target.boothName} was declined.${target.responseNote ? ` Reason: ${target.responseNote}` : ""}`,
        category: "event",
        read: false,
        createdAt: "Just now",
        href: "/dashboard/customer/schedule",
      },
      ...custNotifs,
    ]);
  }

  return updated;
}
