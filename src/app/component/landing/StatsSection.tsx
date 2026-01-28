import { Users, Building2, Globe, TrendingUp } from "lucide-react";

const stats = [
  {
    id: 1,
    name: "Active Exhibitors",
    value: "2,000+",
    icon: Building2,
    description: "Global brands & businesses",
  },
  {
    id: 2,
    name: "Monthly Visitors",
    value: "50k+",
    icon: Users,
    description: "Looking for products & services",
  },
  {
    id: 3,
    name: "Countries",
    value: "120+",
    icon: Globe,
    description: "International trade access",
  },
  {
    id: 4,
    name: "Transactions",
    value: "£10M+",
    icon: TrendingUp,
    description: "Generated in business value",
  },
];

export default function StatsSection() {
  return (
    <section className="bg-white py-12 relative -mt-10 z-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.id} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center text-[#D41A5C] mb-4">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-1">
                  {stat.name}
                </div>
                <div className="text-xs text-slate-500">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
