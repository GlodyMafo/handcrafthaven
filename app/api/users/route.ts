import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// GET /api/users
export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: "Impossible to get users" }, { status: 500 });
  }
}

// POST /api/users
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, role } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Tous les champs sont requis" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "Cet email est déjà utilisé" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, role: role || "USER" },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("POST /api/users error:", error);
    return NextResponse.json({ error: "Impossible de créer l'utilisateur" }, { status: 500 });
  }
}

// PUT /api/users?id=1
export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID missing" }, { status: 400 });

    const body = await req.json();
    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: body,
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ error: "Impossible to update" }, { status: 500 });
  }
}

// DELETE /api/users?id=1
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID missed" }, { status: 400 });

    await prisma.user.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: "User delete" });
  } catch (error) {
    return NextResponse.json({ error: "Impossible to delete user" }, { status: 500 });
  }
}
