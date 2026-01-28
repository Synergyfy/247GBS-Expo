import { CalendarDays, ArrowRight } from "lucide-react";

const events = [
  {
    season: "Spring 2026",
    title: "Global Innovation Fair",
    dates: "April 10 - 19, 2026",
    status: "Upcoming",
    color: "text-green-600",
    bg: "bg-green-100",
    border: "border-green-200"
  },
  {
    season: "Summer 2026",
    title: "Summer Trade Carnival",
    dates: "July 15 - 24, 2026",
    status: "Scheduled",
    color: "text-orange-600",
    bg: "bg-orange-100",
    border: "border-orange-200"
  },
  {
    season: "Autumn 2026",
    title: "Harvest Business Expo",
    dates: "October 10 - 19, 2026",
    status: "Scheduled",
    color: "text-amber-600",
    bg: "bg-amber-100",
    border: "border-amber-200"
  },
  {
    season: "Winter 2026",
    title: "Holiday Shopping Festival",
    dates: "December 5 - 14, 2026",
    status: "Scheduled",
    color: "text-blue-600",
    bg: "bg-blue-100",
    border: "border-blue-200"
  },
];

export default function SeasonalEvents() {
  return (
    <section id="whats-on" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-[#D41A5C] font-bold tracking-wide uppercase text-sm mb-3">
              Seasonal Highlights
            </h2>
            <h3 className="text-3xl md:text-5xl font-bold mb-4">
              Mark Your Calendar
            </h3>
            <p className="text-slate-400 text-lg">
              While our platform is open 24/7, these special seasonal exhibitions bring focused traffic, live events, and exclusive launches.
            </p>
          </div>
          <a href="#" className="flex items-center gap-2 text-white font-semibold hover:text-[#D41A5C] transition-colors">
            View Full Schedule <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event, index) => (
            <div
              key={index}
              className={`bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-[#D41A5C] transition-all duration-300 group hover:-translate-y-2`}
            >
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 ${event.bg} ${event.color}`}>
                {event.season}
              </div>
              <h4 className="text-xl font-bold mb-2 group-hover:text-[#D41A5C] transition-colors">
                {event.title}
              </h4>
              <div className="flex items-center gap-2 text-slate-400 mb-4 text-sm">
                <CalendarDays className="w-4 h-4" />
                {event.dates}
              </div>
              <div className="pt-4 border-t border-slate-700 flex justify-between items-center">
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                  {event.status}
                </span>
                <button className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center group-hover:bg-[#D41A5C] transition-colors">
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
