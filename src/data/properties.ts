export type PropertyType =
  | "casa"
  | "departamento"
  | "terreno"
  | "casa_en_condominio"
  | "local"
  | "bodega"
  | "duplex";

export const propertyTypeLabels: Record<PropertyType, string> = {
  casa: "Casa",
  departamento: "Departamento",
  terreno: "Terreno",
  casa_en_condominio: "Casa en condominio",
  local: "Local",
  bodega: "Bodega",
  duplex: "Dúplex",
};

export interface Property {
  id: number;
  title: string;
  type: PropertyType;
  status: "venta" | "renta";
  state_id: number;
  county: string;
  address: string;
  description: string;
  square_meters: number;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  image: string;
  gallery: string[];
  price: string;
  show_price: boolean;
  lat: number;
  lng: number;
  active: boolean;
  sold: boolean;
  created_at: string;
  updated_at: string;
}

export const municipiosJalisco = [
  "Guadalajara",
  "Zapopan",
  "Tlaquepaque",
  "Tonalá",
  "Tlajomulco de Zúñiga",
  "El Salto",
  "Puerto Vallarta",
  "Lagos de Moreno",
  "Tepatitlán de Morelos",
  "Chapala",
  "Ajijic",
  "Jocotepec",
  "Tequila",
  "Autlán de Navarro",
  "Ocotlán",
];
