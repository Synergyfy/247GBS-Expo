"use client";

import React, { useState, useEffect } from "react";
import { Award, Zap, Gift, CreditCard, TrendingUp, Star, ArrowRight, Clock, Loader2 } from "lucide-react";
import { api } from "@/lib/api";

// --- ICONS ---
const DownloadIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

const WalletIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
);

export default function RewardsPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [walletData, setWalletData] = useState<any>(null);
    const [rewardsInfo, setRewardsInfo] = useState<any>(null);
    const [isRedeeming, setIsRedeeming] = useState<string | null>(null);

    const handleRedeem = async (reward: any) => {
        setIsRedeeming(reward.id);
        try {
            const res = await api.post(`/customer/rewards/redeem`, { rewardId: reward.id });
            if (res.success) {
                alert(`Successfully redeemed: ${reward.title}!`);
                const walletRes = await api.get("/customer/wallet");
                if (walletRes.success) setWalletData(walletRes.data);
            } else {
                alert(`Failed to redeem: ${res.message || "Insufficient points."}`);
            }
        } catch (err) {
            alert("Error redeeming reward.");
        } finally {
            setIsRedeeming(null);
        }
    };

    useEffect(() => {
        const loadRewardsData = async () => {
            setIsLoading(true);
            try {
                const [walletRes, rewardsRes] = await Promise.all([
                    api.get("/customer/wallet"),
                    api.get("/customer/rewards")
                ]);
                if (walletRes.success) setWalletData(walletRes.data);
                if (rewardsRes.success) setRewardsInfo(rewardsRes.data);
            } catch (error) {
                console.error("Failed to load rewards data", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadRewardsData();
    }, []);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <Loader2 className="w-12 h-12 text-orange-600 animate-spin" />
                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Accessing vault...</p>
            </div>
        );
    }

    const transactions = walletData?.transactions || [];
    const { availableRewards, waysToEarn, tiers: rewardTiers } = rewardsInfo || {};

    return (
        <div className="max-w-6xl mx-auto space-y-10">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2 font-display">My Rewards & Orders</h1>
                <p className="text-slate-500">Track your purchases, manage your wallet, and unlock exclusive expo benefits.</p>
            </div>

            {/* REWARD SUMMARY CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Wallet Balance */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between h-full">
                    <div className="flex items-center gap-3 mb-4 text-orange-600">
                        <WalletIcon className="w-6 h-6" />
                        <span className="font-bold text-sm uppercase tracking-wider">Wallet Balance</span>
                    </div>
                    <div>
                        <span className="text-3xl font-black text-slate-900">£{(walletData?.cash || 0).toFixed(2)}</span>
                        <p className="text-xs text-slate-500 mt-1">Available for purchases</p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-100 flex gap-2">
                         <button className="flex-1 text-xs font-bold bg-orange-50 text-orange-700 py-2 rounded-lg hover:bg-orange-100 transition-colors">Top Up</button>
                         <button className="flex-1 text-xs font-bold bg-slate-50 text-slate-700 py-2 rounded-lg hover:bg-slate-100 transition-colors">Withdraw</button>
                    </div>
                </div>

                {/* Loyalty Points */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between h-full">
                    <div className="flex items-center gap-3 mb-4 text-purple-600">
                        <Award className="w-6 h-6" />
                        <span className="font-bold text-sm uppercase tracking-wider">Loyalty Points</span>
                    </div>
                    <div>
                        <span className="text-3xl font-black text-slate-900">{walletData?.points || 0}</span>
                        <p className="text-xs text-slate-500 mt-1">PTS Earned Lifetime</p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-100">
                         <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                             <div className="bg-purple-600 h-full w-[85%] rounded-full" />
                         </div>
                         <p className="text-[10px] text-right font-bold text-purple-600 mt-1">150 pts to Gold Tier</p>
                    </div>
                </div>

                {/* Cashback Earned */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between h-full">
                    <div className="flex items-center gap-3 mb-4 text-green-600">
                        <TrendingUp className="w-6 h-6" />
                        <span className="font-bold text-sm uppercase tracking-wider">Vouchers</span>
                    </div>
                    <div>
                        <span className="text-3xl font-black text-slate-900">£{(walletData?.vouchers || 0).toFixed(2)}</span>
                        <p className="text-xs text-slate-500 mt-1">Available Vouchers</p>
                    </div>
                     <div className="mt-4 pt-4 border-t border-slate-100">
                        <p className="text-xs text-slate-500">Next payout on <span className="font-bold text-slate-700">Feb 01</span></p>
                    </div>
                </div>
                
                 {/* Upgrade Credits */}
                 <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between h-full">
                    <div className="flex items-center gap-3 mb-4 text-blue-600">
                        <Zap className="w-6 h-6" />
                        <span className="font-bold text-sm uppercase tracking-wider">Upgrade Credits</span>
                    </div>
                    <div>
                        <span className="text-3xl font-black text-slate-900">{walletData?.credits || 0}</span>
                        <p className="text-xs text-slate-500 mt-1">Available Credits</p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-100">
                         <button className="w-full text-xs font-bold bg-blue-50 text-blue-700 py-2 rounded-lg hover:bg-blue-100 transition-colors">Redeem for Access</button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* REWARDS CENTER */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 lg:col-span-2">
                    <div className="flex items-center justify-between mb-8">
                         <div>
                            <h3 className="font-bold text-xl text-slate-900 flex items-center gap-2"><Star className="w-5 h-5 text-yellow-500 fill-yellow-500"/> Rewards Center</h3>
                            <p className="text-slate-500 text-sm">Redeem your points for exclusive benefits.</p>
                         </div>
                        <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold">Balance: {walletData?.points || 0} PTS</span>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {availableRewards?.map((reward: any) => (
                            <div key={reward.id} className="border border-slate-100 rounded-2xl p-5 hover:border-orange-200 hover:shadow-md transition-all group">
                                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-600 mb-4 group-hover:bg-orange-50 group-hover:text-orange-600 transition-colors">
                                    {reward.type === 'VOUCHER' ? <Gift className="w-5 h-5" /> : reward.type === 'UPGRADE' ? <Zap className="w-5 h-5" /> : <CreditCard className="w-5 h-5" />}
                                </div>
                                <h4 className="font-bold text-slate-900 text-sm mb-1">{reward.title}</h4>
                                <p className="text-xs text-slate-500 font-medium mb-4">{reward.cost} PTS</p>
                                <button 
                                    onClick={() => handleRedeem(reward)}
                                    disabled={isRedeeming === reward.id}
                                    className="w-full py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                                    {isRedeeming === reward.id ? "Processing..." : "Redeem"}
                                </button>
                            </div>
                        ))}
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-slate-100">
                        <h4 className="font-bold text-slate-900 text-sm mb-4">Ways to Earn Points</h4>
                        <div className="flex flex-wrap gap-3">
                            {waysToEarn?.map((way: any, idx: number) => (
                                <div key={idx} className="bg-slate-50 border border-slate-100 px-4 py-2 rounded-xl flex items-center gap-3">
                                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                                    <span className="text-sm font-medium text-slate-700">{way.action}</span>
                                    <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">{way.points}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* TIER PROGRESS */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white flex flex-col">
                     <div className="mb-6">
                        <h3 className="font-bold text-xl text-white mb-2">Member Status</h3>
                        <div className="flex items-center gap-2">
                            <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm">Silver Tier</span>
                            <span className="text-slate-400 text-xs">Since Jan 2026</span>
                        </div>
                     </div>
                     
                     <div className="flex-1 space-y-6">
                        {rewardTiers?.map((tier: any, idx: number) => (
                            <div key={idx} className={`relative pl-8 ${idx === 0 ? 'opacity-100' : 'opacity-50'}`}>
                                <div className={`absolute left-0 top-1 w-4 h-4 rounded-full border-2 border-white/20 ${idx === 0 ? 'bg-orange-500 border-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]' : 'bg-slate-700'}`} />
                                {idx !== rewardTiers.length - 1 && <div className="absolute left-[7px] top-6 w-0.5 h-12 bg-white/10" />}
                                <h4 className="font-bold text-white text-sm">{tier.name}</h4>
                                <p className="text-xs text-slate-400">{tier.points} PTS Required</p>
                            </div>
                        ))}
                     </div>
                     
                     <div className="mt-8 pt-6 border-t border-white/10">
                         <p className="text-xs text-slate-400 mb-4">Unlock <span className="text-yellow-400 font-bold">Gold Tier</span> benefits:</p>
                         <ul className="space-y-2">
                             <li className="text-xs flex items-center gap-2 text-white/80"><span className="w-1 h-1 bg-yellow-400 rounded-full"/> 1.5x Point Multiplier</li>
                             <li className="text-xs flex items-center gap-2 text-white/80"><span className="w-1 h-1 bg-yellow-400 rounded-full"/> Early Access to Tickets</li>
                         </ul>
                     </div>
                </div>
            </div>

            {/* TRANSACTION HISTORY (Updated) */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="font-bold text-xl text-slate-900">Activity History</h3>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 text-sm font-medium border border-slate-200 rounded-lg hover:bg-slate-50">Filter</button>
                        <button className="px-4 py-2 text-sm font-medium border border-slate-200 rounded-lg hover:bg-slate-50">Export</button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="border-b border-slate-100">
                            <tr>
                                <th className="pb-4 font-semibold text-slate-500 text-sm">Date</th>
                                <th className="pb-4 font-semibold text-slate-500 text-sm">Description</th>
                                <th className="pb-4 font-semibold text-slate-500 text-sm">Status</th>
                                <th className="pb-4 font-semibold text-slate-500 text-sm text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {transactions.map((tx: any, idx: number) => (
                                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="py-5 text-sm text-slate-600">{tx.date}</td>
                                    <td className="py-5">
                                        <div className="text-sm font-bold text-slate-900">{tx.desc}</div>
                                        <div className="text-[10px] text-slate-400 font-medium tracking-tight">REF: {tx.ref}</div>
                                    </td>
                                    <td className="py-5">
                                        <span className={`text-xs px-3 py-1 rounded-full font-bold ${tx.status === 'Completed' || tx.status === 'COMPLETED' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                                            {tx.status}
                                        </span>
                                    </td>
                                    <td className={`py-5 text-sm font-bold text-right ${tx.isCredit ? 'text-green-600' : 'text-slate-900'}`}>
                                        {tx.amount}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
