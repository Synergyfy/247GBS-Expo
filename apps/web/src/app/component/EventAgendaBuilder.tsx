"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, Clock, Info } from "lucide-react";
import Tooltip from "@/app/component/Tooltip";

export interface AgendaSlot {
  id: string;
  time: string;
  title: string;
  speaker: string;
}

const STORAGE_KEY = "expo_event_agenda_v1";

const DEFAULT_SLOTS: AgendaSlot[] = [
  { id: "ag-1", time: "10:00 AM", title: "Opening Ceremony", speaker: "Event Host" },
  { id: "ag-2", time: "11:30 AM", title: "Live Product Keynote", speaker: "Lead Presenter" },
  { id: "ag-3", time: "01:00 PM", title: "Buyer Q&A & Networking", speaker: "Open Hall" }
];

export default function EventAgendaBuilder() {
  const [slots, setSlots] = useState<AgendaSlot[]>(DEFAULT_SLOTS);
  const [newTime, setNewTime] = useState("02:30 PM");
  const [newTitle, setNewTitle] = useState("");
  const [newSpeaker, setNewSpeaker] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as AgendaSlot[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSlots(parsed);
        }
      }
    } catch {
      // keep defaults
    }
  }, []);

  const persist = (next: AgendaSlot[]) => {
    setSlots(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore storage errors
    }
  };

  const handleAdd = () => {
    const title = newTitle.trim();
    if (!title) return;
    const next: AgendaSlot[] = [
      ...slots,
      {
        id: `ag-${Date.now()}`,
        time: newTime.trim() || "TBA",
        title,
        speaker: newSpeaker.trim() || "Event Host"
      }
    ];
    persist(next);
    setNewTitle("");
    setNewSpeaker("");
  };

  const handleRemove = (id: string) => {
    persist(slots.filter((s) => s.id !== id));
  };

  return (
    <div className="space-y-2.5 pt-3 border-t border-slate-100">
      <div className="flex items-center justify-between gap-2">
        <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-orange-600 shrink-0" />
          <span>Event Agenda / Timed Sessions</span>
          <Tooltip content="Timed agenda items appear inside the live Event Lobby Agenda tab so attendees know what happens next.">
            <Info className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-help shrink-0" />
          </Tooltip>
        </label>
        <span className="text-[10px] font-bold text-slate-400">
          {slots.length} {slots.length === 1 ? "slot" : "slots"}
        </span>
      </div>

      {/* Existing Agenda Slots */}
      {slots.length > 0 && (
        <div className="divide-y divide-slate-100 rounded-xl border border-slate-200/80 bg-white overflow-hidden">
          {slots.map((slot) => (
            <div
              key={slot.id}
              className="px-3 py-2 flex items-center justify-between gap-2 text-xs"
            >
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <span className="text-[10px] font-mono font-bold text-orange-600 bg-orange-50 border border-orange-100 px-2 py-0.5 rounded-md shrink-0">
                  {slot.time}
                </span>
                <div className="min-w-0">
                  <p className="font-bold text-slate-900 truncate">{slot.title}</p>
                  <p className="text-[10px] text-slate-400 truncate">{slot.speaker}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleRemove(slot.id)}
                aria-label={`Remove ${slot.title}`}
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer shrink-0"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Inline Add Slot Row */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
        <input
          type="text"
          value={newTime}
          onChange={(e) => setNewTime(e.target.value)}
          placeholder="02:30 PM"
          className="sm:col-span-3 px-3 py-2 rounded-lg border border-slate-200 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-orange-500"
        />
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAdd();
            }
          }}
          placeholder="Session title (e.g. MCOM Product Demo)"
          className="sm:col-span-4 px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-orange-500"
        />
        <input
          type="text"
          value={newSpeaker}
          onChange={(e) => setNewSpeaker(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAdd();
            }
          }}
          placeholder="Speaker / Host"
          className="sm:col-span-3 px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-orange-500"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="sm:col-span-2 px-3 py-2 rounded-lg bg-slate-900 hover:bg-orange-600 text-white text-xs font-bold inline-flex items-center justify-center gap-1 transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add</span>
        </button>
      </div>
    </div>
  );
}
