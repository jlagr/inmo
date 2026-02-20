"use client";

import { useEffect, useState } from "react";
import type { Property } from "@/data/properties";
import PropertyCard from "./PropertyCard";

export default function RecommendedProperties() {
  const [recommended, setRecommended] = useState<Property[]>([]);

  useEffect(() => {
    fetch("/api/properties")
      .then((res) => res.json())
      .then((data: Property[]) => setRecommended(data.slice(0, 4)))
      .catch(console.error);
  }, []);

  if (recommended.length === 0) return null;

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Propiedades recomendadas
          </h2>
          <p className="mt-3 text-gray-500 text-lg">
            Seleccionamos las mejores opciones para ti
          </p>
        </div>

        {/* Cards grid — 4 columns on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommended.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* View all link */}
        <div className="text-center mt-10">
          <a
            href="/propiedades"
            className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 transition-colors"
          >
            Ver todas las propiedades
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
