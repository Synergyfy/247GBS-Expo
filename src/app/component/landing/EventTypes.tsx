"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Globe, Lightbulb, Store, ArrowRight } from "lucide-react";

const EVENT_TYPES = [
  {
    title: "National Digital Expo",
    description: "Our platform-wide flagship seasonal event connecting the best of UK commerce in one virtual space.",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop",
    icon: Globe,
    tag: "SEASONAL FLAGSHIP",
    color: "from-orange-600/95 to-orange-900/95",
    href: "/events/national"
  },
  {
    title: "Workshops & Demos",
    description: "Platform-led educational sessions, live product demonstrations, and free/premium tech masterclasses.",
    image: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?q=80&w=800&auto=format&fit=crop",
    icon: Lightbulb,
    tag: "PLATFORM-LED",
    color: "from-blue-600/95 to-blue-900/95",
    href: "/events/platform-led"
  },
  {
    title: "Exhibitor Events",
    description: "Merchant-owned brand showcases, product launches, and live interactive selling sessions.",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=800&auto=format&fit=crop",
    icon: Store,
    tag: "BUSINESS-LED",
    color: "from-slate-800/95 to-slate-950/95",
    href: "/events/business-led"
  }
];

export default function EventTypes() {
  return (
    <section className="py-8 sm:py-16 md:py-20 bg-white relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-6 md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 bg-orange-50 border border-orange-100 rounded-full text-orange-600 font-bold tracking-wide uppercase text-[10px] mb-2"
          >
            Event Ecosystem
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-xl sm:text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight"
          >
            Three Ways to Experience <span className="text-orange-600">247GBS</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-1 md:mt-2 text-slate-600 text-xs sm:text-base max-w-xl mx-auto"
          >
            From national flagships to brand showcases, discover the event format for you.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-6 md:gap-8">
          {EVENT_TYPES.map((event, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover="hover"
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 + 0.15 }}
              className="relative h-[200px] sm:h-[260px] md:h-[500px] rounded-2xl md:rounded-[36px] overflow-hidden group shadow-lg border border-slate-100"
            >
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Mobile Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/30 p-4 sm:p-6 md:p-8 flex flex-col justify-end transition-opacity duration-300 md:group-hover:opacity-0">
                <div className="flex items-center gap-2 mb-1.5">
                   <div className="w-7 h-7 rounded-lg bg-orange-600/30 backdrop-blur-md flex items-center justify-center text-orange-400 border border-orange-500/30 shrink-0">
                     <event.icon className="w-3.5 h-3.5" />
                   </div>
                   <span className="text-[9px] font-black text-orange-400 tracking-[0.2em] uppercase">{event.tag}</span>
                </div>
                <h4 className="text-base sm:text-xl font-bold text-white tracking-tight mb-1">{event.title}</h4>
                <p className="text-xs text-slate-300 line-clamp-2 md:hidden mb-2 leading-relaxed">
                  {event.description}
                </p>
                <Link 
                  href={event.href}
                  className="inline-flex md:hidden items-center gap-1.5 text-xs font-bold text-orange-400 hover:text-white transition-colors"
                >
                  <span>Explore Events</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {/* Desktop Slide-up Hover Details */}
              <motion.div 
                variants={{
                  hover: { y: 0 }
                }}
                initial={{ y: "100%" }}
                transition={{ type: "tween", ease: [0.22, 1, 0.36, 1], duration: 0.4 }}
                className={`hidden md:flex absolute inset-0 bg-gradient-to-b ${event.color} backdrop-blur-md p-8 lg:p-10 flex-col justify-center text-left z-20`}
              >
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white mb-6 border border-white/20">
                   <event.icon className="w-7 h-7" />
                </div>
                <span className="text-[10px] font-black text-white/70 tracking-[0.3em] uppercase mb-2">{event.tag}</span>
                <h4 className="text-2xl lg:text-3xl font-bold text-white mb-4 leading-tight">{event.title}</h4>
                <div className="w-12 h-0.5 bg-white/40 rounded-full mb-4" />
                <p className="text-white/90 text-sm lg:text-base leading-relaxed font-normal">
                  {event.description}
                </p>
                <Link href={event.href} className="mt-8 flex items-center gap-2 text-white font-bold group/btn">
                  <span className="border-b-2 border-white/50 group-hover/btn:border-white transition-colors text-sm">Explore Category</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
