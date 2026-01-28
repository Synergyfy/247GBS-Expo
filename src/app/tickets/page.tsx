import Link from "next/link";
import { Check, Ticket, Users, Gift, ArrowRight } from "lucide-react";
import Navbar from "@/app/component/landing/Navbar";
import Footer from "@/app/component/landing/Footer";

export default function TicketsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Header */}
      <section className="pt-32 pb-20 bg-orange-600 text-white text-center">
        <div className="container mx-auto px-4">
          <span className="text-orange-100 font-bold tracking-wider uppercase text-sm mb-4 block">For Visitors</span>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Your Pass to the<br />
            <span className="text-white">Future of Business.</span>
          </h1>
          <p className="text-xl text-orange-50 max-w-2xl mx-auto mb-10">
            Join the global digital economy. Shop, connect, and earn rewards just for exploring.
          </p>
        </div>
      </section>

      {/* Visitor Perks */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Ticket className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Free General Access</h3>
              <p className="text-slate-600">
                Explore thousands of booths and basic seasonal events completely for free.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Gift className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Earn While You Visit</h3>
              <p className="text-slate-600">
                Collect reward points for every booth visit and interaction. Redeem for real value.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Community Access</h3>
              <p className="text-slate-600">
                Join business groups, network with professionals, and find new opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ticket Types */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Select Your Access Pass</h2>
            <p className="text-slate-500">Join 50,000+ monthly visitors today.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Pass */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-orange-600 relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                MOST POPULAR
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Standard Visitor</h3>
              <div className="text-4xl font-bold text-slate-900 mb-6">Free<span className="text-base font-normal text-slate-500">/forever</span></div>
              <ul className="space-y-4 mb-8">
                {['Access to All Public Booths', 'Standard Reward Earnings', 'Join Public Groups', 'Chat with Exhibitors'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-slate-600">
                    <Check className="w-5 h-5 text-orange-500" /> {item}
                  </li>
                ))}
              </ul>
              <Link href="/get-started?role=customer&type=free" className="block w-full py-3 text-center bg-orange-600 text-white rounded-full font-bold hover:bg-orange-700 transition-colors">
                Get Free Pass
              </Link>
            </div>

            {/* VIP Pass */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-2">VIP Networker</h3>
              <div className="text-4xl font-bold text-slate-900 mb-6">£19<span className="text-base font-normal text-slate-500">/mo</span></div>
              <ul className="space-y-4 mb-8">
                {['2x Reward Points', 'Access to VIP Lounges', 'Priority Support', 'Exclusive Networking Events', 'Verified Profile Badge'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-slate-600">
                    <Check className="w-5 h-5 text-green-500" /> {item}
                  </li>
                ))}
              </ul>
              <Link href="/get-started?role=customer&type=vip" className="block w-full py-3 text-center border-2 border-slate-900 rounded-full font-bold hover:bg-slate-50 transition-colors">
                Upgrade to VIP
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
