import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/states — list all states ordered alphabetically
export async function GET() {
  const states = await prisma.states.findMany({ orderBy: { name: "asc" } });
  return NextResponse.json(states);
}
