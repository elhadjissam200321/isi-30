import Image from "next/image"

export default function AlumniCarousel({ companies = [] }: { companies?: any[] }) {
  // Duplicate for seamless loop
  const TRACK = [...companies, ...companies]
  return (
    <section className="py-16 bg-white border-y border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <span className="text-accent text-sm font-semibold uppercase tracking-widest block mb-2">
          Nos alumni
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground text-balance">
          Nos alumni travaillent dans les plus grandes entreprises
        </h2>
        <p className="text-muted-foreground mt-3 max-w-lg mx-auto leading-relaxed">
          Le Master ISI prépare ses étudiants à intégrer des structures de premier plan à l'échelle nationale et internationale.
        </p>
      </div>

      {/* Carousel track */}
      <div className="relative w-full overflow-hidden">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, white, transparent)" }} />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, white, transparent)" }} />

        <div className="alumni-carousel-track flex items-center">
          {TRACK.map((company, idx) => (
            <div
              key={`${company.name}-${idx}`}
              className="alumni-carousel-item flex-shrink-0 flex items-center justify-center mx-6 group"
              style={{ width: "180px", height: "72px" }}
            >
              <div className="w-full h-full flex items-center justify-center opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-400 cursor-default">
                <Image
                  src={company.logo}
                  alt={company.name}
                  width={140}
                  height={60}
                  className="max-w-[140px] max-h-[50px] object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .alumni-carousel-track {
          animation: alumni-scroll 28s linear infinite;
          width: max-content;
        }
        .alumni-carousel-track:hover {
          animation-play-state: paused;
        }
        @keyframes alumni-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}} />
    </section>
  )
}
