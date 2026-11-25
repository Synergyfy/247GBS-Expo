"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    Truck,
    CheckCircle2,
    Clock,
    Search,
    ChevronDown,
    ArrowLeft,
    ExternalLink,
    ShoppingBag,
    Package,
    RefreshCw,
} from "lucide-react";
import Modal from "@/app/component/Modal";

export default function OrderFulfilmentPage() {
    const [activeFilter, setActiveFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedOrder, setSelectedOrder] = useState<any>(null);
    const [showAutomation, setShowAutomation] = useState(false);

    const [orders, setOrders] = useState([
        {
            id: "#ORD-7829",
            customer: "Alice Thompson",
            email: "alice.t@example.com",
            items: "2x Smart Home Hub (Gen 4)",
            total: "£259.98",
            status: "Processing",
            type: "MCOM Delivery",
            date: "2h ago",
            address: "142B Baker Street, London, NW1 6XE",
            tracking: "",
        },
        {
            id: "#ORD-7825",
            customer: "Mark Evans",
            email: "mark.evans@techcorp.co.uk",
            items: "1x Enterprise Cloud Suite (1-Yr)",
            total: "£499.00",
            status: "Completed",
            type: "Digital Key",
            date: "5h ago",
            address: "Instant Digital Delivery",
            tracking: "DIGI-9920-XLA",
        },
        {
            id: "#ORD-7819",
            customer: "Sarah Jenkins",
            email: "s.jenkins@designstudio.io",
            items: "1x Ergonomic Mesh Chair, 1x Desk Mat",
            total: "£345.50",
            status: "Shipped",
            type: "MCOM Delivery",
            date: "1d ago",
            address: "22 Victoria Road, Manchester, M1 2AB",
            tracking: "DPD-88392019",
        },
        {
            id: "#ORD-7812",
            customer: "David Kwame",
            email: "david@kwameventures.com",
            items: "3x Wireless Charging Pad",
            total: "£89.97",
            status: "Pending",
            type: "Booth Collection",
            date: "1d ago",
            address: "Collect at Booth #B-42",
            tracking: "PIN: 4829",
        },
    ]);

    const filteredOrders = orders.filter((o) => {
        const matchesTab = activeFilter === "all" || o.status.toLowerCase() === activeFilter.toLowerCase();
        const matchesSearch =
            o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            o.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
            o.items.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });

    const handleMarkShipped = (id: string) => {
        setOrders(
            orders.map((o) =>
                o.id === id ? { ...o, status: "Shipped", tracking: o.tracking || "MCOM-TRK-9021" } : o
            )
        );
        setSelectedOrder(null);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Completed":
                return "text-emerald-600";
            case "Shipped":
                return "text-blue-600";
            case "Processing":
                return "text-orange-600";
            default:
                return "text-amber-600";
        }
    };

    return (
        <div className="space-y-5 pb-12">
            {/* Compact Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-slate-200/80">
                <div>
                    <Link
                        href="/dashboard/business/products"
                        className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-500 hover:text-orange-600 uppercase tracking-wider mb-1 transition-colors"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" /> Back to MCOM Products
                    </Link>
                    <h1 className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900 tracking-tight uppercase">
                        Order Fulfilment & MCOM Dispatch
                    </h1>
                    <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
                        Track MCOM Mall checkout orders, digital keys, and physical dispatch queues.
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <Link
                        href="/dashboard/business/products/redemption"
                        className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-[11px] font-bold uppercase tracking-wider hover:border-orange-500 hover:text-orange-600 transition-all"
                    >
                        Voucher Redemptions
                    </Link>
                </div>
            </div>

            {/* Horizontal-Scroll KPI Strip */}
            <div>
                <div className="flex lg:grid lg:grid-cols-4 gap-2.5 sm:gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 pb-1">
                    {[
                        { label: "Total Orders", value: "148", sub: "Last 30 days", icon: ShoppingBag, color: "text-orange-600" },
                        { label: "Awaiting Dispatch", value: "12", sub: "Action required", icon: Clock, color: "text-amber-600" },
                        { label: "In Transit", value: "34", sub: "Via MCOM Logistics", icon: Truck, color: "text-blue-600" },
                        { label: "Fulfilled", value: "102", sub: "98.4% on-time rate", icon: CheckCircle2, color: "text-emerald-600" },
                    ].map((stat, i) => (
                        <div
                            key={i}
                            className="w-[42%] min-w-[144px] sm:w-[190px] lg:w-auto shrink-0 snap-start bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200/80 shadow-sm"
                        >
                            <div className="flex items-center justify-between gap-1.5 mb-1">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 truncate">
                                    {stat.label}
                                </span>
                                <stat.icon className={`w-3.5 h-3.5 shrink-0 ${stat.color}`} />
                            </div>
                            <p className="text-base sm:text-xl font-extrabold text-slate-900 tracking-tight">
                                {stat.value}
                            </p>
                            <p className="text-[10px] text-slate-500 font-medium mt-0.5 truncate">{stat.sub}</p>
                        </div>
                    ))}
                </div>
                <div className="flex items-center justify-center gap-1.5 mt-1.5 lg:hidden">
                    <span className="w-4 h-1 rounded-full bg-orange-600" />
                    <span className="w-1.5 h-1 rounded-full bg-slate-300" />
                    <span className="w-1.5 h-1 rounded-full bg-slate-300" />
                </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 pb-1 sm:pb-0">
                    {["all", "Processing", "Pending", "Shipped", "Completed"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveFilter(tab)}
                            className={`px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider whitespace-nowrap shrink-0 transition-all ${
                                activeFilter === tab
                                    ? "bg-orange-600 text-white shadow-sm"
                                    : "bg-white border border-slate-200 text-slate-600 hover:border-slate-300"
                            }`}
                        >
                            {tab === "all" ? "All Orders" : tab}
                        </button>
                    ))}
                </div>

                <div className="relative w-full sm:w-64">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Search order ID, buyer, item..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-orange-500"
                    />
                </div>
            </div>

            {/* Clean 3-Line Order List */}
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm divide-y divide-slate-100">
                {filteredOrders.map((order) => (
                    <div
                        key={order.id}
                        className="p-3.5 sm:p-4 hover:bg-slate-50/70 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                        <div className="min-w-0 flex-1 space-y-1">
                            {/* Line 1: Metadata & Colored Status */}
                            <div className="flex items-center justify-between sm:justify-start gap-2 text-[10px] font-bold uppercase tracking-wider">
                                <div className="flex items-center gap-1.5 truncate">
                                    <span className="text-slate-900 font-extrabold">{order.id}</span>
                                    <span className="text-slate-300">•</span>
                                    <span className="text-slate-500">{order.type}</span>
                                    <span className="text-slate-300">•</span>
                                    <span className="text-slate-400">{order.date}</span>
                                </div>
                                <span className={`shrink-0 ${getStatusColor(order.status)}`}>{order.status}</span>
                            </div>

                            {/* Line 2: Buyer & Items */}
                            <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                                {order.customer} — <span className="font-semibold text-slate-600">{order.items}</span>
                            </p>

                            {/* Line 3: Address & Total */}
                            <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5 text-[11px] text-slate-500">
                                <span className="truncate">{order.address}</span>
                                <span className="font-extrabold text-slate-900">{order.total}</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 shrink-0">
                            <button
                                onClick={() => setSelectedOrder(order)}
                                className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-[11px] font-bold uppercase tracking-wider hover:bg-orange-600 transition-colors"
                            >
                                Manage Order
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Collapsible MCOM Logistics Sync Card */}
            <div className="bg-slate-900 text-white rounded-xl overflow-hidden border border-slate-800">
                <button
                    onClick={() => setShowAutomation(!showAutomation)}
                    className="w-full p-3.5 sm:p-4 flex items-center justify-between text-left"
                >
                    <div className="flex items-center gap-2.5 min-w-0">
                        <RefreshCw className="w-4 h-4 text-orange-400 shrink-0" />
                        <div className="min-w-0">
                            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider truncate">
                                MCOM Mall Fulfilment Bridge
                            </h3>
                            <p className="text-[11px] text-slate-400 truncate">
                                Orders placed via your booth&apos;s MCOM Mall &quot;Buy Now&quot; links sync automatically.
                            </p>
                        </div>
                    </div>
                    <ChevronDown
                        className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                            showAutomation ? "rotate-180" : ""
                        }`}
                    />
                </button>
                {showAutomation && (
                    <div className="px-3.5 pb-4 sm:px-4 pt-2 border-t border-slate-800 space-y-2.5 text-xs text-slate-300">
                        <p>
                            • <strong className="text-white">Direct MCOM Checkout:</strong> Physical shipments are automatically routed to your connected MCOM Mall courier account.
                        </p>
                        <p>
                            • <strong className="text-white">Digital Licences:</strong> Instant download keys are dispatched by email as soon as payment clears.
                        </p>
                    </div>
                )}
            </div>

            {/* Order Detail Modal */}
            <Modal
                isOpen={!!selectedOrder}
                onClose={() => setSelectedOrder(null)}
                title={`Order ${selectedOrder?.id || ""}`}
            >
                {selectedOrder && (
                    <div className="space-y-4">
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1.5 text-xs">
                            <div className="flex justify-between">
                                <span className="text-slate-500 font-medium">Customer:</span>
                                <span className="font-bold text-slate-900">{selectedOrder.customer}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500 font-medium">Items:</span>
                                <span className="font-bold text-slate-900">{selectedOrder.items}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500 font-medium">Total Paid:</span>
                                <span className="font-extrabold text-orange-600">{selectedOrder.total}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500 font-medium">Destination:</span>
                                <span className="font-semibold text-slate-700">{selectedOrder.address}</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-2">
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="px-3.5 py-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
                            >
                                Close
                            </button>
                            {selectedOrder.status !== "Shipped" && selectedOrder.status !== "Completed" && (
                                <button
                                    onClick={() => handleMarkShipped(selectedOrder.id)}
                                    className="px-4 py-2 rounded-lg bg-orange-600 text-white text-xs font-bold uppercase tracking-wider hover:bg-orange-700"
                                >
                                    Mark Dispatched
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}
