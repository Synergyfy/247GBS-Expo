export interface PassPlan {
    id: string;
    name: string;
    price: number;
    description: string;
    features: string[];
    popular: boolean;
    type: 'visitor' | 'business';
}

export const PASS_PLANS: PassPlan[] = [
    {
        id: "annual_visitor_pass",
        name: "Annual All-Access Pass",
        price: 75,
        description: "Best value. Entry to all 4 seasons in 2026. Includes 24/7 lobby access.",
        features: ["4 Seasons Entry", "VIP Lounge Access", "Priority Queue", "Premium Rewards"],
        popular: true,
        type: 'visitor'
    },
    {
        id: "annual_business_pass",
        name: "Annual All-Access Pass",
        price: 75,
        description: "Mandatory platform entry pass. Entry to all seasons in 2026. Includes 24/7 lobby access.",
        features: ["All Seasons Entry", "VIP Lounge Access", "Priority Queue", "Premium Rewards"],
        popular: true,
        type: 'business'
    }
];
