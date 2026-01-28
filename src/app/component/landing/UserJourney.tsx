import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function UserJourney() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Business Path */}
          <div className="relative group">
            <div className="absolute inset-0 bg-orange-100 rounded-3xl transform rotate-3 group-hover:rotate-2 transition-transform duration-500" />
            <div className="relative bg-white border border-slate-200 p-8 md:p-12 rounded-3xl shadow-lg">
              <div className="inline-block bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                For Exhibitors
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Expand Your Reach & <br />
                <span className="text-orange-600">Automate Your Growth</span>
              </h3>
              <ul className="space-y-4 mb-8">
                {[
                  "Permanent 24/7 Digital Booth",
                  "Automated Reward & Loyalty System",
                  "Built-in Customer CRM & Leads",
                  "Global Exposure to New Markets"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-orange-500 shrink-0" />
                    <span className="text-slate-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/exhibit"
                className="inline-flex items-center justify-center w-full md:w-auto px-8 py-4 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-800 transition-colors"
              >
                Start Exhibiting <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Customer Path */}
          <div className="relative group mt-8 lg:mt-0">
            <div className="absolute inset-0 bg-teal-100 rounded-3xl transform -rotate-3 group-hover:-rotate-2 transition-transform duration-500" />
            <div className="relative bg-white border border-slate-200 p-8 md:p-12 rounded-3xl shadow-lg">
              <div className="inline-block bg-teal-100 text-teal-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                For Visitors
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Discover Brands & <br />
                <span className="text-teal-600">Earn Real Rewards</span>
              </h3>
              <ul className="space-y-4 mb-8">
                {[
                  "Free Access to Global Brands",
                  "Earn Points for Visiting Booths",
                  "Exclusive Discounts & Offers",
                  "Join Communities & Networks"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-teal-500 shrink-0" />
                    <span className="text-slate-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/get-started"
                className="inline-flex items-center justify-center w-full md:w-auto px-8 py-4 bg-[#D41A5C] text-white rounded-full font-bold hover:bg-[#b0154c] transition-colors shadow-lg shadow-pink-500/20"
              >
                Join for Free <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
