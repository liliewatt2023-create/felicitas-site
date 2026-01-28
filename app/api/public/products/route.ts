import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Fetch all products - public endpoint, no authentication required
    const products = await prisma.product.findMany({
      orderBy: { name: "asc" },
      take: 6, // Limit to 6 featured products for the homepage
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
