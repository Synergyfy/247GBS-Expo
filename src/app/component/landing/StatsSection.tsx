import Image from "next/image";
import Link from "next/link";

export default function StatsSection() {
  return (
    <section className="relative py-32 md:py-48 overflow-visible bg-white">
      {/* Slanted Background Container */}
      <div 
        className="absolute inset-0 bg-orange-600 z-0 transform -skew-y-3 origin-center scale-110 md:scale-105"
        style={{ width: '100vw', left: '50%', marginLeft: '-50vw' }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white space-y-8 lg:pr-12">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
                Experience the UK's Premier Digital Expo, <br />
                connecting businesses 24/7.
              </h2>
              <p className="text-lg md:text-xl text-orange-50 max-w-xl font-medium">
                Discover the latest trends in technology, trade, and lifestyle with expert insights and innovative products to grow your business.
              </p>
            </div>

            {/* Stats Row */}
            <div className="flex flex-wrap items-start gap-10 md:gap-16 py-4">
              <div className="relative">
                <div className="text-5xl md:text-7xl font-black flex items-baseline">
                  2,500<span className="text-lime-400 text-3xl md:text-4xl ml-1">+</span>
                </div>
                <p className="text-sm md:text-base font-bold uppercase tracking-wider text-orange-100 mt-2">Brands Exhibiting</p>
              </div>
              
              <div className="relative pl-8 border-l border-white/20">
                <div className="text-5xl md:text-7xl font-black flex items-baseline">
                  50<span className="text-lime-400 text-3xl md:text-4xl ml-1">k+</span>
                </div>
                <p className="text-sm md:text-base font-bold uppercase tracking-wider text-orange-100 mt-2">Seasonal Visitors</p>
              </div>

              <div className="relative pl-8 border-l border-white/20">
                <div className="text-5xl md:text-7xl font-black flex items-baseline">
                  365
                </div>
                <div className="flex flex-col mt-2">
                  <span className="text-sm md:text-base font-bold uppercase tracking-wider text-lime-400">Days</span>
                  <span className="text-xs md:text-sm font-bold text-orange-100 uppercase">Of Innovation</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-6">
              <Link 
                href="/tickets" 
                className="px-10 py-4 bg-[#d81b60] hover:bg-[#ad1457] text-white font-black rounded-lg transition-all shadow-xl text-lg uppercase tracking-tight"
              >
                Get your tickets
              </Link>
              <Link 
                href="/get-started" 
                className="px-10 py-4 bg-[#1a237e] hover:bg-[#0d47a1] text-white font-black rounded-lg transition-all shadow-xl text-lg uppercase tracking-tight"
              >
                Find out more
              </Link>
            </div>
          </div>

          {/* Right Content - Couple Image */}
          <div className="relative flex justify-center lg:justify-end mt-12 lg:mt-0">
             <div className="relative w-full max-w-[500px] h-[500px] md:h-[650px] -mb-48 md:-mb-64 lg:-mb-80 z-20">
                <Image 
                  src="/Creative-Couple-with-IHS-totes.webp"
                  alt="Couple experiencing the expo"
                  fill
                  className="object-contain object-bottom select-none pointer-events-none"
                  priority
                />
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
