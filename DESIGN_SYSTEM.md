# 247GBS Expo — Mobile & Desktop Design System Guidelines

This document defines the strict UI and UX craft standards for all front-facing and dashboard pages in 247GBS Expo.

---

## 1. Absolute Prohibitions (Never Do)

1. **NO Raw Specification Tags in UI:**
   - Never render internal development tags, section numbers, or PRD identifiers (e.g. `(Storyline §4.4)`, `CHS Synced`, `(Admin Template Guided)`, `KYB Spec`) in user-facing components.
   - Use clean, user-friendly language: `Verified`, `Optional`, `Live`, `Approved`.

2. **NO Premature Text Truncation:**
   - Do NOT apply `truncate` or `overflow-hidden` to primary content (business names, event titles, contribution roles) when container height is flexible.
   - Allow natural line wrapping with generous width, or stack metadata vertically on mobile viewports.

3. **NO Squeezed Horizontal Mobile Cards:**
   - Never cram an icon + title + multi-word role + status pill + action button into a single horizontal row on small screens (< 400px).
   - Use a 2-tier card layout:
     - **Top row:** Icon + Full Entity Name + Action / Remove (`X`).
     - **Bottom row:** Role / Metadata + Status Pill.

4. **NO Crammed Text Tabs for Multi-Step Wizards:**
   - Never put full step labels (`1. Event Details`, `2. Co-Hosts & Partners`, `3. Ticket Templates`, `4. Review & Submit`) inside tight horizontal buttons that collapse into `2. Partn...`.
   - Use a numbered timeline stepper (`(1) ──── (2) ──── (3) ──── (4)`) with the active step title displayed clearly below or above.

---

## 2. Multi-Step Wizard & Stepper Standards

```
  [ (1)✓ ] ──────── [ (2) ] ──────── [ (3) ] ──────── [ (4) ]
   Details         Partners          Tickets          Review
```

- **Completed Step:** Emerald circle with checkmark (`bg-emerald-600 text-white`).
- **Active Step:** Orange circle with current step number (`bg-orange-600 text-white ring-4 ring-orange-100`).
- **Upcoming Step:** Slate circle with step number (`bg-slate-100 text-slate-500`).
- **Timeline Connector:** Clean 2px line (`h-0.5 bg-slate-200`, tinted emerald for completed steps).
- **Responsive Behavior:**
  - Mobile (< 640px): Show the numbered circles with timeline bars, and a clear summary banner below: `Step X of 4: [Step Title]`.
  - Desktop (≥ 640px): Show step labels centered under each circle without text truncation.

---

## 3. Card & List Item Layouts

### Standard Mobile Entity Card (e.g., Invited Partner, Product, Attendee):
```tsx
<div className="p-3.5 bg-white border border-slate-200/90 rounded-2xl space-y-2.5 shadow-2xs">
  {/* Row 1: Icon, Full Title, and Remove Button */}
  <div className="flex items-start justify-between gap-3">
    <div className="flex items-center gap-2.5 min-w-0">
      <div className="w-9 h-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-tight">
          {fullEntityName}
        </h4>
        <p className="text-[11px] text-slate-500 font-medium">{categoryOrSubtitle}</p>
      </div>
    </div>
    <button className="text-slate-400 hover:text-red-600 p-1 rounded-lg">
      <X className="w-4 h-4" />
    </button>
  </div>

  {/* Row 2: Contribution Role & Status Badges */}
  <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
    <span className="text-[11px] font-bold text-slate-600">
      Role: <strong className="text-orange-600">{role}</strong>
    </span>
    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-amber-50 text-amber-700 border border-amber-200">
      {status}
    </span>
  </div>
</div>
```

---

## 4. Typography & Spacing Hierarchy

| Element | Mobile (<640px) | Desktop (≥640px) | Weight | Color |
|---|---|---|---|---|
| Page Title | `text-base` | `text-xl` | 800 (Extrabold) | `text-slate-900` |
| Section Header | `text-sm` | `text-base` | 700 (Bold) | `text-slate-900` |
| Body / Form Text | `text-xs` | `text-sm` | 500 (Medium) | `text-slate-700` |
| Micro / Meta Label | `text-[10px]` | `text-[11px]` | 700 (Bold) | `text-slate-500` |
| Touch Target | Min 40x40px | Min 36x36px | - | - |

---

## 5. Mobile Responsiveness Floor

1. Test every form, modal, and drawer at **360px width** (typical standard mobile viewport).
2. Elements must NEVER cause horizontal scroll or force text into jagged 1-word-per-line wrapping.
3. Form controls (inputs, dropdowns, buttons) should default to `w-full` on mobile and grid columns on tablet/desktop (`grid grid-cols-1 sm:grid-cols-2`).

