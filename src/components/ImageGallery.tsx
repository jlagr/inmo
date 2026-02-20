"use client";

import Image from "next/image";
import { useState, useCallback, useEffect } from "react";

interface ImageGalleryProps {
  mainImage: string;
  gallery: string[];
  alt: string;
}

export default function ImageGallery({
  mainImage,
  gallery,
  alt,
}: ImageGalleryProps) {
  const allImages = [mainImage, ...gallery];
  const [overlayIndex, setOverlayIndex] = useState<number | null>(null);

  const openOverlay = useCallback(
    (src: string) => {
      const idx = allImages.indexOf(src);
      setOverlayIndex(idx >= 0 ? idx : 0);
    },
    [allImages]
  );

  const closeOverlay = useCallback(() => {
    setOverlayIndex(null);
  }, []);

  const goNext = useCallback(() => {
    setOverlayIndex((prev) =>
      prev !== null ? (prev === allImages.length - 1 ? 0 : prev + 1) : null
    );
  }, [allImages.length]);

  const goPrev = useCallback(() => {
    setOverlayIndex((prev) =>
      prev !== null ? (prev === 0 ? allImages.length - 1 : prev - 1) : null
    );
  }, [allImages.length]);

  // Close on Escape, navigate with arrow keys
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeOverlay();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    if (overlayIndex !== null) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [overlayIndex, closeOverlay, goNext, goPrev]);

  return (
    <>
      {/* Gallery grid */}
      <div className="w-full h-[400px] rounded-xl overflow-hidden mb-8 flex gap-2">
        {/* Main image — 40% left */}
        <button
          onClick={() => openOverlay(mainImage)}
          className="relative w-[40%] h-full flex-shrink-0 cursor-pointer overflow-hidden rounded-l-xl"
        >
          <Image
            src={mainImage}
            alt={alt}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
            priority
            sizes="40vw"
          />
        </button>

        {/* Gallery grid — 60% right, 2x2 */}
        <div className="w-[60%] h-full grid grid-cols-2 grid-rows-2 gap-2">
          {gallery.slice(0, 4).map((img, index) => (
            <button
              key={index}
              onClick={() => openOverlay(img)}
              className={`relative w-full h-full cursor-pointer overflow-hidden ${
                index === 1 ? "rounded-tr-xl" : ""
              } ${index === 3 ? "rounded-br-xl" : ""}`}
            >
              <Image
                src={img}
                alt={`${alt} - foto ${index + 2}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                sizes="30vw"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Fullscreen overlay with carousel */}
      {overlayIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          onClick={closeOverlay}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          {/* Close button */}
          <button
            onClick={closeOverlay}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors z-10 cursor-pointer"
            aria-label="Cerrar"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Carousel container — 50% width */}
          <div
            className="relative w-[50vw] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={allImages[overlayIndex]}
              alt={`${alt} - ${overlayIndex + 1}`}
              fill
              className="object-cover"
              sizes="50vw"
              priority
            />

            {/* Left arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-opacity cursor-pointer shadow-lg"
              aria-label="Anterior"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Right arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-opacity cursor-pointer shadow-lg"
              aria-label="Siguiente"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Dots indicator */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {allImages.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setOverlayIndex(i);
                  }}
                  className={`block w-2 h-2 rounded-full transition-colors cursor-pointer ${
                    i === overlayIndex ? "bg-white" : "bg-white/50"
                  }`}
                  aria-label={`Imagen ${i + 1}`}
                />
              ))}
            </div>

            {/* Counter */}
            <div className="absolute top-3 left-3 bg-black/50 text-white text-sm px-3 py-1 rounded-full">
              {overlayIndex + 1} / {allImages.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
