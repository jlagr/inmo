import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-400 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-sm">
            © {currentYear} Inmo. Todos los derechos reservados.
          </p>

          {/* Legal links */}
          <div className="flex items-center gap-6 text-sm">
            <Link
              href="/terminos"
              className="hover:text-white transition-colors"
            >
              Términos y condiciones
            </Link>
            <Link
              href="/privacidad"
              className="hover:text-white transition-colors"
            >
              Política de privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
