export interface BusinessProduct {
  name: string;
  description: string;
  price: string;
  image: string;
  buttonLabel: string;
}

export interface Business {
  id: string;
  name: string;
  owner: string;
  email: string;
  cac: string;
  status: "Standard" | "Verified" | "Premium";
  dateSynced: string;
  revenue: string;
  eventsHeld: number;
  location: string;
  suspended?: boolean;
  tagline?: string;
  description?: string;
  boothNumber?: string;
  banner?: string;
  phone?: string;
  website?: string;
  products?: BusinessProduct[];
}

export const INITIAL_BUSINESSES: Business[] = [
  {
    id: "biz_1",
    name: "TechGlobal Solutions Ltd",
    owner: "Abiodun Okoro",
    email: "contact@techglobal.com",
    cac: "RC-1234567",
    status: "Premium",
    dateSynced: "2026-01-15",
    revenue: "£1.2M",
    eventsHeld: 14,
    location: "Lagos, Nigeria",
    boothNumber: "Booth A-101",
    tagline: "Enterprise cloud deployment, automated data pipelines, and pan-African digital infrastructure.",
    description: "TechGlobal Solutions Ltd is a tier-1 technology provider enabling high-velocity financial connectivity and cloud synchronization across sub-Saharan Africa. Certified Companies House entity with active MCOM cross-border settlement.",
    banner: "/main_stage_banner.png",
    phone: "+234 803 123 4567",
    website: "https://techglobalsolutions.com",
    products: [
      {
        name: "Cloud Core Hub X1",
        description: "High-availability enterprise cloud router with automated failover and hardware encryption.",
        price: "£499.00",
        image: "/ideal.png",
        buttonLabel: "Order Pass"
      },
      {
        name: "Edge Guard Pro Node",
        description: "Zero-trust firewall appliance designed for distributed fintech branches and retail terminals.",
        price: "£199.00",
        image: "/main_stage_banner.png",
        buttonLabel: "Request Demo"
      }
    ]
  },
  {
    id: "biz_2",
    name: "Creative Wave Media",
    owner: "Sarah Jenkins",
    email: "sarah@creativewave.uk",
    cac: "UK-998877",
    status: "Verified",
    dateSynced: "2026-02-01",
    revenue: "£450k",
    eventsHeld: 5,
    location: "London, UK",
    boothNumber: "Booth B-204",
    tagline: "Immersive 3D virtual production, brand storytelling, and interactive spatial exhibition spaces.",
    description: "Creative Wave Media specializes in high-fidelity broadcast production, brand storytelling, and virtual exhibition pavilions for international summits. Recognized for cutting-edge WebGL interactive booths.",
    banner: "/hero.webp",
    phone: "+44 20 7946 0912",
    website: "https://creativewave.co.uk",
    products: [
      {
        name: "Spatial Stage VIP Suite",
        description: "Turnkey 3D virtual exhibition stage with multi-stream broadcast integration.",
        price: "£1,250.00",
        image: "/hero.webp",
        buttonLabel: "Reserve Suite"
      }
    ]
  },
  {
    id: "biz_3",
    name: "GreenEnergy Pro",
    owner: "Hans Miller",
    email: "info@greenpro.de",
    cac: "DE-443322",
    status: "Standard",
    dateSynced: "2026-02-10",
    revenue: "£890k",
    eventsHeld: 8,
    location: "Berlin, Germany",
    boothNumber: "Booth C-312",
    tagline: "Next-generation solar storage, grid-scale batteries, and sustainable energy efficiency systems.",
    description: "GreenEnergy Pro manufactures commercial battery cells and decentralized microgrid components certified for European regulatory compliance and industrial operations.",
    banner: "/main_stage_banner.png",
    phone: "+49 30 1234 5678",
    website: "https://greenenergypro.de",
    products: [
      {
        name: "Industrial PowerWall 50kW",
        description: "Modular lithium-iron-phosphate battery vault for commercial solar storage.",
        price: "£4,500.00",
        image: "/ideal.png",
        buttonLabel: "Inquire Now"
      }
    ]
  },
  {
    id: "biz_4",
    name: "Finest Retail Corp",
    owner: "Anita Desai",
    email: "admin@finestretail.in",
    cac: "IN-112233",
    status: "Premium",
    dateSynced: "2026-01-20",
    revenue: "£2.5M",
    eventsHeld: 22,
    location: "Mumbai, India",
    boothNumber: "Booth D-401",
    tagline: "Omnichannel luxury retail distribution, automated inventory fulfillment, and direct consumer commerce.",
    description: "Finest Retail Corp operates over 120 retail flagship locations and powers digital cross-border trade between South Asia, the GCC, and European retail distributors.",
    banner: "/hero.webp",
    phone: "+91 22 2345 6789",
    website: "https://finestretailcorp.com",
    products: [
      {
        name: "Global Trade Franchise Kit",
        description: "Complete retail franchising license package with direct supply chain access.",
        price: "£2,999.00",
        image: "/hero.webp",
        buttonLabel: "Partner Now"
      }
    ]
  }
];
