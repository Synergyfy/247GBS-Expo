"use client";

import { useState } from "react";
import { 
    Gift, 
    Plus, 
    Users, 
    CheckCircle2, 
    Clock, 
    AlertCircle, 
    ChevronRight, 
    Zap, 
    Ticket,
    Search,
    Download,
    Loader2,
    ShieldCheck,
    CreditCard,
    ArrowRight
} from "lucide-react";
import Modal from "@/app/component/Modal";

const BUNDLES = [
    { id: 1, name: "General Access Starter", qty: 50, price: 450, original: 750 },
    { id: 2, name: "VIP Pass Premium", qty: 100, price: 1200, original: 1900 },
    { id: 3, name: "Enterprise Exhibition", qty: 500, price: 4500, original: 7500 },
];

export default function BusinessRewardsPage() {
    const [bulkTickets, setBulkTickets] = useState(500);
    const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
    const [selectedBundle, setSelectedBundle] = useState(BUNDLES[1]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [purchaseStep, setPurchaseStep] = useState(1); // 1: Select, 2: Payment, 3: Success, 4: Allocation, 5: Allocation Success
    const [allocationData, setAllocationData] = useState({ emails: "", campaign: "None" });

    const handlePurchase = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setBulkTickets(prev => prev + selectedBundle.qty);
            setPurchaseStep(3);
        }, 2000);
    };

    const handleAllocate = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            const qty = allocationData.emails.split(",").filter(e => e.trim()).length || 10; // Mock count
            setBulkTickets(prev => Math.max(0, prev - qty));
            setPurchaseStep(5);
        }, 1500);
    };

    const resetModal = () => {
        setIsPurchaseModalOpen(false);
        setPurchaseStep(1);
        setAllocationData({ emails: "", campaign: "None" });
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">REWARDS & LOYALTY</h1>
                    <p className="text-slate-500">Distribute bulk tickets, manage loyalty campaigns, and track reward redemption.</p>
                </div>
                <button className="flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-700 shadow-lg shadow-orange-600/20 transition-all text-sm uppercase tracking-widest">
                    <Plus className="w-4 h-4" /> Launch Reward Campaign
                </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Active Rewards", val: "150", icon: <Zap />, color: "orange" },
                    { label: "Redeemed", val: "84", icon: <CheckCircle2 />, color: "emerald" },
                    { label: "Bulk Tickets", val: bulkTickets.toLocaleString(), icon: <Ticket />, color: "blue" },
                    { label: "Reach", val: "1.2K", icon: <Users />, color: "purple" },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                        <div className={`w-10 h-10 rounded-xl bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center mb-4`}>
                            {stat.icon}
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900">{stat.val}</h3>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mt-1">{stat.label}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Bulk Issuance Widget */}
                <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                    <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                        <h3 className="font-bold text-lg text-slate-900 uppercase tracking-tight">Active Campaigns</h3>
                        <div className="flex gap-2">
                            <button className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-orange-600 transition-colors"><Search className="w-5 h-5" /></button>
                            <button className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-orange-600 transition-colors"><Download className="w-5 h-5" /></button>
                        </div>
                    </div>
                    <div className="flex-1 overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Campaign Name</th>
                                    <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Type</th>
                                    <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Status</th>
                                    <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Progress</th>
                                    <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {[
                                    { name: "Early Bird VIP Giveaway", type: "Bulk Reward", status: "Active", progress: 65 },
                                    { name: "Loyalty Tier 3 Gift", type: "Automatic", status: "Scheduled", progress: 0 },
                                    { name: "Referral Bonus Tickets", type: "Referral", status: "Active", progress: 42 },
                                ].map((c, i) => (
                                    <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-8 py-5">
                                            <p className="text-sm font-bold text-slate-900">{c.name}</p>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Expires in 12 days</p>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="text-[10px] font-bold px-2 py-1 bg-slate-100 rounded-md text-slate-600 uppercase tracking-wider">{c.type}</span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-1.5 h-1.5 rounded-full ${c.status === 'Active' ? 'bg-emerald-500' : 'bg-orange-500'}`} />
                                                <span className="text-xs font-bold text-slate-700">{c.status}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="w-24">
                                                <div className="flex justify-between text-[10px] font-bold mb-1">
                                                    <span className="text-slate-400">{c.progress}%</span>
                                                </div>
                                                <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                                                    <div className="h-full bg-orange-500 rounded-full" style={{ width: `${c.progress}%` }} />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <button className="text-slate-300 group-hover:text-orange-600 transition-colors">
                                                <ChevronRight className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Bulk Purchase Card */}
                <div className="space-y-8">
                    <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-xl">
                        <div className="absolute top-0 right-0 p-6 opacity-10">
                            <Ticket className="w-32 h-32" />
                        </div>
                        <h3 className="text-xl font-bold mb-4 relative z-10">Bulk Purchase</h3>
                        <p className="text-sm text-slate-400 mb-8 relative z-10 leading-relaxed">
                            Buy discounted tickets in bulk to distribute as rewards to your loyal customers.
                        </p>
                        <div className="space-y-4 relative z-10">
                            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex justify-between items-center">
                                <div>
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{selectedBundle.name}</p>
                                    <p className="text-lg font-bold">{selectedBundle.qty} Tickets</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-orange-500 font-black text-xl">£{selectedBundle.price.toLocaleString()}</p>
                                    <p className="text-[10px] line-through text-slate-500">£{selectedBundle.original.toLocaleString()}</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => setIsPurchaseModalOpen(true)}
                                className="w-full py-4 bg-orange-600 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/20"
                            >
                                Buy Bundle
                            </button>
                        </div>
                    </div>

                    {/* Pro Tip */}
                    <div className="bg-orange-50 rounded-[2.5rem] border border-orange-100 p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center text-white">
                                <AlertCircle className="w-5 h-5" />
                            </div>
                            <h4 className="font-bold text-orange-900">Conversion Tip</h4>
                        </div>
                        <p className="text-xs text-orange-700 leading-relaxed font-medium mb-4">
                            Reward tickets have a **45% higher** attendee conversion rate than standard sales.
                        </p>
                        <button className="text-[10px] font-black text-orange-600 uppercase tracking-widest hover:underline">
                            Read Success Stories &rarr;
                        </button>
                    </div>
                </div>

            </div>

            {/* Bulk Purchase Modal */}
            <Modal isOpen={isPurchaseModalOpen} onClose={resetModal} title="Bulk Ticket Purchase">
                {purchaseStep === 1 && (
                    <div className="space-y-6">
                        <div className="text-center mb-6">
                            <p className="text-slate-500 text-sm">Select a ticket bundle to add to your reward balance.</p>
                        </div>
                        <div className="space-y-3">
                            {BUNDLES.map(bundle => (
                                <div 
                                    key={bundle.id}
                                    onClick={() => setSelectedBundle(bundle)}
                                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                                        selectedBundle.id === bundle.id ? "border-orange-600 bg-orange-50" : "border-slate-100 hover:border-orange-200"
                                    }`}
                                >
                                    <div>
                                        <p className="font-bold text-slate-900">{bundle.name}</p>
                                        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{bundle.qty} Tickets</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-orange-600 font-black">£{bundle.price}</p>
                                        <p className="text-[10px] line-through text-slate-400">£{bundle.original}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button 
                            onClick={() => setPurchaseStep(2)}
                            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-orange-600 transition-all mt-4 shadow-lg"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                )}

                {purchaseStep === 2 && (
                    <div className="space-y-6 text-center">
                        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CreditCard className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 uppercase">Confirm Order</h3>
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-left space-y-3">
                            <div className="flex justify-between text-sm font-medium">
                                <span className="text-slate-500">Bundle:</span>
                                <span className="text-slate-900">{selectedBundle.name}</span>
                            </div>
                            <div className="flex justify-between text-sm font-medium">
                                <span className="text-slate-500">Tickets:</span>
                                <span className="text-slate-900">{selectedBundle.qty}</span>
                            </div>
                            <div className="flex justify-between text-lg font-black border-t border-slate-200 pt-3">
                                <span className="text-slate-900">Total:</span>
                                <span className="text-orange-600">£{selectedBundle.price}</span>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button onClick={() => setPurchaseStep(1)} className="flex-1 py-4 border border-slate-200 text-slate-500 font-bold rounded-2xl uppercase tracking-widest text-xs hover:bg-slate-50 transition-all">Back</button>
                            <button 
                                onClick={handlePurchase}
                                disabled={isProcessing}
                                className="flex-1 py-4 bg-orange-600 text-white font-bold rounded-2xl uppercase tracking-widest text-xs hover:bg-orange-700 transition-all shadow-lg flex items-center justify-center gap-2"
                            >
                                {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : "Pay Now"}
                            </button>
                        </div>
                    </div>
                )}

                {purchaseStep === 3 && (
                    <div className="py-8 text-center space-y-6">
                        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                            <CheckCircle2 className="w-10 h-10" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black text-slate-900 uppercase">Purchase Success!</h3>
                            <p className="text-slate-500 mt-2">You have successfully added <span className="font-bold text-slate-900">{selectedBundle.qty} tickets</span> to your reward balance.</p>
                        </div>
                        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-3 text-left">
                            <ShieldCheck className="text-emerald-600 shrink-0" />
                            <p className="text-xs text-emerald-800 font-medium">These tickets are now ready to be <strong>converted to rewards</strong> or <strong>allocated</strong> to users.</p>
                        </div>
                        <div className="flex flex-col gap-2 pt-4">
                            <button 
                                onClick={() => setPurchaseStep(4)}
                                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-orange-600 transition-all flex items-center justify-center gap-2"
                            >
                                Allocate Tickets Now <ArrowRight className="w-4 h-4" />
                            </button>
                            <button 
                                onClick={resetModal}
                                className="w-full py-4 border border-slate-200 text-slate-500 font-bold rounded-2xl uppercase tracking-widest text-xs hover:bg-slate-50 transition-all"
                            >
                                Close Window
                            </button>
                        </div>
                    </div>
                )}

                {purchaseStep === 4 && (
                    <form onSubmit={handleAllocate} className="space-y-6">
                        <div className="text-center">
                            <h3 className="text-xl font-bold text-slate-900 uppercase">Allocate Bulk Tickets</h3>
                            <p className="text-sm text-slate-500">Assign your purchased tickets to users or specific campaigns.</p>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Recipient Emails (Comma separated)</label>
                            <textarea 
                                value={allocationData.emails}
                                onChange={(e) => setAllocationData({...allocationData, emails: e.target.value})}
                                placeholder="user1@example.com, user2@example.com..." 
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none resize-none min-h-[100px]"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Assign to Campaign</label>
                            <select 
                                value={allocationData.campaign}
                                onChange={(e) => setAllocationData({...allocationData, campaign: e.target.value})}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 font-bold"
                            >
                                <option>None (Direct Allocation)</option>
                                <option>Early Bird VIP Giveaway</option>
                                <option>Referral Bonus Tickets</option>
                            </select>
                        </div>

                        <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 flex items-center gap-3">
                            <Users className="text-blue-600 w-5 h-5 shrink-0" />
                            <p className="text-xs text-blue-800 font-medium">Available Balance: <span className="font-bold">{bulkTickets.toLocaleString()} Tickets</span></p>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <button type="button" onClick={() => setPurchaseStep(3)} className="flex-1 py-4 border border-slate-200 text-slate-500 font-bold rounded-2xl uppercase tracking-widest text-xs">Back</button>
                            <button 
                                type="submit"
                                disabled={isProcessing}
                                className="flex-1 py-4 bg-orange-600 text-white font-bold rounded-2xl uppercase tracking-widest text-xs hover:bg-orange-700 transition-all shadow-lg flex items-center justify-center gap-2"
                            >
                                {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : "Confirm Allocation"}
                            </button>
                        </div>
                    </form>
                )}

                {purchaseStep === 5 && (
                    <div className="py-8 text-center space-y-6">
                        <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Users className="w-10 h-10" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black text-slate-900 uppercase">Tickets Allocated!</h3>
                            <p className="text-slate-500 mt-2">The recipients will receive their access codes via email within 5 minutes.</p>
                        </div>
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-left">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Summary</p>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-slate-500">Recipients:</span>
                                <span className="text-slate-900 font-bold">{allocationData.emails.split(",").length} Users</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Campaign:</span>
                                <span className="text-slate-900 font-bold">{allocationData.campaign}</span>
                            </div>
                        </div>
                        <button 
                            onClick={resetModal}
                            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-orange-600 transition-all"
                        >
                            Return to Dashboard
                        </button>
                    </div>
                )}
            </Modal>
        </div>
    );
}
