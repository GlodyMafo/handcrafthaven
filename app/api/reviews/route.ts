import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { productId, rating, comment } = await req.json();

  // Vérifie si l'utilisateur a déjà laissé un avis
  const existingReview = await prisma.review.findFirst({
    where: {
      productId,
      userId: session.user.id,
    },
  });

  if (existingReview) {
    return NextResponse.json({ error: "Vous avez déjà laissé un avis" }, { status: 400 });
  }

  const review = await prisma.review.create({
    data: {
      rating,
      comment,
      productId,
      userId: session.user.id,
    },
  });

  return NextResponse.json(review);
}
