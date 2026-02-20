"use client";

import Link from "next/link";
import type { Property } from "@/data/properties";
import { propertyTypeLabels } from "@/data/properties";
import ImageCarousel from "./ImageCarousel";

interface PropertyListCardProps {
  property: Property;
}

export default function PropertyListCard({ property }: PropertyListCardProps) {
  const allImages = [property.image, ...property.gallery];
  const typeLabel = propertyTypeLabels[property.type];
  const statusLabel = property.status === "venta" ? "En venta" : "En renta";

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Hola, me interesa la propiedad "${property.title}" en ${property.address}.`
    );
    window.open(`https://wa.me/5215500000000?text=${text}`, "_blank");
  };

  const handleEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Interés en: ${property.title}`);
    const body = encodeURIComponent(
      `Hola, me interesa la propiedad "${property.title}" ubicada en ${property.address}. ¿Podrían darme más información?`
    );
    window.open(`mailto:info@inmo.com?subject=${subject}&body=${body}`, "_self");
  };

  return (
    <article className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col sm:flex-row h-auto sm:h-[220px]">
        {/* Image carousel — left side 35% */}
        <div className="w-full sm:w-[35%] h-[200px] sm:h-full flex-shrink-0 relative">
          <ImageCarousel images={allImages} alt={property.title} />
        </div>

        {/* Content — right side 65% */}
        <div className="flex-1 p-5 flex flex-col">
          {/* Type & Status badge */}
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">
              {typeLabel} · {statusLabel}
            </span>
            <span className="ml-auto text-lg font-bold text-blue-600">
              {property.price}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900 leading-snug">
            {property.title}
          </h3>

          {/* Characteristics */}
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
            {property.square_meters > 0 && (
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V6a2 2 0 012-2h12a2 2 0 012 2v2M4 8v10a2 2 0 002 2h12a2 2 0 002-2V8M4 8h16" /></svg>
                {property.square_meters} m²
              </span>
            )}
            {property.bedrooms > 0 && (
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4" /></svg>
                {property.bedrooms} rec.
              </span>
            )}
            {property.bathrooms > 0 && (
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                {property.bathrooms} baños
              </span>
            )}
            {property.parking > 0 && (
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10m10 0H3m10 0h2m4 0a1 1 0 001-1v-4a1 1 0 00-.76-.97l-2-1A1 1 0 0016 9h-3v7m4 0H13" /></svg>
                {property.parking} est.
              </span>
            )}
          </div>

          {/* Address */}
          <p className="text-sm text-gray-400 mt-1 truncate">{property.address}</p>

          {/* Description */}
          <p className="text-sm text-gray-500 mt-2 line-clamp-2 leading-relaxed flex-1">
            {property.description}
          </p>

          {/* Action buttons */}
          <div className="flex items-center gap-3 mt-3">
            <Link
              href={`/propiedad/${property.id}`}
              className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors mr-auto"
            >
              Ver detalles
            </Link>
            <button
              onClick={handleWhatsApp}
              className="flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium text-white bg-green-500 hover:bg-green-600 rounded-lg transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </button>
            <button
              onClick={handleEmail}
              className="flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              Contactar
            </button>
          </div>
        </div>
      </article>
  );
}
