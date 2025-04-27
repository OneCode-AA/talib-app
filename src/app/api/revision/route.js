import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { title, type, schedule } = await req.json();
  const client = await clientPromise;
  const db = client.db();

  await db.collection('revision').insertOne({
    userId: session.user.email,
    title,
    type, // "quran" or "matoon"
    schedule,
    createdAt: new Date(),
  });

  return new Response("Revision added", { status: 201 });
}
