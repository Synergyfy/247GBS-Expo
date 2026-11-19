# Developer Storyline and Platform Requirements

## 1. Purpose of this document
The objective is to improve the existing 247GBS Expo platform, not build another platform from scratch.
247GBS Expo should provide a simple place where:
- Businesses create and host events, workshops, demonstrations, bundle deals and other promotional activities.
- Consumers discover events, explore offers, register or book attendance, and participate.
- Admin creates and manages platform-led events, oversees business events, manages participation and controls what appears on the website.

The platform must support both business-led events and platform-led events.
It must remain a straightforward event-hosting and discovery platform. We are not trying to recreate WarriorPlus or build another large collection of digital marketing tools. The existing Event Press Kit, promotional services and other installed features should be retained where they are already available and relevant—not rebuilt as new tools.
The guiding principle is: **make it easy to create an event, make it easy to find an event, and make it easy for Admin to manage the whole Expo.**

---

## 2. What the current website already presents
The existing homepage already separates Expo into three event types:
1. **National Expo** – the platform-wide flagship seasonal event, managed centrally.
2. **Platform-led events** – workshops, demonstrations and educational sessions organised by 247GBS.
3. **Business-led events** – events created and managed by individual businesses, such as brand showcases, product launches and live selling sessions.

This is a useful foundation and should be retained. The development work should make these three event types operate through one clear event-management system, with different permissions depending on who owns the event.

The homepage also currently presents features such as permanent digital booths, rewards, wallet, referrals, QR codes and community groups. These should not automatically become new Expo development projects. The core event journey should work first, with connections to existing ecosystem features only where they are already supported and required.

---

## 3. The three types of events the system must support
All events should use the same underlying event-management system. The difference is who creates and manages the event.

### A. National Expo (Admin-managed)
This is the main seasonal Expo organised by 247GBS.
- Examples: Spring Expo, Summer Expo, Autumn Expo, Winter Expo.
- Admin creates the main Expo, sets the dates and theme, manages participating businesses and publishes the event.

### B. Platform-led events (Admin-managed)
These are events organised by 247GBS itself.
- Examples: Business onboarding workshops, seller training, product demonstrations, marketing workshops, business education sessions, live demonstrations.
- Admin creates these events, manages the details and publishes them for consumers and businesses to discover and attend.

### C. Business-led events (Business-managed)
These are events created by individual businesses.
- Examples: Product launches, workshops, product demonstrations, business showcases, live selling events, bundle deals and special offers, training sessions, seasonal promotions, business partnership events.
- The business creates and manages its own event through its dashboard.

---

## 4. Business dashboard – what businesses should be able to do
Businesses should have a straightforward event-management area inside their existing dashboard.

### 4.1 My Events
Add/consolidate a menu item called **My Events**.
When a business opens it, it should see:
- Upcoming events
- Published events
- Draft events
- Pending approval events (if approval is enabled)
- Completed events
- Cancelled events

Each event should show its name, date, status, and basic activity information.
Available actions:
- Create Event
- View Event
- Edit Event
- Preview Event
- Cancel Event
- View Bookings or Registrations

*Do not create separate event-management systems for workshops, product launches and bundle deals. They should all be managed from My Events.*

### 4.2 Create Event
When a business clicks Create Event, it follows a short, straightforward process:
1. **Event Information:** Event name, event type, short description, full description, event image/flyer, hosting business. (Types include workshops, product launches, demonstrations, showcases, live selling, seasonal promos).
2. **Date, Time and Location:** Start date/time, end date/time, physical venue, online or hybrid, address/joining info, timezone.
3. **Tickets and Attendance:** Free to attend, Paid entry, Registration only, or Invitation only. (Paid sets ticket name, price, capacity, sales period).
4. **Bundle Deals and Special Offers:** Connect an offer to the event (e.g. ticket + product, bundle price, demo package). If bundle uses products already in MCOM Mall, reuse existing product records—never create duplicate listings.
5. **Partners and Participating Businesses:** Invite another business to co-host or participate. Invited business must accept before appearing as an approved partner.
6. **Preview and Submit:** Save as Draft, Submit for Approval, or publish according to rules.

### 4.3 Manage an event after creation
Once created, business can update details, change ticket capacity, manage bundles, view registrations/attendees, view ticket sales, share link, and cancel/complete.

### 4.4 Business partnerships
Part of the event workflow:
- Open event → Invite Business Partner → Search participating business → Send invitation → Define contribution → Partner accepts/declines → Display on event page.

---

