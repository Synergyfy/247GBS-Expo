import Link from "next/link";
import { Check, Store, BarChart3, Globe2, ArrowRight } from "lucide-react";
import Navbar from "@/app/component/landing/Navbar";
import Footer from "@/app/component/landing/Footer";

export default function ExhibitPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Header */}
      <section className="pt-32 pb-20 bg-orange-600 text-white text-center">
        <div className="container mx-auto px-4">
          <span className="text-orange-100 font-bold tracking-wider uppercase text-sm mb-4 block">For Businesses</span>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Exhibit to the World.<br />
            <span className="text-white">Never Close Shop.</span>
          </h1>
          <p className="text-xl text-orange-50 max-w-2xl mx-auto mb-10">
            Secure your permanent digital booth in the global marketplace. 
            Capture leads, sell products, and build loyalty 24/7/365.
          </p>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Store className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Premium Digital Booth</h3>
              <p className="text-slate-600">
                Fully customizable brand space with video, images, live chat, and product listings.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Globe2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Global Reach</h3>
              <p className="text-slate-600">
                Access customers from 120+ countries without leaving your office.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Real-Time Analytics</h3>
              <p className="text-slate-600">
                Track visitors, clicks, and sales in real-time with our advanced dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Tables */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Choose Your Booth Package</h2>
            <p className="text-slate-500">Simple, transparent pricing. No hidden fees.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Starter Booth</h3>
              <div className="text-4xl font-bold text-slate-900 mb-6">£99<span className="text-base font-normal text-slate-500">/mo</span></div>
              <ul className="space-y-4 mb-8">
                {['Standard Booth Template', 'Up to 20 Products', 'Basic Analytics', 'Email Support'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-slate-600">
                    <Check className="w-5 h-5 text-green-500" /> {item}
                  </li>
                ))}
              </ul>
              <Link href="/get-started?plan=starter" className="block w-full py-3 text-center border-2 border-slate-900 rounded-full font-bold hover:bg-slate-50 transition-colors">
                Select Starter
              </Link>
            </div>

            {/* Professional */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-orange-500 relative transform md:-translate-y-4">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                MOST POPULAR
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Professional Booth</h3>
              <div className="text-4xl font-bold text-slate-900 mb-6">£249<span className="text-base font-normal text-slate-500">/mo</span></div>
              <ul className="space-y-4 mb-8">
                {['Premium Custom Designs', 'Unlimited Products', 'Live Chat System', 'Advanced Analytics', 'Priority Support'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-slate-600">
                    <Check className="w-5 h-5 text-orange-500" /> {item}
                  </li>
                ))}
              </ul>
              <Link href="/get-started?plan=pro" className="block w-full py-3 text-center bg-orange-600 text-white rounded-full font-bold hover:bg-orange-700 transition-colors">
                Select Professional
              </Link>
            </div>

            {/* Enterprise */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Enterprise Hall</h3>
              <div className="text-4xl font-bold text-slate-900 mb-6">£999<span className="text-base font-normal text-slate-500">/mo</span></div>
              <ul className="space-y-4 mb-8">
                {['Dedicated Virtual Hall', 'Custom 3D Environment', 'API Access', 'White-label Options', 'Dedicated Account Manager'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-slate-600">
                    <Check className="w-5 h-5 text-green-500" /> {item}
                  </li>
                ))}
              </ul>
              <Link href="/get-started?plan=enterprise" className="block w-full py-3 text-center border-2 border-slate-900 rounded-full font-bold hover:bg-slate-50 transition-colors">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
