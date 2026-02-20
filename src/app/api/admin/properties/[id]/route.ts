import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// PUT /api/admin/properties/[id]
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await request.json();

    const property = await prisma.properties.update({
      where: { id: Number(id) },
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

    return NextResponse.json(property);
  } catch (error) {
    console.error("Error updating property:", error);
    return NextResponse.json({ error: "Error al actualizar la propiedad" }, { status: 500 });
  }
}
