import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { date, completed } = await req.json();
  const client = await clientPromise;
  const db = client.db();

  await db.collection('exercises').insertOne({
    userId: session.user.email,
    date: new Date(date),
    completed,
    createdAt: new Date(),
  });

  return new Response("Exercise saved", { status: 201 });
}
