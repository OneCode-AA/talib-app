import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const client = await clientPromise;
  const db = client.db();
  const user = await db.collection('users').findOne({ email: session.user.email });

  if (!user) {
    return new Response("User not found", { status: 404 });
  }

  return new Response(JSON.stringify(user));
}

export async function PUT(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { name, password } = await req.json();
  const client = await clientPromise;
  const db = client.db();

  const updateData = {};
  if (name) updateData.name = name;
  if (password) updateData.password = password;

  await db.collection('users').updateOne(
    { email: session.user.email },
    { $set: updateData }
  );

  return new Response("Profile updated", { status: 200 });
}
