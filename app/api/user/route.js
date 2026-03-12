import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST() {

 const session = await getServerSession()

 if (!session || !session.user?.email) {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
 }

 const user = await prisma.appUser.findUnique({
  where: {
   email: session.user.email
  }
 })

 if (!user) {

  const newUser = await prisma.appUser.create({
   data: {
    name: session.user.name,
    email: session.user.email,
    credits: 10
   }
  })

  return NextResponse.json({
   message: "User created successfully",
   user: newUser
  })

 }

 return NextResponse.json({
  message: "User already exists",
  user
 })
}