import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/properties/[id]
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const property = await prisma.properties.findUnique({
    where: { id: Number(id) },
  });

  if (!property) {
    return NextResponse.json(
      { error: "Propiedad no encontrada" },
      { status: 404 }
    );
  }

  return NextResponse.json(property);
}

// PUT /api/properties/[id]
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const body = await request.json();

    const property = await prisma.properties.update({
      where: { id: Number(id) },
      data: body,
    });

    return NextResponse.json(property);
  } catch (error) {
    console.error("Error updating property:", error);
    return NextResponse.json(
      { error: "Error al actualizar la propiedad" },
      { status: 500 }
    );
  }
}

// DELETE /api/properties/[id] — soft delete (set active = false)
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const property = await prisma.properties.update({
      where: { id: Number(id) },
      data: { active: false },
    });

    return NextResponse.json(property);
  } catch (error) {
    console.error("Error deleting property:", error);
    return NextResponse.json(
      { error: "Error al eliminar la propiedad" },
      { status: 500 }
    );
  }
}
