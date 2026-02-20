-- CreateEnum
CREATE TYPE "property_type" AS ENUM ('casa', 'departamento', 'terreno', 'casa_en_condominio', 'local', 'bodega', 'duplex');

-- CreateEnum
CREATE TYPE "property_status" AS ENUM ('venta', 'renta');

-- CreateTable
CREATE TABLE "properties" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "type" "property_type" NOT NULL,
    "status" "property_status" NOT NULL,
    "municipio" VARCHAR(100) NOT NULL,
    "address" VARCHAR(500) NOT NULL,
    "description" TEXT NOT NULL,
    "square_meters" DOUBLE PRECISION NOT NULL,
    "bedrooms" INTEGER NOT NULL,
    "bathrooms" INTEGER NOT NULL,
    "parking" INTEGER NOT NULL,
    "image" VARCHAR(500) NOT NULL,
    "gallery" TEXT[],
    "price" VARCHAR(50) NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "sold" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "properties_pkey" PRIMARY KEY ("id")
);
