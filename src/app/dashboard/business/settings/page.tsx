"use client";

export default function SettingsPage() {
    return (
        <div className="max-w-4xl">
            <h1 className="text-3xl font-bold text-slate-900 mb-8">Settings</h1>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-slate-100">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Account Information</h3>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Company Name</label>
                            <input type="text" defaultValue="Acme Corp" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                            <input type="email" defaultValue="admin@acmecorp.com" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 outline-none" />
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
                    <button className="bg-orange-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 shadow-lg">Save Changes</button>
                </div>
            </div>
        </div>
    );
}
