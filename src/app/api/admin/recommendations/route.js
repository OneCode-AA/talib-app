import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.email !== "your_admin_email@example.com") {
    return new Response("Unauthorized", { status: 401 });
  }

  const { title } = await req.json();
  const client = await clientPromise;
  const db = client.db();

  await db.collection('recommendations').insertOne({ title, createdAt: new Date() });

  return new Response("Recommendation added", { status: 201 });
}
