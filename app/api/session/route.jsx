import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

import prisma from "@/lib/prisma"

// Save session
export async function POST(req) {

 const session = await getServerSession(authOptions)

 if (!session || !session.user?.email) {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
 }

 const body = await req.json()
 const { notes, selectdoctor } = body

 const result = await prisma.sessionNote.create({
  data: {
   name: session.user.name,
   email: session.user.email,
   notes,
   selectdoctor
  }
 })

 return NextResponse.json({
  message: "Session saved successfully",
  sessionId: result.id
 })
}

// Fetch session
export async function GET(req) {

 const session = await getServerSession(authOptions)

 if (!session || !session.user?.email) {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
 }

 const searchParams = new URL(req.url).searchParams
 const sessionId = searchParams.get("session")

 if (sessionId === "all") {

  const result = await prisma.sessionNote.findMany({
   where: {
    email: session.user.email
   },
   orderBy: {
    createdAt: "desc"
   }
  })

  return NextResponse.json(result)
 }

 const result = await prisma.sessionNote.findUnique({
  where: {
   id: sessionId
  }
 })

 if (!result) {
  return NextResponse.json({ error: "Session not found" }, { status: 404 })
 }

 return NextResponse.json({ session: result })
}