import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });

  const { title, targetDate } = await req.json();
  const client = await clientPromise;
  const db = client.db();

  await db.collection('goals').insertOne({
    userId: session.user.email,
    title,
    targetDate: new Date(targetDate),
    status: "ongoing",
    createdAt: new Date(),
  });

  return new Response("Goal created", { status: 201 });
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });

  const client = await clientPromise;
  const db = client.db();
  const goals = await db.collection('goals').find({ userId: session.user.email }).toArray();

  return new Response(JSON.stringify(goals), { status: 200 });
}
