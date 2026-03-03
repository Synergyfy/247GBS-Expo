"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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
  CheckCircle2,
  Loader2,
  ChevronDown
} from "lucide-react";
import Modal from "@/app/component/Modal";
import { api } from "@/lib/api";

const TABS = [
  { id: "sessions", label: "Session Timetable", icon: Clock },
  { id: "booths", label: "Booth Layout", icon: Layout },
  { id: "speakers", label: "Speaker Profiles", icon: Mic },
  { id: "products", label: "Product Catalogs", icon: ShoppingBag },
  { id: "redemption", label: "Redemption Points", icon: Gift },
];

export default function EventConfigurationPage() {
  const [activeTab, setActiveTab] = useState("sessions");
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [events, setEvents] = useState<any[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string>("");
  const [isEventsLoading, setIsEventsLoading] = useState(true);

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"session" | "speaker" | "product">("session");
  const [editingItem, setEditingItem] = useState<any>(null);

  // Data States
  const [sessions, setSessions] = useState<any[]>([]);
  const [speakers, setSpeakers] = useState<any[]>([]);
  const [eventProducts, setEventProducts] = useState<any[]>([]);
  const [inventory, setInventory] = useState<any[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (selectedEventId) {
      fetchEventData();
    }
  }, [selectedEventId]);

  const fetchEvents = async () => {
    setIsEventsLoading(true);
    try {
      const data = await api.get('/dashboard/business/events');
      const eventList = data.events || [];
      setEvents(eventList);
      if (eventList.length > 0 && !selectedEventId) {
        setSelectedEventId(eventList[0].id);
      }
    } catch (error) {
      console.error("Failed to fetch events:", error);
    } finally {
      setIsEventsLoading(false);
    }
  };

  const fetchEventData = async () => {
    setIsDataLoading(true);
    try {
      const [sessionsData, speakersData, productsData, inventoryData] = await Promise.all([
        api.get(`/dashboard/business/events/${selectedEventId}/sessions`),
        api.get(`/dashboard/business/events/${selectedEventId}/speakers`),
        api.get(`/dashboard/business/events/${selectedEventId}/products`),
        api.get(`/dashboard/business/events/inventory/my-products`)
      ]);
      setSessions(sessionsData || []);
      setSpeakers(speakersData || []);
      setEventProducts(productsData || []);
      setInventory(inventoryData || []);
    } catch (error) {
      console.error("Failed to fetch event data:", error);
    } finally {
      setIsDataLoading(false);
    }
  };

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

  const handleDelete = async (type: typeof modalType, id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      if (type === "session") {
        await api.delete(`/dashboard/business/events/${selectedEventId}/sessions/${id}`);
      } else if (type === "speaker") {
        await api.delete(`/dashboard/business/events/${selectedEventId}/speakers/${id}`);
      }
      fetchEventData();
    } catch (error) {
      console.error("Failed to delete:", error);
      alert("Failed to delete item.");
    }
  };

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    setIsDataLoading(true);
    try {
      if (modalType === "session") {
        if (editingItem) {
          await api.patch(`/dashboard/business/events/${selectedEventId}/sessions/${editingItem.id}`, data);
        } else {
          await api.post(`/dashboard/business/events/${selectedEventId}/sessions`, data);
        }
      } else if (modalType === "speaker") {
        if (editingItem) {
          await api.patch(`/dashboard/business/events/${selectedEventId}/speakers/${editingItem.id}`, data);
        } else {
          await api.post(`/dashboard/business/events/${selectedEventId}/speakers`, data);
        }
      }
      setIsModalOpen(false);
      fetchEventData();
    } catch (error) {
      console.error("Failed to save:", error);
      alert("Failed to save changes.");
    } finally {
      setIsDataLoading(false);
    }
  };

  const toggleProductLink = async (productId: string) => {
    const isLinked = eventProducts.some(p => p.id === productId);
    try {
      if (isLinked) {
        await api.delete(`/dashboard/business/events/${selectedEventId}/products/${productId}`);
      } else {
        await api.post(`/dashboard/business/events/${selectedEventId}/products`, { productIds: [productId] });
      }
      fetchEventData();
    } catch (error) {
      console.error("Failed to toggle product link:", error);
    }
  };

  const selectedEvent = events.find(e => e.id === selectedEventId);

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 mb-2">Event Configuration</h1>
            <p className="text-slate-500">Manage detailed settings for your exhibition events.</p>
          </div>

          {/* Event Selector */}
          <div className="relative inline-block w-full max-w-md group">
            <select
              value={selectedEventId}
              onChange={(e) => setSelectedEventId(e.target.value)}
              className="w-full appearance-none bg-white border border-slate-200 px-6 py-4 rounded-2xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all cursor-pointer shadow-sm pr-12"
            >
              {isEventsLoading ? (
                <option>Loading events...</option>
              ) : events.length > 0 ? (
                events.map(event => (
                  <option key={event.id} value={event.id}>{event.title}</option>
                ))
              ) : (
                <option>No events found</option>
              )}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none group-hover:text-orange-500 transition-colors" />
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href={selectedEventId ? `/dashboard/business/events/${selectedEventId}` : "#"} className="flex-1 lg:flex-none px-6 py-3 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-all shadow-sm flex items-center justify-center gap-2 text-sm">
            <ExternalLink className="w-4 h-4" /> View Details
          </Link>
          <button
            onClick={handleSave}
            disabled={loading || !selectedEventId}
            className={`flex-1 lg:flex-none px-8 py-3 rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2 text-sm ${saveSuccess ? "bg-emerald-500 text-white" : "bg-slate-900 text-white hover:bg-orange-600 disabled:opacity-50"
              }`}
          >
            {loading ? <Clock className="w-4 h-4 animate-spin" /> : saveSuccess ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {loading ? "Saving..." : saveSuccess ? "Saved Successfully" : "Sync All Settings"}
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
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === tab.id
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
        {isDataLoading && (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px] z-10 flex items-center justify-center">
            <Loader2 className="w-10 h-10 animate-spin text-orange-600" />
          </div>
        )}

        <div className="p-6 md:p-12">
          {!selectedEventId && !isEventsLoading ? (
            <div className="py-20 text-center space-y-4">
              <Calendar className="w-16 h-16 text-slate-200 mx-auto" />
              <h3 className="text-xl font-black text-slate-900 uppercase">No Event Selected</h3>
              <p className="text-slate-500">Please select an event to configure its settings.</p>
              <Link href="/dashboard/business/events/create" className="inline-block bg-orange-600 text-white px-8 py-3 rounded-xl font-bold">Create New Event</Link>
            </div>
          ) : (
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
                      <h2 className="text-2xl font-black text-slate-900 mb-1 leading-none uppercase tracking-tight">Session Timetable</h2>
                      <p className="text-slate-500 text-sm">Organize the schedule for main stage and breakout rooms.</p>
                    </div>
                    <button
                      onClick={() => openAddModal("session")}
                      className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-orange-600 transition-all w-full sm:w-auto justify-center shadow-lg"
                    >
                      <Plus className="w-4 h-4" /> Add Session
                    </button>
                  </div>

                  <div className="grid gap-4">
                    {sessions.length > 0 ? sessions.map((session) => (
                      <div key={session.id} className="p-6 rounded-3xl border border-slate-100 bg-slate-50 hover:border-orange-200 transition-all group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-6">
                          <div className="w-20 h-20 bg-white rounded-2xl flex flex-col items-center justify-center border border-slate-200 shadow-sm font-bold text-slate-900 shrink-0">
                            <span className="text-[10px] text-slate-400 uppercase leading-none mb-1 tracking-widest">Start</span>
                            <span className="text-sm font-black">{session.time}</span>
                          </div>
                          <div>
                            <h3 className="font-bold text-lg text-slate-900 group-hover:text-orange-600 transition-colors uppercase tracking-tight">{session.title}</h3>
                            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">
                              <span className="flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-slate-100"><MapPin className="w-3 h-3 text-orange-500" /> {session.hall}</span>
                              <span className="flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-slate-100"><Mic className="w-3 h-3 text-orange-500" /> {session.speaker?.name || "No Speaker Linked"}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 w-full sm:w-auto justify-end">
                          <button onClick={() => openEditModal("session", session)} className="p-3 bg-white text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-xl border border-slate-200 transition-all shadow-sm">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDelete("session", session.id)} className="p-3 bg-white text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl border border-slate-200 transition-all shadow-sm">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )) : (
                      <div className="text-center py-20 bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
                        <Clock className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                        <p className="text-slate-400 font-black uppercase tracking-widest text-xs">No sessions scheduled yet.</p>
                        <button onClick={() => openAddModal("session")} className="text-orange-600 font-bold text-sm mt-2 hover:underline">Add your first session</button>
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
                      <h2 className="text-2xl font-black text-slate-900 mb-1 uppercase tracking-tight">Booth Layout</h2>
                      <p className="text-slate-500 text-sm">Design the virtual floor plan and assign exhibitors.</p>
                    </div>
                    <button className="hidden sm:flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-orange-600 transition-all shadow-lg">
                      <Layout className="w-4 h-4" /> Open 3D Editor
                    </button>
                  </div>

                  <div className="aspect-video bg-slate-100 rounded-[3rem] border-2 border-dashed border-slate-200 flex items-center justify-center relative overflow-hidden group cursor-pointer">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] opacity-10"></div>
                    <div className="text-center relative z-10 p-8">
                      <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 text-orange-600 shadow-xl group-hover:scale-110 transition-transform">
                        <Layout className="w-10 h-10" />
                      </div>
                      <h3 className="font-black text-slate-900 mb-2 text-2xl uppercase tracking-tighter">Interactive Map Editor</h3>
                      <p className="text-slate-500 text-sm max-w-sm mx-auto mb-8 font-medium">Drag-and-drop booths, set navigation paths, and configure interactive zones for your virtual venue.</p>
                      <button className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-orange-600 transition-all shadow-xl shadow-slate-900/20">Launch Layout Engine</button>
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
                      <h2 className="text-2xl font-black text-slate-900 mb-1 uppercase tracking-tight">Speaker Profiles</h2>
                      <p className="text-slate-500 text-sm">Manage keynote speakers and panelists for this event.</p>
                    </div>
                    <button
                      onClick={() => openAddModal("speaker")}
                      className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-orange-600 transition-all w-full sm:w-auto justify-center shadow-lg"
                    >
                      <Plus className="w-4 h-4" /> Add Speaker
                    </button>
                  </div>

                  <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {speakers.length === 0 ? (
                      <div className="col-span-full py-20 text-center bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
                        <Users className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                        <p className="text-slate-400 font-black uppercase tracking-widest text-xs">No speakers registered yet.</p>
                      </div>
                    ) : speakers.map((speaker) => (
                      <div key={speaker.id} className="p-6 rounded-[2.5rem] border border-slate-100 bg-white hover:shadow-2xl hover:border-orange-200 transition-all group relative">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-16 h-16 bg-slate-50 rounded-2xl shrink-0 overflow-hidden flex items-center justify-center text-slate-300 border border-slate-100">
                            {speaker.avatar ? (
                              <img src={speaker.avatar} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <Users className="w-8 h-8" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-900 group-hover:text-orange-600 transition-colors uppercase tracking-widest text-sm">{speaker.name}</h3>
                            <p className="text-[10px] font-black text-orange-600 uppercase tracking-[0.2em] mt-1">{speaker.role}</p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="p-3 bg-slate-50 rounded-2xl flex items-start gap-3">
                            <Tag className="w-3.5 h-3.5 text-slate-400 mt-0.5" />
                            <p className="text-xs text-slate-500 font-medium line-clamp-2">Topic: {speaker.topic || "General Discussion"}</p>
                          </div>
                        </div>

                        <div className="flex gap-2 mt-8">
                          <button onClick={() => openEditModal("speaker", speaker)} className="flex-1 py-3 bg-slate-50 text-slate-600 font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-orange-50 hover:text-orange-600 transition-all">Edit Profile</button>
                          <button onClick={() => handleDelete("speaker", speaker.id)} className="p-3 bg-slate-50 text-slate-300 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all border border-slate-100"><Trash2 className="w-4 h-4" /></button>
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
                  className="space-y-10"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h2 className="text-2xl font-black text-slate-900 mb-1 uppercase tracking-tight">Product Catalogs</h2>
                      <p className="text-slate-500 text-sm">Link inventory products to this event for direct sales & distribution.</p>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-10">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-black uppercase text-slate-400 tracking-widest">Linked to Event</h3>
                        <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-[10px] font-black uppercase">{eventProducts.length} Products</span>
                      </div>
                      {eventProducts.length === 0 ? (
                        <div className="p-12 text-center bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
                          <ShoppingBag className="w-10 h-10 text-slate-200 mx-auto mb-4" />
                          <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">No products linked yet</p>
                        </div>
                      ) : (
                        <div className="grid gap-3">
                          {eventProducts.map(product => (
                            <div key={product.id} className="p-4 bg-white border border-slate-100 rounded-2xl flex items-center justify-between group hover:shadow-md transition-all shadow-sm">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center shrink-0 border border-slate-50">
                                  {product.image ? <img src={product.image} className="w-full h-full object-cover rounded-lg" /> : <ShoppingBag className="w-5 h-5 text-slate-300" />}
                                </div>
                                <div>
                                  <p className="font-bold text-slate-900 text-sm uppercase tracking-tight">{product.name}</p>
                                  <p className="text-orange-600 font-bold text-[10px]">₦{product.price?.toLocaleString()}</p>
                                </div>
                              </div>
                              <button onClick={() => toggleProductLink(product.id)} className="p-2 text-slate-300 hover:text-red-600 transition-colors">
                                <X className="w-5 h-5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-black uppercase text-slate-400 tracking-widest">Available Inventory</h3>
                        <Link href="/dashboard/business/products" className="text-orange-600 font-bold text-[10px] uppercase hover:underline">Manage All</Link>
                      </div>
                      <div className="max-h-[500px] overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                        {inventory.map(product => {
                          const isLinked = eventProducts.some(p => p.id === product.id);
                          return (
                            <div key={product.id} className={`p-4 rounded-2xl flex items-center justify-between transition-all ${isLinked ? 'bg-orange-50 border border-orange-100' : 'bg-white border border-slate-100 hover:border-orange-200 shadow-sm'}`}>
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-sm border border-slate-50">
                                  {product.image ? <img src={product.image} className="w-full h-full object-cover rounded-lg" /> : <ShoppingBag className="w-5 h-5 text-slate-200" />}
                                </div>
                                <div>
                                  <p className="font-bold text-slate-900 text-sm uppercase tracking-tight">{product.name}</p>
                                  <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">{product.category}</p>
                                </div>
                              </div>
                              <button
                                disabled={isLinked}
                                onClick={() => toggleProductLink(product.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isLinked ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-white hover:bg-orange-600 shadow-lg'}`}
                              >
                                {isLinked ? <><CheckCircle2 className="w-3 h-3" /> Linked</> : <><Plus className="w-3 h-3" /> Link</>}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* OTHER TABS */}
              {(activeTab === "redemption") && (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-32 text-center"
                >
                  <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mb-6 shadow-inner">
                    <Tag className="w-10 h-10 text-slate-300" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tight">Settlement Engine Integration</h3>
                  <p className="text-slate-500 max-w-sm mx-auto font-medium">The <span className="font-bold text-orange-600 uppercase">{activeTab}</span> configuration module is currently being optimized for your account.</p>
                </motion.div>
              )}

            </AnimatePresence>
          )}
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
                <select name="speakerId" defaultValue={editingItem?.speakerId} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none font-medium">
                  <option value="">Select Speaker</option>
                  {speakers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
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
