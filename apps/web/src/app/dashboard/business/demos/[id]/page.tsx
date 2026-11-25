"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Users,
  Send,
  Share2,
  X,
  MessageSquare,
  Check,
  Radio
} from "lucide-react";
import {
  LiveChatMessage,
  getStoredLiveChat,
  postLiveChatMessage
} from "@/data/eventLiveChat";

const DEMO_META: Record<
  string,
  { title: string; hall: string; viewers: number }
> = {
  "DEMO-101": {
    title: "Product Launch: Gen 4 Smart Hub & AI Core",
    hall: "Virtual Main Hall A",
    viewers: 142
  },
  "DEMO-102": {
    title: "Live Q&A: Enterprise Cloud Architecture",
    hall: "Breakout Stage B",
    viewers: 88
  }
};

export default function LiveBroadcastStudioPage() {
  const params = useParams();
  const router = useRouter();
  const id = (params?.id as string) || "DEMO-101";
  const meta = DEMO_META[id] || {
    title: "Live Exhibitor Showcase Stream",
    hall: "Virtual Main Hall A",
    viewers: 124
  };

  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [copiedShare, setCopiedShare] = useState(false);

  const [liveChat, setLiveChat] = useState<LiveChatMessage[]>([]);
  const [hostMessage, setHostMessage] = useState("");
  const desktopInputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const refresh = () => setLiveChat(getStoredLiveChat());
    refresh();
    window.addEventListener("expo_live_chat_changed", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("expo_live_chat_changed", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hostMessage.trim()) return;
    const next = postLiveChatMessage({
      user: "FutureTech Host",
      role: "business",
      message: hostMessage
    });
    setLiveChat(next);
    setHostMessage("");
  };

  const handleMention = (userName: string, isMobile: boolean) => {
    setHostMessage((prev) => `@${userName} ${prev.replace(/^@[^ ]+\s*/, "")}`);
    (isMobile ? mobileInputRef : desktopInputRef).current?.focus();
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href).catch(() => {});
    }
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  return (
    <>
      {/* ================================================================= */}
      {/* MOBILE FULL-SCREEN TIKTOK / INSTAGRAM LIVE IMMERSIVE VIEW (< lg)  */}
      {/* ================================================================= */}
      <div className="lg:hidden fixed inset-0 z-50 bg-slate-950 text-white flex flex-col overflow-hidden">
        {/* Background Live Stream Canvas */}
        <div className="absolute inset-0">
          {camOn ? (
            <iframe
              src="https://www.youtube-nocookie.com/embed/aqz-KE-bpKQ?autoplay=1&mute=1&controls=0&loop=1&playlist=aqz-KE-bpKQ&modestbranding=1&rel=0"
              title={meta.title}
              className="w-full h-full object-cover scale-[1.85] pointer-events-none opacity-90"
              allow="autoplay; encrypted-media"
            />
          ) : (
            <div className="w-full h-full bg-slate-900 flex flex-col items-center justify-center gap-2 text-slate-400">
              <VideoOff className="w-10 h-10" />
              <p className="text-xs font-bold uppercase tracking-wider">Camera Paused</p>
            </div>
          )}
          {/* Top & Bottom Contrast Scrims */}
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/80 via-black/35 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black/95 via-black/55 to-transparent pointer-events-none" />
        </div>

        {/* Top Live Header Overlay */}
        <div className="relative z-10 px-3.5 pt-4 pb-2 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0 bg-black/45 backdrop-blur-md border border-white/15 rounded-full pl-1.5 pr-3 py-1">
            <div className="w-8 h-8 rounded-full bg-orange-600 text-white font-black text-xs flex items-center justify-center shrink-0">
              FT
            </div>
            <div className="min-w-0">
              <p className="text-xs font-extrabold text-white truncate leading-tight">
                FutureTech Host
              </p>
              <p className="text-[10px] text-slate-300 truncate leading-tight">{meta.hall}</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-600 text-white text-[10px] font-black uppercase tracking-wider shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              LIVE
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-[11px] font-bold">
              <Users className="w-3 h-3 text-orange-400" />
              {meta.viewers}
            </span>
            <button
              type="button"
              onClick={() => router.push("/dashboard/business/demos")}
              aria-label="End broadcast"
              className="w-8 h-8 rounded-full bg-black/55 backdrop-blur-md border border-white/15 flex items-center justify-center text-white hover:bg-red-600 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Floating Chat + Right Vertical Control Rail */}
        <div className="relative z-10 flex-1 flex items-end justify-between px-3.5 pb-3 gap-3 min-h-0">
          {/* Bottom-Left Translucent Scrolling Live Chat */}
          <div className="flex-1 min-w-0 flex flex-col justify-end max-h-[38vh]">
            <div className="overflow-y-auto no-scrollbar space-y-1.5 pr-1">
              {liveChat.map((msg) => (
                <button
                  key={msg.id}
                  type="button"
                  onClick={() => handleMention(msg.user, true)}
                  className="block text-left bg-black/45 backdrop-blur-xs rounded-2xl px-3 py-1.5 max-w-full border border-white/10"
                >
                  <span className="text-[11px] font-extrabold text-orange-400 mr-1.5">
                    {msg.user}
                    {msg.role === "business" && (
                      <span className="ml-1 px-1 py-0.5 rounded bg-orange-600 text-white text-[8px] uppercase">
                        Host
                      </span>
                    )}
                  </span>
                  <span className="text-[11px] text-white/95 leading-snug break-words">
                    {msg.message}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Vertical Studio Action Buttons */}
          <div className="flex flex-col items-center gap-3 shrink-0 pb-1">
            <button
              type="button"
              onClick={() => setMicOn((v) => !v)}
              className={`w-11 h-11 rounded-full backdrop-blur-md border flex items-center justify-center transition-colors cursor-pointer ${
                micOn
                  ? "bg-black/50 border-white/20 text-white"
                  : "bg-red-600 border-red-500 text-white"
              }`}
              aria-label="Toggle microphone"
            >
              {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
            </button>

            <button
              type="button"
              onClick={() => setCamOn((v) => !v)}
              className={`w-11 h-11 rounded-full backdrop-blur-md border flex items-center justify-center transition-colors cursor-pointer ${
                camOn
                  ? "bg-black/50 border-white/20 text-white"
                  : "bg-red-600 border-red-500 text-white"
              }`}
              aria-label="Toggle camera"
            >
              {camOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="w-11 h-11 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white flex items-center justify-center cursor-pointer"
              aria-label="Share stream"
            >
              {copiedShare ? (
                <Check className="w-5 h-5 text-emerald-400" />
              ) : (
                <Share2 className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Bottom Translucent Chat Input Bar */}
        <form
          onSubmit={handleSendReply}
          className="relative z-10 px-3.5 pb-4 pt-1 flex items-center gap-2"
        >
          <input
            ref={mobileInputRef}
            type="text"
            value={hostMessage}
            onChange={(e) => setHostMessage(e.target.value)}
            placeholder="Reply to live viewers..."
            className="flex-1 min-w-0 px-4 py-2.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white placeholder:text-white/60 text-xs focus:outline-none focus:border-orange-400"
          />
          <button
            type="submit"
            className="w-10 h-10 rounded-full bg-orange-600 hover:bg-orange-700 text-white flex items-center justify-center shrink-0 shadow-md cursor-pointer"
            aria-label="Send reply"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* ================================================================= */}
      {/* DESKTOP FULL-PAGE BROADCAST STUDIO LAYOUT (lg+)                   */}
      {/* ================================================================= */}
      <div className="hidden lg:flex flex-col h-[calc(100vh-7.5rem)] max-w-7xl mx-auto gap-4">
        {/* Top Studio Bar */}
        <div className="flex items-center justify-between gap-4 bg-white px-5 py-3 rounded-2xl border border-slate-200/80 shadow-2xs shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <Link
              href="/dashboard/business/demos"
              className="w-8 h-8 rounded-xl border border-slate-200 hover:bg-slate-50 flex items-center justify-center text-slate-600 shrink-0"
              title="Back to Live Studio"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-black uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  LIVE
                </span>
                <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-orange-600" /> {meta.viewers} watching
                </span>
                <span className="text-xs text-slate-400">• {meta.hall}</span>
              </div>
              <h1 className="text-sm font-extrabold text-slate-900 truncate mt-0.5">
                {meta.title}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setMicOn((v) => !v)}
              className={`px-3 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 border transition-colors cursor-pointer ${
                micOn
                  ? "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                  : "bg-red-50 border-red-200 text-red-600"
              }`}
            >
              {micOn ? <Mic className="w-3.5 h-3.5" /> : <MicOff className="w-3.5 h-3.5" />}
              <span>{micOn ? "Mic On" : "Muted"}</span>
            </button>

            <button
              type="button"
              onClick={() => setCamOn((v) => !v)}
              className={`px-3 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 border transition-colors cursor-pointer ${
                camOn
                  ? "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                  : "bg-red-50 border-red-200 text-red-600"
              }`}
            >
              {camOn ? <Video className="w-3.5 h-3.5" /> : <VideoOff className="w-3.5 h-3.5" />}
              <span>{camOn ? "Camera On" : "Camera Off"}</span>
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
            >
              {copiedShare ? (
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <Share2 className="w-3.5 h-3.5" />
              )}
              <span>{copiedShare ? "Link Copied" : "Share"}</span>
            </button>

            <button
              type="button"
              onClick={() => router.push("/dashboard/business/demos")}
              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Radio className="w-3.5 h-3.5" />
              <span>End Broadcast</span>
            </button>
          </div>
        </div>

        {/* Main 2-Column Studio Body */}
        <div className="flex-1 min-h-0 grid grid-cols-12 gap-4">
          {/* Left 8 Cols — Full-Height Video Stage */}
          <div className="col-span-8 rounded-2xl bg-slate-950 overflow-hidden relative border border-slate-800 shadow-lg">
            {camOn ? (
              <iframe
                src="https://www.youtube-nocookie.com/embed/aqz-KE-bpKQ?autoplay=1&mute=1&rel=0&modestbranding=1"
                title={meta.title}
                className="w-full h-full border-0"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-slate-400">
                <VideoOff className="w-12 h-12" />
                <p className="text-sm font-bold uppercase tracking-wider">Camera Feed Paused</p>
              </div>
            )}
          </div>

          {/* Right 4 Cols — Full-Height Synced Live Event Chat */}
          <div className="col-span-4 bg-white rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col min-h-0 overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between shrink-0">
              <span className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5 uppercase tracking-wider">
                <MessageSquare className="w-4 h-4 text-orange-600" />
                <span>Live Event Chat ({liveChat.length})</span>
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Sync
              </span>
            </div>

            <div className="flex-1 overflow-y-auto p-3.5 space-y-2.5 custom-scrollbar">
              {liveChat.map((msg) => (
                <div
                  key={msg.id}
                  className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1"
                >
                  <div className="flex items-center justify-between gap-2 text-[10px]">
                    <button
                      type="button"
                      onClick={() => handleMention(msg.user, false)}
                      className="font-bold text-slate-900 hover:text-orange-600 inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>{msg.user}</span>
                      {msg.role === "business" && (
                        <span className="px-1.5 py-0.5 rounded bg-orange-100 text-orange-700 text-[9px] font-black uppercase">
                          Host
                        </span>
                      )}
                    </button>
                    <span className="text-slate-400">{msg.time}</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">{msg.message}</p>
                </div>
              ))}
            </div>

            <form
              onSubmit={handleSendReply}
              className="p-3 bg-white border-t border-slate-100 flex items-center gap-2 shrink-0"
            >
              <input
                ref={desktopInputRef}
                type="text"
                value={hostMessage}
                onChange={(e) => setHostMessage(e.target.value)}
                placeholder="Reply to attendees as Host..."
                className="flex-1 min-w-0 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-orange-500"
              />
              <button
                type="submit"
                className="w-9 h-9 rounded-xl bg-orange-600 hover:bg-orange-700 text-white flex items-center justify-center shrink-0 transition-colors cursor-pointer"
                aria-label="Send host reply"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
