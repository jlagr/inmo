import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/admin/properties — all properties including inactive
export async function GET() {
  const properties = await prisma.properties.findMany({
    include: { state: true },
    orderBy: { id: "desc" },
  });
  return NextResponse.json(properties);
}

// POST /api/admin/properties — create a new property
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const property = await prisma.properties.create({
      data: {
        title: body.title,
        type: body.type,
        status: body.status,
        state_id: Number(body.state_id),
        county: body.county,
        address: body.address,
        description: body.description,
        square_meters: Number(body.square_meters),
        bedrooms: Number(body.bedrooms),
        bathrooms: Number(body.bathrooms),
        parking: Number(body.parking),
        image: body.image,
        gallery: body.gallery ?? [],
        price: body.price,
        show_price: body.show_price ?? false,
        lat: Number(body.lat),
        lng: Number(body.lng),
        active: body.active ?? true,
        sold: body.sold ?? false,
      },
    });

    return NextResponse.json(property, { status: 201 });
  } catch (error) {
    console.error("Error creating property:", error);
    return NextResponse.json({ error: "Error al crear la propiedad" }, { status: 500 });
  }
}
