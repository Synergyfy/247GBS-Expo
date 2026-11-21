"use client";

import { useState } from "react";
import { Store, Gift, Wallet, Network, QrCode, MessageSquare, Info, CheckCircle2, Cpu } from "lucide-react";
import Modal from "@/app/component/Modal";

const features = [
  {
    name: "Business Expo Stands",
    description: "Your permanent digital storefront. Showcase products, run live demos, and capture leads 24/7.",
    icon: Store,
    color: "bg-blue-500",
    details: {
      highlights: ["Custom 3D-feeling templates", "Integrated lead capture forms", "Real-time visitor analytics", "24/7 autonomous operation"],
      benefit: "Maximize your global visibility without the overhead of physical exhibitions."
    }
  },
  {
    name: "Reward Engine",
    description: "Earn points for every interaction. Visiting, sharing, and buying all generate value.",
    icon: Gift,
    color: "bg-pink-500",
    details: {
      highlights: ["Automatic point calculation", "Multi-tier reward structures", "Referral bonuses", "Interactive earning missions"],
      benefit: "Boost customer retention by turning every click into tangible value."
    }
  },
  {
    name: "Digital Wallet",
    description: "A secure integrated wallet to store your earnings, rewards, and manage transactions seamlessly.",
    icon: Wallet,
    color: "bg-purple-500",
    details: {
      highlights: ["Multi-currency support", "Instant point-to-cash conversion", "Secure transaction history", "Integrated payout system"],
      benefit: "A unified financial hub for all your expo earnings and spending."
    }
  },
  {
    name: "Network & Referrals",
    description: "Grow your influence. Our built-in network system tracks referrals and pays you for growth.",
    icon: Network,
    color: "bg-green-500",
    details: {
      highlights: ["Transparent hierarchy tracking", "Automatic commission splits", "Growth milestone rewards", "Network visualization tools"],
      benefit: "Incentivize your community to grow your brand for you."
    }
  },
  {
    name: "Smart QR Codes",
    description: "Bridge the physical and digital worlds. Scan to visit booths, join groups, or claim rewards instantly.",
    icon: QrCode,
    color: "bg-orange-500",
    details: {
      highlights: ["Universal scanning compatibility", "Dynamic destination updates", "Traffic source tracking", "Instant action triggers"],
      benefit: "Seamlessly connect offline marketing to your digital exhibition stand."
    }
  },
  {
    name: "Community Groups",
    description: "Every business has a community. Join groups, chat directly, and build long-term trust.",
    icon: MessageSquare,
    color: "bg-indigo-500",
    details: {
      highlights: ["Direct messaging & broadcasts", "Exclusive member-only deals", "Built-in trust ratings", "Collaborative feedback loops"],
      benefit: "Build a loyal following that sustains your business between expos."
    }
  },
];

export default function CoreSystems() {
  const [selectedFeature, setSelectedFeature] = useState<any>(null);

  return (
    <section id="systems" className="py-6 sm:py-16 md:py-20 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Compact Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-4 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 text-orange-600 font-extrabold tracking-wider uppercase text-[10px] sm:text-xs mb-0.5">
            <Cpu className="w-3.5 h-3.5" /> Platform Infrastructure
          </div>
          <h3 className="text-base sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug mb-1">
            More Than Just a Website. A Living <span className="text-orange-600">Digital Economy</span>.
          </h3>
          <p className="text-[11px] sm:text-xs md:text-sm text-slate-500 leading-relaxed">
            Interconnected systems providing the tools for businesses to thrive and visitors to earn 24/7.
          </p>
        </div>

        {/* Dense 2-Column Grid on Mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6">
          {features.map((feature) => (
            <div
              key={feature.name}
              onClick={() => setSelectedFeature(feature)}
              className="group bg-white rounded-xl sm:rounded-2xl p-3 sm:p-6 hover:shadow-md transition-all duration-300 border border-slate-200/80 hover:border-orange-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className={`w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl ${feature.color} bg-opacity-10 flex items-center justify-center mb-2 sm:mb-4 group-hover:scale-105 transition-transform`}>
                  <feature.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${feature.color.replace('bg-', 'text-')}`} />
                </div>

                <h4 className="text-xs sm:text-base font-bold text-slate-900 mb-1 group-hover:text-orange-600 transition-colors tracking-tight leading-snug">
                  {feature.name}
                </h4>
                <p className="text-slate-500 text-[10px] sm:text-xs leading-relaxed line-clamp-2 sm:line-clamp-3 mb-2">
                  {feature.description}
                </p>
              </div>

              <div className="flex items-center gap-1 text-[10px] sm:text-xs font-bold text-orange-600 pt-1 border-t border-slate-50">
                <Info className="w-3 h-3" />
                <span>Learn Details</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Scaled for Mobile Viewports */}
      <Modal
        isOpen={!!selectedFeature}
        onClose={() => setSelectedFeature(null)}
        title={selectedFeature?.name || "System Details"}
      >
        {selectedFeature && (
          <div className="space-y-4 sm:space-y-6 p-1 sm:p-2">
            <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-slate-50 rounded-xl sm:rounded-2xl border border-slate-100">
              <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-xl ${selectedFeature.color} bg-opacity-10 flex items-center justify-center shrink-0`}>
                <selectedFeature.icon className={`w-5 h-5 sm:w-7 sm:h-7 ${selectedFeature.color.replace('bg-', 'text-')}`} />
              </div>
              <div>
                <h4 className="text-sm sm:text-lg font-bold text-slate-900 leading-snug">{selectedFeature.name}</h4>
                <p className="text-[11px] sm:text-xs text-slate-500">Core Platform Infrastructure</p>
              </div>
            </div>

            <div>
              <h5 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-orange-600 mb-2">Key Capabilities</h5>
              <div className="grid gap-2">
                {selectedFeature.details.highlights.map((item: string, i: number) => (
                  <div key={i} className="flex items-center gap-2 p-2.5 sm:p-3 bg-white border border-slate-100 rounded-xl shadow-xs">
                    <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                    <span className="text-xs sm:text-sm font-semibold text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3.5 sm:p-5 bg-slate-900 text-white rounded-xl sm:rounded-2xl">
              <h5 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-orange-400 mb-1">Strategic Benefit</h5>
              <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">"{selectedFeature.details.benefit}"</p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setSelectedFeature(null)}
                className="w-full py-2.5 sm:py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs sm:text-sm transition-all active:scale-98"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
