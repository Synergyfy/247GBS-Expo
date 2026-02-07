import Image from "next/image";
import Link from "next/link";

export default function StatsSection() {
  return (
    <section className="relative py-20 md:py-24 overflow-visible bg-white">
      {/* Slanted Background Container */}
      <div 
        className="absolute inset-0 bg-orange-600 z-0 transform -skew-y-2 origin-center scale-x-110 md:scale-x-105"
        style={{ width: '100vw', left: '50%', marginLeft: '-50vw' }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white space-y-6 lg:pr-12">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
                Experience the UK's Premier Digital Expo, <br />
                connecting businesses 24/7.
              </h2>
              <p className="text-lg md:text-xl text-orange-50 max-w-xl font-medium">
                Discover the latest trends in technology, trade, and lifestyle with expert insights and innovative products to grow your business.
              </p>
            </div>

            {/* Stats Row */}
            <div className="flex flex-wrap items-start gap-8 md:gap-12 py-2">
              <div className="relative">
                <div className="text-4xl md:text-6xl font-black flex items-baseline">
                  2,500<span className="text-lime-400 text-2xl md:text-3xl ml-1">+</span>
                </div>
                <p className="text-xs md:text-sm font-bold uppercase tracking-wider text-orange-100 mt-1">Brands Exhibiting</p>
              </div>
              
              <div className="relative pl-6 border-l border-white/20">
                <div className="text-4xl md:text-6xl font-black flex items-baseline">
                  50<span className="text-lime-400 text-2xl md:text-3xl ml-1">k+</span>
                </div>
                <p className="text-xs md:text-sm font-bold uppercase tracking-wider text-orange-100 mt-1">Seasonal Visitors</p>
              </div>

              <div className="relative pl-6 border-l border-white/20">
                <div className="text-4xl md:text-6xl font-black flex items-baseline">
                  365
                </div>
                <div className="flex flex-col mt-1">
                  <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-lime-400">Days</span>
                  <span className="text-[10px] md:text-xs font-bold text-orange-100 uppercase">Of Innovation</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Link 
                href="/tickets" 
                className="px-8 py-3 bg-[#d81b60] hover:bg-[#ad1457] text-white font-black rounded-lg transition-all shadow-xl text-base md:text-lg uppercase tracking-tight"
              >
                Get your tickets
              </Link>
              <Link 
                href="/get-started" 
                className="px-8 py-3 bg-[#1a237e] hover:bg-[#0d47a1] text-white font-black rounded-lg transition-all shadow-xl text-base md:text-lg uppercase tracking-tight"
              >
                Find out more
              </Link>
            </div>
          </div>

          {/* Right Content - Couple Image */}
          <div className="relative flex justify-center lg:justify-end mt-8 lg:mt-0">
             <div className="relative w-full max-w-[450px] h-[400px] md:h-[500px] lg:h-[550px] -mb-28 md:-mb-32 lg:-mb-36 z-20">
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
