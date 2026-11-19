"use client";

import React, { useState } from "react";
import {
  Award,
  Zap,
  Gift,
  CreditCard,
  TrendingUp,
  Wallet,
  ExternalLink,
  ChevronDown,
  RefreshCw
} from "lucide-react";

export default function RewardsPage() {
  const [tiersExpanded, setTiersExpanded] = useState(false);

  const transactions = [
    {
      id: "MCOM-901",
      date: "Jan 24, 2026",
      desc: "Pass Wallet Top-Up",
      source: "247GBS Wallet",
      status: "Completed",
      amount: "+£500.00",
      isCredit: true
    },
    {
      id: "MCOM-902",
      date: "Jan 23, 2026",
      desc: "MCOM Mall Order: TechFlow Cloud Hub",
      source: "MCOM Mall",
      status: "Completed",
      amount: "-£299.00",
      isCredit: false
    },
    {
      id: "MCOM-903",
      date: "Jan 20, 2026",
      desc: "MCOM Reward Cashback: Early Bird",
      source: "MCOM Rewards",
      status: "Synced",
      amount: "+£15.00",
      isCredit: true
    },
    {
      id: "MCOM-904",
      date: "Jan 18, 2026",
      desc: "Attendee Referral Bonus (+100 Pts)",
      source: "MCOM Rewards",
      status: "Synced",
      amount: "+£25.00",
      isCredit: true
    }
  ];

  const availableRewards = [
    {
      id: 1,
      title: "£10 MCOM Mall Voucher",
      cost: "500 PTS",
      type: "Voucher",
      icon: Gift,
      iconColor: "text-orange-600"
    },
    {
      id: 2,
      title: "VIP Lounge Pass Upgrade",
      cost: "1,200 PTS",
      type: "Upgrade",
      icon: Zap,
      iconColor: "text-purple-600"
    },
    {
      id: 3,
      title: "£50 Season Pass Credit",
      cost: "2,500 PTS",
      type: "Cashback",
      icon: CreditCard,
      iconColor: "text-emerald-600"
    }
  ];

  const summaryStats = [
    {
      label: "Wallet Balance",
      value: "£1,250.00",
      sub: "Available for passes",
      icon: Wallet,
      iconColor: "text-orange-600"
    },
    {
      label: "MCOM Points",
      value: "850 PTS",
      sub: "150 pts to Gold Tier",
      icon: Award,
      iconColor: "text-purple-600"
    },
    {
      label: "MCOM Cashback",
      value: "£40.00",
      sub: "Next payout Feb 01",
      icon: TrendingUp,
      iconColor: "text-emerald-600"
    },
    {
      label: "Upgrade Credits",
      value: "2",
      sub: "VIP hall tokens",
      icon: Zap,
      iconColor: "text-blue-600"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-4 sm:space-y-5">
      {/* Compact Header (Synced with MCOM Rewards per meeting requirement) */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2.5">
        <div>
          <h1 className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900 tracking-tight uppercase">
            MCOM Rewards & Wallet
          </h1>
          <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
            Points, vouchers, and cashback dynamically synced from your MCOM Rewards account.
          </p>
        </div>
        <a
          href="https://mcomrewards.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 text-white rounded-xl text-[11px] font-bold hover:bg-orange-600 transition-colors w-fit shrink-0"
        >
          <RefreshCw className="w-3 h-3 text-orange-400" />
          <span>Open MCOM Rewards Portal</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Horizontal Scroll KPI Strip on Mobile (Peeping Card + Dot Slider, Inline Small Icons) */}
      <div>
        <div className="flex lg:grid lg:grid-cols-4 gap-2.5 sm:gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 pb-1">
          {summaryStats.map((stat, i) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={i}
                className="w-[42%] min-w-[144px] sm:w-[190px] lg:w-auto shrink-0 snap-start bg-white p-3 sm:p-4 rounded-2xl border border-slate-200/80 shadow-2xs"
              >
                <div className="flex items-center justify-between gap-1.5 mb-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider truncate">
                    {stat.label}
                  </span>
                  <IconComponent className={`w-3.5 h-3.5 ${stat.iconColor} shrink-0`} />
                </div>
                <div className="text-base sm:text-lg lg:text-xl font-extrabold text-slate-900 leading-none">
                  {stat.value}
                </div>
                <p className="text-[10px] font-medium text-slate-400 mt-1 truncate">
                  {stat.sub}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-center gap-1.5 mt-1.5 lg:hidden">
          <span className="w-3.5 h-1 rounded-full bg-orange-600" />
          <span className="w-1.5 h-1 rounded-full bg-slate-300" />
          <span className="w-1.5 h-1 rounded-full bg-slate-300" />
        </div>
      </div>

      {/* MCOM REWARDS REDEMPTION CATALOG */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-4 sm:p-5 space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pb-2 border-b border-slate-100">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-xs sm:text-sm text-slate-900 uppercase tracking-tight">
                Redeem Reward Points
              </h3>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 text-[10px] font-bold">
                850 pts available
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Convert loyalty balance into Expo passes or MCOM Mall vouchers.
            </p>
          </div>
        </div>

        <div>
          <div className="flex sm:grid sm:grid-cols-3 gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 pb-1">
            {availableRewards.map((reward) => {
              const IconComponent = reward.icon;
              return (
                <div
                  key={reward.id}
                  className="w-[68%] min-w-[195px] sm:w-auto shrink-0 snap-start border border-slate-200/70 rounded-xl p-3.5 hover:border-orange-300 transition-all flex flex-col justify-between gap-3 bg-white"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600">
                        {reward.type}
                      </span>
                      <IconComponent className={`w-3.5 h-3.5 ${reward.iconColor} shrink-0`} />
                    </div>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{reward.title}</h4>
                    <p className="text-[11px] text-slate-500 font-semibold mt-0.5">{reward.cost}</p>
                  </div>
                  <button
                    type="button"
                    className="w-full py-1.5 bg-slate-900 text-white rounded-lg text-[11px] font-bold hover:bg-orange-600 transition-colors"
                  >
                    Redeem via MCOM
                  </button>
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-center gap-1.5 mt-1.5 sm:hidden">
            <span className="w-3.5 h-1 rounded-full bg-orange-600" />
            <span className="w-1.5 h-1 rounded-full bg-slate-300" />
            <span className="w-1.5 h-1 rounded-full bg-slate-300" />
          </div>
        </div>
      </div>

      {/* COLLAPSIBLE TIER PROGRESS & WAYS TO EARN CARD */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <button
          type="button"
          onClick={() => setTiersExpanded((prev) => !prev)}
          className="w-full p-3.5 sm:p-4 flex items-center justify-between gap-3 text-left hover:bg-slate-50/60 transition-colors"
          aria-expanded={tiersExpanded}
        >
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                MCOM Tier Status & Ways to Earn
              </h3>
              <span className="text-[10px] font-extrabold text-orange-600 uppercase tracking-wider">
                Silver Tier
              </span>
            </div>
            <p className="text-[11px] text-slate-500 truncate">
              850 / 1,000 PTS to Gold Tier • +50 pts per event attended
            </p>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
              tiersExpanded ? "rotate-180 text-orange-600" : ""
            }`}
          />
        </button>

        {tiersExpanded && (
          <div className="px-3.5 pb-3.5 sm:px-4 sm:pb-4 pt-2.5 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-2">
              <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                Ways to Earn MCOM Points
              </p>
              <div className="divide-y divide-slate-100">
                {[
                  { action: "Attend a Live Expo Event", points: "+50 PTS" },
                  { action: "Purchase on MCOM Mall", points: "10 PTS / £1" },
                  { action: "Submit Session Feedback", points: "+20 PTS" },
                  { action: "Refer a Visitor or Exhibitor", points: "+100 PTS" }
                ].map((way, idx) => (
                  <div key={idx} className="py-1.5 flex items-center justify-between">
                    <span className="text-slate-700 font-medium">{way.action}</span>
                    <span className="font-bold text-orange-600">{way.points}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                MCOM Membership Tiers
              </p>
              <div className="divide-y divide-slate-100">
                {[
                  { name: "Silver Tier (Current)", req: "0 – 999 PTS", perk: "1.0x Base Multiplier" },
                  { name: "Gold Tier", req: "1,000+ PTS", perk: "1.5x Multiplier + Early Access" },
                  { name: "Platinum VIP", req: "5,000+ PTS", perk: "2.0x Multiplier + Lounge Pass" }
                ].map((t, idx) => (
                  <div key={idx} className="py-1.5 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900 block">{t.name}</span>
                      <span className="text-[11px] text-slate-500">{t.perk}</span>
                    </div>
                    <span className="text-[11px] font-bold text-slate-500">{t.req}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* UNIFIED ACTIVITY & ORDER HISTORY (Desktop Table + Mobile Stacked Rows, Colored Text Status) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-3.5 sm:p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-xs sm:text-sm text-slate-900 uppercase tracking-tight">
            MCOM Orders & Wallet Activity
          </h3>
          <span className="text-[11px] font-bold text-slate-400">
            Showing {transactions.length} records
          </span>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-slate-100 text-[10px] font-bold uppercase text-slate-400 tracking-wider">
              <tr>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Description & Reference</th>
                <th className="px-5 py-3">Source</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-5 py-3.5 text-slate-500 font-medium whitespace-nowrap">
                    {tx.date}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="font-bold text-slate-900">{tx.desc}</div>
                    <div className="text-[10px] text-slate-400 font-mono">REF: {tx.id}</div>
                  </td>
                  <td className="px-5 py-3.5 text-slate-600 font-semibold">{tx.source}</td>
                  <td className="px-5 py-3.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                      {tx.status}
                    </span>
                  </td>
                  <td
                    className={`px-5 py-3.5 font-extrabold text-right ${
                      tx.isCredit ? "text-emerald-600" : "text-slate-900"
                    }`}
                  >
                    {tx.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Stacked List */}
        <div className="md:hidden divide-y divide-slate-100">
          {transactions.map((tx) => (
            <div key={tx.id} className="p-3.5 space-y-1">
              <div className="flex items-start justify-between gap-2">
                <p className="font-bold text-xs text-slate-900 leading-snug">{tx.desc}</p>
                <span
                  className={`font-extrabold text-xs shrink-0 ${
                    tx.isCredit ? "text-emerald-600" : "text-slate-900"
                  }`}
                >
                  {tx.amount}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-orange-600">{tx.source}</span>
                  <span className="text-slate-300">•</span>
                  <span>{tx.date}</span>
                </div>
                <span className="text-[10px] font-bold uppercase text-emerald-600">
                  {tx.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
