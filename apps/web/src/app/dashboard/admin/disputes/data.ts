import { getStoredNotifications, saveStoredNotifications } from "@/data/notifications";

export interface Dispute {
  id: string;
  subject: string;
  complainant: string;
  complainantEmail?: string;
  respondent: string;
  respondentEmail?: string;
  status: "OPEN" | "REVIEW" | "MEDIATE" | "DECIDE";
  priority: "CRITICAL" | "HIGH" | "MEDIUM";
  date: string;
  amount: string;
  details: string;
  evidence: string;
  category?: string;
  sla?: string;
  ruling?: string;
  bookingRef?: string;
}

const DISPUTES_STORAGE_KEY = "expo_disputes_v1";
export const DISPUTES_EVENT = "expo_disputes_changed";

export const INITIAL_DISPUTES: Dispute[] = [
  {
    id: "DSP-4421",
    subject: "Refund Request: Event Cancelled",
    complainant: "Alice M.",
    complainantEmail: "alice.m@domain.com",
    respondent: "TechFlow Inc.",
    respondentEmail: "support@techflow.io",
    status: "OPEN",
    priority: "HIGH",
    date: "2h ago",
    amount: "£299.00",
    category: "Ticket Refund",
    sla: "46h remaining",
    details:
      "Organizer postponed flagship event 24h before commencement. Attendee is requesting an immediate cash refund per platform escrow rules.",
    evidence:
      "Booking ref #BKG-9941. Attendee registered complaint within 48h SLA. Organizer offered non-refundable voucher instead of statutory refund."
  },
  {
    id: "DSP-4422",
    subject: "Ticket Not Received",
    complainant: "Bob D.",
    complainantEmail: "bob.d@tech-hub.org",
    respondent: "Expo Organizer",
    respondentEmail: "ops@247expo.com",
    status: "REVIEW",
    priority: "MEDIUM",
    date: "5h ago",
    amount: "£50.00",
    category: "Ticketing & Delivery",
    sla: "19h remaining",
    details:
      "Payment went through gateway successfully, but barcode token was not minted into the attendee's ticket vault due to webhook timeout.",
    evidence:
      "Stripe charge ID ch_3L9x0021A matched. Gateway settled £50.00. Pass generation script failed on ticket sync callback."
  },
  {
    id: "DSP-4420",
    subject: "Vendor Misrepresentation",
    complainant: "Sarah J.",
    complainantEmail: "sarah.j@greenenergy.eu",
    respondent: "GreenEnergy Booth",
    respondentEmail: "exhibit@greenenergy.de",
    status: "MEDIATE",
    priority: "CRITICAL",
    date: "1d ago",
    amount: "N/A",
    category: "Exhibitor Conduct",
    sla: "6h remaining",
    details:
      "Exhibitor promoted uncertified green technology claiming official ISO verification. Compliance team flagged the booth for misleading claims.",
    evidence:
      "Booth audit photo evidence uploaded. Certification registry returned zero records for registration #GEN-88."
  },
  {
    id: "DSP-4418",
    subject: "Duplicate Charge",
    complainant: "Mike R.",
    complainantEmail: "mike.r@investornet.co",
    respondent: "Platform",
    respondentEmail: "billing@247gbs.com",
    status: "DECIDE",
    priority: "HIGH",
    date: "2d ago",
    amount: "£150.00",
    category: "Billing Duplicate",
    sla: "Resolved SLA",
    details:
      "Parallel checkout requests resulted in dual transaction entries for a single registered pass on checkout session #SES-881.",
    evidence:
      "Payment gateway confirms 2 authorizations 1.2s apart. Database records only 1 ticket pass issued."
  }
];

export const STAGES: { id: Dispute["status"]; label: string; color: string }[] = [
  { id: "OPEN", label: "Open Intake", color: "border-slate-300" },
  { id: "REVIEW", label: "Under Review", color: "border-blue-500" },
  { id: "MEDIATE", label: "Mediation", color: "border-purple-500" },
  { id: "DECIDE", label: "Final Decision", color: "border-orange-500" }
];

function emitDisputesChanged() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(DISPUTES_EVENT));
}

export function getStoredDisputes(): Dispute[] {
  if (typeof window === "undefined") return INITIAL_DISPUTES;
  try {
    const raw = localStorage.getItem(DISPUTES_STORAGE_KEY);
    if (!raw) return INITIAL_DISPUTES;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_DISPUTES;
  } catch {
    return INITIAL_DISPUTES;
  }
}

export function saveStoredDisputes(disputes: Dispute[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(DISPUTES_STORAGE_KEY, JSON.stringify(disputes));
    emitDisputesChanged();
  } catch {
    // ignore storage errors
  }
}

export function createCustomerDispute(payload: {
  subject: string;
  category: string;
  respondent: string;
  amount: string;
  bookingRef?: string;
  details: string;
  complainant: string;
  complainantEmail?: string;
}): Dispute {
  const newDispute: Dispute = {
    id: `DSP-${Math.floor(4500 + Math.random() * 5400)}`,
    subject: payload.subject.trim(),
    complainant: payload.complainant.trim() || "Alex Thompson",
    complainantEmail: payload.complainantEmail?.trim() || "alex.thompson@example.com",
    respondent: payload.respondent.trim() || "Expo Organizer",
    respondentEmail: "support@247gbs.com",
    status: "OPEN",
    priority:
      payload.category === "Billing Duplicate" || payload.category === "Ticket Refund"
        ? "HIGH"
        : "MEDIUM",
    date: "Just now",
    amount: payload.amount.trim() || "N/A",
    category: payload.category,
    sla: "48h remaining",
    bookingRef: payload.bookingRef?.trim() || undefined,
    details: payload.details.trim(),
    evidence: payload.bookingRef?.trim()
      ? `Customer supplied reference ${payload.bookingRef.trim()} via Customer Support Portal.`
      : "Submitted directly through Customer Support & Disputes portal.",
  };

  const existing = getStoredDisputes();
  saveStoredDisputes([newDispute, ...existing]);

  // Notify Admin bell
  const adminNotifs = getStoredNotifications("admin");
  saveStoredNotifications("admin", [
    {
      id: `ntf-dispute-${Date.now()}`,
      title: `New Customer Dispute (${newDispute.id})`,
      message: `${newDispute.complainant} opened "${newDispute.subject}" against ${newDispute.respondent}.`,
      category: "system",
      read: false,
      createdAt: "Just now",
      href: `/dashboard/admin/disputes/${newDispute.id}`,
    },
    ...adminNotifs,
  ]);

  return newDispute;
}

export function updateDisputeRecord(
  id: string,
  patch: Partial<Dispute>,
  customerNotification?: { title: string; message: string }
): Dispute[] {
  const updated = getStoredDisputes().map((d) =>
    d.id.toLowerCase() === id.toLowerCase() ? { ...d, ...patch } : d
  );
  saveStoredDisputes(updated);

  if (customerNotification) {
    const custNotifs = getStoredNotifications("customer");
    saveStoredNotifications("customer", [
      {
        id: `ntf-cust-dispute-${Date.now()}`,
        title: customerNotification.title,
        message: customerNotification.message,
        category: "system",
        read: false,
        createdAt: "Just now",
        href: "/dashboard/customer/support",
      },
      ...custNotifs,
    ]);
  }

  return updated;
}
