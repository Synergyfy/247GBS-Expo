"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

// --- ICONS (SVG) ---
const ArrowRightIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
);
const BusinessIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
);
const CustomerIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
);
const AlwaysOnIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);
const ConnectedIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
);
const WalletIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
);
const QRCodeIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h2M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" /></svg>
);
const RewardIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg>
);
const NetworkIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
);
const GroupIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
);
const DoorIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" /></svg>
);

// --- 3D CURVED SLIDER COMPONENT ---
const IMAGES = [
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop",
];

function CurvedHeroSlider() {
  return (
    <div className="relative w-full overflow-hidden py-10 mt-10">
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#FFF7ED] to-transparent z-10" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#FFF7ED] to-transparent z-10" />

      <div className="flex justify-center perspective-container">
        <div className="flex gap-6 animate-scroll w-[200%] items-center">
          {[...IMAGES, ...IMAGES].map((src, i) => (
            <div
              key={i}
              className="relative flex-none w-[280px] h-[350px] md:w-[350px] md:h-[450px] rounded-2xl overflow-hidden shadow-2xl transition-transform hover:scale-105"
              style={{
                transform: `perspective(1000px) rotateY(${i % 2 === 0 ? '5deg' : '-5deg'}) scale(0.95)`,
              }}
            >
              <Image
                src={src}
                alt="Expo Scene"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <span className="text-white font-medium">Expo Hall {i % 3 + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- MAIN PAGE ---
export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFF7ED]">

      {/* --- NAVBAR --- */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:scale-105 transition-transform shadow-lg shadow-orange-500/30">E</div>
            <span className="font-bold text-slate-900 text-lg tracking-tight">247GBS Expo</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {['Features', 'How it Works', 'Systems', 'Join'].map(item => (
              <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-slate-600 font-medium hover:text-orange-600 transition-colors">
                {item}
              </a>
            ))}
          </div>
          <button className="hidden md:flex items-center gap-2 bg-slate-900 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-slate-800 transition-colors">
            Get Started <ArrowRightIcon className="w-4 h-4" />
          </button>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-10 overflow-hidden">
        {/* ... (Hero content same as before) ... */}
        <div className="max-w-4xl mx-auto text-center px-4 relative z-20">
          <div className="inline-block mb-6">
            <span className="py-2 px-4 rounded-full bg-orange-100 text-orange-700 font-semibold text-sm border border-orange-200">
              ✨ The World&apos;s First Permanent Digital Expo
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-6">
            Streamline Your Business,<br className="hidden md:block" />
            <span className="text-gradient-orange">Supercharge Your Growth</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            All-in-one platform to plan, collaborate, and deliver — faster and smarter.
            Join the living economy that never sleeps.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="btn-primary flex items-center gap-2 text-lg">
              Enter the Expo <ArrowRightIcon className="w-5 h-5" />
            </button>
            <button className="px-8 py-4 rounded-full border-2 border-slate-200 text-slate-700 font-semibold hover:border-orange-600 hover:text-orange-600 transition-all">
              Watch Demo
            </button>
          </div>
          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-500">
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full bg-slate-300 border border-white"></div>
              <div className="w-6 h-6 rounded-full bg-slate-400 border border-white"></div>
              <div className="w-6 h-6 rounded-full bg-slate-500 border border-white"></div>
            </div>
            <span>Trusted by 2,000+ companies worldwide</span>
          </div>
        </div>
        <CurvedHeroSlider />
      </section>

      {/* --- SECTION 2: WHAT THIS IS --- */}
      <section id="features" className="section-padding bg-white relative">
        {/* ... (Features content same as before) ... */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Clarity in a Chaotic World</h2>
            <p className="text-slate-500 text-lg">A permanent exhibition designed for connection.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group p-8 rounded-3xl bg-[#FFF7ED] hover:bg-orange-50 transition-all duration-300 border border-transparent hover:border-orange-200 cursor-pointer">
              <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BusinessIcon className="text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">For Businesses</h3>
              <p className="text-slate-600">Build loyalty. Grow networks. Earn recurring income.</p>
            </div>

            <div className="group p-8 rounded-3xl bg-[#ECFDF5] hover:bg-emerald-50 transition-all duration-300 border border-transparent hover:border-emerald-200 cursor-pointer">
              <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <CustomerIcon className="text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">For Customers</h3>
              <p className="text-slate-600">Earn rewards. Join communities. Discover opportunities.</p>
            </div>

            <div className="group p-8 rounded-3xl bg-[#EFF6FF] hover:bg-blue-50 transition-all duration-300 border border-transparent hover:border-blue-200 cursor-pointer">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <AlwaysOnIcon className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Always On</h3>
              <p className="text-slate-600">24/7 global exhibition, no closing time.</p>
            </div>

            <div className="group p-8 rounded-3xl bg-[#FAF5FF] hover:bg-purple-50 transition-all duration-300 border border-transparent hover:border-purple-200 cursor-pointer">
              <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ConnectedIcon className="text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Connected</h3>
              <p className="text-slate-600">Rewards, wallets, groups, referrals — all linked.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: HOW IT WORKS (ZIGZAG VERTICAL TIMELINE) --- */}
      <section id="how-it-works" className="py-24 bg-[#FFF7ED]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Start Your Adventure</h2>
            <p className="text-slate-500 text-lg">Follow the path to unlimited potential.</p>
          </div>

          <div className="relative">
            {/* Vertical Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-200 via-orange-400 to-orange-200 rounded-full z-0"></div>

            <div className="space-y-24">
              {[
                { step: 1, title: "Enter the Expo", subtitle: "Register and step into the digital world.", icon: <DoorIcon /> },
                { step: 2, title: "Visit Businesses", subtitle: "Explore thousands of booths and services.", icon: <BusinessIcon /> },
                { step: 3, title: "Earn Rewards", subtitle: "Collect value from every interaction.", icon: <RewardIcon /> },
                { step: 4, title: "Join Groups", subtitle: "Find your tribe and build connections.", icon: <GroupIcon /> },
                { step: 5, title: "Grow Networks", subtitle: "Expand your reach and income dramatically.", icon: <NetworkIcon /> }
              ].map((item, i) => (
                <div key={i} className={`flex items-center justify-between w-full ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} relative z-10`}>
                  {/* Content Side */}
                  <div className={`w-[45%] ${i % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-slate-600 text-lg">{item.subtitle}</p>
                  </div>

                  {/* Center Icon */}
                  <div className="w-16 h-16 rounded-full bg-white border-4 border-orange-100 shadow-xl flex items-center justify-center text-orange-600 relative shrink-0 hover:scale-110 transition-transform duration-300">
                    <div className="w-8 h-8">{item.icon}</div>
                    {/* Step Number Badge */}
                    <div className={`absolute top-0 ${i % 2 === 0 ? '-right-2' : '-left-2'} bg-slate-900 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white`}>
                      {item.step}
                    </div>
                  </div>

                  {/* Empty Spacer Side */}
                  <div className="w-[45%]"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 4: CORE SYSTEMS --- */}
      <section id="systems" className="section-padding bg-white">
        {/* ... (Core Systems content same as before) ... */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Core Systems</h2>
            <p className="text-slate-500 text-lg">Trust, depth, and powerful tools for growth.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Business Expo Stands", icon: <BusinessIcon />, desc: "Digital storefronts with premium branding" },
              { title: "Reward Engine", icon: <RewardIcon />, desc: "Automated loyalty and engagement tracking" },
              { title: "Digital Wallet", icon: <WalletIcon />, desc: "Secure transaction and earning storage" },
              { title: "Group System", icon: <GroupIcon />, desc: "Community building and direct messaging" },
              { title: "Network & Referrals", icon: <NetworkIcon />, desc: "Viral growth mechanics built-in" },
              { title: "QR Code Integration", icon: <QRCodeIcon />, desc: "Seamless physical-to-digital connection" },
            ].map((sys, i) => (
              <div key={i} className="flex gap-6 p-6 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group">
                <div className="flex-shrink-0 w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                  {sys.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{sys.title}</h3>
                  <p className="text-slate-500 text-sm">{sys.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REMOVED STATS SECTION HERE */}

      {/* --- SECTION 6: ENTRY POINTS --- */}
      <section id="join" className="py-24 max-w-6xl mx-auto px-6 bg-[#FFF7ED]">
        {/* ... (Entry Points content same as before) ... */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Choose Your Path</h2>
          <p className="text-slate-600 text-lg">Whether you are buying or selling, we have a spot for you.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* BUSINESS */}
          <div className="group relative rounded-3xl overflow-hidden cursor-pointer h-[500px] shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop"
              alt="Business"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-10 flex flex-col justify-end">
              <div className="bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded w-fit mb-4">FOR SELLERS</div>
              <h3 className="text-3xl font-bold text-white mb-2">I am a Business</h3>
              <p className="text-slate-200 mb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                Set up your stand, automate rewards, and build your customer network.
              </p>
              <Link href="/get-started?role=business" className="flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-full font-bold w-fit hover:bg-orange-50 transition-colors">
                Create Your Stand <ArrowRightIcon className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* CUSTOMER */}
          <div className="group relative rounded-3xl overflow-hidden cursor-pointer h-[500px] shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=800&auto=format&fit=crop"
              alt="Customer"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-10 flex flex-col justify-end">
              <div className="bg-teal-600 text-white text-xs font-bold px-3 py-1 rounded w-fit mb-4">FOR BUYERS</div>
              <h3 className="text-3xl font-bold text-white mb-2">I am a Customer</h3>
              <p className="text-slate-200 mb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                Shop, earn rewards, and discover unmatched opportunities.
              </p>
              <Link href="/get-started?role=customer" className="flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-full font-bold w-fit hover:bg-teal-50 transition-colors">
                Join & Start Earning <ArrowRightIcon className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 border-t border-orange-100 bg-[#FFF7ED] text-center">
        <div className="flex items-center justify-center gap-2 mb-6 opacity-70">
          <div className="w-6 h-6 bg-orange-600 rounded flex items-center justify-center text-white text-sm font-bold">E</div>
          <span className="font-bold text-slate-900">247GBS Expo</span>
        </div>
        <p className="text-slate-500 text-sm">Building the infrastructure for long-term digital relationships.</p>
        <div className="mt-8 text-xs text-slate-400">© 2026. The World&apos;s Exhibition.</div>
      </footer>

    </div>
  );
}
