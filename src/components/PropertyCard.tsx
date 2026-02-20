import Image from "next/image";
import Link from "next/link";
import type { Property } from "@/data/properties";
import { propertyTypeLabels } from "@/data/properties";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const typeLabel = propertyTypeLabels[property.type];
  const statusLabel = property.status === "venta" ? "En venta" : "En renta";

  return (
    <article className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
      {/* Image — 50% top */}
      <Link
        href={`/propiedad/${property.id}`}
        className="relative block w-full aspect-[4/3] overflow-hidden"
      >
        <Image
          src={property.image}
          alt={property.address}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </Link>

      {/* Info — 50% bottom */}
      <div className="p-4 flex flex-col flex-1">
        {/* Type & Status */}
        <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">
          {typeLabel} · {statusLabel}
        </span>

        {/* Address (2 lines) */}
        <h3 className="mt-1 text-base font-semibold text-gray-900 leading-snug line-clamp-2 min-h-[2.75rem]">
          {property.address}
        </h3>

        {/* Details: m², bedrooms, bathrooms */}
        <div className="mt-auto pt-3 flex items-center gap-[10px] text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V6a2 2 0 012-2h12a2 2 0 012 2v2M4 8v10a2 2 0 002 2h12a2 2 0 002-2V8M4 8h16" />
            </svg>
            {property.square_meters} m²
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4" />
            </svg>
            {property.bedrooms} rec.
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {property.bathrooms} baños
          </span>
        </div>
      </div>
    </article>
  );
}
