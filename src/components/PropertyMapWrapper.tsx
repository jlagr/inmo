"use client";

import dynamic from "next/dynamic";

const PropertyMap = dynamic(() => import("@/components/PropertyMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] rounded-xl bg-gray-100 animate-pulse flex items-center justify-center text-gray-400">
      Cargando mapa…
    </div>
  ),
});

interface PropertyMapWrapperProps {
  lat: number;
  lng: number;
  address: string;
}

export default function PropertyMapWrapper({
  lat,
  lng,
  address,
}: PropertyMapWrapperProps) {
  return <PropertyMap lat={lat} lng={lng} address={address} />;
}
