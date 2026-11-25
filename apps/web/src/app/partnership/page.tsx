"use client";

import { motion } from "framer-motion";
import { 
  Rocket, Users, Globe, BarChart3, 
  MessageSquare, Zap, Target, ArrowRight, CheckCircle2,
  Building2, Award
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/app/component/landing/Navbar";
import Footer from "@/app/component/landing/Footer";

export default function PartnershipPage() {
  const benefits = [
    {
      icon: <Globe className="w-4 h-4 sm:w-5 sm:h-5" />,
      title: "Global Reach",
      description: "Connect with a national and international audience without physical exhibition overhead."
    },
    {
      icon: <Zap className="w-4 h-4 sm:w-5 sm:h-5" />,
      title: "Instant Setup",
      description: "Launch your digital booth in minutes with pre-designed 3D-feeling templates."
    },
    {
      icon: <Users className="w-4 h-4 sm:w-5 sm:h-5" />,
      title: "Smart Networking",
      description: "AI-driven matching connects your brand with high-intent buyers and trade partners."
    },
    {
      icon: <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />,
      title: "Real-Time Analytics",
      description: "Track every visitor interaction, lead, and conversion in your exhibitor dashboard."
    }
  ];

  const packages = [
    {
      name: "Standard Exhibitor",
      price: "£299",
      period: "/season",
      description: "Ideal for emerging brands establishing a 24/7 digital storefront.",
      features: [
        "Digital Exhibition Booth",
        "Up to 10 Product Listings",
        "Basic Analytics Dashboard",
        "Live Chat Integration",
        "Standard Directory Placement"
      ],
      cta: "Start Standard",
      href: "/exhibit",
      popular: false
    },
    {
      name: "Professional Partner",
      price: "£799",
      period: "/season",
      description: "Advanced growth tools for scaling brands seeking maximum buyer traffic.",
      features: [
        "Premium 3D-Feel Booth Design",
        "Unlimited Product Listings",
        "Advanced Lead Intelligence",
        "Live Demo & Workshop Streaming",
        "Priority Search Placement",
        "Dedicated Partner Support"
      ],
      cta: "Go Professional",
      href: "/exhibit",
      popular: true
    },
    {
      name: "Enterprise Global",
      price: "Custom",
      period: "",
      description: "Tailored multi-hall solutions for large organizations and sponsors.",
      features: [
        "Multi-Booth Brand Network",
        "Custom Feature Integration",
        "Seasonal Headline Sponsorship",
        "Full API & CRM Access",
        "Quarterly Executive Reviews"
      ],
      cta: "Contact Sales",
      href: "/exhibit",
      popular: false
    }
  ];

  return (
    <main className="min-h-screen bg-white font-sans text-slate-900">
      <Navbar />

      {/* Compact Hero Section - Centered max-w-7xl */}
      <section className="relative pt-24 pb-8 sm:pt-32 sm:pb-16 overflow-hidden bg-slate-50/60 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100/80 text-orange-700 text-[10px] sm:text-xs font-extrabold uppercase tracking-wider mb-2 sm:mb-4">
              <Building2 className="w-3.5 h-3.5" />
              Exhibitor & Partnership Programs
            </div>
            <h1 className="text-xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-2 sm:mb-4 text-slate-900">
              Scale Your Business in the <span className="text-orange-600">24/7 Digital Economy</span>
            </h1>
            <p className="text-xs sm:text-base text-slate-500 leading-relaxed mb-4 sm:mb-8 max-w-2xl mx-auto">
              Join hundreds of forward-thinking UK and international brands in a permanent, interactive exhibition environment that never closes.
            </p>
            <div className="flex flex-row items-center justify-center gap-2.5 sm:gap-4">
              <Link 
                href="/exhibit"
                className="px-5 py-2.5 sm:px-7 sm:py-3.5 bg-orange-600 text-white rounded-full font-bold text-xs sm:text-sm hover:bg-orange-700 transition-all shadow-md active:scale-95"
              >
                Become an Exhibitor
              </Link>
              <Link
                href="#packages"
                className="px-5 py-2.5 sm:px-7 sm:py-3.5 bg-slate-950 text-white rounded-full font-bold text-xs sm:text-sm hover:bg-slate-800 transition-all shadow-md active:scale-95"
              >
                View Packages
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Compact Trust Strip */}
      <section className="py-4 sm:py-6 border-b border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest shrink-0">Trusted by 850+ Exhibiting Brands</p>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 opacity-40 grayscale text-xs sm:text-base font-black text-slate-900">
            <span>TECHCORP</span>
            <span>GLOBEX</span>
            <span>VIRTUALUX</span>
            <span>NEXUS</span>
            <span>OMNICOM</span>
          </div>
        </div>
      </section>

      {/* Value Proposition - Centered max-w-7xl & 2x2 Mobile Grid */}
      <section className="py-6 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-12 items-center">
            <div>
              <div className="text-orange-600 font-extrabold uppercase tracking-wider text-[10px] sm:text-xs mb-1">
                Why Partner With Us
              </div>
              <h2 className="text-lg sm:text-3xl font-extrabold mb-2 sm:mb-4 tracking-tight leading-snug">
                Why Exhibit with <span className="text-orange-600">247GBS?</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mb-4 sm:mb-8 leading-relaxed">
                Traditional trade shows are restricted by venue costs and 3-day windows. Our digital expo removes those barriers, giving your brand a permanent high-converting booth 365 days a year.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
                {benefits.map((benefit, i) => (
                  <div key={i} className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3 sm:block">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 text-orange-600 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 sm:mb-2">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-base font-bold mb-0.5 sm:mb-1 text-slate-900">{benefit.title}</h3>
                      <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-900 h-56 sm:h-80 lg:h-[420px] shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1000&auto=format&fit=crop"
                alt="Digital Exhibition Interface"
                className="w-full h-full object-cover opacity-70"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-8 text-white">
                <p className="text-[10px] sm:text-xs font-bold text-orange-400 uppercase tracking-wider mb-1">
                  Verified Partner Impact
                </p>
                <blockquote className="text-xs sm:text-base font-semibold italic leading-snug mb-1.5">
                  &ldquo;Transitioning to the 247GBS Digital Expo increased our qualified B2B lead conversion by 40% in a single season.&rdquo;
                </blockquote>
                <p className="font-bold text-slate-300 text-[10px] sm:text-xs">— Sarah Jenkins, Head of Growth at TechCorp</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Packages - Full-Bleed Dark Background, Centered Content (No Double Container) */}
      <section id="packages" className="w-full py-8 sm:py-16 bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-12">
            <div className="text-orange-500 font-extrabold uppercase tracking-wider text-[10px] sm:text-xs mb-1">
              Transparent Tiers
            </div>
            <h2 className="text-lg sm:text-3xl font-extrabold mb-1.5 tracking-tight">Tailored Partnership Packages</h2>
            <p className="text-slate-400 text-xs sm:text-sm">Choose the exhibition tier that matches your brand&apos;s growth ambitions.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {packages.map((pkg, i) => (
              <div 
                key={i} 
                className={`relative p-4 sm:p-6 rounded-2xl sm:rounded-3xl border transition-all flex flex-col justify-between ${
                  pkg.popular 
                    ? "bg-white text-slate-900 border-orange-500 shadow-xl" 
                    : "bg-slate-900/90 border-white/10 text-white"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="text-sm sm:text-lg font-extrabold">{pkg.name}</h3>
                    {pkg.popular && (
                      <span className="bg-orange-600 text-white px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider">
                        Recommended
                      </span>
                    )}
                  </div>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-2xl sm:text-3xl font-black">{pkg.price}</span>
                    <span className={`text-xs font-bold ${pkg.popular ? "text-slate-500" : "text-slate-400"}`}>{pkg.period}</span>
                  </div>
                  <p className={`text-xs leading-relaxed mb-4 ${pkg.popular ? "text-slate-500" : "text-slate-400"}`}>
                    {pkg.description}
                  </p>

                  <div className={`w-full h-px mb-4 ${pkg.popular ? "bg-slate-100" : "bg-white/10"}`} />

                  <ul className="space-y-2 mb-5">
                    {pkg.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${pkg.popular ? "text-orange-600" : "text-orange-500"}`} />
                        <span className="text-xs font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={pkg.href}
                  className={`inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all w-fit ${
                    pkg.popular 
                      ? "bg-orange-600 text-white hover:bg-orange-700 shadow-md" 
                      : "bg-white/10 text-white hover:bg-white hover:text-slate-900 border border-white/15"
                  }`}
                >
                  <span>{pkg.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Ecosystem Advantage - 2x2 Grid on Mobile */}
      <section className="py-6 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-5 sm:mb-10">
            <h2 className="text-base sm:text-2xl md:text-3xl font-extrabold mb-1 tracking-tight">The Ecosystem Advantage</h2>
            <p className="text-slate-500 text-xs sm:text-sm">Beyond a digital booth, you unlock a complete suite of automated marketing tools.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {[
              { title: "Booth Builder", icon: <Rocket className="w-4 h-4 sm:w-5 sm:h-5" />, desc: "Intuitive templates to launch interactive 3D-feeling exhibition stands." },
              { title: "Lead Engine", icon: <Target className="w-4 h-4 sm:w-5 sm:h-5" />, desc: "Capture high-intent visitor leads with instant CRM & behavior tracking." },
              { title: "Reward System", icon: <Award className="w-4 h-4 sm:w-5 sm:h-5" />, desc: "Set custom loyalty points to incentivize repeat booth visits and purchases." },
              { title: "Community Hub", icon: <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />, desc: "Build dedicated buyer groups for direct broadcasts and product launches." }
            ].map((item, i) => (
              <div key={i} className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-100">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-lg sm:rounded-xl flex items-center justify-center text-orange-600 mb-2.5 shadow-xs border border-slate-100">
                  {item.icon}
                </div>
                <h4 className="text-xs sm:text-base font-bold mb-1 text-slate-900">{item.title}</h4>
                <p className="text-slate-500 text-[11px] sm:text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-8 sm:py-16 bg-orange-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-lg sm:text-3xl font-extrabold mb-1.5 sm:mb-3 tracking-tight">Ready to Showcase Your Brand 24/7?</h2>
          <p className="text-xs sm:text-sm text-orange-100 mb-4 sm:mb-6 max-w-xl mx-auto">
            Join our upcoming seasonal exhibition and start capturing leads across the UK & globally.
          </p>
          <div className="flex flex-row items-center justify-center gap-2.5 sm:gap-4">
            <Link 
              href="/exhibit"
              className="px-5 py-2.5 sm:px-7 sm:py-3 bg-white text-orange-600 rounded-full font-bold text-xs sm:text-sm hover:bg-orange-50 transition-all shadow-md inline-flex items-center gap-1.5"
            >
              <span>Apply to Exhibit</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/tickets"
              className="px-5 py-2.5 sm:px-7 sm:py-3 bg-slate-950 text-white rounded-full font-bold text-xs sm:text-sm hover:bg-slate-900 transition-all shadow-md"
            >
              Explore Events
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
