"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Loader2, CheckCircle2 } from "lucide-react";

export default function SettingsPage() {
    const [profile, setProfile] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const data = await api.get('/dashboard/business/settings/profile');
            setProfile(data);
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to load profile' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        setMessage({ type: '', text: '' });
        try {
            await api.patch('/dashboard/business/settings/profile', {
                user: {
                    name: profile.user.name,
                    email: profile.user.email
                },
                booth: {
                    name: profile?.booth?.name || ""
                }
            });
            setMessage({ type: 'success', text: 'Settings saved successfully' });
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message || 'Failed to save settings' });
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl">
            <h1 className="text-3xl font-bold text-slate-900 mb-8">Settings</h1>

            {message.text && (
                <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 border ${message.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-red-50 border-red-100 text-red-700'
                    }`}>
                    {message.type === 'success' && <CheckCircle2 className="w-5 h-5" />}
                    <span className="font-medium">{message.text}</span>
                </div>
            )}

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-slate-100">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Account Information</h3>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Company Name</label>
                            <input
                                type="text"
                                value={profile?.booth?.name || ''}
                                onChange={(e) => setProfile({ ...profile, booth: { ...profile.booth, name: e.target.value } })}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                            <input
                                type="email"
                                value={profile?.user?.email || ''}
                                onChange={(e) => setProfile({ ...profile, user: { ...profile.user, email: e.target.value } })}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>
                    </div>
                </div>

                <div className="p-8 border-b border-slate-100">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Notifications</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="font-medium text-slate-900">New Message Alerts</div>
                                <div className="text-sm text-slate-500">Get notified when a customer chats with you</div>
                            </div>
                            <div className="w-12 h-6 bg-orange-600 rounded-full relative cursor-pointer">
                                <div className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="font-medium text-slate-900">Daily Digest</div>
                                <div className="text-sm text-slate-500">Receive a daily summary of leads and views</div>
                            </div>
                            <div className="w-12 h-6 bg-slate-200 rounded-full relative cursor-pointer">
                                <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-8 bg-slate-50 flex justify-end gap-4">
                    <button className="text-slate-500 font-bold px-6 py-3 hover:text-slate-700">Cancel</button>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="bg-orange-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 shadow-lg flex items-center gap-2"
                    >
                        {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}
