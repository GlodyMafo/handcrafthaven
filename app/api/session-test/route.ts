import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  console.log("SESSION TEST:", session);
  return new Response(JSON.stringify(session));
}
