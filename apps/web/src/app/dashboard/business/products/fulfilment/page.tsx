"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Clock, ShoppingBag, Package } from "lucide-react";

export default function OrderFulfilmentComingSoonPage() {
  return (
    <div className="max-w-3xl mx-auto py-8 sm:py-12 px-4">
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 text-center space-y-5 shadow-xs">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-orange-700 border border-orange-200 text-xs font-extrabold uppercase tracking-wider">
          <Clock className="w-3.5 h-3.5" />
          <span>Coming Soon</span>
        </div>

        <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center mx-auto">
          <ShoppingBag className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            MCOM Mall Fulfilment &amp; Orders
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
            Direct product checkout, bundle fulfilment, and shipping tracking will be powered by the{" "}
            <strong>MCOM Mall</strong> integration — launching soon. For now, continue showcasing your
            catalog inside your 247GBS Expo booth.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/dashboard/business/products"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-orange-600 text-white text-xs sm:text-sm font-bold hover:bg-orange-700 transition-colors"
          >
            <Package className="w-4 h-4" />
            <span>Back to MCOM Products</span>
          </Link>
          <Link
            href="/dashboard/business"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs sm:text-sm font-bold hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Business Overview</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
