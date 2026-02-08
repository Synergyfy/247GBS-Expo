"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Globe, Lightbulb, Store, ArrowRight } from "lucide-react";

const EVENT_TYPES = [
  {
    title: "National Digital Expo",
    description: "Our platform-wide flagship seasonal event. A digital-first, national experience with rotating host cities and central marketing focus. Managed by the platform to connect the best of UK commerce in one virtual space.",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop",
    icon: Globe,
    tag: "SEASONAL FLAGSHIP",
    color: "from-orange-600/90 to-orange-900/90",
    href: "/events/national"
  },
  {
    title: "Workshops & Demos",
    description: "Platform-led educational sessions and live product demonstrations. Integrated into the main expo, these scheduled sessions offer training-focused free or premium access to masterclasses and live tech showcases.",
    image: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?q=80&w=800&auto=format&fit=crop",
    icon: Lightbulb,
    tag: "PLATFORM-LED",
    color: "from-blue-600/90 to-blue-900/90",
    href: "/events/platform-led"
  },
  {
    title: "Exhibitor Events",
    description: "Merchant-owned brand showcases, product launches, and live selling sessions. Individual businesses create and manage their own unique experiences with custom pricing and brand-specific engagement models.",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=800&auto=format&fit=crop",
    icon: Store,
    tag: "BUSINESS-LED",
    color: "from-slate-800/90 to-slate-950/90",
    href: "/events/business-led"
  }
];

export default function EventTypes() {
  return (
    <section className="py-24 bg-white relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 bg-orange-50 border border-orange-100 rounded-full text-orange-600 font-bold tracking-wide uppercase text-xs mb-4"
          >
            Event Ecosystem
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight"
          >
            Three Ways to Experience <span className="text-orange-600">247GBS</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-slate-500 text-lg max-w-2xl mx-auto"
          >
            From national flagships to brand-specific showcases, discover the event format that fits your business or shopping journey.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {EVENT_TYPES.map((event, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover="hover"
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 + 0.3 }}
              className="relative h-[550px] rounded-[40px] overflow-hidden group cursor-pointer shadow-2xl border border-slate-100"
            >
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              
              {/* Static Title/Icon Overlay (Always visible at bottom when not hovered) */}
              <div className="absolute inset-x-0 bottom-0 p-10 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent pt-32 transition-opacity duration-500 group-hover:opacity-0">
                <div className="flex items-center gap-3 mb-3">
                   <div className="w-10 h-10 rounded-xl bg-orange-600/20 backdrop-blur-md flex items-center justify-center text-orange-500 border border-orange-500/30">
                     <event.icon className="w-5 h-5" />
                   </div>
                   <span className="text-[10px] font-black text-orange-500 tracking-[0.2em] uppercase">{event.tag}</span>
                </div>
                <h4 className="text-2xl font-bold text-white tracking-tight">{event.title}</h4>
              </div>

              {/* Slide-up Hover Content */}
              <motion.div 
                variants={{
                  hover: { y: 0 }
                }}
                initial={{ y: "100%" }}
                transition={{ type: "tween", ease: [0.22, 1, 0.36, 1], duration: 0.6 }}
                className={`absolute inset-0 bg-gradient-to-b ${event.color} backdrop-blur-md p-10 flex flex-col justify-center text-left z-20`}
              >
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-white mb-8 border border-white/20">
                   <event.icon className="w-8 h-8" />
                </div>
                <span className="text-[10px] font-black text-white/60 tracking-[0.3em] uppercase mb-4">{event.tag}</span>
                <h4 className="text-3xl font-bold text-white mb-6 leading-tight">{event.title}</h4>
                <div className="w-16 h-1 bg-white/30 rounded-full mb-8" />
                <p className="text-white/90 text-lg leading-relaxed font-medium">
                  {event.description}
                </p>
                <Link href={event.href} className="mt-10 flex items-center gap-3 text-white font-bold group/btn">
                  <span className="border-b-2 border-white/50 group-hover/btn:border-white transition-colors">Explore Category</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-2" />
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
