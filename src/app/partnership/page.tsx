"use client";

import { motion } from "framer-motion";
import { 
  ShieldCheck, Rocket, Users, Globe, BarChart3, 
  MessageSquare, Zap, Target, ArrowRight, CheckCircle2,
  Building2, Briefcase, Sparkles, Award
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/app/component/landing/Navbar";
import Footer from "@/app/component/landing/Footer";

export default function PartnershipPage() {
  const benefits = [
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Reach",
      description: "Connect with a national and international audience without the overhead of physical exhibitions."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Instant Setup",
      description: "Launch your digital booth in minutes with our intuitive builder and pre-designed templates."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Smart Networking",
      description: "Our AI-driven matching connects you with the most relevant leads and potential partners."
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Real-time Analytics",
      description: "Track every interaction, view, and lead with our comprehensive exhibitor dashboard."
    }
  ];

  const packages = [
    {
      name: "Standard Exhibitor",
      price: "£299",
      period: "/season",
      description: "Perfect for small businesses looking to establish a digital presence.",
      features: [
        "Digital Exhibition Booth",
        "Product/Service Listing (up to 10)",
        "Basic Analytics Dashboard",
        "Live Chat Integration",
        "Standard Placement"
      ],
      cta: "Start Small",
      href: "/exhibit",
      popular: false
    },
    {
      name: "Professional Partner",
      price: "£799",
      period: "/season",
      description: "Advanced features for growing brands seeking maximum engagement.",
      features: [
        "Premium Booth Design",
        "Unlimited Product Listings",
        "Advanced Lead Intelligence",
        "Live Streaming Capabilities",
        "Priority Search Placement",
        "Dedicated Support"
      ],
      cta: "Go Professional",
      href: "/exhibit",
      popular: true
    },
    {
      name: "Enterprise Global",
      price: "Custom",
      period: "",
      description: "Tailored solutions for large-scale organizations and franchises.",
      features: [
        "Multi-booth Network",
        "Custom Feature Development",
        "White-label Opportunities",
        "Full API Access",
        "Sponsorship Priority",
        "Quarterly Strategy Reviews"
      ],
      cta: "Contact Sales",
      href: "/exhibit",
      popular: false
    }
  ];

  return (
    <main className="min-h-screen bg-white font-sans text-slate-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(234,88,12,0.05)_0,transparent_70%)]" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-xs font-bold uppercase tracking-wider mb-6 border border-orange-100"
            >
              <Building2 className="w-3.5 h-3.5" />
              Exhibitor & Partnership Programs
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-8"
            >
              Scale Your Business in the <span className="text-orange-600">Digital Economy</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-slate-500 leading-relaxed mb-10 max-w-2xl mx-auto"
            >
              Join thousands of forward-thinking brands in a permanent, interactive exhibition environment that never closes.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link 
                href="/exhibit"
                className="px-10 py-4 bg-orange-600 text-white rounded-full font-bold text-lg hover:bg-orange-700 transition-all shadow-xl shadow-orange-600/20 hover:scale-105"
              >
                Become an Exhibitor
              </Link>
              <button className="px-10 py-4 bg-slate-900 text-white rounded-full font-bold text-lg hover:bg-slate-800 transition-all hover:scale-105">
                Download Partner Deck
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 border-y border-slate-100 bg-slate-50/50">
        <div className="container mx-auto px-4">
          <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-[0.3em] mb-8">Trusted by industry leaders worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-40 grayscale">
            {/* Placeholder Logos */}
            <div className="text-2xl font-black text-slate-900">TECHCORP</div>
            <div className="text-2xl font-black text-slate-900">GLOBEX</div>
            <div className="text-2xl font-black text-slate-900">VIRTUALUX</div>
            <div className="text-2xl font-black text-slate-900">NEXUS</div>
            <div className="text-2xl font-black text-slate-900">OMNICOM</div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-extrabold mb-8 tracking-tight">
                Why Exhibit with <span className="text-orange-600">247GBS?</span>
              </h2>
              <p className="text-lg text-slate-500 mb-12 leading-relaxed">
                Traditional exhibitions are limited by geography and time. Our digital platform removes these barriers, providing you with a persistent, high-engagement exhibition space that works for you 24/7.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-8">
                {benefits.map((benefit, i) => (
                  <div key={i} className="group">
                    <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-orange-600 group-hover:text-white transition-colors duration-300">
                      {benefit.icon}
                    </div>
                    <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-orange-600 rounded-[3rem] rotate-3 opacity-5" />
              <div className="relative bg-slate-900 rounded-[3.5rem] p-4 shadow-2xl overflow-hidden aspect-square lg:aspect-auto lg:h-[600px]">
                <Image 
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1000&auto=format&fit=crop"
                  alt="Digital Exhibition Interface"
                  fill
                  className="object-cover rounded-[3rem] opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                <div className="absolute bottom-12 left-12 right-12 text-white">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex -space-x-4">
                      {[1,2,3].map(i => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800" />
                      ))}
                    </div>
                    <p className="text-sm font-medium">Join 5,000+ businesses already onboard</p>
                  </div>
                  <blockquote className="text-xl font-medium italic leading-relaxed">
                    "Transitioning to the 247GBS Digital Expo was the best decision for our international growth strategy. Our lead conversion increased by 40%."
                  </blockquote>
                  <p className="mt-4 font-bold text-orange-500 uppercase tracking-widest text-xs">— Sarah Jenkins, Head of Growth at TechCorp</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Model */}
      <section className="py-24 bg-slate-900 text-white rounded-[4rem] mx-4 lg:mx-8">
        <div className="container mx-auto px-4 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 tracking-tight">Tailored Partnership Packages</h2>
            <p className="text-slate-400 text-lg">Choose the level of engagement that matches your brand's ambitions.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {packages.map((pkg, i) => (
              <div 
                key={i} 
                className={`relative p-10 rounded-[3rem] border transition-all duration-500 hover:scale-[1.02] ${
                  pkg.popular 
                    ? "bg-white text-slate-900 border-white shadow-2xl shadow-white/5" 
                    : "bg-white/5 border-white/10 text-white hover:bg-white/10"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-600 text-white px-6 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
                    Most Recommended
                  </div>
                )}
                
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black">{pkg.price}</span>
                    <span className={`text-sm font-bold ${pkg.popular ? "text-slate-400" : "text-slate-500"}`}>{pkg.period}</span>
                  </div>
                  <p className={`mt-4 text-sm leading-relaxed ${pkg.popular ? "text-slate-500" : "text-slate-400"}`}>
                    {pkg.description}
                  </p>
                </div>

                <div className={`w-full h-px mb-8 ${pkg.popular ? "bg-slate-100" : "bg-white/10"}`} />

                <ul className="space-y-4 mb-10">
                  {pkg.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <CheckCircle2 className={`w-5 h-5 shrink-0 ${pkg.popular ? "text-orange-600" : "text-orange-500"}`} />
                      <span className="text-sm font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href={pkg.href} className={`block text-center w-full py-4 rounded-2xl font-bold transition-all ${
                  pkg.popular 
                    ? "bg-slate-900 text-white hover:bg-orange-600" 
                    : "bg-white/10 text-white hover:bg-white border border-white/20 hover:text-slate-900"
                }`}>
                  {pkg.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Systems / Features */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-extrabold mb-4 tracking-tight">The Ecosystem Advantage</h2>
            <p className="text-slate-500 text-lg">Beyond a simple booth, you get a full suite of business growth tools.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { title: "Booth Builder", icon: <Rocket />, desc: "Drag-and-drop interface to create stunning 3D-feeling digital exhibition stands." },
              { title: "Lead Engine", icon: <Target />, desc: "Capture high-quality leads with integrated forms and behavior tracking." },
              { title: "Reward System", icon: <Award />, desc: "Create custom loyalty rewards to incentivize repeat visits and referrals." },
              { title: "Group Access", icon: <MessageSquare />, desc: "Build dedicated customer groups for direct marketing and community management." }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-900 mx-auto mb-6 border border-slate-100">
                  {item.icon}
                </div>
                <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-orange-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2)_0,transparent_50%)]" />
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl lg:text-6xl font-extrabold mb-8 tracking-tight">Ready to showcase your brand to the world?</h2>
            <p className="text-xl text-white/80 mb-12">Join our next seasonal expo and experience the future of business networking.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
               <Link 
                href="/exhibit"
                className="w-full sm:w-auto px-12 py-5 bg-white text-orange-600 rounded-full font-bold text-xl hover:bg-slate-50 transition-all shadow-2xl shadow-black/10 flex items-center justify-center gap-3"
              >
                Apply to Exhibit <ArrowRight className="w-6 h-6" />
              </Link>
              <button className="w-full sm:w-auto px-12 py-5 bg-slate-900 text-white rounded-full font-bold text-xl hover:bg-slate-800 transition-all">
                Talk to an Expert
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
