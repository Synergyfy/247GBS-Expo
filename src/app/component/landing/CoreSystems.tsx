import { Store, Gift, Wallet, Network, QrCode, MessageSquare } from "lucide-react";

const features = [
  {
    name: "Business Expo Stands",
    description: "Your permanent digital storefront. Showcase products, run live demos, and capture leads 24/7.",
    icon: Store,
    color: "bg-blue-500",
  },
  {
    name: "Reward Engine",
    description: "Earn points for every interaction. Visiting, sharing, and buying all generate value.",
    icon: Gift,
    color: "bg-pink-500",
  },
  {
    name: "Digital Wallet",
    description: "A secure integrated wallet to store your earnings, rewards, and manage transactions seamlessly.",
    icon: Wallet,
    color: "bg-purple-500",
  },
  {
    name: "Network & Referrals",
    description: "Grow your influence. Our built-in network system tracks referrals and pays you for growth.",
    icon: Network,
    color: "bg-green-500",
  },
  {
    name: "Smart QR Codes",
    description: "Bridge the physical and digital worlds. Scan to visit booths, join groups, or claim rewards instantly.",
    icon: QrCode,
    color: "bg-orange-500",
  },
  {
    name: "Community Groups",
    description: "Every business has a community. Join groups, chat directly, and build long-term trust.",
    icon: MessageSquare,
    color: "bg-indigo-500",
  },
];

export default function CoreSystems() {
  return (
    <section id="systems" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-orange-600 font-bold tracking-wide uppercase text-sm mb-3">
            The Infrastructure of Growth
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
            More Than Just a Website.<br />
            A Complete <span className="text-orange-600">Digital Economy</span>.
          </h3>
          <p className="text-lg text-slate-600 leading-relaxed">
            We provide the tools for businesses to thrive and customers to earn. 
            All systems are interconnected to create a seamless experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="group bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-orange-200 relative overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-transparent to-slate-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110`} />
              
              <div className={`w-14 h-14 rounded-xl ${feature.color} bg-opacity-10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`w-7 h-7 ${feature.color.replace('bg-', 'text-')}`} />
              </div>
              
              <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#D41A5C] transition-colors">
                {feature.name}
              </h4>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
