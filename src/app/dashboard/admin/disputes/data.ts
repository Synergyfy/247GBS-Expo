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
  redFlags?: string[];
}

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
    redFlags: [
      "Event rescheduled < 24h prior to start",
      "Voucher offered instead of required refund",
      "Escrow SLA freeze active"
    ],
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
    redFlags: [
      "Gateway settled but webhook sync failed",
      "Pass token generation exception in ticket vault",
      "Missing QR token in attendee wallet"
    ],
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
    redFlags: [
      "Unverified ISO credential claim",
      "Zero records found in national registry",
      "Prior compliance warning logged"
    ],
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
    redFlags: [
      "Rapid concurrent checkout retry (1.2s)",
      "Dual payment authorizations detected",
      "Only 1 pass recorded in database"
    ],
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
