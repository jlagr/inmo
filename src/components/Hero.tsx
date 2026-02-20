interface HeroProps {
  onContactClick?: () => void;
}

export default function Hero({ onContactClick }: HeroProps) {
  return (
    <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster="/images/hero.jpg"
        >
          <source src="/images/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Encuentra tu hogar ideal
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8">
          Descubre las mejores propiedades en venta y renta. Tu próximo hogar te
          está esperando.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/propiedades"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium text-lg hover:bg-blue-700 transition-colors"
          >
            Ver propiedades
          </a>
          <button
            onClick={onContactClick}
            className="bg-white/20 backdrop-blur-sm text-white border border-white/40 px-8 py-3 rounded-lg font-medium text-lg hover:bg-white/30 transition-colors cursor-pointer"
          >
            Contactar asesor
          </button>
        </div>
      </div>
    </section>
  );
}
