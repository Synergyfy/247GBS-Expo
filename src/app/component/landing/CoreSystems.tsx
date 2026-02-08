"use client";

import { useState } from "react";
import { Store, Gift, Wallet, Network, QrCode, MessageSquare, Info, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
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
    <section id="systems" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-orange-600 font-bold tracking-wide uppercase text-sm mb-3">
            The Infrastructure of Growth
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
            More Than Just a Website.<br />
            A Complete <span className="text-orange-600">Digital Economy</span>.
          </h3>
          <p className="text-lg text-slate-600 leading-relaxed">
            We provide the tools for businesses to thrive and customers to earn. 
            All systems are interconnected to create a seamless experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.name}
              onClick={() => setSelectedFeature(feature)}
              className="group bg-white rounded-[2.5rem] p-8 hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:border-orange-200 relative overflow-hidden cursor-pointer"
            >
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-transparent to-slate-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110`} />
              
              <div className={`w-14 h-14 rounded-2xl ${feature.color} bg-opacity-10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                <feature.icon className={`w-7 h-7 ${feature.color.replace('bg-', 'text-')}`} />
              </div>
              
              <h4 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-orange-600 transition-colors tracking-tight">
                {feature.name}
              </h4>
              <p className="text-slate-500 leading-relaxed mb-8">
                {feature.description}
              </p>
              
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest group-hover:text-orange-600 transition-colors">
                <Info className="w-4 h-4" /> Learn More
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={!!selectedFeature}
        onClose={() => setSelectedFeature(null)}
        title={selectedFeature?.name || "System Details"}
      >
        {selectedFeature && (
          <div className="space-y-8 p-2">
            <div className="flex items-center gap-6 p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
               <div className={`w-16 h-16 rounded-2xl ${selectedFeature.color} bg-opacity-10 flex items-center justify-center`}>
                <selectedFeature.icon className={`w-8 h-8 ${selectedFeature.color.replace('bg-', 'text-')}`} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-1">{selectedFeature.name}</h4>
                <p className="text-sm text-slate-500 font-medium">Core Platform Infrastructure</p>
              </div>
            </div>

            <div>
              <h5 className="text-xs font-black uppercase tracking-[0.2em] text-orange-600 mb-4">Key Capabilities</h5>
              <div className="grid gap-3">
                {selectedFeature.details.highlights.map((item: string, i: number) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-sm font-bold text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 bg-slate-900 text-white rounded-[2rem] relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-10">
                 <selectedFeature.icon className="w-20 h-20" />
               </div>
               <div className="relative z-10">
                 <h5 className="text-xs font-black uppercase tracking-[0.2em] text-orange-500 mb-2">The Strategic Benefit</h5>
                 <p className="text-lg font-medium leading-relaxed italic">"{selectedFeature.details.benefit}"</p>
               </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={() => setSelectedFeature(null)}
                className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all"
              >
                Close
              </button>
              <Link 
                href="/exhibit"
                className="flex-[2] py-4 bg-orange-600 text-white rounded-2xl font-bold hover:bg-orange-700 transition-all shadow-xl shadow-orange-600/30 flex justify-center items-center gap-2"
              >
                Start Using This System <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
