import { prisma } from "@/lib/prisma";
import { propertyTypeLabels } from "@/data/properties";
import type { PropertyType } from "@/data/properties";
import { notFound } from "next/navigation";
import Link from "next/link";
import ImageGallery from "@/components/ImageGallery";
import PropertyMapWrapper from "@/components/PropertyMapWrapper";
import ContactForm from "@/components/ContactForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PropertyDetailPage({ params }: Props) {
  const { id } = await params;
  const property = await prisma.properties.findUnique({
    where: { id: Number(id) },
  });

  if (!property || !property.active) {
    notFound();
  }

  const typeLabel = propertyTypeLabels[property.type as PropertyType];
  const statusLabel = property.status === "venta" ? "En venta" : "En renta";

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Volver al inicio
      </Link>

      {/* Image gallery — full width */}
      <ImageGallery
        mainImage={property.image}
        gallery={property.gallery}
        alt={property.address}
      />

      {/* Two-column layout */}
      <div className="flex flex-col lg:flex-row gap-8 mt-2">
        {/* Left column — Property details (70%) */}
        <div className="w-full lg:w-[70%] flex flex-col gap-4">
          {/* Type/Status + Characteristics */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="text-sm font-medium text-blue-600 uppercase tracking-wide">
              {typeLabel} · {statusLabel}
            </span>
            <span className="hidden sm:block w-px h-4 bg-gray-300" />
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V6a2 2 0 012-2h12a2 2 0 012 2v2M4 8v10a2 2 0 002 2h12a2 2 0 002-2V8M4 8h16" /></svg>
                {property.square_meters} m²
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4" /></svg>
                {property.bedrooms} rec.
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                {property.bathrooms} baños
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10m10 0H3m10 0h2m4 0a1 1 0 001-1v-4a1 1 0 00-.76-.97l-2-1A1 1 0 0016 9h-3v7m4 0H13" /></svg>
                {property.parking} est.
              </span>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900">{property.address}</h1>

          <p className="text-2xl font-bold text-blue-600">{property.price}</p>

          {/* Map */}
          <div className="mt-2">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Ubicación</h2>
            <PropertyMapWrapper
              lat={property.lat}
              lng={property.lng}
              address={property.address}
            />
          </div>

          <hr className="my-4" />

          <p className="text-gray-600 leading-relaxed">
            Detalles adicionales de la propiedad estarán disponibles próximamente.
            Contáctanos para más información sobre esta propiedad.
          </p>
        </div>

        {/* Right column — Contact form (30%) */}
        <aside className="w-full lg:w-[30%]">
          <ContactForm propertyAddress={property.address} />
        </aside>
      </div>
    </div>
  );
}

// Dynamic rendering — data comes from the database
export const dynamic = "force-dynamic";
