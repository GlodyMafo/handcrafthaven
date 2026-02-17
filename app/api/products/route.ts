import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  // Récupérer le cookie de la requête
  const session = await getServerSession(authOptions);

  console.log("SESSION:", session);

  if (!session || session.user.role !== "SELLER") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const product = await prisma.product.create({
    data: {
      title: body.title,
      description: body.description,
      price: parseFloat(body.price),
      imageUrl: body.imageUrl,
      sellerId: session.user.id,
    },
  });

  return NextResponse.json(product);
}
