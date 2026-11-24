"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  CheckCheck,
  Trash2,
  ArrowRight,
  CheckCircle2,
  X
} from "lucide-react";
import {
  ChsNotification,
  NotificationRole,
  getStoredNotifications,
  saveStoredNotifications,
  INITIAL_NOTIFICATIONS
} from "@/data/notifications";

interface NotificationsViewProps {
  role: NotificationRole;
}

export default function NotificationsView({ role }: NotificationsViewProps) {
  const router = useRouter();
  const [notifications, setNotifications] = useState<ChsNotification[]>(INITIAL_NOTIFICATIONS[role]);
  const [filter, setFilter] = useState<"all" | "unread" | "event" | "payment" | "system" | "reward">("all");
  const [showClearModal, setShowClearModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<ChsNotification | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    setNotifications(getStoredNotifications(role));
  }, [role]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const updateAndSync = (next: ChsNotification[]) => {
    setNotifications(next);
    saveStoredNotifications(role, next);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filtered = notifications.filter((item) => {
    if (filter === "unread") return !item.read;
    if (filter === "all") return true;
    return item.category === filter;
  });

  const handleMarkAllRead = () => {
    updateAndSync(notifications.map((n) => ({ ...n, read: true })));
    showToast("All notifications marked as read.");
  };

  const handleConfirmClearAll = () => {
    updateAndSync([]);
    setShowClearModal(false);
    showToast("All notifications cleared.");
  };

  const handleOpenItem = (item: ChsNotification) => {
    if (!item.read) {
      updateAndSync(notifications.map((n) => (n.id === item.id ? { ...n, read: true } : n)));
    }
    router.push(item.href);
  };

  const handleToggleRead = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    updateAndSync(notifications.map((n) => (n.id === id ? { ...n, read: !n.read } : n)));
  };

  const handleDeleteOne = (e: React.MouseEvent, item: ChsNotification) => {
    e.stopPropagation();
    setDeleteTarget(item);
  };

  const handleConfirmDeleteOne = () => {
    if (!deleteTarget) return;
    updateAndSync(notifications.filter((n) => n.id !== deleteTarget.id));
    setDeleteTarget(null);
    showToast("Notification deleted.");
  };

  const categoryColor = (cat: ChsNotification["category"]) => {
    switch (cat) {
      case "event":
        return "text-orange-600";
      case "payment":
        return "text-emerald-600";
      case "reward":
        return "text-purple-600";
      default:
        return "text-blue-600";
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-4 sm:space-y-5 pb-24 lg:pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <h1 className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900 tracking-tight uppercase">
            Notifications
          </h1>
          <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
            {unreadCount > 0
              ? `${unreadCount} unread alert${unreadCount === 1 ? "" : "s"} synced with your Central Hub account.`
              : "All caught up with your Central Hub & Expo alerts."}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={handleMarkAllRead}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:border-orange-500 hover:text-orange-600 transition-colors cursor-pointer shadow-2xs"
            >
              <CheckCheck className="w-3.5 h-3.5 text-orange-600" />
              <span>Mark All Read</span>
            </button>
          )}
          {notifications.length > 0 && (
            <button
              type="button"
              onClick={() => setShowClearModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 hover:border-red-200 transition-colors cursor-pointer shadow-2xs"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
          )}
        </div>
      </div>

      {/* Peeping Horizontal Filter Strip */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 pb-0.5">
        {[
          { id: "all", label: `All (${notifications.length})` },
          { id: "unread", label: `Unread (${unreadCount})` },
          { id: "event", label: "Events" },
          { id: "payment", label: "Payments" },
          { id: "reward", label: "Rewards" },
          { id: "system", label: "System" }
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setFilter(tab.id as any)}
            className={`px-3.5 py-1.5 rounded-xl text-[11px] font-bold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
              filter === tab.id
                ? "bg-orange-600 text-white shadow-xs"
                : "bg-white border border-slate-200/80 text-slate-600 hover:bg-slate-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden divide-y divide-slate-100">
        {filtered.length === 0 ? (
          <div className="p-10 sm:p-14 text-center space-y-2">
            <div className="w-11 h-11 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center mx-auto">
              <Bell className="w-5 h-5" />
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900">No notifications</h3>
            <p className="text-[11px] text-slate-500 max-w-xs mx-auto">
              {filter === "all"
                ? "You have no notifications right now."
                : `No notifications match the "${filter}" filter.`}
            </p>
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => handleOpenItem(item)}
              className={`p-3.5 sm:p-4 hover:bg-slate-50/70 transition-colors cursor-pointer space-y-1.5 ${
                !item.read ? "bg-orange-50/25" : ""
              }`}
            >
              {/* Line 1: Category • Time + Read Status */}
              <div className="flex items-center justify-between gap-2 text-[10px] font-bold uppercase tracking-wider">
                <div className="flex items-center gap-1.5">
                  {!item.read && <span className="w-2 h-2 rounded-full bg-orange-600 shrink-0" />}
                  <span className={categoryColor(item.category)}>{item.category}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-400">{item.createdAt}</span>
                </div>
                <span className={item.read ? "text-slate-400" : "text-orange-600 font-extrabold"}>
                  {item.read ? "Read" : "New"}
                </span>
              </div>

              {/* Line 2: Title & Message */}
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                  {item.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-relaxed">
                  {item.message}
                </p>
              </div>

              {/* Line 3: Actions */}
              <div className="flex items-center justify-between gap-2 pt-1.5">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-orange-600">
                  <span>View Details</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => handleToggleRead(e, item.id)}
                    className="text-[11px] font-bold text-slate-500 hover:text-slate-900 px-2 py-1 rounded-lg hover:bg-slate-100 cursor-pointer"
                  >
                    {item.read ? "Mark Unread" : "Mark Read"}
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleDeleteOne(e, item)}
                    className="text-slate-400 hover:text-red-600 p-1 rounded-lg hover:bg-red-50 cursor-pointer"
                    aria-label="Delete notification"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Toast */}
      {toastMsg && (
        <div className="fixed top-6 right-4 sm:right-8 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-lg text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Clear All Confirmation Modal */}
      {showClearModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm border border-slate-200 shadow-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-slate-900">Clear All Notifications</h3>
              <button
                type="button"
                onClick={() => setShowClearModal(false)}
                className="w-7 h-7 rounded-lg text-slate-400 hover:bg-slate-100 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to clear all notifications from your inbox?
            </p>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowClearModal(false)}
                className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmClearAll}
                className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 cursor-pointer"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Single Notification Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm border border-slate-200 shadow-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-slate-900">Delete Notification</h3>
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="w-7 h-7 rounded-lg text-slate-400 hover:bg-slate-100 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to delete <strong className="text-slate-900">&quot;{deleteTarget.title}&quot;</strong>?
            </p>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDeleteOne}
                className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
