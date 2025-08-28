import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongo";

// ✅ Save session
export async function POST(req) {
  const body = await req.json();
  const { notes, selectdoctor } = body;

  const user = await currentUser(); // ✅ await is necessary
  if (!user || !user.primaryEmailAddress) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const client = await clientPromise;
  const db = client.db("MedicalAI");
  const collection = db.collection("session");

  const result = await collection.insertOne({
    name: user.fullName,
    email: user.primaryEmailAddress.emailAddress,
    notes,
    selectdoctor,
    createdAt: new Date(),
  });


  return NextResponse.json({
    message: "Session saved successfully",
    sessionId: result.insertedId.toString(),
  });
}

// ✅ Fetch session by ID
export async function GET(req) {
  const searchParams = new URL(req.url).searchParams;
  const sessionId = searchParams.get("session");
  const user = await currentUser()
  

  

  if(sessionId =="all"){
const client = await clientPromise;
  const db = client.db("MedicalAI");
  const collection = db.collection("session"); // ✅ Fix: Correct collection

  const result = await collection.find({ email: user.primaryEmailAddress.emailAddress}).sort({ createdAt: -1 })
      .toArray();

  return NextResponse.json(result)



  }

  const client = await clientPromise;
  const db = client.db("MedicalAI");
  const collection = db.collection("session"); // ✅ Fix: Correct collection

  const session = await collection.findOne({ _id: new ObjectId(sessionId) });

  if (!session) {
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }

  return NextResponse.json({session});
}
