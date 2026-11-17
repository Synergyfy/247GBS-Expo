import Link from "next/link";
import { ArrowRight, CheckCircle2, Building2, Users } from "lucide-react";

export default function UserJourney() {
  return (
    <section className="py-6 sm:py-16 md:py-20 bg-white overflow-hidden border-t border-slate-100">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-4 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 text-orange-600 font-extrabold tracking-wider uppercase text-[10px] sm:text-xs mb-0.5">
            <Users className="w-3.5 h-3.5" /> Built for Everyone
          </div>
          <h2 className="text-base sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
            Choose Your <span className="text-orange-600">Growth Pathway</span>
          </h2>
          <p className="text-[11px] sm:text-xs md:text-sm text-slate-500 mt-0.5">
            Whether exhibiting products or exploring global booths, the platform is tailored to your goals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 items-stretch">
          
          {/* Exhibitor Path */}
          <div className="bg-gradient-to-br from-orange-50/60 to-white border border-orange-200/80 p-4 sm:p-8 rounded-2xl sm:rounded-3xl shadow-sm flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1 bg-orange-100 text-orange-800 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-2 sm:mb-3">
                <Building2 className="w-3 h-3" /> For Exhibitors
              </div>
              <h3 className="text-sm sm:text-xl md:text-2xl font-extrabold text-slate-900 mb-2 sm:mb-3 leading-snug">
                Expand Reach & <span className="text-orange-600">Automate Your Growth</span>
              </h3>
              <ul className="space-y-1.5 sm:space-y-2.5 mb-4 sm:mb-6">
                {[
                  "Permanent 24/7 Digital Booth with 3D-feeling templates",
                  "Automated loyalty rewards and customer wallet integration",
                  "Direct live leads & real-time analytics dashboard",
                  "Global exposure to targeted buyers across UK & worldwide"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-xs sm:text-sm font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2">
              <Link
                href="/exhibit"
                className="inline-flex items-center gap-1.5 px-4 py-2 sm:px-6 sm:py-3 bg-slate-950 hover:bg-slate-900 text-white rounded-full font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95 w-fit"
              >
                <span>Start Exhibiting</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Visitor Path */}
          <div className="bg-gradient-to-br from-teal-50/60 to-white border border-teal-200/80 p-4 sm:p-8 rounded-2xl sm:rounded-3xl shadow-sm flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1 bg-teal-100 text-teal-800 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-2 sm:mb-3">
                <Users className="w-3 h-3" /> For Visitors
              </div>
              <h3 className="text-sm sm:text-xl md:text-2xl font-extrabold text-slate-900 mb-2 sm:mb-3 leading-snug">
                Discover Brands & <span className="text-teal-600">Earn Real Rewards</span>
              </h3>
              <ul className="space-y-1.5 sm:space-y-2.5 mb-4 sm:mb-6">
                {[
                  "Free, instant access to explore hundreds of verified brands",
                  "Earn rewards and cashback points simply by visiting booths",
                  "Exclusive seasonal deals, product drops, and trade offers",
                  "Direct instant messaging with brand founders and merchants"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-xs sm:text-sm font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2">
              <Link
                href="/get-started"
                className="inline-flex items-center gap-1.5 px-4 py-2 sm:px-6 sm:py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-full font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95 w-fit"
              >
                <span>Join for Free</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
