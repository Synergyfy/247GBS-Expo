"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, 
  Layout, 
  Users, 
  ShoppingBag, 
  MapPin, 
  Plus, 
  Save,
  Search,
  Filter,
  MoreVertical,
  Clock,
  Mic,
  Tag,
  Gift,
  X,
  Trash2,
  Edit2,
  ExternalLink,
  CheckCircle2
} from "lucide-react";
import Modal from "@/app/component/Modal";

const TABS = [
  { id: "sessions", label: "Session Timetable", icon: Clock },
  { id: "booths", label: "Booth Layout", icon: Layout },
  { id: "workshops", label: "Workshop Slots", icon: Users },
  { id: "speakers", label: "Speaker Profiles", icon: Mic },
  { id: "products", label: "Product Catalogs", icon: ShoppingBag },
  { id: "redemption", label: "Redemption Points", icon: Gift },
];

export default function EventConfigurationPage() {
  const [activeTab, setActiveTab] = useState("sessions");
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"session" | "speaker" | "product">("session");
  const [editingItem, setEditingItem] = useState<any>(null);

  // Mock Data
  const [sessions, setSessions] = useState([
    { id: 1, title: "Opening Keynote", time: "09:00 AM", hall: "Main Stage", speaker: "Dr. Sarah Smith" },
    { id: 2, title: "Future of Retail Panel", time: "10:30 AM", hall: "Hall B", speaker: "Panel Discussion" },
  ]);

  const [speakers, setSpeakers] = useState([
    { id: 1, name: "Dr. Sarah Smith", role: "CEO, TechGlobal", topic: "Innovation 2026" },
    { id: 2, name: "James Doe", role: "Director, RetailAI", topic: "AI in Commerce" },
  ]);

  const [products, setProducts] = useState<any[]>([]);

  // Handlers
  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1500);
  };

  const openAddModal = (type: typeof modalType) => {
    setModalType(type);
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const openEditModal = (type: typeof modalType, item: any) => {
    setModalType(type);
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = (type: typeof modalType, id: number) => {
    if (confirm("Are you sure you want to delete this item?")) {
      if (type === "session") setSessions(sessions.filter(s => s.id !== id));
      if (type === "speaker") setSpeakers(speakers.filter(s => s.id !== id));
    }
  };

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    if (modalType === "session") {
      if (editingItem) {
        setSessions(sessions.map(s => s.id === editingItem.id ? { ...s, ...data } : s));
      } else {
        setSessions([...sessions, { id: Date.now(), ...data } as any]);
      }
    } else if (modalType === "speaker") {
      if (editingItem) {
        setSpeakers(speakers.map(s => s.id === editingItem.id ? { ...s, ...data } : s));
      } else {
        setSpeakers([...speakers, { id: Date.now(), ...data } as any]);
      }
    }
    
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">Event Configuration</h1>
          <p className="text-slate-500">Manage detailed settings for <span className="font-bold text-slate-900">Global Innovation Fair (Spring 2026)</span></p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="flex-1 lg:flex-none px-6 py-3 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-all shadow-sm flex items-center justify-center gap-2">
            <ExternalLink className="w-4 h-4" /> Preview
          </button>
          <button 
            onClick={handleSave}
            disabled={loading}
            className={`flex-1 lg:flex-none px-8 py-3 rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2 ${
              saveSuccess ? "bg-emerald-500 text-white" : "bg-slate-900 text-white hover:bg-orange-600"
            }`}
          >
            {loading ? <Clock className="w-5 h-5 animate-spin" /> : saveSuccess ? <CheckCircle2 className="w-5 h-5" /> : <Save className="w-5 h-5" />}
            {loading ? "Saving..." : saveSuccess ? "Saved Successfully" : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white p-2 rounded-2xl border border-slate-100 shadow-sm overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 min-w-max">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                activeTab === tab.id
                  ? "bg-orange-600 text-white shadow-lg shadow-orange-600/30"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 min-h-[500px] relative overflow-hidden">
        <div className="p-6 md:p-12">
          <AnimatePresence mode="wait">
            
            {/* SESSIONS TAB */}
            {activeTab === "sessions" && (
              <motion.div
                key="sessions"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 mb-1">Session Timetable</h2>
                    <p className="text-slate-500 text-sm">Organize the schedule for main stage and breakout rooms.</p>
                  </div>
                  <button 
                    onClick={() => openAddModal("session")}
                    className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-orange-600 transition-all w-full sm:w-auto justify-center"
                  >
                    <Plus className="w-4 h-4" /> Add Session
                  </button>
                </div>

                <div className="grid gap-4">
                  {sessions.length > 0 ? sessions.map((session) => (
                    <div key={session.id} className="p-6 rounded-3xl border border-slate-100 bg-slate-50 hover:border-orange-200 transition-all group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-white rounded-2xl flex flex-col items-center justify-center border border-slate-200 shadow-sm font-bold text-slate-900 shrink-0">
                            <span className="text-[10px] text-slate-400 uppercase leading-none mb-1">Start</span>
                            <span className="text-sm">{session.time}</span>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-slate-900 group-hover:text-orange-600 transition-colors">{session.title}</h3>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 font-medium mt-1">
                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {session.hall}</span>
                            <span className="flex items-center gap-1"><Mic className="w-3 h-3" /> {session.speaker}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 w-full sm:w-auto justify-end">
                        <button onClick={() => openEditModal("session", session)} className="p-2.5 bg-white text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-xl border border-slate-200 transition-all">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete("session", session.id)} className="p-2.5 bg-white text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl border border-slate-200 transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )) : (
                    <div className="text-center py-12 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                      <Clock className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                      <p className="text-slate-500 font-medium">No sessions scheduled yet.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* BOOTHS TAB */}
            {activeTab === "booths" && (
              <motion.div
                key="booths"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 mb-1">Booth Layout Configuration</h2>
                    <p className="text-slate-500 text-sm">Design the virtual floor plan and assign exhibitors.</p>
                  </div>
                  <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-orange-600 transition-all">
                    <Layout className="w-4 h-4" /> Open 3D Editor
                  </button>
                </div>

                <div className="aspect-video bg-slate-100 rounded-[2rem] border-2 border-dashed border-slate-200 flex items-center justify-center relative overflow-hidden group cursor-pointer">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] opacity-10"></div>
                    <div className="text-center relative z-10 p-8">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-orange-600 shadow-lg group-hover:scale-110 transition-transform">
                            <Layout className="w-8 h-8" />
                        </div>
                        <h3 className="font-bold text-slate-900 mb-2 text-xl">Interactive Map Editor</h3>
                        <p className="text-slate-500 text-sm max-w-md mx-auto mb-6">Drag-and-drop booths, set navigation paths, and configure interactive zones.</p>
                        <button className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-orange-600 transition-all">Launch Editor</button>
                    </div>
                </div>
              </motion.div>
            )}

             {/* SPEAKERS TAB */}
             {activeTab === "speakers" && (
              <motion.div
                key="speakers"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 mb-1">Speaker Profiles</h2>
                    <p className="text-slate-500 text-sm">Manage keynote speakers and panelists.</p>
                  </div>
                  <button 
                    onClick={() => openAddModal("speaker")}
                    className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-orange-600 transition-all w-full sm:w-auto justify-center"
                  >
                    <Plus className="w-4 h-4" /> Add Speaker
                  </button>
                </div>

                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {speakers.map((speaker) => (
                    <div key={speaker.id} className="p-6 rounded-3xl border border-slate-100 bg-white hover:shadow-xl hover:border-orange-200 transition-all group relative">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-16 h-16 bg-slate-100 rounded-full shrink-0 overflow-hidden flex items-center justify-center text-slate-400">
                                <Users className="w-8 h-8" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 group-hover:text-orange-600 transition-colors">{speaker.name}</h3>
                                <p className="text-xs font-bold text-orange-600 uppercase tracking-widest">{speaker.role}</p>
                            </div>
                        </div>
                        <p className="text-sm text-slate-500 line-clamp-2">Topic: {speaker.topic}</p>
                        
                        <div className="flex gap-2 mt-6">
                            <button onClick={() => openEditModal("speaker", speaker)} className="flex-1 py-2.5 bg-slate-50 text-slate-500 font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-orange-50 hover:text-orange-600 transition-all">Edit</button>
                            <button onClick={() => handleDelete("speaker", speaker.id)} className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all"><Trash2 className="w-4 h-4" /></button>
                        </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* PRODUCT CATALOGS TAB */}
            {activeTab === "products" && (
              <motion.div
                key="products"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 mb-1">Product Catalogs</h2>
                    <p className="text-slate-500 text-sm">Attach inventory to your event for direct sales.</p>
                  </div>
                  <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-orange-600 transition-all w-full sm:w-auto justify-center">
                    <Plus className="w-4 h-4" /> Link Product
                  </button>
                </div>

                <div className="bg-slate-50 p-12 rounded-[2rem] border border-slate-100 text-center">
                    <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                        <ShoppingBag className="w-10 h-10 text-slate-300" />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2 text-xl">No Catalogs Linked</h3>
                    <p className="text-slate-500 text-sm mb-8 max-w-sm mx-auto">Link your existing inventory to this event to allow attendees to purchase products directly from their virtual booths.</p>
                    <button className="px-8 py-4 bg-white border border-slate-200 text-slate-900 font-bold rounded-2xl hover:bg-slate-100 transition-all shadow-sm">
                        Browse My Inventory
                    </button>
                </div>
              </motion.div>
            )}

            {/* OTHER TABS */}
            {(activeTab === "workshops" || activeTab === "redemption") && (
                <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-20 text-center"
                >
                    <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center mb-6 shadow-inner">
                        <Tag className="w-10 h-10 text-slate-300" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2">Module Initializing</h3>
                    <p className="text-slate-500 max-w-sm mx-auto">The <span className="font-bold text-orange-600 uppercase">{activeTab}</span> configuration module is currently being optimized for your account.</p>
                </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>

      {/* MODAL FOR ADD/EDIT */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={`${editingItem ? 'Edit' : 'Add New'} ${modalType.charAt(0).toUpperCase() + modalType.slice(1)}`}
      >
        <form onSubmit={handleModalSubmit} className="space-y-5">
          {modalType === "session" && (
            <>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Session Title</label>
                <input name="title" defaultValue={editingItem?.title} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all font-bold" placeholder="e.g. Masterclass A" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Start Time</label>
                    <input name="time" type="time" defaultValue={editingItem?.time} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none" />
                </div>
                <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Location</label>
                    <input name="hall" defaultValue={editingItem?.hall} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none" placeholder="Hall B" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Speaker</label>
                <select name="speaker" defaultValue={editingItem?.speaker} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none font-medium">
                    <option>Select Speaker</option>
                    {speakers.map(s => <option key={s.id}>{s.name}</option>)}
                    <option>Panel Discussion</option>
                </select>
              </div>
            </>
          )}

          {modalType === "speaker" && (
            <>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Full Name</label>
                <input name="name" defaultValue={editingItem?.name} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all font-bold" placeholder="John Doe" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Role / Company</label>
                <input name="role" defaultValue={editingItem?.role} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none" placeholder="CTO at InnovateX" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Keynote Topic</label>
                <textarea name="topic" defaultValue={editingItem?.topic} rows={3} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none resize-none" placeholder="Description of the session..." />
              </div>
            </>
          )}

          <div className="pt-4 flex gap-3">
            <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 border border-slate-200 text-slate-500 font-bold rounded-xl hover:bg-slate-50 transition-all uppercase tracking-widest text-xs">Cancel</button>
            <button type="submit" className="flex-1 py-3 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/20 uppercase tracking-widest text-xs">
                {editingItem ? 'Update' : 'Create'} Entry
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
