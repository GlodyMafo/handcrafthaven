import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/users
export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: "Impossible de récupérer les utilisateurs" }, { status: 500 });
  }
}

// POST /api/users
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
        role: "USER",
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: "Impossible de créer l'utilisateur" }, { status: 500 });
  }
}

// PUT /api/users?id=1
export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID manquant" }, { status: 400 });

    const body = await req.json();
    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: body,
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ error: "Impossible de mettre à jour l'utilisateur" }, { status: 500 });
  }
}

// DELETE /api/users?id=1
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID manquant" }, { status: 400 });

    await prisma.user.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: "Utilisateur supprimé" });
  } catch (error) {
    return NextResponse.json({ error: "Impossible de supprimer l'utilisateur" }, { status: 500 });
  }
}
