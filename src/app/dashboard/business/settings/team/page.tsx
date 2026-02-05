"use client";

import { useState } from "react";
import { 
    Users, 
    UserPlus, 
    Shield, 
    Mail, 
    MoreVertical, 
    Trash2, 
    Edit2, 
    CheckCircle2,
    XCircle,
    Search,
    Filter,
    ArrowLeft
} from "lucide-react";
import Link from "next/link";
import Modal from "@/app/component/Modal";

const ROLES = [
    { id: "admin", label: "Business Admin", desc: "Full access to all dashboard features and settings." },
    { id: "finance", label: "Finance Manager", desc: "Access to revenue, payouts, and financial reports." },
    { id: "operations", label: "Operations Lead", desc: "Manage event setup, sessions, and crowd control." },
    { id: "staff", label: "Redemption Staff", desc: "Limited access to scanner terminal and check-ins." },
    { id: "pos", label: "POS Operator", desc: "Access to the POS console for on-site sales." },
];

export default function TeamManagementPage() {
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
    const [team, setTeam] = useState([
        { id: 1, name: "Frank Doe", email: "frank@acmecorp.com", role: "Business Admin", status: "Active" },
        { id: 2, name: "Sarah Smith", email: "sarah@acmecorp.com", role: "Finance Manager", status: "Active" },
        { id: 3, name: "Michael Scott", email: "michael@acmecorp.com", role: "POS Operator", status: "Pending" },
    ]);

    const handleInvite = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const email = formData.get("email") as string;
        const role = formData.get("role") as string;
        
        setTeam([...team, { id: Date.now(), name: "Pending User", email, role, status: "Pending" }]);
        setIsInviteModalOpen(false);
    };

    const removeMember = (id: number) => {
        if (confirm("Are you sure you want to remove this team member?")) {
            setTeam(team.filter(m => m.id !== id));
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-4">
                    <Link href="/dashboard/business/settings" className="flex items-center gap-2 text-slate-500 hover:text-orange-600 font-bold transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Settings
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 mb-2 uppercase tracking-tight">Team & Permissions</h1>
                        <p className="text-slate-500 text-lg">Manage your organization's members and their access levels.</p>
                    </div>
                </div>
                <button 
                    onClick={() => setIsInviteModalOpen(true)}
                    className="px-8 py-4 bg-orange-600 text-white font-bold rounded-2xl hover:bg-orange-700 transition-all shadow-xl shadow-orange-600/20 flex items-center justify-center gap-2 uppercase tracking-widest text-xs"
                >
                    <UserPlus className="w-4 h-4" /> Invite Member
                </button>
            </div>

            {/* Role Definitions Quick View */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {ROLES.map((r) => (
                    <div key={r.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                        <div className="w-8 h-8 rounded-lg bg-slate-50 text-slate-400 flex items-center justify-center mb-3">
                            <Shield className="w-4 h-4" />
                        </div>
                        <p className="text-[10px] font-black text-slate-900 uppercase mb-1">{r.label}</p>
                        <p className="text-[10px] text-slate-400 leading-tight">{r.desc}</p>
                    </div>
                ))}
            </div>

            {/* Team Table */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/30">
                    <h2 className="text-xl font-bold text-slate-900">Active Organization Members</h2>
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input type="text" placeholder="Search by name or email..." className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-1 focus:ring-orange-500" />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-50">
                                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Member</th>
                                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Access Level</th>
                                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {team.map((member) => (
                                <tr key={member.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">
                                                {member.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900">{member.name}</p>
                                                <p className="text-xs text-slate-400 font-medium">{member.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2">
                                            <Shield className="w-4 h-4 text-orange-500" />
                                            <span className="text-sm font-bold text-slate-700">{member.role}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                            member.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                                        }`}>
                                            {member.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 hover:bg-white text-slate-400 hover:text-orange-600 rounded-lg border border-transparent hover:border-slate-200 transition-all">
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => removeMember(member.id)} className="p-2 hover:bg-white text-slate-400 hover:text-red-600 rounded-lg border border-transparent hover:border-slate-200 transition-all">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Invite Modal */}
            <Modal isOpen={isInviteModalOpen} onClose={() => setIsInviteModalOpen(false)} title="Invite Team Member">
                <form onSubmit={handleInvite} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input name="email" type="email" required placeholder="colleague@acmecorp.com" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500 font-medium" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Assign Role</label>
                        <select name="role" className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500 font-bold">
                            {ROLES.map(r => <option key={r.id}>{r.label}</option>)}
                        </select>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                        <p className="text-xs text-blue-800 leading-relaxed font-medium">
                            An invitation link will be sent to this email. The user must complete their profile registration to activate their dashboard access.
                        </p>
                    </div>

                    <div className="pt-4">
                        <button type="submit" className="w-full py-4 bg-orange-600 text-white font-bold rounded-2xl hover:bg-orange-700 transition-all shadow-lg shadow-orange-200 uppercase tracking-widest text-xs">
                            Send Invitation
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
