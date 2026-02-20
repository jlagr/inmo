const { PrismaPg } = require("@prisma/adapter-pg");
const { PrismaClient } = require("../src/generated/prisma");
const bcrypt = require("bcryptjs");
require("dotenv/config");

const ADMIN_USERS = [
  { username: "jlagr",     password: "Qm8#nXp3Tv" },
  { username: "edrodmen", password: "Rj6!kBw5Lc" },
];

const STATES = [
  "Aguascalientes",
  "Baja California",
  "Baja California Sur",
  "Campeche",
  "Chiapas",
  "Chihuahua",
  "Ciudad de México",
  "Coahuila",
  "Colima",
  "Durango",
  "Estado de México",
  "Guanajuato",
  "Guerrero",
  "Hidalgo",
  "Jalisco",
  "Michoacán",
  "Morelos",
  "Nayarit",
  "Nuevo León",
  "Oaxaca",
  "Puebla",
  "Querétaro",
  "Quintana Roo",
  "San Luis Potosí",
  "Sinaloa",
  "Sonora",
  "Tabasco",
  "Tamaulipas",
  "Tlaxcala",
  "Veracruz",
  "Yucatán",
  "Zacatecas",
];

async function main() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  const prisma = new PrismaClient({ adapter });

  // Clear existing data
  await prisma.properties.deleteMany();
  await prisma.states.deleteMany();

  // Seed admin users (upsert — never overwrites an existing password)
  for (const { username, password } of ADMIN_USERS) {
    const password_hash = await bcrypt.hash(password, 10);
    await prisma.users.upsert({
      where: { username },
      update: {},
      create: { username, password_hash },
    });
  }
  console.log("Admin users seeded");

  // Seed states
  for (const name of STATES) {
    await prisma.states.create({ data: { name } });
  }

  const jalisco = await prisma.states.findUnique({ where: { name: "Jalisco" } });

  const seedData = [
    {
      title: "Casa moderna en Providencia",
      type: "casa",
      status: "venta",
      state_id: jalisco.id,
      county: "Guadalajara",
      address: "Av. Providencia 245, Col. Providencia, Guadalajara, Jal.",
      description: "Hermosa casa moderna con acabados de lujo, amplio jardín trasero, cocina integral equipada, sala de TV, cuarto de servicio y terraza con vista panorámica. Ubicada en una de las mejores zonas de Guadalajara.",
      square_meters: 320,
      bedrooms: 4,
      bathrooms: 3,
      parking: 2,
      image: "/images/property-1.jpg",
      gallery: ["/images/gallery/1-1.jpg", "/images/gallery/1-2.jpg", "/images/gallery/1-3.jpg", "/images/gallery/1-4.jpg"],
      price: "$4,500,000",
      show_price: true,
      lat: 20.6866,
      lng: -103.3812,
      active: true,
      sold: false,
    },
    {
      title: "Departamento en Andares",
      type: "departamento",
      status: "renta",
      state_id: jalisco.id,
      county: "Zapopan",
      address: "Blvd. Puerta de Hierro 120, Zapopan, Jal.",
      description: "Departamento amueblado en exclusivo desarrollo junto a Andares. Incluye gimnasio, alberca, área de coworking y seguridad 24/7. Pisos de madera, cocina abierta con barra desayunadora.",
      square_meters: 95,
      bedrooms: 2,
      bathrooms: 1,
      parking: 1,
      image: "/images/property-2.jpg",
      gallery: ["/images/gallery/2-1.jpg", "/images/gallery/2-2.jpg", "/images/gallery/2-3.jpg", "/images/gallery/2-4.jpg"],
      price: "$18,000/mes",
      show_price: true,
      lat: 20.7048,
      lng: -103.4078,
      active: true,
      sold: false,
    },
    {
      title: "Residencia en Valle Real",
      type: "casa",
      status: "venta",
      state_id: jalisco.id,
      county: "Zapopan",
      address: "Cto. Valle Real 300, Fracc. Valle Real, Zapopan, Jal.",
      description: "Espectacular residencia en fraccionamiento con acceso controlado. Doble altura en sala, 5 recámaras con baño completo, cuarto de juegos, cava, bodega y amplio jardín con alberca.",
      square_meters: 450,
      bedrooms: 5,
      bathrooms: 4,
      parking: 3,
      image: "/images/property-3.jpg",
      gallery: ["/images/gallery/3-1.jpg", "/images/gallery/3-2.jpg", "/images/gallery/3-3.jpg", "/images/gallery/3-4.jpg"],
      price: "$12,800,000",
      show_price: false,
      lat: 20.7230,
      lng: -103.4350,
      active: true,
      sold: false,
    },
    {
      title: "Depto de lujo en Colinas de San Javier",
      type: "departamento",
      status: "renta",
      state_id: jalisco.id,
      county: "Guadalajara",
      address: "Av. San Javier 89, Col. Colinas de San Javier, Guadalajara, Jal.",
      description: "Penthouse con vista a la ciudad, acabados premium, 2 terrazas, área de lavado independiente. El desarrollo cuenta con roof garden, salón de eventos y estacionamiento para visitas.",
      square_meters: 140,
      bedrooms: 3,
      bathrooms: 2,
      parking: 1,
      image: "/images/property-4.jpg",
      gallery: ["/images/gallery/4-1.jpg", "/images/gallery/4-2.jpg", "/images/gallery/4-3.jpg", "/images/gallery/4-4.jpg"],
      price: "$35,000/mes",
      show_price: false,
      lat: 20.6750,
      lng: -103.3950,
      active: true,
      sold: false,
    },
    {
      title: "Terreno en Tlajomulco",
      type: "terreno",
      status: "venta",
      state_id: jalisco.id,
      county: "Tlajomulco de Zúñiga",
      address: "Carr. a Chapala Km 15, Tlajomulco de Zúñiga, Jal.",
      description: "Excelente terreno plano con uso de suelo mixto, ideal para desarrollo habitacional o comercial. Servicios de agua, luz y drenaje a pie de terreno. Escrituras en orden.",
      square_meters: 1200,
      bedrooms: 0,
      bathrooms: 0,
      parking: 0,
      image: "/images/property-1.jpg",
      gallery: ["/images/gallery/1-1.jpg", "/images/gallery/1-2.jpg", "/images/gallery/1-3.jpg", "/images/gallery/1-4.jpg"],
      price: "$3,600,000",
      show_price: true,
      lat: 20.4741,
      lng: -103.3462,
      active: true,
      sold: false,
    },
    {
      title: "Casa en condominio en Bugambilias",
      type: "casa_en_condominio",
      status: "venta",
      state_id: jalisco.id,
      county: "Zapopan",
      address: "Fracc. Bugambilias, Zapopan, Jal.",
      description: "Casa en condominio horizontal con áreas comunes, alberca, palapa y jardines. Cocina integral, 3 recámaras con closet, cuarto de lavado y patio de servicio.",
      square_meters: 180,
      bedrooms: 3,
      bathrooms: 2,
      parking: 2,
      image: "/images/property-2.jpg",
      gallery: ["/images/gallery/2-1.jpg", "/images/gallery/2-2.jpg", "/images/gallery/2-3.jpg", "/images/gallery/2-4.jpg"],
      price: "$5,200,000",
      show_price: true,
      lat: 20.6200,
      lng: -103.4100,
      active: true,
      sold: false,
    },
    {
      title: "Local comercial en Tlaquepaque",
      type: "local",
      status: "renta",
      state_id: jalisco.id,
      county: "Tlaquepaque",
      address: "Av. Niños Héroes 450, San Pedro Tlaquepaque, Jal.",
      description: "Local comercial en esquina con alto flujo peatonal y vehicular. Planta libre, sanitario, cortina metálica, instalación eléctrica trifásica. Ideal para restaurante, tienda o consultorio.",
      square_meters: 85,
      bedrooms: 0,
      bathrooms: 1,
      parking: 2,
      image: "/images/property-3.jpg",
      gallery: ["/images/gallery/3-1.jpg", "/images/gallery/3-2.jpg", "/images/gallery/3-3.jpg", "/images/gallery/3-4.jpg"],
      price: "$22,000/mes",
      show_price: false,
      lat: 20.6407,
      lng: -103.3108,
      active: true,
      sold: false,
    },
    {
      title: "Bodega industrial en El Salto",
      type: "bodega",
      status: "renta",
      state_id: jalisco.id,
      county: "El Salto",
      address: "Parque Industrial El Salto, El Salto, Jal.",
      description: "Bodega industrial con oficinas, andén de carga para tráiler, piso de concreto armado, altura libre de 8m. Seguridad privada y caseta de acceso. Zona industrial consolidada.",
      square_meters: 800,
      bedrooms: 0,
      bathrooms: 2,
      parking: 5,
      image: "/images/property-4.jpg",
      gallery: ["/images/gallery/4-1.jpg", "/images/gallery/4-2.jpg", "/images/gallery/4-3.jpg", "/images/gallery/4-4.jpg"],
      price: "$65,000/mes",
      show_price: false,
      lat: 20.5180,
      lng: -103.2680,
      active: true,
      sold: false,
    },
    {
      title: "Dúplex en Chapala",
      type: "duplex",
      status: "venta",
      state_id: jalisco.id,
      county: "Chapala",
      address: "Calle Hidalgo 78, Chapala, Jal.",
      description: "Hermoso dúplex con vista al lago de Chapala. Dos niveles con terraza en azotea, cocina amplia, sala-comedor con doble altura. Clima privilegiado todo el año, cerca del malecón.",
      square_meters: 160,
      bedrooms: 3,
      bathrooms: 2,
      parking: 1,
      image: "/images/property-1.jpg",
      gallery: ["/images/gallery/1-1.jpg", "/images/gallery/1-2.jpg", "/images/gallery/1-3.jpg", "/images/gallery/1-4.jpg"],
      price: "$2,900,000",
      show_price: true,
      lat: 20.2951,
      lng: -103.1909,
      active: true,
      sold: false,
    },
    {
      title: "Departamento en Puerto Vallarta",
      type: "departamento",
      status: "venta",
      state_id: jalisco.id,
      county: "Puerto Vallarta",
      address: "Blvd. Francisco Medina Ascencio 1500, Puerto Vallarta, Jal.",
      description: "Departamento frente al mar con acceso directo a playa. 2 recámaras, balcón con vista al océano, alberca infinity, gym y concierge. Ideal para inversión o vacaciones.",
      square_meters: 110,
      bedrooms: 2,
      bathrooms: 2,
      parking: 1,
      image: "/images/property-3.jpg",
      gallery: ["/images/gallery/3-1.jpg", "/images/gallery/3-2.jpg", "/images/gallery/3-3.jpg", "/images/gallery/3-4.jpg"],
      price: "$6,500,000",
      show_price: true,
      lat: 20.6534,
      lng: -105.2253,
      active: true,
      sold: false,
    },
  ];

  for (const data of seedData) {
    await prisma.properties.create({ data });
  }

  const count = await prisma.properties.count();
  console.log(`Seed complete: ${count} properties inserted`);

  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
