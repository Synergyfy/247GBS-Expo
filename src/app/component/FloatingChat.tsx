"use client";

import { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Minus, Maximize2 } from "lucide-react";
import { motion, AnimatePresence, useAnimation, useMotionValue } from "framer-motion";

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { role: "other", text: "Hello! How can I help you today?", time: "10:00 AM" },
    { role: "user", text: "I have a question about upcoming expos and tickets.", time: "10:05 AM" },
    { role: "other", text: "Sure! You can explore all seasonal exhibitions or grab a Season Pass. What would you like to know?", time: "10:06 AM" },
  ]);
  const [showHint, setShowHint] = useState(true);

  // Drag & Snap to Edge
  const controls = useAnimation();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const buttonRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const dragDistRef = useRef(0);
  const [isDockedLeft, setIsDockedLeft] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = { 
      role: "user", 
      text: message, 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    };
    setChatHistory([...chatHistory, newMessage]);
    setMessage("");

    setTimeout(() => {
      setChatHistory(prev => [...prev, { 
        role: "other", 
        text: "Thanks for reaching out! A 247GBS support specialist will be with you shortly.", 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      }]);
    }, 1000);
  };

  useEffect(() => {
    // Show hint bubble briefly on desktop only
    setShowHint(true);
    const t = setTimeout(() => setShowHint(false), 5000);
    return () => clearTimeout(t);
  }, []);

  const handleDragStart = () => {
    isDraggingRef.current = true;
    dragDistRef.current = 0;
    setShowHint(false);
  };

  const handleDrag = (_: any, info: any) => {
    dragDistRef.current += Math.hypot(info.delta.x, info.delta.y);
  };

  const handleDragEnd = (_: any, info: any) => {
    const winWidth = typeof window !== "undefined" ? window.innerWidth : 375;
    const winHeight = typeof window !== "undefined" ? window.innerHeight : 812;
    const isMobile = winWidth < 640;
    const margin = isMobile ? 12 : 32;
    const buttonWidth = buttonRef.current?.offsetWidth || (isMobile ? 48 : 90);

    // info.point.x is the absolute screen pointer position at release
    const releaseX = info.point.x;
    const shouldSnapLeft = releaseX < winWidth / 2;

    // Calculate snap target X relative to resting right-side position (x = 0)
    const targetX = shouldSnapLeft ? -(winWidth - buttonWidth - margin * 2) : 0;
    setIsDockedLeft(shouldSnapLeft);

    // Clamp vertical offset so it never leaves the screen
    // Default resting bottom position is bottom-20 (80px) on mobile, bottom-8 (32px) on desktop
    const currentY = y.get();
    const bottomNavHeight = isMobile ? 70 : 20;
    const topNavbarHeight = 75;
    const maxUpward = -(winHeight - topNavbarHeight - 100);
    const maxDownward = bottomNavHeight - 80; // keep above bottom nav
    const targetY = Math.min(Math.max(currentY, maxUpward), 10);

    controls.start({
      x: targetX,
      y: targetY,
      transition: {
        type: "spring",
        stiffness: 420,
        damping: 28,
        mass: 0.8,
      },
    });

    setTimeout(() => {
      isDraggingRef.current = false;
    }, 80);
  };

  const handleButtonClick = () => {
    // If dragged more than 6px, ignore click (it was a drag gesture)
    if (dragDistRef.current > 6) return;

    if (isOpen && isMinimized) {
      setIsMinimized(false);
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <>
      {/* Chat Window Dialog (Independent of button drag position to ensure perfect viewing) */}
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 sm:bottom-24 left-3 right-3 sm:left-auto sm:right-8 z-50 max-w-sm sm:w-96 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col h-[460px] sm:h-[500px]"
          >
            {/* Header */}
            <div className="bg-slate-900 p-3.5 sm:p-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-orange-600 flex items-center justify-center font-bold shadow-md shadow-orange-600/30">
                  <MessageSquare className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-extrabold text-xs sm:text-sm uppercase tracking-tight">Support Chat</p>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Agent Online</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setIsMinimized(true)} 
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-slate-300"
                  aria-label="Minimize Chat"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-slate-400 hover:text-white"
                  aria-label="Close Chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-3 bg-slate-50 custom-scrollbar">
              {chatHistory.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-orange-600 text-white rounded-tr-none shadow-xs' 
                      : 'bg-white text-slate-800 rounded-tl-none border border-slate-100 shadow-xs'
                  }`}>
                    <p>{msg.text}</p>
                    <p className={`text-[9px] mt-1 font-bold uppercase tracking-wider ${msg.role === 'user' ? 'text-orange-200' : 'text-slate-400'}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-100 flex gap-2">
              <input 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your question..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-orange-500 transition-all"
              />
              <button 
                type="submit"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center hover:bg-orange-600 transition-all shadow-md active:scale-95 shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Draggable Floating Button with Snap-to-Edge */}
      <motion.div
        ref={buttonRef}
        drag
        dragConstraints={{ left: -320, right: 0, top: -600, bottom: 0 }}
        dragMomentum={false}
        dragElastic={0.05}
        animate={controls}
        style={{ x, y }}
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        className="fixed bottom-20 sm:bottom-8 right-3 sm:right-8 z-40 touch-none select-none cursor-grab active:cursor-grabbing flex items-center gap-2"
      >
        {/* Desktop-only hint bubble */}
        {!isOpen && showHint && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="hidden sm:block mr-2 bg-white text-slate-900 rounded-xl shadow-lg border border-slate-100 px-3.5 py-2 text-xs font-semibold whitespace-nowrap pointer-events-none"
          >
            Questions about 247 Expo? I&apos;m here to help!
          </motion.div>
        )}

        {/* Minimized Bar Pill (When Minimized) */}
        {isMinimized && isOpen && (
          <button
            onClick={() => setIsMinimized(false)}
            className="bg-slate-900 text-white px-3.5 py-2 rounded-full font-bold shadow-xl flex items-center gap-2 hover:bg-orange-600 transition-all active:scale-95 text-xs mr-1"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="hidden sm:inline uppercase tracking-wider text-[10px]">Active Chat</span>
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        )}

        {/* Floating Action Button:
            - Mobile: Perfect 48px circle, ONLY the icon, draggable with snap-to-edge
            - Desktop: Pill with icon + "Chat" label
        */}
        <button 
          onClick={handleButtonClick}
          className={`relative rounded-full shadow-2xl transition-colors duration-300 active:scale-95 flex items-center justify-center ${
            isOpen && !isMinimized 
              ? 'w-12 h-12 bg-slate-900 text-white hover:bg-slate-800' 
              : 'w-12 h-12 sm:w-auto sm:h-12 sm:px-4 bg-red-600 text-white hover:bg-red-700'
          }`}
          aria-label={isOpen ? "Close Support Chat" : "Open Support Chat"}
        >
          {isOpen && !isMinimized ? (
            <X className="w-5 h-5 text-white" />
          ) : (
            <div className="relative flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-white shrink-0" />
              
              {/* "Chat" Text: Hidden on mobile (icon-only), visible on desktop */}
              <span className="hidden sm:inline text-xs sm:text-sm font-extrabold tracking-wide">
                Chat
              </span>

              {/* Unread Indicator Dot: Cleanly positioned */}
              <span className="absolute -top-1.5 -right-1.5 sm:-top-1 sm:-right-2 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-60"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-400 border-2 border-white shadow-xs"></span>
              </span>
            </div>
          )}
        </button>
      </motion.div>
    </>
  );
}
