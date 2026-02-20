import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nosotros — Inmo",
  description: "Conoce al equipo detrás de Inmo, tu inmobiliaria de confianza en Jalisco.",
};

const team = [
  {
    name: "Carlos Méndez",
    role: "Director General",
    image: "/images/team/team-1.jpg",
    bio: "Con más de 20 años de experiencia en el sector inmobiliario, Carlos fundó Inmo con la visión de transformar la manera en que las personas encuentran su hogar. Su liderazgo y conocimiento del mercado jalisciense han sido clave para el crecimiento de la empresa.",
  },
  {
    name: "María Fernanda López",
    role: "Directora Comercial",
    image: "/images/team/team-2.jpg",
    bio: "Especialista en estrategias de venta y desarrollo de negocios. María Fernanda ha impulsado alianzas con los principales desarrolladores de la zona metropolitana de Guadalajara, ampliando nuestro catálogo de forma constante.",
  },
  {
    name: "Roberto García",
    role: "Asesor Senior",
    image: "/images/team/team-3.jpg",
    bio: "Experto en propiedades residenciales de lujo y terrenos de inversión. Roberto acompaña a cada cliente durante todo el proceso de compra, asegurando una experiencia transparente y personalizada.",
  },
  {
    name: "Ana Sofía Ramírez",
    role: "Coordinadora de Marketing",
    image: "/images/team/team-4.jpg",
    bio: "Creativa y estratega digital, Ana Sofía se encarga de posicionar nuestras propiedades en los principales canales digitales. Su enfoque en contenido visual ha incrementado significativamente el alcance de nuestra marca.",
  },
  {
    name: "Daniel Torres",
    role: "Asesor Inmobiliario",
    image: "/images/team/team-5.jpg",
    bio: "Apasionado por ayudar a las familias a encontrar el espacio perfecto. Daniel se especializa en la zona de Zapopan y Tlajomulco, donde conoce cada colonia y sus ventajas como la palma de su mano.",
  },
  {
    name: "Laura Martínez",
    role: "Atención al Cliente",
    image: "/images/team/team-6.jpg",
    bio: "El primer contacto de nuestros clientes. Laura se asegura de que cada persona que se acerque a Inmo reciba atención cálida, seguimiento oportuno y toda la información que necesita para tomar la mejor decisión.",
  },
];

export default function NosotrosPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* Company description */}
      <section className="max-w-4xl mx-auto text-center mb-20">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Nosotros</h1>

        <div className="text-gray-600 leading-relaxed text-lg space-y-5 text-left">
          <p>
            En <strong className="text-gray-900">Inmo</strong> somos una empresa inmobiliaria con raíces en Jalisco, comprometida con ayudar a personas y familias a encontrar el espacio que mejor se adapte a su estilo de vida. Desde nuestra fundación, hemos acompañado a cientos de clientes en la compra, venta y renta de propiedades residenciales, comerciales e industriales en la zona metropolitana de Guadalajara y las principales ciudades del estado.
          </p>
          <p>
            Creemos que encontrar un hogar va más allá de una transacción. Es un momento importante en la vida de cada persona, y por eso nos dedicamos a ofrecer un servicio cercano, transparente y profesional. Nuestro equipo de asesores certificados conoce el mercado local a profundidad y trabaja de la mano con cada cliente para entender sus necesidades, presupuesto y expectativas.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-10 text-center">
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-blue-700 mb-2">Misión</h3>
              <p className="text-sm text-gray-600">
                Facilitar el acceso a propiedades de calidad mediante un servicio personalizado, tecnología innovadora y un profundo conocimiento del mercado inmobiliario de Jalisco, generando confianza y valor en cada operación.
              </p>
            </div>
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-blue-700 mb-2">Visión</h3>
              <p className="text-sm text-gray-600">
                Ser la inmobiliaria de referencia en el occidente de México, reconocida por nuestra integridad, innovación digital y la satisfacción de nuestros clientes, contribuyendo al desarrollo urbano ordenado y sustentable.
              </p>
            </div>
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-blue-700 mb-2">Valores</h3>
              <p className="text-sm text-gray-600">
                Transparencia, compromiso, cercanía, profesionalismo e innovación. Estos pilares guían cada interacción con nuestros clientes, colaboradores y socios comerciales.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team section */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Nuestro equipo
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member) => (
            <article
              key={member.name}
              className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col items-center text-center"
            >
              {/* Circular photo */}
              <div className="relative w-28 h-28 rounded-full overflow-hidden mb-4 ring-4 ring-blue-50">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="112px"
                />
              </div>

              {/* Name */}
              <h3 className="text-lg font-semibold text-gray-900">
                {member.name}
              </h3>

              {/* Role */}
              <span className="text-sm font-medium text-blue-600 mb-3">
                {member.role}
              </span>

              {/* Bio */}
              <p className="text-sm text-gray-500 leading-relaxed">
                {member.bio}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
