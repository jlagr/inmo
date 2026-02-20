"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import ContactOverlay from "./ContactOverlay";
import frinmoLogo from "@/app/frinmo_logo.png";

export default function Navbar() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <>
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image src={frinmoLogo} alt="FR Inmobiliaria" width={36} height={36} />
            <span className="text-xl font-bold tracking-wide text-gray-900">INMOBILIARIA</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-base">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Inicio
            </Link>
            <Link
              href="/propiedades"
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Propiedades
            </Link>
            <Link
              href="/nosotros"
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Nosotros
            </Link>
            <button
              onClick={() => setContactOpen(true)}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium cursor-pointer"
            >
              Contacto
            </button>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden text-gray-700" aria-label="Abrir menú">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>

    <ContactOverlay open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