## 5. Consumer dashboard – what consumers should be able to do
Simple, attendee-focused experience.

### 5.1 Discover Events
Browse published events by categories and filters:
- All Events, National Expo, Platform-led Events, Business-led Events, Workshops, Demos, Showcases, Bundle Deals, Seasonal Events.
- Filter by location, date, category, free/paid, organiser, event type.

### 5.2 View Event Details
Shows name, image, description, organiser (247GBS or business), date/time, location/online access, ticket options/pricing, bundles, participating partners, and Register/Book button.

### 5.3 Register or Book
- Free events: immediate registration confirmation without unnecessary payment forms.
- Paid events: ticket selection, attendee details confirmation, payment via existing gateway (Stripe/PayPal Sandbox), and instant confirmation/passport ticket.

### 5.4 My Events
Shows upcoming bookings, confirmed registrations, tickets purchased, event details, status, and past events.

### 5.5 Share and promote events
Share event with friends/network. Connect qualifying shares to MCOM Rewards if supported.

---

## 6. Admin dashboard – what Admin must be able to do
Admin manages the overall Expo and creates platform events independently.

### 6.1 Admin Event Management
Admin dashboard Events section showing All Events, National Expos, Platform-led, Business-led, Drafts, Pending Approval, Published, Completed, Cancelled.

### 6.2 Admin can create an event
Admin has a **Create Event** button:
- Can create **National Expo**, **Platform-led Event**, or **Business-led Event** (on behalf of a business).
- Platform-led events do **not** require a business account; they belong to 247GBS.

### 6.3 Admin can manage National Expo events
Admin creates main seasonal Expos (e.g. Winter Expo 2026), sets themes/dates, and links platform-led workshops and approved business events as child activities.

### 6.4 Admin can manage business events
Admin approves/rejects submissions, unpublishes, cancels, features events, and assigns events to seasonal Expos.

### 6.5 Admin manages organisers and participating businesses
Directory of businesses, approval of invitations, and participant moderation.

### 6.6 Admin manages event bookings and payments
Overview of registrations, tickets sold, free vs paid, capacity, refunds, and resolution of booking issues.

### 6.7 Admin manages event visibility
Controls which events appear on homepage, featured banners, category pages, or seasonal campaigns.

### 6.8 Event Scout and external discovery
Treat as existing optional integration; do not build a new AI product.

---

## 7. Connecting Platform-Led and Business-Led Events
247GBS and businesses collaborate:
- Admin creates platform-wide educational workshops and seller masterclasses.
- Businesses create product launches and bundle showcases.
- Both can be linked under the flagship Seasonal Expo (e.g. Autumn/Winter Expo).

---

## 8. Eight-Week Business Activity Plan
Businesses run and promote workshops/demos 8 weeks prior to the seasonal Expo climax. Admin links successful events to the seasonal Expo.

---

## 9. Critical Scope Boundaries – What NOT to Build
- ❌ NO new WarriorPlus-style product marketplace
- ❌ NO second Event Press Kit builder (retain existing if present)
- ❌ NO second promotional service shop
- ❌ NO separate AI marketing or discovery product
- ❌ NO new email marketing automation platform
- ❌ NO new wallet or financial platform (reuse Stripe/PayPal and existing wallet sync)
- ❌ NO separate product catalogue (reuse MCOM Mall records)
- ❌ NO complicated digital booth builder
- ❌ NO affiliate management platform inside Expo

---

## 10. Recommended Navigation
- **Public Navigation:**
  - `Home` (Main Expo overview)
  - `Explore Events` (All categories)
  - `National Expo` (Seasonal flagship)
  - `Platform Events` (247GBS activities)
  - `Business Events` (Business-hosted activities)
  - `Host an Event` (Business entry point, simplifying Exhibit & Partner)
- **Business Dashboard Navigation:**
  - `Dashboard`, `My Events`, `Create Event`, `Event Bookings`, `Business Partnerships`, `My Profile`.
- **Consumer Dashboard Navigation:**
  - `Discover Events`, `My Events`, `My Tickets / Bookings`, `Saved Events`, `My Profile`.
- **Admin Dashboard Navigation:**
  - `Dashboard`, `Events`, `Create Event`, `National Expo`, `Platform-led Events`, `Business-led Events`, `Businesses & Organisers`, `Bookings & Tickets`, `Event Categories`, `Event Settings`.

---

## 11. Event Statuses & Permissions
- Statuses: `Draft`, `Pending Approval`, `Published`, `Full`, `Completed`, `Cancelled`, `Archived`.
- One underlying unified event record.

