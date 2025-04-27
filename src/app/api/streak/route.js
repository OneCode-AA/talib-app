import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });

  const { actionType } = await req.json();
  const today = new Date().toISOString().split('T')[0];

  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection('streaks');

  const existing = await collection.findOne({ userId: session.user.email, date: today, actionType });

  if (!existing) {
    await collection.insertOne({
      userId: session.user.email,
      date: today,
      actionType,
    });
  }

  return new Response("Streak updated", { status: 201 });
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });

  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection('streaks');

  const data = await collection.find({ userId: session.user.email }).toArray();

  return new Response(JSON.stringify(data), { status: 200 });
}
