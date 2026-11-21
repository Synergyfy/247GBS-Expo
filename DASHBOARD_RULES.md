# 247GBS-Expo: Dashboard & Mobile Responsive Rulebook

This rulebook is permanently recorded in the codebase to govern all work on the **Customer Dashboard** and **Business Dashboard**.

## 1. Typography & Header Scale Rules
- **Page Titles (`<h1>`)**: `text-sm sm:text-base lg:text-lg font-extrabold uppercase tracking-tight text-slate-900`.
- **Page Subtitles (`<p>`)**: `text-[11px] sm:text-xs text-slate-500 font-medium`.
- **Section / Card Titles (`<h3>`, `<h4>`)**: `text-xs sm:text-sm font-bold text-slate-900`.
- **Modal Dialogs**: Header title is `text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 truncate` with `px-4 py-3 sm:px-5 sm:py-3.5` padding and a compact `w-7 h-7` close button.

## 2. Stat / KPI Cards Rules
- **Horizontal Scroll on Mobile**: Never use a 2-col or 3-col grid that squashes text. Use:
  `flex lg:grid lg:grid-cols-4 gap-2.5 sm:gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 pb-1`.
- **Peeping Card**: Card width `w-[42%] min-w-[144px] sm:w-[190px] lg:w-auto shrink-0 snap-start` so the 3rd card peeps out on the right edge.
- **Dot Indicator**: Every horizontal KPI carousel has a mobile dot indicator below (`flex items-center justify-center gap-1.5 mt-1.5 lg:hidden`).
- **Inline Icons**: Icons are small (`w-3.5 h-3.5` or `w-4 h-4`) inline on the top row next to the label. Never use large `w-10 h-10` icon boxes taking half the card.

## 3. List Rows & Table Rules
- **Full Width (No Left Icon Boxes)**: Never use bulky `w-10 h-10` left icon boxes that indent the whole text block. Titles and text span 100% width.
- **Scannable 3-Line Mobile Cards**:
  - Line 1: Title on left + colored status text on right.
  - Line 2: Metadata separated by middots (`•`).
  - Line 3: Bottom info on left + compact action button on right.
- **No Redundant Repetitive Labels**: Use simple `<ChevronRight />` on navigation rows rather than repeating the same badge in every row.

## 4. Pills vs. Clean Typography
- **No Decorative Header Pills**: No `SYSTEMS LIVE`, `THREAT LEVEL: LOW`, `3 PRIORITY TICKETS`, etc.
- **No Metadata Background Pills**: Use clean colored uppercase text with middots instead of background color pills (e.g. `text-amber-600` for Pending, `text-emerald-600` for Approved, `text-red-600` for Rejected).
- **Filter Sliders Must Peep Out**: Horizontal filter strips use `-mx-4 px-4 sm:mx-0 sm:px-0` so the edge filter option peeps out without clipping.

## 5. Collapsible Accordion Patterns
- Multi-item lists, seasonal packages, and dark informational banners must be collapsible (`ChevronDown` toggle), showing a 1-line summary when collapsed.

## 6. Architecture & Meeting Directives
- **Floating Chat**: Single global instance in `src/app/layout.tsx`. Never mount in dashboard layouts.
- **CHS Delegation**: KYB and identity verification handled by CHS. No KYC/KYB upload pages.
- **Business Dashboard Cleanups**:
  1. Remove Create Campaign / Launch Campaign page.
  2. Remove POS Console.
  3. Remove Event Operations page (keep ticket verification/scanner tools).
  4. MCOM Rewards: dynamic fetch from MCOM Reward.
  5. MCOM Mall: auto-import products (or clean fields with Buy Now linking to MCOM Mall).
  6. Enforce admin ticket pricing caps when creating events.
  7. Auto-pull branding logo/banner from CHS profile.
- **Navigation Shell**: Persistent bottom bar + `More` slide-up sheet drawer with scroll lock.


## 7. Implementation & Verification Status
- **Public-Facing Pages**: 100% Complete & Verified (Home, National Events, Galleries, News, News Detail, Partnership).
- **Admin Dashboard (`/dashboard/admin`)**: 100% Complete & Verified (All 18 pages + navigation shell, small typography, 3-line event approval cards, collapsible rules).
- **Customer Dashboard (`/dashboard/customer`)**: 100% Complete & Verified (All 8 pages + navigation shell, Event Day Access Pass Gate, MCOM Mall product shelf integration).
- **Business Dashboard (`/dashboard/business`)**: 100% Complete & Verified (All 20+ pages + navigation shell, CHS branding sync, MCOM Mall 1-click Auto-Import & Buy Now links, Admin-enforced ticket templates & price caps, MCOM Rewards sync, CHS live chat, zero TypeScript errors).
