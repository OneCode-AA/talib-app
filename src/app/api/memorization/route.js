import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { title, type, startDate } = await req.json();
  const client = await clientPromise;
  const db = client.db();

  await db.collection('memorization').insertOne({
    userId: session.user.email,
    title,
    type, // "quran" or "matoon"
    startDate: new Date(startDate),
    createdAt: new Date(),
  });

  return new Response("Memorization added", { status: 201 });
}
