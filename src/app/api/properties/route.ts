import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/properties — list all active properties
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const state_id = searchParams.get("state_id");
  const county = searchParams.get("county");
  const status = searchParams.get("status");
  const type = searchParams.get("type");
  const bedrooms = searchParams.get("bedrooms");
  const parking = searchParams.get("parking");

  const where: Record<string, unknown> = { active: true };

  if (state_id) where.state_id = { in: state_id.split(",").map(Number) };
  if (county) where.county = { contains: county, mode: "insensitive" };
  if (status) where.status = { in: status.split(",") };
  if (type) where.type = { in: type.split(",") };
  if (bedrooms) where.bedrooms = { in: bedrooms.split(",").map(Number) };
  if (parking) where.parking = { in: parking.split(",").map(Number) };

  const properties = await prisma.properties.findMany({
    where,
    orderBy: { updated_at: "desc" },
  });

  return NextResponse.json(properties);
}

// POST /api/properties — create a new property
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const property = await prisma.properties.create({
      data: {
        title: body.title,
        type: body.type,
        status: body.status,
        state_id: body.state_id,
        county: body.county,
        address: body.address,
        description: body.description,
        square_meters: body.square_meters,
        bedrooms: body.bedrooms,
        bathrooms: body.bathrooms,
        parking: body.parking,
        image: body.image,
        gallery: body.gallery || [],
        price: body.price,
        lat: body.lat,
        lng: body.lng,
        active: body.active ?? true,
        sold: body.sold ?? false,
      },
    });

    return NextResponse.json(property, { status: 201 });
  } catch (error) {
    console.error("Error creating property:", error);
    return NextResponse.json(
      { error: "Error al crear la propiedad" },
      { status: 500 }
    );
  }
}
