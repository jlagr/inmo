import type { Metadata } from "next";
import { Roboto_Flex } from "next/font/google";
import "./globals.css";
import PublicShell from "@/components/PublicShell";

const robotoFlex = Roboto_Flex({
  variable: "--font-roboto-flex",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FR Inmobiliaria — Encuentra tu hogar ideal",
  description:
    "Catálogo de propiedades inmobiliarias. Casas y departamentos en venta y renta.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${robotoFlex.className} antialiased`}>
        <PublicShell>{children}</PublicShell>
      </body>
    </html>
  );
}
