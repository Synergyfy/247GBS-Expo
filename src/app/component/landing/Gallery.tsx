import Image from "next/image";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop",
    alt: "Main Exhibition Hall",
    span: "col-span-1 md:col-span-2 row-span-2"
  },
  {
    src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop",
    alt: "Networking Lounge",
    span: "col-span-1"
  },
  {
    src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop",
    alt: "Digital Booth Interface",
    span: "col-span-1"
  },
  {
    src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800&auto=format&fit=crop",
    alt: "Business Conference",
    span: "col-span-1"
  },
  {
    src: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop",
    alt: "Live Events",
    span: "col-span-1"
  }
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-[#D41A5C] font-bold tracking-wide uppercase text-sm mb-3">
            Experience the Expo
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold text-slate-900">
            A Glimpse Inside
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
          {galleryImages.map((image, i) => (
            <div 
              key={i} 
              className={`relative rounded-2xl overflow-hidden group ${image.span}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
