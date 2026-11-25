import { CalendarDays, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

const events = [
  {
    id: "spring2026",
    season: "Spring 2026",
    title: "Global Innovation Fair",
    dates: "April 10 - 19, 2026",
    status: "Upcoming",
    color: "text-green-700",
    bg: "bg-green-100",
    border: "border-green-200"
  },
  {
    id: "summer2026",
    season: "Summer 2026",
    title: "Summer Trade Carnival",
    dates: "July 15 - 24, 2026",
    status: "Scheduled",
    color: "text-orange-700",
    bg: "bg-orange-100",
    border: "border-orange-200"
  },
  {
    id: "health",
    season: "Autumn 2026",
    title: "Harvest Business Expo",
    dates: "October 10 - 19, 2026",
    status: "Scheduled",
    color: "text-amber-700",
    bg: "bg-amber-100",
    border: "border-amber-200"
  },
  {
    id: "fintech",
    season: "Winter 2026",
    title: "Holiday Shopping Festival",
    dates: "December 5 - 14, 2026",
    status: "Scheduled",
    color: "text-blue-700",
    bg: "bg-blue-100",
    border: "border-blue-200"
  },
];

export default function SeasonalEvents() {
  return (
    <section id="whats-on" className="py-6 sm:py-16 md:py-20 bg-slate-50/60 text-slate-900 relative overflow-hidden border-t border-slate-100">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Compact Section Header */}
        <div className="mb-3 sm:mb-8">
          <div className="flex items-center justify-between gap-2 mb-1">
            <div className="inline-flex items-center gap-1.5 text-orange-600 font-extrabold tracking-wider uppercase text-[10px] sm:text-xs">
              <Sparkles className="w-3.5 h-3.5" /> Seasonal Highlights
            </div>
            
            <Link 
              href="/tickets" 
              className="inline-flex items-center gap-1 px-3 py-1 sm:px-4 sm:py-2 bg-white border border-slate-200 hover:border-orange-600 rounded-full font-bold text-[10px] sm:text-xs text-slate-800 transition-all shadow-sm active:scale-95 shrink-0"
            >
              <span>Full Schedule</span>
              <ArrowRight className="w-3 h-3 text-orange-600" />
            </Link>
          </div>

          <h3 className="text-base sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
            Mark Your Calendar: <span className="text-orange-600">2026 Seasons</span>
          </h3>
          <p className="text-[11px] sm:text-xs md:text-sm text-slate-500 mt-0.5 max-w-xl">
            While 247GBS runs 24/7, these seasonal expos bring high-intent traffic, live demos, and exclusive brand launches.
          </p>
        </div>

        {/* 2x2 Grid on Mobile for Maximum Information Density */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6">
          {events.map((event, index) => (
            <Link
              key={index}
              href={`/tickets?season=${event.id}`}
              className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-slate-200/80 hover:border-orange-600 transition-all duration-300 group hover:-translate-y-1 hover:shadow-md shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className={`inline-block px-2 py-0.5 rounded-full text-[9px] sm:text-xs font-bold mb-2 ${event.bg} ${event.color}`}>
                  {event.season}
                </div>
                <h4 className="text-xs sm:text-base font-bold mb-1 group-hover:text-orange-600 transition-colors leading-snug line-clamp-2">
                  {event.title}
                </h4>
                <div className="flex items-center gap-1 text-slate-500 text-[10px] sm:text-xs mb-3">
                  <CalendarDays className="w-3 h-3 text-slate-400 shrink-0" />
                  <span className="truncate">{event.dates}</span>
                </div>
              </div>
              
              <div className="pt-2 border-t border-slate-100 flex justify-between items-center">
                <span className="text-[9px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {event.status}
                </span>
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-orange-600 transition-colors">
                  <ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-white" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
