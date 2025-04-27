import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function PUT(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });

  const { status } = await req.json();
  const client = await clientPromise;
  const db = client.db();

  await db.collection('goals').updateOne(
    { _id: new ObjectId(params.id), userId: session.user.email },
    { $set: { status } }
  );

  return new Response("Goal updated", { status: 200 });
}

export async function DELETE(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });

  const client = await clientPromise;
  const db = client.db();

  await db.collection('goals').deleteOne({ _id: new ObjectId(params.id), userId: session.user.email });

  return new Response("Goal deleted", { status: 200 });
}
