"use client";

export default function MessagesPage() {
    return (
        <div className="h-[calc(100vh-8rem)] bg-white rounded-2xl border border-slate-200 shadow-sm flex overflow-hidden">

            {/* Sidebar List */}
            <div className="w-80 border-r border-slate-200 flex flex-col">
                <div className="p-4 border-b border-slate-100">
                    <input type="text" placeholder="Search messages..." className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-orange-500" />
                </div>

                <div className="flex-1 overflow-y-auto">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className={`p-4 border-b border-slate-50 cursor-pointer hover:bg-slate-50 transition-colors ${i === 1 ? 'bg-orange-50 border-orange-100' : ''}`}>
                            <div className="flex justifies-between items-start mb-1">
                                <div className="font-bold text-slate-900 text-sm">John Buyer</div>
                                <span className="text-xs text-slate-400 ml-auto">2m ago</span>
                            </div>
                            <p className="text-xs text-slate-500 line-clamp-2">Hi, I'm interested in the bulk pricing for the Premium Watch Series...</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-slate-50/50">

                {/* Header */}
                <div className="p-4 bg-white border-b border-slate-200 flex justify-between items-center">
                    <div>
                        <h3 className="font-bold text-slate-900">John Buyer</h3>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                            <span className="text-xs text-slate-500">Online now</span>
                        </div>
                    </div>
                    <button className="text-sm font-medium text-orange-600 border border-orange-200 px-3 py-1.5 rounded-lg hover:bg-orange-50">View Profile</button>
                </div>

                {/* Messages */}
                <div className="flex-1 p-6 overflow-y-auto space-y-4">
                    <div className="flex justify-end">
                        <div className="bg-orange-600 text-white px-4 py-3 rounded-2xl rounded-tr-sm max-w-[80%] text-sm shadow-md">
                            Hello! Thanks for visiting our booth. How can I help you today?
                        </div>
                    </div>
                    <div className="flex justify-start">
                        <div className="bg-white border border-slate-200 text-slate-700 px-4 py-3 rounded-2xl rounded-tl-sm max-w-[80%] text-sm shadow-sm">
                            Hi, I'm interested in the bulk pricing for the Premium Watch Series. Do you have a wholesale catalog?
                        </div>
                    </div>
                </div>

                {/* Input */}
                <div className="p-4 bg-white border-t border-slate-200">
                    <div className="flex gap-2">
                        <input type="text" placeholder="Type a message..." className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-orange-500" />
                        <button className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800">
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
